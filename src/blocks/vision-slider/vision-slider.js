import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; // Scrollbar…

(function () {
  // Подсключение помодульно
  // Подключение бандла Swiper со ВСЕМИ модулями
  // import Swiper from 'swiper/bundle';

  const reviewSwiper = new Swiper('.vision-slider__review-slider', {
    modules: [Navigation, Pagination], //Scrollbar…
    // Optional parameters
    spaceBetween: 8,
    slidesPerView: 1,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();
