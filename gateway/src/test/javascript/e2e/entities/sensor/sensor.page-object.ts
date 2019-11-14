import { element, by, ElementFinder } from 'protractor';

export class SensorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sensor div table .btn-danger'));
  title = element.all(by.css('jhi-sensor div h2#page-heading span')).first();

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

export class SensorUpdatePage {
  pageTitle = element(by.id('jhi-sensor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroInput = element(by.id('field_numero'));
  barragemSelect = element(by.id('field_barragem'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNumeroInput(numero) {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput() {
    return await this.numeroInput.getAttribute('value');
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

export class SensorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sensor-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sensor'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
