import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBarragem } from 'app/shared/model/barragem.model';
import { BarragemService } from './barragem.service';

@Component({
  selector: 'jhi-barragem-delete-dialog',
  templateUrl: './barragem-delete-dialog.component.html'
})
export class BarragemDeleteDialogComponent {
  barragem: IBarragem;

  constructor(protected barragemService: BarragemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.barragemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'barragemListModification',
        content: 'Deleted an barragem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-barragem-delete-popup',
  template: ''
})
export class BarragemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ barragem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BarragemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.barragem = barragem;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/barragem', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/barragem', { outlets: { popup: null } }]);
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
