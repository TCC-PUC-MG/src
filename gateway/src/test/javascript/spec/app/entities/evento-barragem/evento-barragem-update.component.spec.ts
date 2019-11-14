import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EventoBarragemUpdateComponent } from 'app/entities/evento-barragem/evento-barragem-update.component';
import { EventoBarragemService } from 'app/entities/evento-barragem/evento-barragem.service';
import { EventoBarragem } from 'app/shared/model/evento-barragem.model';

describe('Component Tests', () => {
  describe('EventoBarragem Management Update Component', () => {
    let comp: EventoBarragemUpdateComponent;
    let fixture: ComponentFixture<EventoBarragemUpdateComponent>;
    let service: EventoBarragemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoBarragemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EventoBarragemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventoBarragemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventoBarragemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EventoBarragem('123');
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
        const entity = new EventoBarragem();
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
