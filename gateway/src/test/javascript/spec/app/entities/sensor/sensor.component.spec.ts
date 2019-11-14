import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SensorComponent } from 'app/entities/sensor/sensor.component';
import { SensorService } from 'app/entities/sensor/sensor.service';
import { Sensor } from 'app/shared/model/sensor.model';

describe('Component Tests', () => {
  describe('Sensor Management Component', () => {
    let comp: SensorComponent;
    let fixture: ComponentFixture<SensorComponent>;
    let service: SensorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorComponent],
        providers: []
      })
        .overrideTemplate(SensorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Sensor('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sensors[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
