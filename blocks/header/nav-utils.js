function appendStyles() {
  [
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/clientlibs/clientlib-dependencies.min.css',
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/clientlibs/clientlib-base.min.css',
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/clientlibs/clientlib-site.min.css',
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/promotioncards/clientlibs.min.css',
  ].forEach((item) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = item;
    document.head.append(style);
  });
}

function appendScripts() {
  [
    'https://personal.nedbank.co.za/etc.clientlibs/clientlibs/granite/jquery.min.js',
    'https://personal.nedbank.co.za/etc.clientlibs/clientlibs/granite/utils.min.js',
    'https://personal.nedbank.co.za/etc.clientlibs/clientlibs/granite/jquery/granite.min.js',
    'https://personal.nedbank.co.za/etc.clientlibs/foundation/clientlibs/jquery.min.js',
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/nedbank-navigation/clientlibs.min.js',
  ].forEach((item) => {
    const script = document.createElement('script');
    script.src = item;
    script.async = false;
    document.head.append(script);
  });
}

export function toggleHamburger() {
  document.querySelector('.nbd-hamburger-menu-wrapper').classList.toggle('displayHide');
  document.querySelectorAll('.nbd-hamburger-menu-desk').forEach((item) => {
    item.classList.toggle('displayHide');
  });
}

export async function loadNavTools() {
  const resp = await fetch('https://personal.nedbank.co.za/home.html');
  if (resp.ok) {
    appendStyles();
    appendScripts();

    const fetchedHtml = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(fetchedHtml, 'text/html');

    doc.querySelectorAll('img').forEach((img) => {
      if (img.src) {
        img.src = `https://personal.nedbank.co.za${new URL(img.src).pathname}`;
      }
    });

    doc.querySelectorAll('a').forEach((a) => {
      if (a.href) {
        a.href = `https://personal.nedbank.co.za${new URL(a.href).pathname}`;
      }
    });

    const hamburgerModal = doc.querySelector('.nbd-hamburger-menu-wrapper');
    hamburgerModal.classList.add('displayHide');
    hamburgerModal.querySelectorAll('.nbd-hamburger-menu-desk').forEach((item) => {
      item.classList.add('displayHide');
    });
    document.body.appendChild(hamburgerModal);

    document.querySelector('.nbd-hamburger-close-icon').addEventListener('click', () => {
      document.querySelector('.nav-hamburger').click();
    });
  }
}
