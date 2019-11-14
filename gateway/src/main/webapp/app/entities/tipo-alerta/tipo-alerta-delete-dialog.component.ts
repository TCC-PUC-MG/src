import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { TipoAlertaService } from './tipo-alerta.service';

@Component({
  selector: 'jhi-tipo-alerta-delete-dialog',
  templateUrl: './tipo-alerta-delete-dialog.component.html'
})
export class TipoAlertaDeleteDialogComponent {
  tipoAlerta: ITipoAlerta;

  constructor(
    protected tipoAlertaService: TipoAlertaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.tipoAlertaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tipoAlertaListModification',
        content: 'Deleted an tipoAlerta'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-alerta-delete-popup',
  template: ''
})
export class TipoAlertaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoAlerta }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoAlertaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoAlerta = tipoAlerta;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/tipo-alerta', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/tipo-alerta', { outlets: { popup: null } }]);
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
