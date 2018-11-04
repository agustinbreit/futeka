/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FutekaTestModule } from '../../../test.module';
import { TurnoDetailComponent } from '../../../../../../main/webapp/app/entities/turno/turno-detail.component';
import { TurnoService } from '../../../../../../main/webapp/app/entities/turno/turno.service';
import { Turno } from '../../../../../../main/webapp/app/entities/turno/turno.model';

describe('Component Tests', () => {

    describe('Turno Management Detail Component', () => {
        let comp: TurnoDetailComponent;
        let fixture: ComponentFixture<TurnoDetailComponent>;
        let service: TurnoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FutekaTestModule],
                declarations: [TurnoDetailComponent],
                providers: [
                    TurnoService
                ]
            })
            .overrideTemplate(TurnoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurnoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurnoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Turno(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.turno).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
