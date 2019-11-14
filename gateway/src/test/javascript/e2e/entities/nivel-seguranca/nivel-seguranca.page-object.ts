import { element, by, ElementFinder } from 'protractor';

export class NivelSegurancaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nivel-seguranca div table .btn-danger'));
  title = element.all(by.css('jhi-nivel-seguranca div h2#page-heading span')).first();

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

export class NivelSegurancaUpdatePage {
  pageTitle = element(by.id('jhi-nivel-seguranca-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nivelInput = element(by.id('field_nivel'));
  descricaoInput = element(by.id('field_descricao'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNivelInput(nivel) {
    await this.nivelInput.sendKeys(nivel);
  }

  async getNivelInput() {
    return await this.nivelInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return await this.descricaoInput.getAttribute('value');
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

export class NivelSegurancaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nivelSeguranca-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nivelSeguranca'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
