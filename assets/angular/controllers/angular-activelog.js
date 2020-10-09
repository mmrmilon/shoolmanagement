app.controller('ActivelogCtrl', [ '$scope','$sce','$http','$filter','$modal', function($scope, $sce, $http, $filter, $modal) {	
	// Declare the entries
	$scope.userlist = [];
	$scope.member_id = 1;
	// Angular date picker
	$scope.strpicker = { opened: false };
	$scope.endpicker = { opened: false };
	
	$scope.openPicker = function() {
		$timeout(function() {
			$scope.picker.opened = true;
		});
	};
  
	$scope.closePicker = function() {
		$scope.picker.opened = false;
	};
	
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [

	            { field: 'id', visible:false},
	            { 
	            	field: 'action_name', displayName: 'Action Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.action_name!=\'\'">{{row.entity.action_name}}</span>'+
            		'<span ng-if="row.entity.action_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { 
	            	field: 'action_type', displayName: 'Action Type', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.action_type!=\'\'">{{row.entity.action_type}}</span>'+
            		'<span ng-if="row.entity.action_type==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { 
	            	field: 'first_name', displayName: 'User Name', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false, 
	            	cellTemplate: '<div class="ui-grid-cell-contents">'+
            		'<span ng-if="row.entity.first_name!=\'\'">{{grid.appScope.SetFullName(row.entity)}}</span>'+
            		'<span ng-if="row.entity.first_name==\'\'">&nbsp</span>'+
            		'</div>'
	            },
	            { field: 'actiondate', displayName: 'Time Stamp', cellClass: 'left', enableColumnResizing: false ,enableCellEdit: false},
	            { 
	            	field: 'id', width:80,  
	            	displayName: 'Details', cellClass: 'center',
	            	enableColumnResizing: false , enableCellEdit: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="details/{{row.entity.id}}"  title="Click to view details">View</a></div>'
	            }
	        ],
	        paginationPageSizes: ['All',10, 20,30,50,100,200],
	        paginationPageSize: 100,
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: false,
	        exporterCsvFilename: 'Activelog.csv'
	 };
	/* end ui grid configuration */
	/* Default Load */
	LoadUserList();	
	
	// read user records
    function LoadUserList(){
    	$scope.loading = true;
    	$http({
    	    headers: {'Content-Type': 'application/json'},
    	    url: 'GetUserList',
    	    method: "POST"
    	  }).success(function(data) {
    		  $scope.userlist = data;
    	  }).then(function(){
    		  LoadActivelogRecords();
    	  });
    }
    
    function LoadActivelogRecords(){
    	$http({
    	    headers: {'Content-Type': 'application/json'},
    	    url: 'GetActivelogRecords',
    	    method: "POST"
    	  }).success(function(data) {
    		  $scope.gridOptions.data = data;
    		  //console.info(JSON.stringify(data));
    		  reSize($scope.gridOptions.paginationPageSize, data.length);
    	  }).then(function (){
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
	
	$scope.SetFullName=function(data)
    {
        return data.first_name + ' ' + data.last_name;
    }
	//ActiveLog Search
	$scope.ActiveLogSearch = function () {
		$scope.loading = true;
		$scope.from_date = $filter('date')(new Date($scope.from_date), "yyyy-MM-dd");
		$scope.to_date = $filter('date')(new Date($scope.to_date), "yyyy-MM-dd");
		//console.info($scope.member_id +', '+$scope.from_date +', '+ $scope.to_date);
        $http({
	 	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	 	    url: 'GetUserActiveLogBySearchStrings',
	 	    method: "POST",
	 	    data: $.param({"member_id" : $scope.member_id, "from_date" : $scope.from_date, "to_date" : $scope.to_date})
	 	  }).success(function(data) {	 		 
	 		 $scope.gridOptions.data = data;
	 		reSize($scope.gridOptions.paginationPageSize, data.length);
	 	}).then(function(){
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
		
}]);