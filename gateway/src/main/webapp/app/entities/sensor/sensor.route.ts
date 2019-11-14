import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { SensorComponent } from './sensor.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorUpdateComponent } from './sensor-update.component';
import { SensorDeletePopupComponent } from './sensor-delete-dialog.component';
import { ISensor } from 'app/shared/model/sensor.model';

@Injectable({ providedIn: 'root' })
export class SensorResolve implements Resolve<ISensor> {
  constructor(private service: SensorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISensor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((sensor: HttpResponse<Sensor>) => sensor.body));
    }
    return of(new Sensor());
  }
}

export const sensorRoute: Routes = [
  {
    path: '',
    component: SensorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sensors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SensorDetailComponent,
    resolve: {
      sensor: SensorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sensors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SensorUpdateComponent,
    resolve: {
      sensor: SensorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sensors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SensorUpdateComponent,
    resolve: {
      sensor: SensorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sensors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sensorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SensorDeletePopupComponent,
    resolve: {
      sensor: SensorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sensors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
