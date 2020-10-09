
app.controller('UserGroupCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) {	
	// Declare the entries
    $scope.loading = false;
	$scope.usertypelist = [];
	$scope.member_group_id = 0;
	
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
				{ field: 'member_id', width:50, displayName:'', cellClass: 'center',enableFiltering: false,
					enableColumnResizing: false , enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.is_checked" type="checkbox"/></div>'
				},
	            { 
					field: 'first_name', displayName: 'First Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents">'+
		              '<span ng-if="row.entity.first_name!=\'\'">{{row.entity.first_name}}</span>'+
		              '<span ng-if="row.entity.first_name==\'\'">&nbsp</span>'+
		              '</div>'
					
	            },
	            { 
	            	field: 'last_name', displayName: 'Last Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents">'+
		              '<span ng-if="row.entity.last_name!=\'\'">{{row.entity.last_name}}</span>'+
		              '<span ng-if="row.entity.last_name==\'\'">&nbsp</span>'+
		              '</div>'
		              
	            },
	            { 
	            	  field: 'member_type_name', displayName: 'User Type', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents">'+
		              '<span ng-if="row.entity.member_type_name!=\'\' && row.entity.member_type_name!=null">{{row.entity.member_type_name}}</span>'+
		              '<span ng-if="row.entity.member_type_name==\'\' || row.entity.member_type_name==null">&nbsp</span>'+
		              '</div>'
				 },
	            { 
					 field: 'joining_date', displayName: 'Joining Date', cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
						cellTemplate: '<div class="ui-grid-cell-contents">'+
			              '<span ng-if="row.entity.joining_date!=\'\'">{{row.entity.joining_date}}</span>'+
			              '<span ng-if="row.entity.joining_date==\'\'">&nbsp</span>'+
			              '</div>'
			     },
	            { 
			    	 field: 'date_of_birth', displayName: 'Date Of Birth', cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
						cellTemplate: '<div class="ui-grid-cell-contents">'+
			              '<span ng-if="row.entity.date_of_birth!=\'\'">{{row.entity.date_of_birth}}</span>'+
			              '<span ng-if="row.entity.date_of_birth==\'\'">&nbsp</span>'+
			              '</div>'
			              
	            },
	            { 
	            	field: 'email', displayName: 'Email', width:250, cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
					cellTemplate: '<div class="ui-grid-cell-contents">'+
		              '<span ng-if="row.entity.email!=\'\'">{{row.entity.email}}</span>'+
		              '<span ng-if="row.entity.email==\'\'">&nbsp</span>'+
		              '</div>'
		              
	            },
	            { field: 'status', displayName: 'Status', width:60, cellClass: 'center', enableColumnResizing: false ,enableCellEdit: false,
	            	enableFiltering: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
	            		'</div>'}
	        ],
	        paginationPageSizes: ['All',5,10,20,30,50,100,200],
	        paginationPageSize: 100,
	        enableColumnMenus: false,
	        enableFiltering: true,
	        enableGridMenu: false
	 };
	
	/* load default records */
	LoadUserTypeRecords($scope.member_group_id); 
	/* end ui grid configuration */
	
	/* broadcast */ 
	$scope.$on('callEventForUserGroup', function (event, args) {	
		//console.info('broadcast: '+ args.member_group_id);
		LoadUserTypeRecords(args.member_group_id);
	});
	
	// Filter User Group
	$scope.FilterUserGroup = function () {
		//console.info('change selection: '+ $scope.member_group_id);
		LoadUserGroupRecords($scope.member_group_id); // Load User Group List
	}	
	
	$scope.gridOptions.onRegisterApi = function(gridApi){
		pageNumbers=gridApi.pagination.getPage();
	    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
	        $scope.gridOptions.headerCheck=false;
	        
	        var totalRow = $scope.gridOptions.data.length;
	        var newHeight = 100;
		    if(totalRow > pageSize)
		    	newHeight =(pageSize * 30) + 120;
		    else 
		    	newHeight =(totalRow * 30) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
	    });
	};
	
	// Load User Group Dropdown Data
	function LoadUserTypeRecords(member_group_id)
	{
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetUserTypeRecords',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.usertypelist = data;
			  $scope.usertypelist.unshift({'member_group_id':0, 'member_group_name':'All User', 'weight':0, 'is_super_admin':0 });
			  if(member_group_id == 0)
				  $scope.member_group_id = (typeof($scope.usertypelist[0]) == 'undefind'? 0 : $scope.usertypelist[0].member_group_id);
			  else
				  $scope.member_group_id = member_group_id;
			  
			  //console.info($scope.member_group_id);
		  }).then(function(){			  
			  LoadUserGroupRecords($scope.member_group_id); // Load User Group List
		  });
	}
	
	// Load User Group Data
	function LoadUserGroupRecords(member_group_id){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetUserGroupRecords',
		    method: "POST",
		    data: $.param({"member_type_id" : member_group_id})
		  }).success(function(data) {
			  angular.forEach(data,function(value,key){
				  if(value.is_checked == 1)
					  value.is_checked = true;
				  else
					  value.is_checked = false;
			  });
			  $scope.gridOptions.data = data;
			  reSize($scope.gridOptions.paginationPageSize, data.length);
			  //console.info(JSON.stringify(data));
		  }).then(function () {
			  $scope.loading = false;
	      });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 30) + 120;
		    else 
		    	newHeight =(totalRow * 30) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	
	/* Create User Group Modal Popup */ 
	$scope.OpenCreateUserGroupModal = function(){
		var usergroup = $filter('filter')($scope.gridOptions.data, { is_checked: true });
		//console.info(JSON.stringify(usergroup));
		$modal.open({
            templateUrl: 'CreateUserGroupModalView',
            controller: 'CreateUserGroupModalCtrl',
            windowClass: 'user-group-modal-window',
            resolve: {
            	createUserGroupEntity: function () { return $filter('filter')($scope.gridOptions.data, { is_checked: true }); }
            }
        });
	}
	
	/* Update User Group */
	$scope.UpdateUserGroup = function(){
		$scope.UserGroup = [];
		var filteredUusers = $filter('filter')($scope.gridOptions.data, { is_checked: true });
		angular.forEach(filteredUusers, function(value,key)
		{
			$scope.UserGroup.push({'group_id': $scope.member_group_id,'member_id': value.member_id})
		});
		//console.info($scope.UserGroup);
		
		$http.post('UpdateUserGroup', { data: $scope.UserGroup})
        .success(function (data, status, headers, config) 
        {
        	if(data == "true" || data == true)
    		{
        		alert("Successfully Group Updated");      
    		}
        }).error(function (data, status, headers, config) {
        });
	}
	
}]);

//Start Create User Group Modal View Controller
app.controller('CreateUserGroupModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'createUserGroupEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, createUserGroupEntity) {
     $scope.UserGroupEntity = createUserGroupEntity;     
     $scope.UserGroupEntity.group_name = '';
     $scope.UserGroup = [];
     $scope.creategroup = {
    		 add: function () {            
    			 //console.info($scope.UserGroupEntity);
    			 angular.forEach($scope.UserGroupEntity, function(value,key){
				 $scope.UserGroup.push({'group_name': $scope.UserGroupEntity.group_name,'member_id': value.member_id})
				 });
    			 
             $http.post('SaveUserGroup', { data: $scope.UserGroup})
             .success(function (data, status, headers, config) 
             {
            	 //console.info(data);
                 $modalInstance.close();
            	 $rootScope.$broadcast('callEventForUserGroup', { member_group_id: data});
                 
             }).error(function (data, status, headers, config) {
             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End add announcement modal Controller

