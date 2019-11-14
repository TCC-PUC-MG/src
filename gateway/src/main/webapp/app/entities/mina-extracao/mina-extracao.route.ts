import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MinaExtracao } from 'app/shared/model/mina-extracao.model';
import { MinaExtracaoService } from './mina-extracao.service';
import { MinaExtracaoComponent } from './mina-extracao.component';
import { MinaExtracaoDetailComponent } from './mina-extracao-detail.component';
import { MinaExtracaoUpdateComponent } from './mina-extracao-update.component';
import { MinaExtracaoDeletePopupComponent } from './mina-extracao-delete-dialog.component';
import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';

@Injectable({ providedIn: 'root' })
export class MinaExtracaoResolve implements Resolve<IMinaExtracao> {
  constructor(private service: MinaExtracaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMinaExtracao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((minaExtracao: HttpResponse<MinaExtracao>) => minaExtracao.body));
    }
    return of(new MinaExtracao());
  }
}

export const minaExtracaoRoute: Routes = [
  {
    path: '',
    component: MinaExtracaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MinaExtracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MinaExtracaoDetailComponent,
    resolve: {
      minaExtracao: MinaExtracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MinaExtracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MinaExtracaoUpdateComponent,
    resolve: {
      minaExtracao: MinaExtracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MinaExtracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MinaExtracaoUpdateComponent,
    resolve: {
      minaExtracao: MinaExtracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MinaExtracaos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const minaExtracaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MinaExtracaoDeletePopupComponent,
    resolve: {
      minaExtracao: MinaExtracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MinaExtracaos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
