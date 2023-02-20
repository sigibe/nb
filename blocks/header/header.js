import {
  readBlockConfig, decorateIcons, makeLinksRelative, getRootPath,
} from '../../scripts/scripts.js';

/**
 * collapses all open nav sections
 * @param {Element} sections The container element
 */

function collapseAllNavSections(sections) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', 'false');
  });
}

async function loadHamburgerMenu(hamburger) {
  // fetch nav content
  const hamburgerMenuPath = `${getRootPath()}/hamburger`;
  const resp = await fetch(`${hamburgerMenuPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const hamburgerMenuWrapper = document.createElement('div');
    hamburgerMenuWrapper.classList.add('hamburger-menu-wrapper');
    hamburgerMenuWrapper.innerHTML = html;
    const hamburgerMenu = hamburgerMenuWrapper.querySelector('div');
    const closeBtn = document.createElement('a');
    closeBtn.innerHTML = '<img src="/icons/white_close.svg"></img>';
    closeBtn.addEventListener('click', (event) => {
      hamburgerMenuWrapper.classList.remove('appear');
      event.stopPropagation();
    });
    hamburgerMenu.prepend(closeBtn);
    hamburger.append(hamburgerMenuWrapper);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = cfg.nav || `${getRootPath()}/nav`;
  const resp = await fetch(`${navPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.innerHTML = html;
    decorateIcons(nav);
    makeLinksRelative(nav);

    const classes = ['brand', 'sections', 'tools'];
    classes.forEach((e, j) => {
      const section = nav.children[j];
      if (section) section.classList.add(`nav-${e}`);
    });

    const navSections = [...nav.children][1];
    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
        navSection.addEventListener('mouseover', () => {
          collapseAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', 'true');
        });

        navSection.addEventListener('mouseleave', () => {
          collapseAllNavSections(navSections);
        });
      });
    }

    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = '<div class="nav-hamburger-icon"></div>';
    hamburger.addEventListener('click', () => {
      hamburger.querySelector('.hamburger-menu-wrapper').classList.add('appear');
    });
    nav.append(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    decorateIcons(nav);
    await loadHamburgerMenu(hamburger);
    block.append(nav);
  }
}
