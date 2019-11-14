import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AlertaEnviadosComponent } from './alerta-enviados.component';
import { AlertaEnviadosDetailComponent } from './alerta-enviados-detail.component';
import { AlertaEnviadosUpdateComponent } from './alerta-enviados-update.component';
import { AlertaEnviadosDeletePopupComponent, AlertaEnviadosDeleteDialogComponent } from './alerta-enviados-delete-dialog.component';
import { alertaEnviadosRoute, alertaEnviadosPopupRoute } from './alerta-enviados.route';

const ENTITY_STATES = [...alertaEnviadosRoute, ...alertaEnviadosPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AlertaEnviadosComponent,
    AlertaEnviadosDetailComponent,
    AlertaEnviadosUpdateComponent,
    AlertaEnviadosDeleteDialogComponent,
    AlertaEnviadosDeletePopupComponent
  ],
  entryComponents: [AlertaEnviadosDeleteDialogComponent]
})
export class GatewayAlertaEnviadosModule {}
