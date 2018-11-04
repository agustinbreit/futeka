/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FutekaTestModule } from '../../../test.module';
import { CanchaDetailComponent } from '../../../../../../main/webapp/app/entities/cancha/cancha-detail.component';
import { CanchaService } from '../../../../../../main/webapp/app/entities/cancha/cancha.service';
import { Cancha } from '../../../../../../main/webapp/app/entities/cancha/cancha.model';

describe('Component Tests', () => {

    describe('Cancha Management Detail Component', () => {
        let comp: CanchaDetailComponent;
        let fixture: ComponentFixture<CanchaDetailComponent>;
        let service: CanchaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FutekaTestModule],
                declarations: [CanchaDetailComponent],
                providers: [
                    CanchaService
                ]
            })
            .overrideTemplate(CanchaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CanchaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CanchaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cancha(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cancha).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
