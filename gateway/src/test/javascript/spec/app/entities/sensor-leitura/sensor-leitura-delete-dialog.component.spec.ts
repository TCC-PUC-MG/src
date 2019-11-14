import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { SensorLeituraDeleteDialogComponent } from 'app/entities/sensor-leitura/sensor-leitura-delete-dialog.component';
import { SensorLeituraService } from 'app/entities/sensor-leitura/sensor-leitura.service';

describe('Component Tests', () => {
  describe('SensorLeitura Management Delete Component', () => {
    let comp: SensorLeituraDeleteDialogComponent;
    let fixture: ComponentFixture<SensorLeituraDeleteDialogComponent>;
    let service: SensorLeituraService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensorLeituraDeleteDialogComponent]
      })
        .overrideTemplate(SensorLeituraDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SensorLeituraDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorLeituraService);
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
