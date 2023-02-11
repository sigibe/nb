import decorateRange from './components/range.js';
import formatNumber from './formatting.js';
import decorateTooltip from './components/tooltip.js';

function appendChild(parent, element) {
  if (parent && element) {
    parent.appendChild(element);
  }
}

function setPlaceholder(element, fd) {
  if (fd.Placeholder) {
    element.setAttribute('placeholder', fd.Placeholder);
  }
}

function setNumberConstraints(element, fd) {
  if (fd.Max) {
    element.max = fd.Max;
  }
  if (fd.Min) {
    element.min = fd.Min;
  }
  if (fd.Step) {
    element.step = fd.Step || 1;
  }
}

function setStringConstraints(element, fd) {
  if (fd.MaxLength) {
    element.maxlength = fd.MaxLength;
  }
  if (fd.MinLength) {
    element.minlength = fd.MinLength;
  }
  if (fd.Pattern) {
    element.pattern = fd.Pattern;
  }
}

function widgetProps(element, fd) {
  element.id = fd.Id;
  if (fd.Mandatory === 'TRUE') {
    element.setAttribute('required', 'required');
  }
  element.name = fd.Name;
  setPlaceholder(element, fd);
  setStringConstraints(element, fd);
  setNumberConstraints(element, fd);
  element.dataset.displayFormat = fd['Display Format'];
  if (fd.Description) {
    element.dataset.description = fd.Description;
  }
  element.value = fd.Value;
}

function createSelect(fd) {
  const select = document.createElement('select');
  widgetProps(select, fd);
  if (fd.Placeholder) {
    const ph = document.createElement('option');
    ph.textContent = fd.Placeholder;
    ph.setAttribute('selected', '');
    ph.setAttribute('disabled', '');
    select.append(ph);
  }
  fd.Options.split(',').forEach((o) => {
    const option = document.createElement('option');
    option.textContent = o.trim();
    option.value = o.trim();
    select.append(option);
  });
  return select;
}

function constructPayload(form) {
  const payload = {};
  [...form.elements].forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });
  return payload;
}

async function submitForm(form) {
  const payload = constructPayload(form);
  const resp = await fetch(form.dataset.action, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });
  await resp.text();
  return payload;
}

function createButton(fd) {
  const button = document.createElement('button');
  button.textContent = fd.Label;
  button.classList.add('button');
  button.type = fd.Type;
  button.id = fd.Id;
  if (fd.Type === 'submit') {
    button.addEventListener('click', async (event) => {
      const form = button.closest('form');
      if (form.checkValidity()) {
        event.preventDefault();
        button.setAttribute('disabled', '');
        await submitForm(form);
        const redirectTo = fd.Extra;
        window.location.href = redirectTo;
      }
    });
  }
  return button;
}

function createHeading(fd) {
  const heading = document.createElement('h3');
  heading.textContent = fd.Label;
  return heading;
}

function createInput(fd) {
  const input = document.createElement('input');
  input.type = fd.Type;
  widgetProps(input, fd);
  return input;
}

function createOutput(fd) {
  const output = document.createElement('output');
  output.name = fd.Name;
  const displayFormat = fd['Display Format'];
  const formattedValue = displayFormat ? formatNumber(fd.Value, displayFormat) : fd.Value;
  output.textContent = formattedValue;
  return output;
}

function createTextArea(fd) {
  const input = document.createElement('textarea');
  widgetProps(input, fd);
  return input;
}

// eslint-disable-next-line consistent-return
function createLabel(fd) {
  if (fd.Label) {
    const label = document.createElement('label');
    label.setAttribute('for', fd.Id);
    label.className = 'field-label';
    label.textContent = fd.Label;
    return label;
  }
}

// eslint-disable-next-line consistent-return
function createLegend(fd) {
  if (fd.Label) {
    const label = document.createElement('legend');
    label.className = 'field-label';
    label.textContent = fd.Label;
    return label;
  }
}

function createWidget(fd) {
  switch (fd.Type) {
    case 'select':
      return createSelect(fd);
    case 'checkbox':
    case 'radio':
      return createInput(fd);
    case 'textarea':
      return createTextArea(fd);
    case 'output':
      return createOutput(fd);
    case 'range':
      return decorateRange(createInput(fd));
    default:
      return createInput(fd);
  }
}

