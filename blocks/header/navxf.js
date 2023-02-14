export default async function decorateXFNav(shadowroot) {
  shadowroot.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('mouseover', (event) => {
      event.target.classList.add('show');
      event.target.querySelectorAll('.nav-link').forEach((navLink) => {
        navLink.setAttribute('aria-expanded', 'true');
      });
      event.target.querySelector('.dropdown-menu').classList.add('show');
    });
    item.addEventListener('mouseout', (event) => {
      event.target.classList.remove('show');
      event.target.querySelectorAll('.nav-link').forEach((navLink) => {
        navLink.setAttribute('aria-expanded', 'false');
      });
      event.target.querySelector('.dropdown-menu').classList.remove('show');
    });
  });

  shadowroot.querySelectorAll('.dropdown-menu').forEach((item) => {
    item.addEventListener('mouseover', (event) => {
      event.target.classList.add('show');
      event.target.closest('.nav-item').classList.add('show');
    });
    item.addEventListener('mouseout', (event) => {
      event.target.classList.remove('show');
      event.target.closest('.nav-item').classList.remove('show');
    });
  });
}
