import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { AlertaOrgaoService } from './alerta-orgao.service';
import { AlertaOrgaoComponent } from './alerta-orgao.component';
import { AlertaOrgaoDetailComponent } from './alerta-orgao-detail.component';
import { AlertaOrgaoUpdateComponent } from './alerta-orgao-update.component';
import { AlertaOrgaoDeletePopupComponent } from './alerta-orgao-delete-dialog.component';
import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';

@Injectable({ providedIn: 'root' })
export class AlertaOrgaoResolve implements Resolve<IAlertaOrgao> {
  constructor(private service: AlertaOrgaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlertaOrgao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((alertaOrgao: HttpResponse<AlertaOrgao>) => alertaOrgao.body));
    }
    return of(new AlertaOrgao());
  }
}

export const alertaOrgaoRoute: Routes = [
  {
    path: '',
    component: AlertaOrgaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaOrgaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlertaOrgaoDetailComponent,
    resolve: {
      alertaOrgao: AlertaOrgaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaOrgaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlertaOrgaoUpdateComponent,
    resolve: {
      alertaOrgao: AlertaOrgaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaOrgaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlertaOrgaoUpdateComponent,
    resolve: {
      alertaOrgao: AlertaOrgaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaOrgaos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const alertaOrgaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlertaOrgaoDeletePopupComponent,
    resolve: {
      alertaOrgao: AlertaOrgaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaOrgaos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
