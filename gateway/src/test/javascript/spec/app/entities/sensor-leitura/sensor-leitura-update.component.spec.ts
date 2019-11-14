import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SensorLeituraUpdateComponent } from 'app/entities/sensor-leitura/sensor-leitura-update.component';
import { SensorLeituraService } from 'app/entities/sensor-leitura/sensor-leitura.service';
import { SensorLeitura } from 'app/shared/model/sensor-leitura.model';

describe('Component Tests', () => {
  describe('SensorLeitura Management Update Component', () => {
    let comp: SensorLeituraUpdateComponent;
    let fixture: ComponentFixture<SensorLeituraUpdateComponent>;
    let service: SensorLeituraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorLeituraUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SensorLeituraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorLeituraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorLeituraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SensorLeitura('123');
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
        const entity = new SensorLeitura();
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
