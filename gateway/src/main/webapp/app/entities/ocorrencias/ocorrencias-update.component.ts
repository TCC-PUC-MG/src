import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IOcorrencias, Ocorrencias } from 'app/shared/model/ocorrencias.model';
import { OcorrenciasService } from './ocorrencias.service';
import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';
import { NivelSituacaoService } from 'app/entities/nivel-situacao/nivel-situacao.service';

@Component({
  selector: 'jhi-ocorrencias-update',
  templateUrl: './ocorrencias-update.component.html'
})
export class OcorrenciasUpdateComponent implements OnInit {
  isSaving: boolean;

  nivelsituacaos: INivelSituacao[];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    nivelSituacao: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ocorrenciasService: OcorrenciasService,
    protected nivelSituacaoService: NivelSituacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ocorrencias }) => {
      this.updateForm(ocorrencias);
    });
    this.nivelSituacaoService
      .query()
      .subscribe(
        (res: HttpResponse<INivelSituacao[]>) => (this.nivelsituacaos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ocorrencias: IOcorrencias) {
    this.editForm.patchValue({
      id: ocorrencias.id,
      descricao: ocorrencias.descricao,
      nivelSituacao: ocorrencias.nivelSituacao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ocorrencias = this.createFromForm();
    if (ocorrencias.id !== undefined) {
      this.subscribeToSaveResponse(this.ocorrenciasService.update(ocorrencias));
    } else {
      this.subscribeToSaveResponse(this.ocorrenciasService.create(ocorrencias));
    }
  }

  private createFromForm(): IOcorrencias {
    return {
      ...new Ocorrencias(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value,
      nivelSituacao: this.editForm.get(['nivelSituacao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOcorrencias>>) {
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

  trackNivelSituacaoById(index: number, item: INivelSituacao) {
    return item.id;
  }
}
