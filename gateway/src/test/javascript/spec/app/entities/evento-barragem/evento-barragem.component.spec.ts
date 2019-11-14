import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { EventoBarragemComponent } from 'app/entities/evento-barragem/evento-barragem.component';
import { EventoBarragemService } from 'app/entities/evento-barragem/evento-barragem.service';
import { EventoBarragem } from 'app/shared/model/evento-barragem.model';

describe('Component Tests', () => {
  describe('EventoBarragem Management Component', () => {
    let comp: EventoBarragemComponent;
    let fixture: ComponentFixture<EventoBarragemComponent>;
    let service: EventoBarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoBarragemComponent],
        providers: []
      })
        .overrideTemplate(EventoBarragemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventoBarragemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventoBarragemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EventoBarragem('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eventoBarragems[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
