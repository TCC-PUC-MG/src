import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { RiscoBarragemComponent } from 'app/entities/risco-barragem/risco-barragem.component';
import { RiscoBarragemService } from 'app/entities/risco-barragem/risco-barragem.service';
import { RiscoBarragem } from 'app/shared/model/risco-barragem.model';

describe('Component Tests', () => {
  describe('RiscoBarragem Management Component', () => {
    let comp: RiscoBarragemComponent;
    let fixture: ComponentFixture<RiscoBarragemComponent>;
    let service: RiscoBarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RiscoBarragemComponent],
        providers: []
      })
        .overrideTemplate(RiscoBarragemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RiscoBarragemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RiscoBarragemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RiscoBarragem('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.riscoBarragems[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
