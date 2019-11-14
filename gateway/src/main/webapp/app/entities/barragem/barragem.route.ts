import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Barragem } from 'app/shared/model/barragem.model';
import { BarragemService } from './barragem.service';
import { BarragemComponent } from './barragem.component';
import { BarragemDetailComponent } from './barragem-detail.component';
import { BarragemUpdateComponent } from './barragem-update.component';
import { BarragemDeletePopupComponent } from './barragem-delete-dialog.component';
import { IBarragem } from 'app/shared/model/barragem.model';

@Injectable({ providedIn: 'root' })
export class BarragemResolve implements Resolve<IBarragem> {
  constructor(private service: BarragemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBarragem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((barragem: HttpResponse<Barragem>) => barragem.body));
    }
    return of(new Barragem());
  }
}

export const barragemRoute: Routes = [
  {
    path: '',
    component: BarragemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BarragemDetailComponent,
    resolve: {
      barragem: BarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BarragemUpdateComponent,
    resolve: {
      barragem: BarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BarragemUpdateComponent,
    resolve: {
      barragem: BarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barragems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const barragemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BarragemDeletePopupComponent,
    resolve: {
      barragem: BarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barragems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
