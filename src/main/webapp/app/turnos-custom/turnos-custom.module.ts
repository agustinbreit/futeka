import { LOCALE_ID, NgModule } from '@angular/core';
import { TurnosCustomComponent } from './turnos-custom/turnos-custom.component';
import { TurnosCustomResolvePagingParams, turnosRoute } from './turnos-custom/turnos.custom.route';
import { RouterModule } from '@angular/router';
import { FutekaSharedModule } from '../shared';

import { MaterialModule } from '../material-module';
const ENTITY_STATES = [
    ...turnosRoute,
];
// import { registerLocaleData } from '@angular/common';
// import localeEsAr from '@angular/common/locales/es-AR';
//
// registerLocaleData(localeEsAr);
//
// export function getLang() {
//     return 'es-AR';
// }

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
        // {
        //     provide: LOCALE_ID,
        //     useValue: getLang()
        // },
    ],
})
export class TurnosCustomModule { }
