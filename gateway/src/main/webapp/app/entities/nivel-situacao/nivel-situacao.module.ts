import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { NivelSituacaoComponent } from './nivel-situacao.component';
import { NivelSituacaoDetailComponent } from './nivel-situacao-detail.component';
import { NivelSituacaoUpdateComponent } from './nivel-situacao-update.component';
import { NivelSituacaoDeletePopupComponent, NivelSituacaoDeleteDialogComponent } from './nivel-situacao-delete-dialog.component';
import { nivelSituacaoRoute, nivelSituacaoPopupRoute } from './nivel-situacao.route';

const ENTITY_STATES = [...nivelSituacaoRoute, ...nivelSituacaoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NivelSituacaoComponent,
    NivelSituacaoDetailComponent,
    NivelSituacaoUpdateComponent,
    NivelSituacaoDeleteDialogComponent,
    NivelSituacaoDeletePopupComponent
  ],
  entryComponents: [NivelSituacaoDeleteDialogComponent]
})
export class GatewayNivelSituacaoModule {}
