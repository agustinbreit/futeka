import { Router } from '@angular/router';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LANGUAGES } from '../language/language.constants';

@Injectable()
export class RedirectComponentService {
    constructor(private router: Router) {
    }

    redirectToTurnos(darte: Date) {
        setTimeout(() => {
            this.router.navigate(['/turnos', 'asd'], {replaceUrl: true});
        }, 5);
    }
}
