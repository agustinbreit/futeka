import { NgModule } from '@angular/core';
import { EstadisticasComponent, EstadisticasDialogPopUpComponent } from './estadisticas.component';
import { MaterialModule } from '../../material-module';
import { FutekaSharedModule } from '../../shared';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
@NgModule({
  imports: [
      FutekaSharedModule,
      MaterialModule,
      CalendarModule,
      CheckboxModule
  ],
    declarations: [EstadisticasComponent, EstadisticasDialogPopUpComponent],
    entryComponents: [EstadisticasComponent, EstadisticasDialogPopUpComponent]
})
export class EstadisticasModule { }
