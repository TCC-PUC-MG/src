import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SensorComponent } from './sensor.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorUpdateComponent } from './sensor-update.component';
import { SensorDeletePopupComponent, SensorDeleteDialogComponent } from './sensor-delete-dialog.component';
import { sensorRoute, sensorPopupRoute } from './sensor.route';

const ENTITY_STATES = [...sensorRoute, ...sensorPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SensorComponent, SensorDetailComponent, SensorUpdateComponent, SensorDeleteDialogComponent, SensorDeletePopupComponent],
  entryComponents: [SensorDeleteDialogComponent]
})
export class GatewaySensorModule {}
