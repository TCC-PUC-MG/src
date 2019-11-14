import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';

@Component({
  selector: 'jhi-evento-barragem-detail',
  templateUrl: './evento-barragem-detail.component.html'
})
export class EventoBarragemDetailComponent implements OnInit {
  eventoBarragem: IEventoBarragem;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventoBarragem }) => {
      this.eventoBarragem = eventoBarragem;
    });
  }

  previousState() {
    window.history.back();
  }
}
