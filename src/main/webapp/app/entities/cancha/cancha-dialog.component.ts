import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cancha } from './cancha.model';
import { CanchaPopupService } from './cancha-popup.service';
import { CanchaService } from './cancha.service';

@Component({
    selector: 'jhi-cancha-dialog',
    templateUrl: './cancha-dialog.component.html'
})
export class CanchaDialogComponent implements OnInit {

    cancha: Cancha;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private canchaService: CanchaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cancha.id !== undefined) {
            this.subscribeToSaveResponse(
                this.canchaService.update(this.cancha));
        } else {
            this.subscribeToSaveResponse(
                this.canchaService.create(this.cancha));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cancha>>) {
        result.subscribe((res: HttpResponse<Cancha>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cancha) {
        this.eventManager.broadcast({ name: 'canchaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cancha-popup',
    template: ''
})
export class CanchaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private canchaPopupService: CanchaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.canchaPopupService
                    .open(CanchaDialogComponent as Component, params['id']);
            } else {
                this.canchaPopupService
                    .open(CanchaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
