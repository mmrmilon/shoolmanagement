var app = angular.module('SonaichandiSchool',['ngTouch','ngAnimate','ng-fusioncharts','ui.grid','ui.grid.pagination','ui.grid.exporter','ngFileUpload','ui.bootstrap',                                           
                                           'ngSanitize', 'mgcrea.ngStrap', 'textAngular', 'ui.grid.autoResize', 'ui.grid.resizeColumns','ngCsv'])
/*.run(['$http','UserPermission','PermissionSetting', function ($http,UserPermission,PermissionSetting) {
    UserPermission.ListOfPermission().success(function (data) {
    	PermissionSetting.data = data;
    	console.info(PermissionSetting.data);
    });
}]); */
                                    
app.value('GlobalSetting', {});
app.value('PermissionSetting', {data:''});

//******************* user permission setting start *******************//
app.service('UserPermission', ['$http', '$filter','PermissionSetting', function ($http, $filter,PermissionSetting) {


	 this.ListOfPermission = function () {
		 //alert("inner of ListOfPermission");
	        var callAjax= $http({
	            headers: { 'Content-Type': 'application/json' },
	            url: baseUrl+'member/ifHasPermission',
	            method: "POST"
	        }).success(function (data) {
	        	//UserPermission.ProcessUserPermissionData(data);
	        	PermissionSetting.data = data;
	        	
	        }).error(function (data) {
	            console.info(data);
	        });
	        return callAjax;
	 }
	
    this.ProcessUserPermissionData=function(data)
    {
    	//alert("tushar"+JSON.stringify(data));
    	//console.info(PermissionSetting.data);
    	//console.info("data: "+data);
    	var searchResult = $filter('filter')(PermissionSetting.data, { 'unique_id': data });
    	if(searchResult.length > 0)
    		return true;
    	else
    		return false;
    }
}]);

app.directive('allowFloatNumericOnly', function() {
	  return {
	    require: 'ngModel',
	    link: function (scope, element, attr, ngModelCtrl) {
	      function fromUser(text) {
	        var transformedInput = text.replace(/[^0-9.]/g, '');
	        console.log(transformedInput);
	        if(transformedInput !== text) {
	            ngModelCtrl.$setViewValue(transformedInput);
	            ngModelCtrl.$render();
	        }
	        return transformedInput;
	      }
	      ngModelCtrl.$parsers.push(fromUser);
	    }
	  }; 
});

app.directive('allowNumericOnly', function() {
	  return {
	    require: 'ngModel',
	    link: function (scope, element, attr, ngModelCtrl) {
	      function fromUser(text) {
	        var transformedInput = text.replace(/[^0-9]/g, '');
	        console.log(transformedInput);
	        if(transformedInput !== text) {
	            ngModelCtrl.$setViewValue(transformedInput);
	            ngModelCtrl.$render();
	        }
	        return transformedInput;
	      }
	      ngModelCtrl.$parsers.push(fromUser);
	    }
	  }; 
});

function stripslashes(str) {
  return (str + '')
    .replace(/\\(.?)/g, function(s, n1) {
      switch (n1) {
        case '\\':
          return '\\';
        case '0':
          return '\u0000';
        case '':
          return '';
        default:
          return n1;
      }
    });
}






















