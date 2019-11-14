import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { RiscoBarragemDeleteDialogComponent } from 'app/entities/risco-barragem/risco-barragem-delete-dialog.component';
import { RiscoBarragemService } from 'app/entities/risco-barragem/risco-barragem.service';

describe('Component Tests', () => {
  describe('RiscoBarragem Management Delete Component', () => {
    let comp: RiscoBarragemDeleteDialogComponent;
    let fixture: ComponentFixture<RiscoBarragemDeleteDialogComponent>;
    let service: RiscoBarragemService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RiscoBarragemDeleteDialogComponent]
      })
        .overrideTemplate(RiscoBarragemDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RiscoBarragemDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RiscoBarragemService);
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
