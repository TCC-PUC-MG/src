import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SensorUpdateComponent } from 'app/entities/sensor/sensor-update.component';
import { SensorService } from 'app/entities/sensor/sensor.service';
import { Sensor } from 'app/shared/model/sensor.model';

describe('Component Tests', () => {
  describe('Sensor Management Update Component', () => {
    let comp: SensorUpdateComponent;
    let fixture: ComponentFixture<SensorUpdateComponent>;
    let service: SensorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SensorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sensor('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sensor();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
