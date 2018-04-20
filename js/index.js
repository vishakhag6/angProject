var app = angular.module('indexApp',['commonService', 'heroBanner']);
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
		// $('#deleteModal').modal();
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

	function init(){
		$scope.studentArr = JSON.parse(localStorage.getItem("studentArr")) || [];
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
