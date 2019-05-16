const mapValues = require('lodash').mapValues;

const parseValidationErrors = (errors) => {
  const result = mapValues(errors.errors, value => value.message);

  return {
    errors: result
  }
};

module.exports.parseValidationErrors = parseValidationErrors;
