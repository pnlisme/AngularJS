var app = angular.module("mainApp", ["ngRoute", "ngSanitize"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "/views/clients/home.html?" + new Date().getTime(),
      controller: "homeCtrl",
    })
    .when("/products/:category", {
      templateUrl: "/views/clients/products.html?" + new Date().getTime(),
      controller: "productsCtrl",
    })
    .when("/productdetail/:id", {
      templateUrl: "/views/clients/productdetail.html?" + new Date().getTime(),
      controller: "productDetailCtrl",
    })
    .when("/posts/:category", {
      templateUrl: "/views/clients/posts.html?" + new Date().getTime(),
      controller: "postsCtrl",
    })
    .when("/postdetail/:id", {
      templateUrl: "/views/clients/postdetail.html?" + new Date().getTime(),
      controller: "postDetailCtrl",
    })
    .when("/about", {
      templateUrl: "/views/clients/about.html?" + new Date().getTime(),
      controller: "aboutCtrl",
    })
    .when("/login", {
      templateUrl: "/views/clients/login.html?" + new Date().getTime(),
      controller: "loginCtrl",
    })
    .when("/register", {
      templateUrl: "/views/clients/register.html?" + new Date().getTime(),
      controller: "registerCtrl",
    })
    .when("/forgot", {
      templateUrl: "/views/clients/forgot.html",
    })
    .when("/reset", {
      templateUrl: "/views/clients/reset.html",
    })
    .when("/profile/:check", {
      templateUrl: "/views/clients/profile.html?" + new Date().getTime(),
      controller: "profileCtrl",
    })
    .when("/cart", {
      templateUrl: "/views/clients/cart.html?" + new Date().getTime(),
      controller: "cartCtrl",
    })
    .when("/order", {
      templateUrl: "/views/clients/order.html",
    })
    .when("/test", {
      templateUrl: "/views/clients/test.html?" + new Date().getTime(),
      controller: "testCtrl",
    })
    .otherwise({
      redirectTo: "/home",
    });
});
app.controller(
  "mainCtrl",
  function ($rootScope, $scope, $http, $location, $route, $timeout) {
    // active header
    $scope.isActive = function (viewLocation) {
      var path = $location.path().split("/")[1];
      if (path === viewLocation) {
        return "active";
      } else {
        return "";
      }
    };

    // Xử lí search
    $rootScope.searchProduct = "";
    $scope.searchLoad = function () {
      $rootScope.searchProduct = $scope.searchProduct;
      $scope.searchProduct = "";
      if ($location.path() != "/products/all") {
        $location.path("/products/all");
      } else {
        $route.reload();
      }
    };

    // get fast data
    var requests = [
      {
        url: "http://localhost:3000/categoriesProduct",
        variable: "categoriesProduct",
      },
      {
        url: "http://localhost:3000/categoriesPost",
        variable: "categoriesPost",
      },
      { url: "http://localhost:3000/brands", variable: "brands" },
      { url: "http://localhost:3000/posts", variable: "posts" },
      { url: "http://localhost:3000/vouchers", variable: "vouchers" },
    ];
    function makeRequest(index) {
      if (index < requests.length) {
        $http.get(requests[index].url).then(function (response) {
          $scope[requests[index].variable] = response.data;
          makeRequest(index + 1);
        });
      }
    }
    // Bắt đầu thực hiện các yêu cầu bằng cách gọi hàm đệ quy
    makeRequest(0);

    // xử lí product
    // get products
    $http.get("http://localhost:3000/products").then(function (response) {
      $scope.products = response.data;
      // get product detail modal
      $scope.getModalDetail = function (id) {
        $(".header-main").addClass("header-show");
        $(".header-main").removeClass("header-hide");
        $scope.productDetailModal = $scope.products.find((product) => {
          return product.id == id;
        });
        $scope.productDetailModal.imageMain =
          $scope.productDetailModal.images[0];
        $scope.changeImage = function (index) {
          $scope.productDetailModal.imageMain =
            $scope.productDetailModal.images[index];
        };
        // get cart
        $scope.cart.id = $scope.productDetailModal.id + new Date().getTime();
        $scope.cart.idProduct = $scope.productDetailModal.id;
        $scope.cart.image = $scope.productDetailModal.imageMain;
        $scope.cart.name = $scope.productDetailModal.name;
        $scope.cart.sale = $scope.productDetailModal.sale;
        $scope.cart.price = $scope.productDetailModal.price;
        $scope.cart.grindLevel =
          $scope.productDetailModal.grindLevel == null
            ? ""
            : $scope.productDetailModal.grindLevel[0];
        $scope.cart.weight =
          $scope.productDetailModal.weight == null
            ? ""
            : $scope.productDetailModal.weight[0];
        $scope.cart.color =
          $scope.productDetailModal.color == null
            ? ""
            : $scope.productDetailModal.color[0];
        $scope.cart.size =
          $scope.productDetailModal.size == null
            ? ""
            : $scope.productDetailModal.size[0];
      };
      // chunk prouducts in tool category
      $scope.chunkProducts = function (products, size) {
        var newArr = [];
        for (var i = 0; i < products.length; i += size) {
          newArr.push(products.slice(i, i + size));
        }
        return newArr;
      };
      $scope.chunkProductsTool = $scope.chunkProducts(
        $scope.products.filter((product) => {
          return product.categoryValue == "tool";
        }),
        3
      );
    });
    // go to product detail
    $scope.goToProductDetail = function (id) {
      $location.path("/productdetail/" + id);
      location.href = "#!/productdetail/" + id;
      location.reload();
    };

    // cart
    $scope.cart = {};
    $scope.cartLoad = function () {
      $location.path("/cart");
    };

    // get cart
    if (localStorage.getItem("cartData")) {
      $rootScope.cartData = JSON.parse(localStorage.getItem("cartData"));
    } else {
      $rootScope.cartData = localStorage.setItem(
        "cartData",
        JSON.stringify([])
      );
    }
    $scope.localLink = "http://localhost:3000/cartDataUser/";
    $scope.getCart = function () {
      if (sessionStorage.getItem("user")) {
        var idUser = JSON.parse(sessionStorage.getItem("user")).id;
        $http.get($scope.localLink).then(function (response) {
          $rootScope.cartData = response.data.filter((e) => e.idUser == idUser);
          updateCartStatistics();
        });
      } else {
        $rootScope.cartData = JSON.parse(localStorage.getItem("cartData"));
        updateCartStatistics();
      }
    };

    function updateCartStatistics() {
      $rootScope.quantityCart = $rootScope.cartData.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      $rootScope.totalCart = $rootScope.cartData.reduce((total, item) => {
        return total + item.sale * item.quantity;
      }, 0);
    }
    $scope.getCart();

    $scope.addToCart = function () {
      $scope.getCart();
      var existingItem = $rootScope.cartData.find(
        (item) => item.idProduct === $scope.cart.idProduct
      );

      if (existingItem) {
        existingItem.quantity += $scope.cart.quantity;
        updateCart(existingItem);
      } else {
        addItemToCart();
      }
    };

    $scope.removeCart = function (id) {
      if ($rootScope.cartData.length === 1) {
        $location.path("/home");
      }
      // Prevent page navigation
      event.preventDefault();

      if (sessionStorage.getItem("user")) {
        $http.delete($scope.localLink + id).then(function () {
          $scope.getCart();
        });
      } else {
        $rootScope.cartData = $rootScope.cartData.filter(
          (item) => item.id != id
        );
        updateCart();
      }
    };

    $scope.minusCart = function (id) {
      var item = $rootScope.cartData.find((item) => item.id == id);
      if (item.quantity > 1) {
        item.quantity--;
        updateCart(item);
      } else {
        $scope.removeCart(id);
      }
    };

    $scope.plusCart = function (id) {
      var item = $rootScope.cartData.find((item) => item.id == id);
      item.quantity++;
      updateCart(item);
    };

    function addItemToCart() {
      if (sessionStorage.getItem("user")) {
        $scope.cart.idUser = JSON.parse(sessionStorage.getItem("user")).id;
        $http.post($scope.localLink, $scope.cart).then(function () {
          $scope.cart.quantity = 1;
          $scope.getCart();
        });
      } else {
        $rootScope.cartData.push($scope.cart);
        localStorage.setItem("cartData", JSON.stringify($rootScope.cartData));
        $scope.cart.quantity = 1;
        $scope.getCart();
      }
    }

    function updateCart(itemToUpdate) {
      if (sessionStorage.getItem("user")) {
        $http
          .put(
            $scope.localLink + (itemToUpdate ? itemToUpdate.id : ""),
            itemToUpdate
          )
          .then(function () {
            $scope.getCart();
          });
      } else {
        localStorage.setItem("cartData", JSON.stringify($rootScope.cartData));
        $scope.getCart();
      }
    }

    // xử lí voucher
    $scope.copySuccess = false;
    $scope.copyToClipboard = function (text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      $scope.copySuccess = true;
      $timeout(function () {
        $scope.copySuccess = false;
      }, 3000);
    };
  }
);
