import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { NivelSituacaoUpdateComponent } from 'app/entities/nivel-situacao/nivel-situacao-update.component';
import { NivelSituacaoService } from 'app/entities/nivel-situacao/nivel-situacao.service';
import { NivelSituacao } from 'app/shared/model/nivel-situacao.model';

describe('Component Tests', () => {
  describe('NivelSituacao Management Update Component', () => {
    let comp: NivelSituacaoUpdateComponent;
    let fixture: ComponentFixture<NivelSituacaoUpdateComponent>;
    let service: NivelSituacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSituacaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NivelSituacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NivelSituacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSituacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NivelSituacao('123');
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
        const entity = new NivelSituacao();
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
