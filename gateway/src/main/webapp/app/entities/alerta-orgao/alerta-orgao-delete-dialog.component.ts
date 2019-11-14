import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { AlertaOrgaoService } from './alerta-orgao.service';

@Component({
  selector: 'jhi-alerta-orgao-delete-dialog',
  templateUrl: './alerta-orgao-delete-dialog.component.html'
})
export class AlertaOrgaoDeleteDialogComponent {
  alertaOrgao: IAlertaOrgao;

  constructor(
    protected alertaOrgaoService: AlertaOrgaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.alertaOrgaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'alertaOrgaoListModification',
        content: 'Deleted an alertaOrgao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-alerta-orgao-delete-popup',
  template: ''
})
export class AlertaOrgaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertaOrgao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlertaOrgaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.alertaOrgao = alertaOrgao;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/alerta-orgao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/alerta-orgao', { outlets: { popup: null } }]);
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
