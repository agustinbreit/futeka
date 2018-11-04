import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FutekaCanchaModule } from './cancha/cancha.module';
import { FutekaTurnoModule } from './turno/turno.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FutekaCanchaModule,
        FutekaTurnoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FutekaEntityModule {}
