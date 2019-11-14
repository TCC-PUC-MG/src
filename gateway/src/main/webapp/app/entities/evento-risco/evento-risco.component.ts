import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IEventoRisco } from 'app/shared/model/evento-risco.model';
import { EventoRiscoService } from './evento-risco.service';

@Component({
  selector: 'jhi-evento-risco',
  templateUrl: './evento-risco.component.html'
})
export class EventoRiscoComponent implements OnInit, OnDestroy {
  eventoRiscos: IEventoRisco[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected eventoRiscoService: EventoRiscoService,
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
      this.eventoRiscoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEventoRisco[]>) => (this.eventoRiscos = res.body));
      return;
    }
    this.eventoRiscoService.query().subscribe((res: HttpResponse<IEventoRisco[]>) => {
      this.eventoRiscos = res.body;
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
    this.registerChangeInEventoRiscos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEventoRisco) {
    return item.id;
  }

  registerChangeInEventoRiscos() {
    this.eventSubscriber = this.eventManager.subscribe('eventoRiscoListModification', () => this.loadAll());
  }
}
