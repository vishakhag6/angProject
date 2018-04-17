var app = angular.module('indexApp',['commonService']);
app.controller('indexCtrl', ['$scope', 'indexService', '$timeout', function($scope, $indexService, $timeout) {
    $scope.studentHeading = "Please fill the informations"; // Form Heading
    $scope.student = {};
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

	$scope.userObj2 = {
		"key" : "index key value"
	};

    // Save functionality
    $scope.saveFunc = function(){
        $scope.studentArr = $indexService.save($scope.studentArr, $scope.student);
        $scope.student = {};
    };

	// Delete functionality(On the basis of Modal)
	$scope.showDeleteModal = function(index){
		$('#deleteModal').modal();
		$scope.deleteFunc = function(){
			$scope.studentArr = $indexService.delete($scope.studentArr, index);
			$scope.showDeletedMsz = true;
			$timeout(function(){
				$scope.showDeletedMsz = false;
			}, 3000);
		};
	};

    // Edit functionality
    $scope.onEditFunc = function(student) {
        studentUpdate = angular.copy(student);
        $scope.student = studentUpdate;
        $scope.booleanObj = {
            showSaveBtn : false,
            showUpdateBtn : true,
            showCancelBtn : true,
            showEditBtn : false,
            showDeleteBtn : false
        };
    };

    // Update functionality
    $scope.updateFunc = function(student) {
        $scope.studentArr = $indexService.update($scope.studentArr, student);
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
		if(item.firstName.indexOf($scope.searchText) !== -1 ||
			item.emailValue.indexOf($scope.searchText) !== -1) {
			return true;
		}
	};
}]);

