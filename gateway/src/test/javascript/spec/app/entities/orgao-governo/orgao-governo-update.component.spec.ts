import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrgaoGovernoUpdateComponent } from 'app/entities/orgao-governo/orgao-governo-update.component';
import { OrgaoGovernoService } from 'app/entities/orgao-governo/orgao-governo.service';
import { OrgaoGoverno } from 'app/shared/model/orgao-governo.model';

describe('Component Tests', () => {
  describe('OrgaoGoverno Management Update Component', () => {
    let comp: OrgaoGovernoUpdateComponent;
    let fixture: ComponentFixture<OrgaoGovernoUpdateComponent>;
    let service: OrgaoGovernoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrgaoGovernoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrgaoGovernoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrgaoGovernoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrgaoGovernoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrgaoGoverno('123');
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
        const entity = new OrgaoGoverno();
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
