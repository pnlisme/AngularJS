app.controller(
  "cartCtrl",
  function ($rootScope, $scope, $http, $location, $timeout) {
    if ($rootScope.cartData.length == 0) {
      $location.path("/home");
    }
    // user
    $scope.user = JSON.parse(sessionStorage.getItem("user"));
    // xử lí voucher
    $scope.errorVoucher = "";
    $scope.successVoucher = "";
    $scope.applyVoucher = function (code) {
      if (sessionStorage.getItem("user")) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        $http.get("http://localhost:3000/orders").then(function (res) {
          var checkUsed = res.data.find(function (item) {
            return item.idUser == user.id && item.voucher == code;
          });
          if (checkUsed) {
            $scope.errorVoucher = "Mã giảm giá đã được sử dụng!";
          } else {
            $http
              .get("http://localhost:3000/vouchers")
              .then(function (response) {
                var check = response.data.find((item) => {
                  return item.code == code;
                });
                if (check) {
                  $scope.voucher = check;
                  $scope.order.voucher = check.code;
                  if ($rootScope.totalCart < $scope.voucher.price) {
                    $scope.errorVoucher =
                      "Giá trị đơn hàng không đủ để sử dụng mã giảm giá này";
                  } else if (
                    ($rootScope.totalCart * $scope.voucher.percent) / 100 >
                    $scope.voucher.maxPrice
                  ) {
                    $rootScope.totalCart =
                      $rootScope.totalCart - $scope.voucher.maxPrice;
                    $scope.successVoucher = "Sử dụng mã giảm giá thành công";
                    $scope.prevendAction = true;
                  } else {
                    $rootScope.totalCart =
                      $rootScope.totalCart -
                      ($rootScope.totalCart * $scope.voucher.percent) / 100;
                    $scope.successVoucher = "Sử dụng mã giảm giá thành công";
                    $scope.prevendAction = true;
                  }
                }
              });
          }
        });
      } else {
        $scope.errorVoucher = "Vui lòng đăng nhập để sử dụng mã giảm giá";
      }
      $timeout(function () {
        $scope.successVoucher = "";
        $scope.errorVoucher = "";
      }, 3000);
    };

    // xử lí đơn hàng
    $scope.order = {};
    $scope.checkout = function () {
      console.log($scope.order);
    };
  }
);
