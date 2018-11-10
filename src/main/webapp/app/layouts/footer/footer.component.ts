import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectComponentService } from '../../shared/redirect/redirectComponentService';
import { Principal } from '../../shared';
import { DatePipe } from '@angular/common';
import { EstadoTurnoEnum, Turno, TurnoService } from '../../entities/turno';
import { DialogData, TurnosDialogPopUpComponent } from '../../turnos-custom/turnos-custom/turnos-custom.component';
import { HttpResponse } from '@angular/common/http';
import { EstadisticasDialogPopUpComponent } from '../../estadisticas/estadisticas/estadisticas.component';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    constructor(private router: Router, private principal: Principal, public dialog: MatDialog) {}
    cambiarFecha(event: MatDatepickerInputEvent<Date>) {
        setTimeout(() => {
            this.router.navigate(['/turnos', new Date(event.value).toDateString()]);
        }, 5);
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    abrirEstadisticas() {
        // const accion = { accion: 'baja', turno': turno}
        const dialogRef = this.dialog.open(EstadisticasDialogPopUpComponent, {
            width: '90%',
            height: '80%',
            data: {accion: 'baja', 'turno': null}
        });
        dialogRef.afterClosed().subscribe((result) => {
            // setTimeout(() => {
            //     this.router.navigate(['/estadisticas', result.isSingleDateSeach, result.fechaBusqueda.toDateString()]);
            // }, 5);
        });
    }
}
