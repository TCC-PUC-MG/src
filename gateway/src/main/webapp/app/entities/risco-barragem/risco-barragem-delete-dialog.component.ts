import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';
import { RiscoBarragemService } from './risco-barragem.service';

@Component({
  selector: 'jhi-risco-barragem-delete-dialog',
  templateUrl: './risco-barragem-delete-dialog.component.html'
})
export class RiscoBarragemDeleteDialogComponent {
  riscoBarragem: IRiscoBarragem;

  constructor(
    protected riscoBarragemService: RiscoBarragemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.riscoBarragemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'riscoBarragemListModification',
        content: 'Deleted an riscoBarragem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-risco-barragem-delete-popup',
  template: ''
})
export class RiscoBarragemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ riscoBarragem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RiscoBarragemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.riscoBarragem = riscoBarragem;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/risco-barragem', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/risco-barragem', { outlets: { popup: null } }]);
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
