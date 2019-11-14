import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { AlertaEnviadosService } from './alerta-enviados.service';
import { AlertaEnviadosComponent } from './alerta-enviados.component';
import { AlertaEnviadosDetailComponent } from './alerta-enviados-detail.component';
import { AlertaEnviadosUpdateComponent } from './alerta-enviados-update.component';
import { AlertaEnviadosDeletePopupComponent } from './alerta-enviados-delete-dialog.component';
import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';

@Injectable({ providedIn: 'root' })
export class AlertaEnviadosResolve implements Resolve<IAlertaEnviados> {
  constructor(private service: AlertaEnviadosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlertaEnviados> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((alertaEnviados: HttpResponse<AlertaEnviados>) => alertaEnviados.body));
    }
    return of(new AlertaEnviados());
  }
}

export const alertaEnviadosRoute: Routes = [
  {
    path: '',
    component: AlertaEnviadosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaEnviados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlertaEnviadosDetailComponent,
    resolve: {
      alertaEnviados: AlertaEnviadosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaEnviados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlertaEnviadosUpdateComponent,
    resolve: {
      alertaEnviados: AlertaEnviadosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaEnviados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlertaEnviadosUpdateComponent,
    resolve: {
      alertaEnviados: AlertaEnviadosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaEnviados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const alertaEnviadosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlertaEnviadosDeletePopupComponent,
    resolve: {
      alertaEnviados: AlertaEnviadosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AlertaEnviados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
