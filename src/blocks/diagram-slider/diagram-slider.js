import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; // Scrollbar…

(function () {
  let prevEl;
  let nextEl;
  let paginationEl;

  const diagramCtrl = document.querySelector('.diagram-slider');

  if (diagramCtrl) {
    prevEl = diagramCtrl.querySelector('.swiper-button-prev');
    nextEl = diagramCtrl.querySelector('.swiper-button-next');
    paginationEl = diagramCtrl.querySelector('.swiper-pagination');
  }

  const diagramSwiper = new Swiper('.diagram-slider__container', {
    modules: [Navigation, Pagination], //Scrollbar…
    // Optional parameters
    spaceBetween: 8,
    slidesPerView: 1,
    //loop: true,

    pagination: {
      el: paginationEl,
    },
    navigation: {
      prevEl: prevEl,
      nextEl: nextEl,
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    },
  });
})();
