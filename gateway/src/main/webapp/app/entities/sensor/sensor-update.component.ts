import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISensor, Sensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { IBarragem } from 'app/shared/model/barragem.model';
import { BarragemService } from 'app/entities/barragem/barragem.service';

@Component({
  selector: 'jhi-sensor-update',
  templateUrl: './sensor-update.component.html'
})
export class SensorUpdateComponent implements OnInit {
  isSaving: boolean;

  barragems: IBarragem[];

  editForm = this.fb.group({
    id: [],
    numero: [],
    barragem: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sensorService: SensorService,
    protected barragemService: BarragemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sensor }) => {
      this.updateForm(sensor);
    });
    this.barragemService
      .query()
      .subscribe((res: HttpResponse<IBarragem[]>) => (this.barragems = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sensor: ISensor) {
    this.editForm.patchValue({
      id: sensor.id,
      numero: sensor.numero,
      barragem: sensor.barragem
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sensor = this.createFromForm();
    if (sensor.id !== undefined) {
      this.subscribeToSaveResponse(this.sensorService.update(sensor));
    } else {
      this.subscribeToSaveResponse(this.sensorService.create(sensor));
    }
  }

  private createFromForm(): ISensor {
    return {
      ...new Sensor(),
      id: this.editForm.get(['id']).value,
      numero: this.editForm.get(['numero']).value,
      barragem: this.editForm.get(['barragem']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensor>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackBarragemById(index: number, item: IBarragem) {
    return item.id;
  }
}
