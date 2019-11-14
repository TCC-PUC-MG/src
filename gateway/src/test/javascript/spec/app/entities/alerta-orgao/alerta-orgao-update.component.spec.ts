import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { AlertaOrgaoUpdateComponent } from 'app/entities/alerta-orgao/alerta-orgao-update.component';
import { AlertaOrgaoService } from 'app/entities/alerta-orgao/alerta-orgao.service';
import { AlertaOrgao } from 'app/shared/model/alerta-orgao.model';

describe('Component Tests', () => {
  describe('AlertaOrgao Management Update Component', () => {
    let comp: AlertaOrgaoUpdateComponent;
    let fixture: ComponentFixture<AlertaOrgaoUpdateComponent>;
    let service: AlertaOrgaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaOrgaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlertaOrgaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertaOrgaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaOrgaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlertaOrgao('123');
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
        const entity = new AlertaOrgao();
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
