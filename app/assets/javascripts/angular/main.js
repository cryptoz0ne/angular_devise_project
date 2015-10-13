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


// jQuery validation
  // $scope.submitLogin = function() {
		// angular.element("#loginform").validate({
		// 	submitHandler: ajaxLogin,
		//   rules: {
		//     // simple rule, converted to {required:true}
		//     // compound rule
		//     log_email: {
		//       required: true,
		//       email: true
		//     },
		//     log_password: {
		//     	required: true,
		//     	minlength: 8
		//     }
		//   },
		//   messages: {
		//     log_email: {
		//       required: "We need your email address to contact you",
		//       email: "Your email address must be in the format of name@domain.com"
		//     },
		//     log_password: {
		//     	required:	"Please input your password",
		//     	minlength: jQuery.validator.format("Enter at least {0} characters")
		//     }
		//   },
		//   errorPlacement: function(error, element) {
		//   	angular.element('#errdiv p').html('');
		//   	angular.element('#errdiv p').addClass('bg-danger');
		// 		error.appendTo(angular.element('#errdiv p'));
		// 	}
		// });
  // }


  $scope.submitLogin = function () {
	  var config_login = {
	      headers: {
	          'X-HTTP-Method-Override': 'POST'
	      }
	  };

	  if (Object.keys($scope.loginform.$error).length != 0)
    	return false;
    
	  Auth.login($scope.credentials_login, config_login).then(function(user) {
	  	debugger;
	      console.log(user); // => {id: 1, ect: '...'}
	      $scope.currentUser = user;
	      $scope.message = "Logged in successfully!";
	      angular.element("#infodiv").removeClass("alert-danger");
	      angular.element("#infodiv").removeClass("alert-info");
	      angular.element("#infodiv").addClass("alert-success");
	      angular.element("#flash_notice").html($scope.message);
	      
	  }, function(error) {
	      // Authentication failed...
	      $scope.message = error.data.error;
	      $scope.message = "Invalid email or password!";
	      angular.element("#infodiv").removeClass("alert-success");
	      angular.element("#infodiv").removeClass("alert-info");
	      angular.element("#infodiv").addClass("alert-danger");
	      angular.element("#flash_notice").html($scope.message);	      
	  });
	}


  $scope.sign_up = function() {
   	angular.element('#errdiv p').html('');
    $scope.signup = "1";
    $scope.message = '';
    angular.element('#titlediv h3').html("Sign up");
  }


  // $scope.submitSignup = function() {
		// angular.element("#signform").validate({
		// 	submitHandler: ajaxSignup,
		//   rules: {
		//     // simple rule, converted to {required:true}
		//     // compound rule
		//     first_name: "required",
		//     last_name: "required",
		//     sign_email: {
		//       required: true,
		//       email: true
		//     },
		//     phone_number: "required",
		//     sign_password: {
		//     	required: true,
		//     	minlength: 8
		//     },
		//     sign_password_confirmation: {
		//     	required: true,
		//     	minlength: 8,
		//     	equalTo: "#sign_password"
		//     }
		//   },
		//   messages: {
		//   	first_name: "Enter your firstname",
		//   	last_name: "Enter your lastname",
		//     sign_email: {
		//       required: "We need your email address to contact you",
		//       email: "Your email address must be in the format of name@domain.com"
		//     },
		//     phone_number: "Enter your phonenumber",
		// 		sign_password: {
		// 			required: "Provide your password",
		// 			minlength: jQuery.validator.format("Enter at least {0} characters")
		// 		},
		// 		sign_password_confirmation: {
		// 			required: "Repeat your password",
		// 			minlength: jQuery.validator.format("Enter at least {0} characters"),
		// 			equalTo: "Enter the same password as above"
		// 		}
		//   },
		//   errorPlacement: function(error, element) {
		//   	angular.element('#errdiv p').html('');
		//   	angular.element('#errdiv p').addClass('bg-danger');
		// 		error.appendTo(angular.element('#errdiv p'));
		// 	}
		// });
  // }

 	$scope.submitSignup = function() {
  	var config_signup = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

	  if (Object.keys($scope.signform.$error).length != 0)
    	return false;
    
   	Auth.register($scope.credentials_signup, config_signup).then(function(registeredUser) {
    	  console.log(registeredUser); // => {id: 1, ect: '...'}
    	  
     	 	$scope.signup = "0";
     	 	$scope.message = "You have to confirm your email address before continuing.";
		   	angular.element("#infodiv").addClass("alert-success");
		    angular.element("#infodiv").removeClass("alert-danger");
		    angular.element("#infodiv").removeClass("alert-info");
		    angular.element("#flash_notice").html($scope.message);	  
      
  	}, function(error) {
    	  // Registration failed...
    	  console.log(error);
    	  $scope.message = "Email has already been taken";
		   	angular.element("#infodiv").removeClass("alert-success");
		    angular.element("#infodiv").addClass("alert-danger");
		    angular.element("#infodiv").removeClass("alert-info");
		    angular.element("#flash_notice").html($scope.message);	 
  	});
  }

  $scope.submitBack = function() {
  	angular.element('#errdiv p').html('');
  	$scope.message = "You need to sign in or sign up before continuing.";

    angular.element("#infodiv").removeClass("alert-success");
    angular.element("#infodiv").removeClass("alert-danger");
    angular.element("#infodiv").addClass("alert-info");
    angular.element("#flash_notice").html($scope.message);	  
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
      $scope.message = "Logged out successfully!";
      angular.element("#infodiv").addClass("alert-success");
	    angular.element("#infodiv").removeClass("alert-danger");
	    angular.element("#infodiv").removeClass("alert-info");
	    angular.element("#flash_notice").html($scope.message);
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

      angular.element("#infodiv").removeClass("alert-success");
      angular.element("#infodiv").removeClass("alert-danger");
      angular.element("#infodiv").addClass("alert-info");
      angular.element("#flash_notice").html($scope.message);	      
      // unauthenticated error
  });
});

