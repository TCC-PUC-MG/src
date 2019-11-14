import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { BarragemComponent } from 'app/entities/barragem/barragem.component';
import { BarragemService } from 'app/entities/barragem/barragem.service';
import { Barragem } from 'app/shared/model/barragem.model';

describe('Component Tests', () => {
  describe('Barragem Management Component', () => {
    let comp: BarragemComponent;
    let fixture: ComponentFixture<BarragemComponent>;
    let service: BarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarragemComponent],
        providers: []
      })
        .overrideTemplate(BarragemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BarragemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarragemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Barragem('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.barragems[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
