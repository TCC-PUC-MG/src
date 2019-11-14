import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { AlertaEnviadosComponent } from 'app/entities/alerta-enviados/alerta-enviados.component';
import { AlertaEnviadosService } from 'app/entities/alerta-enviados/alerta-enviados.service';
import { AlertaEnviados } from 'app/shared/model/alerta-enviados.model';

describe('Component Tests', () => {
  describe('AlertaEnviados Management Component', () => {
    let comp: AlertaEnviadosComponent;
    let fixture: ComponentFixture<AlertaEnviadosComponent>;
    let service: AlertaEnviadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaEnviadosComponent],
        providers: []
      })
        .overrideTemplate(AlertaEnviadosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertaEnviadosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaEnviadosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AlertaEnviados('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.alertaEnviados[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
