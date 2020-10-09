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