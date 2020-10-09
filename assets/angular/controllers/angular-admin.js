var app = angular.module('ngAdminApp',['ngTouch','ngAnimate','ui.grid','ui.grid.pagination','ui.grid.exporter','ui.bootstrap','ngSanitize', 'textAngular', 'ui.grid.autoResize', 'ui.grid.resizeColumns']);

app.controller('AdministrativeCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	// Declare the entries
	$scope.messages = [];	
	LoadMessages();
	
	// broadcast
	$scope.$on('callChangeEventForMessage', function (event, args) {		
		LoadMessages();
	});
	
	function LoadMessages(){
		$scope.loading = true;
		$http({
			headers: {'Content-Type': 'application/json'},
		    url: 'administrator/GetMessageRecords',
		    method: "POST"
		  }).success(function(data) {
			  $scope.messages = data;
		  }).then(function (){
			  $scope.loading = false;
	      });
	}
	
	//Open Add Modal View 
	$scope.OpenNewMessageModal = function () {
		$scope.entity = {message_id:0, member_id:0, msg_title:'', msg_details:'', msg_date:''};
        $modal.open({
            templateUrl: 'AddNewMessageModalView',
            controller: 'AddNewMessageModalCtrl',
            windowClass: 'message-modal',
            resolve: {
            	rowEntity: function (){ return $scope.entity;}
            }
        });
    }
	
	//Open Edit Modal View 
	$scope.OpenMessageModal = function (entity) {
		console.info(entity);
		$modal.open({
            templateUrl: 'AddNewMessageModalView',
            controller: 'AddNewMessageModalCtrl',
            windowClass: 'message-modal',
            resolve: {
            	rowEntity: function (){ return entity;}
            }
        });       
    }
	
	/*End message section from here .... */
}]);

//Start Message Modal Controller
app.controller('AddNewMessageModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope','rowEntity',
     function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
     $scope.MessageEntity = rowEntity; //{message_id:0, member_id:0, msg_title:'', msg_details:'', msg_date:''};
     
     // Submit Enrolment Information
     $scope.messages = {
    		 save: function () {            
    			 console.info($scope.MessageEntity);  
	             $http.post('administrator/SaveMessages', { data: $scope.MessageEntity})
	             .success(function (data, status, headers, config) 
	             {
	            	 $rootScope.$broadcast('callChangeEventForMessage', { });
	                 $modalInstance.close();
	                 
	             }).error(function (data, status, headers, config) {
	             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End Message Modal Controller