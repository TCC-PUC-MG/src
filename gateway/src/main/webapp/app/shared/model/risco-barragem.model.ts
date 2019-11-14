import { IEventoRisco } from 'app/shared/model/evento-risco.model';

export interface IRiscoBarragem {
  id?: string;
  descricaoRisco?: string;
  grauDoRisco?: number;
  eventoRisco?: IEventoRisco;
}

export class RiscoBarragem implements IRiscoBarragem {
  constructor(public id?: string, public descricaoRisco?: string, public grauDoRisco?: number, public eventoRisco?: IEventoRisco) {}
}
