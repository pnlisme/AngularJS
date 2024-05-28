app.controller("postsCtrl", function ($scope, $http, $routeParams) {
  $scope.category = $routeParams.category == "all" ? "" : $routeParams.category;
  $http.get("http://localhost:3000/posts").then(function (response) {
    $scope.posts = response.data;
  });
});
