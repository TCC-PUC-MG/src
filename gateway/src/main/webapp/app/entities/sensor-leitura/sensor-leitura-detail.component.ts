import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';

@Component({
  selector: 'jhi-sensor-leitura-detail',
  templateUrl: './sensor-leitura-detail.component.html'
})
export class SensorLeituraDetailComponent implements OnInit {
  sensorLeitura: ISensorLeitura;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sensorLeitura }) => {
      this.sensorLeitura = sensorLeitura;
    });
  }

  previousState() {
    window.history.back();
  }
}
