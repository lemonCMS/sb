import { ValueTypesEnum } from '../enums/value-types.enum';

export interface ISchema {
  [k: string]: ValueTypesEnum;
}
