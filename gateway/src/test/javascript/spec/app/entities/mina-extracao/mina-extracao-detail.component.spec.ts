import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { MinaExtracaoDetailComponent } from 'app/entities/mina-extracao/mina-extracao-detail.component';
import { MinaExtracao } from 'app/shared/model/mina-extracao.model';

describe('Component Tests', () => {
  describe('MinaExtracao Management Detail Component', () => {
    let comp: MinaExtracaoDetailComponent;
    let fixture: ComponentFixture<MinaExtracaoDetailComponent>;
    const route = ({ data: of({ minaExtracao: new MinaExtracao('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MinaExtracaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MinaExtracaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MinaExtracaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.minaExtracao).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
