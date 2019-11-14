import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrgaoGovernoDetailComponent } from 'app/entities/orgao-governo/orgao-governo-detail.component';
import { OrgaoGoverno } from 'app/shared/model/orgao-governo.model';

describe('Component Tests', () => {
  describe('OrgaoGoverno Management Detail Component', () => {
    let comp: OrgaoGovernoDetailComponent;
    let fixture: ComponentFixture<OrgaoGovernoDetailComponent>;
    const route = ({ data: of({ orgaoGoverno: new OrgaoGoverno('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrgaoGovernoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrgaoGovernoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrgaoGovernoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orgaoGoverno).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
