import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { NivelSituacaoDeleteDialogComponent } from 'app/entities/nivel-situacao/nivel-situacao-delete-dialog.component';
import { NivelSituacaoService } from 'app/entities/nivel-situacao/nivel-situacao.service';

describe('Component Tests', () => {
  describe('NivelSituacao Management Delete Component', () => {
    let comp: NivelSituacaoDeleteDialogComponent;
    let fixture: ComponentFixture<NivelSituacaoDeleteDialogComponent>;
    let service: NivelSituacaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NivelSituacaoDeleteDialogComponent]
      })
        .overrideTemplate(NivelSituacaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NivelSituacaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NivelSituacaoService);
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
