import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { NivelSegurancaComponent } from 'app/entities/nivel-seguranca/nivel-seguranca.component';
import { NivelSegurancaService } from 'app/entities/nivel-seguranca/nivel-seguranca.service';
import { NivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

describe('Component Tests', () => {
  describe('NivelSeguranca Management Component', () => {
    let comp: NivelSegurancaComponent;
    let fixture: ComponentFixture<NivelSegurancaComponent>;
    let service: NivelSegurancaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSegurancaComponent],
        providers: []
      })
        .overrideTemplate(NivelSegurancaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NivelSegurancaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSegurancaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NivelSeguranca('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.nivelSegurancas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
