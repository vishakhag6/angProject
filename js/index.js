var app = angular.module('indexApp',['commonService', 'ui.router']);
app.controller('indexCtrl', ['$scope', 'indexService', function($scope, $indexService) {
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
    }
    $scope.gender = [ "female", "male"]; // Select array

    // Save functionality
    $scope.saveFunc = function(){
        $scope.studentArr = $indexService.save($scope.studentArr, $scope.student);
        $scope.student = {};
        console.log($scope.studentArr);
    }

    // Delete functionality
    $scope.deleteFunc = function(index){
        $scope.studentArr = $indexService.delete($scope.studentArr, index);
    }

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
        }
    }

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
        }
    }

    // Cancel functionality
    $scope.onCancelFunc = function() {
        $scope.student = {};
        $scope.booleanObj = {
            showSaveBtn : true,
            showUpdateBtn : false,
            showCancelBtn : false,
            showEditBtn : true,
            showDeleteBtn : true
        }
    }
}]);
