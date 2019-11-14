import { element, by, ElementFinder } from 'protractor';

export class AlertaOrgaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-alerta-orgao div table .btn-danger'));
  title = element.all(by.css('jhi-alerta-orgao div h2#page-heading span')).first();

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

export class AlertaOrgaoUpdatePage {
  pageTitle = element(by.id('jhi-alerta-orgao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  alertaEnviadosSelect = element(by.id('field_alertaEnviados'));
  tipoAlertaSelect = element(by.id('field_tipoAlerta'));
  orgaoGovernaSelect = element(by.id('field_orgaoGoverna'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async alertaEnviadosSelectLastOption() {
    await this.alertaEnviadosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async alertaEnviadosSelectOption(option) {
    await this.alertaEnviadosSelect.sendKeys(option);
  }

  getAlertaEnviadosSelect(): ElementFinder {
    return this.alertaEnviadosSelect;
  }

  async getAlertaEnviadosSelectedOption() {
    return await this.alertaEnviadosSelect.element(by.css('option:checked')).getText();
  }

  async tipoAlertaSelectLastOption() {
    await this.tipoAlertaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoAlertaSelectOption(option) {
    await this.tipoAlertaSelect.sendKeys(option);
  }

  getTipoAlertaSelect(): ElementFinder {
    return this.tipoAlertaSelect;
  }

  async getTipoAlertaSelectedOption() {
    return await this.tipoAlertaSelect.element(by.css('option:checked')).getText();
  }

  async orgaoGovernaSelectLastOption() {
    await this.orgaoGovernaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orgaoGovernaSelectOption(option) {
    await this.orgaoGovernaSelect.sendKeys(option);
  }

  getOrgaoGovernaSelect(): ElementFinder {
    return this.orgaoGovernaSelect;
  }

  async getOrgaoGovernaSelectedOption() {
    return await this.orgaoGovernaSelect.element(by.css('option:checked')).getText();
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

export class AlertaOrgaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-alertaOrgao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-alertaOrgao'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
