var app = angular.module('commonService',[]);
app.service('indexService', function() {

    // main heading(for data sharing)
	this.mainHeading = "Please fill the informations";
	this.sharedHeading = "Sharing among all";

    // Save service
    this.save = function(tempArr, tempObj){
        tempArr.push(tempObj);
        return tempArr;
    }

    // Delete service
    this.delete = function(tempArr, tempIndex) {
        tempArr.splice(tempIndex, 1);
        return tempArr;
    }

    // Update service
    this.update = function(tempArr, tempObj, tempIndex) {
        tempArr[tempIndex] = tempObj;
        return tempArr;
    }
});