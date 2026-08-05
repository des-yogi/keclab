import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
//import { Navigation, Pagination } from 'swiper/modules'; // Scrollbar…

(function () {
  const partnersSwiper = new Swiper('.partners-slider__container', {
    //modules: [Navigation, Pagination], //Scrollbar…
    modules: [Autoplay], // required for autoplay to work
    speed: 400,
    spaceBetween: 8,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 2000,
    },
  });
})();
