import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IBarragem, Barragem } from 'app/shared/model/barragem.model';
import { BarragemService } from './barragem.service';
import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';
import { MinaExtracaoService } from 'app/entities/mina-extracao/mina-extracao.service';

@Component({
  selector: 'jhi-barragem-update',
  templateUrl: './barragem-update.component.html'
})
export class BarragemUpdateComponent implements OnInit {
  isSaving: boolean;

  minaextracaos: IMinaExtracao[];

  editForm = this.fb.group({
    id: [],
    minaExtracao: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected barragemService: BarragemService,
    protected minaExtracaoService: MinaExtracaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ barragem }) => {
      this.updateForm(barragem);
    });
    this.minaExtracaoService
      .query()
      .subscribe(
        (res: HttpResponse<IMinaExtracao[]>) => (this.minaextracaos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(barragem: IBarragem) {
    this.editForm.patchValue({
      id: barragem.id,
      minaExtracao: barragem.minaExtracao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const barragem = this.createFromForm();
    if (barragem.id !== undefined) {
      this.subscribeToSaveResponse(this.barragemService.update(barragem));
    } else {
      this.subscribeToSaveResponse(this.barragemService.create(barragem));
    }
  }

  private createFromForm(): IBarragem {
    return {
      ...new Barragem(),
      id: this.editForm.get(['id']).value,
      minaExtracao: this.editForm.get(['minaExtracao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBarragem>>) {
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

  trackMinaExtracaoById(index: number, item: IMinaExtracao) {
    return item.id;
  }
}
