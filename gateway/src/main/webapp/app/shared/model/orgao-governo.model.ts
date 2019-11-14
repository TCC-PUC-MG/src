import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';

export interface IOrgaoGoverno {
  id?: string;
  descricao?: string;
  pessoaContato?: string;
  telefone?: string;
  alertaOrgaos?: IAlertaOrgao[];
}

export class OrgaoGoverno implements IOrgaoGoverno {
  constructor(
    public id?: string,
    public descricao?: string,
    public pessoaContato?: string,
    public telefone?: string,
    public alertaOrgaos?: IAlertaOrgao[]
  ) {}
}
