import {
  decorateIcons, makeLinksRelative, getRootPath, decorateBlock,
} from '../../scripts/scripts.js';

function setCookie(name, value, timeInMillis, path) {
  const date = new Date();
  date.setTime(date.getTime() + (timeInMillis));
  const expiry = `expires=${date.toGMTString()}`;
  const cookie = `${name}=${value}; ${expiry}; path=${path}; SameSite=None; Secure`;
  document.cookie = cookie;
}

function handleCloseButtonClick() {
  const banner = document.querySelector('.banner-placeholder');
  banner.classList.add('hide');
  document.cookie = 'oldSitePopUpCookies=true';
  setCookie('oldSitePopUpCookies', true, 86400000, '/');
}

export default async function decorate(block) {
  const resp = await fetch(`${window.hlx.codeBasePath}${getRootPath()}/banner.plain.html`);

  if (resp && resp.status === 200) {
    const section = document.querySelector('.banner-placeholder.section');
    section.style['background-color'] = '#eeeeee';
    const txt = await resp.text();
    const bannerDiv = document.createElement('div');
    const bannerChildDiv = document.createElement('div');
    bannerDiv.innerHTML = txt;
    bannerDiv.append(bannerChildDiv);
    block.innerHTML = bannerDiv.innerHTML;

    makeLinksRelative(block);
    decorateBlock(block);
    decorateIcons(block);
  }

  const closeButton = block.querySelector('.icon-close');
  closeButton.addEventListener('click', handleCloseButtonClick);
}
