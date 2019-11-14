import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';
import { MinaExtracaoService } from './mina-extracao.service';

@Component({
  selector: 'jhi-mina-extracao',
  templateUrl: './mina-extracao.component.html'
})
export class MinaExtracaoComponent implements OnInit, OnDestroy {
  minaExtracaos: IMinaExtracao[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected minaExtracaoService: MinaExtracaoService,
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
      this.minaExtracaoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMinaExtracao[]>) => (this.minaExtracaos = res.body));
      return;
    }
    this.minaExtracaoService.query().subscribe((res: HttpResponse<IMinaExtracao[]>) => {
      this.minaExtracaos = res.body;
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
    this.registerChangeInMinaExtracaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMinaExtracao) {
    return item.id;
  }

  registerChangeInMinaExtracaos() {
    this.eventSubscriber = this.eventManager.subscribe('minaExtracaoListModification', () => this.loadAll());
  }
}
