import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDatepicker, MatDatepickerInputEvent,
    MatDialogRef
} from '@angular/material';
import { DialogData } from '../../turnos-custom/turnos-custom/turnos-custom.component';
import { TurnoService } from '../../entities/turno';

@Component({
  selector: 'jhi-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
    selector: 'jhi-estadisticas-dialog-pop-up',
    templateUrl: 'estadisticas-dialog.component.html',
})
export class EstadisticasDialogPopUpComponent {
    isSingleDateSeach = true;
    fechaBusqueda= new Date();
    constructor(
        public dialogRef: MatDialogRef<EstadisticasDialogPopUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private turnoService: TurnoService,
        private datePipe: DatePipe, ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    abrirEstadisticas() {
        this.dialogRef.close({isSingleDateSeach: this.isSingleDateSeach, fechaBusqueda: this.fechaBusqueda});
    }
}
