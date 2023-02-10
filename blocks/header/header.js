import {
  readBlockConfig, decorateIcons, makeLinksRelative, getRootPath, getMetadata,
} from '../../scripts/scripts.js';

const loadScript = async (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  script.async = false;
  head.append(script);
  return script;
};

/**
 * collapses all open nav sections
 * @param {Element} sections The container element
 */

function collapseAllNavSections(sections) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', 'false');
  });
}

class NedbankNavDiv extends HTMLDivElement {
  constructor(elems) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.append(...elems);
    const css = shadow.appendChild(document.createElement('link'));
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.href = '/blocks/header/global-nav.css';
  }
}

customElements.define('nedbank-nav', NedbankNavDiv, {
  extends: 'div',
});

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  let navUrl;
  const xfNav = getMetadata('nav');
  let resp;
  if (xfNav) {
    navUrl = new URL(xfNav);
    resp = await fetch(navUrl);
  } else {
    const navPath = cfg.nav || `${getRootPath()}/nav`;
    navUrl = `${navPath}.plain.html`;
    resp = await fetch(navUrl);
  }
  // load default nav
  if (resp.ok) {
    const html = await resp.text();
    if (xfNav) {
      block.closest('header').classList.add('global-nav');
      const elems = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      doc.querySelectorAll('script').forEach((script) => {
        loadScript(new URL(script.getAttribute('src'), navUrl.origin));
        elems.push(script);
      });
      doc.head.querySelectorAll('link').forEach((link) => {
        link.href = new URL(link.getAttribute('href'), navUrl.origin);
        elems.push(link);
      });

      const container = doc.body.querySelector('.container');
      elems.push(container);
      // rewrite relative to absolute links
      doc.querySelectorAll('img').forEach((img) => {
        img.src = new URL(img.getAttribute('src'), navUrl.origin);
      });
      doc.querySelectorAll('a').forEach((a) => {
        a.href = new URL(a.getAttribute('href'), navUrl.origin);
      });
      // Patch the logo
      const logo = doc.querySelector('a.navbar-brand>img');
      logo.src = `${getRootPath()}/icons/logo.svg`;
      const nav = new NedbankNavDiv(elems);
      block.append(nav);
      setInterval(() => {
        block.classList.add('appear');
      }, 2000);
    } else {
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

      // hamburger for mobile
      const hamburger = document.createElement('div');
      hamburger.classList.add('nav-hamburger');
      hamburger.innerHTML = '<div class="nav-hamburger-icon"></div>';
      hamburger.addEventListener('click', () => {
        const expanded = nav.getAttribute('aria-expanded') === 'true';
        document.body.style.overflowY = expanded ? '' : 'hidden';
        nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
      nav.prepend(hamburger);
      nav.setAttribute('aria-expanded', 'false');
      decorateIcons(nav);
      block.append(nav);
    }
  }
}
