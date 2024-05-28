app.controller("productsCtrl", function ($scope, $http, $routeParams) {
  $http.get("http://localhost:3000/products").then(function (response) {
    $scope.products = response.data;
  });

  // lấy title
  if ($routeParams.category == "all") {
    $scope.titleProduct = "Tất cả sản phẩm";
  } else if ($routeParams.category == "bean") {
    $scope.titleProduct = "Hạt cà phê";
  } else if ($routeParams.category == "machine") {
    $scope.titleProduct = "Máy pha cà phê";
  } else if ($routeParams.category == "tool") {
    $scope.titleProduct = "Công cụ pha chế";
  } else if ($routeParams.category == "capsule") {
    $scope.titleProduct = "Viên nén cà phê";
  }

  // lấy danh mục
  $scope.categoryProduct =
    $routeParams.category == "all" ? "" : $routeParams.category;

  // lấy thương hiệu
  $scope.brandWego = false;
  $scope.brandCafede = false;
  $scope.brandMorning = false;
  $scope.brandBrewinco = false;

  $scope.brandProduct = [];
  $scope.getBrandProduct = function (value, brand) {
    if (value) {
      return $scope.brandProduct.push(brand);
    } else {
      $scope.brandProduct = $scope.brandProduct.filter((item) => {
        return item != brand;
      });
    }
  };

  // lấy giá
  $scope.priceProduct = "all";
  $scope.priceMin = 0;
  $scope.priceMax = 1000000000;
  $scope.getPriceProduct = function (price) {
    switch (price) {
      case "100k":
        $scope.priceMin = 0;
        $scope.priceMax = 100000;
        break;
      case "300k":
        $scope.priceMin = 100000;
        $scope.priceMax = 300000;
        break;
      case "500k":
        $scope.priceMin = 300000;
        $scope.priceMax = 500000;
        break;
      case "1m":
        $scope.priceMin = 500000;
        $scope.priceMax = 1000000;
        break;
      case "1m+":
        $scope.priceMin = 1000000;
        $scope.priceMax = 1000000000;
        break;
      default:
        $scope.priceMin = 0;
        $scope.priceMax = 1000000000;
        break;
    }
  };

  // Ẩn hiện
  $scope.moreProduct = function () {
    $scope.limitProduct = 999;
    $scope.showBtn = true;
    $scope.hideBtn = true;
  };
  $scope.lessProduct = function () {
    $scope.limitProduct = 8;
    $scope.showBtn = false;
    $scope.hideBtn = false;
  };
});
app.filter("filterCustom", function () {
  return function (
    products,
    categoryProduct,
    brandProduct,
    priceMin,
    priceMax,
    searchProduct
  ) {
    let output = [];
    if (products) {
      if (searchProduct) {
        products.forEach((product) => {
          if (
            product.name.toLowerCase().includes(searchProduct.toLowerCase()) &&
            (categoryProduct == "" ||
              product.categoryValue == categoryProduct) &&
            (brandProduct.length == 0 ||
              brandProduct.includes(product.brandValue)) &&
            product.sale >= priceMin &&
            product.sale <= priceMax
          ) {
            output.push(product);
          }
        });
      } else {
        products.forEach((product) => {
          if (
            (categoryProduct == "" ||
              product.categoryValue == categoryProduct) &&
            (brandProduct.length == 0 ||
              brandProduct.includes(product.brandValue)) &&
            product.sale >= priceMin &&
            product.sale <= priceMax
          ) {
            output.push(product);
          }
        });
      }
    }
    return output;
  };
});
