import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalidade } from 'app/shared/model/localidade.model';

@Component({
  selector: 'jhi-localidade-detail',
  templateUrl: './localidade-detail.component.html'
})
export class LocalidadeDetailComponent implements OnInit {
  localidade: ILocalidade;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ localidade }) => {
      this.localidade = localidade;
    });
  }

  previousState() {
    window.history.back();
  }
}
