import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INivelSeguranca, NivelSeguranca } from 'app/shared/model/nivel-seguranca.model';
import { NivelSegurancaService } from './nivel-seguranca.service';

@Component({
  selector: 'jhi-nivel-seguranca-update',
  templateUrl: './nivel-seguranca-update.component.html'
})
export class NivelSegurancaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nivel: [],
    descricao: []
  });

  constructor(protected nivelSegurancaService: NivelSegurancaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nivelSeguranca }) => {
      this.updateForm(nivelSeguranca);
    });
  }

  updateForm(nivelSeguranca: INivelSeguranca) {
    this.editForm.patchValue({
      id: nivelSeguranca.id,
      nivel: nivelSeguranca.nivel,
      descricao: nivelSeguranca.descricao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nivelSeguranca = this.createFromForm();
    if (nivelSeguranca.id !== undefined) {
      this.subscribeToSaveResponse(this.nivelSegurancaService.update(nivelSeguranca));
    } else {
      this.subscribeToSaveResponse(this.nivelSegurancaService.create(nivelSeguranca));
    }
  }

  private createFromForm(): INivelSeguranca {
    return {
      ...new NivelSeguranca(),
      id: this.editForm.get(['id']).value,
      nivel: this.editForm.get(['nivel']).value,
      descricao: this.editForm.get(['descricao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelSeguranca>>) {
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
