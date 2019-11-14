import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { EventoRiscoComponent } from './evento-risco.component';
import { EventoRiscoDetailComponent } from './evento-risco-detail.component';
import { EventoRiscoUpdateComponent } from './evento-risco-update.component';
import { EventoRiscoDeletePopupComponent, EventoRiscoDeleteDialogComponent } from './evento-risco-delete-dialog.component';
import { eventoRiscoRoute, eventoRiscoPopupRoute } from './evento-risco.route';

const ENTITY_STATES = [...eventoRiscoRoute, ...eventoRiscoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EventoRiscoComponent,
    EventoRiscoDetailComponent,
    EventoRiscoUpdateComponent,
    EventoRiscoDeleteDialogComponent,
    EventoRiscoDeletePopupComponent
  ],
  entryComponents: [EventoRiscoDeleteDialogComponent]
})
export class GatewayEventoRiscoModule {}
