import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EventoRiscoDetailComponent } from 'app/entities/evento-risco/evento-risco-detail.component';
import { EventoRisco } from 'app/shared/model/evento-risco.model';

describe('Component Tests', () => {
  describe('EventoRisco Management Detail Component', () => {
    let comp: EventoRiscoDetailComponent;
    let fixture: ComponentFixture<EventoRiscoDetailComponent>;
    const route = ({ data: of({ eventoRisco: new EventoRisco('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoRiscoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EventoRiscoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventoRiscoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eventoRisco).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
