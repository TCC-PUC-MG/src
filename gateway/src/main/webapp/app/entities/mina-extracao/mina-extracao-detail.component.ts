import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';

@Component({
  selector: 'jhi-mina-extracao-detail',
  templateUrl: './mina-extracao-detail.component.html'
})
export class MinaExtracaoDetailComponent implements OnInit {
  minaExtracao: IMinaExtracao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ minaExtracao }) => {
      this.minaExtracao = minaExtracao;
    });
  }

  previousState() {
    window.history.back();
  }
}
