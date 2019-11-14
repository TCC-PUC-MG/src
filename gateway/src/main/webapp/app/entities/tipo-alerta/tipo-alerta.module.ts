import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { TipoAlertaComponent } from './tipo-alerta.component';
import { TipoAlertaDetailComponent } from './tipo-alerta-detail.component';
import { TipoAlertaUpdateComponent } from './tipo-alerta-update.component';
import { TipoAlertaDeletePopupComponent, TipoAlertaDeleteDialogComponent } from './tipo-alerta-delete-dialog.component';
import { tipoAlertaRoute, tipoAlertaPopupRoute } from './tipo-alerta.route';

const ENTITY_STATES = [...tipoAlertaRoute, ...tipoAlertaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoAlertaComponent,
    TipoAlertaDetailComponent,
    TipoAlertaUpdateComponent,
    TipoAlertaDeleteDialogComponent,
    TipoAlertaDeletePopupComponent
  ],
  entryComponents: [TipoAlertaDeleteDialogComponent]
})
export class GatewayTipoAlertaModule {}
