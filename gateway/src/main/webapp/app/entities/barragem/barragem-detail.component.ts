import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBarragem } from 'app/shared/model/barragem.model';

@Component({
  selector: 'jhi-barragem-detail',
  templateUrl: './barragem-detail.component.html'
})
export class BarragemDetailComponent implements OnInit {
  barragem: IBarragem;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ barragem }) => {
      this.barragem = barragem;
    });
  }

  previousState() {
    window.history.back();
  }
}
