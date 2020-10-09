var app = angular.module('ngTeacherApp',['ngTouch','ngAnimate','ui.grid','ngSanitize','ui.grid.pagination','ui.grid.exporter','ui.bootstrap','ui.grid.autoResize','ui.grid.resizeColumns']);

app.controller('ManageTeacherCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	// Declare the entries
	$scope.teachers = [];
	
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
		        { field: 'teacher_id', visible: false},
		        { field: 'full_name', name: 'Name', width:200, cellClass: 'text-left', enableCellEdit: false },
	            { field: 'designation', name: 'Designation', width:200, cellClass: 'text-left', enableCellEdit: false},
	            { field: 'joining_date', name: 'Joined On', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'address', name: 'Address', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'gender_name', name: 'Gender', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'date_of_birth', name: 'Date of Birth', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'mobile_number', name: 'Mobile No.', width:150, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'religion_name', name: 'Religion', width:100, cellClass: 'text-center', enableCellEdit: false },	 
	            { field: 'status', name: 'Status', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { 
	            	field: 'teacher_id', width:80, displayName: 'ACTION', cellClass: 'text-center', enableColumnResizing: false , enableCellEdit: false,
	            	cellTemplate: '<button id="editBtn" type="button" class="btn btn-success button-small" ng-click="grid.appScope.OpenEditModal(row.entity)" ><i class=" fa fa-pencil"></i> Edit</button> '
	            }
	        ],	        
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: false
	 };
	/* end ui grid configuration */	
	
	// call default record load function
	LoadTeacherRecords();
	
	// broadcast
	$scope.$on('callChangeEventFor', function (event, args) {		
		LoadTeacherRecords();
	});
	
	/* Load Records */
	function LoadTeacherRecords(){
		$scope.loading = true;
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetTeacherRecords',
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
		    /*
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 30) + 120;
		    else 
		    	newHeight =(totalRow * 30) + 120;
		    */
		    newHeight =(totalRow * 30) + 50;
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
		
	//Open Add Modal View 
	$scope.OpenAddModal = function () {
		$scope.entity = {
				teacher_id:0, first_name:'', last_name:'', address:'', gender_id:'', 
				religion_id:'', date_of_birth:'', phone_number:'', mobile_number:'',joining_date:'',
				leaving_date:'', designation_id:'', profile_photo:'',is_active:0
		};
		console.info($scope.entity);
        $modal.open({
            templateUrl: 'AddModalView',
            controller: 'ModalViewCtrl',
            windowClass: 'teacher-modal',
            resolve: {
            	rowEntity: function (){ return $scope.entity;}
            }
        });
    }
	
	//Open Edit Modal View 
	$scope.OpenEditModal = function (entity) {
		console.info(entity);
		$modal.open({
            templateUrl: 'AddModalView',
            controller: 'ModalViewCtrl',
            resolve: {
            	rowEntity: function (){ return entity;}
            }
        });       
    }
	
	//Open Details Modal View 
	$scope.OpenDeatilModal = function (entity) {
		console.info(entity);
		$modal.open({
            templateUrl: 'DetailModalView',
            controller: 'DeatilsModalViewCtrl',
            windowClass: 'details-modal',
            resolve: {
            	rowEntity: function (){ return entity;}
            }
        });       
    }
}]);

//Start add modal Controller
app.controller('ModalViewCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope','rowEntity',
function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
	$scope.TeacherEntity = rowEntity;
     
	$scope.designationlist = [];
     $scope.genderlist = [];
     $scope.religionlist = [];
     
     // Angular date picker
	  $scope.picker = { opened: false };	  
	  $scope.openPicker = function() {
	    $timeout(function() {
	      $scope.picker.opened = true;
	    });
	  };

	  $scope.joindatepicker = { opened: false };	  
	  $scope.openPicker = function() {
	    $timeout(function() {
	      $scope.joindatepicker.opened = true;
	    });
	  };
	  
	  $scope.closePicker = function() {
	    $scope.picker.opened = false;
	  };
	  
	  
     //Load Dropdown Values 
	  $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetDesignationList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.designationlist = data;
		  }).then(function(){
			  $http({
				    headers: {'Content-Type': 'application/json'},
				    url: 'GetGenderList',
				    method: "POST"
				  }).success(function(data) {		  
					  $scope.genderlist = data;
				  }).then(function(){			  
					  $http({
						    headers: {'Content-Type': 'application/json'},
						    url: 'GetReligionList',
						    method: "POST"
						  }).success(function(data) {		  
							  $scope.religionlist = data;
						  });
				  });
		  });
	  
     // Submit Teacher Information
     $scope.teacher = {
			  save: function () {            
    			 console.info($scope.TeacherEntity);  
    			 $scope.TeacherEntity.date_of_birth = $filter('date')(new Date($scope.TeacherEntity.date_of_birth), 'yyyy-MM-dd');
    			 $scope.TeacherEntity.joining_date = $filter('date')(new Date($scope.TeacherEntity.joining_date), 'yyyy-MM-dd');
	             $http.post('SaveTeacherInfo', { data: $scope.TeacherEntity})
	             .success(function (data, status, headers, config) 
	             {
	            	 $rootScope.$broadcast('callChangeEventFor', { });
	                 $modalInstance.close();
	                 
	             }).error(function (data, status, headers, config) {
	             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End add modal Controller

//Start Details modal Controller
app.controller('DeatilsModalViewCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope','rowEntity',
function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, rowEntity) {
	$scope.DetailsEntity = rowEntity;   
     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };
 }]);
// End add modal Controller