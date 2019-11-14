import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';

export interface IAlertaEnviados {
  id?: string;
  alertaOrgaos?: IAlertaOrgao;
}

export class AlertaEnviados implements IAlertaEnviados {
  constructor(public id?: string, public alertaOrgaos?: IAlertaOrgao) {}
}