function createHelpText(description) {
  const div = document.createElement('div');
  div.className = 'field-description';
  div.setAttribute('aria-live', 'polite');
  div.innerText = description;
  return div;
}

async function createForm(formURL) {
  const { pathname } = new URL(formURL);
  const resp = await fetch(pathname);
  const json = await resp.json();
  const form = document.createElement('form');
  const ids = {};
  function getId(name) {
    ids[name] = ids[name] || 0;
    const idSuffix = ids[name] ? `-${ids[name]}` : '';
    ids[name] += 1;
    return `${name}${idSuffix}`;
  }
  const fieldsets = {};
  let currentSection = form;
  const sectionNameRegex = /^\s*---\s*(?:([^-]+)\s*---)?\s*$/;
  // eslint-disable-next-line prefer-destructuring
  form.dataset.action = pathname.split('.json')[0];
  json.data.forEach(async (fd) => {
    const matchSection = sectionNameRegex.exec(fd.Name);
    fd.Id = fd.Id || getId(fd.Name);
    fd.Type = fd.Type || 'text';
    if (matchSection) {
      currentSection = document.createElement('div');
      currentSection.classList.add('form-section-wrapper', matchSection[1]);
      form.appendChild(currentSection);
    } else if (fd.Type === 'hidden') {
      form.append(createWidget(fd));
    } else {
      const wrapperTag = fd.Type === 'fieldset' ? 'fieldset' : 'div';
      const fieldWrapper = document.createElement(wrapperTag);
      const style = fd.Style ? ` form-${fd.Style}` : '';
      const nameStyle = fd.Name ? ` form-${fd.Name}` : '';
      const fieldId = `form-${fd.Type}-wrapper${style}${nameStyle}`;
      fieldWrapper.className = fieldId;
      fieldWrapper.classList.add('field-wrapper');
      fieldWrapper.dataset.hidden = fd.Hidden || 'false';
      fieldWrapper.dataset.mandatory = fd.Mandatory || 'true';
      fieldWrapper.title = fd.Tooltip;
      switch (fd.Type) {
        case 'heading':
          fieldWrapper.append(createHeading(fd));
          break;
        case 'button':
        case 'submit':
          fieldWrapper.append(createButton(fd));
          break;
        case 'fieldset':
          appendChild(fieldWrapper, createLegend(fd));
          fieldsets[fd.Name] = fieldWrapper;
          break;
        case 'checkbox':
        case 'radio':
          fieldWrapper.append(createWidget(fd));
          appendChild(fieldWrapper, createLabel(fd));
          break;
        default:
          appendChild(fieldWrapper, createLabel(fd));
          fieldWrapper.append(createWidget(fd));
          if (fd.Description) {
            fieldWrapper.appendChild(createHelpText(fd.Description));
          }
      }
      if (fd.Group) {
        fieldsets?.[fd.Group].append(fieldWrapper);
      } else {
        currentSection.append(fieldWrapper);
      }

      decorateTooltip(fieldWrapper);
    }
  });

  form.addEventListener('change', (e) => {
    const input = e.target;
    const wrapper = input.closest('.field-wrapper');
    let helpTextDiv = wrapper.querySelector('.field-description');
    input.checkValidity();
    const { valid } = input.validity;
    const invalidity = wrapper.dataset.invalid;
    if (valid === !!invalidity) {
      if (!valid) {
        if (!helpTextDiv) {
          helpTextDiv = createHelpText('');
        }
        input.setAttribute('aria-invalid', true);
        wrapper.setAttribute('data-invalid', true);
        helpTextDiv.innerText = input.validationMessage;
      } else if (helpTextDiv) {
        helpTextDiv.innerText = input.dataset.description || '';
        input.removeAttribute('aria-invalid');
        wrapper.removeAttribute('data-invalid');
      }
    }
  });
  return (form);
}

export default async function decorate(block) {
  const form = block.querySelector('a[href$=".json"]');
  if (form) {
    form.replaceWith(await createForm(form.href));
  }
}
