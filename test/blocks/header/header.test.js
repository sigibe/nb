/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: '../../scripts/dummy.html' });

const { buildBlock, decorateBlock, loadBlock } = await import('../../../scripts/scripts.js');

document.body.innerHTML = await readFile({ path: '../../scripts/body.html' });

const sleep = async (time = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time);
});

const headerBlock = buildBlock('header', [['Nav', '/test/blocks/header/nav']]);
document.querySelector('header').append(headerBlock);
decorateBlock(headerBlock);
await loadBlock(headerBlock);
await sleep();

describe('Header block', () => {
  it('Hamburger shows and hides nav', async () => {
    const hamburger = document.querySelector('.header .nav-hamburger');
    const nav = document.querySelector('.header nav');
    expect(hamburger).to.exist;
    expect(nav).to.exist;
  });

  it('Secondary Nav Aria Expanded False', async () => {
    const secNav = document.querySelector('.header secondary-nav');
    expect(secNav).to.exist;
    expect(secNav.getAttribute('aria-expanded')).to.equal('false');
  });
});
