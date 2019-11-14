import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';
import { RiscoBarragemService } from './risco-barragem.service';

@Component({
  selector: 'jhi-risco-barragem',
  templateUrl: './risco-barragem.component.html'
})
export class RiscoBarragemComponent implements OnInit, OnDestroy {
  riscoBarragems: IRiscoBarragem[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected riscoBarragemService: RiscoBarragemService,
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
      this.riscoBarragemService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRiscoBarragem[]>) => (this.riscoBarragems = res.body));
      return;
    }
    this.riscoBarragemService.query().subscribe((res: HttpResponse<IRiscoBarragem[]>) => {
      this.riscoBarragems = res.body;
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
    this.registerChangeInRiscoBarragems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRiscoBarragem) {
    return item.id;
  }

  registerChangeInRiscoBarragems() {
    this.eventSubscriber = this.eventManager.subscribe('riscoBarragemListModification', () => this.loadAll());
  }
}
