import { Component, Inject, OnInit } from '@angular/core';
import { Cancha, CanchaService } from '../../entities/cancha';
import { HttpResponse } from '@angular/common/http';
import { EstadoTurnoEnum, Turno, TurnoService } from '../../entities/turno';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';

export interface DialogData {
    turno: Turno;
    accion: string;
}

@Component({
  selector: 'jhi-turnos-custom',
  templateUrl: './turnos-custom.component.html',
  styleUrls: [ './turnos-custom.component.css']
})
export class TurnosCustomComponent implements OnInit {
    canchas: Cancha[];
    now: any;
    constructor(private canchaService: CanchaService,
                private turnosService: TurnoService,
                public dialog: MatDialog
               ) { }

    ngOnInit() {
        this.findCanchasAndTurnos(new Date());
    }

    findCanchasAndTurnos(date?: Date) {
        const now = date;
        now.setHours(13);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);

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
                            });
                    }
                },
            );
    }
    darDeBajaDialog(turno) {
        // const accion = { accion: 'baja', turno': turno}
        const dialogRef = this.dialog.open(TurnosDialogPopUpComponent, {
            width: '250px',
            data: {accion: 'baja', 'turno': turno}
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
            turno = result;
        });
    }
    cancelarDialog(turno) {
        const dialogRef = this.dialog.open(TurnosDialogPopUpComponent, {
            width: '250px',
            data: {accion: 'cancelar', 'turno': turno}
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
            turno = result;
        });
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
            this.turnoService.update(this.data.turno).
                subscribe((res: HttpResponse<Turno>) => {
                    res.body.estado = EstadoTurnoEnum[EstadoTurnoEnum[res.body.estado]];
                    this.dialogRef.close(res.body);
            });
        }else {
            this.data.turno.estado = EstadoTurnoEnum.CANCELADO;
            this.turnoService.update(this.data.turno).
            subscribe((res: HttpResponse<Turno>) => {
                res.body.estado = EstadoTurnoEnum[EstadoTurnoEnum[res.body.estado]];
                this.dialogRef.close(res.body);
            });
        }
    }

}
