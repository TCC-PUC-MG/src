import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalidade } from 'app/shared/model/localidade.model';
import { LocalidadeService } from './localidade.service';

@Component({
  selector: 'jhi-localidade',
  templateUrl: './localidade.component.html'
})
export class LocalidadeComponent implements OnInit, OnDestroy {
  localidades: ILocalidade[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected localidadeService: LocalidadeService,
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
      this.localidadeService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ILocalidade[]>) => (this.localidades = res.body));
      return;
    }
    this.localidadeService.query().subscribe((res: HttpResponse<ILocalidade[]>) => {
      this.localidades = res.body;
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
    this.registerChangeInLocalidades();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILocalidade) {
    return item.id;
  }

  registerChangeInLocalidades() {
    this.eventSubscriber = this.eventManager.subscribe('localidadeListModification', () => this.loadAll());
  }
}
