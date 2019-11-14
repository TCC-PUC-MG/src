import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IEventoRisco, EventoRisco } from 'app/shared/model/evento-risco.model';
import { EventoRiscoService } from './evento-risco.service';
import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';
import { EventoBarragemService } from 'app/entities/evento-barragem/evento-barragem.service';

@Component({
  selector: 'jhi-evento-risco-update',
  templateUrl: './evento-risco-update.component.html'
})
export class EventoRiscoUpdateComponent implements OnInit {
  isSaving: boolean;

  eventobarragems: IEventoBarragem[];

  editForm = this.fb.group({
    id: [],
    eventosBarragem: [],
    eventoBarragem: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected eventoRiscoService: EventoRiscoService,
    protected eventoBarragemService: EventoBarragemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ eventoRisco }) => {
      this.updateForm(eventoRisco);
    });
    this.eventoBarragemService
      .query()
      .subscribe(
        (res: HttpResponse<IEventoBarragem[]>) => (this.eventobarragems = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(eventoRisco: IEventoRisco) {
    this.editForm.patchValue({
      id: eventoRisco.id,
      eventosBarragem: eventoRisco.eventosBarragem,
      eventoBarragem: eventoRisco.eventoBarragem
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const eventoRisco = this.createFromForm();
    if (eventoRisco.id !== undefined) {
      this.subscribeToSaveResponse(this.eventoRiscoService.update(eventoRisco));
    } else {
      this.subscribeToSaveResponse(this.eventoRiscoService.create(eventoRisco));
    }
  }

  private createFromForm(): IEventoRisco {
    return {
      ...new EventoRisco(),
      id: this.editForm.get(['id']).value,
      eventosBarragem: this.editForm.get(['eventosBarragem']).value,
      eventoBarragem: this.editForm.get(['eventoBarragem']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEventoRisco>>) {
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

  trackEventoBarragemById(index: number, item: IEventoBarragem) {
    return item.id;
  }
}
