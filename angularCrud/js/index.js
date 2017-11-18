var app = angular.module('indexApp',[]);
app.controller('indexCtrl', function($scope) {
    $scope.studentForm = "Please fill the informations";
    $scope.isUpdate = true;
    $scope.viewField = true;
    $scope.editField = false;
    $scope.student = {};
    $scope.studentUpdate = {};
    $scope.studentArr = [];
    $scope.studentUpdateArr = [];

    $scope.gender = ["female", "male"];
    $scope.saveFunc = function(){
        $scope.studentArr.push($scope.student);
        $scope.student = {};
    }

    $scope.onDelFunc = function(index) {
        $scope.studentArr.splice(index, 1);
    }

    $scope.onEditFunc = function(student) {
        $scope.viewField = !$scope.viewField;
        $scope.editField = !$scope.editField;
        $scope.studentUpdate = angular.copy(student);
        $scope.student = {};
        console.log(student);
    }
    
    $scope.onUpdateFunc = function () {
        $scope.viewField = !$scope.viewField;
        $scope.editField = !$scope.editField;
        $scope.studentUpdateArr.push($scope.studentUpdate);
    }
});