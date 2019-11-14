import { ISensor } from 'app/shared/model/sensor.model';
import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';
import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';

export interface IBarragem {
  id?: string;
  sensors?: ISensor[];
  sensorLeituras?: ISensorLeitura[];
  minaExtracao?: IMinaExtracao;
}

export class Barragem implements IBarragem {
  constructor(
    public id?: string,
    public sensors?: ISensor[],
    public sensorLeituras?: ISensorLeitura[],
    public minaExtracao?: IMinaExtracao
  ) {}
}
