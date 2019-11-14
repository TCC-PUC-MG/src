import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';

@Component({
  selector: 'jhi-alerta-orgao-detail',
  templateUrl: './alerta-orgao-detail.component.html'
})
export class AlertaOrgaoDetailComponent implements OnInit {
  alertaOrgao: IAlertaOrgao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alertaOrgao }) => {
      this.alertaOrgao = alertaOrgao;
    });
  }

  previousState() {
    window.history.back();
  }
}
