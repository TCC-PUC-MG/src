import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { BarragemComponent } from './barragem.component';
import { BarragemDetailComponent } from './barragem-detail.component';
import { BarragemUpdateComponent } from './barragem-update.component';
import { BarragemDeletePopupComponent, BarragemDeleteDialogComponent } from './barragem-delete-dialog.component';
import { barragemRoute, barragemPopupRoute } from './barragem.route';

const ENTITY_STATES = [...barragemRoute, ...barragemPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BarragemComponent,
    BarragemDetailComponent,
    BarragemUpdateComponent,
    BarragemDeleteDialogComponent,
    BarragemDeletePopupComponent
  ],
  entryComponents: [BarragemDeleteDialogComponent]
})
export class GatewayBarragemModule {}
