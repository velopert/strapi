'use strict';

const { prop, getOr, difference } = require('lodash/fp');
const { isRelationalAttribute } = require('strapi-utils').contentTypes;

const isLocalized = modelOrAttribute => {
  return prop('pluginOptions.i18n.localized', modelOrAttribute) === true;
};

const getNonLocalizedFields = model => {
  return Object.keys(getOr({}, 'attributes', model)).filter(attributeName => {
    const attribute = model.attributes[attributeName];
    return !isLocalized(attribute) && !isRelationalAttribute(attribute);
  });
};

const getLocalizedFields = model => {
  const nonLocalizedFields = getNonLocalizedFields(model);
  return difference(Object.keys(getOr({}, 'attributes', model)), nonLocalizedFields);
};

module.exports = {
  isLocalized,
  getNonLocalizedFields,
  getLocalizedFields,
};
