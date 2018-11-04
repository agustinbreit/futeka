import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FutekaSharedModule } from '../../shared';
import {
    TurnoService,
    TurnoPopupService,
    TurnoComponent,
    TurnoDetailComponent,
    TurnoDialogComponent,
    TurnoPopupComponent,
    TurnoDeletePopupComponent,
    TurnoDeleteDialogComponent,
    turnoRoute,
    turnoPopupRoute,
    TurnoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...turnoRoute,
    ...turnoPopupRoute,
];

@NgModule({
    imports: [
        FutekaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TurnoComponent,
        TurnoDetailComponent,
        TurnoDialogComponent,
        TurnoDeleteDialogComponent,
        TurnoPopupComponent,
        TurnoDeletePopupComponent,
    ],
    entryComponents: [
        TurnoComponent,
        TurnoDialogComponent,
        TurnoPopupComponent,
        TurnoDeleteDialogComponent,
        TurnoDeletePopupComponent,
    ],
    providers: [
        TurnoService,
        TurnoPopupService,
        TurnoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FutekaTurnoModule {}
