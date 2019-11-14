import { IBarragem } from 'app/shared/model/barragem.model';
import { ILocalidade } from 'app/shared/model/localidade.model';

export interface IMinaExtracao {
  id?: string;
  tamanho?: string;
  barragems?: IBarragem[];
  localidade?: ILocalidade;
}

export class MinaExtracao implements IMinaExtracao {
  constructor(public id?: string, public tamanho?: string, public barragems?: IBarragem[], public localidade?: ILocalidade) {}
}
