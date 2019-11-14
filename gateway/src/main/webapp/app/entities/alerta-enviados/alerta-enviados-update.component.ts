import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IAlertaEnviados, AlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { AlertaEnviadosService } from './alerta-enviados.service';
import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { AlertaOrgaoService } from 'app/entities/alerta-orgao/alerta-orgao.service';

@Component({
  selector: 'jhi-alerta-enviados-update',
  templateUrl: './alerta-enviados-update.component.html'
})
export class AlertaEnviadosUpdateComponent implements OnInit {
  isSaving: boolean;

  alertaorgaos: IAlertaOrgao[];

  editForm = this.fb.group({
    id: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected alertaEnviadosService: AlertaEnviadosService,
    protected alertaOrgaoService: AlertaOrgaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alertaEnviados }) => {
      this.updateForm(alertaEnviados);
    });
    this.alertaOrgaoService
      .query()
      .subscribe(
        (res: HttpResponse<IAlertaOrgao[]>) => (this.alertaorgaos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(alertaEnviados: IAlertaEnviados) {
    this.editForm.patchValue({
      id: alertaEnviados.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const alertaEnviados = this.createFromForm();
    if (alertaEnviados.id !== undefined) {
      this.subscribeToSaveResponse(this.alertaEnviadosService.update(alertaEnviados));
    } else {
      this.subscribeToSaveResponse(this.alertaEnviadosService.create(alertaEnviados));
    }
  }

  private createFromForm(): IAlertaEnviados {
    return {
      ...new AlertaEnviados(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlertaEnviados>>) {
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

  trackAlertaOrgaoById(index: number, item: IAlertaOrgao) {
    return item.id;
  }
}
