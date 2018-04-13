var app = angular.module('commonService',[]);
app.service('indexService', function() {

    // Save service
    this.save = function(tempArr, tempObj){
        tempObj.index = tempArr.length;
        tempArr.push(tempObj);
        return tempArr;
    }

    // Delete service
    this.delete = function(tempArr, tempIndex) {
        tempArr.splice(tempIndex, 1);
        return tempArr;
    }

    // Update service
    this.update = function(tempArr, tempObj) {
        tempArr[tempObj.index] = tempObj;
        return tempArr;
    }
});



