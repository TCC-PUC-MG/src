import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';

@Component({
  selector: 'jhi-alerta-enviados-detail',
  templateUrl: './alerta-enviados-detail.component.html'
})
export class AlertaEnviadosDetailComponent implements OnInit {
  alertaEnviados: IAlertaEnviados;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertaEnviados }) => {
      this.alertaEnviados = alertaEnviados;
    });
  }

  previousState() {
    window.history.back();
  }
}
