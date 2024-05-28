app.controller("postDetailCtrl", function ($scope, $http, $routeParams) {
  $scope.id = $routeParams.id;
  $http.get("http://localhost:3000/posts").then(function (response) {
    $scope.posts = response.data;
    $scope.post = $scope.posts.find((post) => post.id == $scope.id);
    // post related
    $scope.postsRelated = $scope.posts.filter((post) => {
      return (
        post.categoryPost == $scope.post.categoryPost && post.id != $scope.id
      );
    });
  });
});
