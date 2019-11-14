import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { MinaExtracaoComponent } from 'app/entities/mina-extracao/mina-extracao.component';
import { MinaExtracaoService } from 'app/entities/mina-extracao/mina-extracao.service';
import { MinaExtracao } from 'app/shared/model/mina-extracao.model';

describe('Component Tests', () => {
  describe('MinaExtracao Management Component', () => {
    let comp: MinaExtracaoComponent;
    let fixture: ComponentFixture<MinaExtracaoComponent>;
    let service: MinaExtracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MinaExtracaoComponent],
        providers: []
      })
        .overrideTemplate(MinaExtracaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MinaExtracaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MinaExtracaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MinaExtracao('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.minaExtracaos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
