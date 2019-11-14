import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';
import { NivelSituacaoService } from './nivel-situacao.service';

@Component({
  selector: 'jhi-nivel-situacao',
  templateUrl: './nivel-situacao.component.html'
})
export class NivelSituacaoComponent implements OnInit, OnDestroy {
  nivelSituacaos: INivelSituacao[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected nivelSituacaoService: NivelSituacaoService,
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
      this.nivelSituacaoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<INivelSituacao[]>) => (this.nivelSituacaos = res.body));
      return;
    }
    this.nivelSituacaoService.query().subscribe((res: HttpResponse<INivelSituacao[]>) => {
      this.nivelSituacaos = res.body;
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
    this.registerChangeInNivelSituacaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INivelSituacao) {
    return item.id;
  }

  registerChangeInNivelSituacaos() {
    this.eventSubscriber = this.eventManager.subscribe('nivelSituacaoListModification', () => this.loadAll());
  }
}
