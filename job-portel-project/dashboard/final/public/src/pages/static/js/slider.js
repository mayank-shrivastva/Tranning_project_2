$('.owl-carousel.version-1').owlCarousel({
    loop: true,
    margin: 15,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 4,
        nav: true
      }
    }
  });

  // Slider version 2
  $('.owl-carousel.version-2').owlCarousel({
    loop: true,
    margin: 15,
    center: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: true
      }
    }
  });