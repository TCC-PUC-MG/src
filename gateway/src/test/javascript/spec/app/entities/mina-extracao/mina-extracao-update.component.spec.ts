import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { MinaExtracaoUpdateComponent } from 'app/entities/mina-extracao/mina-extracao-update.component';
import { MinaExtracaoService } from 'app/entities/mina-extracao/mina-extracao.service';
import { MinaExtracao } from 'app/shared/model/mina-extracao.model';

describe('Component Tests', () => {
  describe('MinaExtracao Management Update Component', () => {
    let comp: MinaExtracaoUpdateComponent;
    let fixture: ComponentFixture<MinaExtracaoUpdateComponent>;
    let service: MinaExtracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MinaExtracaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MinaExtracaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MinaExtracaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MinaExtracaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MinaExtracao('123');
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
        const entity = new MinaExtracao();
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
