import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OcorrenciasDetailComponent } from 'app/entities/ocorrencias/ocorrencias-detail.component';
import { Ocorrencias } from 'app/shared/model/ocorrencias.model';

describe('Component Tests', () => {
  describe('Ocorrencias Management Detail Component', () => {
    let comp: OcorrenciasDetailComponent;
    let fixture: ComponentFixture<OcorrenciasDetailComponent>;
    const route = ({ data: of({ ocorrencias: new Ocorrencias('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OcorrenciasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OcorrenciasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OcorrenciasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ocorrencias).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
