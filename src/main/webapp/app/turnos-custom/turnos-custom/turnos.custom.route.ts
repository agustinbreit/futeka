import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TurnosCustomComponent } from './turnos-custom.component';

@Injectable()
export class TurnosCustomResolvePagingParams implements Resolve<any> {

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

export const turnosRoute: Routes = [
    {
        path: 'turnos',
        component: TurnosCustomComponent,
        resolve: {
            'pagingParams': TurnosCustomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'turnos/:fecha',
        component: TurnosCustomComponent,
        resolve: {
            'pagingParams': TurnosCustomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
