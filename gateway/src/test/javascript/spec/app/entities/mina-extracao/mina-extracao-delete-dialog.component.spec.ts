import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { MinaExtracaoDeleteDialogComponent } from 'app/entities/mina-extracao/mina-extracao-delete-dialog.component';
import { MinaExtracaoService } from 'app/entities/mina-extracao/mina-extracao.service';

describe('Component Tests', () => {
  describe('MinaExtracao Management Delete Component', () => {
    let comp: MinaExtracaoDeleteDialogComponent;
    let fixture: ComponentFixture<MinaExtracaoDeleteDialogComponent>;
    let service: MinaExtracaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MinaExtracaoDeleteDialogComponent]
      })
        .overrideTemplate(MinaExtracaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MinaExtracaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MinaExtracaoService);
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
