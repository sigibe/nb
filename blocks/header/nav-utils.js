import { getMetadata } from '../../scripts/scripts.js';

const NEDBANK_HOST = 'personal.nedbank.co.za';
const REPLACE_SCRIPTS = new Map([
  ['/etc.clientlibs/clientlibs/granite/jquery/granite.min.js', {
    pathname: '/blocks/header/nb-clientlibs/scripts/granite/jquery/granite.js',
  }],
  ['/etc.clientlibs/nedbank/components/querysearch/clientlibs.min.js', {
    pathname: '/blocks/header/nb-clientlibs/scripts/querysearch/clientlibs.js',
  }],
  ['/etc.clientlibs/nedbank/components/nedbank-navigation/clientlibs.min.js', {
    pathname: '/blocks/header/nb-clientlibs/scripts/navigation/clientlibs.js',
  }],
]);
const IGNORE_SCRIPTS = new Set([
  '/etc.clientlibs/nedbank/components/socialshare/clientlibs.min.js',
  '/etc.clientlibs/nedbank/components/bankfilter/clientlibs.min.js',
]);

function cssLoaded() {
  const externalMarkup = document.getElementById('external-markup');

  if (externalMarkup) {
    externalMarkup.classList.remove('hide');
  }

  ['primary-nav', 'secondary-nav'].forEach((item) => {
    const nav = document.querySelector(item);
    const hamburger = nav.querySelector('.nav-hamburger');

    if (hamburger) {
      hamburger.classList.add('appear');
    }

    const querySearch = nav.querySelector('.nav-tools-search');
    if (querySearch) {
      querySearch.classList.add('appear');
    }
  });
}

function appendStyles() {
  [
    '/blocks/header/nb-clientlibs/styles/clientlibs-dependencies.css',
    '/blocks/header/nb-clientlibs/styles/clientlibs-base.css',
    '/blocks/header/nb-clientlibs/styles/clientlibs-site.css',
  ].forEach((item) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = item;

    if (item === '/blocks/header/nb-clientlibs/styles/clientlibs-site.css') {
      // clientlibs-site.css is the largest css, so enabling external markup on its complete loading
      style.onload = () => {
        cssLoaded();
      };
    }
    document.head.append(style);
  });
}

function appendScripts(doc) {
  const scriptItems = [...doc.querySelectorAll('script')];
  // eslint-disable-next-line arrow-body-style
  scriptItems.filter((item) => {
    return !item.src || !(IGNORE_SCRIPTS.has(new URL(item.src).pathname));
  }).forEach((item) => {
    let script = document.createElement('script');
    if (item.src) {
      const url = new URL(item.src);
      if (REPLACE_SCRIPTS.has(url.pathname)) {
        const details = REPLACE_SCRIPTS.get(url.pathname);
        url.pathname = details.pathname;
      } else if (url.host === document.location.host) {
        url.host = NEDBANK_HOST;
        url.port = '';
        url.protocol = 'https';
      }
      script.src = url.href;
      script.async = false;
    } else {
      script = item;
    }
    document.head.appendChild(script);
    item.remove();
  });
}

export function toggleHamburger() {
  document.querySelector('.nbd-hamburger-menu-wrapper').classList.toggle('displayHide');
  document.querySelectorAll('.nbd-hamburger-menu-desk').forEach((item) => {
    item.classList.toggle('displayHide');
  });

  if (window.innerWidth < 1025) {
    document.querySelector('.nbd-hamburger-menu-mob > .nbd-hm-l1-wrapper').classList.remove('displayHide');
    const desktopWrapper = document.querySelector('.nbd-navbar-desktop-wrapper');

    if (desktopWrapper) {
      const backButton = desktopWrapper.querySelector('.nbd-hamburger-menu-back');
      if (backButton) {
        backButton.style.display = 'none';
      }
      desktopWrapper.classList.toggle('displayHide');
      desktopWrapper.querySelector('.nbd-hamburger-inner-top-bar').classList.remove('displayHide');
      desktopWrapper.querySelector('.nbd-hamburger-inner-top-bar .nbd-logo').classList.remove('displayHide');
    }
    document.querySelector('.mobprimarysubitem').classList.remove('displayHide');
  } else {
    document.querySelector('.nbd-hamburger-menu-mob > .nbd-hm-l1-wrapper').classList.add('displayHide');
  }
}

