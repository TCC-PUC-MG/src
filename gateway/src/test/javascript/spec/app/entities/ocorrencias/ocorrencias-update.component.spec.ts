import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OcorrenciasUpdateComponent } from 'app/entities/ocorrencias/ocorrencias-update.component';
import { OcorrenciasService } from 'app/entities/ocorrencias/ocorrencias.service';
import { Ocorrencias } from 'app/shared/model/ocorrencias.model';

describe('Component Tests', () => {
  describe('Ocorrencias Management Update Component', () => {
    let comp: OcorrenciasUpdateComponent;
    let fixture: ComponentFixture<OcorrenciasUpdateComponent>;
    let service: OcorrenciasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OcorrenciasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OcorrenciasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OcorrenciasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OcorrenciasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ocorrencias('123');
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
        const entity = new Ocorrencias();
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
