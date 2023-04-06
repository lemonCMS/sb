import { ValueErrorsEnum } from './enums/value-errors.enum';
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

    it('should throw an error when using invoking getErrorMessages()', () => {
      const validator = new SchemaValidator();
      expect(() => validator.getErrorMessages()).toThrow(
        'set your validator type to messageValidator to get the list of error messages.',
      );
    });
  });

  describe("validate('messageValidator')", () => {
    it('should return a list of error messages when using messageValidator option', () => {
      const schema = {
        name: ValueTypesEnum.string,
        age: ValueTypesEnum.number,
        isMarried: ValueTypesEnum.boolean,
        children: ValueTypesEnum.array,
        address: ValueTypesEnum.object,
      };
      const obj = {
        name: 0,
        age: '30', // this should be a number, but it's a string
        isMarried: 'yes', // this should be a boolean, but it's a string
        children: {},
        // address property is missing
      };

      const validator = new SchemaValidator({ type: 'messageValidator' });
      validator.validate(schema, obj);
      const errorMessages = validator.getErrorMessages();

      expect(errorMessages).toHaveProperty('age');
      expect(errorMessages['age']).toBe(ValueErrorsEnum.error_expect_number);

      expect(errorMessages).toHaveProperty('isMarried');
      expect(errorMessages['isMarried']).toBe(ValueErrorsEnum.error_expect_boolean);

      expect(errorMessages).toHaveProperty('children');
      expect(errorMessages['children']).toBe(ValueErrorsEnum.error_expect_array);

      expect(errorMessages).toHaveProperty('address');
      expect(errorMessages['address']).toBe(ValueErrorsEnum.error_expect_object);

      expect(errorMessages).toHaveProperty('name');
      expect(errorMessages['name']).toBe(ValueErrorsEnum.error_expect_string);
    });

    it('should return a list of error messages when using messageValidator option', () => {
      const schema = {
        name: ValueTypesEnum.string,
        age: ValueTypesEnum.number,
        isMarried: ValueTypesEnum.boolean,
        children: ValueTypesEnum.array,
        address: ValueTypesEnum.object,
      };

      const obj = {
        name: 'John',
        age: 30,
        isMarried: true,
        children: ['a', 'b'],
        address: {
          street: 'Nieuwe straat',
        },
        unknown_prop: 'oops',
      };

      const validator = new SchemaValidator({ type: 'messageValidator' });
      validator.validate(schema, obj);
      const errorMessages = validator.getErrorMessages();

      console.log(errorMessages);

      expect(errorMessages).toHaveProperty('__root');
      expect(errorMessages['__root']).toBe(ValueErrorsEnum.error_object_mismatch);
    });
  });
});
