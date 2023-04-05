const { SchemaValidator } = require('../dist/packages/schema-validator/src/lib/schema-validator');

const schemaValidator = new SchemaValidator();

const carSchema = {
  brand: 'string',
  type: 'string',
  milage: 'number',
  extras: 'array',
};

console.log('Schema');
console.table(carSchema);

// Validates true
const carObj = {
  brand: 'Mazda',
  type: 'MX5 NB 1.8',
  milage: 199999.99,
  extras: ['2001 Special Edition'],
};

console.table(carObj);
console.log('\r\nValidates true: ', schemaValidator.validate(carSchema, carObj));

// Validates false
const carObjF = {
  brand: 'BMW',
  type: '335',
  milage: '100000', // < No number
  extras: ['LCI', 'KW Coilovers'],
};

console.table(carObjF);
console.log('\r\nValidates false: ', schemaValidator.validate(carSchema, carObjF));
