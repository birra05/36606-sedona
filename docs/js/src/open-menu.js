'use strict';

(function() {
  var buttonMenu = document.querySelector('#button-menu');
  var menuList = document.querySelector('#menu-list');

  function toggleMenu() {
    if(!menuList.classList.contains('open-menu')) {
      menuList.classList.add('open-menu');
      this.classList.add('icon-close');
    } else {
      menuList.classList.remove('open-menu');
      this.classList.remove('icon-close');
    }
  };

  buttonMenu.addEventListener('click', toggleMenu);
})();
