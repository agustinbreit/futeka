import { Component, Input, OnInit } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-block-ui-custom',
    templateUrl: './block-ui.component.html',
    styleUrls: [
        'block-ui.scss'
    ]
})
export class BlockUICustomComponent implements OnInit {
    @Input() blocked = false;
    color = 'primary';
    mode = 'indeterminate';
    value = 100;
    constructor(private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager, ) {

    }

    ngOnInit() {
    }

    loadAll() {

    }
}
