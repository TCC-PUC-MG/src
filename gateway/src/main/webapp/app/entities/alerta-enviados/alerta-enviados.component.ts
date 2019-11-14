import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { AlertaEnviadosService } from './alerta-enviados.service';

@Component({
  selector: 'jhi-alerta-enviados',
  templateUrl: './alerta-enviados.component.html'
})
export class AlertaEnviadosComponent implements OnInit, OnDestroy {
  alertaEnviados: IAlertaEnviados[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected alertaEnviadosService: AlertaEnviadosService,
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
      this.alertaEnviadosService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IAlertaEnviados[]>) => (this.alertaEnviados = res.body));
      return;
    }
    this.alertaEnviadosService.query().subscribe((res: HttpResponse<IAlertaEnviados[]>) => {
      this.alertaEnviados = res.body;
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
    this.registerChangeInAlertaEnviados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAlertaEnviados) {
    return item.id;
  }

  registerChangeInAlertaEnviados() {
    this.eventSubscriber = this.eventManager.subscribe('alertaEnviadosListModification', () => this.loadAll());
  }
}
