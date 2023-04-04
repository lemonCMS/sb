import { ValueTypesEnum } from './enums/value-types.enum';
import { ISchema } from './models/schema.interface';
import { isArray } from './utils/is-array';
import { isBoolean } from './utils/is-boolean';
import { isNumber } from './utils/is-number';
import { isObjectLiteral } from './utils/is-object-literal';
import { isObjectSameProperties } from './utils/is-object-same-properties';
import { isString } from './utils/is-string';

export class SchemaValidator {
  /** Public variables **/

  /** Private variables **/

  /** Constructor & ngOninit **/

  /** Public methods **/
  public validate<T extends ISchema, K extends Record<string, any>>(schema: T, obj: K): boolean {
    if (!isObjectSameProperties(schema, obj)) {
      return false;
    }

    const entries: [string, ValueTypesEnum][] = Object.entries(schema);

    for (let i: number = 0; i < entries.length; i++) {
      const [prop, type]: [string, ValueTypesEnum] = entries[i];
      switch (type) {
        case ValueTypesEnum.array:
          if (!isArray(obj[prop])) {
            return false;
          }
          break;
        case ValueTypesEnum.boolean:
          if (!isBoolean(obj[prop])) {
            return false;
          }
          break;
        case ValueTypesEnum.number:
          if (!isNumber(obj[prop])) {
            return false;
          }
          break;
        case ValueTypesEnum.object:
          if (!isObjectLiteral(obj[prop])) {
            return false;
          }
          break;
        case ValueTypesEnum.string:
          if (!isString(obj[prop])) {
            return false;
          }
          break;
        default:
          return false;
      }
    }

    return true;
  }

  /** Private Methods **/
}
