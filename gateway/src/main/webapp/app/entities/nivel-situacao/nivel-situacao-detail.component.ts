import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';

@Component({
  selector: 'jhi-nivel-situacao-detail',
  templateUrl: './nivel-situacao-detail.component.html'
})
export class NivelSituacaoDetailComponent implements OnInit {
  nivelSituacao: INivelSituacao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nivelSituacao }) => {
      this.nivelSituacao = nivelSituacao;
    });
  }

  previousState() {
    window.history.back();
  }
}
