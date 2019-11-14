import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { TipoAlertaComponent } from 'app/entities/tipo-alerta/tipo-alerta.component';
import { TipoAlertaService } from 'app/entities/tipo-alerta/tipo-alerta.service';
import { TipoAlerta } from 'app/shared/model/tipo-alerta.model';

describe('Component Tests', () => {
  describe('TipoAlerta Management Component', () => {
    let comp: TipoAlertaComponent;
    let fixture: ComponentFixture<TipoAlertaComponent>;
    let service: TipoAlertaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoAlertaComponent],
        providers: []
      })
        .overrideTemplate(TipoAlertaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAlertaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAlertaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoAlerta('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoAlertas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
