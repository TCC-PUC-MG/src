import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IOcorrencias } from 'app/shared/model/ocorrencias.model';
import { OcorrenciasService } from './ocorrencias.service';

@Component({
  selector: 'jhi-ocorrencias',
  templateUrl: './ocorrencias.component.html'
})
export class OcorrenciasComponent implements OnInit, OnDestroy {
  ocorrencias: IOcorrencias[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected ocorrenciasService: OcorrenciasService,
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
      this.ocorrenciasService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IOcorrencias[]>) => (this.ocorrencias = res.body));
      return;
    }
    this.ocorrenciasService.query().subscribe((res: HttpResponse<IOcorrencias[]>) => {
      this.ocorrencias = res.body;
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
    this.registerChangeInOcorrencias();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOcorrencias) {
    return item.id;
  }

  registerChangeInOcorrencias() {
    this.eventSubscriber = this.eventManager.subscribe('ocorrenciasListModification', () => this.loadAll());
  }
}
