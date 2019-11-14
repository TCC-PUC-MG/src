import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NivelSituacaoComponentsPage, NivelSituacaoDeleteDialog, NivelSituacaoUpdatePage } from './nivel-situacao.page-object';

const expect = chai.expect;

describe('NivelSituacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nivelSituacaoComponentsPage: NivelSituacaoComponentsPage;
  let nivelSituacaoUpdatePage: NivelSituacaoUpdatePage;
  let nivelSituacaoDeleteDialog: NivelSituacaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NivelSituacaos', async () => {
    await navBarPage.goToEntity('nivel-situacao');
    nivelSituacaoComponentsPage = new NivelSituacaoComponentsPage();
    await browser.wait(ec.visibilityOf(nivelSituacaoComponentsPage.title), 5000);
    expect(await nivelSituacaoComponentsPage.getTitle()).to.eq('Nivel Situacaos');
  });

  it('should load create NivelSituacao page', async () => {
    await nivelSituacaoComponentsPage.clickOnCreateButton();
    nivelSituacaoUpdatePage = new NivelSituacaoUpdatePage();
    expect(await nivelSituacaoUpdatePage.getPageTitle()).to.eq('Create or edit a Nivel Situacao');
    await nivelSituacaoUpdatePage.cancel();
  });

  it('should create and save NivelSituacaos', async () => {
    const nbButtonsBeforeCreate = await nivelSituacaoComponentsPage.countDeleteButtons();

    await nivelSituacaoComponentsPage.clickOnCreateButton();
    await promise.all([nivelSituacaoUpdatePage.setDescricaoInput('descricao'), nivelSituacaoUpdatePage.nivelSegurancaSelectLastOption()]);
    expect(await nivelSituacaoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    await nivelSituacaoUpdatePage.save();
    expect(await nivelSituacaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await nivelSituacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NivelSituacao', async () => {
    const nbButtonsBeforeDelete = await nivelSituacaoComponentsPage.countDeleteButtons();
    await nivelSituacaoComponentsPage.clickOnLastDeleteButton();

    nivelSituacaoDeleteDialog = new NivelSituacaoDeleteDialog();
    expect(await nivelSituacaoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Nivel Situacao?');
    await nivelSituacaoDeleteDialog.clickOnConfirmButton();

    expect(await nivelSituacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
