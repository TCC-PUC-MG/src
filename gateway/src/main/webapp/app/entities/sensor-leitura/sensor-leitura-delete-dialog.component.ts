import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { SensorLeituraService } from './sensor-leitura.service';

@Component({
  selector: 'jhi-sensor-leitura-delete-dialog',
  templateUrl: './sensor-leitura-delete-dialog.component.html'
})
export class SensorLeituraDeleteDialogComponent {
  sensorLeitura: ISensorLeitura;

  constructor(
    protected sensorLeituraService: SensorLeituraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.sensorLeituraService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'sensorLeituraListModification',
        content: 'Deleted an sensorLeitura'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sensor-leitura-delete-popup',
  template: ''
})
export class SensorLeituraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sensorLeitura }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SensorLeituraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sensorLeitura = sensorLeitura;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/sensor-leitura', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/sensor-leitura', { outlets: { popup: null } }]);
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
