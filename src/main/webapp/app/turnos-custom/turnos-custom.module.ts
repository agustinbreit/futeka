import { LOCALE_ID, NgModule } from '@angular/core';
import { TurnosCustomComponent, TurnosDialogPopUpComponent } from './turnos-custom/turnos-custom.component';
import { TurnosCustomResolvePagingParams, turnosRoute } from './turnos-custom/turnos.custom.route';
import { RouterModule } from '@angular/router';
import { FutekaSharedModule } from '../shared';

import { MaterialModule } from '../material-module';
import { MatDialog, MatDialogRef } from '@angular/material';
const ENTITY_STATES = [
    ...turnosRoute,
];
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);

export function getLang() {
    return 'es-AR';
}

@NgModule({
   imports: [
        FutekaSharedModule,
        MaterialModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TurnosCustomComponent,
        TurnosDialogPopUpComponent
    ],
    entryComponents: [
        TurnosCustomComponent,
        TurnosDialogPopUpComponent
    ],
    providers: [
        TurnosCustomResolvePagingParams,
        MatDialog,
        {provide: MatDialogRef, useValue: {}},
        {
            provide: LOCALE_ID,
            useValue: getLang()
        },
    ],
})
export class TurnosCustomModule { }
