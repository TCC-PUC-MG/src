import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';
import { NivelSegurancaService } from './nivel-seguranca.service';

@Component({
  selector: 'jhi-nivel-seguranca',
  templateUrl: './nivel-seguranca.component.html'
})
export class NivelSegurancaComponent implements OnInit, OnDestroy {
  nivelSegurancas: INivelSeguranca[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected nivelSegurancaService: NivelSegurancaService,
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
      this.nivelSegurancaService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<INivelSeguranca[]>) => (this.nivelSegurancas = res.body));
      return;
    }
    this.nivelSegurancaService.query().subscribe((res: HttpResponse<INivelSeguranca[]>) => {
      this.nivelSegurancas = res.body;
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
    this.registerChangeInNivelSegurancas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INivelSeguranca) {
    return item.id;
  }

  registerChangeInNivelSegurancas() {
    this.eventSubscriber = this.eventManager.subscribe('nivelSegurancaListModification', () => this.loadAll());
  }
}
