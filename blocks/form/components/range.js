import formatNumber from '../formatting.js';

function addInlineStyle(input, element) {
  const min = input.min || 0;
  const max = input.max || 0;
  const step = input.step || 1;
  const value = input.value || 0;
  const format = input.dataset.displayFormat;
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

export default function styleRangeWidget(input) {
  const div = document.createElement('div');
  div.className = 'range-widget-wrapper';
  addInlineStyle(input, div);

  input.addEventListener('change', (e) => {
    addInlineStyle(e.target, div);
  });

  const hover = document.createElement('span');
  hover.className = 'range-hover-value';
  const rangeEl = document.createElement('span');
  rangeEl.className = 'range-min-max';

  div.appendChild(hover);
  div.appendChild(input);
  div.appendChild(rangeEl);
  return div;
}
