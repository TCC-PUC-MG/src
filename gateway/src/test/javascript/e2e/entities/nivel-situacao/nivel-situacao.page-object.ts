import { element, by, ElementFinder } from 'protractor';

export class NivelSituacaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nivel-situacao div table .btn-danger'));
  title = element.all(by.css('jhi-nivel-situacao div h2#page-heading span')).first();

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

export class NivelSituacaoUpdatePage {
  pageTitle = element(by.id('jhi-nivel-situacao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  nivelSegurancaSelect = element(by.id('field_nivelSeguranca'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return await this.descricaoInput.getAttribute('value');
  }

  async nivelSegurancaSelectLastOption() {
    await this.nivelSegurancaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nivelSegurancaSelectOption(option) {
    await this.nivelSegurancaSelect.sendKeys(option);
  }

  getNivelSegurancaSelect(): ElementFinder {
    return this.nivelSegurancaSelect;
  }

  async getNivelSegurancaSelectedOption() {
    return await this.nivelSegurancaSelect.element(by.css('option:checked')).getText();
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

export class NivelSituacaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nivelSituacao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nivelSituacao'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
