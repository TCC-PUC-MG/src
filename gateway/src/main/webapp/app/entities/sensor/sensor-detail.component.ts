import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensor } from 'app/shared/model/sensor.model';

@Component({
  selector: 'jhi-sensor-detail',
  templateUrl: './sensor-detail.component.html'
})
export class SensorDetailComponent implements OnInit {
  sensor: ISensor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sensor }) => {
      this.sensor = sensor;
    });
  }

  previousState() {
    window.history.back();
  }
}
