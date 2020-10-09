var app = angular.module('ngAlumniApp',['ngTouch','ngAnimate','ng-fusioncharts','ui.bootstrap','ngSanitize', 'ui.grid','ui.grid.pagination','ui.grid.exporter','ui.grid.autoResize', 'ui.grid.resizeColumns']);
app.controller('AlumniCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	$scope.piechartarray = [];
	// Angular date picker
	  $scope.picker = { opened: false };	  
	  $scope.openPicker = function() {
	    $timeout(function() {
	      $scope.picker.opened = true;
	    });
	  };
	  
	  $scope.closePicker = function() {
	    $scope.picker.opened = false;
	  };
	
	  $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'alumni/GetAlumniSummary',
		    method: "POST"
		  }).success(function(data) {
			  angular.forEach(data, function (value, key) {	
		    		$scope.piechartarray.push({ 'label': value.passing_year, 'value': value.total_alumni });
		         });
		  });
	  
	// chart details
	$scope.myDataSource = {
		    chart: {
		        caption: "Sonaichandi High School",
		        subcaption: "Alumni Summary",
		        startingangle: "120",
		        showlabels: "1",
		        showlegend: "1",
		        enablemultislicing: "0",
		        slicingdistance: "15",
		        showpercentvalues: "1",
		        showpercentintooltip: "0",
		        plottooltext: "Year : $label Total Student : $datavalue",
		        theme: "fint"
		    },
		    data: $scope.piechartarray
		}
}]);

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


app.controller('AlumniRegisterCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	$scope.passingyearlist = [];
    $scope.genderlist = [];
	$scope.RegisterEntity = {
			register_id:0, ssc_roll_no:'', full_name:'', nick_name:'', passing_year:'', 
			date_of_birth:'', gender_id:'', blood_group:'', address:'',city:'',
			country:'', email:'', mobile_no:'',password:'', confirm_password:'',
			profession:'', designation:'', company:'', company_address:''
	};
	
	// Angular date picker
	  $scope.picker = { opened: false };	  
	  $scope.openPicker = function() {
	    $timeout(function() {
	      $scope.picker.opened = true;
	    });
	  };
	  
	  $scope.closePicker = function() {
	    $scope.picker.opened = false;
	  };
	  
	// Submit Alumni Information
    $scope.alumni = {
    		save: function () {    
   			 $scope.RegisterEntity.date_of_birth = $filter('date')(new Date($scope.RegisterEntity.date_of_birth), 'yyyy-MM-dd');   	         
   			 console.info($scope.RegisterEntity); 
             $http.post('SaveAlumniInfo', { data: $scope.RegisterEntity})
             .success(function (data, status, headers, config) 
             {
            	 if(data)
            		 alert('Saved');
            	 else
            		 alert(data);
            	 
            	 console.info(JSON.stringify(data)+', '+status);
             }).error(function (data, status, headers, config) {
             });
    	}
    }
    
    //Load Dropdown Values 
    $http({
	    headers: {'Content-Type': 'application/json'},
	    url: 'GetGenderList',
	    method: "POST"
	  }).success(function(data) {		  
		  $scope.genderlist = data;
	  });

    var years = {};
    var year = new Date().getFullYear();
    $scope.passingyearlist.push({'passing_year':year,'year_name':year});
    for(var i = 1; i <= 50; i++) {
    	$scope.passingyearlist.push({'passing_year':(year - i),'year_name':(year - i)});
    }
    //console.info(JSON.stringify($scope.passingyearlist));
    
}]);