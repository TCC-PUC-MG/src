import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { TipoAlertaDeleteDialogComponent } from 'app/entities/tipo-alerta/tipo-alerta-delete-dialog.component';
import { TipoAlertaService } from 'app/entities/tipo-alerta/tipo-alerta.service';

describe('Component Tests', () => {
  describe('TipoAlerta Management Delete Component', () => {
    let comp: TipoAlertaDeleteDialogComponent;
    let fixture: ComponentFixture<TipoAlertaDeleteDialogComponent>;
    let service: TipoAlertaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TipoAlertaDeleteDialogComponent]
      })
        .overrideTemplate(TipoAlertaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAlertaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAlertaService);
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
