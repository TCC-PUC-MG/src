import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';
import { OrgaoGovernoService } from './orgao-governo.service';

@Component({
  selector: 'jhi-orgao-governo',
  templateUrl: './orgao-governo.component.html'
})
export class OrgaoGovernoComponent implements OnInit, OnDestroy {
  orgaoGovernos: IOrgaoGoverno[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected orgaoGovernoService: OrgaoGovernoService,
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
      this.orgaoGovernoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IOrgaoGoverno[]>) => (this.orgaoGovernos = res.body));
      return;
    }
    this.orgaoGovernoService.query().subscribe((res: HttpResponse<IOrgaoGoverno[]>) => {
      this.orgaoGovernos = res.body;
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
    this.registerChangeInOrgaoGovernos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrgaoGoverno) {
    return item.id;
  }

  registerChangeInOrgaoGovernos() {
    this.eventSubscriber = this.eventManager.subscribe('orgaoGovernoListModification', () => this.loadAll());
  }
}
