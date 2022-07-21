import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';

const ICON_TARGETS = {
  'back-to-top': '#',
  'facebook': 'https://www.facebook.com/Nedbank',
  'linkedin': 'https://www.linkedin.com/company/nedbank',
  'instagram': 'https://www.instagram.com/nedbank',
  'youtube': 'https://www.youtube.com/user/nedbank',
  'twitter': 'https://twitter.com/Nedbank'
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  await decorateIcons(footer);
  Object.entries(ICON_TARGETS)
    .map(([icon, target]) => [footer.querySelector('span.icon-' + icon), target])
    .filter(([element]) => !!element)
    .forEach(([element, target]) => {
      const a = document.createElement('a');
      a.href = target;
      element.after(a);
      a.append(element);
    });
  block.append(footer);
}


// var element = document.querySelector('td');
// console.log(element.closest('div'));



/* export default function decorate(block) {
  Array.from(block.querySelectorAll('h3')).forEach((h3, i) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'callapsible';
    radio.id = `h${i}`;
    h3.after(radio);
    const label = document.createElement('label');
    label.htmlFor = radio.id;
    label.append(h3);
    radio.after(label);
  });
  document.getElementById('h0').checked = true;
}*/
