const { SchemaValidator } = require('../dist/packages/schema-validator/src/lib/schema-validator');

const schemaValidator = new SchemaValidator();

const barSchema = {
  name: 'string',
  address: 'string',
  drinks: 'object',
};

console.log('Schema');
console.table(barSchema);

// Validates true
const barObj = {
  name: 'Jimmys drinks',
  address: 'Somewhere over the rainbow',
  drinks: {
    beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
  },
};

console.table(barObj);
console.log('\r\nValidates true: ', schemaValidator.validate(barSchema, barObj));

// Validates false
const barObjF = {
  name: 'Sjonnies',
  address: 'Centrum 001',
  drinks: [
    // < No object
    'Heineken',
  ],
};

console.table(barObjF);
console.log('\r\nValidates false: ', schemaValidator.validate(barSchema, barObjF));
