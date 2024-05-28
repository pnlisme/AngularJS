app.controller("homeCtrl", function ($scope, $http) {
  $(document).ready(function () {
    // Home Product Promotional
    $(".home-product-promotional").owlCarousel({
      autoplay: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 500,
      autoplayHoverPause: true,
      rewind: true,
      rewindSpeed: 500,
      margin: 12,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 2,
        },
        576: {
          items: 3,
        },
        768: {
          items: 4,
        },
        992: {
          items: 5,
        },
        1200: {
          items: 6,
        },
      },
    });
    $(".home-product-promotional-prev").click(function () {
      $(".home-product-promotional").trigger("prev.owl.carousel");
    });
    $(".home-product-promotional-next").click(function () {
      $(".home-product-promotional").trigger("next.owl.carousel");
    });
    // Home Search Trends
    $(".search-trends").owlCarousel({
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 1000,
      autoplayHoverPause: true,
      loop: true,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 4,
          margin: 24,
        },
        576: {
          items: 4,
          margin: 48,
        },
        768: {
          items: 4,
          margin: 48,
        },
        992: {
          items: 5,
          margin: 72,
        },
        1200: {
          items: 5,
          margin: 96,
        },
      },
    });
    // Home Equipment
    $(".home-equipment-carousel").owlCarousel({
      margin: 16,
      nav: false,
      dots: false,
      rewind: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });
    $(".home-equipment-prev").click(function () {
      $(".home-equipment-carousel").trigger("prev.owl.carousel");
    });
    $(".home-equipment-next").click(function () {
      $(".home-equipment-carousel").trigger("next.owl.carousel");
    });
    // Home New Post
    $("#home-new-post-carousel").owlCarousel({
      items: 4,
      margin: 16,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 2000,
      autoplayHoverPause: true,
      rewind: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
      },
    });
  });
});
