import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { TipoAlertaService } from './tipo-alerta.service';

@Component({
  selector: 'jhi-tipo-alerta',
  templateUrl: './tipo-alerta.component.html'
})
export class TipoAlertaComponent implements OnInit, OnDestroy {
  tipoAlertas: ITipoAlerta[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected tipoAlertaService: TipoAlertaService,
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
      this.tipoAlertaService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITipoAlerta[]>) => (this.tipoAlertas = res.body));
      return;
    }
    this.tipoAlertaService.query().subscribe((res: HttpResponse<ITipoAlerta[]>) => {
      this.tipoAlertas = res.body;
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
    this.registerChangeInTipoAlertas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoAlerta) {
    return item.id;
  }

  registerChangeInTipoAlertas() {
    this.eventSubscriber = this.eventManager.subscribe('tipoAlertaListModification', () => this.loadAll());
  }
}
