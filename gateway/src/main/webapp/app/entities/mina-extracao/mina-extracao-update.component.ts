import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IMinaExtracao, MinaExtracao } from 'app/shared/model/mina-extracao.model';
import { MinaExtracaoService } from './mina-extracao.service';
import { ILocalidade } from 'app/shared/model/localidade.model';
import { LocalidadeService } from 'app/entities/localidade/localidade.service';

@Component({
  selector: 'jhi-mina-extracao-update',
  templateUrl: './mina-extracao-update.component.html'
})
export class MinaExtracaoUpdateComponent implements OnInit {
  isSaving: boolean;

  localidades: ILocalidade[];

  editForm = this.fb.group({
    id: [],
    tamanho: [],
    localidade: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected minaExtracaoService: MinaExtracaoService,
    protected localidadeService: LocalidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ minaExtracao }) => {
      this.updateForm(minaExtracao);
    });
    this.localidadeService
      .query()
      .subscribe(
        (res: HttpResponse<ILocalidade[]>) => (this.localidades = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(minaExtracao: IMinaExtracao) {
    this.editForm.patchValue({
      id: minaExtracao.id,
      tamanho: minaExtracao.tamanho,
      localidade: minaExtracao.localidade
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const minaExtracao = this.createFromForm();
    if (minaExtracao.id !== undefined) {
      this.subscribeToSaveResponse(this.minaExtracaoService.update(minaExtracao));
    } else {
      this.subscribeToSaveResponse(this.minaExtracaoService.create(minaExtracao));
    }
  }

  private createFromForm(): IMinaExtracao {
    return {
      ...new MinaExtracao(),
      id: this.editForm.get(['id']).value,
      tamanho: this.editForm.get(['tamanho']).value,
      localidade: this.editForm.get(['localidade']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMinaExtracao>>) {
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

  trackLocalidadeById(index: number, item: ILocalidade) {
    return item.id;
  }
}
