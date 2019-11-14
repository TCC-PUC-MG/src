import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { AlertaEnviadosDeleteDialogComponent } from 'app/entities/alerta-enviados/alerta-enviados-delete-dialog.component';
import { AlertaEnviadosService } from 'app/entities/alerta-enviados/alerta-enviados.service';

describe('Component Tests', () => {
  describe('AlertaEnviados Management Delete Component', () => {
    let comp: AlertaEnviadosDeleteDialogComponent;
    let fixture: ComponentFixture<AlertaEnviadosDeleteDialogComponent>;
    let service: AlertaEnviadosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaEnviadosDeleteDialogComponent]
      })
        .overrideTemplate(AlertaEnviadosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertaEnviadosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaEnviadosService);
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
