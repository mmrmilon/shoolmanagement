var app = angular.module('ngEventApp',['ngTouch','ngAnimate','ui.bootstrap','ngSanitize','mgcrea.ngStrap']);

app.controller('EventsCtrl', [ '$scope', '$http', '$filter', function($scope, $http, $filter) {	
    $scope.eventlist = [];
	$scope.EventEntity = {
			event_id:0, member_id:0, start_date:'', end_date:'', start_time:'', 
			end_time:'', event_location:'', event_name:'', event_details:''
	};
	
	// Angular date picker
	$scope.time = new Date(1970, 0, 1, 10, 30, 40);
	$scope.start_date = { opened: false };
	$scope.end_date = { opened: false };
	$scope.picker = { opened: false };	  
	$scope.openPicker = function() {
	  $timeout(function() {
	    $scope.picker.opened = true;
	  });
	};
	  
	$scope.closePicker = function() {
	  $scope.picker.opened = false;
	};
	
	// Load event list
	LoadEventList();	
	  
	// Submit Alumni Information
    $scope.event = {
    		save: function () {    
   			 $scope.EventEntity.start_date = $filter('date')(new Date($scope.EventEntity.start_date), 'yyyy-MM-dd');
   			 $scope.EventEntity.end_date = $filter('date')(new Date($scope.EventEntity.end_date), 'yyyy-MM-dd');
   			 $scope.EventEntity.start_time = $filter('date')(new Date($scope.EventEntity.start_time), 'HH:mm a');
  			 $scope.EventEntity.end_time = $filter('date')(new Date($scope.EventEntity.end_time), 'HH:mm a');
   			 console.info($scope.EventEntity); 
             
   			 $http.post('SaveEventInfo', { data: $scope.EventEntity})
             .success(function (data, status, headers, config) 
             {
            	 if(data)
            	 {
            		 alert('Saved');
            		 LoadEventList();
            	 }
            	 else
            		 alert(data);
            	 
            	 console.info(JSON.stringify(data)+', '+status);
             }).error(function (data, status, headers, config) {
             });
             
    	}
    }
    
    $scope.edit = function (entity){
    	console.info(entity);
    	$scope.EventEntity.event_id = entity.event_id;
    	$scope.EventEntity.member_id = entity.member_id;
    	$scope.EventEntity.start_date = entity.start_date;
    	$scope.EventEntity.end_date = entity.end_date;
    	$scope.EventEntity.start_time = entity.start_time;
    	$scope.EventEntity.end_time = entity.end_time;
    	$scope.EventEntity.event_location = entity.event_location;
    	$scope.EventEntity.event_name = entity.event_name;
    	$scope.EventEntity.event_details = entity.event_details;
    }
    
    $scope.load = function () {
    	LoadEventList();
    }
        
    function LoadEventList(){
    	$scope.eventlist = [];
    	$http({
    	    headers: {'Content-Type': 'application/json'},
    	    url: 'GetEventList',
    	    method: "POST"
    	  }).success(function(data) {
    		  angular.forEach(data, function (value, key) {	
    			value.start_time = new Date( $filter('date')(new Date(value.start_date), 'dd/MM/yyyy') + ' ,' + value.start_time).getTime();
    			value.end_time = new Date( $filter('date')(new Date(value.end_date), 'dd/MM/yyyy') + ' ,' + value.end_time).getTime();
  	    		$scope.eventlist.push(value);
  	         });
   			  //console.info($scope.eventlist);
    	  });
    }
    
}]);