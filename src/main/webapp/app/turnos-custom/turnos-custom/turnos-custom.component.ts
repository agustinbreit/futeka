import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Cancha, CanchaService } from '../../entities/cancha';
import { HttpResponse } from '@angular/common/http';
import { EstadoTurnoEnum, Turno, TurnoService } from '../../entities/turno';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NgForm} from '@angular/forms';

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
    @ViewChild('editForm') editForm: NgForm;
    //nombre = new FormControl('', [Validators.required, Validators.minLength(3)]);
    constructor(private canchaService: CanchaService,
                private turnosService: TurnoService,
                public dialog: MatDialog,
                private turnoService: TurnoService,
                private datePipe: DatePipe,
                public snackBar: MatSnackBar
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
            this.snackBar.open( 'Turno Cancelado', null, {duration: 500});
        });
    }

    guardarTurno(turno) {
        turno.fechaTurno = this.datePipe
            .transform(turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');

        this.turnoService.find(turno.id)
            .subscribe((turnoResponse: HttpResponse<Turno>) => {
                const _turno: Turno = turnoResponse.body;
                _turno.fechaTurno = this.datePipe
                    .transform(turno.fechaTurno, 'yyyy-MM-ddTHH:mm:ss');
               console.log(turno);
               if (_turno.estado == 'RESERVADO') {
                   this.snackBar.openFromComponent( SnackBarErrorComponent, {duration: 500});
               }else {
                   turno.estado = EstadoTurnoEnum[EstadoTurnoEnum.RESERVADO];
                   this.turnoService.update(turno).
                   subscribe((res: HttpResponse<Turno>) => {
                       turno = res.body;
                       this.snackBar.open( 'Turno Reservado Correctamente', null, {duration: 500});
                   });
               }
        });
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
