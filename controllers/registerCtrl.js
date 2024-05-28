app.controller(
  "registerCtrl",
  function ($scope, $http, $location, $interval, $timeout) {
    if (sessionStorage.getItem("user")) {
      $location.path("/profile/info");
    }
    $scope.message = "";
    $scope.user = {};
    $scope.user.role = 2;
    $scope.registerUser = function () {
      $http.get("http://localhost:3000/userAccount").then(function (res) {
        if ($scope.registerUserForm.$valid) {
          var check = res.data.find(function (item) {
            return (
              item.email === $scope.user.email ||
              item.phone === $scope.user.phone
            );
          });
          if (check) {
            $scope.message = "Email đã tồn tại hoặc số điện thoại đã tồn tại!";
            $timeout(function () {
              $scope.message = "";
            }, 3000);
          } else {
            $http
              .post("http://localhost:3000/userAccount", $scope.user)
              .then(function (response) {
                $scope.countdown = 5;
                var stop = $interval(function () {
                  $scope.countdown--;
                  if ($scope.countdown == 0) {
                    $location.path("/login");
                    $interval.cancel(stop);
                  }
                }, 1000);
              });
          }
        }
      });
    };
  }
);
