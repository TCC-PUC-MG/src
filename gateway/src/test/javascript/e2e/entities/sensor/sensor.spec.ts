import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SensorComponentsPage, SensorDeleteDialog, SensorUpdatePage } from './sensor.page-object';

const expect = chai.expect;

describe('Sensor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sensorComponentsPage: SensorComponentsPage;
  let sensorUpdatePage: SensorUpdatePage;
  let sensorDeleteDialog: SensorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sensors', async () => {
    await navBarPage.goToEntity('sensor');
    sensorComponentsPage = new SensorComponentsPage();
    await browser.wait(ec.visibilityOf(sensorComponentsPage.title), 5000);
    expect(await sensorComponentsPage.getTitle()).to.eq('Sensors');
  });

  it('should load create Sensor page', async () => {
    await sensorComponentsPage.clickOnCreateButton();
    sensorUpdatePage = new SensorUpdatePage();
    expect(await sensorUpdatePage.getPageTitle()).to.eq('Create or edit a Sensor');
    await sensorUpdatePage.cancel();
  });

  it('should create and save Sensors', async () => {
    const nbButtonsBeforeCreate = await sensorComponentsPage.countDeleteButtons();

    await sensorComponentsPage.clickOnCreateButton();
    await promise.all([sensorUpdatePage.setNumeroInput('5'), sensorUpdatePage.barragemSelectLastOption()]);
    expect(await sensorUpdatePage.getNumeroInput()).to.eq('5', 'Expected numero value to be equals to 5');
    await sensorUpdatePage.save();
    expect(await sensorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sensorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sensor', async () => {
    const nbButtonsBeforeDelete = await sensorComponentsPage.countDeleteButtons();
    await sensorComponentsPage.clickOnLastDeleteButton();

    sensorDeleteDialog = new SensorDeleteDialog();
    expect(await sensorDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sensor?');
    await sensorDeleteDialog.clickOnConfirmButton();

    expect(await sensorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
