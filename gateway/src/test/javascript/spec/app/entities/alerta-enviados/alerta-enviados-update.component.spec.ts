import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { AlertaEnviadosUpdateComponent } from 'app/entities/alerta-enviados/alerta-enviados-update.component';
import { AlertaEnviadosService } from 'app/entities/alerta-enviados/alerta-enviados.service';
import { AlertaEnviados } from 'app/shared/model/alerta-enviados.model';

describe('Component Tests', () => {
  describe('AlertaEnviados Management Update Component', () => {
    let comp: AlertaEnviadosUpdateComponent;
    let fixture: ComponentFixture<AlertaEnviadosUpdateComponent>;
    let service: AlertaEnviadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaEnviadosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlertaEnviadosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertaEnviadosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaEnviadosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlertaEnviados('123');
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
        const entity = new AlertaEnviados();
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
