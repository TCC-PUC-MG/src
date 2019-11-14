import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { NivelSituacaoDetailComponent } from 'app/entities/nivel-situacao/nivel-situacao-detail.component';
import { NivelSituacao } from 'app/shared/model/nivel-situacao.model';

describe('Component Tests', () => {
  describe('NivelSituacao Management Detail Component', () => {
    let comp: NivelSituacaoDetailComponent;
    let fixture: ComponentFixture<NivelSituacaoDetailComponent>;
    const route = ({ data: of({ nivelSituacao: new NivelSituacao('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSituacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NivelSituacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NivelSituacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nivelSituacao).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
