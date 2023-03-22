import decorateRange from './range.js';
import decorateTooltips from './tooltip.js';
import decorateLayout from './layout.js';
import decorateFieldsets from './fieldsets.js';
import decorateValidations from './validations.js';
import decorateTermField from './term.js';

function getSelector(fieldName) {
  let selector = fieldName;
  if (!fieldName.startsWith('.')) {
    selector = `.form-${fieldName}`;
  }
  return selector;
}

const groups = {
  Input: ['totalLoanAmount', 'term', 'insuranceOptionFieldSet'].map(getSelector).join(','),
  Output: ['.form-output-wrapper', 'exploreRate', 'rate'].map(getSelector).join(','),
  buttons: '.form-button-wrapper',
};

const fieldsets = {
  insuranceOptionFieldSet: ['insuranceOption'].map(getSelector),
};

export default async function decorateRepaymentsCalculator(form) {
  /** add custom tooltips */
  decorateTooltips(form);

  form.querySelectorAll('.form-range-wrapper').forEach((block) => {
    decorateRange(block);
  });

  const termField = form.querySelector('.form-term input');
  decorateTermField(termField);

  decorateFieldsets(form, fieldsets);

  decorateLayout(form, groups);

  decorateValidations(form);
}
