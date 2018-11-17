import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cancha, CanchaService } from '../../entities/cancha';
import { HttpResponse } from '@angular/common/http';
import { EstadoTurnoEnum, Turno, TurnoService } from '../../entities/turno';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export interface DialogData {
    turno: Turno;
    accion: string;
}

@Component({
  selector: 'jhi-turnos-custom',
  templateUrl: './turnos-custom.component.html',
  styleUrls: [ './turnos-custom.component.css']
})
export class TurnosCustomComponent implements OnInit, OnDestroy {
    canchas: Cancha[];
    now: any;
    @ViewChild('editForm') editForm: NgForm;
    routeSub: any;
    fechaTurno: any;
    blocked = false;
    valorEnCaja = 0;
    nowForComparsion = new Date();
    //nombre = new FormControl('', [Validators.required, Validators.minLength(3)]);
    constructor(private canchaService: CanchaService,
                private turnosService: TurnoService,
                public dialog: MatDialog,
                private turnoService: TurnoService,
                private datePipe: DatePipe,
                public snackBar: MatSnackBar,
                private route: ActivatedRoute,
               ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['fecha']) {
                this.fechaTurno = new Date(params['fecha']);
            } else {
                this.fechaTurno = new Date();
            }
            this.nowForComparsion = new Date();
            this.findCanchasAndTurnos(this.fechaTurno);
        });

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    findCanchasAndTurnos(date?: Date) {
        this.blocked = true;
        const now = date;
        now.setHours(13);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        this.valorEnCaja = 0;
        this.canchaService.query()
            .subscribe((res: HttpResponse<Cancha[]>) => {
                    this.canchas = res.body;
                    for (const cancha of this.canchas) {
                        const turno = new Turno();
                        turno.cancha = cancha;
                        turno.diaDeSemana = now.getDay();
                        turno.fechaTurno = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()
                            , now.getSeconds()));
                        this.turnosService.findTurnosByCancha(turno)
                            .subscribe((res: HttpResponse<Turno[]>) => {
                                cancha.turnos = res.body;
                                let libres = 0;
                                let turnosOcupados = 0;
                                let turnosAsistidos = 0;
                                for (const turno of cancha.turnos) {
                                    if (turno.estado == EstadoTurnoEnum.CANCELADO.toString() || turno.estado == EstadoTurnoEnum.LIBRE.toString() || turno.estado == EstadoTurnoEnum[EstadoTurnoEnum.CANCELADO] || turno.estado == EstadoTurnoEnum[EstadoTurnoEnum.LIBRE]) {
                                        libres++;
                                    }else if (turno.estado == EstadoTurnoEnum.RESERVADO.toString() || turno.estado == EstadoTurnoEnum[EstadoTurnoEnum.RESERVADO]) {
                                        turnosOcupados++;
                                    }else if (turno.estado == EstadoTurnoEnum.ASISTIDO.toString() || turno.estado == EstadoTurnoEnum[EstadoTurnoEnum.ASISTIDO]) {
                                        turnosAsistidos++;
                                    }
                                }
                                cancha.turnosLibres = libres;
                                cancha.turnosOcupados = turnosOcupados;
                                this.valorEnCaja = this.valorEnCaja + (cancha.precio * turnosAsistidos);
                                this.blocked = false;
                            }, () => this.blocked = false);
                    }
                }, () => this.blocked = false
            );
    }
    darDeBajaDialog(turno) {
        // const accion = { accion: 'baja', turno': turno}
        const dialogRef = this.dialog.open(TurnosDialogPopUpComponent, {
            width: '250px',
            data: {accion: 'baja', 'turno': turno}
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.setTurnosEnCancha(true, turno);
            turno = result;
            this.snackBar.open( 'Turno dado de Baja', null, {duration: 500});
        });
    }
    cancelarDialog(turno) {
        const dialogRef = this.dialog.open(TurnosDialogPopUpComponent, {
            width: '250px',
            data: {accion: 'cancelar', 'turno': turno}
        });
        dialogRef.afterClosed().subscribe((result) => {
            turno = result;
            this.setTurnosEnCancha(false, turno);
            this.snackBar.open( 'Turno Cancelado', null, {duration: 500});
        });
    }

    guardarTurno(turno) {
        turno.fechaTurno = this.datePipe
            .transform(turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');
        this.blocked = true;
        if (turno.id) {
            this.turnoService.find(turno.id)
                .subscribe((turnoResponse: HttpResponse<Turno>) => {
                    const _turno: Turno = turnoResponse.body;
                    _turno.fechaTurno = this.datePipe
                        .transform(turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');
                    if (_turno.estado == 'RESERVADO') {
                        this.snackBar.openFromComponent( SnackBarErrorComponent, {duration: 500});
                    }else {
                        turno.estado = EstadoTurnoEnum[EstadoTurnoEnum.RESERVADO];
                        this.turnoService.update(turno).
                        subscribe((res: HttpResponse<Turno>) => {
                            this.blocked = false;
                            this.setTurnosEnCancha(true, turno);
                            turno = res.body;
                            this.snackBar.open( 'Turno Reservado Correctamente', null, {duration: 500});
                        }, () => this.blocked = false);
                    }
                }, () => this.blocked = false);
        }else {
            this.turnoService.findByDate(turno)
                .subscribe((turnoResponse: HttpResponse<Turno>) => {
                    const _turno: Turno = turnoResponse.body;
                    _turno.fechaTurno = this.datePipe
                        .transform(turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');
                    if (_turno.estado == 'RESERVADO') {
                        this.snackBar.openFromComponent( SnackBarErrorComponent, {duration: 500});
                    }else {
                        turno.estado = EstadoTurnoEnum[EstadoTurnoEnum.RESERVADO];
                        this.turnoService.update(turno).
                        subscribe((res: HttpResponse<Turno>) => {
                            this.blocked = false;
                            turno = res.body;
                            this.setTurnosEnCancha(true, turno);
                            this.snackBar.open( 'Turno Reservado Correctamente', null, {duration: 500});
                        }, () => this.blocked = false);
                    }
                }, () => this.blocked = false);
        }
    }
    getColor(turno) {
        if (!turno) return 'black';
        let color;
        switch (turno.estado) {
            case 'CANCELADO': color = 'red'; break;
            case 'RESERVADO': color = 'blue'; break;
            case 'ASISTIDO': color = 'blue'; break;
            case 'LIBRE': color = 'green'; break;
            default: color = 'blue';
        }
        return color;
    }

    setTurnosEnCancha(esReserba: boolean, turno: Turno) {
        for (const cancha of this.canchas) {
            if (cancha.id == turno.cancha.id) {
               if (esReserba) {
                   cancha.turnosLibres --;
                   cancha.turnosOcupados ++;
               } else {
                   cancha.turnosLibres ++;
                   if (cancha.turnosOcupados != 0) {
                       cancha.turnosOcupados --;
                   }
               }
            }
        }
    }

}

@Component({
    selector: 'jhi-turnos-dialog-pop-up',
    templateUrl: 'turnos-dialog.component.html',
})
export class TurnosDialogPopUpComponent {

    constructor(
        public dialogRef: MatDialogRef<TurnosDialogPopUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private turnoService: TurnoService,
        private datePipe: DatePipe, ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    actualizarTurno() {
        this.data.turno.fechaTurno = this.datePipe
            .transform(this.data.turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');
        if (this.data.accion == 'baja') {
            this.data.turno.turnoFijo = false;
            this.turnoService.cancelarTUrnosFuturos(this.data.turno).
                subscribe((res: HttpResponse<Turno>) => {
                    res.body.estado = EstadoTurnoEnum[res.body.estado];
                    this.dialogRef.close(res.body);
            });
        }else {
            this.data.turno.estado = EstadoTurnoEnum[EstadoTurnoEnum.CANCELADO];
            this.turnoService.update(this.data.turno).
            subscribe((res: HttpResponse<Turno>) => {
                this.dialogRef.close(res.body);
            });
        }
    }
}

@Component({
    selector: 'jhi-snack-bar-component-error',
    template: '<div class="color-red">El Turno fue Tomado por otra persona. Actualizar!</div>',
    styles: [`
    .color-red {
      color: orangered;
    }
  `],
})
export class SnackBarErrorComponent { }
