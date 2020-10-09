/* Start Profile Settings Controller */
app.controller('ProfileSettingsCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) {
	
	$scope.dateformate = [{'date_formate_value':'d/m/Y', 'date_formate':'dd/mm/YYYY (Default)'}, 
	                      {'date_formate_value':'m/d/Y', 'date_formate':'mm/dd/yyyy'}];
	$scope.timeformate = [{'time_formate_value':'d/m/Y H:i', 'time_formate':'dd/mm/YYYY Hour:Min (Default)'}, 
	                      {'time_formate_value':'m/d/Y H:i', 'time_formate':'mm/dd/yyyy Hour:Min'}];
  
	
	/*Added by Tushar on 27-11-2015*/
	$http({
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    url: 'GetProfile',
	    method: "POST"
	  }).success(function(data) {
		  $scope.date_format = data[0].dateformat;
		  $scope.time_format = data[0].timeFormat;
		 // console.info(JSON.stringify(data));
	  });
	/* End*/
	
	$scope.profileupdate = function(){            
   			//console.info($scope.date_format +', '+$scope.time_format);   	
            $http.post('UpdateProfile', {'date_format' : $scope.date_format, 'time_format': $scope.time_format})
            .success(function (data, status, headers, config) 
            {
            	if(data)
            		alert('Date settings update successfully');
            	else
            		alert('Date settings update successfully');
            }).error(function (data, status, headers, config) {
            	alert(data);
            });
        }	
}]);
/* End Profile Settings Controller */


