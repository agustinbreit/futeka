import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turno } from './turno.model';
import { TurnoPopupService } from './turno-popup.service';
import { TurnoService } from './turno.service';
import { Cancha, CanchaService } from '../cancha';

@Component({
    selector: 'jhi-turno-dialog',
    templateUrl: './turno-dialog.component.html'
})
export class TurnoDialogComponent implements OnInit {

    turno: Turno;
    isSaving: boolean;

    canchas: Cancha[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private turnoService: TurnoService,
        private canchaService: CanchaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.canchaService.query()
            .subscribe((res: HttpResponse<Cancha[]>) => { this.canchas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.turno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.turnoService.update(this.turno));
        } else {
            this.subscribeToSaveResponse(
                this.turnoService.create(this.turno));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Turno>>) {
        result.subscribe((res: HttpResponse<Turno>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Turno) {
        this.eventManager.broadcast({ name: 'turnoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCanchaById(index: number, item: Cancha) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-turno-popup',
    template: ''
})
export class TurnoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turnoPopupService: TurnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.turnoPopupService
                    .open(TurnoDialogComponent as Component, params['id']);
            } else {
                this.turnoPopupService
                    .open(TurnoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
