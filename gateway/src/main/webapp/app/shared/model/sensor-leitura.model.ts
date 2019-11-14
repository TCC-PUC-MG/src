import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';
import { IBarragem } from 'app/shared/model/barragem.model';

export interface ISensorLeitura {
  id?: string;
  leitura?: string;
  eventoBarragems?: IEventoBarragem[];
  barragem?: IBarragem;
}

export class SensorLeitura implements ISensorLeitura {
  constructor(public id?: string, public leitura?: string, public eventoBarragems?: IEventoBarragem[], public barragem?: IBarragem) {}
}
