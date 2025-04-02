document.addEventListener(`DOMContentLoaded`, function () {
  // background Scale
  const bannerbg = document.querySelector(`.main_banner`);

  window.addEventListener(`scroll`, function () {
    const scrollTopData = this.window.scrollY;
    const bgSize = 100 + scrollTopData / 40;
    // 값을 적게 나눠 줄수록 이미지 사이즈가 커짐

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

// submenu
// function initSubmenu() {
//   let windowWidth = window.innerWidth;

//   if (windowWidth >= 960) {
//     const menuList = document.querySelectorAll(`.main_menu .menu_list`);
//     const subMenuBox = document.querySelector(`.sub_menu_box`);
//     for (const mainMenu of menuList) {
//       mainMenu.addEventListener(`mouseenter`, function () {
//         const subMenu = this.querySelector(`.sub_menu`);
//         subMenuBox.classList.add(`on`);
//         subMenu.classList.add(`on`);
//       });

//       mainMenu.addEventListener(`mouseleave`, function () {
//         const subMenuAll = document.querySelectorAll(`.sub_menu`);
//         for (subMenuBoxAll of subMenuAll) {
//           subMenuBoxAll.classList.remove(`on`);
//           subMenuBox.classList.remove(`on`);
//         }
//       });
//     }
//   } else {
//     const menuList = document.querySelectorAll(`.main_menu .menu_list`);
//     // const subMenuBox = document.querySelector(`.sub_menu_box`);
//     for (const mainMenu of menuList) {
//       mainMenu.addEventListener(`click`, function () {
//         const subMenu = this.querySelector(`.sub_menu`);
//         subMenu.classList.toggle(`click`);
//       });
//     }
//   }
// }

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
    const newMenu = menu.cloneNode(true); // 기존 노드를 '자식 요소까지' 복제
    // menu 요소를 복제 / true는 자식 요소까지 포함해서 복제하라는 의미 / 복제된 노드는 이벤트 리스너는 복사되지 않음

    menu.parentNode.replaceChild(newMenu, menu); // 기존 노드를 복제한 것으로 교체
    // 복제한 newMenu로 기존의 menu 요소를 교체 / 이 작업을 통해 기존에 걸려있던 mouseenter, mouseleave, click 같은 이벤트 리스너는 완전히 제거
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

// 윈도우가 리사이즈 될 때 자동 반응 하도록 설정
window.addEventListener(`resize`, function () {
  // windowWidth = window.innerWidth;
  console.log("윈도우 리사이즈 감지됨");
  initSwiper();
  initSubmenu();
});
