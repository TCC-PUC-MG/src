import { element, by, ElementFinder } from 'protractor';

export class MinaExtracaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mina-extracao div table .btn-danger'));
  title = element.all(by.css('jhi-mina-extracao div h2#page-heading span')).first();

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

export class MinaExtracaoUpdatePage {
  pageTitle = element(by.id('jhi-mina-extracao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tamanhoInput = element(by.id('field_tamanho'));
  localidadeSelect = element(by.id('field_localidade'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTamanhoInput(tamanho) {
    await this.tamanhoInput.sendKeys(tamanho);
  }

  async getTamanhoInput() {
    return await this.tamanhoInput.getAttribute('value');
  }

  async localidadeSelectLastOption() {
    await this.localidadeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async localidadeSelectOption(option) {
    await this.localidadeSelect.sendKeys(option);
  }

  getLocalidadeSelect(): ElementFinder {
    return this.localidadeSelect;
  }

  async getLocalidadeSelectedOption() {
    return await this.localidadeSelect.element(by.css('option:checked')).getText();
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

export class MinaExtracaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-minaExtracao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-minaExtracao'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
