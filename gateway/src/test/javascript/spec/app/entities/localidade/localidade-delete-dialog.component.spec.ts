import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { LocalidadeDeleteDialogComponent } from 'app/entities/localidade/localidade-delete-dialog.component';
import { LocalidadeService } from 'app/entities/localidade/localidade.service';

describe('Component Tests', () => {
  describe('Localidade Management Delete Component', () => {
    let comp: LocalidadeDeleteDialogComponent;
    let fixture: ComponentFixture<LocalidadeDeleteDialogComponent>;
    let service: LocalidadeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalidadeDeleteDialogComponent]
      })
        .overrideTemplate(LocalidadeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalidadeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalidadeService);
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
