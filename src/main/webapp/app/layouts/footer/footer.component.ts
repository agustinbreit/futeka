import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectComponentService } from '../../shared/redirect/redirectComponentService';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    constructor(private router: Router) {}
    cambiarFecha(event: MatDatepickerInputEvent<Date>) {
        setTimeout(() => {
            this.router.navigate(['/turnos', new Date(event.value).toDateString()]);
        }, 5);
    }
}
