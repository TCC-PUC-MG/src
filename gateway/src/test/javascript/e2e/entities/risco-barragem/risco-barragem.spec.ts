import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RiscoBarragemComponentsPage, RiscoBarragemDeleteDialog, RiscoBarragemUpdatePage } from './risco-barragem.page-object';

const expect = chai.expect;

describe('RiscoBarragem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let riscoBarragemComponentsPage: RiscoBarragemComponentsPage;
  let riscoBarragemUpdatePage: RiscoBarragemUpdatePage;
  let riscoBarragemDeleteDialog: RiscoBarragemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RiscoBarragems', async () => {
    await navBarPage.goToEntity('risco-barragem');
    riscoBarragemComponentsPage = new RiscoBarragemComponentsPage();
    await browser.wait(ec.visibilityOf(riscoBarragemComponentsPage.title), 5000);
    expect(await riscoBarragemComponentsPage.getTitle()).to.eq('Risco Barragems');
  });

  it('should load create RiscoBarragem page', async () => {
    await riscoBarragemComponentsPage.clickOnCreateButton();
    riscoBarragemUpdatePage = new RiscoBarragemUpdatePage();
    expect(await riscoBarragemUpdatePage.getPageTitle()).to.eq('Create or edit a Risco Barragem');
    await riscoBarragemUpdatePage.cancel();
  });

  it('should create and save RiscoBarragems', async () => {
    const nbButtonsBeforeCreate = await riscoBarragemComponentsPage.countDeleteButtons();

    await riscoBarragemComponentsPage.clickOnCreateButton();
    await promise.all([
      riscoBarragemUpdatePage.setDescricaoRiscoInput('descricaoRisco'),
      riscoBarragemUpdatePage.setGrauDoRiscoInput('5'),
      riscoBarragemUpdatePage.eventoRiscoSelectLastOption()
    ]);
    expect(await riscoBarragemUpdatePage.getDescricaoRiscoInput()).to.eq(
      'descricaoRisco',
      'Expected DescricaoRisco value to be equals to descricaoRisco'
    );
    expect(await riscoBarragemUpdatePage.getGrauDoRiscoInput()).to.eq('5', 'Expected grauDoRisco value to be equals to 5');
    await riscoBarragemUpdatePage.save();
    expect(await riscoBarragemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await riscoBarragemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RiscoBarragem', async () => {
    const nbButtonsBeforeDelete = await riscoBarragemComponentsPage.countDeleteButtons();
    await riscoBarragemComponentsPage.clickOnLastDeleteButton();

    riscoBarragemDeleteDialog = new RiscoBarragemDeleteDialog();
    expect(await riscoBarragemDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Risco Barragem?');
    await riscoBarragemDeleteDialog.clickOnConfirmButton();

    expect(await riscoBarragemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
