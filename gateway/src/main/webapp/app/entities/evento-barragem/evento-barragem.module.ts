import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { EventoBarragemComponent } from './evento-barragem.component';
import { EventoBarragemDetailComponent } from './evento-barragem-detail.component';
import { EventoBarragemUpdateComponent } from './evento-barragem-update.component';
import { EventoBarragemDeletePopupComponent, EventoBarragemDeleteDialogComponent } from './evento-barragem-delete-dialog.component';
import { eventoBarragemRoute, eventoBarragemPopupRoute } from './evento-barragem.route';

const ENTITY_STATES = [...eventoBarragemRoute, ...eventoBarragemPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EventoBarragemComponent,
    EventoBarragemDetailComponent,
    EventoBarragemUpdateComponent,
    EventoBarragemDeleteDialogComponent,
    EventoBarragemDeletePopupComponent
  ],
  entryComponents: [EventoBarragemDeleteDialogComponent]
})
export class GatewayEventoBarragemModule {}
