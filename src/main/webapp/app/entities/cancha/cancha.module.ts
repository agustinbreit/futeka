import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FutekaSharedModule } from '../../shared';
import {
    CanchaService,
    CanchaPopupService,
    CanchaComponent,
    CanchaDetailComponent,
    CanchaDialogComponent,
    CanchaPopupComponent,
    CanchaDeletePopupComponent,
    CanchaDeleteDialogComponent,
    canchaRoute,
    canchaPopupRoute,
    CanchaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...canchaRoute,
    ...canchaPopupRoute,
];

@NgModule({
    imports: [
        FutekaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CanchaComponent,
        CanchaDetailComponent,
        CanchaDialogComponent,
        CanchaDeleteDialogComponent,
        CanchaPopupComponent,
        CanchaDeletePopupComponent,
    ],
    entryComponents: [
        CanchaComponent,
        CanchaDialogComponent,
        CanchaPopupComponent,
        CanchaDeleteDialogComponent,
        CanchaDeletePopupComponent,
    ],
    providers: [
        CanchaService,
        CanchaPopupService,
        CanchaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FutekaCanchaModule {}
