var app = angular.module("heroBanner", []);



app.directive("heroBannerDirective", function() {
	return {
		restrict : "E",
		template :	`<div class="parallax-container">
						<div class="section no-pad-bot">
						  <div class="container">
							<br><br>
							<h1 class="header center teal-text text-lighten-2">Welcome!!!!</h1>
							<div class="row center">
							  <h5 class="header col s12 light">It is a crud application.</h5>
							</div>   
						  </div>
						</div>
						<div class="parallax">
							<img>
						</div>
					</div>
					`
		,

		link : function(scope, element, attribute) {
					element[0].querySelector('.parallax > img').src = "images/background1.jpg";
					$('.parallax').parallax();
		}
	};
});