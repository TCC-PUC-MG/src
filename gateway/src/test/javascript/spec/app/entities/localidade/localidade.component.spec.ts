import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { LocalidadeComponent } from 'app/entities/localidade/localidade.component';
import { LocalidadeService } from 'app/entities/localidade/localidade.service';
import { Localidade } from 'app/shared/model/localidade.model';

describe('Component Tests', () => {
  describe('Localidade Management Component', () => {
    let comp: LocalidadeComponent;
    let fixture: ComponentFixture<LocalidadeComponent>;
    let service: LocalidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalidadeComponent],
        providers: []
      })
        .overrideTemplate(LocalidadeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalidadeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalidadeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Localidade('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localidades[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
