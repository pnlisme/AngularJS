app.controller(
  "profileCtrl",
  function ($scope, $routeParams, $http, $location, $timeout) {
    if (!sessionStorage.getItem("user")) {
      $location.path("/login");
    }
    $scope.check = $routeParams.check;
    if ($scope.check == "info") {
      $scope.title = "Thông tin cá nhân";
    } else if ($scope.check == "orders") {
      $scope.title = "Đơn hàng của bạn";
    } else if ($scope.check == "changePassword") {
      $scope.title = "Đổi mật khẩu";
    } else {
      $location.path("/profile/info");
    }

    $scope.user = JSON.parse(sessionStorage.getItem("user"));
    // format date yyyy-mm-dd
    if ($scope.user.birthday) {
      $scope.user.birthday = new Date($scope.user.birthday)
        .toISOString()
        .split("T")[0];
    }

    $scope.messageSuccess = "";
    $scope.messageFail = "";
    $scope.updateUser = function () {
      if ($scope.registerUserForm.$valid) {
        $scope.uploadImage();
        // kiểm tra trùng số điện thoại
        $http.get("http://localhost:3000/userAccount").then(function (res) {
          var check = res.data.find(function (item) {
            return item.phone == $scope.user.phone && item.id != $scope.user.id;
          });
          if (check) {
            $scope.messageFail = "Số điện thoại đã tồn tại!";
            $timeout(function () {
              $scope.messageFail = "";
            }, 3000);
          } else {
            $http.put(
              "http://localhost:3000/userAccount/" + $scope.user.id,
              JSON.stringify($scope.user)
            );
            $scope.messageSuccess = "Cập nhật thành công";
            $timeout(function () {
              $scope.messageSuccess = "";
            }, 3000);
          }
        });
        sessionStorage.setItem("user", JSON.stringify($scope.user));
      }
    };
    $scope.uploadImage = function (input) {};

    $scope.logout = function () {
      sessionStorage.removeItem("user");
      $location.path("/login");
      location.reload();
    };

    // $scope.changePassword = function () {
    //   $http.get("http://localhost:3000/userAccount").then(function (response) {
    //     $scope.userAccount = response.data;
    //     let user = $scope.userAccount.find((item) => item.id == $scope.user.id);
    //     if (user.password == $scope.user.oldPassword) {
    //       user.password = $scope.user.newPassword;
    //       $http.put(
    //         "http://localhost:3000/userAccount/" + user.id,
    //         JSON.stringify(user)
    //       );
    //       sessionStorage.setItem("user", JSON.stringify(user));
    //       $scope.message = "Đổi mật khẩu thành công";
    //     } else {
    //       $scope.message = "Mật khẩu cũ không đúng";
    //     }
    //   });
    // };
  }
);
