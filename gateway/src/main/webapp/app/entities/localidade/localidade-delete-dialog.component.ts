import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalidade } from 'app/shared/model/localidade.model';
import { LocalidadeService } from './localidade.service';

@Component({
  selector: 'jhi-localidade-delete-dialog',
  templateUrl: './localidade-delete-dialog.component.html'
})
export class LocalidadeDeleteDialogComponent {
  localidade: ILocalidade;

  constructor(
    protected localidadeService: LocalidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.localidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'localidadeListModification',
        content: 'Deleted an localidade'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-localidade-delete-popup',
  template: ''
})
export class LocalidadeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ localidade }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LocalidadeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.localidade = localidade;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/localidade', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/localidade', { outlets: { popup: null } }]);
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
