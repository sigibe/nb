import transformRule from './formula/RuleCompiler.js';
import RuleEngine from './formula/RuleEngine.js';
import decorateForm from './decorators/customDecorator.js';
import formatFns from './formatting.js';

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

function createLabel(fd, tagName = 'label') {
  const label = document.createElement(tagName);
  if (tagName === 'label') {
    label.setAttribute('for', fd.Id);
  }
  label.className = 'field-label';
  label.textContent = fd.Label || '';
  if (fd.Tooltip) {
    label.title = fd.Tooltip;
  }
  return label;
}

function createLegend(fd) {
  return createLabel(fd, 'legend');
}

function createHelpText(fd) {
  const div = document.createElement('div');
  div.className = 'field-description';
  div.setAttribute('aria-live', 'polite');
  div.innerText = fd.Description;
  div.id = `${fd.ID}-description`;
  return div;
}

function createInput(fd) {
  const input = document.createElement('input');
  input.type = fd.Type;
  const displayFormat = fd['Display Format'];
  if (displayFormat) {
    input.dataset.displayFormat = displayFormat;
  }
  input.id = fd.Id;
  if (fd.Mandatory === 'TRUE') {
    input.setAttribute('required', 'required');
  }
  input.name = fd.Name;
  setPlaceholder(input, fd);
  setStringConstraints(input, fd);
  setNumberConstraints(input, fd);
  input.dataset.displayFormat = fd['Display Format'];
  if (fd.Description) {
    input.setAttribute('aria-describedby', `${fd.ID}-description`);
  }
  input.value = fd.Value;
  return input;
}

function createFieldWrapper(fd, tagName = 'div') {
  const fieldWrapper = document.createElement(tagName);
  fieldWrapper.append(createLabel(fd));
  const style = fd.Style ? ` form-${fd.Style}` : '';
  const nameStyle = fd.Name ? ` form-${fd.Name}` : '';
  const fieldId = `form-${fd.Type}-wrapper${style}${nameStyle}`;
  fieldWrapper.className = fieldId;
  fieldWrapper.classList.add('field-wrapper');
  fieldWrapper.dataset.hidden = fd.Hidden || 'false';
  fieldWrapper.dataset.mandatory = fd.Mandatory || 'true';
  if (fd.Group) {
    fieldWrapper.dataset.group = fd.Group;
  }
  return fieldWrapper;
}

function createButton(fd) {
  const wrapper = createFieldWrapper(fd);
  const button = document.createElement('button');
  button.textContent = fd.Label;
  button.classList.add('button');
  button.type = fd.Type;
  button.id = fd.Id;
  wrapper.replaceChildren(button);
  return wrapper;
}

function createRadio(fd) {
  const wrapper = createFieldWrapper(fd);
  wrapper.insertAdjacentElement('afterbegin', createInput(fd));
  return wrapper;
}

function createFieldset(fd) {
  const wrapper = createFieldWrapper(fd, 'fieldset');
  wrapper.name = fd.Name;
  wrapper.replaceChildren(createLegend(fd));
  return wrapper;
}

function createOutput(fd) {
  const wrapper = createFieldWrapper(fd);
  const output = document.createElement('output');
  output.name = fd.Name;
  const displayFormat = fd['Display Format'];
  if (displayFormat) {
    output.dataset.displayFormat = displayFormat;
  }
  const formatFn = formatFns[displayFormat] || formatFns.identity;
  output.innerText = formatFn(fd.Value);
  wrapper.append(output);
  return wrapper;
}

function createHidden(fd) {
  const element = document.createElement('input');
  element.type = 'hidden';
  element.id = fd.Id;
  element.name = fd.Name;
  element.value = fd.Value;
  return element;
}

function createCurrency(fd) {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(createInput({
    ...fd,
    Type: 'number',
  }));
  return wrapper;
}

function getRules(fd) {
  const entries = [
    ['Value', fd?.['Value Expression']],
    ['Hidden', fd?.['Hidden Expression']],
    ['Label', fd?.['Label Expression']],
  ];
  return entries.filter((e) => e[1]).map(([prop, expression]) => ({
    prop,
    expression,
  }));
}

function idGenerator() {
  const ids = {};
  return (name) => {
    ids[name] = ids[name] || 0;
    const idSuffix = ids[name] ? `-${ids[name]}` : '';
    ids[name] += 1;
    return `${name}${idSuffix}`;
  };
}

const fieldRenderers = {
  radio: createRadio,
  checkbox: createRadio,
  button: createButton,
  fieldset: createFieldset,
  output: createOutput,
  currency: createCurrency,
  hidden: createHidden,
};

