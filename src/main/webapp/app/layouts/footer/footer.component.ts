import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Principal } from '../../shared';
import { EstadisticasDialogPopUpComponent } from '../../estadisticas/estadisticas/estadisticas.component';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
    dateToSart= new Date();
    @ViewChild('picker') _datePicker: MatCalendar<Date>;
    constructor(private router: Router, private principal: Principal, public dialog: MatDialog) {}
    cambiarFecha(event: MatDatepickerInputEvent<Date>) {
        setTimeout(() => {
            this.router.navigate(['/turnos', new Date(event.value).toDateString()]);
        }, 5);
    }
    onCloseDatePicker() {
        setTimeout(() => {
            this.router.navigate(['/turnos', new Date(this.dateToSart).toDateString()]);
        }, 5);
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    ngAfterViewInit() {
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
