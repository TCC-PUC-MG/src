import { element, by, ElementFinder } from 'protractor';

export class BarragemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-barragem div table .btn-danger'));
  title = element.all(by.css('jhi-barragem div h2#page-heading span')).first();

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

export class BarragemUpdatePage {
  pageTitle = element(by.id('jhi-barragem-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  minaExtracaoSelect = element(by.id('field_minaExtracao'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async minaExtracaoSelectLastOption() {
    await this.minaExtracaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async minaExtracaoSelectOption(option) {
    await this.minaExtracaoSelect.sendKeys(option);
  }

  getMinaExtracaoSelect(): ElementFinder {
    return this.minaExtracaoSelect;
  }

  async getMinaExtracaoSelectedOption() {
    return await this.minaExtracaoSelect.element(by.css('option:checked')).getText();
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

export class BarragemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-barragem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-barragem'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
