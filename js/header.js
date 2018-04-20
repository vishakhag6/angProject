var app = angular.module("heroBanner", []);

app.controller('heroBannerController', ['$scope', function ($scope) {
	$scope.imageObj = {
		src : 'images/background1.jpg',
		alt : 'Hero Banner',
		desc : 'Angular Crud App'
	},
	$scope.imageObjFooter = {
		src : 'images/background2.jpg',
		alt : '',
		desc : 'My footer desc'
	}
}]);

app.directive("heroBannerDirective", function() {
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
						  </div>
						</div>
						<div class="parallax">
							<img src="{{asa.src}}">
						</div>
					</div>
					`,
		scope : {
			asa : '=src'
		},

		link : function(scope, element, attribute) {
				$('.parallax').parallax();
		}
	};
});
