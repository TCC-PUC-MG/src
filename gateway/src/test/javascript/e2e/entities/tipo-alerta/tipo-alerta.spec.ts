import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoAlertaComponentsPage, TipoAlertaDeleteDialog, TipoAlertaUpdatePage } from './tipo-alerta.page-object';

const expect = chai.expect;

describe('TipoAlerta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoAlertaComponentsPage: TipoAlertaComponentsPage;
  let tipoAlertaUpdatePage: TipoAlertaUpdatePage;
  let tipoAlertaDeleteDialog: TipoAlertaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoAlertas', async () => {
    await navBarPage.goToEntity('tipo-alerta');
    tipoAlertaComponentsPage = new TipoAlertaComponentsPage();
    await browser.wait(ec.visibilityOf(tipoAlertaComponentsPage.title), 5000);
    expect(await tipoAlertaComponentsPage.getTitle()).to.eq('Tipo Alertas');
  });

  it('should load create TipoAlerta page', async () => {
    await tipoAlertaComponentsPage.clickOnCreateButton();
    tipoAlertaUpdatePage = new TipoAlertaUpdatePage();
    expect(await tipoAlertaUpdatePage.getPageTitle()).to.eq('Create or edit a Tipo Alerta');
    await tipoAlertaUpdatePage.cancel();
  });

  it('should create and save TipoAlertas', async () => {
    const nbButtonsBeforeCreate = await tipoAlertaComponentsPage.countDeleteButtons();

    await tipoAlertaComponentsPage.clickOnCreateButton();
    await promise.all([tipoAlertaUpdatePage.setDescricaoInput('descricao'), tipoAlertaUpdatePage.ocorrenciasSelectLastOption()]);
    expect(await tipoAlertaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    await tipoAlertaUpdatePage.save();
    expect(await tipoAlertaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoAlertaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoAlerta', async () => {
    const nbButtonsBeforeDelete = await tipoAlertaComponentsPage.countDeleteButtons();
    await tipoAlertaComponentsPage.clickOnLastDeleteButton();

    tipoAlertaDeleteDialog = new TipoAlertaDeleteDialog();
    expect(await tipoAlertaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Tipo Alerta?');
    await tipoAlertaDeleteDialog.clickOnConfirmButton();

    expect(await tipoAlertaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
