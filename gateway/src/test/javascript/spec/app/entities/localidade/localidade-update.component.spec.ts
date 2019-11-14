import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { LocalidadeUpdateComponent } from 'app/entities/localidade/localidade-update.component';
import { LocalidadeService } from 'app/entities/localidade/localidade.service';
import { Localidade } from 'app/shared/model/localidade.model';

describe('Component Tests', () => {
  describe('Localidade Management Update Component', () => {
    let comp: LocalidadeUpdateComponent;
    let fixture: ComponentFixture<LocalidadeUpdateComponent>;
    let service: LocalidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalidadeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LocalidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Localidade('123');
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
        const entity = new Localidade();
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
