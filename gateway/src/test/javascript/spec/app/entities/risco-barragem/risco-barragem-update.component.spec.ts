import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { RiscoBarragemUpdateComponent } from 'app/entities/risco-barragem/risco-barragem-update.component';
import { RiscoBarragemService } from 'app/entities/risco-barragem/risco-barragem.service';
import { RiscoBarragem } from 'app/shared/model/risco-barragem.model';

describe('Component Tests', () => {
  describe('RiscoBarragem Management Update Component', () => {
    let comp: RiscoBarragemUpdateComponent;
    let fixture: ComponentFixture<RiscoBarragemUpdateComponent>;
    let service: RiscoBarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RiscoBarragemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RiscoBarragemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RiscoBarragemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RiscoBarragemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RiscoBarragem('123');
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
        const entity = new RiscoBarragem();
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
