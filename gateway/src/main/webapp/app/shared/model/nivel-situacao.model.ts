import { IOcorrencias } from 'app/shared/model/ocorrencias.model';
import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

export interface INivelSituacao {
  id?: string;
  descricao?: string;
  ocorrencias?: IOcorrencias[];
  nivelSeguranca?: INivelSeguranca;
}

export class NivelSituacao implements INivelSituacao {
  constructor(
    public id?: string,
    public descricao?: string,
    public ocorrencias?: IOcorrencias[],
    public nivelSeguranca?: INivelSeguranca
  ) {}
}
