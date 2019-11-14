import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { LocalidadeComponent } from './localidade.component';
import { LocalidadeDetailComponent } from './localidade-detail.component';
import { LocalidadeUpdateComponent } from './localidade-update.component';
import { LocalidadeDeletePopupComponent, LocalidadeDeleteDialogComponent } from './localidade-delete-dialog.component';
import { localidadeRoute, localidadePopupRoute } from './localidade.route';

const ENTITY_STATES = [...localidadeRoute, ...localidadePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LocalidadeComponent,
    LocalidadeDetailComponent,
    LocalidadeUpdateComponent,
    LocalidadeDeleteDialogComponent,
    LocalidadeDeletePopupComponent
  ],
  entryComponents: [LocalidadeDeleteDialogComponent]
})
export class GatewayLocalidadeModule {}
