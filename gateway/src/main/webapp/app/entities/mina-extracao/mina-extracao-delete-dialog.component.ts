import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';
import { MinaExtracaoService } from './mina-extracao.service';

@Component({
  selector: 'jhi-mina-extracao-delete-dialog',
  templateUrl: './mina-extracao-delete-dialog.component.html'
})
export class MinaExtracaoDeleteDialogComponent {
  minaExtracao: IMinaExtracao;

  constructor(
    protected minaExtracaoService: MinaExtracaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.minaExtracaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'minaExtracaoListModification',
        content: 'Deleted an minaExtracao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mina-extracao-delete-popup',
  template: ''
})
export class MinaExtracaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ minaExtracao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MinaExtracaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.minaExtracao = minaExtracao;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/mina-extracao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/mina-extracao', { outlets: { popup: null } }]);
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
