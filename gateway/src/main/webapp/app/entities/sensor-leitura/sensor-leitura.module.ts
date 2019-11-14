import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SensorLeituraComponent } from './sensor-leitura.component';
import { SensorLeituraDetailComponent } from './sensor-leitura-detail.component';
import { SensorLeituraUpdateComponent } from './sensor-leitura-update.component';
import { SensorLeituraDeletePopupComponent, SensorLeituraDeleteDialogComponent } from './sensor-leitura-delete-dialog.component';
import { sensorLeituraRoute, sensorLeituraPopupRoute } from './sensor-leitura.route';

const ENTITY_STATES = [...sensorLeituraRoute, ...sensorLeituraPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SensorLeituraComponent,
    SensorLeituraDetailComponent,
    SensorLeituraUpdateComponent,
    SensorLeituraDeleteDialogComponent,
    SensorLeituraDeletePopupComponent
  ],
  entryComponents: [SensorLeituraDeleteDialogComponent]
})
export class GatewaySensorLeituraModule {}
