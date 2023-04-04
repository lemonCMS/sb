import { ValueTypesEnum } from './enums/value-types.enum';
import { ISchema } from './models/schema.interface';
import { SchemaValidator } from './schema-validator';

describe('SchemaValidator', () => {
  let schemaValidator: SchemaValidator;

  beforeEach(() => {
    schemaValidator = new SchemaValidator();
  });

  describe('validate()', () => {
    it('should return true if given object matches the schema', () => {
      const schema = {
        name: 'string',
        age: 'number',
        hobbies: 'array',
        car: 'object',
        happy: 'boolean',
      };

      const obj = {
        name: 'John',
        age: 30,
        hobbies: ['swimming', 'reading'],
        car: { type: 'citroen', model: 'c4' },
        happy: true,
      };

      expect(schemaValidator.validate(schema as ISchema, obj)).toBe(true);
    });

    it('should return true if both objects matches are empty', () => {
      const schema = {};

      const obj = {};

      expect(schemaValidator.validate(schema as ISchema, obj)).toBe(true);
    });

    it('should return false if given object does not match the schema', () => {
      const schema = {
        name: ValueTypesEnum.string,
        age: ValueTypesEnum.number,
        hobbies: ValueTypesEnum.array,
      };
      const obj = {
        name: 'John',
        age: 30,
        occupation: 'developer', // extra property that is not part of the schema
      };

      expect(schemaValidator.validate(schema, obj)).toBe(false);
    });

    it('should return false if given object has incorrect data types for properties', () => {
      const schema = {
        name: ValueTypesEnum.string,
        age: ValueTypesEnum.number,
        married: ValueTypesEnum.boolean,
      };
      const obj = {
        name: 'John',
        age: '30', // should be a number, but is a string
        married: 'true', // should be a boolean, but is a string
      };

      expect(schemaValidator.validate(schema, obj)).toBe(false);
    });

    it('should return false if given object has null for object type', () => {
      const schema = {
        name: ValueTypesEnum.string,
        age: ValueTypesEnum.number,
        car: ValueTypesEnum.object,
      };
      const obj = {
        name: 'John',
        age: '30', // should be a number, but is a string
        car: null, // should be an object, but is null
      };

      expect(schemaValidator.validate(schema, obj)).toBe(false);
    });
  });
});
