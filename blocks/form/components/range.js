import formatNumber from '../formatting.js';

function addInlineStyle({
  min, max, value, step, format,
}, element) {
  const totalSteps = Math.ceil((max - min) / step);
  const currSteps = Math.ceil((value - min) / step);
  const formattedValue = format ? formatNumber(value, format) : value;
  const vars = {
    '--total-steps': totalSteps,
    '--current-steps': currSteps,
    '--current-value': `"${formattedValue}"`,
    '--min-value': `"${format ? formatNumber(min, format) : min}"`,
    '--max-value': `"${format ? formatNumber(max, format) : max}"`,
  };
  const style = Object.entries(vars).map(([varName, varValue]) => `${varName}:${varValue}`).join(';');
  element.setAttribute('style', style);
}

export default async function decorate(block) {
  const input = block.querySelector('input');
  const { max } = input;
  const min = input.min || 0;
  const step = input.step || 1;
  const value = input.value || 0;
  const format = block.getAttribute('data-display-format');
  const div = document.createElement('div');
  div.className = 'range-widget-wrapper';
  addInlineStyle({
    max, min, value, step, format,
  }, div);
  div.addEventListener('input', (e) => {
    // eslint-disable-next-line no-shadow
    const format = block.getAttribute('data-display-format');
    addInlineStyle({
      max, min, value: e.target.value, step, format,
    }, e.currentTarget);
  });
  const hover = document.createElement('span');
  hover.className = 'range-hover-value';
  const rangeEl = document.createElement('span');
  rangeEl.className = 'range-min-max';
  div.appendChild(hover);
  div.appendChild(input);
  div.appendChild(rangeEl);
  const label = block.querySelector('label');
  if (label) {
    label.after(div);
  } else {
    const helpText = block.querySelector('.field-description');
    if (helpText) {
      helpText.before(div);
    } else {
      block.appendChild(div);
    }
  }
}
