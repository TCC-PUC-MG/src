import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { AlertaOrgaoService } from './alerta-orgao.service';

@Component({
  selector: 'jhi-alerta-orgao',
  templateUrl: './alerta-orgao.component.html'
})
export class AlertaOrgaoComponent implements OnInit, OnDestroy {
  alertaOrgaos: IAlertaOrgao[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected alertaOrgaoService: AlertaOrgaoService,
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
      this.alertaOrgaoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IAlertaOrgao[]>) => (this.alertaOrgaos = res.body));
      return;
    }
    this.alertaOrgaoService.query().subscribe((res: HttpResponse<IAlertaOrgao[]>) => {
      this.alertaOrgaos = res.body;
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
    this.registerChangeInAlertaOrgaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAlertaOrgao) {
    return item.id;
  }

  registerChangeInAlertaOrgaos() {
    this.eventSubscriber = this.eventManager.subscribe('alertaOrgaoListModification', () => this.loadAll());
  }
}
