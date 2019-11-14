import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { AlertaOrgaoDetailComponent } from 'app/entities/alerta-orgao/alerta-orgao-detail.component';
import { AlertaOrgao } from 'app/shared/model/alerta-orgao.model';

describe('Component Tests', () => {
  describe('AlertaOrgao Management Detail Component', () => {
    let comp: AlertaOrgaoDetailComponent;
    let fixture: ComponentFixture<AlertaOrgaoDetailComponent>;
    const route = ({ data: of({ alertaOrgao: new AlertaOrgao('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaOrgaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlertaOrgaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertaOrgaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alertaOrgao).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
