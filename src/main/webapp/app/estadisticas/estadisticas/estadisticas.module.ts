import { NgModule } from '@angular/core';
import { EstadisticasComponent, EstadisticasDialogPopUpComponent } from './estadisticas.component';
import { MaterialModule } from '../../material-module';
import { FutekaSharedModule } from '../../shared';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { turnosRoute } from '../../turnos-custom/turnos-custom/turnos.custom.route';
import { EstadisticasCustomResolvePagingParams, estadisticasRoute } from './estadisticas.route';
import { RouterModule } from '@angular/router';
const ENTITY_STATES = [
    ...estadisticasRoute,
];
@NgModule({
  imports: [
      FutekaSharedModule,
      MaterialModule,
      CalendarModule,
      CheckboxModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
    providers: [EstadisticasCustomResolvePagingParams],
    declarations: [EstadisticasComponent, EstadisticasDialogPopUpComponent],
    entryComponents: [EstadisticasComponent, EstadisticasDialogPopUpComponent]
})
export class EstadisticasModule { }
