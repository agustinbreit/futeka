/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FutekaTestModule } from '../../../test.module';
import { TurnoComponent } from '../../../../../../main/webapp/app/entities/turno/turno.component';
import { TurnoService } from '../../../../../../main/webapp/app/entities/turno/turno.service';
import { Turno } from '../../../../../../main/webapp/app/entities/turno/turno.model';

describe('Component Tests', () => {

    describe('Turno Management Component', () => {
        let comp: TurnoComponent;
        let fixture: ComponentFixture<TurnoComponent>;
        let service: TurnoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FutekaTestModule],
                declarations: [TurnoComponent],
                providers: [
                    TurnoService
                ]
            })
            .overrideTemplate(TurnoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurnoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurnoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Turno(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.turnos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
