document.addEventListener(`DOMContentLoaded`, function () {
  // background Scale
  const bannerbg = document.querySelector(`.main_banner`);

  window.addEventListener(`scroll`, function () {
    const scrollTopData = this.window.scrollY;
    const bgSize = 100 + scrollTopData / 40;

    bannerbg.style.backgroundSize = `${bgSize}%`;
  });

  // 모바일 메뉴 햄버거 버튼
  const menuIcons = document.querySelector(`.menu_icons`);
  const hamburgerBtn = document.querySelector(`.hamburger_btn`);

  hamburgerBtn.addEventListener(`click`, function () {
    this.classList.toggle(`click`);

    const btnClick = this.classList.contains(`click`);
    if (btnClick) {
      menuIcons.classList.add(`click`);
    } else {
      menuIcons.classList.remove(`click`);
    }
  });
});

// swiper
let swiper = undefined;

function initSwiper() {
  const windowWidth = window.innerWidth;
  console.log("현재 윈도우 너비:", windowWidth);
  if (windowWidth >= 960 && swiper == undefined) {
    swiper = new Swiper(".mySwiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } else if (windowWidth < 960 && swiper != undefined) {
    swiper.destroy(true, true);
    swiper = undefined;
  }
}

initSwiper();

let currentMode = null;

function initSubmenu() {
  const windowWidth = window.innerWidth;
  const newMode = windowWidth >= 960 ? "pc" : "mobile";

  if (newMode === currentMode) return; // 동일 모드면 리턴
  currentMode = newMode;

  const menuList = document.querySelectorAll(`.main_menu .menu_list`);
  const subMenuBox = document.querySelector(`.sub_menu_box`);

  // 기존 이벤트 초기화
  menuList.forEach((menu) => {
    const newMenu = menu.cloneNode(true);

    menu.parentNode.replaceChild(newMenu, menu); 
  });

  if (newMode === "pc") {
    const updatedMenuList = document.querySelectorAll(`.main_menu .menu_list`);
    updatedMenuList.forEach((mainMenu) => {
      mainMenu.addEventListener(`mouseenter`, function () {
        const subMenu = this.querySelector(`.sub_menu`);
        subMenu.classList.add(`on`);
        subMenuBox.classList.add(`on`);
      });

      mainMenu.addEventListener(`mouseleave`, function () {
        const subMenus = document.querySelectorAll(`.sub_menu`);
        subMenus.forEach((sub) => sub.classList.remove(`on`));
        subMenuBox.classList.remove(`on`);
      });
    });
  } else {
    const updatedMenuList = document.querySelectorAll(`.main_menu .menu_list`);
    updatedMenuList.forEach((mainMenu) => {
      mainMenu.addEventListener(`click`, function () {
        const subMenu = this.querySelector(`.sub_menu`);
        subMenu.classList.toggle(`click`);
      });
    });
  }
}

initSubmenu();

window.addEventListener(`resize`, function () {

  initSwiper();
  initSubmenu();
});
