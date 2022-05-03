navigator.sayswho= (function(){
    var ua= navigator.userAgent;
    var tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

export function fixForSwiperSafariOld(swiper) {
    if (navigator.sayswho === `Safari 11` || navigator.sayswho === `Safari 12`) {
        const swiperSettings = swiper.params;
        const swiperAmount = swiperSettings.loop ? swiper.slides.length / 3 : swiper.slides.length;
        const swiperHTML = swiper.$el[0];
        const swiperHTMLPosLeft = swiperHTML.getBoundingClientRect().left;
        const swiperWrapper = swiper.$wrapperEl[0];
        let activeIndex = swiper.activeIndex;
        let realIndex = swiper.realIndex;
        let elWidth = swiper.el.swiper.slidesGrid[1];
        let margin = (elWidth - swiper.slides[1].offsetWidth);
        let posLeft = null;

        $(swiperWrapper).draggable({
                axis: 'x',
                revert: true,
                revertDuration: 0,

                start: function (event, ui) {
                    activeIndex = swiper.activeIndex;
                    realIndex = swiper.realIndex;
                    posLeft = ui.offset.left;
                },

                drag: function(event, ui){
                    swiper.setTranslate((ui.offset.left - swiperHTMLPosLeft), 0, 0);
                },

                stop: function (event, ui) {
                    const difference = posLeft - ui.offset.left;
                    console.log(difference);

                    if (difference > 0) {
                        swiper.slideTo(activeIndex + Math.ceil((difference) / elWidth), swiperSettings.speed);
                    } else {
                        swiper.slideTo(activeIndex + Math.floor((difference) / elWidth), swiperSettings.speed);
                    }

                    if (swiperSettings.loop) {
                        if (swiper.activeIndex < swiperAmount / 2) {
                            setTimeout(function () {
                                swiper.slideTo(swiper.activeIndex + swiperAmount, 0);
                            }, swiperSettings.speed);
                        }

                        if (swiper.activeIndex / 2 >= swiperAmount) {
                            setTimeout(function () {
                                swiper.slideTo(swiper.activeIndex - swiperAmount, 0);
                            }, swiperSettings.speed);
                        }
                    }

                    swiper.slideReset(0);
                    swiper.updateProgress();
                    swiper.updateSlidesClasses();
                },
            }
        );
    }
}

// Стара функція для перевірки чи елемент знаходиться в Viewport (потрібно юзати з window.addEventListener('scroll'))
// Проте краще використовувати Intersection Observer API для меншої нагрузки сайту https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
export function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Take index of element in HTMLList (Коли потрібно взяти index елемента з унікальним класом в массиві)
// let index = [].indexOf.call(
//   peopleArr,
//   document.querySelector(`.people.active`)
// );

// AOS init
// AOS.init({
//   startEvent: "load",
//   disableMutationObserver: false,
// });
// AOS.refresh(true);


