import { IEventoRisco } from 'app/shared/model/evento-risco.model';
import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';

export interface IEventoBarragem {
  id?: string;
  eventoRiscos?: IEventoRisco[];
  sensorLeitura?: ISensorLeitura;
}

export class EventoBarragem implements IEventoBarragem {
  constructor(public id?: string, public eventoRiscos?: IEventoRisco[], public sensorLeitura?: ISensorLeitura) {}
}
