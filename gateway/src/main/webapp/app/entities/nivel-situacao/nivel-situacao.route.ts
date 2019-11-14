import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NivelSituacao } from 'app/shared/model/nivel-situacao.model';
import { NivelSituacaoService } from './nivel-situacao.service';
import { NivelSituacaoComponent } from './nivel-situacao.component';
import { NivelSituacaoDetailComponent } from './nivel-situacao-detail.component';
import { NivelSituacaoUpdateComponent } from './nivel-situacao-update.component';
import { NivelSituacaoDeletePopupComponent } from './nivel-situacao-delete-dialog.component';
import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';

@Injectable({ providedIn: 'root' })
export class NivelSituacaoResolve implements Resolve<INivelSituacao> {
  constructor(private service: NivelSituacaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INivelSituacao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((nivelSituacao: HttpResponse<NivelSituacao>) => nivelSituacao.body));
    }
    return of(new NivelSituacao());
  }
}

export const nivelSituacaoRoute: Routes = [
  {
    path: '',
    component: NivelSituacaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSituacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NivelSituacaoDetailComponent,
    resolve: {
      nivelSituacao: NivelSituacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSituacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NivelSituacaoUpdateComponent,
    resolve: {
      nivelSituacao: NivelSituacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSituacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NivelSituacaoUpdateComponent,
    resolve: {
      nivelSituacao: NivelSituacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSituacaos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nivelSituacaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NivelSituacaoDeletePopupComponent,
    resolve: {
      nivelSituacao: NivelSituacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSituacaos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
