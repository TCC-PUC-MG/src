import { element, by, ElementFinder } from 'protractor';

export class OcorrenciasComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ocorrencias div table .btn-danger'));
  title = element.all(by.css('jhi-ocorrencias div h2#page-heading span')).first();

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

export class OcorrenciasUpdatePage {
  pageTitle = element(by.id('jhi-ocorrencias-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  nivelSituacaoSelect = element(by.id('field_nivelSituacao'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return await this.descricaoInput.getAttribute('value');
  }

  async nivelSituacaoSelectLastOption() {
    await this.nivelSituacaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nivelSituacaoSelectOption(option) {
    await this.nivelSituacaoSelect.sendKeys(option);
  }

  getNivelSituacaoSelect(): ElementFinder {
    return this.nivelSituacaoSelect;
  }

  async getNivelSituacaoSelectedOption() {
    return await this.nivelSituacaoSelect.element(by.css('option:checked')).getText();
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

export class OcorrenciasDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ocorrencias-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ocorrencias'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
