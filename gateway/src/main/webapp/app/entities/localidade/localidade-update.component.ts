import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILocalidade, Localidade } from 'app/shared/model/localidade.model';
import { LocalidadeService } from './localidade.service';

@Component({
  selector: 'jhi-localidade-update',
  templateUrl: './localidade-update.component.html'
})
export class LocalidadeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [],
    latitute: [],
    longitude: []
  });

  constructor(protected localidadeService: LocalidadeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ localidade }) => {
      this.updateForm(localidade);
    });
  }

  updateForm(localidade: ILocalidade) {
    this.editForm.patchValue({
      id: localidade.id,
      nome: localidade.nome,
      latitute: localidade.latitute,
      longitude: localidade.longitude
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const localidade = this.createFromForm();
    if (localidade.id !== undefined) {
      this.subscribeToSaveResponse(this.localidadeService.update(localidade));
    } else {
      this.subscribeToSaveResponse(this.localidadeService.create(localidade));
    }
  }

  private createFromForm(): ILocalidade {
    return {
      ...new Localidade(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      latitute: this.editForm.get(['latitute']).value,
      longitude: this.editForm.get(['longitude']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalidade>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
