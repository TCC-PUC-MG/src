import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { BarragemUpdateComponent } from 'app/entities/barragem/barragem-update.component';
import { BarragemService } from 'app/entities/barragem/barragem.service';
import { Barragem } from 'app/shared/model/barragem.model';

describe('Component Tests', () => {
  describe('Barragem Management Update Component', () => {
    let comp: BarragemUpdateComponent;
    let fixture: ComponentFixture<BarragemUpdateComponent>;
    let service: BarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarragemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BarragemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BarragemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarragemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Barragem('123');
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
        const entity = new Barragem();
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