app.controller("ProfileCtrl", ['$scope','$http', 'Auth', function($scope, $http, Auth) {
	$scope.message = '';
	$scope.user = {};

	Auth.currentUser().then(function(user){
		$scope.user = user;
	});

	//	jQuery validation
	// $scope.submitUpdate = function() {
	// 	angular.element("#profile-form").validate({
	// 		submitHandler: updateProfile,
	// 	  rules: {
	// 	    // simple rule, converted to {required:true}
	// 	    // compound rule
	// 	    first_name: "required",
	// 	    last_name: "required",
	// 	    email: {
	// 	      required: true,
	// 	      email: true
	// 	    },
	// 	    current_password: "required",
	// 	    new_password: {
	// 	    	required: true,
	// 	    	minlength: 8
	// 	    },
	// 	    new_password_confirmation: {
	// 	    	required: true,
	// 	    	minlength: 8,
	// 	    	equalTo: "#new_password"
	// 	    }
	// 	  },
	// 	  messages: {
	// 	    email: {
	// 	      required: "We need your email address to contact you",
	// 	      email: "Your email address must be in the format of name@domain.com"
	// 	    },
	// 	    current_password: {
	// 				required: "Enter your current password",
	// 				minlength: jQuery.validator.format("Enter at least {0} characters")
	// 			},
	// 	    new_password: {
	// 				required: "Enter new password",
	// 				minlength: jQuery.validator.format("Enter at least {0} characters")
	// 			},
	// 			new_password_confirmation: {
	// 				required: "Repeat your password",
	// 				minlength: jQuery.validator.format("Enter at least {0} characters"),
	// 				equalTo: "Enter the same password as above"
	// 			}
	// 	  },
	// 	  errorPlacement: function(error, element) {
	// 	  	$scope.errormessage =
	// 	  	angular.element('#editerr p').html('');
	// 	  	angular.element('#editerr p').addClass('bg-danger');
	// 			error.appendTo(angular.element('#editerr p'));
	// 		}
	// 	});
 //  }

	$scope.submitUpdate = function() {

		if (Object.keys($scope.editform.$error).length != 0)
    	return false;

		$http({
			method: 'PATCH',
			url: '/users.json',
			data: { user: $scope.user }
		}).success(function(data){
			console.log(data);
			$scope.message = "Edit user successfully!";

      angular.element("#infodiv").addClass("alert-success");
      angular.element("#infodiv").removeClass("alert-danger");
      angular.element("#flash_notice").html($scope.message);	 
			
		}).error(function(error){
			console.log(error);
			$scope.message = "Email has already been taken or current password is invalid.";

      angular.element("#infodiv").removeClass("alert-success");
      angular.element("#infodiv").addClass("alert-danger");
      angular.element("#flash_notice").html($scope.message);	 
		});	
	}
}]);