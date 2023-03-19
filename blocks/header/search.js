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
    'https://nrum.nedbank.co.za/jstag/managed/b1f2a563-4555-4443-963c-43092d459063/e43f8c8e00fa1dd3_complete.js',
    // 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/listpopup/clientlibs.min.js',
    // 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/nedbank-navigation/clientlibs.min.js',
    // 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/socialshare/clientlibs.min.js',
    // 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/videobanner/clientlibs.min.js',
    // 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/contentblock/clientlibs.min.js',
    'https://personal.nedbank.co.za/etc.clientlibs/nedbank/components/querysearch/clientlibs.min.js',
  ].forEach((item) => {
    const script = document.createElement('script');
    script.src = item;
    script.async = false;
    document.head.append(script);
  });
}

export function toggleHamburger() {
  document.getElementById('querySearchModal').classList.add('fade');
  document.querySelector('.nbd-hamburger-menu-wrapper').classList.toggle('displayHide');
  document.querySelector('.nbd-hamburger-menu-desk').classList.toggle('displayHide');
}

// eslint-disable-next-line import/prefer-default-export
export async function loadSearch() {
  const resp = await fetch('https://personal.nedbank.co.za/home.html');
  if (resp.ok) {
    appendStyles();
    appendScripts();

    const fetchedHtml = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(fetchedHtml, 'text/html');

    const querySearchModal = doc.getElementById('querySearchModal');
    querySearchModal.querySelectorAll('img').forEach((img) => {
      img.src = `https://personal.nedbank.co.za${new URL(img.src).pathname}`;
    });
    document.body.appendChild(querySearchModal);

    const hamburgerModal = doc.querySelector('.nbd-hamburger-menu-wrapper');
    document.body.appendChild(hamburgerModal);

    document.querySelector('.nbd-hamburger-close-icon').addEventListener('click', () => {
      toggleHamburger();
    });

    setTimeout(1000, () => {
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
    });
  }
}

export function toggleSearch() {
  document.getElementById('querySearchModal').classList.toggle('fade');
}
