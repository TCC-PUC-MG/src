import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';
import { EventoBarragemService } from './evento-barragem.service';

@Component({
  selector: 'jhi-evento-barragem-delete-dialog',
  templateUrl: './evento-barragem-delete-dialog.component.html'
})
export class EventoBarragemDeleteDialogComponent {
  eventoBarragem: IEventoBarragem;

  constructor(
    protected eventoBarragemService: EventoBarragemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.eventoBarragemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'eventoBarragemListModification',
        content: 'Deleted an eventoBarragem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-evento-barragem-delete-popup',
  template: ''
})
export class EventoBarragemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventoBarragem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EventoBarragemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.eventoBarragem = eventoBarragem;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/evento-barragem', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/evento-barragem', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
