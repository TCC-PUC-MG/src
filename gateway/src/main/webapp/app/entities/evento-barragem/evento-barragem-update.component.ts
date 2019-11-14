import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IEventoBarragem, EventoBarragem } from 'app/shared/model/evento-barragem.model';
import { EventoBarragemService } from './evento-barragem.service';
import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { SensorLeituraService } from 'app/entities/sensor-leitura/sensor-leitura.service';

@Component({
  selector: 'jhi-evento-barragem-update',
  templateUrl: './evento-barragem-update.component.html'
})
export class EventoBarragemUpdateComponent implements OnInit {
  isSaving: boolean;

  sensorleituras: ISensorLeitura[];

  editForm = this.fb.group({
    id: [],
    sensorLeitura: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected eventoBarragemService: EventoBarragemService,
    protected sensorLeituraService: SensorLeituraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ eventoBarragem }) => {
      this.updateForm(eventoBarragem);
    });
    this.sensorLeituraService
      .query()
      .subscribe(
        (res: HttpResponse<ISensorLeitura[]>) => (this.sensorleituras = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(eventoBarragem: IEventoBarragem) {
    this.editForm.patchValue({
      id: eventoBarragem.id,
      sensorLeitura: eventoBarragem.sensorLeitura
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const eventoBarragem = this.createFromForm();
    if (eventoBarragem.id !== undefined) {
      this.subscribeToSaveResponse(this.eventoBarragemService.update(eventoBarragem));
    } else {
      this.subscribeToSaveResponse(this.eventoBarragemService.create(eventoBarragem));
    }
  }

  private createFromForm(): IEventoBarragem {
    return {
      ...new EventoBarragem(),
      id: this.editForm.get(['id']).value,
      sensorLeitura: this.editForm.get(['sensorLeitura']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEventoBarragem>>) {
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

  trackSensorLeituraById(index: number, item: ISensorLeitura) {
    return item.id;
  }
}
