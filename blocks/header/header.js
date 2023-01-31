import {
  readBlockConfig, decorateIcons, makeLinksRelative, getRootPath, getMetadata,
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

window.login = function login() {
  document.getElementById('nblogin').close();
  localStorage.setItem('nbuser', document.getElementById('nbuser').value);
  localStorage.setItem('nbpswd', document.getElementById('nbpswd').value);
  decorate(document.querySelector('div.header.block'));
  console.log('login');
};

class NedbankNavDiv extends HTMLDivElement {
  constructor(elems) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.append(...elems);
    const css = shadow.appendChild(document.createElement('link'));
    css.rel = 'stylesheet';
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
    const nbuser = localStorage.getItem('nbuser');
    const nbpswd = localStorage.getItem('nbpswd');
    if (nbuser != null && nbpswd != null) {
      resp = await fetch(navUrl, {
        headers: {
          Authorization: `Basic ${btoa(`${nbuser}:${nbpswd}`)}`,
        },
      });
    } else {
      resp = await fetch(navUrl);
    }
  } else {
    const navPath = cfg.nav || `${getRootPath()}/nav`;
    navUrl = `${navPath}.plain.html`;
    resp = await fetch(navUrl);
  }
  // load default nav

  if (xfNav && !resp.ok) {
    const loginDlg = document.createElement('dialog');
    loginDlg.setAttribute('id', 'nblogin');
    loginDlg.innerHTML = '<div>'
      + '<label>User</label><input id="nbuser" type="text"/>'
      + '<label>Password</label><input id="nbpswd" type="pasword"/>'
      + '<button onclick="login()">Submit</button>'
      + '</div>';
    document.getElementsByTagName('BODY')[0].prepend(loginDlg);
    loginDlg.show();
  }
  if (resp.ok) {
    const html = await resp.text();
    if (xfNav) {
      block.closest('header').classList.add('global-nav');
      const elems = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const container = doc.body.querySelector('.container');
      elems.push(container);
      // rewrite relative to absolute links
      doc.querySelectorAll('img').forEach((img) => {
        img.src = new URL(img.getAttribute('src'), navUrl.origin);
      });
      doc.querySelectorAll('a').forEach((a) => {
        a.href = new URL(a.getAttribute('href'), navUrl.origin);
      });
      doc.querySelectorAll('script').forEach((script) => {
        script.src = new URL(script.getAttribute('src'), navUrl.origin);
        elems.push(script);
      });
      doc.head.querySelectorAll('link').forEach((link) => {
        link.href = new URL(link.getAttribute('href'), navUrl.origin);
        elems.push(link);
      });
      const nav = new NedbankNavDiv(elems);
      block.append(nav);
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
