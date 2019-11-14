import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EventoBarragemDetailComponent } from 'app/entities/evento-barragem/evento-barragem-detail.component';
import { EventoBarragem } from 'app/shared/model/evento-barragem.model';

describe('Component Tests', () => {
  describe('EventoBarragem Management Detail Component', () => {
    let comp: EventoBarragemDetailComponent;
    let fixture: ComponentFixture<EventoBarragemDetailComponent>;
    const route = ({ data: of({ eventoBarragem: new EventoBarragem('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoBarragemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EventoBarragemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventoBarragemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eventoBarragem).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
