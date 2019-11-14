import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OcorrenciasComponentsPage, OcorrenciasDeleteDialog, OcorrenciasUpdatePage } from './ocorrencias.page-object';

const expect = chai.expect;

describe('Ocorrencias e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ocorrenciasComponentsPage: OcorrenciasComponentsPage;
  let ocorrenciasUpdatePage: OcorrenciasUpdatePage;
  let ocorrenciasDeleteDialog: OcorrenciasDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ocorrencias', async () => {
    await navBarPage.goToEntity('ocorrencias');
    ocorrenciasComponentsPage = new OcorrenciasComponentsPage();
    await browser.wait(ec.visibilityOf(ocorrenciasComponentsPage.title), 5000);
    expect(await ocorrenciasComponentsPage.getTitle()).to.eq('Ocorrencias');
  });

  it('should load create Ocorrencias page', async () => {
    await ocorrenciasComponentsPage.clickOnCreateButton();
    ocorrenciasUpdatePage = new OcorrenciasUpdatePage();
    expect(await ocorrenciasUpdatePage.getPageTitle()).to.eq('Create or edit a Ocorrencias');
    await ocorrenciasUpdatePage.cancel();
  });

  it('should create and save Ocorrencias', async () => {
    const nbButtonsBeforeCreate = await ocorrenciasComponentsPage.countDeleteButtons();

    await ocorrenciasComponentsPage.clickOnCreateButton();
    await promise.all([ocorrenciasUpdatePage.setDescricaoInput('descricao'), ocorrenciasUpdatePage.nivelSituacaoSelectLastOption()]);
    expect(await ocorrenciasUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    await ocorrenciasUpdatePage.save();
    expect(await ocorrenciasUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ocorrenciasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ocorrencias', async () => {
    const nbButtonsBeforeDelete = await ocorrenciasComponentsPage.countDeleteButtons();
    await ocorrenciasComponentsPage.clickOnLastDeleteButton();

    ocorrenciasDeleteDialog = new OcorrenciasDeleteDialog();
    expect(await ocorrenciasDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Ocorrencias?');
    await ocorrenciasDeleteDialog.clickOnConfirmButton();

    expect(await ocorrenciasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
