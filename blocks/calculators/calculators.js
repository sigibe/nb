import {
  loadBlock, buildBlock, decorateBlock, readBlockConfig,
  decorateSections, decorateBlocks, loadBlocks,
} from '../../scripts/scripts.js';

async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();
      decorateSections(main);
      decorateBlocks(main);
      await loadBlocks(main);
      return main;
    }
  }
  return null;
}

function modal() {
  const dialog = document.createElement('div');
  dialog.classList.add('modal-dialog');
  dialog.innerHTML = '<div class="modal-content"></div>';
  return dialog;
}

function makeModal(block) {
  block.classList.add('modal');
  const modalContent = [...block.children];
  block.append(modal());
  block.querySelector('.modal-content').append(...[...modalContent]);
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const { disclaimer, summary } = config;
  const divs = [...block.querySelectorAll(':scope>div')];
  const content = divs.filter((child) => child.childElementCount === 1);
  divs.filter((child) => child.childElementCount > 1).forEach((x) => x.remove());
  let summaryContent = null;
  if (summary) {
    const fragment = await loadFragment(new URL(summary).pathname);
    summaryContent = fragment.querySelector(':scope > .section');
    summaryContent.classList.add('summary-section');
    summaryContent.dataset.id = 'form-summary';
    makeModal(summaryContent);
    let modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay == null) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'modal-overlay';
      document.body.append(modalOverlay);
    }
  }
  if (summaryContent) {
    block.append(summaryContent);
  }
  const tabContent = await (Promise.all(content.map(async (tab) => {
    const tabHeading = tab.querySelector(':is(h2,h3,h4,h5,h6)');
    const { id } = tabHeading;
    const anchors = tab.querySelector('a');
    const parent = anchors.parentElement;
    const formMetadata = [['id', `${id}-form`]];
    if (summaryContent) {
      formMetadata.push(['summary', 'form-summary']);
    }
    const form = buildBlock('form', [[anchors], ...formMetadata]);
    parent.replaceWith(form);
    decorateBlock(form);
    await loadBlock(form);
    form.parentElement.classList.add('calculator');
    const disclaimerElement = document.createElement('div');
    disclaimerElement.classList.add('disclaimer');
    disclaimerElement.innerHTML = disclaimer;
    form.insertAdjacentElement('afterend', disclaimerElement);
    return [tab.children[0]];
  })));
  const tabs = buildBlock('tabs', tabContent);
  while (block.firstElementChild && block.firstElementChild.childElementCount === 0) {
    block.firstChild.remove();
  }
  block.insertAdjacentElement('afterbegin', tabs);
  block.append(summaryContent);
  decorateBlock(tabs);
  await loadBlock(tabs);
}
