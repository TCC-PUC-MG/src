import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';

@Component({
  selector: 'jhi-sensor',
  templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit, OnDestroy {
  sensors: ISensor[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(protected sensorService: SensorService, protected eventManager: JhiEventManager, protected activatedRoute: ActivatedRoute) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.sensorService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ISensor[]>) => (this.sensors = res.body));
      return;
    }
    this.sensorService.query().subscribe((res: HttpResponse<ISensor[]>) => {
      this.sensors = res.body;
      this.currentSearch = '';
    });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSensors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISensor) {
    return item.id;
  }

  registerChangeInSensors() {
    this.eventSubscriber = this.eventManager.subscribe('sensorListModification', () => this.loadAll());
  }
}
