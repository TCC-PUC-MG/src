import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NivelSeguranca } from 'app/shared/model/nivel-seguranca.model';
import { NivelSegurancaService } from './nivel-seguranca.service';
import { NivelSegurancaComponent } from './nivel-seguranca.component';
import { NivelSegurancaDetailComponent } from './nivel-seguranca-detail.component';
import { NivelSegurancaUpdateComponent } from './nivel-seguranca-update.component';
import { NivelSegurancaDeletePopupComponent } from './nivel-seguranca-delete-dialog.component';
import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

@Injectable({ providedIn: 'root' })
export class NivelSegurancaResolve implements Resolve<INivelSeguranca> {
  constructor(private service: NivelSegurancaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INivelSeguranca> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((nivelSeguranca: HttpResponse<NivelSeguranca>) => nivelSeguranca.body));
    }
    return of(new NivelSeguranca());
  }
}

export const nivelSegurancaRoute: Routes = [
  {
    path: '',
    component: NivelSegurancaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSegurancas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NivelSegurancaDetailComponent,
    resolve: {
      nivelSeguranca: NivelSegurancaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSegurancas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NivelSegurancaUpdateComponent,
    resolve: {
      nivelSeguranca: NivelSegurancaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSegurancas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NivelSegurancaUpdateComponent,
    resolve: {
      nivelSeguranca: NivelSegurancaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSegurancas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nivelSegurancaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NivelSegurancaDeletePopupComponent,
    resolve: {
      nivelSeguranca: NivelSegurancaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NivelSegurancas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
