import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlertaOrgaoComponentsPage, AlertaOrgaoDeleteDialog, AlertaOrgaoUpdatePage } from './alerta-orgao.page-object';

const expect = chai.expect;

describe('AlertaOrgao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let alertaOrgaoComponentsPage: AlertaOrgaoComponentsPage;
  let alertaOrgaoUpdatePage: AlertaOrgaoUpdatePage;
  let alertaOrgaoDeleteDialog: AlertaOrgaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AlertaOrgaos', async () => {
    await navBarPage.goToEntity('alerta-orgao');
    alertaOrgaoComponentsPage = new AlertaOrgaoComponentsPage();
    await browser.wait(ec.visibilityOf(alertaOrgaoComponentsPage.title), 5000);
    expect(await alertaOrgaoComponentsPage.getTitle()).to.eq('Alerta Orgaos');
  });

  it('should load create AlertaOrgao page', async () => {
    await alertaOrgaoComponentsPage.clickOnCreateButton();
    alertaOrgaoUpdatePage = new AlertaOrgaoUpdatePage();
    expect(await alertaOrgaoUpdatePage.getPageTitle()).to.eq('Create or edit a Alerta Orgao');
    await alertaOrgaoUpdatePage.cancel();
  });

  it('should create and save AlertaOrgaos', async () => {
    const nbButtonsBeforeCreate = await alertaOrgaoComponentsPage.countDeleteButtons();

    await alertaOrgaoComponentsPage.clickOnCreateButton();
    await promise.all([
      alertaOrgaoUpdatePage.alertaEnviadosSelectLastOption(),
      alertaOrgaoUpdatePage.tipoAlertaSelectLastOption(),
      alertaOrgaoUpdatePage.orgaoGovernaSelectLastOption()
    ]);
    await alertaOrgaoUpdatePage.save();
    expect(await alertaOrgaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await alertaOrgaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AlertaOrgao', async () => {
    const nbButtonsBeforeDelete = await alertaOrgaoComponentsPage.countDeleteButtons();
    await alertaOrgaoComponentsPage.clickOnLastDeleteButton();

    alertaOrgaoDeleteDialog = new AlertaOrgaoDeleteDialog();
    expect(await alertaOrgaoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Alerta Orgao?');
    await alertaOrgaoDeleteDialog.clickOnConfirmButton();

    expect(await alertaOrgaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
