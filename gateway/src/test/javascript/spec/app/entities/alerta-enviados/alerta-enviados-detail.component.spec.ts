import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { AlertaEnviadosDetailComponent } from 'app/entities/alerta-enviados/alerta-enviados-detail.component';
import { AlertaEnviados } from 'app/shared/model/alerta-enviados.model';

describe('Component Tests', () => {
  describe('AlertaEnviados Management Detail Component', () => {
    let comp: AlertaEnviadosDetailComponent;
    let fixture: ComponentFixture<AlertaEnviadosDetailComponent>;
    const route = ({ data: of({ alertaEnviados: new AlertaEnviados('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaEnviadosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlertaEnviadosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertaEnviadosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alertaEnviados).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
