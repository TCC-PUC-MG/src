import { element, by, ElementFinder } from 'protractor';

export class TipoAlertaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-alerta div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-alerta div h2#page-heading span')).first();

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

export class TipoAlertaUpdatePage {
  pageTitle = element(by.id('jhi-tipo-alerta-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  ocorrenciasSelect = element(by.id('field_ocorrencias'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return await this.descricaoInput.getAttribute('value');
  }

  async ocorrenciasSelectLastOption() {
    await this.ocorrenciasSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ocorrenciasSelectOption(option) {
    await this.ocorrenciasSelect.sendKeys(option);
  }

  getOcorrenciasSelect(): ElementFinder {
    return this.ocorrenciasSelect;
  }

  async getOcorrenciasSelectedOption() {
    return await this.ocorrenciasSelect.element(by.css('option:checked')).getText();
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

export class TipoAlertaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoAlerta-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoAlerta'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
