import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { NivelSegurancaDeleteDialogComponent } from 'app/entities/nivel-seguranca/nivel-seguranca-delete-dialog.component';
import { NivelSegurancaService } from 'app/entities/nivel-seguranca/nivel-seguranca.service';

describe('Component Tests', () => {
  describe('NivelSeguranca Management Delete Component', () => {
    let comp: NivelSegurancaDeleteDialogComponent;
    let fixture: ComponentFixture<NivelSegurancaDeleteDialogComponent>;
    let service: NivelSegurancaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSegurancaDeleteDialogComponent]
      })
        .overrideTemplate(NivelSegurancaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NivelSegurancaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSegurancaService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
