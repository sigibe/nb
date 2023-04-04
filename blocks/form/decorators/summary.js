import formatFns from '../formatting.js';

function getFormattedValue(input) {
  const format = input.dataset.displayFormat;
  if (input.tagName === 'OUTPUT') {
    return input.value;
  }
  const formatFn = formatFns[format] || ((x) => x);
  return formatFn(input.value);
}

function handleModal(block, btn) {
  const modalOverlay = document.getElementById('modal-overlay');

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const { form } = btn;
    block.classList.add('show');
    if (modalOverlay) {
      modalOverlay.classList.add('appear');
    }
    document.body.classList.add('modal-show');
    [...block.querySelectorAll('[data-form-placeholder]')].forEach((span) => {
      const fieldName = span.getAttribute('data-form-placeholder');
      if (fieldName && form.elements[fieldName]) {
        span.innerText = getFormattedValue(form.elements[fieldName]);
      }
    });
  });

  block.addEventListener('click', () => {
    block.classList.remove('show');
    if (modalOverlay) {
      modalOverlay.classList.remove('appear');
    }
    document.body.classList.remove('modal-show');
  });
}

export default function decorateSummary(form, block) {
  [...block.querySelectorAll('em')].forEach((em) => {
    const fieldName = em.innerText.trim().match(/^\{([^}]+)\}/)?.[1];
    const el = document.createElement('span');
    el.innerText = em.innerText;
    el.setAttribute('data-form-placeholder', fieldName);
    em.replaceWith(el);
  });
  handleModal(block, form.querySelector('.form-summary button'));
}
