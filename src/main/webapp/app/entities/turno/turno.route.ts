import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TurnoComponent } from './turno.component';
import { TurnoDetailComponent } from './turno-detail.component';
import { TurnoPopupComponent } from './turno-dialog.component';
import { TurnoDeletePopupComponent } from './turno-delete-dialog.component';

@Injectable()
export class TurnoResolvePagingParams implements Resolve<any> {

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

export const turnoRoute: Routes = [
    {
        path: 'turno',
        component: TurnoComponent,
        resolve: {
            'pagingParams': TurnoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'turno/:id',
        component: TurnoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const turnoPopupRoute: Routes = [
    {
        path: 'turno-new',
        component: TurnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turno/:id/edit',
        component: TurnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turno/:id/delete',
        component: TurnoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
