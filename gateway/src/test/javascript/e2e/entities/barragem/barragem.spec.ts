import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BarragemComponentsPage, BarragemDeleteDialog, BarragemUpdatePage } from './barragem.page-object';

const expect = chai.expect;

describe('Barragem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let barragemComponentsPage: BarragemComponentsPage;
  let barragemUpdatePage: BarragemUpdatePage;
  let barragemDeleteDialog: BarragemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Barragems', async () => {
    await navBarPage.goToEntity('barragem');
    barragemComponentsPage = new BarragemComponentsPage();
    await browser.wait(ec.visibilityOf(barragemComponentsPage.title), 5000);
    expect(await barragemComponentsPage.getTitle()).to.eq('Barragems');
  });

  it('should load create Barragem page', async () => {
    await barragemComponentsPage.clickOnCreateButton();
    barragemUpdatePage = new BarragemUpdatePage();
    expect(await barragemUpdatePage.getPageTitle()).to.eq('Create or edit a Barragem');
    await barragemUpdatePage.cancel();
  });

  it('should create and save Barragems', async () => {
    const nbButtonsBeforeCreate = await barragemComponentsPage.countDeleteButtons();

    await barragemComponentsPage.clickOnCreateButton();
    await promise.all([barragemUpdatePage.minaExtracaoSelectLastOption()]);
    await barragemUpdatePage.save();
    expect(await barragemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await barragemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Barragem', async () => {
    const nbButtonsBeforeDelete = await barragemComponentsPage.countDeleteButtons();
    await barragemComponentsPage.clickOnLastDeleteButton();

    barragemDeleteDialog = new BarragemDeleteDialog();
    expect(await barragemDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Barragem?');
    await barragemDeleteDialog.clickOnConfirmButton();

    expect(await barragemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
