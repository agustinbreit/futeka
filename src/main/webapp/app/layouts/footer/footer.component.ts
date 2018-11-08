import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { RedirectComponentService } from '../../shared/redirect/redirectComponentService';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    constructor(private router: Router, private principal: Principal) {}
    cambiarFecha(event: MatDatepickerInputEvent<Date>) {
        setTimeout(() => {
            this.router.navigate(['/turnos', new Date(event.value).toDateString()]);
        }, 5);
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
