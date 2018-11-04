import { NgModule } from '@angular/core';
import { TurnosCustomComponent } from './turnos-custom/turnos-custom.component';
import { TurnosCustomResolvePagingParams, turnosRoute } from './turnos-custom/turnos.custom.route';
import { RouterModule } from '@angular/router';
import { FutekaSharedModule } from '../shared';

import { MaterialModule } from '../material-module';
const ENTITY_STATES = [
    ...turnosRoute,
];
@NgModule({
   imports: [
        FutekaSharedModule,
        MaterialModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [TurnosCustomComponent],
    entryComponents: [TurnosCustomComponent],
    providers: [
        TurnosCustomResolvePagingParams,
    ],
})
export class TurnosCustomModule { }
