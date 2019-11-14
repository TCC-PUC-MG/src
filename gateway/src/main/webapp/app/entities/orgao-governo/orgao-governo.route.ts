import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgaoGoverno } from 'app/shared/model/orgao-governo.model';
import { OrgaoGovernoService } from './orgao-governo.service';
import { OrgaoGovernoComponent } from './orgao-governo.component';
import { OrgaoGovernoDetailComponent } from './orgao-governo-detail.component';
import { OrgaoGovernoUpdateComponent } from './orgao-governo-update.component';
import { OrgaoGovernoDeletePopupComponent } from './orgao-governo-delete-dialog.component';
import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';

@Injectable({ providedIn: 'root' })
export class OrgaoGovernoResolve implements Resolve<IOrgaoGoverno> {
  constructor(private service: OrgaoGovernoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrgaoGoverno> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((orgaoGoverno: HttpResponse<OrgaoGoverno>) => orgaoGoverno.body));
    }
    return of(new OrgaoGoverno());
  }
}

export const orgaoGovernoRoute: Routes = [
  {
    path: '',
    component: OrgaoGovernoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrgaoGovernos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrgaoGovernoDetailComponent,
    resolve: {
      orgaoGoverno: OrgaoGovernoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrgaoGovernos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrgaoGovernoUpdateComponent,
    resolve: {
      orgaoGoverno: OrgaoGovernoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrgaoGovernos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrgaoGovernoUpdateComponent,
    resolve: {
      orgaoGoverno: OrgaoGovernoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrgaoGovernos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orgaoGovernoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrgaoGovernoDeletePopupComponent,
    resolve: {
      orgaoGoverno: OrgaoGovernoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrgaoGovernos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
