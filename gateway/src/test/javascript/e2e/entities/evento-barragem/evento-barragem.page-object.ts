import { element, by, ElementFinder } from 'protractor';

export class EventoBarragemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-evento-barragem div table .btn-danger'));
  title = element.all(by.css('jhi-evento-barragem div h2#page-heading span')).first();

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

export class EventoBarragemUpdatePage {
  pageTitle = element(by.id('jhi-evento-barragem-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  sensorLeituraSelect = element(by.id('field_sensorLeitura'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async sensorLeituraSelectLastOption() {
    await this.sensorLeituraSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sensorLeituraSelectOption(option) {
    await this.sensorLeituraSelect.sendKeys(option);
  }

  getSensorLeituraSelect(): ElementFinder {
    return this.sensorLeituraSelect;
  }

  async getSensorLeituraSelectedOption() {
    return await this.sensorLeituraSelect.element(by.css('option:checked')).getText();
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

export class EventoBarragemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-eventoBarragem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-eventoBarragem'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
