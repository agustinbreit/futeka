import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Turno } from './turno.model';
import { TurnoService } from './turno.service';

@Component({
    selector: 'jhi-turno-detail',
    templateUrl: './turno-detail.component.html'
})
export class TurnoDetailComponent implements OnInit, OnDestroy {

    turno: Turno;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private turnoService: TurnoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTurnos();
    }

    load(id) {
        this.turnoService.find(id)
            .subscribe((turnoResponse: HttpResponse<Turno>) => {
                this.turno = turnoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTurnos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'turnoListModification',
            (response) => this.load(this.turno.id)
        );
    }
}
