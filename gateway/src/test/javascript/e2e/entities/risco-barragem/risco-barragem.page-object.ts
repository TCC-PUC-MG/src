import { element, by, ElementFinder } from 'protractor';

export class RiscoBarragemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-risco-barragem div table .btn-danger'));
  title = element.all(by.css('jhi-risco-barragem div h2#page-heading span')).first();

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

export class RiscoBarragemUpdatePage {
  pageTitle = element(by.id('jhi-risco-barragem-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoRiscoInput = element(by.id('field_descricaoRisco'));
  grauDoRiscoInput = element(by.id('field_grauDoRisco'));
  eventoRiscoSelect = element(by.id('field_eventoRisco'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescricaoRiscoInput(descricaoRisco) {
    await this.descricaoRiscoInput.sendKeys(descricaoRisco);
  }

  async getDescricaoRiscoInput() {
    return await this.descricaoRiscoInput.getAttribute('value');
  }

  async setGrauDoRiscoInput(grauDoRisco) {
    await this.grauDoRiscoInput.sendKeys(grauDoRisco);
  }

  async getGrauDoRiscoInput() {
    return await this.grauDoRiscoInput.getAttribute('value');
  }

  async eventoRiscoSelectLastOption() {
    await this.eventoRiscoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventoRiscoSelectOption(option) {
    await this.eventoRiscoSelect.sendKeys(option);
  }

  getEventoRiscoSelect(): ElementFinder {
    return this.eventoRiscoSelect;
  }

  async getEventoRiscoSelectedOption() {
    return await this.eventoRiscoSelect.element(by.css('option:checked')).getText();
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

export class RiscoBarragemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-riscoBarragem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-riscoBarragem'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
