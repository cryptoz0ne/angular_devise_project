var app = angular.module("MyApp", ['Devise']);

app.config(function(AuthProvider) {

});

app.controller("TestCtrl",function(Auth, $scope) {
	$scope.currentUser = false;
	$scope.signup = "0";
	$scope.message = "";

  $scope.credentials_login = {
      email: '',
      password: ''
  };

  $scope.credentials_signup = {
  		first_name:'',
  		last_name:'',
      email: '',
      phone_number:'',
      password: '',
      password_confirmation: ''
  };


  $scope.submitLogin = function() {
		angular.element("#loginform").validate({
			submitHandler: ajaxLogin,
		  rules: {
		    // simple rule, converted to {required:true}
		    // compound rule
		    log_email: {
		      required: true,
		      email: true
		    },
		    log_password: {
		    	required: true,
		    	minlength: 8
		    }
		  },
		  messages: {
		    log_email: {
		      required: "We need your email address to contact you",
		      email: "Your email address must be in the format of name@domain.com"
		    },
		    log_password: {
		    	required:	"Please input your password",
		    	minlength: jQuery.validator.format("Enter at least {0} characters")
		    }
		  },
		  errorPlacement: function(error, element) {
		  	angular.element('#errdiv p').html('');
		  	angular.element('#errdiv p').addClass('bg-danger');
				error.appendTo(angular.element('#errdiv p'));
			}
		});
  }


  var ajaxLogin = function () {
	  var config_login = {
	      headers: {
	          'X-HTTP-Method-Override': 'POST'
	      }
	  };

	  Auth.login($scope.credentials_login, config_login).then(function(user) {
	      console.log(user); // => {id: 1, ect: '...'}
	      $scope.currentUser = user;
	      $scope.message = "Logged in successfully!";
	      var errormessage = "<p class='bg-success' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
	      angular.element('#errdiv p').html(errormessage);
	  }, function(error) {
	      // Authentication failed...
	      $scope.message = error.data.error;
	      var errormessage = "<p class='bg-danger' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
	      angular.element('#errdiv p').html(errormessage);
	  });  	
  }


  $scope.sign_up = function() {
   	 angular.element('#errdiv p').html('');
    	$scope.signup = "1";
  }


  $scope.submitSignup = function() {
		angular.element("#signform").validate({
			submitHandler: ajaxSignup,
		  rules: {
		    // simple rule, converted to {required:true}
		    // compound rule
		    first_name: "required",
		    last_name: "required",
		    sign_email: {
		      required: true,
		      email: true
		    },
		    phone_number: "required",
		    sign_password: {
		    	required: true,
		    	minlength: 8
		    },
		    sign_password_confirmation: {
		    	required: true,
		    	minlength: 8,
		    	equalTo: "#sign_password"
		    }
		  },
		  messages: {
		  	first_name: "Enter your firstname",
		  	last_name: "Enter your lastname",
		    sign_email: {
		      required: "We need your email address to contact you",
		      email: "Your email address must be in the format of name@domain.com"
		    },
		    phone_number: "Enter your phonenumber",
				sign_password: {
					required: "Provide your password",
					minlength: jQuery.validator.format("Enter at least {0} characters")
				},
				sign_password_confirmation: {
					required: "Repeat your password",
					minlength: jQuery.validator.format("Enter at least {0} characters"),
					equalTo: "Enter the same password as above"
				}
		  },
		  errorPlacement: function(error, element) {
		  	angular.element('#errdiv p').html('');
		  	angular.element('#errdiv p').addClass('bg-danger');
				error.appendTo(angular.element('#errdiv p'));
			}
		});
  }

  var ajaxSignup = function() {
  	var config_signup = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

   	Auth.register($scope.credentials_signup, config_signup).then(function(registeredUser) {
    	  console.log(registeredUser); // => {id: 1, ect: '...'}
    	  
     	 	$scope.signup = "0";
     	 	$scope.message = "You have to confirm your email address before continuing.";
     	 	var errormessage = "<p class='bg-success' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
	    angular.element('#errdiv p').html(errormessage);

      
  	}, function(error) {
    	  // Registration failed...
      	$scope.message = "Email "+error.data.errors.email[0];
      	var errormessage = "<p class='bg-danger' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
		    angular.element('#errdiv p').html(errormessage);
  	});

  }

  $scope.submitBack = function() {
  	angular.element('#errdiv p').html('');
  	$scope.signup = "0";
  }

  $scope.submitLogout = function() {
  	var config_logout = {
        headers: {
            'X-HTTP-Method-Override': 'DELETE'
        }
    };
    // Log in user...
    // ...
    Auth.logout(config_logout).then(function(oldUser) {
      $scope.currentUser = false;
      $scope.message = "Logged-out successfully!";
      var errormessage = "<p class='bg-danger' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
	    angular.element('#errdiv p').html(errormessage);
    }, function(error) {
        // An error occurred logging out.
        $scope.message = error.data.error;
    });  	
  }

	Auth.currentUser().then(function(user) {
      // User was logged in, or Devise returned
      // previously authenticated session.
      console.log(user); // => {id: 1, ect: '...'}
      // console.log(Auth._currentUser);
      // console.log(Auth.isAuthenticated());
      $scope.currentUser = user;
  }, function(error) {

  		$scope.message = "You need to sign in or sign up before continuing.";
  		var errormessage = "<p class='bg-danger' style='font-weight:bold;'>"+"<label>"+$scope.message+"</label></p>"
	    angular.element('#errdiv p').html(errormessage);
      // unauthenticated error
  });
});