function renderField(fd) {
  const renderer = fieldRenderers[fd.Type];
  let field;
  if (typeof renderer === 'function') {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  if (fd.Description) {
    field.append(createHelpText(fd));
  }
  return field;
}

function partitionIntoSections(acc, fd) {
  const sectionNameRegex = /^\s*---\s*(?:([^-]+)\s*---)?\s*$/;
  const matchSection = sectionNameRegex.exec(fd.Name);
  if (matchSection) {
    acc.push([matchSection[1]]);
  } else if (fd.Type === 'hidden') {
    acc[0].push(fd);
  } else {
    acc[acc.length - 1].push(fd);
  }
  return acc;
}

function updateFieldsets(fields) {
  const fieldsets = fields.filter((x) => x.tagName === 'FIELDSET');
  if (fieldsets.length) {
    const fieldsetMap = Object.fromEntries(fieldsets.map((f) => [f.name, f]));
    return fields.flatMap((f) => {
      const { group } = f.dataset;
      if (group) {
        fieldsetMap[group].append(f);
        return [];
      }
      return [f];
    });
  }
  return fields;
}

function getFragmentName(r) {
  const SHEET_NAME_REGEX = /('.{1,31}'|[\w.]{1,31}?)!([$]?[A-Z]+[$]?([0-9]+))/;
  const sheetName = r.expression.match(SHEET_NAME_REGEX)?.[1]?.replace(/^'|'$/g, '');
  return sheetName;
}

async function fetchData(url, getId) {
  const resp = await fetch(url);
  const json = await resp.json();
  return json.data.map((fd) => ({
    ...fd,
    Id: fd.Id || getId(fd.Name),
  }));
}

function extractFragments(data) {
  return new Set(data
    .map((fd) => getRules(fd))
    .filter((x) => x.length)
    .flatMap((rules) => rules.map(getFragmentName).filter((x) => x)));
}

function extractRules(data) {
  return data
    .reduce(({ fieldNameMap, formRules }, fd, index) => {
      const rules = getRules(fd);
      return {
        fieldNameMap: {
          ...fieldNameMap,
          [index + 2]: fd.Name,
        },
        formRules: rules.length ? formRules.concat([[fd.Name, getRules(fd)]]) : formRules,
      };
    }, { fieldNameMap: {}, formRules: [] });
}

async function fetchForm(formUrl, getId) {
  let url = formUrl;
  // get the main form
  const jsonData = await fetchData(url, getId);
  const fragments = [...extractFragments(jsonData)];
  const ruleData = extractRules(jsonData);
  const formData = {
    data: jsonData,
    ...ruleData,
  };

  // get the fragments
  const fragmentData = (await Promise.all(fragments.map(async (fragName) => {
    const paramName = fragName.replace(/^helix-/, '');
    url = `${formUrl}?sheet=${paramName}`;
    return [fragName, await fetchForm(url, getId)];
  }))).reduce((finalData, [fragmentName, fragment]) => {
    const { fieldNameMap, formRules: fragmentRules, data } = fragment;
    finalData.fieldNameMap[fragmentName] = fieldNameMap.$;
    finalData.formRules.push(...fragmentRules);
    finalData.data.push(...data);
    return finalData;
  }, { fieldNameMap: {}, formRules: [], data: [] });

  const fieldNameMap = {
    $: formData.fieldNameMap,
    ...fragmentData.fieldNameMap,
  };

  return {
    fieldNameMap,
    formRules: [
      ...fragmentData.formRules,
      ...formData.formRules
        // eslint-disable-next-line arrow-body-style
        .map(([fieldName, fieldRules]) => {
          return [fieldName, fieldRules.map((rule) => transformRule(rule, fieldNameMap))];
        }),
    ],
    data: [
      ...formData.data,
      ...fragmentData.data,
    ],
  };
}

function renderFields(data) {
  const [formSection, ...rest] = data.reduce(partitionIntoSections, [['form']])
    .map((section) => {
      const fields = section.slice(1).map((fd) => renderField(fd));
      return [section[0], ...updateFieldsets(fields)];
    });

  const remaining = rest.map((s) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = `form-section-wrapper ${s[0]}`;
    sectionDiv.append(...s.slice(1));
    return sectionDiv;
  });

  return [...formSection.slice(1), ...remaining];
}

async function renderForm(formUrl, formTag) {
  const getId = idGenerator();
  const { data, formRules } = await fetchForm(formUrl, getId);
  const sections = renderFields(data);
  formTag.append(...sections);
  const ruleEngine = new RuleEngine(formRules, formTag);
  ruleEngine.applyRules();
}

export default async function decorate(block) {
  const form = block.querySelector('a[href$=".json"]');
  if (form) {
    const formTag = document.createElement('form');
    // eslint-disable-next-line prefer-destructuring
    formTag.dataset.action = form.href.split('.json')[0];
    await renderForm(form.href, formTag);
    decorateForm(formTag);
    formTag.addEventListener('input', (e) => {
      const input = e.target;
      const wrapper = input.closest('.field-wrapper');
      let helpTextDiv = wrapper.querySelector('.field-description');
      input.checkValidity();
      const { valid } = input.validity;
      const invalidity = wrapper.dataset.invalid;
      if (valid === !!invalidity) {
        if (!valid) {
          if (!helpTextDiv) {
            helpTextDiv = createHelpText({ Id: e.target.id, description: '' });
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
    form.replaceWith(formTag);
  }
}
