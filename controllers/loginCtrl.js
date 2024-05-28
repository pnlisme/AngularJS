app.controller(
  "loginCtrl",
  function ($scope, $http, $location, $interval, $timeout, $route) {
    if (sessionStorage.getItem("user")) {
      $location.path("/profile/info");
    }
    $scope.message = "";
    $scope.user = {};
    $scope.loginUser = function () {
      $http.get("http://localhost:3000/userAccount").then(function (response) {
        $scope.userAccount = response.data;
        // Kiểm tra lấy email hoặc số điện thoại, sau đó kiểm tra mật khẩu và lưu vào biến user
        let user = $scope.userAccount.find(
          (item) =>
            (item.email == $scope.user.account ||
              item.phone == $scope.user.account) &&
            item.password == $scope.user.password
        );
        if (user) {
          // Lưu thông tin user vào sessionStorage
          sessionStorage.setItem("user", JSON.stringify(user));
          // Chuyển hướng đến trang chủ sau 5s
          $scope.countdown = 5;
          var stop = $interval(function () {
            $scope.countdown--;
            if ($scope.countdown == 0) {
              $location.path("/home");
              $interval.cancel(stop);
            }
          }, 1000);
          $timeout(function () {
            location.reload();
          }, 5000);
        } else {
          $scope.message = "Tài khoản hoặc mật khẩu không đúng";
          $timeout(function () {
            $scope.message = "";
          }, 3000);
        }
      });
    };
  }
);
