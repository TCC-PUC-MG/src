import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MinaExtracaoComponent } from './mina-extracao.component';
import { MinaExtracaoDetailComponent } from './mina-extracao-detail.component';
import { MinaExtracaoUpdateComponent } from './mina-extracao-update.component';
import { MinaExtracaoDeletePopupComponent, MinaExtracaoDeleteDialogComponent } from './mina-extracao-delete-dialog.component';
import { minaExtracaoRoute, minaExtracaoPopupRoute } from './mina-extracao.route';

const ENTITY_STATES = [...minaExtracaoRoute, ...minaExtracaoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MinaExtracaoComponent,
    MinaExtracaoDetailComponent,
    MinaExtracaoUpdateComponent,
    MinaExtracaoDeleteDialogComponent,
    MinaExtracaoDeletePopupComponent
  ],
  entryComponents: [MinaExtracaoDeleteDialogComponent]
})
export class GatewayMinaExtracaoModule {}
