const NEDBANK_HOST = 'personal.nedbank.co.za';
const NEDBANK_HOME_PAGE = `https://${NEDBANK_HOST}/home.html`;
const EXCLUDED_SCRIPTS_PATHNAME = ['/6422e0f550a2/017d80491d7e/launch-1e8527b948f6-development.min.js'];
const REPLACE_SCRIPTS = new Map([
  ['/etc.clientlibs/clientlibs/granite/jquery/granite.min.js', {
    host: window.location.host,
    port: window.location.port,
    pathname: '/blocks/header/nb-clientlibs/scripts/granite/jquery/granite.js'
  }],
  ['/etc.clientlibs/nedbank/components/querysearch/clientlibs.min.js', {
    host: window.location.host,
    port: window.location.port,
    pathname: '/blocks/header/nb-clientlibs/scripts/querysearch/clientlibs.js'
  }]
]);

function appendStyles() {
  [
    '/blocks/header/nb-clientlibs/styles/clientlibs-base.css',
    '/blocks/header/nb-clientlibs/styles/clientlibs-site.css',
    '/blocks/header/nb-clientlibs/styles/clientlibs-dependencies.css',
  ].forEach((item) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = item;
    document.head.append(style);
  });
}

function appendScripts(doc) {
    let scriptItems = doc.querySelectorAll('script');
    for(let item of scriptItems) {
      let script = document.createElement('script');
      if (item.src) {
        const url = new URL(item.src);
        if(EXCLUDED_SCRIPTS_PATHNAME.includes(url.pathname)) {
          continue;
        } else if(REPLACE_SCRIPTS.has(url.pathname)) {
          let details = REPLACE_SCRIPTS.get(url.pathname);
          url.host = details.host;
          url.port = details.port;
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
  }
}

export function toggleHamburger() {
  document.querySelector('.nbd-hamburger-menu-wrapper').classList.toggle('displayHide');
  document.querySelectorAll('.nbd-hamburger-menu-desk').forEach((item) => {
    item.classList.toggle('displayHide');
  });
  if (window.screen.width < 1025) {
    document.querySelector('.nbd-hamburger-menu-mob > .nbd-hm-l1-wrapper').classList.remove('displayHide');
  } else {
    document.querySelector('.nbd-hamburger-menu-mob > .nbd-hm-l1-wrapper').classList.add('displayHide');
  }
}

export function toggleSearch() {
  document.getElementById('querySearchModal').classList.toggle('show');
  document.getElementById('querySearchModal').classList.toggle('appear');
  document.body.classList.toggle('overflowY-hidden');
}

export async function loadNavTools() {
  const resp = await fetch(NEDBANK_HOME_PAGE);
  if (resp.ok) {
    const fetchedHtml = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(fetchedHtml, 'text/html');
    appendStyles(doc);
    appendScripts(doc);

    doc.querySelectorAll('img').forEach((img) => {
      if (img.src) {
        img.src = `https://${NEDBANK_HOST}/${new URL(img.src).pathname}`;
      }
    });

    doc.querySelectorAll('a').forEach((a) => {
      if (a.href) {
        const { pathname } = new URL(a.href);
        // Rewrite urls except home page wince its already on Franklin
        if (!pathname.includes('/content/nedbank/za/en/personal/home')) {
          a.href = `https://${NEDBANK_HOST}${pathname}`;
        }
      }
    });

    const externalMarkup = document.createElement('div');
    externalMarkup.id = 'external-markup';
    document.body.appendChild(externalMarkup);

    const hamburgerModal = doc.querySelector('.nbd-hamburger-menu-wrapper');
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
      querySearchModal.classList.add('modal-open');
      externalMarkup.appendChild(querySearchModal);
      document.querySelector('.nbd-qs-close').addEventListener('click', () => {
        document.querySelector('.nav-tools-search').click();
      });
    }
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
