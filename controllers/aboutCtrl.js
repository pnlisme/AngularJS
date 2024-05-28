app.controller("aboutCtrl", function ($scope, $http) {
  $scope.feedback = {};
  $scope.submitFeedback = function (event) {
    event.preventDefault();
    $http
      .post("http://localhost:3000/feedbacksCustomer", $scope.feedback)
      .then(function (response) {
        console.log("Gửi góp ý thành công:", response.data);
        $scope.feedback = {};
      })
      .catch(function (error) {
        console.error("Lỗi khi gửi góp ý:", error);
      });
  };
});
