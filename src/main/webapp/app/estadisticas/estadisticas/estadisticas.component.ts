import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    MAT_DIALOG_DATA, MatDialogRef, MatSnackBar
} from '@angular/material';
import { DialogData } from '../../turnos-custom/turnos-custom/turnos-custom.component';
import { TurnoService } from '../../entities/turno';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { EstadisticasDTO } from './estadisticas.model';
import { Cancha, CanchaService } from '../../entities/cancha';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'jhi-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    routeSub: any;
    fechaTurno: any;
    isSingleDate: boolean;
    estadisticas: EstadisticasDTO;
    blocked = false;
    data: any;
    dataPrecio: any;
    canchas: Cancha[];
    constructor(public snackBar: MatSnackBar, private route: ActivatedRoute, private turnosService: TurnoService, private canchaService: CanchaService) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['date']) {
                this.fechaTurno = new Date(params['date']);
            }if (params['isSingleDate']) {
                this.isSingleDate = ('true' == params['isSingleDate']);
            }
            if (this.fechaTurno && this.isSingleDate != null) {
                this.canchaService.query()
                    .subscribe((res: HttpResponse<Cancha[]>) => {
                        this.canchas = res.body;
                        this.canchas.sort(function(a, b) {
                            return (a.tipo > b.tipo) ? 1 : ((b.tipo > a.tipo) ? -1 : 0);
                        });
                        this.findEstadisticas();
                    });
            }
        });
    }
    findEstadisticas() {
        this.blocked = true;
        let startDate;
        let endDate;
        if (this.isSingleDate) {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 0, 0, 0));
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 23, 59, 59));
        }else {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), 1, 0, 0, 0));
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth() + 1 , 0, 23, 59, 59));
        }
        const estadisticas = new EstadisticasDTO();
        estadisticas.fechaInicio = startDate;
        estadisticas.fechaFin = endDate;
        this.turnosService.findEstadisticasByDates(estadisticas).subscribe((estadisticasResponse: HttpResponse<EstadisticasDTO>) => {
            this.estadisticas = estadisticasResponse.body;
            this.findEstadisticasByCancha();
        }, () => this.blocked = false);
    }

    findEstadisticasByCancha() {
        this.blocked = true;
        let startDate;
        let endDate;
        this.data = null;
        this.dataPrecio = null;
        if (this.isSingleDate) {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 0, 0, 0));
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), this.fechaTurno.getDate(), 23, 59, 59));
        }else {
            startDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth(), 1, 0, 0, 0));
            //let date = new Date(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth() + 1, 0);
            endDate = new Date(Date.UTC(this.fechaTurno.getFullYear(), this.fechaTurno.getMonth() + 1 , 0, 23, 59, 59));
        }

        const observableArray = [];
        for (const cancha of this.canchas) {
            const estadisticas = new EstadisticasDTO();
            estadisticas.fechaInicio = startDate;
            estadisticas.fechaFin = endDate;
            estadisticas.cancha = new Cancha();
            estadisticas.cancha = cancha;
            observableArray.push(
                this.turnosService.findEstadisticasByDates(estadisticas).map((estadisticasResponse: HttpResponse<EstadisticasDTO>) => {
                    return estadisticasResponse.body;
                })
            );
        }
        Observable.forkJoin(observableArray).subscribe((data: EstadisticasDTO[]) => {
            const _labels = [];
            const firstData = [];
            const firstDataPrecio = [];
            const secondData = [];
            const secondDataPrecio = [];

            for (const estadisticasCancha of data) {
                _labels.push(estadisticasCancha.cancha.tipo);
                firstData.push(estadisticasCancha.turnosAsistidos);
                firstDataPrecio.push(estadisticasCancha.gananciaTotal);
                secondData.push(estadisticasCancha.turnosNoAsistidos);
                secondDataPrecio.push(estadisticasCancha.perdidaTotal);
            }
            this.data = {
                labels: _labels,
                datasets: [
                    {
                        label: 'Asistidos',
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        data: firstData
                    },
                    {
                        label: 'No Asistidos',
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545',
                        data: secondData
                    }
                ]
            };
            this.dataPrecio = {
                labels: _labels,
                datasets: [
                    {
                        label: 'Ganancia',
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        data: firstDataPrecio
                    },
                    {
                        label: 'Perdida',
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545',
                        data: secondDataPrecio
                    }
                ]
            };
            this.blocked = false;
        });
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
