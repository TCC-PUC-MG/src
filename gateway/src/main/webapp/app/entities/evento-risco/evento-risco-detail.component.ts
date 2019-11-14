import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventoRisco } from 'app/shared/model/evento-risco.model';

@Component({
  selector: 'jhi-evento-risco-detail',
  templateUrl: './evento-risco-detail.component.html'
})
export class EventoRiscoDetailComponent implements OnInit {
  eventoRisco: IEventoRisco;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventoRisco }) => {
      this.eventoRisco = eventoRisco;
    });
  }

  previousState() {
    window.history.back();
  }
}
