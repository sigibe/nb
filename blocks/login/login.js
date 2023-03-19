import {
  decorateIcons, makeLinksRelative, decorateButtons,
} from '../../scripts/scripts.js';

export default function decorate(block) {
  makeLinksRelative(block);
  decorateIcons(block);
  decorateButtons(block);
  const internalDivs = block.children;

  if (internalDivs && internalDivs.length === 2) {
    internalDivs[0].classList.add('login-modal-header');
    internalDivs[1].classList.add('login-modal-main');
    const overLayClose = internalDivs[0].querySelector('p');

    if (overLayClose) {
      overLayClose.addEventListener('click', () => {
        const loginEle = document.querySelector('.login-overlay');
        const mainEle = document.querySelector('body');
        loginEle.classList.remove('modal');
        mainEle.classList.remove('overflow-hidden');
      });
    }
  }
}
