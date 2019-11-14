import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoAlerta, TipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { TipoAlertaService } from './tipo-alerta.service';
import { IOcorrencias } from 'app/shared/model/ocorrencias.model';
import { OcorrenciasService } from 'app/entities/ocorrencias/ocorrencias.service';

@Component({
  selector: 'jhi-tipo-alerta-update',
  templateUrl: './tipo-alerta-update.component.html'
})
export class TipoAlertaUpdateComponent implements OnInit {
  isSaving: boolean;

  ocorrencias: IOcorrencias[];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    ocorrencias: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoAlertaService: TipoAlertaService,
    protected ocorrenciasService: OcorrenciasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoAlerta }) => {
      this.updateForm(tipoAlerta);
    });
    this.ocorrenciasService
      .query()
      .subscribe(
        (res: HttpResponse<IOcorrencias[]>) => (this.ocorrencias = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(tipoAlerta: ITipoAlerta) {
    this.editForm.patchValue({
      id: tipoAlerta.id,
      descricao: tipoAlerta.descricao,
      ocorrencias: tipoAlerta.ocorrencias
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoAlerta = this.createFromForm();
    if (tipoAlerta.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoAlertaService.update(tipoAlerta));
    } else {
      this.subscribeToSaveResponse(this.tipoAlertaService.create(tipoAlerta));
    }
  }

  private createFromForm(): ITipoAlerta {
    return {
      ...new TipoAlerta(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value,
      ocorrencias: this.editForm.get(['ocorrencias']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoAlerta>>) {
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

  trackOcorrenciasById(index: number, item: IOcorrencias) {
    return item.id;
  }
}
