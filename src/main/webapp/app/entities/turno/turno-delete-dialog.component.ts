import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Turno } from './turno.model';
import { TurnoPopupService } from './turno-popup.service';
import { TurnoService } from './turno.service';

@Component({
    selector: 'jhi-turno-delete-dialog',
    templateUrl: './turno-delete-dialog.component.html'
})
export class TurnoDeleteDialogComponent {

    turno: Turno;

    constructor(
        private turnoService: TurnoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.turnoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'turnoListModification',
                content: 'Deleted an turno'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-turno-delete-popup',
    template: ''
})
export class TurnoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turnoPopupService: TurnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.turnoPopupService
                .open(TurnoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
