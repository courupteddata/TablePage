'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope","orderByFilter", function($scope, orderBy) {

    //Some constants for the table
    const EDIT = "Edit";
        const CANCEL = "Cancel";
        const SAVE = "Save";

    const ID = "#";
    const ID_KEY = "ID_KEY";

    const USERNAME = "Username";
    const USERNAME_KEY = "Username_KEY";

    const FULL_NAME = "Full Name";
    const FULL_NAME_KEY = "FULL_NAME_KEY";

    const ROLES = "Roles";
    const ROLES_KEY = "ROLES_KEY";

    const FIELD1 = "Field1";
    const FIELD1_KEY = "Field1";

    const FIELD2 = "Field2";
    const FIELD2_KEY = "Field2";

    const FIELD3 = "Field3";
    const FIELD3_KEY = "Field3";

    $scope.darkMode = false;


    //The roles
    $scope.roles = ["Role 1", "Role 2", "Role 3"];

        //Some information for the table rows
    $scope.tableHeaders = [
        {key: ID_KEY,        label: ID,        editable:false},
        {key: USERNAME_KEY,  label: USERNAME,  editable:false},
        {key: FULL_NAME_KEY, label: FULL_NAME, editable:false},
        {key: ROLES_KEY,     label: ROLES,     editable:true, options: $scope.roles},
        {key: FIELD1_KEY,    label: FIELD1,    editable:true, options: []},
        {key: FIELD2_KEY,    label: FIELD2,    editable:false},
        {key: FIELD3_KEY,    label: FIELD3,    editable:false},
    ];


    //Some simulated data, field names are surrounded with brackets to resolve the string value
    $scope.tableData = [
        {[ID_KEY]:"1", [USERNAME_KEY]:"username",   [FULL_NAME_KEY]:"fullname",   [ROLES_KEY]:$scope.roles[0], [FIELD1_KEY]:"fieldOne",   [FIELD2_KEY]:"fieldTwo",   [FIELD3_KEY]:"fieldThree"},
        {[ID_KEY]:"2", [USERNAME_KEY]:"username2",  [FULL_NAME_KEY]:"fullname2",  [ROLES_KEY]:$scope.roles[1], [FIELD1_KEY]:"fieldOne2",  [FIELD2_KEY]:"fieldTwo2",  [FIELD3_KEY]:"fieldThree2"},
        {[ID_KEY]:"3", [USERNAME_KEY]:"username3",  [FULL_NAME_KEY]:"fullname3",  [ROLES_KEY]:$scope.roles[2], [FIELD1_KEY]:"fieldOne3",  [FIELD2_KEY]:"fieldTwo3",  [FIELD3_KEY]:"fieldThree3"},
        {[ID_KEY]:"4", [USERNAME_KEY]:"username4",  [FULL_NAME_KEY]:"fullname4",  [ROLES_KEY]:$scope.roles[0], [FIELD1_KEY]:"fieldOne4",  [FIELD2_KEY]:"fieldTwo4",  [FIELD3_KEY]:"fieldThree4"},
    ];

    $scope.orderByKey = ID_KEY;
    $scope.reverseSort = false;

    $scope.sort = function(key) {
         $scope.reverseSort = (key !== null && $scope.orderByKey === key) ? !$scope.reverseSort : false;
         $scope.orderByKey = key;
         $scope.tableData = orderBy($scope.tableData, String($scope.orderByKey), $scope.reverseSort);
    };

    $scope.backupData = {
        //ID : data
    };

    //Add the extra fields to be used later
    for(let i = 0; i < $scope.tableData.length; i++) {
        $scope.tableData[i][EDIT] = false;
    }


    $scope.edit = function(index) {
        $scope.backupData[$scope.tableData[index][ID_KEY]] = Object.assign({}, $scope.tableData[index]); //Perform a clone
        $scope.tableData[index][EDIT] = true;
    };

    $scope.save = function(index) {
        if($scope.tableData[index][ID_KEY] == null) {
            //Adding new entry, do some sort of post here. But for now it just gets removed
            $scope.tableData.splice(index, 1);
            return;
        }

        //$scope.tableData[index] contains the modified data
        $scope.backupData[$scope.tableData[index][ID_KEY]] = {}; //Clean up the backup
        $scope.tableData[index][EDIT] = false;
    };

    $scope.cancel = function(index) {

        if($scope.tableData[index][ID_KEY] == null) {
            //Canceling a new entry, just remove it
            $scope.tableData.splice(index, 1);
            return;
        }

        $scope.tableData[index] = Object.assign({}, $scope.backupData[$scope.tableData[index][ID_KEY]]);
        $scope.tableData[index][EDIT] = false;
    };

      $scope.add = function() {
        const temp = {
            [EDIT] : true
        };

        $scope.tableData.unshift(temp);
    };


    $scope.toggleMode = function() {
        $scope.darkMode = !$scope.darkMode;
    }

}]);