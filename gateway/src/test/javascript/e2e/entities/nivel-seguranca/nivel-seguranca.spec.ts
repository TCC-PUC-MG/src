import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NivelSegurancaComponentsPage, NivelSegurancaDeleteDialog, NivelSegurancaUpdatePage } from './nivel-seguranca.page-object';

const expect = chai.expect;

describe('NivelSeguranca e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nivelSegurancaComponentsPage: NivelSegurancaComponentsPage;
  let nivelSegurancaUpdatePage: NivelSegurancaUpdatePage;
  let nivelSegurancaDeleteDialog: NivelSegurancaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NivelSegurancas', async () => {
    await navBarPage.goToEntity('nivel-seguranca');
    nivelSegurancaComponentsPage = new NivelSegurancaComponentsPage();
    await browser.wait(ec.visibilityOf(nivelSegurancaComponentsPage.title), 5000);
    expect(await nivelSegurancaComponentsPage.getTitle()).to.eq('Nivel Segurancas');
  });

  it('should load create NivelSeguranca page', async () => {
    await nivelSegurancaComponentsPage.clickOnCreateButton();
    nivelSegurancaUpdatePage = new NivelSegurancaUpdatePage();
    expect(await nivelSegurancaUpdatePage.getPageTitle()).to.eq('Create or edit a Nivel Seguranca');
    await nivelSegurancaUpdatePage.cancel();
  });

  it('should create and save NivelSegurancas', async () => {
    const nbButtonsBeforeCreate = await nivelSegurancaComponentsPage.countDeleteButtons();

    await nivelSegurancaComponentsPage.clickOnCreateButton();
    await promise.all([nivelSegurancaUpdatePage.setNivelInput('nivel'), nivelSegurancaUpdatePage.setDescricaoInput('descricao')]);
    expect(await nivelSegurancaUpdatePage.getNivelInput()).to.eq('nivel', 'Expected Nivel value to be equals to nivel');
    expect(await nivelSegurancaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    await nivelSegurancaUpdatePage.save();
    expect(await nivelSegurancaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await nivelSegurancaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NivelSeguranca', async () => {
    const nbButtonsBeforeDelete = await nivelSegurancaComponentsPage.countDeleteButtons();
    await nivelSegurancaComponentsPage.clickOnLastDeleteButton();

    nivelSegurancaDeleteDialog = new NivelSegurancaDeleteDialog();
    expect(await nivelSegurancaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Nivel Seguranca?');
    await nivelSegurancaDeleteDialog.clickOnConfirmButton();

    expect(await nivelSegurancaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
