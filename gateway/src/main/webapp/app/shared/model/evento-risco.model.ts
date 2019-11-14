import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';
import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';

export interface IEventoRisco {
  id?: string;
  eventosBarragem?: string;
  riscoBarragems?: IRiscoBarragem[];
  eventoBarragem?: IEventoBarragem;
}

export class EventoRisco implements IEventoRisco {
  constructor(
    public id?: string,
    public eventosBarragem?: string,
    public riscoBarragems?: IRiscoBarragem[],
    public eventoBarragem?: IEventoBarragem
  ) {}
}
