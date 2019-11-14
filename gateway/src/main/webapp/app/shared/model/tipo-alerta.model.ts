import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';
import { IOcorrencias } from 'app/shared/model/ocorrencias.model';

export interface ITipoAlerta {
  id?: string;
  descricao?: string;
  alertaOrgaos?: IAlertaOrgao[];
  ocorrencias?: IOcorrencias;
}

export class TipoAlerta implements ITipoAlerta {
  constructor(public id?: string, public descricao?: string, public alertaOrgaos?: IAlertaOrgao[], public ocorrencias?: IOcorrencias) {}
}
