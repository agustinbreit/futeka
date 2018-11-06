import { LOCALE_ID, NgModule } from '@angular/core';
import {
    SnackBarErrorComponent, TurnosCustomComponent,
    TurnosDialogPopUpComponent
} from './turnos-custom/turnos-custom.component';
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
import { ReactiveFormsModule } from '@angular/forms';

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
        TurnosDialogPopUpComponent,
        SnackBarErrorComponent
    ],
    entryComponents: [
        TurnosCustomComponent,
        TurnosDialogPopUpComponent,
        SnackBarErrorComponent
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
