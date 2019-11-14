import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { TipoAlertaService } from './tipo-alerta.service';
import { TipoAlertaComponent } from './tipo-alerta.component';
import { TipoAlertaDetailComponent } from './tipo-alerta-detail.component';
import { TipoAlertaUpdateComponent } from './tipo-alerta-update.component';
import { TipoAlertaDeletePopupComponent } from './tipo-alerta-delete-dialog.component';
import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';

@Injectable({ providedIn: 'root' })
export class TipoAlertaResolve implements Resolve<ITipoAlerta> {
  constructor(private service: TipoAlertaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoAlerta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((tipoAlerta: HttpResponse<TipoAlerta>) => tipoAlerta.body));
    }
    return of(new TipoAlerta());
  }
}

export const tipoAlertaRoute: Routes = [
  {
    path: '',
    component: TipoAlertaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoAlertas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoAlertaDetailComponent,
    resolve: {
      tipoAlerta: TipoAlertaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoAlertas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoAlertaUpdateComponent,
    resolve: {
      tipoAlerta: TipoAlertaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoAlertas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoAlertaUpdateComponent,
    resolve: {
      tipoAlerta: TipoAlertaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoAlertas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoAlertaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoAlertaDeletePopupComponent,
    resolve: {
      tipoAlerta: TipoAlertaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoAlertas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
