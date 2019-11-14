import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRiscoBarragem, RiscoBarragem } from 'app/shared/model/risco-barragem.model';
import { RiscoBarragemService } from './risco-barragem.service';
import { IEventoRisco } from 'app/shared/model/evento-risco.model';
import { EventoRiscoService } from 'app/entities/evento-risco/evento-risco.service';

@Component({
  selector: 'jhi-risco-barragem-update',
  templateUrl: './risco-barragem-update.component.html'
})
export class RiscoBarragemUpdateComponent implements OnInit {
  isSaving: boolean;

  eventoriscos: IEventoRisco[];

  editForm = this.fb.group({
    id: [],
    descricaoRisco: [],
    grauDoRisco: [],
    eventoRisco: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected riscoBarragemService: RiscoBarragemService,
    protected eventoRiscoService: EventoRiscoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ riscoBarragem }) => {
      this.updateForm(riscoBarragem);
    });
    this.eventoRiscoService
      .query()
      .subscribe(
        (res: HttpResponse<IEventoRisco[]>) => (this.eventoriscos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(riscoBarragem: IRiscoBarragem) {
    this.editForm.patchValue({
      id: riscoBarragem.id,
      descricaoRisco: riscoBarragem.descricaoRisco,
      grauDoRisco: riscoBarragem.grauDoRisco,
      eventoRisco: riscoBarragem.eventoRisco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const riscoBarragem = this.createFromForm();
    if (riscoBarragem.id !== undefined) {
      this.subscribeToSaveResponse(this.riscoBarragemService.update(riscoBarragem));
    } else {
      this.subscribeToSaveResponse(this.riscoBarragemService.create(riscoBarragem));
    }
  }

  private createFromForm(): IRiscoBarragem {
    return {
      ...new RiscoBarragem(),
      id: this.editForm.get(['id']).value,
      descricaoRisco: this.editForm.get(['descricaoRisco']).value,
      grauDoRisco: this.editForm.get(['grauDoRisco']).value,
      eventoRisco: this.editForm.get(['eventoRisco']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRiscoBarragem>>) {
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

  trackEventoRiscoById(index: number, item: IEventoRisco) {
    return item.id;
  }
}
