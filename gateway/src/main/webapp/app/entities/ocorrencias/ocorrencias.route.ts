import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ocorrencias } from 'app/shared/model/ocorrencias.model';
import { OcorrenciasService } from './ocorrencias.service';
import { OcorrenciasComponent } from './ocorrencias.component';
import { OcorrenciasDetailComponent } from './ocorrencias-detail.component';
import { OcorrenciasUpdateComponent } from './ocorrencias-update.component';
import { OcorrenciasDeletePopupComponent } from './ocorrencias-delete-dialog.component';
import { IOcorrencias } from 'app/shared/model/ocorrencias.model';

@Injectable({ providedIn: 'root' })
export class OcorrenciasResolve implements Resolve<IOcorrencias> {
  constructor(private service: OcorrenciasService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOcorrencias> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ocorrencias: HttpResponse<Ocorrencias>) => ocorrencias.body));
    }
    return of(new Ocorrencias());
  }
}

export const ocorrenciasRoute: Routes = [
  {
    path: '',
    component: OcorrenciasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ocorrencias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OcorrenciasDetailComponent,
    resolve: {
      ocorrencias: OcorrenciasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ocorrencias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OcorrenciasUpdateComponent,
    resolve: {
      ocorrencias: OcorrenciasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ocorrencias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OcorrenciasUpdateComponent,
    resolve: {
      ocorrencias: OcorrenciasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ocorrencias'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ocorrenciasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OcorrenciasDeletePopupComponent,
    resolve: {
      ocorrencias: OcorrenciasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ocorrencias'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
