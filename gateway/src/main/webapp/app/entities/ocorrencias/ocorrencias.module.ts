import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { OcorrenciasComponent } from './ocorrencias.component';
import { OcorrenciasDetailComponent } from './ocorrencias-detail.component';
import { OcorrenciasUpdateComponent } from './ocorrencias-update.component';
import { OcorrenciasDeletePopupComponent, OcorrenciasDeleteDialogComponent } from './ocorrencias-delete-dialog.component';
import { ocorrenciasRoute, ocorrenciasPopupRoute } from './ocorrencias.route';

const ENTITY_STATES = [...ocorrenciasRoute, ...ocorrenciasPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OcorrenciasComponent,
    OcorrenciasDetailComponent,
    OcorrenciasUpdateComponent,
    OcorrenciasDeleteDialogComponent,
    OcorrenciasDeletePopupComponent
  ],
  entryComponents: [OcorrenciasDeleteDialogComponent]
})
export class GatewayOcorrenciasModule {}
