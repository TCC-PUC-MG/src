import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SensorLeituraDetailComponent } from 'app/entities/sensor-leitura/sensor-leitura-detail.component';
import { SensorLeitura } from 'app/shared/model/sensor-leitura.model';

describe('Component Tests', () => {
  describe('SensorLeitura Management Detail Component', () => {
    let comp: SensorLeituraDetailComponent;
    let fixture: ComponentFixture<SensorLeituraDetailComponent>;
    const route = ({ data: of({ sensorLeitura: new SensorLeitura('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorLeituraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SensorLeituraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SensorLeituraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sensorLeitura).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
