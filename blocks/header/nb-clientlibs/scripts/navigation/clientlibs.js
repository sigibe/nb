/* eslint-disable */
$(document).ready(() => {
  const g = $('.nav-item');
  const l = $('.nav-link');
  const p = $('.dropdown-menu');
  $('.nbd-hamburger-menu-btn').click(() => {
    $('html, body').animate({
      scrollTop: 0,
    });
    $('.modal-backdrop.show').hide();
    $('.nbd-listpopup-container .modal.show').hide();
    $('.navbar.navbar-expand-lg').addClass('displayHide');
    $('.nbd-hamburger-menu-wrapper').removeClass('displayHide');
    $('.nbd-hamburger-menu-desk').removeClass('displayHide');
  });
  $('.nbd-hamburger-menu-desk .nbd-hamburger-close-icon').click(() => {
    $('.nbd-hamburger-menu-back a').click();
    resetMenu();
    $('.navbar.navbar-expand-lg').removeClass('displayHide');
    $('.nbd-hamburger-menu-wrapper').addClass('displayHide');
    $('.nbd-hamburger-menu-desk').addClass('displayHide');
  });
  $('.nbd-hamburger-menu-btn,.nbd-hamburger-icon').click(() => {
    $('div[id*\x3d"NBD_"]').addClass('d-none');
    $('#NBD_NEDBANK-NAVIGATION_1').removeClass('d-none');
    $('.responsivegrid,.experiencefragment').removeClass('d-none');
    $('.nbd-alert-pop,.cookiealert').addClass('d-none');
  });
  $('.nbd-hamburger-close-icon,.nbd-hamburger-close-icon').click(() => {
    $('div[id*\x3d"NBD_"]').removeClass('d-none');
    $('.nbd-alert-pop,.cookiealert').removeClass('d-none');
  });
  $('.menu-item').click(function () {
    const g = $('.menu-item.selectedMenu').index();
    const k = $($('.menu-item')[g]).attr('data-menuLayerOne');
    $(`div [data-menuLayerOneChild\x3d"${k}"]`).removeClass('nbd-fadeInUp').removeClass('nbd-fadeInDown-two');
    const l = $(this).index();
    const p = l > g ? 'nbd-fadeInUp' : 'nbd-fadeInDown-two';
    const z = l > g ? 'nbd-fadeOutUp' : 'nbd-fadeOutDown';
    $('.menu-item').removeClass('selectedMenu');
    $(this).addClass('selectedMenu');
    l != g && fnDisplayLevelTwoMenu($(this).attr('data-menuLayerOne'), p, k, z);
  });
  $('.nbd-first_level_side_menu .nbd-menu-green-card').click(function () {
    if (flag = $(this).find('.card-body a').hasClass('stretched-link') ? !1 : !0) {
      const g = $(this).data('menulayeroneinnerchild');
      const k = $(this).parent().parent().data('menulayeronechild');
      $('.nbd-hamburger-menu-levelOne').addClass('displayHide');
      $('.nbd-first_level_side_menu').removeClass('nbd-fadeOutUp').removeClass('nbd-fadeOutDown').removeClass('nbd-fadeInDown-two')
        .removeClass('nbd-fadeInUp');
      $(`div [data-menulayertwoparent\x3d"${k}"], div [data-menulayertwochild\x3d"${g}"]`).removeClass('displayHide');
    }
  });
  $('.nbd-hamburger-menu-back a').click(() => {
    $('.nbd-hamburger-menu-level-two, .nbd-hamburger-menu-levelTwo').addClass('displayHide');
    $('.nbd-hamburger-menu-levelOne').removeClass('displayHide');
  });
  const k = $(window).height();
  $('.nbd-hm-l3-multi-link').hover(function () {
    scrolY = $(window).scrollTop();
    let g = $(this).offset().top;
    const l = $(this).find('.nbd-hm-l4-link').length;
    g - scrolY + 40 * l > k && (g = g - scrolY + 40 * (l + 1) - k,
      $(this).find('.nbd-hm-level-four-links').css('top', `${-g}px`));
  });
});
function fnDisplayLevelTwoMenu(g, l, p, k) {
  l = void 0 === l ? '' : l;
  p = void 0 === p ? '' : p;
  k = void 0 === k ? '' : k;
  $(`div [data-menuLayerOneChild\x3d"${p}"]`).addClass(k);
  setTimeout(() => {
    $(`div [data-menuLayerOneChild\x3d"${g}"]`).removeClass('displayHide').addClass(l);
    $(`div [data-menuLayerOneChild\x3d"${p}"]`).addClass('displayHide').removeClass(k);
  }, 400);
}
function resetMenu() {
  $('.menu-item').removeClass('selectedMenu');
  $('.menu-item:nth(0)').addClass('selectedMenu');
  $('.nbd-first_level_side_menu').addClass('displayHide');
  $('.nbd-first_level_side_menu:nth(0)').removeClass('displayHide');
}
let layerArr = [];
$(document).ready(() => {
  $(() => {
    // const g = $('.nbd-hamburger-menu-mob .nbd-hamburger-top-bar').offset().top;
    // $(window).scroll(function () {
    //   this.matchMedia('(max-width: 992px)').matches && $('.nbd-hamburger-inner-top-bar').hasClass('displayHide') && ($(window).scrollTop() > g ? ($('.nbd-hamburger-menu-mob .nbd-hamburger-top-bar').css({
    //     position: 'fixed',
    //     top: '0px',
    //   }),
    //     $('#stickyaliasMob').css('display', 'block')) : ($('.nbd-hamburger-menu-mob .nbd-hamburger-top-bar').css({
    //       position: 'static',
    //       top: '0px',
    //     }),
    //       $('#stickyaliasMob').css('display', 'none')));
    // });
  });
  $('.nbd-hamburger-menu-mob .mobprimarysubitem .nav-link').each(function () {
    $(this).click(function () {
      const g = $(this).attr('data-target');
      $(g).closest('.listpopup').removeClass('d-none');
      $(g).closest('.querysearch').removeClass('d-none');
    });
  });
  $('.nbd-hamburger-close-icon').click(() => {
    $('#stickyaliasMob').removeClass('d-none');
    $('#stickyalias').removeClass('d-none');
  });
  $('.nbd-hamburger-menu-btn').click(() => {
    $('#stickyalias').addClass('d-none');
  });
  $('.nbd-hamburger-menu-mob .nbd-hamburger-icon').click(() => {
    $('html, body').animate({
      scrollTop: 0,
    });
    $('#stickyaliasMob').addClass('d-none');
    $('.nbd-hm-l1-wrapper').hasClass('displayHide') ? ($('.nbd-hm-l1-wrapper').removeClass('displayHide'),
      $('.mobprimarysubitem').removeClass('displayHide'),
      $('.navbar.navbar-expand-lg').addClass('displayHide'),
      $('.nbd-hamburger-menu-wrapper').removeClass('displayHide'),
      $('.nbd-hamburger-top-bar').addClass('displayHide'),
      $('.nbd-hamburger-inner-top-bar').removeClass('displayHide'),
      $('.nbd-hamburger-inner-top-bar .nbd-logo').removeClass('displayHide'),
      $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'none')) : ($('.nbd-hm-l1-wrapper').addClass('displayHide'),
        $('.mobprimarysubitem').addClass('displayHide'),
        $('.navbar.navbar-expand-lg').removeClass('displayHide'),
        $('.nbd-hamburger-menu-wrapper').addClass('displayHide'),
        $('.nbd-hamburger-top-bar').removeClass('displayHide'),
        $('.nbd-hamburger-inner-top-bar').addClass('displayHide'),
        $('.nbd-hamburger-inner-top-bar .nbd-logo').removeClass('displayHide'),
        $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'flex'));
  });
  $('.nbd-hamburger-menu-mob .nbd-hm-l1-link').click(function () {
    const g = $(this).data('menulayeronemb');
    layerArr.push({
      key: 'menuLayerOneChildMb',
      value: g,
    });
    $('.nbd-hm-l1-wrapper').addClass('displayHide');
    $('.mobprimarysubitem').addClass('displayHide');
    $('.nbd-hm-l2-wrapper').addClass('displayHide');
    $('.nbd-hamburger-top-bar').addClass('displayHide');
    $('.nbd-hamburger-inner-top-bar').removeClass('displayHide');
    $('.nbd-hamburger-inner-top-bar .nbd-logo').addClass('displayHide');
    $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'flex');
    $(`ul[data-menuLayerOneChildMb\x3d"${g}"]`).removeClass('displayHide');
  });
  $(document).on('click', '.nbd-hamburger-menu-mob .nbd-hamburger-menu-back', () => {
    if (layerArr.length > 1) {
      const g = layerArr.pop();
      $(`ul[data-${g.key}\x3d"${g.value}"]`).addClass('displayHide');
      $(`ul[data-${layerArr[layerArr.length - 1].key}\x3d"${layerArr[layerArr.length - 1].value}"]`).removeClass('displayHide');
    } else {
      layerArr = [],
        $('.nbd-hamburger-inner-top-bar').removeClass('displayHide'),
        $('.nbd-hamburger-inner-top-bar .nbd-logo').removeClass('displayHide'),
        $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'none'),
        $('.nbd-hm-l1-wrapper').removeClass('displayHide'),
        $('.mobprimarysubitem').removeClass('displayHide'),
        $('.nbd-hm-l2-wrapper').addClass('displayHide');
    }
  });
  $('.nbd-hamburger-menu-mob .nbd-hamburger-close-icon').click(() => {
    $('.nbd-hm-l1-wrapper').addClass('displayHide');
    $('.mobprimarysubitem').addClass('displayHide');
    $('.nbd-hm-l2-wrapper').addClass('displayHide');
    $('.nbd-hm-l3-wrapper').addClass('displayHide');
    $('.nbd-hm-l4-wrapper').addClass('displayHide');
    $('.nbd-hamburger-top-bar').removeClass('displayHide');
    $('.nbd-hamburger-inner-top-bar').addClass('displayHide');
    $('.nbd-hamburger-menu-wrapper').addClass('displayHide');
  });
  $('.nbd-hamburger-menu-mob .nbd-hm-l2-link').click(function () {
    if ($(this).hasClass('redirect-link')) { window.location.href = $(this).children('a').attr('href'); } else {
      const g = $(this).data('menulayertwoone');
      layerArr.push({
        key: 'menuLayerTwoChildMb',
        value: g,
      });
      $('.nbd-hm-l1-wrapper').addClass('displayHide');
      $('.mobprimarysubitem').addClass('displayHide');
      $('.nbd-hm-l2-wrapper').addClass('displayHide');
      $('.nbd-hamburger-top-bar').addClass('displayHide');
      $('.nbd-hamburger-inner-top-bar').removeClass('displayHide');
      $('.nbd-hamburger-inner-top-bar .nbd-logo').addClass('displayHide');
      $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'flex');
      $(`ul[data-menuLayerTwoChildMb\x3d"${g}"]`).removeClass('displayHide');
    }
  });
  $('.nbd-hamburger-menu-mob .nbd-hm-l3-link').click(function () {
    if ($(this).hasClass('redirect-link')) { window.location.href = $(this).children('a').attr('href'); } else {
      const g = $(this).data('menulayertwotwo');
      layerArr.push({
        key: 'menuLayerThreeChildMb',
        value: g,
      });
      $('.nbd-hm-l1-wrapper').addClass('displayHide');
      $('.mobprimarysubitem').addClass('displayHide');
      $('.nbd-hm-l2-wrapper').addClass('displayHide');
      $('.nbd-hm-l3-wrapper').addClass('displayHide');
      $('.nbd-hamburger-top-bar').addClass('displayHide');
      $('.nbd-hamburger-inner-top-bar').removeClass('displayHide');
      $('.nbd-hamburger-inner-top-bar .nbd-logo').addClass('displayHide');
      $('.nbd-hamburger-inner-top-bar .nbd-hamburger-menu-back').css('display', 'flex');
      $(`ul[data-menuLayerThreeChildMb\x3d"${g}"]`).removeClass('displayHide');
    }
  });
  $('.nbd-hamburger-menu-mob .nbd-hm-l4-link').click(function () {
    $(this).hasClass('redirect-link') && (window.location.href = $(this).children('a').attr('href'));
  });
  $('.login-link').click(() => {
    $('.nbd-hamburger-icon').click();
    $('li[data-menulayeronemb\x3d"login"]').click();
  });
});
$(document).ready(() => {
  function g(g, k, l) {
    const m = new Date();
    m.setTime(m.getTime() + 864E5 * l);
    l = `expires\x3d${m.toUTCString()}`;
    document.cookie = `${g}\x3d${k};${l};path\x3d/`;
  }
  function l(g) {
    g += '\x3d';
    for (let k = decodeURIComponent(document.cookie).split(';'), l = 0; l < k.length; l++) {
      for (var m = k[l]; m.charAt(0) === ' ';) { m = m.substring(1); }
      if (m.indexOf(g) === 0) { return m.substring(g.length, m.length); }
    }
    return '';
  }
  const p = document.querySelector('.cookiealert');
  let k = document.querySelector('.acceptcookies');
  const r = document.querySelector('#takeMeToOldSite');
  const u = document.querySelector('.nbd-alert-pop');
  // const w = document.getElementById('domainName').value;
  localStorage.getItem('secondaryNavItemSelected');
  // const v = $('.nbd-navbar-desktop-wrapper .secondarynav').offset().top;
  // $('.modal-backdrop.show').css('top', '0');
  // const z = function () {
  //   $(window).scrollTop() > v ? ($('.nbd-navbar-desktop-wrapper .secondarynav').addClass('sticky'),
  //     $('.nbd-hamburger-menu-btn').addClass('sticky'),
  //     $('.stickymenuitem').addClass('sticky')) : ($('.nbd-navbar-desktop-wrapper .secondarynav').removeClass('sticky'),
  //       $('.nbd-hamburger-menu-btn').removeClass('sticky'),
  //       $('.stickymenuitem').removeClass('sticky'));
  // };
  // z();
  // $(window).scroll(() => {
  //   z();
  // });
  p && (p.offsetHeight,
    l('acceptCookies') || p.classList.add('show'),
    k.addEventListener('click', () => {
      g('acceptCookies', !0, 365);
      p.classList.remove('show');
      window.dispatchEvent(new Event('cookieAlertAccept'));
    }),
    u && (l('oldSitePopUpCookies') || (document.getElementById('oldSitePopUp').style.display = 'flex'),
      r.addEventListener('click', () => {
        g('oldSitePopUpCookies', !0, 1);
        document.getElementById('oldSitePopUp').style.display = 'none';
        $('.nbd-header-container').parent().parent().parent()
          .next()
          .css('margin-top', `${$('.nbd-header-container').outerHeight()}px`);
        window.dispatchEvent(new Event('cookieAlertAccept'));
      })),
    document.getElementById('domainSelector') || (document.getElementById('navbarDropdown').className = 'nav-link dropdown-toggle margin-r-40'),
    $('#navbar-brand').click(() => {
      localStorage.setItem('selectSecondaryNav', '');
      localStorage.setItem('selectParent', '');
    }),
    k = document.location.hostname == 'localhost' ? 6 : 1,
    k = document.location.href.replace(document.location.origin, '').split('/')[k],
    $(`a[data-nbdparentname\x3d"${k}"]`).addClass('highlight'),
    $('.nbd-navbar-desktop-wrapper .primarynav .primarynavitem .dropdown-item').each(function () {
      const g = $(this).text().toLowerCase();
      $(this).removeClass('active');
      w.indexOf(g) > 0 && $(this).addClass('active');
    }),
    k = $('.nbd-navbar-desktop-wrapper .secondarynav .nav-item.dropdown .nav-link'),
    $(k).on('click', function () {
      secondaryNavItemVal = $(this).text();
      localStorage.setItem('secondaryNavItemSelected', secondaryNavItemVal);
      $(this).addClass('active');
    }),
    k = $('.nbd-navbar-desktop-wrapper .primarynav .primarysubitem .nav-item .nav-link'),
    $(k).on('click', function () {
      $(this).attr('id');
      $('.modal-backdrop.show').hide();
      $('.nbd-listpopup-container .modal').modal('hide');
      $('#querySearchModal').modal('hide');
      $('.modal-backdrop.show').css('top', '64px');
    }));
});
