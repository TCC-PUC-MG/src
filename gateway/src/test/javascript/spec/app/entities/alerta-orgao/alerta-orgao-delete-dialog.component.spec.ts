import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { AlertaOrgaoDeleteDialogComponent } from 'app/entities/alerta-orgao/alerta-orgao-delete-dialog.component';
import { AlertaOrgaoService } from 'app/entities/alerta-orgao/alerta-orgao.service';

describe('Component Tests', () => {
  describe('AlertaOrgao Management Delete Component', () => {
    let comp: AlertaOrgaoDeleteDialogComponent;
    let fixture: ComponentFixture<AlertaOrgaoDeleteDialogComponent>;
    let service: AlertaOrgaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AlertaOrgaoDeleteDialogComponent]
      })
        .overrideTemplate(AlertaOrgaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertaOrgaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertaOrgaoService);
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
