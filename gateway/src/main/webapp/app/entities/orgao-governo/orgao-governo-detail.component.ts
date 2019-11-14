import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';

@Component({
  selector: 'jhi-orgao-governo-detail',
  templateUrl: './orgao-governo-detail.component.html'
})
export class OrgaoGovernoDetailComponent implements OnInit {
  orgaoGoverno: IOrgaoGoverno;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orgaoGoverno }) => {
      this.orgaoGoverno = orgaoGoverno;
    });
  }

  previousState() {
    window.history.back();
  }
}
