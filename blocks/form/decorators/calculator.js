import decorateRange, { createRange } from './range.js';
import formatFns from '../formatting.js';
import decorateTooltips from './tooltip.js';
import decorateLayout from './layout.js';
import decorateFieldsets from './fieldsets.js';
import { applyRuleEngine } from '../rules/index.js';
import decorateValidations from './validations.js';
import { nameToId } from '../form.js';
import decorateSelect from './select.js';

function getSelector(fieldName) {
  let selector = fieldName;
  if (!fieldName.startsWith('.')) {
    selector = `.form-${fieldName}`;
  }
  return selector;
}

function decorateTermField(formTag) {
  const termField = formTag.querySelector('.form-term');
  if (termField) {
    const input = termField.querySelector('input');
    const label = termField.querySelector('.field-label');
    const values = Array(6).fill(1).map((x, i) => formatFns.year(i + 1));
    if (input) {
      const hiddenInput = input.cloneNode();
      hiddenInput.type = 'hidden';
      input.id = nameToId(input.name);
      label.for = input.id;
      input.min = 0;
      input.max = 6;
      input.step = 1;
      input.name += '-proxy';
      const rangeDiv = createRange(input, ['6 Months'].concat(values));
      rangeDiv.querySelector('input').addEventListener('input', (e) => {
        if (e.target.value === '0') hiddenInput.value = 0.5;
        else hiddenInput.value = e.target.value;
        const event = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        hiddenInput.dispatchEvent(event);
      });
      rangeDiv.append(hiddenInput);
      input.replaceWith(rangeDiv);
    }
  }
}

const groups = {
  'repayments-calculator': {
    Input: ['totalLoanAmount', 'term', 'insuranceOptionFieldSet'].map(getSelector).join(','),
    Output: ['.form-output-wrapper', 'exploreRate', 'rate'].map(getSelector).join(','),
    buttons: '.form-button-wrapper',
  },
  'loanconsolidate-calculator': {
    Input: ['loanFieldSet', 'extraCashFieldSet', 'term', 'insuranceOptionFieldSet'].map(getSelector).join(','),
    Output: ['totalLoanAmount, .form-output-wrapper', 'exploreRate', 'rate'].map(getSelector).join(','),
    buttons: ['summary', 'startLoanApplication'].map(getSelector),
  },
};

const fieldsets = {
  insuranceOptionFieldSet: ['insuranceOption'].map(getSelector),
  loanFieldSet: ['loanType', 'loanAmount'].map(getSelector),
  extraCashFieldSet: ['extraCashHeading', 'extraCash'].map(getSelector),
};

function decorateComponents(el) {
  decorateRange(el);
  decorateTermField(el);
  decorateTooltips(el);
  decorateSelect(el);
  /** add custom component decorater here */
}

function addListeners(formTag) {
  formTag.addEventListener('form-fieldset-item:added', (event) => {
    decorateComponents(event.detail.item);
  });

  if (formTag.id.toLowerCase() === 'loanconsolidate-calculator') { // @todo implement rules for repeatable using excel formulas
    formTag.querySelectorAll('fieldset[data-repeatable="true"]').forEach((element) => {
      ['form-fieldset-item:added', 'form-fieldset-item:removed', 'input'].forEach((eventName) => {
        element.addEventListener(eventName, () => {
          const total = formTag.querySelector('input[name=totalBorrowed]');
          const deps = Array.from(formTag.querySelectorAll('[data-name=loanAmount], [data-name=extraCash]'));
          const newValue = deps.reduce((a, c) => a + Number(c.value || 0), 0);
          if (total.value !== newValue) {
            total.value = newValue;
            total.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      });
    });
  }
}

export default async function decorateCalculator(formTag, { form, fragments }) {
  decorateFieldsets(formTag, fieldsets);
  decorateLayout(formTag, groups[formTag.id.toLowerCase()] || {});
  decorateComponents(formTag);
  decorateValidations(formTag);
  addListeners(formTag);
  applyRuleEngine(form, fragments, formTag);
}
