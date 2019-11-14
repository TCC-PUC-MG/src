import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';
import { NivelSegurancaService } from './nivel-seguranca.service';

@Component({
  selector: 'jhi-nivel-seguranca-delete-dialog',
  templateUrl: './nivel-seguranca-delete-dialog.component.html'
})
export class NivelSegurancaDeleteDialogComponent {
  nivelSeguranca: INivelSeguranca;

  constructor(
    protected nivelSegurancaService: NivelSegurancaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.nivelSegurancaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'nivelSegurancaListModification',
        content: 'Deleted an nivelSeguranca'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nivel-seguranca-delete-popup',
  template: ''
})
export class NivelSegurancaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nivelSeguranca }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NivelSegurancaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.nivelSeguranca = nivelSeguranca;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/nivel-seguranca', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/nivel-seguranca', { outlets: { popup: null } }]);
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
