import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { AlertaOrgaoComponent } from 'app/entities/alerta-orgao/alerta-orgao.component';
import { AlertaOrgaoService } from 'app/entities/alerta-orgao/alerta-orgao.service';
import { AlertaOrgao } from 'app/shared/model/alerta-orgao.model';

describe('Component Tests', () => {
  describe('AlertaOrgao Management Component', () => {
    let comp: AlertaOrgaoComponent;
    let fixture: ComponentFixture<AlertaOrgaoComponent>;
    let service: AlertaOrgaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaOrgaoComponent],
        providers: []
      })
        .overrideTemplate(AlertaOrgaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertaOrgaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaOrgaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AlertaOrgao('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.alertaOrgaos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
