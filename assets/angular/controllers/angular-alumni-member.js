app.controller('AlumniMembersCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	/* ui grid configuration */
	$scope.gridOptions = {
		    paginationPageSizes: [25, 50, 75, 100],
		    paginationPageSize: 100,
	        columnDefs: [
		        { field: 'register_id', visible: false},
	            { field: 'ssc_roll_no', name: 'Roll No.', width:80, cellClass: 'text-center', enableCellEdit: false},
		        { field: 'full_name', name: 'Full Name', width:200, cellClass: 'text-left', enableCellEdit: false },
		        { field: 'nick_name', name: 'Nick Name', width:150, cellClass: 'text-left', enableCellEdit: false },
	            { field: 'mobile_no', name: 'Mobile No.', width:150, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'email', name: 'Email Address', width:230, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'passing_year', name: 'Passing Year', cellClass: 'text-center', enableCellEdit: false }
	        ],	       
	        enableColumnMenus: false,
	        enableFiltering: true,
	        enableGridMenu: false  
	 };
	/* end ui grid configuration */	
	
	// call default record load function
	LoadAlumniList();
	
	// broadcast
	$scope.$on('callChangeEventFor', function (event, args) {		
		LoadAlumniList();
	});
	
	/* Load Records */
	function LoadAlumniList(){
		$scope.loading = true;
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetAlumniList',
		    method: "POST"
		  }).success(function(data) {
			  $scope.gridOptions.data = data;
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
		    //newHeight =(totalRow * 30) + 50;
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
}]);