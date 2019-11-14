import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AlertaOrgaoComponent } from './alerta-orgao.component';
import { AlertaOrgaoDetailComponent } from './alerta-orgao-detail.component';
import { AlertaOrgaoUpdateComponent } from './alerta-orgao-update.component';
import { AlertaOrgaoDeletePopupComponent, AlertaOrgaoDeleteDialogComponent } from './alerta-orgao-delete-dialog.component';
import { alertaOrgaoRoute, alertaOrgaoPopupRoute } from './alerta-orgao.route';

const ENTITY_STATES = [...alertaOrgaoRoute, ...alertaOrgaoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AlertaOrgaoComponent,
    AlertaOrgaoDetailComponent,
    AlertaOrgaoUpdateComponent,
    AlertaOrgaoDeleteDialogComponent,
    AlertaOrgaoDeletePopupComponent
  ],
  entryComponents: [AlertaOrgaoDeleteDialogComponent]
})
export class GatewayAlertaOrgaoModule {}