app.controller("ProfileCtrl", ['$scope','$http', 'Auth', function($scope, $http, Auth) {
	$scope.chpassword = 0;
	$scope.errormessage = '';
	$scope.user = {};

	Auth.currentUser().then(function(user){
		$scope.user = user;
	});

	$scope.submitUpdate = function() {
		angular.element("#profile-form").validate({
			submitHandler: updateProfile,
		  rules: {
		    // simple rule, converted to {required:true}
		    // compound rule
		    first_name: "required",
		    last_name: "required",
		    email: {
		      required: true,
		      email: true
		    },
		    current_password: "required",
		    new_password: {
		    	required: true,
		    	minlength: 8
		    },
		    new_password_confirmation: {
		    	required: true,
		    	minlength: 8,
		    	equalTo: "#new_password"
		    }
		  },
		  messages: {
		    email: {
		      required: "We need your email address to contact you",
		      email: "Your email address must be in the format of name@domain.com"
		    },
		    current_password: {
					required: "Enter your current password",
					minlength: jQuery.validator.format("Enter at least {0} characters")
				},
		    new_password: {
					required: "Enter new password",
					minlength: jQuery.validator.format("Enter at least {0} characters")
				},
				new_password_confirmation: {
					required: "Repeat your password",
					minlength: jQuery.validator.format("Enter at least {0} characters"),
					equalTo: "Enter the same password as above"
				}
		  },
		  errorPlacement: function(error, element) {
		  	$scope.errormessage =
		  	angular.element('#editerr p').html('');
		  	angular.element('#editerr p').addClass('bg-danger');
				error.appendTo(angular.element('#editerr p'));
			}
		});
  }

	var updateProfile = function() {
		$http({
			method: 'PATCH',
			url: '/users.json',
			data: { user: $scope.user }
		}).success(function(data){
			console.log(data);
			$scope.errormessage = "<p class='bg-success' style='font-weight:bold;'>"+"<label>Edit user successfully!</label></p>"
			angular.element('#editerr p').html($scope.errormessage);
		}).error(function(error){
			debugger;
			console.log(error);
			$scope.errormessage = "<p class='bg-success' style='font-weight:bold;'>Email has already been taken or Current_password is invalid.<label>";
			angular.element('#editerr p').html($scope.errormessage);
		});	
	}
}]);