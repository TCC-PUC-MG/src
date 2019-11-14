import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOcorrencias } from 'app/shared/model/ocorrencias.model';
import { OcorrenciasService } from './ocorrencias.service';

@Component({
  selector: 'jhi-ocorrencias-delete-dialog',
  templateUrl: './ocorrencias-delete-dialog.component.html'
})
export class OcorrenciasDeleteDialogComponent {
  ocorrencias: IOcorrencias;

  constructor(
    protected ocorrenciasService: OcorrenciasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.ocorrenciasService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ocorrenciasListModification',
        content: 'Deleted an ocorrencias'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ocorrencias-delete-popup',
  template: ''
})
export class OcorrenciasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ocorrencias }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OcorrenciasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ocorrencias = ocorrencias;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/ocorrencias', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/ocorrencias', { outlets: { popup: null } }]);
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
