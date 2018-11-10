import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDatepicker, MatDatepickerInputEvent,
    MatDialogRef, MatSnackBar
} from '@angular/material';
import { DialogData } from '../../turnos-custom/turnos-custom/turnos-custom.component';
import { TurnoService } from '../../entities/turno';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {
    routeSub: any;
    fechaTurno: any;
    isSingleDate: boolean;
    constructor(public snackBar: MatSnackBar, private route: ActivatedRoute, ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['date']) {
                this.fechaTurno = new Date(params['date']);
            }if (params['isSingleDate']) {
                this.isSingleDate = ('true' == params['isSingleDate']);
            }
            if (this.fechaTurno && this.isSingleDate != null) {
                this.findEstadisticas();
            }
        });
    }
    findEstadisticas() {
        let startDate;
        let endDate;
        if (this.isSingleDate) {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 0, 0, 0));
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 23, 59, 59));
        }else {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), 1, 0, 0, 0));
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), 0, 23, 59, 59));
        }
            //this.turnosService.getEstadisticasByDates(startDate, endDate).subscribe();
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
        private datePipe: DatePipe,
        private router: Router) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    abrirEstadisticas() {
        //this.dialogRef.close({isSingleDateSeach: this.isSingleDateSeach, fechaBusqueda: this.fechaBusqueda});
        this.dialogRef.close();
        this.router.navigate(['/estadisticas', this.isSingleDateSeach, this.fechaBusqueda.toDateString()]);
    }
}
