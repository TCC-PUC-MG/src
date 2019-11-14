import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { NivelSegurancaComponent } from './nivel-seguranca.component';
import { NivelSegurancaDetailComponent } from './nivel-seguranca-detail.component';
import { NivelSegurancaUpdateComponent } from './nivel-seguranca-update.component';
import { NivelSegurancaDeletePopupComponent, NivelSegurancaDeleteDialogComponent } from './nivel-seguranca-delete-dialog.component';
import { nivelSegurancaRoute, nivelSegurancaPopupRoute } from './nivel-seguranca.route';

const ENTITY_STATES = [...nivelSegurancaRoute, ...nivelSegurancaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NivelSegurancaComponent,
    NivelSegurancaDetailComponent,
    NivelSegurancaUpdateComponent,
    NivelSegurancaDeleteDialogComponent,
    NivelSegurancaDeletePopupComponent
  ],
  entryComponents: [NivelSegurancaDeleteDialogComponent]
})
export class GatewayNivelSegurancaModule {}
