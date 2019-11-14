import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SensorLeituraComponent } from 'app/entities/sensor-leitura/sensor-leitura.component';
import { SensorLeituraService } from 'app/entities/sensor-leitura/sensor-leitura.service';
import { SensorLeitura } from 'app/shared/model/sensor-leitura.model';

describe('Component Tests', () => {
  describe('SensorLeitura Management Component', () => {
    let comp: SensorLeituraComponent;
    let fixture: ComponentFixture<SensorLeituraComponent>;
    let service: SensorLeituraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorLeituraComponent],
        providers: []
      })
        .overrideTemplate(SensorLeituraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorLeituraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorLeituraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SensorLeitura('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sensorLeituras[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
