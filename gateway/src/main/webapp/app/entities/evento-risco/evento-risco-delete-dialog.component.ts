import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEventoRisco } from 'app/shared/model/evento-risco.model';
import { EventoRiscoService } from './evento-risco.service';

@Component({
  selector: 'jhi-evento-risco-delete-dialog',
  templateUrl: './evento-risco-delete-dialog.component.html'
})
export class EventoRiscoDeleteDialogComponent {
  eventoRisco: IEventoRisco;

  constructor(
    protected eventoRiscoService: EventoRiscoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.eventoRiscoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'eventoRiscoListModification',
        content: 'Deleted an eventoRisco'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-evento-risco-delete-popup',
  template: ''
})
export class EventoRiscoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventoRisco }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EventoRiscoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.eventoRisco = eventoRisco;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/evento-risco', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/evento-risco', { outlets: { popup: null } }]);
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
