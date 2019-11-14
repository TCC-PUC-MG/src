import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';
import { EventoBarragemService } from './evento-barragem.service';

@Component({
  selector: 'jhi-evento-barragem',
  templateUrl: './evento-barragem.component.html'
})
export class EventoBarragemComponent implements OnInit, OnDestroy {
  eventoBarragems: IEventoBarragem[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected eventoBarragemService: EventoBarragemService,
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
      this.eventoBarragemService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEventoBarragem[]>) => (this.eventoBarragems = res.body));
      return;
    }
    this.eventoBarragemService.query().subscribe((res: HttpResponse<IEventoBarragem[]>) => {
      this.eventoBarragems = res.body;
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
    this.registerChangeInEventoBarragems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEventoBarragem) {
    return item.id;
  }

  registerChangeInEventoBarragems() {
    this.eventSubscriber = this.eventManager.subscribe('eventoBarragemListModification', () => this.loadAll());
  }
}
