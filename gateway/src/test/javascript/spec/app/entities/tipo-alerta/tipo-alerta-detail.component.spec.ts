import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { TipoAlertaDetailComponent } from 'app/entities/tipo-alerta/tipo-alerta-detail.component';
import { TipoAlerta } from 'app/shared/model/tipo-alerta.model';

describe('Component Tests', () => {
  describe('TipoAlerta Management Detail Component', () => {
    let comp: TipoAlertaDetailComponent;
    let fixture: ComponentFixture<TipoAlertaDetailComponent>;
    const route = ({ data: of({ tipoAlerta: new TipoAlerta('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoAlertaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoAlertaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAlertaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoAlerta).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
