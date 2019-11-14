import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';
import { OrgaoGovernoService } from './orgao-governo.service';

@Component({
  selector: 'jhi-orgao-governo-delete-dialog',
  templateUrl: './orgao-governo-delete-dialog.component.html'
})
export class OrgaoGovernoDeleteDialogComponent {
  orgaoGoverno: IOrgaoGoverno;

  constructor(
    protected orgaoGovernoService: OrgaoGovernoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.orgaoGovernoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'orgaoGovernoListModification',
        content: 'Deleted an orgaoGoverno'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-orgao-governo-delete-popup',
  template: ''
})
export class OrgaoGovernoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orgaoGoverno }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrgaoGovernoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.orgaoGoverno = orgaoGoverno;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/orgao-governo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/orgao-governo', { outlets: { popup: null } }]);
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
