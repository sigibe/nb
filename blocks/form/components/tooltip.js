function createTooltipHTML() {
  if (!document.querySelector('.field-tooltip-text')) {
    const tooltip = document.createElement('div');
    tooltip.className = 'field-tooltip-text';
    tooltip.dataset.hidden = true;
    document.body.append(tooltip);
  }
}

function renderTooltip(target, title) {
  const tooltip = document.querySelector('.field-tooltip-text');
  const targetPos = target.getBoundingClientRect();
  const tooltipPos = tooltip.getBoundingClientRect();

  let left = targetPos.left + (targetPos.width / 2) + window.scrollX - (tooltipPos.width / 2);
  let top = targetPos.top + window.scrollY - (tooltipPos.height + 10);
  let placement = 'top';

  if (left < 0) {
    placement = 'right';
    left = targetPos.left + targetPos.width + window.scrollX + 10;
    top = targetPos.top + (targetPos.height / 2) + window.scrollY - (tooltipPos.height / 2);
  }

  if (left + tooltipPos.width > document.documentElement.clientWidth) {
    placement = 'left';
    left = targetPos.left + window.scrollX - (tooltipPos.width + 10);
    top = targetPos.top + (targetPos.height / 2) + window.scrollY - (tooltipPos.height / 2);
  }

  if (top < 0) {
    placement = 'bottom';
    left = targetPos.left + (targetPos.width / 2) + window.scrollX - (tooltipPos.width / 2);
    top = targetPos.top + targetPos.height + window.scrollY + 10;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.className += ` ${placement}`;
  tooltip.innerText = title;
  tooltip.dataset.hidden = false;
}

/**
 * @param {any} state FieldJson
 * @param {string} bemBlock
 */
// eslint-disable-next-line consistent-return
const createQuestionMarkHTML = (title) => {
  const button = document.createElement('button');
  button.dataset.text = title;
  button.setAttribute('aria-label', 'Help Text');
  button.className = 'field-tooltip-icon';
  button.type = 'button';
  createTooltipHTML(title);

  button.addEventListener('mouseenter', (event) => {
    renderTooltip(event.target, title);
    event.stopPropagation();
  });

  button.addEventListener('mouseleave', (event) => {
    const tooltip = document.querySelector('.field-tooltip-text');
    tooltip.dataset.hidden = true;
    event.stopPropagation();
  });

  return button;
};

export default function decorate(block) {
  const { title } = block;
  if (title) {
    block.title = '';
    const btn = createQuestionMarkHTML(title);
    const legend = block.querySelector('legend');
    // legend is not stylable, hence replacing it with label
    if (legend) {
      const label = document.createElement('label');
      label.className = legend.className;
      label.textContent = legend.textContent;
      legend.replaceWith(label);
    }
    block.querySelector('label').after(btn);
  }
}
