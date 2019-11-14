import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { OrgaoGovernoComponent } from './orgao-governo.component';
import { OrgaoGovernoDetailComponent } from './orgao-governo-detail.component';
import { OrgaoGovernoUpdateComponent } from './orgao-governo-update.component';
import { OrgaoGovernoDeletePopupComponent, OrgaoGovernoDeleteDialogComponent } from './orgao-governo-delete-dialog.component';
import { orgaoGovernoRoute, orgaoGovernoPopupRoute } from './orgao-governo.route';

const ENTITY_STATES = [...orgaoGovernoRoute, ...orgaoGovernoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrgaoGovernoComponent,
    OrgaoGovernoDetailComponent,
    OrgaoGovernoUpdateComponent,
    OrgaoGovernoDeleteDialogComponent,
    OrgaoGovernoDeletePopupComponent
  ],
  entryComponents: [OrgaoGovernoDeleteDialogComponent]
})
export class GatewayOrgaoGovernoModule {}
