import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SensorLeituraComponentsPage, SensorLeituraDeleteDialog, SensorLeituraUpdatePage } from './sensor-leitura.page-object';

const expect = chai.expect;

describe('SensorLeitura e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sensorLeituraComponentsPage: SensorLeituraComponentsPage;
  let sensorLeituraUpdatePage: SensorLeituraUpdatePage;
  let sensorLeituraDeleteDialog: SensorLeituraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SensorLeituras', async () => {
    await navBarPage.goToEntity('sensor-leitura');
    sensorLeituraComponentsPage = new SensorLeituraComponentsPage();
    await browser.wait(ec.visibilityOf(sensorLeituraComponentsPage.title), 5000);
    expect(await sensorLeituraComponentsPage.getTitle()).to.eq('Sensor Leituras');
  });

  it('should load create SensorLeitura page', async () => {
    await sensorLeituraComponentsPage.clickOnCreateButton();
    sensorLeituraUpdatePage = new SensorLeituraUpdatePage();
    expect(await sensorLeituraUpdatePage.getPageTitle()).to.eq('Create or edit a Sensor Leitura');
    await sensorLeituraUpdatePage.cancel();
  });

  it('should create and save SensorLeituras', async () => {
    const nbButtonsBeforeCreate = await sensorLeituraComponentsPage.countDeleteButtons();

    await sensorLeituraComponentsPage.clickOnCreateButton();
    await promise.all([sensorLeituraUpdatePage.setLeituraInput('leitura'), sensorLeituraUpdatePage.barragemSelectLastOption()]);
    expect(await sensorLeituraUpdatePage.getLeituraInput()).to.eq('leitura', 'Expected Leitura value to be equals to leitura');
    await sensorLeituraUpdatePage.save();
    expect(await sensorLeituraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sensorLeituraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SensorLeitura', async () => {
    const nbButtonsBeforeDelete = await sensorLeituraComponentsPage.countDeleteButtons();
    await sensorLeituraComponentsPage.clickOnLastDeleteButton();

    sensorLeituraDeleteDialog = new SensorLeituraDeleteDialog();
    expect(await sensorLeituraDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sensor Leitura?');
    await sensorLeituraDeleteDialog.clickOnConfirmButton();

    expect(await sensorLeituraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
