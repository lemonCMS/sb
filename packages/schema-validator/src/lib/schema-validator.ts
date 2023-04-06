import { ValueErrorsEnum } from './enums/value-errors.enum';
import { ValueTypesEnum } from './enums/value-types.enum';
import { ISchema } from './models/schema.interface';
import { isArray } from './utils/is-array';
import { isBoolean } from './utils/is-boolean';
import { isNumber } from './utils/is-number';
import { isObjectLiteral } from './utils/is-object-literal';
import { isObjectSameProperties } from './utils/is-object-same-properties';
import { isString } from './utils/is-string';

export interface IValidatorOptions {
  type: 'earlyReturnValidator' | 'messageValidator';
  __rootKey: string;
}

export class SchemaValidator {
  /** Public variables **/

  /** Private variables **/
  private readonly options: IValidatorOptions;
  private errorMessages: Record<string, ValueErrorsEnum> = {};

  /** Constructor & ngOninit **/
  public constructor(options?: Partial<IValidatorOptions>) {
    this.options = {
      type: 'earlyReturnValidator',
      __rootKey: '__root',
      ...options,
    };
  }

  /** Public methods **/
  public validate<T extends ISchema, K extends Record<string, any>>(schema: T, obj: K): boolean {
    this.resetErrorMessageStack();

    if (!isObjectSameProperties(schema, obj)) {
      if (this.isEarlyReturn()) {
        return false;
      }

      this.addErrorMessageToStack(this.options.__rootKey, ValueErrorsEnum.error_object_mismatch);
    }

    const entries: [string, ValueTypesEnum][] = Object.entries(schema);
    for (let i: number = 0; i < entries.length; i++) {
      const [prop, type]: [string, ValueTypesEnum] = entries[i];
      switch (type) {
        case ValueTypesEnum.array:
          if (!isArray(obj[prop])) {
            if (this.isEarlyReturn()) {
              return false;
            }

            this.addErrorMessageToStack(prop, ValueErrorsEnum.error_expect_array);
          }
          break;
        case ValueTypesEnum.boolean:
          if (!isBoolean(obj[prop])) {
            if (this.isEarlyReturn()) {
              return false;
            }

            this.addErrorMessageToStack(prop, ValueErrorsEnum.error_expect_boolean);
          }
          break;
        case ValueTypesEnum.number:
          if (!isNumber(obj[prop])) {
            if (this.isEarlyReturn()) {
              return false;
            }

            this.addErrorMessageToStack(prop, ValueErrorsEnum.error_expect_number);
          }
          break;
        case ValueTypesEnum.object:
          if (!isObjectLiteral(obj[prop])) {
            if (this.isEarlyReturn()) {
              return false;
            }

            this.addErrorMessageToStack(prop, ValueErrorsEnum.error_expect_object);
          }
          break;
        case ValueTypesEnum.string:
          if (!isString(obj[prop])) {
            if (this.isEarlyReturn()) {
              return false;
            }

            this.addErrorMessageToStack(prop, ValueErrorsEnum.error_expect_string);
          }
          break;
        default:
          return false;
      }
    }

    return Object.keys(this.errorMessages).length === 0;
  }

  public getErrorMessages(): Record<string, ValueErrorsEnum> {
    if (this.isEarlyReturn()) {
      throw Error('set your validator type to messageValidator to get the list of error messages.');
    }

    return this.errorMessages;
  }

  /** Private Methods **/
  private addErrorMessageToStack(key: string, error: ValueErrorsEnum): void {
    this.errorMessages[key] = error;
  }

  private resetErrorMessageStack(): void {
    this.errorMessages = {};
  }

  private isEarlyReturn(): boolean {
    return this.options.type === 'earlyReturnValidator';
  }
}
