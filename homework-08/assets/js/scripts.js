'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* BEGIN: dropdown */
  const dropdownEl = '.js__dropdown';
  const dropdownActive = 'dropdown-active';
  const dropdownToggleEl = 'js__dropdown-toggle';
  const dropdownMenu = '.dropdown-menu';
  const js__dropdown = document.querySelectorAll(dropdownEl);

  function removeActiveDropdown() {
    js__dropdown.forEach(item => {
      item.classList.remove(dropdownActive)
    })
  }

  document.addEventListener('click', e => {
    const target = e.target;
    const findDropdown = target.closest(dropdownEl)

    if (findDropdown?.classList.contains(dropdownActive) && !target.closest(dropdownMenu)) {
      findDropdown.classList.remove(dropdownActive);
    } else if (target.classList.contains(dropdownToggleEl)) {
      removeActiveDropdown();
      findDropdown.classList.add(dropdownActive);
    } else if (!target.closest(dropdownMenu)) {
      removeActiveDropdown();
    }
  });
  /* END */


  /* BEGIN: Аккордеон */
  const menuList = document.getElementsByClassName('js-collapse');
  for (let i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener('click', function () {
      this.classList.toggle('acc__active')
    })
  }
  /* END */
});


/* BEGIN: Открытие и закрытие панели меню */
function toggle() {
  document.querySelector('body').classList.toggle('b-menu__open');
}

document
  .querySelector('.js-top__toggle')
  .addEventListener('click', () => toggle());

document
  .querySelector('.js-menu__close')
  .addEventListener('click', () => toggle());
/* END */
