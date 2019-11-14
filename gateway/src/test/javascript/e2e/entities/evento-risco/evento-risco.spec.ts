import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventoRiscoComponentsPage, EventoRiscoDeleteDialog, EventoRiscoUpdatePage } from './evento-risco.page-object';

const expect = chai.expect;

describe('EventoRisco e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventoRiscoComponentsPage: EventoRiscoComponentsPage;
  let eventoRiscoUpdatePage: EventoRiscoUpdatePage;
  let eventoRiscoDeleteDialog: EventoRiscoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EventoRiscos', async () => {
    await navBarPage.goToEntity('evento-risco');
    eventoRiscoComponentsPage = new EventoRiscoComponentsPage();
    await browser.wait(ec.visibilityOf(eventoRiscoComponentsPage.title), 5000);
    expect(await eventoRiscoComponentsPage.getTitle()).to.eq('Evento Riscos');
  });

  it('should load create EventoRisco page', async () => {
    await eventoRiscoComponentsPage.clickOnCreateButton();
    eventoRiscoUpdatePage = new EventoRiscoUpdatePage();
    expect(await eventoRiscoUpdatePage.getPageTitle()).to.eq('Create or edit a Evento Risco');
    await eventoRiscoUpdatePage.cancel();
  });

  it('should create and save EventoRiscos', async () => {
    const nbButtonsBeforeCreate = await eventoRiscoComponentsPage.countDeleteButtons();

    await eventoRiscoComponentsPage.clickOnCreateButton();
    await promise.all([
      eventoRiscoUpdatePage.setEventosBarragemInput('eventosBarragem'),
      eventoRiscoUpdatePage.eventoBarragemSelectLastOption()
    ]);
    expect(await eventoRiscoUpdatePage.getEventosBarragemInput()).to.eq(
      'eventosBarragem',
      'Expected EventosBarragem value to be equals to eventosBarragem'
    );
    await eventoRiscoUpdatePage.save();
    expect(await eventoRiscoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventoRiscoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EventoRisco', async () => {
    const nbButtonsBeforeDelete = await eventoRiscoComponentsPage.countDeleteButtons();
    await eventoRiscoComponentsPage.clickOnLastDeleteButton();

    eventoRiscoDeleteDialog = new EventoRiscoDeleteDialog();
    expect(await eventoRiscoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Evento Risco?');
    await eventoRiscoDeleteDialog.clickOnConfirmButton();

    expect(await eventoRiscoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
