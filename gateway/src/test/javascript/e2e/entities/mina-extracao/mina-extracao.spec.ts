import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MinaExtracaoComponentsPage, MinaExtracaoDeleteDialog, MinaExtracaoUpdatePage } from './mina-extracao.page-object';

const expect = chai.expect;

describe('MinaExtracao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let minaExtracaoComponentsPage: MinaExtracaoComponentsPage;
  let minaExtracaoUpdatePage: MinaExtracaoUpdatePage;
  let minaExtracaoDeleteDialog: MinaExtracaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MinaExtracaos', async () => {
    await navBarPage.goToEntity('mina-extracao');
    minaExtracaoComponentsPage = new MinaExtracaoComponentsPage();
    await browser.wait(ec.visibilityOf(minaExtracaoComponentsPage.title), 5000);
    expect(await minaExtracaoComponentsPage.getTitle()).to.eq('Mina Extracaos');
  });

  it('should load create MinaExtracao page', async () => {
    await minaExtracaoComponentsPage.clickOnCreateButton();
    minaExtracaoUpdatePage = new MinaExtracaoUpdatePage();
    expect(await minaExtracaoUpdatePage.getPageTitle()).to.eq('Create or edit a Mina Extracao');
    await minaExtracaoUpdatePage.cancel();
  });

  it('should create and save MinaExtracaos', async () => {
    const nbButtonsBeforeCreate = await minaExtracaoComponentsPage.countDeleteButtons();

    await minaExtracaoComponentsPage.clickOnCreateButton();
    await promise.all([minaExtracaoUpdatePage.setTamanhoInput('tamanho'), minaExtracaoUpdatePage.localidadeSelectLastOption()]);
    expect(await minaExtracaoUpdatePage.getTamanhoInput()).to.eq('tamanho', 'Expected Tamanho value to be equals to tamanho');
    await minaExtracaoUpdatePage.save();
    expect(await minaExtracaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await minaExtracaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MinaExtracao', async () => {
    const nbButtonsBeforeDelete = await minaExtracaoComponentsPage.countDeleteButtons();
    await minaExtracaoComponentsPage.clickOnLastDeleteButton();

    minaExtracaoDeleteDialog = new MinaExtracaoDeleteDialog();
    expect(await minaExtracaoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Mina Extracao?');
    await minaExtracaoDeleteDialog.clickOnConfirmButton();

    expect(await minaExtracaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
