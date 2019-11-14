import { NgModule } from '@angular/core';
import { GatewaySharedLibsModule } from './shared-libs.module';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [GatewaySharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective],
  exports: [GatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective]
})
export class GatewaySharedModule {}
