import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { RiscoBarragemComponent } from './risco-barragem.component';
import { RiscoBarragemDetailComponent } from './risco-barragem-detail.component';
import { RiscoBarragemUpdateComponent } from './risco-barragem-update.component';
import { RiscoBarragemDeletePopupComponent, RiscoBarragemDeleteDialogComponent } from './risco-barragem-delete-dialog.component';
import { riscoBarragemRoute, riscoBarragemPopupRoute } from './risco-barragem.route';

const ENTITY_STATES = [...riscoBarragemRoute, ...riscoBarragemPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RiscoBarragemComponent,
    RiscoBarragemDetailComponent,
    RiscoBarragemUpdateComponent,
    RiscoBarragemDeleteDialogComponent,
    RiscoBarragemDeletePopupComponent
  ],
  entryComponents: [RiscoBarragemDeleteDialogComponent]
})
export class GatewayRiscoBarragemModule {}
