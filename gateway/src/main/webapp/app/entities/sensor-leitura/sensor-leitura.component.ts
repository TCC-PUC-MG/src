import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { SensorLeituraService } from './sensor-leitura.service';

@Component({
  selector: 'jhi-sensor-leitura',
  templateUrl: './sensor-leitura.component.html'
})
export class SensorLeituraComponent implements OnInit, OnDestroy {
  sensorLeituras: ISensorLeitura[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected sensorLeituraService: SensorLeituraService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.sensorLeituraService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ISensorLeitura[]>) => (this.sensorLeituras = res.body));
      return;
    }
    this.sensorLeituraService.query().subscribe((res: HttpResponse<ISensorLeitura[]>) => {
      this.sensorLeituras = res.body;
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
    this.registerChangeInSensorLeituras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISensorLeitura) {
    return item.id;
  }

  registerChangeInSensorLeituras() {
    this.eventSubscriber = this.eventManager.subscribe('sensorLeituraListModification', () => this.loadAll());
  }
}
