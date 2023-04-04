const { SchemaValidator } = require('../dist/packages/schema-validator/src/lib/schema-validator');

const schemaValidator = new SchemaValidator();

const personSchema = {
  name: 'string',
  age: 'number',
  siblings: 'array',
  metaData: 'object',
  active: 'boolean',
};

console.log('Schema');
console.table(personSchema);

// Validates true
const personObj = {
  name: 'James',
  age: 25,
  siblings: ['Johnnathan'],
  metaData: {},
  active: true,
};

console.table(personObj);
console.log('\r\nValidates true; ', schemaValidator.validate(personSchema, personObj));

// Validates false
const personObjF = {
  name: 'James',
  age: 25,
  active: true,
};

console.table(personObjF);
console.log('\r\nValidates false: ', schemaValidator.validate(personSchema, personObjF));
