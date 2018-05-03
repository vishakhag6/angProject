var app = angular.module('indexApp',['commonService', 'heroBanner', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl : "home.html",
			controller : "indexCtrl"
		})
		.when("/about", {
			templateUrl : "about.html",
			controller : "aboutCtrl"
		})
		.when("/contact", {
			templateUrl : "contact.html",
			controller : "contactCtrl"
		})
		.otherwise({
			templateUrl : "home.html"
		});
	$locationProvider.html5Mode(true);
});

app.controller('indexCtrl', ['$scope', 'indexService', '$timeout', function($scope, $indexService, $timeout) {

	$scope.mainHeadingMessage = $indexService.mainHeading; // Heading form service(data sharing)
    $scope.student = {};

    $scope.$on('onFinishRender',function(){
    	$('select').formSelect();
	});

    $scope.studentArr = [];
    var studentUpdate = {};
    $scope.booleanObj = {
        showSaveBtn : true,
        showUpdateBtn : false,
        showCancelBtn : false,
        showEditBtn : true,
        showDeleteBtn : true
    };

	$scope.showDeletedMsz = false;

	$scope.searchText = "";

    $scope.gender = [ "female", "male"]; // Select array

	$scope.indexVar = "";

	$scope.userDataObj = [
		'http://res.cloudinary.com/vishakhanehe/image/upload/v1491620696/san_myugdd.jpg',
		'http://res.cloudinary.com/vishakhanehe/image/upload/v1491620687/paris_rytltc.jpg',
		'http://res.cloudinary.com/vishakhanehe/image/upload/v1491620686/NY_arfrud.jpg'
	];

    // Save functionality
    $scope.saveFunc = function(){
        $scope.studentArr = $indexService.save($scope.studentArr, $scope.student);

		// Store in local storage
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("studentArr", JSON.stringify($scope.studentArr));
		}
        $scope.student = {};
    };

	// Delete functionality(On the basis of Modal)
	$scope.showDeleteModal = function(index){
		var elem = document.querySelector('#deleteModal');
		var instance = M.Modal.init(elem);
		instance.open();

		$scope.deleteFunc = function(){
			$scope.studentArr = $indexService.delete($scope.studentArr, index);

			// delete a particular value from object
			if (typeof(Storage) !== "undefined") {
				localStorage.removeItem("studentArr");
				localStorage.setItem("studentArr", JSON.stringify($scope.studentArr));
			}
			$scope.showDeletedMsz = true;
			$timeout(function(){
				$scope.showDeletedMsz = false;
			}, 3000);

			instance.close();
		};
	};

    // Edit functionality
    $scope.onEditFunc = function(student, index) {
        studentUpdate = angular.copy(student);
        $scope.student = studentUpdate;
		$scope.indexVar = index;
        $scope.booleanObj = {
            showSaveBtn : false,
            showUpdateBtn : true,
            showCancelBtn : true,
            showEditBtn : false,
            showDeleteBtn : false
        };
    };

    // Update functionality
    $scope.updateFunc = function(student, index) {
        $scope.studentArr = $indexService.update($scope.studentArr, student, index);
        console.log(index);
		// Update in local storage
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("studentArr", JSON.stringify($scope.studentArr));
		}
        $scope.student = {};
        $scope.booleanObj = {
            showSaveBtn : true,
            showUpdateBtn : false,
            showCancelBtn : false,
            showEditBtn : true,
            showDeleteBtn : true
        };
    };

    // Cancel functionality
    $scope.onCancelFunc = function() {
		var elem = document.querySelector('#deleteModal');
		var instance = M.Modal.init(elem);
		instance.close();
        $scope.student = {};
        $scope.booleanObj = {
            showSaveBtn : true,
            showUpdateBtn : false,
            showCancelBtn : false,
            showEditBtn : true,
            showDeleteBtn : true
        };
    };

    // Search on the basis of name and email only
	$scope.search = function(item) {
		if((item.firstName.toLowerCase()).indexOf($scope.searchText.toLowerCase()) !== -1 ||
			item.emailValue.indexOf($scope.searchText) !== -1) {
			return true;
		}
	};


	// On scroll show back to top button
	$(window).scroll(function(){
		if ($(window).scrollTop() <= 380) {
			$('.back-to-top').fadeOut();
		}
		else {
			$('.back-to-top').fadeIn();
		}
	});

	// Scroll to top function
	$scope.scrollToTop = function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	};

	function init(){
		$scope.studentArr = JSON.parse(localStorage.getItem("studentArr")) || [];
		// For carausal
		$('.carousel').carousel();
	}
	init();

}]).directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit(attr.onFinishRender);
				});
			}
		}
	}
});


app.controller('userCtrl', ['$scope', '$http',  function($scope, $http) {
	$scope.userHeading = "Here comes the user entries";

	$http({
		method: 'GET',
		url: 'https://reqres.in/api/users'
	}).then(function successCB(response){

		console.log(response.data);
		$scope.users = response.data.data;
		// $scope.name = response.data.data.map(function(item){return item.first_name});
		// console.log($scope.name);

	}, function errorCB(response){
		$scope.myError = response.data;
		console.log($scope.myError );
	});

}]);


app.controller('aboutCtrl', ['$scope', 'indexService', function($scope, $indexService) {
	$scope.name = "about works";
	$scope.sharedHeadingMessage = $indexService.sharedHeading;
}]);

app.controller('contactCtrl', ['$scope', 'indexService', function($scope, $indexService) {
	$scope.name = "Contact works";
	$scope.sharedHeadingMessage = $indexService.sharedHeading;
}]);