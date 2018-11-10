import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from '../../shared';
import { EstadisticasModule } from './estadisticas.module';
import { EstadisticasComponent } from './estadisticas.component';

@Injectable()
export class EstadisticasCustomResolvePagingParams implements Resolve<any> {

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

export const estadisticasRoute: Routes = [
    {
        path: 'estadisticas/:isSingleDate/:date',
        component: EstadisticasComponent,
        resolve: {
            'pagingParams': EstadisticasCustomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'futekaApp.turno.home.title'
        },
        pathMatch: 'full',
        canActivate: [UserRouteAccessService]
    }
];
