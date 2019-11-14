import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';

export interface ILocalidade {
  id?: string;
  nome?: string;
  latitute?: number;
  longitude?: number;
  minaExtracaos?: IMinaExtracao[];
}

export class Localidade implements ILocalidade {
  constructor(
    public id?: string,
    public nome?: string,
    public latitute?: number,
    public longitude?: number,
    public minaExtracaos?: IMinaExtracao[]
  ) {}
}
