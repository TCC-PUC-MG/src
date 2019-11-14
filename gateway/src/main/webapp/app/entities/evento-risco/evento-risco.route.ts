import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoRisco } from 'app/shared/model/evento-risco.model';
import { EventoRiscoService } from './evento-risco.service';
import { EventoRiscoComponent } from './evento-risco.component';
import { EventoRiscoDetailComponent } from './evento-risco-detail.component';
import { EventoRiscoUpdateComponent } from './evento-risco-update.component';
import { EventoRiscoDeletePopupComponent } from './evento-risco-delete-dialog.component';
import { IEventoRisco } from 'app/shared/model/evento-risco.model';

@Injectable({ providedIn: 'root' })
export class EventoRiscoResolve implements Resolve<IEventoRisco> {
  constructor(private service: EventoRiscoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEventoRisco> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((eventoRisco: HttpResponse<EventoRisco>) => eventoRisco.body));
    }
    return of(new EventoRisco());
  }
}

export const eventoRiscoRoute: Routes = [
  {
    path: '',
    component: EventoRiscoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoRiscos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventoRiscoDetailComponent,
    resolve: {
      eventoRisco: EventoRiscoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoRiscos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventoRiscoUpdateComponent,
    resolve: {
      eventoRisco: EventoRiscoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoRiscos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventoRiscoUpdateComponent,
    resolve: {
      eventoRisco: EventoRiscoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoRiscos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const eventoRiscoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EventoRiscoDeletePopupComponent,
    resolve: {
      eventoRisco: EventoRiscoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EventoRiscos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
