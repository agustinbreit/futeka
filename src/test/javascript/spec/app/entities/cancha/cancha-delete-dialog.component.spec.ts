/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FutekaTestModule } from '../../../test.module';
import { CanchaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cancha/cancha-delete-dialog.component';
import { CanchaService } from '../../../../../../main/webapp/app/entities/cancha/cancha.service';

describe('Component Tests', () => {

    describe('Cancha Management Delete Component', () => {
        let comp: CanchaDeleteDialogComponent;
        let fixture: ComponentFixture<CanchaDeleteDialogComponent>;
        let service: CanchaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FutekaTestModule],
                declarations: [CanchaDeleteDialogComponent],
                providers: [
                    CanchaService
                ]
            })
            .overrideTemplate(CanchaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CanchaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CanchaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
