import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISensorLeitura, SensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { SensorLeituraService } from './sensor-leitura.service';
import { IBarragem } from 'app/shared/model/barragem.model';
import { BarragemService } from 'app/entities/barragem/barragem.service';

@Component({
  selector: 'jhi-sensor-leitura-update',
  templateUrl: './sensor-leitura-update.component.html'
})
export class SensorLeituraUpdateComponent implements OnInit {
  isSaving: boolean;

  barragems: IBarragem[];

  editForm = this.fb.group({
    id: [],
    leitura: [],
    barragem: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sensorLeituraService: SensorLeituraService,
    protected barragemService: BarragemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sensorLeitura }) => {
      this.updateForm(sensorLeitura);
    });
    this.barragemService
      .query()
      .subscribe((res: HttpResponse<IBarragem[]>) => (this.barragems = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sensorLeitura: ISensorLeitura) {
    this.editForm.patchValue({
      id: sensorLeitura.id,
      leitura: sensorLeitura.leitura,
      barragem: sensorLeitura.barragem
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sensorLeitura = this.createFromForm();
    if (sensorLeitura.id !== undefined) {
      this.subscribeToSaveResponse(this.sensorLeituraService.update(sensorLeitura));
    } else {
      this.subscribeToSaveResponse(this.sensorLeituraService.create(sensorLeitura));
    }
  }

  private createFromForm(): ISensorLeitura {
    return {
      ...new SensorLeitura(),
      id: this.editForm.get(['id']).value,
      leitura: this.editForm.get(['leitura']).value,
      barragem: this.editForm.get(['barragem']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensorLeitura>>) {
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
