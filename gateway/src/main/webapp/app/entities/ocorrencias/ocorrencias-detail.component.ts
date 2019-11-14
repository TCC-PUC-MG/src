import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOcorrencias } from 'app/shared/model/ocorrencias.model';

@Component({
  selector: 'jhi-ocorrencias-detail',
  templateUrl: './ocorrencias-detail.component.html'
})
export class OcorrenciasDetailComponent implements OnInit {
  ocorrencias: IOcorrencias;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ocorrencias }) => {
      this.ocorrencias = ocorrencias;
    });
  }

  previousState() {
    window.history.back();
  }
}
