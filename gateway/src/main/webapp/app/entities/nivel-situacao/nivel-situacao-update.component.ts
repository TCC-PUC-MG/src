import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { INivelSituacao, NivelSituacao } from 'app/shared/model/nivel-situacao.model';
import { NivelSituacaoService } from './nivel-situacao.service';
import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';
import { NivelSegurancaService } from 'app/entities/nivel-seguranca/nivel-seguranca.service';

@Component({
  selector: 'jhi-nivel-situacao-update',
  templateUrl: './nivel-situacao-update.component.html'
})
export class NivelSituacaoUpdateComponent implements OnInit {
  isSaving: boolean;

  nivelsegurancas: INivelSeguranca[];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    nivelSeguranca: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected nivelSituacaoService: NivelSituacaoService,
    protected nivelSegurancaService: NivelSegurancaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nivelSituacao }) => {
      this.updateForm(nivelSituacao);
    });
    this.nivelSegurancaService
      .query()
      .subscribe(
        (res: HttpResponse<INivelSeguranca[]>) => (this.nivelsegurancas = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(nivelSituacao: INivelSituacao) {
    this.editForm.patchValue({
      id: nivelSituacao.id,
      descricao: nivelSituacao.descricao,
      nivelSeguranca: nivelSituacao.nivelSeguranca
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nivelSituacao = this.createFromForm();
    if (nivelSituacao.id !== undefined) {
      this.subscribeToSaveResponse(this.nivelSituacaoService.update(nivelSituacao));
    } else {
      this.subscribeToSaveResponse(this.nivelSituacaoService.create(nivelSituacao));
    }
  }

  private createFromForm(): INivelSituacao {
    return {
      ...new NivelSituacao(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value,
      nivelSeguranca: this.editForm.get(['nivelSeguranca']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelSituacao>>) {
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

  trackNivelSegurancaById(index: number, item: INivelSeguranca) {
    return item.id;
  }
}
