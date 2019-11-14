import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localidade } from 'app/shared/model/localidade.model';
import { LocalidadeService } from './localidade.service';
import { LocalidadeComponent } from './localidade.component';
import { LocalidadeDetailComponent } from './localidade-detail.component';
import { LocalidadeUpdateComponent } from './localidade-update.component';
import { LocalidadeDeletePopupComponent } from './localidade-delete-dialog.component';
import { ILocalidade } from 'app/shared/model/localidade.model';

@Injectable({ providedIn: 'root' })
export class LocalidadeResolve implements Resolve<ILocalidade> {
  constructor(private service: LocalidadeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalidade> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((localidade: HttpResponse<Localidade>) => localidade.body));
    }
    return of(new Localidade());
  }
}

export const localidadeRoute: Routes = [
  {
    path: '',
    component: LocalidadeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Localidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocalidadeDetailComponent,
    resolve: {
      localidade: LocalidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Localidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocalidadeUpdateComponent,
    resolve: {
      localidade: LocalidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Localidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocalidadeUpdateComponent,
    resolve: {
      localidade: LocalidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Localidades'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const localidadePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LocalidadeDeletePopupComponent,
    resolve: {
      localidade: LocalidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Localidades'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
