import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { NivelSegurancaDetailComponent } from 'app/entities/nivel-seguranca/nivel-seguranca-detail.component';
import { NivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

describe('Component Tests', () => {
  describe('NivelSeguranca Management Detail Component', () => {
    let comp: NivelSegurancaDetailComponent;
    let fixture: ComponentFixture<NivelSegurancaDetailComponent>;
    const route = ({ data: of({ nivelSeguranca: new NivelSeguranca('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSegurancaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NivelSegurancaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NivelSegurancaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nivelSeguranca).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
