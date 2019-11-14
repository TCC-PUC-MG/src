import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { NivelSegurancaUpdateComponent } from 'app/entities/nivel-seguranca/nivel-seguranca-update.component';
import { NivelSegurancaService } from 'app/entities/nivel-seguranca/nivel-seguranca.service';
import { NivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

describe('Component Tests', () => {
  describe('NivelSeguranca Management Update Component', () => {
    let comp: NivelSegurancaUpdateComponent;
    let fixture: ComponentFixture<NivelSegurancaUpdateComponent>;
    let service: NivelSegurancaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSegurancaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NivelSegurancaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NivelSegurancaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSegurancaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NivelSeguranca('123');
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
        const entity = new NivelSeguranca();
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
