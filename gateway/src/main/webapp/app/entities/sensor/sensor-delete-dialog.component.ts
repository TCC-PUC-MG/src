import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';

@Component({
  selector: 'jhi-sensor-delete-dialog',
  templateUrl: './sensor-delete-dialog.component.html'
})
export class SensorDeleteDialogComponent {
  sensor: ISensor;

  constructor(protected sensorService: SensorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.sensorService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'sensorListModification',
        content: 'Deleted an sensor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sensor-delete-popup',
  template: ''
})
export class SensorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sensor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SensorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sensor = sensor;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/sensor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/sensor', { outlets: { popup: null } }]);
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
