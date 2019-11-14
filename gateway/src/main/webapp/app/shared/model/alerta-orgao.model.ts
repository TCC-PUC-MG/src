import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';
import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';

export interface IAlertaOrgao {
  id?: string;
  alertaEnviados?: IAlertaEnviados;
  tipoAlerta?: ITipoAlerta;
  orgaoGoverna?: IOrgaoGoverno;
}

export class AlertaOrgao implements IAlertaOrgao {
  constructor(
    public id?: string,
    public alertaEnviados?: IAlertaEnviados,
    public tipoAlerta?: ITipoAlerta,
    public orgaoGoverna?: IOrgaoGoverno
  ) {}
}
