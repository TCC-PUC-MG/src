import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrgaoGovernoComponentsPage, OrgaoGovernoDeleteDialog, OrgaoGovernoUpdatePage } from './orgao-governo.page-object';

const expect = chai.expect;

describe('OrgaoGoverno e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orgaoGovernoComponentsPage: OrgaoGovernoComponentsPage;
  let orgaoGovernoUpdatePage: OrgaoGovernoUpdatePage;
  let orgaoGovernoDeleteDialog: OrgaoGovernoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OrgaoGovernos', async () => {
    await navBarPage.goToEntity('orgao-governo');
    orgaoGovernoComponentsPage = new OrgaoGovernoComponentsPage();
    await browser.wait(ec.visibilityOf(orgaoGovernoComponentsPage.title), 5000);
    expect(await orgaoGovernoComponentsPage.getTitle()).to.eq('Orgao Governos');
  });

  it('should load create OrgaoGoverno page', async () => {
    await orgaoGovernoComponentsPage.clickOnCreateButton();
    orgaoGovernoUpdatePage = new OrgaoGovernoUpdatePage();
    expect(await orgaoGovernoUpdatePage.getPageTitle()).to.eq('Create or edit a Orgao Governo');
    await orgaoGovernoUpdatePage.cancel();
  });

  it('should create and save OrgaoGovernos', async () => {
    const nbButtonsBeforeCreate = await orgaoGovernoComponentsPage.countDeleteButtons();

    await orgaoGovernoComponentsPage.clickOnCreateButton();
    await promise.all([
      orgaoGovernoUpdatePage.setDescricaoInput('descricao'),
      orgaoGovernoUpdatePage.setPessoaContatoInput('pessoaContato'),
      orgaoGovernoUpdatePage.setTelefoneInput('telefone')
    ]);
    expect(await orgaoGovernoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await orgaoGovernoUpdatePage.getPessoaContatoInput()).to.eq(
      'pessoaContato',
      'Expected PessoaContato value to be equals to pessoaContato'
    );
    expect(await orgaoGovernoUpdatePage.getTelefoneInput()).to.eq('telefone', 'Expected Telefone value to be equals to telefone');
    await orgaoGovernoUpdatePage.save();
    expect(await orgaoGovernoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orgaoGovernoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OrgaoGoverno', async () => {
    const nbButtonsBeforeDelete = await orgaoGovernoComponentsPage.countDeleteButtons();
    await orgaoGovernoComponentsPage.clickOnLastDeleteButton();

    orgaoGovernoDeleteDialog = new OrgaoGovernoDeleteDialog();
    expect(await orgaoGovernoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Orgao Governo?');
    await orgaoGovernoDeleteDialog.clickOnConfirmButton();

    expect(await orgaoGovernoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
