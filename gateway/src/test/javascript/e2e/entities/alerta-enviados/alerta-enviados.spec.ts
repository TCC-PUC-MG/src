import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlertaEnviadosComponentsPage, AlertaEnviadosDeleteDialog, AlertaEnviadosUpdatePage } from './alerta-enviados.page-object';

const expect = chai.expect;

describe('AlertaEnviados e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let alertaEnviadosComponentsPage: AlertaEnviadosComponentsPage;
  let alertaEnviadosUpdatePage: AlertaEnviadosUpdatePage;
  let alertaEnviadosDeleteDialog: AlertaEnviadosDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AlertaEnviados', async () => {
    await navBarPage.goToEntity('alerta-enviados');
    alertaEnviadosComponentsPage = new AlertaEnviadosComponentsPage();
    await browser.wait(ec.visibilityOf(alertaEnviadosComponentsPage.title), 5000);
    expect(await alertaEnviadosComponentsPage.getTitle()).to.eq('Alerta Enviados');
  });

  it('should load create AlertaEnviados page', async () => {
    await alertaEnviadosComponentsPage.clickOnCreateButton();
    alertaEnviadosUpdatePage = new AlertaEnviadosUpdatePage();
    expect(await alertaEnviadosUpdatePage.getPageTitle()).to.eq('Create or edit a Alerta Enviados');
    await alertaEnviadosUpdatePage.cancel();
  });

  it('should create and save AlertaEnviados', async () => {
    const nbButtonsBeforeCreate = await alertaEnviadosComponentsPage.countDeleteButtons();

    await alertaEnviadosComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await alertaEnviadosUpdatePage.save();
    expect(await alertaEnviadosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await alertaEnviadosComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AlertaEnviados', async () => {
    const nbButtonsBeforeDelete = await alertaEnviadosComponentsPage.countDeleteButtons();
    await alertaEnviadosComponentsPage.clickOnLastDeleteButton();

    alertaEnviadosDeleteDialog = new AlertaEnviadosDeleteDialog();
    expect(await alertaEnviadosDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Alerta Enviados?');
    await alertaEnviadosDeleteDialog.clickOnConfirmButton();

    expect(await alertaEnviadosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
