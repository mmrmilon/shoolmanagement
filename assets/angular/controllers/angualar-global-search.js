app.controller('GlobalSearchCtrl', ['$scope','$rootScope','$http','$filter','GlobalSetting','$window', 
function ($scope,$rootScope,$http,$filter,GlobalSetting,$window) {
	$scope.settingPermission = false;
	 
	/* UserPermission.ListOfPermission().success(function (data) {
		 $scope.settingPermission = UserPermission.ProcessUserPermissionData('7651');
		 //console.info('setting permission: '+$scope.settingPermission);
	 });*/

	if($window.location.href.indexOf('/globalsearch') != -1){	
		var temp=$window.location.href;
		var result=temp.split('/');
		var index=temp.indexOf('/member');
		var url=temp.substring(0, index)+'/member';	
	
		$scope.globalSearch = result[result.length-1];
		GlobalSetting.url = url;
		//alert($scope.globalSearch);
	}
	
	if($scope.globalSearch !="")
	{
		GlobalSetting.searchKey = $scope.globalSearch;
		//$rootScope.$broadcast('callEventForProgramListing', { searchKey: $scope.globalSearch});
	}
	
	$scope.GlobalSearchReDiect = function(){
		$window.location.href =  baseUrl +'member/globalsearch/'+$scope.globalSearch ;
	}
	
}]);


app.controller('MainMenuCtrl', ['$scope','$rootScope','$http','$filter','GlobalSetting','$window', 
    function ($scope,$rootScope,$http,$filter,GlobalSetting,$window) {
	
	 	/*$scope.userMenuPermission = false;
    	 $scope.userGroupMenuPermission = false;
    	 $scope.propertyMenuPermission = false;
    	 $scope.activityLogMenuPermission = false;
    	 $scope.anouncementMenuPermission = false;
    	 $scope.listingMenuPermission = false;
    	 UserPermission.ListOfPermission().success(function (data) {
    		 $scope.userMenuPermission = UserPermission.ProcessUserPermissionData('9957');
    		 $scope.userGroupMenuPermission = UserPermission.ProcessUserPermissionData('7398');
    		 $scope.propertyMenuPermission = UserPermission.ProcessUserPermissionData('2587');
    		 $scope.activityLogMenuPermission = UserPermission.ProcessUserPermissionData('7960');
    		 $scope.anouncementMenuPermission = UserPermission.ProcessUserPermissionData('3228');
    		 $scope.listingMenuPermission = UserPermission.ProcessUserPermissionData('9655');
    	 });  */                       	 
}]);                                 	 


app.controller('GlobalSearch1Ctrl', ['$scope','$rootScope','$http','$filter','GlobalSetting', function ($scope,$rootScope,$http,$filter,GlobalSetting) {
	
	
        var searchString = GlobalSetting.searchKey;
        $scope.searchKey = GlobalSetting.searchKey;

        	$http({
		      headers: { 'Content-Type': 'application/json' },
		      url:  GlobalSetting.url+'/GetGlobalSearchRecords',
		      method: "POST",
		      data:{module:'user',searchKey:searchString }
		  }).success(function (data) {
			  $scope.users = data;
		  }); 
        	
        	
        	
        	$http({
  		      headers: { 'Content-Type': 'application/json' },
  		      url:  GlobalSetting.url+'/GetGlobalSearchRecords',
  		      method: "POST",
  		      data:{module:'listing',searchKey:searchString }
  		  }).success(function (data) {
  			  $scope.listings = data;
  		  }); 
        	
        	$http({
    		      headers: { 'Content-Type': 'application/json' },
    		      url:  GlobalSetting.url+'/GetGlobalSearchRecords',
    		      method: "POST",
    		      data:{module:'property',searchKey:searchString }
    		  }).success(function (data) {
    			  $scope.propertys = data;
    		  }); 
  	
}]);