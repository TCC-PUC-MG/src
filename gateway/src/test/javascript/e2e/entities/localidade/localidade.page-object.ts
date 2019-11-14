import { element, by, ElementFinder } from 'protractor';

export class LocalidadeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localidade div table .btn-danger'));
  title = element.all(by.css('jhi-localidade div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class LocalidadeUpdatePage {
  pageTitle = element(by.id('jhi-localidade-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  latituteInput = element(by.id('field_latitute'));
  longitudeInput = element(by.id('field_longitude'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return await this.nomeInput.getAttribute('value');
  }

  async setLatituteInput(latitute) {
    await this.latituteInput.sendKeys(latitute);
  }

  async getLatituteInput() {
    return await this.latituteInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return await this.longitudeInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class LocalidadeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localidade-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localidade'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
