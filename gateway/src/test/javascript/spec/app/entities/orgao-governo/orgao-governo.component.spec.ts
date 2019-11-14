import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { OrgaoGovernoComponent } from 'app/entities/orgao-governo/orgao-governo.component';
import { OrgaoGovernoService } from 'app/entities/orgao-governo/orgao-governo.service';
import { OrgaoGoverno } from 'app/shared/model/orgao-governo.model';

describe('Component Tests', () => {
  describe('OrgaoGoverno Management Component', () => {
    let comp: OrgaoGovernoComponent;
    let fixture: ComponentFixture<OrgaoGovernoComponent>;
    let service: OrgaoGovernoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrgaoGovernoComponent],
        providers: []
      })
        .overrideTemplate(OrgaoGovernoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrgaoGovernoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrgaoGovernoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrgaoGoverno('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orgaoGovernos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
