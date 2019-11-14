import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';
import { NivelSituacaoService } from './nivel-situacao.service';

@Component({
  selector: 'jhi-nivel-situacao-delete-dialog',
  templateUrl: './nivel-situacao-delete-dialog.component.html'
})
export class NivelSituacaoDeleteDialogComponent {
  nivelSituacao: INivelSituacao;

  constructor(
    protected nivelSituacaoService: NivelSituacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.nivelSituacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'nivelSituacaoListModification',
        content: 'Deleted an nivelSituacao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nivel-situacao-delete-popup',
  template: ''
})
export class NivelSituacaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nivelSituacao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NivelSituacaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.nivelSituacao = nivelSituacao;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/nivel-situacao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/nivel-situacao', { outlets: { popup: null } }]);
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
