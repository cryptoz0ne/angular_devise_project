var app = angular.module("MyApp", []);

app.controller("TestCtrl",['$scope','myFactory', function($scope, myFactory) {
	$scope.posts = { };
	myFactory.get_user().success(function(data){
		console.log(data);
		$scope.posts=data;
	});
}]);