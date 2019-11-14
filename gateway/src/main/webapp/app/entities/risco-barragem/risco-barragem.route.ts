import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RiscoBarragem } from 'app/shared/model/risco-barragem.model';
import { RiscoBarragemService } from './risco-barragem.service';
import { RiscoBarragemComponent } from './risco-barragem.component';
import { RiscoBarragemDetailComponent } from './risco-barragem-detail.component';
import { RiscoBarragemUpdateComponent } from './risco-barragem-update.component';
import { RiscoBarragemDeletePopupComponent } from './risco-barragem-delete-dialog.component';
import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';

@Injectable({ providedIn: 'root' })
export class RiscoBarragemResolve implements Resolve<IRiscoBarragem> {
  constructor(private service: RiscoBarragemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRiscoBarragem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((riscoBarragem: HttpResponse<RiscoBarragem>) => riscoBarragem.body));
    }
    return of(new RiscoBarragem());
  }
}

export const riscoBarragemRoute: Routes = [
  {
    path: '',
    component: RiscoBarragemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RiscoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RiscoBarragemDetailComponent,
    resolve: {
      riscoBarragem: RiscoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RiscoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RiscoBarragemUpdateComponent,
    resolve: {
      riscoBarragem: RiscoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RiscoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RiscoBarragemUpdateComponent,
    resolve: {
      riscoBarragem: RiscoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RiscoBarragems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const riscoBarragemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RiscoBarragemDeletePopupComponent,
    resolve: {
      riscoBarragem: RiscoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RiscoBarragems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
