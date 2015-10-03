var app = angular.module("MyApp", []);

app.controller("TestCtrl", function($scope, $http) {
	$scope.posts = { };
  $http.get('get-current-user').success(function(data, status, headers, config) {
      $scope.posts = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});