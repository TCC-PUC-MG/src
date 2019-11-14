import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IBarragem } from 'app/shared/model/barragem.model';
import { BarragemService } from './barragem.service';

@Component({
  selector: 'jhi-barragem',
  templateUrl: './barragem.component.html'
})
export class BarragemComponent implements OnInit, OnDestroy {
  barragems: IBarragem[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected barragemService: BarragemService,
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
      this.barragemService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IBarragem[]>) => (this.barragems = res.body));
      return;
    }
    this.barragemService.query().subscribe((res: HttpResponse<IBarragem[]>) => {
      this.barragems = res.body;
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
    this.registerChangeInBarragems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBarragem) {
    return item.id;
  }

  registerChangeInBarragems() {
    this.eventSubscriber = this.eventManager.subscribe('barragemListModification', () => this.loadAll());
  }
}
