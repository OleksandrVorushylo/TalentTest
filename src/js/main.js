import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
import {fixForSwiperSafariOld, isInViewport} from './settings-metamorfosi.js';

$(document).ready(function ($) {
  const navbar = document.querySelector(`navbar`);

  if (navbar) {
    const navbarElements = document.querySelectorAll(`navbar a`);
    const spanElement = document.querySelector(`navbar span`);
    const activeMenuElement = document.querySelector(`navbar a.active`);

    function backgroundMenuPositionFunc(targetElement, flagMouseEnter) {
      const navbarPosition = navbar.getBoundingClientRect();
      const elementPosition = targetElement.getBoundingClientRect();

      let spanPositionLeftStart = elementPosition.left - navbarPosition.left;
      let spanWidthStart = elementPosition.width;

      if (flagMouseEnter) {
        spanElement.style.setProperty('--span-transition', `0.5s cubic-bezier(0.75, 0, 0, 1)`);
      } else {
        spanElement.style.setProperty('--span-transition', `opacity 0.5s ease, visibility 0s 0s`);
      }
      spanElement.style.setProperty('--width-span', `${spanWidthStart}px`);
      spanElement.style.setProperty('--left-position-span', `${spanPositionLeftStart}px`);
    }

    if (activeMenuElement) {
      backgroundMenuPositionFunc(activeMenuElement, true);
      spanElement.classList.add('active');

      navbarElements.forEach(elem => {
        elem.addEventListener('mouseenter', function(e) {
          backgroundMenuPositionFunc(e.target, true);
        })

        navbar.addEventListener('mouseleave', function (e) {
          backgroundMenuPositionFunc(activeMenuElement, true);
        })
      })
    } else {
      let flagMouseEnter = false;

      navbarElements.forEach(elem => {
        elem.addEventListener('mouseenter', function(e) {
          backgroundMenuPositionFunc(e.target, flagMouseEnter);
          spanElement.classList.add('active');

          flagMouseEnter = true;
        })
      })

      navbar.addEventListener('mouseleave', function (e) {
        spanElement.classList.remove('active');
        flagMouseEnter = false;
        spanElement.style.setProperty('--span-transition', `opacity 0.5s ease, visibility 0s 0.5s`);
      })
    }
  }

  // Default Swiper init
  // var swiperInsights = new Swiper(".swiper-insights", {
  //   option: setting,
  // });
  //
  // fixForSwiperSafariOld(swiperInsights);

  // lottie.loadAnimation({
  //   container: document.querySelector(`.lottie-logo`),
  //   renderer: "svg",
  //   loop: true,
  //   autoplay: true,
  //   path: "./js/lottie/logoloop.json",
  // });
});
