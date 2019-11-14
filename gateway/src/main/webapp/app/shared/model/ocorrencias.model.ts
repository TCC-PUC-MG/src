import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';
import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';

export interface IOcorrencias {
  id?: string;
  descricao?: string;
  tipoAlertas?: ITipoAlerta[];
  nivelSituacao?: INivelSituacao;
}

export class Ocorrencias implements IOcorrencias {
  constructor(public id?: string, public descricao?: string, public tipoAlertas?: ITipoAlerta[], public nivelSituacao?: INivelSituacao) {}
}
