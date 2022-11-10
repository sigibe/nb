import { readBlockConfig, decorateIcons, decorateSections } from '../../scripts/scripts.js';

function decorateFooterLinks(footer) {
  let footerLinkGroup = [];
  const footerLinkGroups = [];
  const pattern = /h[1-9]/i;
  footer.querySelectorAll(':scope > .footer-links > div > *').forEach((item) => {
    if (item.tagName.match(pattern) && footerLinkGroup.length > 0) {
      footerLinkGroups.push(footerLinkGroup);
      footerLinkGroup = [];
    }
    footerLinkGroup.push(item);
  });
  if (footerLinkGroup.length > 0) {
    footerLinkGroups.push(footerLinkGroup);
  }
  const footerLinkGroupsDiv = document.createElement('div');
  footerLinkGroupsDiv.classList.add('footer-link-groups');
  let i = 0;
  footerLinkGroups.forEach((group) => {
    i++;
    const footerLinkGroupDiv = document.createElement('div');
    footerLinkGroupDiv.classList.add('footer-link-group');
    group.forEach((item) => {
      footerLinkGroupDiv.appendChild(item);
      if (!item.tagName.match(pattern)) {
        item.setAttribute('id', 'list'+i);
        item.setAttribute('class', 'deselect');
      }
      if (item.tagName.match(pattern )) {
        let children = item.children[0];
        children.classList.add('inactive');
        children.addEventListener('click', handleclick.bind('list'+i));
    }
    });
    footerLinkGroupsDiv.appendChild(footerLinkGroupDiv);
  });
  const parent = footer.querySelector(':scope > .footer-links > div');
  parent.innerHTML = '';
  parent.appendChild(footerLinkGroupsDiv);
}

function handleclick(event) {
    if(document.getElementById(this).classList.contains('selected')) {
      (document.getElementById(this)).classList.remove('selected');
      (document.getElementById(this)).classList.add('deselect');
    }
    else {
      (document.getElementById(this)).classList.remove('deselect');
      (document.getElementById(this)).classList.add('selected');
    }
}

function decorateFooterSocial(footer) {
  const pattern = /h[1-9]/i;
  const footerSocialDiv = document.createElement('div');
  footerSocialDiv.classList.add('footer-social-items');
  footer.querySelectorAll(':scope > .footer-social > div > *').forEach((item) => {
    if (!item.tagName.match(pattern)) {
      footerSocialDiv.appendChild(item);
    }
  });
  const parent = footer.querySelector(':scope > .footer-social > div');
  parent.appendChild(footerSocialDiv);
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
  await decorateSections(footer);
  await decorateIcons(footer);
  decorateFooterLinks(footer);
  decorateFooterSocial(footer);
  block.append(footer);
}
