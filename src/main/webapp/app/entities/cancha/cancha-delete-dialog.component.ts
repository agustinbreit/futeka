import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cancha } from './cancha.model';
import { CanchaPopupService } from './cancha-popup.service';
import { CanchaService } from './cancha.service';

@Component({
    selector: 'jhi-cancha-delete-dialog',
    templateUrl: './cancha-delete-dialog.component.html'
})
export class CanchaDeleteDialogComponent {

    cancha: Cancha;

    constructor(
        private canchaService: CanchaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.canchaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'canchaListModification',
                content: 'Deleted an cancha'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cancha-delete-popup',
    template: ''
})
export class CanchaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private canchaPopupService: CanchaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.canchaPopupService
                .open(CanchaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
