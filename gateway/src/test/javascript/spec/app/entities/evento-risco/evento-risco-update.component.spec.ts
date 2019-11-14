import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EventoRiscoUpdateComponent } from 'app/entities/evento-risco/evento-risco-update.component';
import { EventoRiscoService } from 'app/entities/evento-risco/evento-risco.service';
import { EventoRisco } from 'app/shared/model/evento-risco.model';

describe('Component Tests', () => {
  describe('EventoRisco Management Update Component', () => {
    let comp: EventoRiscoUpdateComponent;
    let fixture: ComponentFixture<EventoRiscoUpdateComponent>;
    let service: EventoRiscoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EventoRiscoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EventoRiscoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventoRiscoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventoRiscoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EventoRisco('123');
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
        const entity = new EventoRisco();
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
