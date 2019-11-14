import { IBarragem } from 'app/shared/model/barragem.model';

export interface ISensor {
  id?: string;
  numero?: number;
  barragem?: IBarragem;
}

export class Sensor implements ISensor {
  constructor(public id?: string, public numero?: number, public barragem?: IBarragem) {}
}
