import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { EventoRiscoComponent } from 'app/entities/evento-risco/evento-risco.component';
import { EventoRiscoService } from 'app/entities/evento-risco/evento-risco.service';
import { EventoRisco } from 'app/shared/model/evento-risco.model';

describe('Component Tests', () => {
  describe('EventoRisco Management Component', () => {
    let comp: EventoRiscoComponent;
    let fixture: ComponentFixture<EventoRiscoComponent>;
    let service: EventoRiscoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoRiscoComponent],
        providers: []
      })
        .overrideTemplate(EventoRiscoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventoRiscoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventoRiscoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EventoRisco('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eventoRiscos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
