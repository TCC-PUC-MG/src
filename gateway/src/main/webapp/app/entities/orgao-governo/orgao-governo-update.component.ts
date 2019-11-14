import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrgaoGoverno, OrgaoGoverno } from 'app/shared/model/orgao-governo.model';
import { OrgaoGovernoService } from './orgao-governo.service';

@Component({
  selector: 'jhi-orgao-governo-update',
  templateUrl: './orgao-governo-update.component.html'
})
export class OrgaoGovernoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    descricao: [],
    pessoaContato: [],
    telefone: []
  });

  constructor(protected orgaoGovernoService: OrgaoGovernoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orgaoGoverno }) => {
      this.updateForm(orgaoGoverno);
    });
  }

  updateForm(orgaoGoverno: IOrgaoGoverno) {
    this.editForm.patchValue({
      id: orgaoGoverno.id,
      descricao: orgaoGoverno.descricao,
      pessoaContato: orgaoGoverno.pessoaContato,
      telefone: orgaoGoverno.telefone
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orgaoGoverno = this.createFromForm();
    if (orgaoGoverno.id !== undefined) {
      this.subscribeToSaveResponse(this.orgaoGovernoService.update(orgaoGoverno));
    } else {
      this.subscribeToSaveResponse(this.orgaoGovernoService.create(orgaoGoverno));
    }
  }

  private createFromForm(): IOrgaoGoverno {
    return {
      ...new OrgaoGoverno(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value,
      pessoaContato: this.editForm.get(['pessoaContato']).value,
      telefone: this.editForm.get(['telefone']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrgaoGoverno>>) {
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
