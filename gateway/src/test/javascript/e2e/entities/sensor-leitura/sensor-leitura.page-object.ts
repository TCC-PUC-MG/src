import { element, by, ElementFinder } from 'protractor';

export class SensorLeituraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sensor-leitura div table .btn-danger'));
  title = element.all(by.css('jhi-sensor-leitura div h2#page-heading span')).first();

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

export class SensorLeituraUpdatePage {
  pageTitle = element(by.id('jhi-sensor-leitura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  leituraInput = element(by.id('field_leitura'));
  barragemSelect = element(by.id('field_barragem'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setLeituraInput(leitura) {
    await this.leituraInput.sendKeys(leitura);
  }

  async getLeituraInput() {
    return await this.leituraInput.getAttribute('value');
  }

  async barragemSelectLastOption() {
    await this.barragemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async barragemSelectOption(option) {
    await this.barragemSelect.sendKeys(option);
  }

  getBarragemSelect(): ElementFinder {
    return this.barragemSelect;
  }

  async getBarragemSelectedOption() {
    return await this.barragemSelect.element(by.css('option:checked')).getText();
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

export class SensorLeituraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sensorLeitura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sensorLeitura'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
