import {
  decorateIcons, makeLinksRelative, decorateButtons, getRootPath, decorateAnchor,
} from '../../scripts/scripts.js';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export async function closeLoginModal() {
  const loginEle = document.querySelector('.login-overlay');
  const mainEle = document.querySelector('body');

  loginEle.classList.remove('fade-in');
  loginEle.classList.add('fade-out');

  /* Delaying the removal of modal class to allow the fade-out animation to complete */
  await delay(150);
  loginEle.classList.remove('modal');
  mainEle.classList.remove('overflow-hidden');
}

export async function openLoginModal() {
  const loginEle = document.querySelector('.login-overlay');
  const bodyEle = document.querySelector('body');

  loginEle.classList.add('modal');
  /* Delaying the fade-in class addition to allow the modal to be displayed */
  await delay(150);
  loginEle.classList.remove('fade-out');
  loginEle.classList.add('fade-in');
  window.scrollTo(0, 0); // Scrolling to Top

  bodyEle.classList.add('overflow-hidden');
  bodyEle.classList.remove('overflowY-hidden');
}

export default async function decorate(block) {
  const resp = await fetch(`${getRootPath()}/login.plain.html`);
  if (resp && resp.status === 200) {
    const txt = await resp.text();
    block.innerHTML = txt;

    const loginHeader = document.createElement('div');
    loginHeader.classList.add('login-header');
    const overLayClose = block.querySelector('div p');
    loginHeader.appendChild(overLayClose);

    const loginMain = block.querySelector('.login-main');
    const loginParent = block.querySelector('div');
    loginParent.insertBefore(loginHeader, loginMain);

    if (overLayClose) {
      overLayClose.addEventListener('click', () => {
        closeLoginModal();
      });
    }

    makeLinksRelative(block);
    decorateIcons(block);
    decorateButtons(block);
    decorateAnchor(block, 'header'); // Sending header as type to remain in sync with actual site
  }
}
