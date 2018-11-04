/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FutekaTestModule } from '../../../test.module';
import { CanchaComponent } from '../../../../../../main/webapp/app/entities/cancha/cancha.component';
import { CanchaService } from '../../../../../../main/webapp/app/entities/cancha/cancha.service';
import { Cancha } from '../../../../../../main/webapp/app/entities/cancha/cancha.model';

describe('Component Tests', () => {

    describe('Cancha Management Component', () => {
        let comp: CanchaComponent;
        let fixture: ComponentFixture<CanchaComponent>;
        let service: CanchaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FutekaTestModule],
                declarations: [CanchaComponent],
                providers: [
                    CanchaService
                ]
            })
            .overrideTemplate(CanchaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CanchaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CanchaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Cancha(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.canchas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
