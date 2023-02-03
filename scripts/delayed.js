// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
(function gtm(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  const f = d.getElementsByTagName(s)[0];
  const j = d.createElement(s);
  const dl = l !== 'dataLayer' ? `&l=${l}` : '';
  j.async = true;
  j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
  f.parentNode.insertBefore(j, f);
}(window, document, 'script', 'dataLayer', 'GTM-JRNHH3P'));

(function adobeotm() {
  const adobeotmscript = document.createElement('script');
  adobeotmscript.setAttribute('src', 'https://assets.adobedtm.com/6422e0f550a2/017d80491d7e/launch-1e8527b948f6-development.min.js');
  document.head.append(adobeotmscript);
}());
