import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';

@Component({
  selector: 'jhi-risco-barragem-detail',
  templateUrl: './risco-barragem-detail.component.html'
})
export class RiscoBarragemDetailComponent implements OnInit {
  riscoBarragem: IRiscoBarragem;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ riscoBarragem }) => {
      this.riscoBarragem = riscoBarragem;
    });
  }

  previousState() {
    window.history.back();
  }
}