/* Start Create Feature Type Controller */
app.controller('CreateFeatureTypeCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'system_module_name', displayName: 'Module Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.system_module_name!=\'\'">{{row.entity.system_module_name}}</span>'+
            		'<span ng-if="row.entity.system_module_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'feature_name', displayName: 'Feature Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'controller_name', displayName: 'Controllers', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.controller_name!=\'\'">{{row.entity.controller_name}}</span>'+
            		'<span ng-if="row.entity.controller_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'function_name', displayName: 'Function Name', cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.function_name!=\'\'">{{row.entity.function_name}}</span>'+
            		'<span ng-if="row.entity.function_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'unique_id', displayName: 'Unique ID', cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'status', displayName: 'Status', width:60, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
	            		'</div>'
	            },
	            { field: 'feature_type_id', displayName: 'Action', width:60, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditFeatureTypesModal(row.entity)" title="Edit">Edit</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: true,
	        enableGridMenu: true,
	        exporterCsvFilename: 'featuretypes.csv'
	 };
	
	/* load default records */
	LoadCreateFeatureRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForFeatureType', function (event, args) {		
		LoadCreateFeatureRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.OpenCreateFeatureTypeModal = function(){
		$scope.createProperty={'feature_type_id':0, 'system_module_id':'', 'feature_name':'', 'controller_name':'', 'function_name':''};
		$modal.open({
            templateUrl: 'CreateFeatureTypeModalView',
            controller: 'CreateFeatureTypeModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	createFeatureTypeEntity: function () { return $scope.createProperty; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditFeatureTypesModal = function(entity){
		$modal.open({
            templateUrl: 'CreateFeatureTypeModalView',
            controller: 'CreateFeatureTypeModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	createFeatureTypeEntity: function () { return entity; }
            }
        });
	}
	
	
	function LoadCreateFeatureRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetCreateFeatureRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('CreateFeatureTypeModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'createFeatureTypeEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, createFeatureTypeEntity) {
     $scope.FeatureTypeEntity = createFeatureTypeEntity;  
     $scope.Modules = [];
     $http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetSystemModuleRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.Modules = data;
			  //console.info(JSON.stringify(data));
		  });
     console.info(JSON.stringify($scope.Modules));
     console.info(JSON.stringify($scope.FeatureTypeEntity));
     $scope.createfeaturetype = {
    		 add: function () {  
    		 //alert('Calling');
    		 //console.info(JSON.stringify($scope.FeatureTypeEntity));
    	     
             $http.post('SaveFeatureTypes', { data: $scope.FeatureTypeEntity})
             .success(function (data, status, headers, config) 
             {
            	 //console.info(JSON.stringify(data));
            	 $rootScope.$broadcast('callEventForFeatureType', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Create Feature Type Controller */


/* Start Member Type Setting Controller */
app.controller('MemberTypeSettingCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'member_type_name', displayName: 'Member Type Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.member_type_name!=\'\'">{{row.entity.member_type_name}}</span>'+
            		'<span ng-if="row.entity.member_type_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'weight', displayName: 'Member Weight', cellClass: 'left', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.weight!=\'\'">{{row.entity.weight}}</span>'+
            		'<span ng-if="row.entity.weight==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'is_super_admin', displayName: 'Is Super Admin', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.is_super_admin==1" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.is_super_admin==0" src="../assets/images/no.png">'+
	            		'</div>'
	            },
	            { field: 'member_type_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditMemberTypesModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteMemberTypes(row.entity)" title="Edit">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'membertypes.csv'
	 };
	
	/* load default records */
	LoadMemberTypeRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForMemberTypes', function (event, args) {		
		LoadMemberTypeRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddMemberTypesModal = function(){
		$scope.entity={'member_type_id':0, 'member_type_name':'', 'weight':'', 'is_super_admin':''};
		$modal.open({
            templateUrl: 'MemberTypeSettingModalView',
            controller: 'MemberTypeSettingModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditMemberTypesModal = function(entity){
		$modal.open({
            templateUrl: 'MemberTypeSettingModalView',
            controller: 'MemberTypeSettingModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Type */  
	$scope.DeleteMemberTypes = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveMemberTypeById',
	 	    method: "POST",
	 	    data:{member_type_id:entity.member_type_id}
	 	  }).success(function(data) {	 		 
	 		 LoadMemberTypeRecords();
	 	});
    }
	
	
	function LoadMemberTypeRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetMemberTypeRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('MemberTypeSettingModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.MemberTypeEntity = rowEntity;  
     if($scope.MemberTypeEntity.is_super_admin == 1)
		$scope.MemberTypeEntity.is_super_admin = true;
     else
		$scope.MemberTypeEntity.is_super_admin = false;
     
     console.info($scope.MemberTypeEntity);
     $scope.Weights = [{id:'2',weight:2},
                       {id:'3',weight:3},
                       {id:'4',weight:4},
                       {id:'5',weight:5},
                       {id:'6',weight:6},
                       {id:'7',weight:7},
                       {id:'8',weight:8},
                       {id:'9',weight:9},
                       {id:'10',weight:10},
                       {id:'11',weight:11},
                       {id:'12',weight:12},
                       {id:'13',weight:13},
                       {id:'14',weight:14},
                       {id:'15',weight:15}];
     
     $scope.membertype = {
    		 add: function () { 
    			 
	    		if($scope.MemberTypeEntity.is_super_admin)
	    			$scope.MemberTypeEntity.is_super_admin = '1';
	    		else
	    			$scope.MemberTypeEntity.is_super_admin = '0';
    		
    		 console.info($scope.MemberTypeEntity);
             $http.post('SaveMemberTypes', { data: $scope.MemberTypeEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForMemberTypes', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Member Type Setting Controller */


/* Start Member Group Setting Controller */
app.controller('MemberGroupSettingCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'member_group_name', displayName: 'Member Group Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.member_group_name!=\'\'">{{row.entity.member_group_name}}</span>'+
            		'<span ng-if="row.entity.member_group_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'weight', displayName: 'Weight', cellClass: 'left', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.weight!=\'\'">{{row.entity.weight}}</span>'+
            		'<span ng-if="row.entity.weight==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'member_type_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditMemberGroupModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteMemberGroup(row.entity)" title="Edit">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'membergroup.csv'
	 };
	
	/* load default records */
	LoadMemberGroupRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForMemberGroups', function (event, args) {		
		LoadMemberGroupRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.MemberGroupSettingModal = function(){
		$scope.entity={'member_group_id':0, 'member_group_name':'', 'weight':'', 'is_super_admin':''};
		$modal.open({
            templateUrl: 'MemberGroupSettingModalView',
            controller: 'MemberGroupSettingModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditMemberGroupModal = function(entity){
		$modal.open({
            templateUrl: 'MemberGroupSettingModalView',
            controller: 'MemberGroupSettingModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteMemberGroup = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveMemberGroupById',
	 	    method: "POST",
	 	    data:{member_group_id:entity.member_group_id}
	 	  }).success(function(data) {	 		 
	 		 LoadMemberGroupRecords();
	 	});
    }
	
	function LoadMemberGroupRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetMemberGroupRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('MemberGroupSettingModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.MemberGroupEntity = rowEntity;  
     $scope.Weights = [{id:'1',weight:1},
                       {id:'2',weight:2},
                       {id:'3',weight:3},
                       {id:'4',weight:4},
                       {id:'5',weight:5},
                       {id:'6',weight:6},
                       {id:'7',weight:7},
                       {id:'8',weight:8},
                       {id:'9',weight:9},
                       {id:'10',weight:10},
                       {id:'11',weight:11},
                       {id:'12',weight:12},
                       {id:'13',weight:13},
                       {id:'14',weight:14},
                       {id:'15',weight:15}];
     
     $scope.membergroup = {
    		 add: function () { 
    			 
	    		if($scope.MemberGroupEntity.is_super_admin)
	    			$scope.MemberGroupEntity.is_super_admin = '1';
	    		else
	    			$scope.MemberGroupEntity.is_super_admin = '0';
    		
    		 console.info($scope.MemberGroupEntity);
             $http.post('SaveMemberGroups', { data: $scope.MemberGroupEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForMemberGroups', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Member Group Setting Controller */

/* Start Member Group Setting Controller */
app.controller('GroupFeaturePermissionSettingCtrl', [ '$scope','$sce','$http','$filter','$modal', 
function($scope, $sce, $http, $filter, $modal) 
{
	$scope.userlist = [];
	$scope.modulelist = [];
	$scope.member_type_id = 0;
	$scope.system_module_id = 0;
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { 
	            	field: 'feature_name', displayName: 'Function Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.feature_name!=\'\'">{{row.entity.feature_name}}</span>'+
            		'<span ng-if="row.entity.feature_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { 
	            	field: 'member_type_id', displayName: 'Is Menue?', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.member_type_id>0" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.member_type_id==0" src="../assets/images/no.png">'+
	            		'</div>'
	            },
	            { 
	            	field: 'is_checked', width:80, displayName:'Action', cellClass: 'center',enableFiltering: false,
					enableColumnResizing: false , enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.is_checked" type="checkbox" ng-click="grid.appScope.SetGroupFeaturePermission(row.entity)"/></div>'
				}
	        ],
	        enableColumnMenus: false,
	        enableFiltering: false
	 };
	
	/* load default records */
	LoadGroupFeaturePermissionRecords(0,0); LoadDropdownListRecords();
	/* end ui grid configuration */
	
	/* Delete Member Group */  
	$scope.SetGroupFeaturePermission = function (entity) {
		//console.info(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	 	    url: 'SetGroupFeaturePermission',
	 	    method: "POST",
	 	    data:$.param({"feature_type_id" : entity.feature_type_id, "member_type_id" : entity.member_type_id, "set_member_type_id":$scope.member_type_id})
	 	  }).success(function(data) {	 		 
	 		 LoadGroupFeaturePermissionRecords($scope.system_module_id, $scope.member_type_id);
	 	});
    }
		
	function LoadGroupFeaturePermissionRecords(system_module_id, member_type_id){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetGroupFeaturePermission',
		    method: "POST",
		    data:$.param({"system_module_id" : system_module_id, "member_type_id" : member_type_id})
		  }).success(function(data) {
			  angular.forEach(data,function(value,key){
				  if(value.member_type_id > 0)
					  value.is_checked = true;
				  else
					  value.is_checked = false;
			  });
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
	function LoadDropdownListRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetMemberTypes',
		    method: "POST"
		  }).success(function(data) {
			  $scope.userlist = data;
			  $scope.member_type_id = data[0].member_type_id;
		  });
		
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetSystemModuleList',
		    method: "POST"
		  }).success(function(data) {
			  $scope.modulelist = data;
			  $scope.system_module_id = data[0].system_module_id;
		  });
	}
	
	$scope.PermissionSearch = function(){
		//console.info(JSON.stringify($scope.member_type_id));
		//console.info(JSON.stringify($scope.system_module_id));
		LoadGroupFeaturePermissionRecords($scope.system_module_id, $scope.member_type_id);
	}
	
}]);

/* End Group Feature Permission Controller */

/* Start API Settings Controller */
app.controller('APISettingsCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	$scope.crmauthtoken = '55236aa61ad30d02293cb83c27d42fdf';
	$http({
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    url: 'GetApiSettings',
	    method: "POST"
	  }).success(function(data) {
		  $scope.crmauthtoken = data.crmauthtoken;
		  //console.info(JSON.stringify(data));
	  });
	
	/* Save Api Setting */
	$scope.SaveCRMAuthToken = function () { 
            $http.post('SaveApiSettings', { 'crmauthtoken': $scope.crmauthtoken})
            .success(function (data, status, headers, config){
            	alert('CRM authtoken update successfully');
            }).error(function (data, status, headers, config) {
            	alert(data);
            });
        }	
}]);

/* End API Settings Controller */

/* Start Data Sync Controller */
app.controller('DataSyncCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* Save Api Setting */
	$scope.DataSync = function () { 
            $http.post('DoSyncByModule', { 'module': 'Potential', 'refresh': "true"})
            .success(function (data, status, headers, config){
            	alert('Please wait! it may take some time!');
            }).error(function (data, status, headers, config) {
            	alert(data);
            });
        }	
}]);

/* End Data Sync Controller */

/* Start Marketing Agents Controller */
app.controller('MarketingAgentsCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'company', displayName: 'Company Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.company!=\'\'">{{row.entity.company}}</span>'+
            		'<span ng-if="row.entity.company==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'contact_person', displayName: 'Contact Person', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.contact_person!=\'\'">{{row.entity.contact_person}}</span>'+
            		'<span ng-if="row.entity.contact_person==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'contact_number', displayName: 'Contact Number', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.contact_number!=\'\'">{{row.entity.contact_number}}</span>'+
            		'<span ng-if="row.entity.contact_number==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'email', displayName: 'Email', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.email!=\'\'">{{row.entity.email}}</span>'+
            		'<span ng-if="row.entity.email==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'address', displayName: 'Address', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.address!=\'\'">{{row.entity.address}}</span>'+
            		'<span ng-if="row.entity.address==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'marketing_agent_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditMarketingAgentModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteMarketingAgent(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: true,
	        enableGridMenu: true,
	        exporterCsvFilename: 'membergroup.csv'
	 };
	
	/* load default records */
	LoadMarketingAgentRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForMarketingAgent', function (event, args) {		
		LoadMarketingAgentRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddMarketingAgentModal = function(){
		$scope.entity={'marketing_agent_id':0, 'contact_website':'', 'company':'', 'contact_person':'', 'contact_number':'', 'email':'', 'address':'', 'owner':''};
		$modal.open({
            templateUrl: 'MarketingAgentModalView',
            controller: 'MarketingAgentModalCtrl',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditMarketingAgentModal = function(entity){
		$modal.open({
            templateUrl: 'MarketingAgentModalView',
            controller: 'MarketingAgentModalCtrl',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteMarketingAgent = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveMarketingAgentById',
	 	    method: "POST",
	 	    data:{marketing_agent_id:entity.marketing_agent_id}
	 	  }).success(function(data) {	 		 
	 		 LoadMarketingAgentRecords();
	 	});
    }
	
	function LoadMarketingAgentRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetMarketingAgentRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('MarketingAgentModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.MarketingAgentEntity = rowEntity;  
     
     $scope.marketingagent = {
    		 add: function () {     			     		
    		 console.info($scope.MarketingAgentEntity);
             $http.post('SaveMarketingAgents', { data: $scope.MarketingAgentEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForMarketingAgent', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Marketing Agents Controller */

/* Start Listing Conditions Controller */
app.controller('AllListingConditionsCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'listing_condition_name', displayName: 'Listing Condition Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.listing_condition_name!=\'\'">{{row.entity.listing_condition_name}}</span>'+
            		'<span ng-if="row.entity.listing_condition_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'listing_condition_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditListingConditionModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteListingCondition(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'AllListingConditions.csv'
	 };
	
	/* load default records */
	LoadListingConditionsRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForListingCondition', function (event, args) {		
		LoadListingConditionsRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddListingConditionsModal = function(){
		$scope.entity={'listing_condition_id':0, 'listing_condition_name':''};
		$modal.open({
            templateUrl: 'ListingConditionModalView',
            controller: 'ListingConditionCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditListingConditionModal = function(entity){
		$modal.open({
            templateUrl: 'ListingConditionModalView',
            controller: 'ListingConditionCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteMarketingAgent = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveListingConditionById',
	 	    method: "POST",
	 	    data:{listing_condition_id:entity.listing_condition_id}
	 	  }).success(function(data) {	 		 
	 		 LoadListingConditionsRecords();
	 	});
    }
	
	function LoadListingConditionsRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetListingConditionRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('ListingConditionCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.ListingConditionEntity = rowEntity;  
     
     $scope.listingconditions = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveListingConditions', { data: $scope.ListingConditionEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForListingCondition', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Listing Conditions Controller */
/* Start Listing Use Type Controller */
app.controller('ListingProposedUsedCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'proposed_used_name', displayName: 'proposed Used Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.proposed_used_name!=\'\'">{{row.entity.proposed_used_name}}</span>'+
            		'<span ng-if="row.entity.proposed_used_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'proposed_used_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditProposedUsedModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteProposedUsed(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'proposedUsed.csv'
	 };
	
	/* load default records */
	LoadProposedUsedRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForproposedUsed', function (event, args) {		
		LoadProposedUsedRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddProposedUsedModal = function(){
		$scope.entity={'listing_condition_id':0, 'listing_condition_name':''};
		$modal.open({
            templateUrl: 'ListingProposedUsedModalView',
            controller: 'ListingProposedUseCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditProposedUsedModal = function(entity){
		$modal.open({
            templateUrl: 'ListingProposedUsedModalView',
            controller: 'ListingProposedUseCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteProposedUsed = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveproposedUsedById',
	 	    method: "POST",
	 	    data:{proposed_used_id:entity.proposed_used_id}
	 	  }).success(function(data) {	 		 
	 		 LoadProposedUsedRecords();
	 	});
    }
	
	function LoadProposedUsedRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetproposedUsedRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

/* End Listing Conditions Controller */

app.controller('ListingProposedUseCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.ProposedUsedEntity = rowEntity;  
     
     $scope.ProposedUsed = {
    		 add: function () {     			     		
    		//console.info($scope.ProposedUsedEntity);
             $http.post('SaveProposedUsed', { data: $scope.ProposedUsedEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForproposedUsed', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Listing Conditions Controller */


/* Start Listing Use Type Controller */
app.controller('ListingUseTypesCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'use_type_name', displayName: 'Listing Use Type Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.use_type_name!=\'\'">{{row.entity.use_type_name}}</span>'+
            		'<span ng-if="row.entity.use_type_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'listing_use_type_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditListingUseTypeModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteListingUseType(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'ListingUseType.csv'
	 };
	
	/* load default records */
	LoadListingUseTypeRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForListingUseType', function (event, args) {		
		LoadListingUseTypeRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddListingUseTypeModal = function(){
		$scope.entity={'listing_condition_id':0, 'listing_condition_name':''};
		$modal.open({
            templateUrl: 'ListingUseTypesModalView',
            controller: 'ListingUseTypeCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditListingUseTypeModal = function(entity){
		$modal.open({
            templateUrl: 'ListingUseTypesModalView',
            controller: 'ListingUseTypeCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteListingUseType = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveListingUseTypeById',
	 	    method: "POST",
	 	    data:{listing_use_type_id:entity.listing_use_type_id}
	 	  }).success(function(data) {	 		 
	 		 LoadListingUseTypeRecords();
	 	});
    }
	
	function LoadListingUseTypeRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetListingUseTypesRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('ListingUseTypeCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.ListingUseTypeEntity = rowEntity;  
     
     $scope.listingusetypes = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveListingUseType', { data: $scope.ListingUseTypeEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForListingUseType', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Listing Conditions Controller */

/* Start Transaction Types Controller */
app.controller('TransactionTypesCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'transaction_name', displayName: 'Transaction Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.transaction_name!=\'\'">{{row.entity.transaction_name}}</span>'+
            		'<span ng-if="row.entity.transaction_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'transaction_type_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditTransactionTypeModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteTransactionType(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'transaction_type.csv'
	 };
	
	/* load default records */
	LoadTransactionTypeRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForTransactionType', function (event, args) {		
		LoadTransactionTypeRecords();
	});
	
	/* Add Feature Type Modal */
	$scope.AddTransactionTypesModal = function(){
		$scope.entity={'transaction_type_id':0, 'transaction_name':''};
		$modal.open({
            templateUrl: 'TransactionTypesModalView',
            controller: 'TransactionTypeCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Feature Type Modal */
	$scope.EditTransactionTypeModal = function(entity){
		$modal.open({
            templateUrl: 'TransactionTypesModalView',
            controller: 'TransactionTypeCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Member Group */  
	$scope.DeleteTransactionType = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveTransactionTypesById',
	 	    method: "POST",
	 	    data:{transaction_type_id:entity.transaction_type_id}
	 	  }).success(function(data) {	 		 
	 		 LoadTransactionTypeRecords();
	 	});
    }
	
	function LoadTransactionTypeRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetTransactionTypesRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('TransactionTypeCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.TransactionTypeEntity = rowEntity;  
     
     $scope.transactiontypes = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveTransactionTypes', { data: $scope.TransactionTypeEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForTransactionType', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Transaction Types Controller */

/* Start Building Classes Controller */
app.controller('BuildingClassesCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'name', displayName: 'Building Class Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.name!=\'\'">{{row.entity.name}}</span>'+
            		'<span ng-if="row.entity.name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'building_class_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditBuildingClassModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteBuildingClass(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'transaction_type.csv'
	 };
	
	/* load default records */
	LoadBuildingClassesRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForBuildingClass', function (event, args) {		
		LoadBuildingClassesRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddBuildingClassesModal = function(){
		$scope.entity={'building_class_id':0, 'name':''};
		$modal.open({
            templateUrl: 'BuildingClassesModalView',
            controller: 'BuildingClassesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditBuildingClassModal = function(entity){
		$modal.open({
            templateUrl: 'BuildingClassesModalView',
            controller: 'BuildingClassesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Building Class */  
	$scope.DeleteBuildingClass = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveBuildingClassesById',
	 	    method: "POST",
	 	    data:{building_class_id:entity.building_class_id}
	 	  }).success(function(data) {	 		 
	 		 LoadBuildingClassesRecords();
	 	});
    }
	
	function LoadBuildingClassesRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetBuildingClassesRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('BuildingClassesModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.BuildingClassEntity = rowEntity;  
     
     $scope.buildingclasses = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveBuildingClasses', { data: $scope.BuildingClassEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForBuildingClass', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Building Classes Controller */

/* Start Property Categories Controller */
app.controller('PropertyCategoryCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'category_name', displayName: 'Property Category Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.category_name!=\'\'">{{row.entity.category_name}}</span>'+
            		'<span ng-if="row.entity.category_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'property_category_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditPropertyCategoryModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeletePropertyCategory(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'propertycategories.csv'
	 };
	
	/* load default records */
	LoadPropertyCategoryRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForPropertyCategory', function (event, args) {		
		LoadPropertyCategoryRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddPropertyCategoryModal = function(){
		$scope.entity={'property_category_id':0, 'category_name':''};
		$modal.open({
            templateUrl: 'PropertyCategoryModalView',
            controller: 'PropertyCategoryModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditPropertyCategoryModal = function(entity){
		$modal.open({
            templateUrl: 'PropertyCategoryModalView',
            controller: 'PropertyCategoryModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Building Class */  
	$scope.DeletePropertyCategory = function (entity) {
        //alert(JSON.stringify(entity));
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemovePropertyCategoryById',
	 	    method: "POST",
	 	    data:{property_category_id:entity.property_category_id}
	 	  }).success(function(data) {	 		 
	 		 LoadPropertyCategoryRecords();
	 	});
    }
	
	function LoadPropertyCategoryRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetPropertyCategoryRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('PropertyCategoryModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.PropertyCategoryEntity = rowEntity;  
     
     $scope.propertycategory = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SavePropertyCategory', { data: $scope.PropertyCategoryEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForPropertyCategory', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Property Categories Controller */


/* Start Zones Controller */
app.controller('ZonesCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'zone_name', displayName: 'Zone Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.zone_name!=\'\'">{{row.entity.zone_name}}</span>'+
            		'<span ng-if="row.entity.zone_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'zone_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditZonesModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteZones(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'zones.csv'
	 };
	
	/* load default records */
	LoadZonesRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForZones', function (event, args) {		
		LoadZonesRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddZonesModal = function(){
		$scope.entity={'zone_id':0, 'zone_name':''};
		$modal.open({
            templateUrl: 'ZonesModalView',
            controller: 'ZonesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditZonesModal = function(entity){
		$modal.open({
            templateUrl: 'ZonesModalView',
            controller: 'ZonesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteZones = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveZonesById',
	 	    method: "POST",
	 	    data:{zone_id:entity.zone_id}
	 	  }).success(function(data) {	 		 
	 		 LoadZonesRecords();
	 	});
    }
	
	function LoadZonesRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetZonesRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('ZonesModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.ZonesEntity = rowEntity;       
     $scope.zones = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveZones', { data: $scope.ZonesEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForZones', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Zones Controller */




/* Start Window Controller */
app.controller('WindowCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'window_name', displayName: 'Window Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.window_name!=\'\'">{{row.entity.window_name}}</span>'+
            		'<span ng-if="row.entity.window_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'window_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditWindowModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteWindow(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'windows.csv'
	 };
	
	/* load default records */
	LoadWindowRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForWindow', function (event, args) {		
		LoadWindowRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddWindowModal = function(){
		$scope.entity={'window_id':0, 'window_name':''};
		$modal.open({
            templateUrl: 'WindowModalView',
            controller: 'WindowModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditWindowModal = function(entity){
		$modal.open({
            templateUrl: 'WindowModalView',
            controller: 'WindowModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteWindow = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveWindowById',
	 	    method: "POST",
	 	    data:{window_id:entity.window_id}
	 	  }).success(function(data) {	 		 
	 		 LoadWindowRecords();
	 	});
    }
	
	function LoadWindowRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetWindowRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('WindowModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.WindowEntity = rowEntity;       
     $scope.window = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveWindow', { data: $scope.WindowEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForWindow', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End window Controller */



/* Start Tenure Controller */
app.controller('TenureCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'name', displayName: 'Tenure Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.name!=\'\'">{{row.entity.name}}</span>'+
            		'<span ng-if="row.entity.name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'tenure_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditTenureModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteTenure(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'Tenures.csv'
	 };
	
	/* load default records */
	LoadTenureRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForTenure', function (event, args) {		
		LoadTenureRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddTenureModal = function(){
		$scope.entity={'tenure_id':0, 'name':''};
		$modal.open({
            templateUrl: 'TenureModalView',
            controller: 'TenureModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditTenureModal = function(entity){
		$modal.open({
            templateUrl: 'TenureModalView',
            controller: 'TenureModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteTenure = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveTenureById',
	 	    method: "POST",
	 	    data:{tenure_id:entity.tenure_id}
	 	  }).success(function(data) {	 		 
	 		 LoadTenureRecords();
	 	});
    }
	
	function LoadTenureRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetTenureRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('TenureModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.TenureEntity = rowEntity;       
     $scope.tenure = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveTenure', { data: $scope.TenureEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForTenure', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End Tenure Controller */




/* Start MasterPlan Controller */
app.controller('MasterPlanCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'name', displayName: 'Master Plan Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.name!=\'\'">{{row.entity.name}}</span>'+
            		'<span ng-if="row.entity.name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'master_plan_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditMasterPlanModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteMasterPlan(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'MasterPlans.csv'
	 };
	
	/* load default records */
	LoadMasterPlanRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForMasterPlan', function (event, args) {		
		LoadMasterPlanRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddMasterPlanModal = function(){
		$scope.entity={'master_plan_id':0, 'name':''};
		$modal.open({
            templateUrl: 'MasterPlanModalView',
            controller: 'MasterPlanModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditMasterPlanModal = function(entity){
		$modal.open({
            templateUrl: 'MasterPlanModalView',
            controller: 'MasterPlanModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteMasterPlan = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveMasterPlanById',
	 	    method: "POST",
	 	    data:{master_plan_id:entity.master_plan_id}
	 	  }).success(function(data) {	 		 
	 		 LoadMasterPlanRecords();
	 	});
    }
	
	function LoadMasterPlanRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetMasterPlanRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('MasterPlanModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.masterPlanEntity = rowEntity;       
     $scope.masterPlan = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveMasterPlan', { data: $scope.masterPlanEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForMasterPlan', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End MasterPlan Controller */




/* Start SecurityTurnstiles Controller */
app.controller('SecurityTurnstilesCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'name', displayName: ' Security Turnstiles Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.name!=\'\'">{{row.entity.name}}</span>'+
            		'<span ng-if="row.entity.name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'security_turnstiles_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditSecurityTurnstilesModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteSecurityTurnstiles(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'SecurityTurnstiless.csv'
	 };
	
	/* load default records */
	LoadSecurityTurnstilesRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForSecurityTurnstiles', function (event, args) {		
		LoadSecurityTurnstilesRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddSecurityTurnstilesModal = function(){
		$scope.entity={'security_turnstiles_id':0, 'name':''};
		$modal.open({
            templateUrl: 'SecurityTurnstilesModalView',
            controller: 'SecurityTurnstilesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditSecurityTurnstilesModal = function(entity){
		$modal.open({
            templateUrl: 'SecurityTurnstilesModalView',
            controller: 'SecurityTurnstilesModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteSecurityTurnstiles = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveSecurityTurnstilesById',
	 	    method: "POST",
	 	    data:{security_turnstiles_id:entity.security_turnstiles_id}
	 	  }).success(function(data) {	 		 
	 		 LoadSecurityTurnstilesRecords();
	 	});
    }
	
	function LoadSecurityTurnstilesRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetSecurityTurnstilesRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('SecurityTurnstilesModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.securityTurnstilesEntity = rowEntity;       
     $scope.securityTurnstiles = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveSecurityTurnstiles', { data: $scope.securityTurnstilesEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForSecurityTurnstiles', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End SecurityTurnstiles Controller */




/* Start FloorSystem Controller */
app.controller('FloorSystemCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) 
{
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
	            { field: 'name', displayName: 'Floor Systems Name', cellClass: 'left', enableColumnResizing: true ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.name!=\'\'">{{row.entity.name}}</span>'+
            		'<span ng-if="row.entity.name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'floor_system_id', displayName: 'Action', width:120, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0);" ng-click="grid.appScope.EditFloorSystemModal(row.entity)" title="Edit">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="grid.appScope.DeleteFloorSystem(row.entity)" title="Delete">Delete</a></div>'
	            }
	            
	        ],
	        paginationPageSizes: ['All',1,5, 10, 20,30,50,100,200],
	        paginationPageSize: 30,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: true,
	        exporterCsvFilename: 'FloorSystems.csv'
	 };
	
	/* load default records */
	LoadFloorSystemRecords();
	/* end ui grid configuration */
	
	// broadcast
	$scope.$on('callEventForFloorSystem', function (event, args) {		
		LoadFloorSystemRecords();
	});
	
	/* Add Building Class Modal */
	$scope.AddFloorSystemModal = function(){
		$scope.entity={'floor_system_id':0, 'name':''};
		$modal.open({
            templateUrl: 'FloorSystemModalView',
            controller: 'FloorSystemModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return $scope.entity; }
            }
        });
	}
	
	/* Edit Building Class Modal */
	$scope.EditFloorSystemModal = function(entity){
		$modal.open({
            templateUrl: 'FloorSystemModalView',
            controller: 'FloorSystemModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	rowEntity: function () { return entity; }
            }
        });
	}
	
	/* Delete Zones */  
	$scope.DeleteFloorSystem = function (entity) {
        $http({
	 	    headers: {'Content-Type': 'application/json'},
	 	    url: 'RemoveFloorSystemById',
	 	    method: "POST",
	 	    data:{floor_system_id:entity.floor_system_id}
	 	  }).success(function(data) {	 		 
	 		 LoadFloorSystemRecords();
	 	});
    }
	
	function LoadFloorSystemRecords(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetFloorSystemRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
			  //console.info(JSON.stringify(data));
		  });
	}
	
}]);

app.controller('FloorSystemModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'rowEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.floorSystemEntity = rowEntity;       
     $scope.floorSystem = {
    		 add: function () {     			     		
    		 //console.info($scope.ListingConditionEntity);
             $http.post('SaveFloorSystem', { data: $scope.floorSystemEntity})
             .success(function (data, status, headers, config) 
             {
            	 $rootScope.$broadcast('callEventForFloorSystem', { });
                 $modalInstance.close();
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
/* End FloorSystem Controller */







