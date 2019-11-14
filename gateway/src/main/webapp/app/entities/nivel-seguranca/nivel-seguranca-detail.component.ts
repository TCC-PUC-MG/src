import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

@Component({
  selector: 'jhi-nivel-seguranca-detail',
  templateUrl: './nivel-seguranca-detail.component.html'
})
export class NivelSegurancaDetailComponent implements OnInit {
  nivelSeguranca: INivelSeguranca;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nivelSeguranca }) => {
      this.nivelSeguranca = nivelSeguranca;
    });
  }

  previousState() {
    window.history.back();
  }
}
