var app = angular.module("heroBanner", []);

app.controller('heroBannerController', ['$scope', function ($scope) {
	$scope.imageObj = {
		src : 'images/background1.jpg',
		alt : 'Hero Banner',
		desc : 'Angular Crud App'
	},

	$scope.imageObjFooter = {
		src : 'images/background2.jpg',
		alt : 'Footer banner',
		desc : 'My footer desc',
		myName : "Vishakha Nehe"
	}

	// $scope.myName = "Vishakha Nehe"
}]);

app.directive("heroBannerDirective", function() {
	function linkFunc($scope, element, attribute) {
		$('.parallax').parallax();
	}

	return {
		restrict : "E",
		template :	`<div class="parallax-container">
						<div class="section no-pad-bot">
						  <div class="container">
							<br><br>
							<h1 class="header center teal-text text-lighten-2">Welcome!!!!</h1>
							<div class="row center">
							  <h2 class="header col s12 light" ng-if="asa.desc">{{asa.desc}}</h2>
							</div> 
							<h5 ng-if="asa.myName" class="center-align red-text text-darken-1">Created By {{asa.myName}}</h5> 
						  </div>
						</div>
						<div class="parallax">
							<img src="{{asa.src}}" alt="{{alt.alt}}">
						</div>
					</div>
					`,
		// replace : true, // So the replace property in directives refer to whether the element to which the directive is being applied (<my-dir> in that case) should remain (replace: false) and the directive's template should be appended as its child,
		scope : {
			asa : '=src',
			alt : '=',
			myName : '@'
		},

		link : linkFunc
	};
});

// @ is used for text binding
// = is used for two way binding
// & is used for one way binding

