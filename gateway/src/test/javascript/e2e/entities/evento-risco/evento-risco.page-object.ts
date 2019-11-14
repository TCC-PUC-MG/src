import { element, by, ElementFinder } from 'protractor';

export class EventoRiscoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-evento-risco div table .btn-danger'));
  title = element.all(by.css('jhi-evento-risco div h2#page-heading span')).first();

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

export class EventoRiscoUpdatePage {
  pageTitle = element(by.id('jhi-evento-risco-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  eventosBarragemInput = element(by.id('field_eventosBarragem'));
  eventoBarragemSelect = element(by.id('field_eventoBarragem'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setEventosBarragemInput(eventosBarragem) {
    await this.eventosBarragemInput.sendKeys(eventosBarragem);
  }

  async getEventosBarragemInput() {
    return await this.eventosBarragemInput.getAttribute('value');
  }

  async eventoBarragemSelectLastOption() {
    await this.eventoBarragemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventoBarragemSelectOption(option) {
    await this.eventoBarragemSelect.sendKeys(option);
  }

  getEventoBarragemSelect(): ElementFinder {
    return this.eventoBarragemSelect;
  }

  async getEventoBarragemSelectedOption() {
    return await this.eventoBarragemSelect.element(by.css('option:checked')).getText();
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

export class EventoRiscoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-eventoRisco-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-eventoRisco'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
