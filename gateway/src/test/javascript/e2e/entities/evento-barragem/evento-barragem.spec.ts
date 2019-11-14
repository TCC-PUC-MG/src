import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventoBarragemComponentsPage, EventoBarragemDeleteDialog, EventoBarragemUpdatePage } from './evento-barragem.page-object';

const expect = chai.expect;

describe('EventoBarragem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventoBarragemComponentsPage: EventoBarragemComponentsPage;
  let eventoBarragemUpdatePage: EventoBarragemUpdatePage;
  let eventoBarragemDeleteDialog: EventoBarragemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EventoBarragems', async () => {
    await navBarPage.goToEntity('evento-barragem');
    eventoBarragemComponentsPage = new EventoBarragemComponentsPage();
    await browser.wait(ec.visibilityOf(eventoBarragemComponentsPage.title), 5000);
    expect(await eventoBarragemComponentsPage.getTitle()).to.eq('Evento Barragems');
  });

  it('should load create EventoBarragem page', async () => {
    await eventoBarragemComponentsPage.clickOnCreateButton();
    eventoBarragemUpdatePage = new EventoBarragemUpdatePage();
    expect(await eventoBarragemUpdatePage.getPageTitle()).to.eq('Create or edit a Evento Barragem');
    await eventoBarragemUpdatePage.cancel();
  });

  it('should create and save EventoBarragems', async () => {
    const nbButtonsBeforeCreate = await eventoBarragemComponentsPage.countDeleteButtons();

    await eventoBarragemComponentsPage.clickOnCreateButton();
    await promise.all([eventoBarragemUpdatePage.sensorLeituraSelectLastOption()]);
    await eventoBarragemUpdatePage.save();
    expect(await eventoBarragemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventoBarragemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EventoBarragem', async () => {
    const nbButtonsBeforeDelete = await eventoBarragemComponentsPage.countDeleteButtons();
    await eventoBarragemComponentsPage.clickOnLastDeleteButton();

    eventoBarragemDeleteDialog = new EventoBarragemDeleteDialog();
    expect(await eventoBarragemDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Evento Barragem?');
    await eventoBarragemDeleteDialog.clickOnConfirmButton();

    expect(await eventoBarragemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
