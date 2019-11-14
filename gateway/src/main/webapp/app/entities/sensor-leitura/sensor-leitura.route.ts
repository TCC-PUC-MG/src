import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { SensorLeituraService } from './sensor-leitura.service';
import { SensorLeituraComponent } from './sensor-leitura.component';
import { SensorLeituraDetailComponent } from './sensor-leitura-detail.component';
import { SensorLeituraUpdateComponent } from './sensor-leitura-update.component';
import { SensorLeituraDeletePopupComponent } from './sensor-leitura-delete-dialog.component';
import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';

@Injectable({ providedIn: 'root' })
export class SensorLeituraResolve implements Resolve<ISensorLeitura> {
  constructor(private service: SensorLeituraService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISensorLeitura> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((sensorLeitura: HttpResponse<SensorLeitura>) => sensorLeitura.body));
    }
    return of(new SensorLeitura());
  }
}

export const sensorLeituraRoute: Routes = [
  {
    path: '',
    component: SensorLeituraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SensorLeituras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SensorLeituraDetailComponent,
    resolve: {
      sensorLeitura: SensorLeituraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SensorLeituras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SensorLeituraUpdateComponent,
    resolve: {
      sensorLeitura: SensorLeituraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SensorLeituras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SensorLeituraUpdateComponent,
    resolve: {
      sensorLeitura: SensorLeituraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SensorLeituras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sensorLeituraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SensorLeituraDeletePopupComponent,
    resolve: {
      sensorLeitura: SensorLeituraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SensorLeituras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
