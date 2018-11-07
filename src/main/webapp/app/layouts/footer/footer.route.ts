import { Route } from '@angular/router';
import { FooterComponent } from './footer.component';

export const footerRoute: Route = {
    path: '',
    component: FooterComponent,
    outlet: 'footer'
};
