import { element, by, ElementFinder } from 'protractor';

export class OrgaoGovernoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-orgao-governo div table .btn-danger'));
  title = element.all(by.css('jhi-orgao-governo div h2#page-heading span')).first();

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

export class OrgaoGovernoUpdatePage {
  pageTitle = element(by.id('jhi-orgao-governo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  pessoaContatoInput = element(by.id('field_pessoaContato'));
  telefoneInput = element(by.id('field_telefone'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return await this.descricaoInput.getAttribute('value');
  }

  async setPessoaContatoInput(pessoaContato) {
    await this.pessoaContatoInput.sendKeys(pessoaContato);
  }

  async getPessoaContatoInput() {
    return await this.pessoaContatoInput.getAttribute('value');
  }

  async setTelefoneInput(telefone) {
    await this.telefoneInput.sendKeys(telefone);
  }

  async getTelefoneInput() {
    return await this.telefoneInput.getAttribute('value');
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

export class OrgaoGovernoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-orgaoGoverno-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-orgaoGoverno'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
