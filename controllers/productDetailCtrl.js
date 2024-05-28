app.controller(
  "productDetailCtrl",
  function ($scope, $http, $routeParams, $location) {
    $http.get("http://localhost:3000/products").then(function (response) {
      $scope.products = response.data;
      $scope.productDetail = $scope.products.filter(function (product) {
        return product.id == $routeParams.id;
      })[0];
      // get cart
      $scope.cart.idProduct = $scope.productDetail.id;
      $scope.cart.image = $scope.productDetail.images[0];
      $scope.cart.name = $scope.productDetail.name;
      $scope.cart.sale = $scope.productDetail.sale;
      $scope.cart.price = $scope.productDetail.price;
      $scope.cart.grindLevel =
        $scope.productDetail.grindLevel == null
          ? ""
          : $scope.productDetail.grindLevel[0];
      $scope.cart.weight =
        $scope.productDetail.weight == null
          ? ""
          : $scope.productDetail.weight[0];
      $scope.cart.color =
        $scope.productDetail.color == null ? "" : $scope.productDetail.color[0];
      $scope.cart.size =
        $scope.productDetail.size == null ? "" : $scope.productDetail.size[0];
    });

    $scope.buyNow = function () {
      $scope.addToCart();
      $location.path("/cart");
    };

    $(document).ready(function () {
      // Product Detail Carousel
      $("#product-detail-carousel").owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        rewind: true,
        center: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
      });
    });

    // Sự kiện click trên thumb để chuyển slide trong carousel chính
    $(".owl-thumb").on("click", function (e) {
      e.preventDefault();
      var index = $(this).index();
      $("#product-detail-carousel").trigger("to.owl.carousel", index);
    });

    // $scope.addToCart = function (product) {
    //   $http.post("http://localhost:3000/cart", product).then(function (response) {
    //     alert("Product added to cart");
    //   });
    // };

    // load JS
    $(document).ready(function () {
      var heightInfo = $(".productdetail-more-info");
      var containerCoating = $(".productdetail-coating");
      var btnShow = $(".productdetail-show");
      var btnHide = $(".productdetail-hide");

      btnShow.on("click", function (e) {
        e.preventDefault();
        heightInfo.css("max-height", "100%");
        containerCoating.css("display", "none");
      });
      btnHide.on("click", function (e) {
        e.preventDefault();
        heightInfo.css("max-height", "420px");
        containerCoating.css("display", "flex");
      });
    });
  }
);
app.filter("filterRalated", function () {
  return function (products, category, idProduct) {
    return products.filter(function (product) {
      return product.categoryValue == category && product.id != idProduct;
    });
  };
});
