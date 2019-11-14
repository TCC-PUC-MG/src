import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { NivelSituacaoComponent } from 'app/entities/nivel-situacao/nivel-situacao.component';
import { NivelSituacaoService } from 'app/entities/nivel-situacao/nivel-situacao.service';
import { NivelSituacao } from 'app/shared/model/nivel-situacao.model';

describe('Component Tests', () => {
  describe('NivelSituacao Management Component', () => {
    let comp: NivelSituacaoComponent;
    let fixture: ComponentFixture<NivelSituacaoComponent>;
    let service: NivelSituacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSituacaoComponent],
        providers: []
      })
        .overrideTemplate(NivelSituacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NivelSituacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSituacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NivelSituacao('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.nivelSituacaos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
