import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CanchaComponent } from './cancha.component';
import { CanchaDetailComponent } from './cancha-detail.component';
import { CanchaPopupComponent } from './cancha-dialog.component';
import { CanchaDeletePopupComponent } from './cancha-delete-dialog.component';

@Injectable()
export class CanchaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const canchaRoute: Routes = [
    {
        path: 'cancha',
        component: CanchaComponent,
        resolve: {
            'pagingParams': CanchaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.cancha.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cancha/:id',
        component: CanchaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.cancha.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const canchaPopupRoute: Routes = [
    {
        path: 'cancha-new',
        component: CanchaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.cancha.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cancha/:id/edit',
        component: CanchaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.cancha.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cancha/:id/delete',
        component: CanchaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.cancha.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
