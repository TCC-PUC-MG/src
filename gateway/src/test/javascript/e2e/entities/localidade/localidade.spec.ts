import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocalidadeComponentsPage, LocalidadeDeleteDialog, LocalidadeUpdatePage } from './localidade.page-object';

const expect = chai.expect;

describe('Localidade e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localidadeComponentsPage: LocalidadeComponentsPage;
  let localidadeUpdatePage: LocalidadeUpdatePage;
  let localidadeDeleteDialog: LocalidadeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Localidades', async () => {
    await navBarPage.goToEntity('localidade');
    localidadeComponentsPage = new LocalidadeComponentsPage();
    await browser.wait(ec.visibilityOf(localidadeComponentsPage.title), 5000);
    expect(await localidadeComponentsPage.getTitle()).to.eq('Localidades');
  });

  it('should load create Localidade page', async () => {
    await localidadeComponentsPage.clickOnCreateButton();
    localidadeUpdatePage = new LocalidadeUpdatePage();
    expect(await localidadeUpdatePage.getPageTitle()).to.eq('Create or edit a Localidade');
    await localidadeUpdatePage.cancel();
  });

  it('should create and save Localidades', async () => {
    const nbButtonsBeforeCreate = await localidadeComponentsPage.countDeleteButtons();

    await localidadeComponentsPage.clickOnCreateButton();
    await promise.all([
      localidadeUpdatePage.setNomeInput('nome'),
      localidadeUpdatePage.setLatituteInput('5'),
      localidadeUpdatePage.setLongitudeInput('5')
    ]);
    expect(await localidadeUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await localidadeUpdatePage.getLatituteInput()).to.eq('5', 'Expected latitute value to be equals to 5');
    expect(await localidadeUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    await localidadeUpdatePage.save();
    expect(await localidadeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localidadeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Localidade', async () => {
    const nbButtonsBeforeDelete = await localidadeComponentsPage.countDeleteButtons();
    await localidadeComponentsPage.clickOnLastDeleteButton();

    localidadeDeleteDialog = new LocalidadeDeleteDialog();
    expect(await localidadeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Localidade?');
    await localidadeDeleteDialog.clickOnConfirmButton();

    expect(await localidadeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
