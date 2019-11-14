import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';

@Component({
  selector: 'jhi-tipo-alerta-detail',
  templateUrl: './tipo-alerta-detail.component.html'
})
export class TipoAlertaDetailComponent implements OnInit {
  tipoAlerta: ITipoAlerta;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoAlerta }) => {
      this.tipoAlerta = tipoAlerta;
    });
  }

  previousState() {
    window.history.back();
  }
}