export function toggleSearch() {
  if (document.getElementById('querySearchModal').style) {
    document.getElementById('querySearchModal').removeAttribute('style');
  }
  document.getElementById('querySearchModal').classList.toggle('show');
  document.getElementById('querySearchModal').classList.toggle('appear');
  document.querySelector('.login-overlay').classList.remove('modal');
  document.body.classList.remove('overflow-hidden');
  document.body.classList.toggle('overflowY-hidden');
}

function configureHamburgerLoginBtn() {
  const loginButton = document.querySelector('.nbd-hamburger-menu-wrapper .nbd-hamburger-menu-mob [data-target="#logincomp"]');
  const actualLoginButton = document.querySelector('.nav-tools-login');
  if (loginButton) {
    // this attributes adds a click handler which disables any click events
    // on this particular button. Hence removing the attribute
    loginButton.removeAttribute('data-toggle');
    loginButton.addEventListener('click', () => {
      actualLoginButton.click();
    });
  }
}

export async function loadNavTools() {
  const resp = await fetch(getMetadata('nav'));
  if (resp.ok) {
    const fetchedHtml = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(fetchedHtml, 'text/html');
    appendScripts(doc);

    doc.querySelectorAll('img').forEach((img) => {
      if (img.src) {
        img.src = `https://${NEDBANK_HOST}/${new URL(img.src).pathname}`;
      }
    });

    doc.querySelectorAll('a').forEach((a) => {
      if (a.href) {
        const { pathname } = new URL(a.href);
        // Rewrite urls except home page since its already on Franklin
        if (pathname !== '/') {
          a.href = `https://${NEDBANK_HOST}${pathname}`;
        }
      }
    });

    const externalMarkup = document.createElement('div');
    externalMarkup.id = 'external-markup';
    externalMarkup.classList.add('hide');
    document.body.appendChild(externalMarkup);

    const hamburgerModal = doc.querySelector('.nbd-hamburger-menu-wrapper');
    const hamburgerNavWrapper = doc.querySelector('.nbd-navbar-desktop-wrapper');

    if (hamburgerNavWrapper) {
      hamburgerNavWrapper.classList.add('displayHide');
      externalMarkup.appendChild(hamburgerNavWrapper);
    }

    if (hamburgerModal) {
      hamburgerModal.classList.add('displayHide');
      hamburgerModal.querySelectorAll('.nbd-hamburger-menu-desk').forEach((item) => {
        item.classList.add('displayHide');
      });

      externalMarkup.appendChild(hamburgerModal);
      document.querySelector('.nbd-hamburger-close-icon').addEventListener('click', () => {
        document.querySelector('.nav-hamburger').click();
      });
    }

    const querySearchModal = doc.querySelector('.querysearch');
    if (querySearchModal) {
      doc.getElementById('querySearchModal').style.display = 'none';
      querySearchModal.classList.add('modal-open');
      externalMarkup.appendChild(querySearchModal);
      document.querySelector('.nbd-qs-close').addEventListener('click', () => {
        document.querySelector('.nav-tools-search').click();
      });
    }

    configureHamburgerLoginBtn();

    appendStyles(doc);
  }
}

// TODO Avoiding clientlib errors for now. Eventually clientlibs logic needs to be ported.
(function avoidClientlibErrors() {
  // eslint-disable-next-line func-names
  window.debounce = function (b, g) {
    let d;
    // eslint-disable-next-line func-names
    return function () {
      const h = this;
      // eslint-disable-next-line prefer-rest-params
      const f = arguments;
      clearTimeout(d);
      d = setTimeout(() => b.apply(h, f), g);
    };
  };
}());
