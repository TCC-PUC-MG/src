import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { AlertaEnviadosService } from './alerta-enviados.service';

@Component({
  selector: 'jhi-alerta-enviados-delete-dialog',
  templateUrl: './alerta-enviados-delete-dialog.component.html'
})
export class AlertaEnviadosDeleteDialogComponent {
  alertaEnviados: IAlertaEnviados;

  constructor(
    protected alertaEnviadosService: AlertaEnviadosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.alertaEnviadosService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'alertaEnviadosListModification',
        content: 'Deleted an alertaEnviados'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-alerta-enviados-delete-popup',
  template: ''
})
export class AlertaEnviadosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertaEnviados }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlertaEnviadosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.alertaEnviados = alertaEnviados;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/alerta-enviados', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/alerta-enviados', { outlets: { popup: null } }]);
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
