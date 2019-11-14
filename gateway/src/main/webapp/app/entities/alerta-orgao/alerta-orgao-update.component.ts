import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IAlertaOrgao, AlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { AlertaOrgaoService } from './alerta-orgao.service';
import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { AlertaEnviadosService } from 'app/entities/alerta-enviados/alerta-enviados.service';
import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { TipoAlertaService } from 'app/entities/tipo-alerta/tipo-alerta.service';
import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';
import { OrgaoGovernoService } from 'app/entities/orgao-governo/orgao-governo.service';

@Component({
  selector: 'jhi-alerta-orgao-update',
  templateUrl: './alerta-orgao-update.component.html'
})
export class AlertaOrgaoUpdateComponent implements OnInit {
  isSaving: boolean;

  alertaenviados: IAlertaEnviados[];

  tipoalertas: ITipoAlerta[];

  orgaogovernos: IOrgaoGoverno[];

  editForm = this.fb.group({
    id: [],
    alertaEnviados: [],
    tipoAlerta: [],
    orgaoGoverna: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected alertaOrgaoService: AlertaOrgaoService,
    protected alertaEnviadosService: AlertaEnviadosService,
    protected tipoAlertaService: TipoAlertaService,
    protected orgaoGovernoService: OrgaoGovernoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alertaOrgao }) => {
      this.updateForm(alertaOrgao);
    });
    this.alertaEnviadosService.query({ filter: 'alertaorgaos-is-null' }).subscribe(
      (res: HttpResponse<IAlertaEnviados[]>) => {
        if (!this.editForm.get('alertaEnviados').value || !this.editForm.get('alertaEnviados').value.id) {
          this.alertaenviados = res.body;
        } else {
          this.alertaEnviadosService
            .find(this.editForm.get('alertaEnviados').value.id)
            .subscribe(
              (subRes: HttpResponse<IAlertaEnviados>) => (this.alertaenviados = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.tipoAlertaService
      .query()
      .subscribe(
        (res: HttpResponse<ITipoAlerta[]>) => (this.tipoalertas = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.orgaoGovernoService
      .query()
      .subscribe(
        (res: HttpResponse<IOrgaoGoverno[]>) => (this.orgaogovernos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(alertaOrgao: IAlertaOrgao) {
    this.editForm.patchValue({
      id: alertaOrgao.id,
      alertaEnviados: alertaOrgao.alertaEnviados,
      tipoAlerta: alertaOrgao.tipoAlerta,
      orgaoGoverna: alertaOrgao.orgaoGoverna
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const alertaOrgao = this.createFromForm();
    if (alertaOrgao.id !== undefined) {
      this.subscribeToSaveResponse(this.alertaOrgaoService.update(alertaOrgao));
    } else {
      this.subscribeToSaveResponse(this.alertaOrgaoService.create(alertaOrgao));
    }
  }

  private createFromForm(): IAlertaOrgao {
    return {
      ...new AlertaOrgao(),
      id: this.editForm.get(['id']).value,
      alertaEnviados: this.editForm.get(['alertaEnviados']).value,
      tipoAlerta: this.editForm.get(['tipoAlerta']).value,
      orgaoGoverna: this.editForm.get(['orgaoGoverna']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlertaOrgao>>) {
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

  trackAlertaEnviadosById(index: number, item: IAlertaEnviados) {
    return item.id;
  }

  trackTipoAlertaById(index: number, item: ITipoAlerta) {
    return item.id;
  }

  trackOrgaoGovernoById(index: number, item: IOrgaoGoverno) {
    return item.id;
  }
}
