import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, LoginService, Principal, StateStorageService } from '../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, AfterViewInit {
    account: Account;
    modalRef: NgbModalRef;
    password: string;
    rememberMe: boolean;
    username: string;
    authenticationError: boolean;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private router: Router,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    ngAfterViewInit() {
        const userNameInput = this.elementRef.nativeElement.querySelector('#username');
        userNameInput ? this.renderer.invokeElementMethod(userNameInput, 'focus', []) : setTimeout(window.scroll(0, 0), 1);
        //this.renderer.invokeElementMethod(userNameInput, 'focus', [])
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            //this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            // this.eventManager.broadcast({
            //     name: 'authenticationSuccess',
            //     content: 'Sending Authentication Success'
            // });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            } else {
                this.router.navigate(['/turnos']);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    redirectToTurnos() {
        this.router.navigate(['/turnos']);
    }

    register() {
        //this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        //this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }

}
