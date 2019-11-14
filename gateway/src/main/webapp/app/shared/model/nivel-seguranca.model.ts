import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';

export interface INivelSeguranca {
  id?: string;
  nivel?: string;
  descricao?: string;
  nivelSituacaos?: INivelSituacao[];
}

export class NivelSeguranca implements INivelSeguranca {
  constructor(public id?: string, public nivel?: string, public descricao?: string, public nivelSituacaos?: INivelSituacao[]) {}
}
