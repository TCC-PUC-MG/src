import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { TipoAlertaUpdateComponent } from 'app/entities/tipo-alerta/tipo-alerta-update.component';
import { TipoAlertaService } from 'app/entities/tipo-alerta/tipo-alerta.service';
import { TipoAlerta } from 'app/shared/model/tipo-alerta.model';

describe('Component Tests', () => {
  describe('TipoAlerta Management Update Component', () => {
    let comp: TipoAlertaUpdateComponent;
    let fixture: ComponentFixture<TipoAlertaUpdateComponent>;
    let service: TipoAlertaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoAlertaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoAlertaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAlertaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAlertaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoAlerta('123');
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
        const entity = new TipoAlerta();
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
