import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { OcorrenciasComponent } from 'app/entities/ocorrencias/ocorrencias.component';
import { OcorrenciasService } from 'app/entities/ocorrencias/ocorrencias.service';
import { Ocorrencias } from 'app/shared/model/ocorrencias.model';

describe('Component Tests', () => {
  describe('Ocorrencias Management Component', () => {
    let comp: OcorrenciasComponent;
    let fixture: ComponentFixture<OcorrenciasComponent>;
    let service: OcorrenciasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OcorrenciasComponent],
        providers: []
      })
        .overrideTemplate(OcorrenciasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OcorrenciasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OcorrenciasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ocorrencias('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ocorrencias[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
