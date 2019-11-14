import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoBarragem } from 'app/shared/model/evento-barragem.model';
import { EventoBarragemService } from './evento-barragem.service';
import { EventoBarragemComponent } from './evento-barragem.component';
import { EventoBarragemDetailComponent } from './evento-barragem-detail.component';
import { EventoBarragemUpdateComponent } from './evento-barragem-update.component';
import { EventoBarragemDeletePopupComponent } from './evento-barragem-delete-dialog.component';
import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';

@Injectable({ providedIn: 'root' })
export class EventoBarragemResolve implements Resolve<IEventoBarragem> {
  constructor(private service: EventoBarragemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEventoBarragem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((eventoBarragem: HttpResponse<EventoBarragem>) => eventoBarragem.body));
    }
    return of(new EventoBarragem());
  }
}

export const eventoBarragemRoute: Routes = [
  {
    path: '',
    component: EventoBarragemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventoBarragemDetailComponent,
    resolve: {
      eventoBarragem: EventoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventoBarragemUpdateComponent,
    resolve: {
      eventoBarragem: EventoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoBarragems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventoBarragemUpdateComponent,
    resolve: {
      eventoBarragem: EventoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoBarragems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const eventoBarragemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EventoBarragemDeletePopupComponent,
    resolve: {
      eventoBarragem: EventoBarragemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoBarragems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
