# SoftwareBastards

## Simple Schema validator

This project lets you validate api responses against a predefined schema.

The validator only returns a `boolean`. `true` when the validator passed, `false` when the validator did not pass.

## Usage

Clone this repository and install the packages with `npm install`

Import the `SchemaValidator` and `ValueTypeEnum` from the package `@bs/schema-validator`

When using typescript use `ValueTypeEnum` to define the allowed types creating the schema.

```ts
import {SchemaValidator, ValueTypeEnum} from '@bs/schema-validator';

const schemaValidator = new SchemaValidator();
const schema: Record<string, ValueTypeEnum> = {
    'name': ValueTypeEnum.string,
    'age': ValueTypeEnum.number,
    'hobbies': ValueTypeEnum.array,
    'car': ValueTypeEnum.object,
    'isHappy': ValueTypeEnum.boolean
};

const apiResponse: Record<string, any> = {
    'name': 'John Doe',
    'age': 47,
    'hobbies': ['Programming', 'Gaming'],
    'car': {brand: 'citroen', model: 'c4'},
    'isHappy': true
};


const isValid: boolean = schemaValidator.validate(schema, apiResponse); // true

`
```

# Examples

There are three examples available in the `examples` folder

- bars
- cars
- persons

To execute the examples use the following commands in the command line.

```console
foo@bar:~$ npm run bars
foo@bar:~$ npm run cars
foo@bar:~$ npm run persons
```

## Possible improvements

- Add functionality to get specific errors.
- Add option for fast check / full check.
- Add functionality to have optional / mandatory properties.
- Add deep object schema check.
- Add types enum / enumArray.
- Possible use [https://ajv.js.org/](https://ajv.js.org/) instead or build a wrapper to use that package with our custom schema.
