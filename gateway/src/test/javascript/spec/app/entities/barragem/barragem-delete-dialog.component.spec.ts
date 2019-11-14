import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { BarragemDeleteDialogComponent } from 'app/entities/barragem/barragem-delete-dialog.component';
import { BarragemService } from 'app/entities/barragem/barragem.service';

describe('Component Tests', () => {
  describe('Barragem Management Delete Component', () => {
    let comp: BarragemDeleteDialogComponent;
    let fixture: ComponentFixture<BarragemDeleteDialogComponent>;
    let service: BarragemService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarragemDeleteDialogComponent]
      })
        .overrideTemplate(BarragemDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BarragemDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarragemService);
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
