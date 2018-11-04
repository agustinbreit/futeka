import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cancha } from './cancha.model';
import { CanchaService } from './cancha.service';

@Component({
    selector: 'jhi-cancha-detail',
    templateUrl: './cancha-detail.component.html'
})
export class CanchaDetailComponent implements OnInit, OnDestroy {

    cancha: Cancha;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private canchaService: CanchaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCanchas();
    }

    load(id) {
        this.canchaService.find(id)
            .subscribe((canchaResponse: HttpResponse<Cancha>) => {
                this.cancha = canchaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCanchas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'canchaListModification',
            (response) => this.load(this.cancha.id)
        );
    }
}
