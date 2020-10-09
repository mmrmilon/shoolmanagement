var app = angular.module('ngStudentApp',['ngTouch','ngAnimate','ui.grid','ngSanitize','ui.grid.pagination','ui.grid.exporter','ui.bootstrap','ui.grid.autoResize','ui.grid.resizeColumns']);

app.controller('StudentCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	// Declare the entries
	$scope.students = [];
	$scope.class_id = 0;
	$scope.section_id = 0;
	
	// call default record load function
	LoadParameters();
	
	$scope.SearchStudents = function(){
		LoadStudentRecords();
	}
	
	
	function LoadParameters(){
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'student/GetClassList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.classlist = data;
		  }).then(function(){
			  $http({
				    headers: {'Content-Type': 'application/json'},
				    url: 'student/GetSectionList',
				    method: "POST"
				  }).success(function(data) {		  
					  $scope.sectionlist = data;
				  }).then(function(){
					  LoadStudentRecords();
				  });
		  });
	}
	
	function LoadStudentRecords(){
		$scope.loading = true;
		$http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'student/StudentRecords',
		    method: "POST",
		    data: $.param({"class_id" : $scope.class_id, "section_id": $scope.section_id})
		  }).success(function(data) {
			  $scope.students  = data;
		  }).then(function (){
			  $scope.loading = false;
	      });
	}
	
}]);


app.controller('ManageStudentCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	// Declare the entries
	$scope.classlist = [];
	$scope.sectionlist = [];
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [
		        //{ field: 'profile_photo', name: 'Photo', cellClass: 'text-center', cellTemplate:"<img style=\"width:30px; border-radius: 50%;\" ng-src=\"{{grid.appScope.getPhotoUrl(row.entity)}}\" lazy-src>", width: 80},
		        { field: 'roll_no', name: 'Roll No.', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'first_name', name: 'Full Name', width:200, cellClass: 'text-left', enableCellEdit: false , cellTemplate: '<span>{{grid.appScope.ConcateFullName(row.entity)}}</span>' },
	            { field: 'father_name', name: 'Father Name', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'mother_name', name: 'Mother Name', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'address', name: 'Address', width:200, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'mobile_no', name: 'Mobile No.', width:150, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'date_of_birth', name: 'Date Of Birth', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'gender_name', name: 'Gender', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { field: 'religion_name', name: 'Religion', width:100, cellClass: 'text-center', enableCellEdit: false },	 
	            { field: 'status', name: 'Status', width:100, cellClass: 'text-center', enableCellEdit: false },
	            { 
	            	field: 'student_id', width:80, displayName: 'ACTION', cellClass: 'text-center', enableColumnResizing: false , enableCellEdit: false,
	            	cellTemplate: '<button id="editBtn" type="button" class="btn btn-success button-small" ng-click="grid.appScope.OpenEditModal(row.entity)" ><i class=" fa fa-pencil"></i> Edit</button> '
	            }
	        ],	        
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: false
	 };
	/* end ui grid configuration */	
	
	// call default record load function
	LoadStudentRecords();
	
	// broadcast
	$scope.$on('callChangeEventFor', function (event, args) {		
		LoadStudentRecords();
	});
	
	/* Load Records */
	function LoadStudentRecords(){
		$scope.loading = true;
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetStudentRecords',
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
	
	$scope.getPhotoUrl = function (){
    	return "http://localhost:8014/sonaichandihighschool/assets/dist/img/avatar5.png";
    }
	$scope.ConcateFullName = function (rowentry) {
        return rowentry.first_name + ' ' + rowentry.last_name;
    }
	
	//Open Add Modal View 
	$scope.OpenAddModal = function () {
        $modal.open({
            templateUrl: 'AddModalView',
            controller: 'AddModalCtrl'
        });
    }
	
	//Open Edit Modal View 
	$scope.OpenEditModal = function (entity) {
		console.info(entity);
		$modal.open({
            templateUrl: 'AddModalView',
            controller: 'EditModalCtrl',
            resolve: {
            	editEntity: function (){ return entity;}
            }
        });       
    }
	
	/*Start student manage section from here .... */
	
	/* ui grid configuration */
	$scope.gridOptionsManageStudent = {
	        columnDefs: [
		        { field: 'enrolment_id', width:50, displayName:'', cellClass: 'center',enableFiltering: false,
					enableColumnResizing: false , enableCellEdit: false,
					headerCellTemplate:'<input class="margin-left-17" ng-model="grid.options.headerCheck" ng-click="grid.appScope.SelectAllStudent(grid.options.headerCheck)" type="checkbox"/>',
					cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.is_checked" type="checkbox"/></div>'
				},
		        { field: 'roll_no', name: 'Roll No.', cellClass: 'text-center', enableCellEdit: false },
	            { field: 'full_name', name: 'Full Name', cellClass: 'text-left', enableCellEdit: false },
	            { field: 'cgpa', name: 'Grade Point', cellClass: 'text-center', enableCellEdit: false },
	            { field: 'grade', name: 'Grade', cellClass: 'text-center', enableCellEdit: false },
	            { field: 'position', name: 'Position', cellClass: 'text-center', enableCellEdit: false }
	        ],	        
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: false,
	        headerCheck:false
	 };
	/* end ui grid configuration */
	
	$scope.new_student = true;
	$scope.class_id = 0;
	$scope.section_id = 0;
	$scope.ManageStudents = function(){			
		//console.info($scope.new_student +', '+ $scope.class_id +', '+$scope.section_id);	
		$scope.loading = true;
		$http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetEnrolmentStudents',
		    method: "POST",
		    data: $.param({"new_student" : $scope.new_student, "class_id" : $scope.class_id, "section_id": $scope.section_id})
		  }).success(function(data) {
			 angular.forEach(data,function(value,key){
				  if(value.is_checked == 1)
					  value.is_checked = true;
				  else
					  value.is_checked = false;
			  });
			  $scope.gridOptionsManageStudent.data = data;
			  reSize($scope.gridOptionsManageStudent.paginationPageSize, data.length);
		  }).then(function (){
			  $scope.loading = false;
	      });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    newHeight =(totalRow * 30) + 50;
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
		  
		  // load list of class
		  if($scope.new_student)
		  {
			  $http({
				    headers: {'Content-Type': 'application/json'},
				    url: 'GetClassList',
				    method: "POST"
				  }).success(function(data) {		  
					  $scope.classlist = data;
				  }).then(function(){
					  $http({
						    headers: {'Content-Type': 'application/json'},
						    url: 'GetSectionList',
						    method: "POST"
						  }).success(function(data) {		  
							  $scope.sectionlist = data;
						  });
				  });
		}
	}
	
	// This event will be fire when check box change event will be occured
	$scope.LoadEnrolmentStudent = function(){			
		if($scope.new_student){
		$scope.loading = true;
		$http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetEnrolmentStudents',
		    method: "POST",
		    data: $.param({"new_student" : $scope.new_student, "class_id" : $scope.class_id, "section_id": $scope.section_id})
		  }).success(function(data) {
			 angular.forEach(data,function(value,key){
				  if(value.is_checked == 1)
					  value.is_checked = true;
				  else
					  value.is_checked = false;
			  });
			  $scope.gridOptionsManageStudent.data = data;
			  reSize($scope.gridOptionsManageStudent.paginationPageSize, data.length);
		  }).then(function (){
			  $scope.loading = false;
	      });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    newHeight =(totalRow * 30) + 50;
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
		}
	}
	
	$scope.ProceedtoNextClass=function()
	{
		$scope.readystudents = [];
		var filteredEnrolment = $filter('filter')($scope.gridOptionsManageStudent.data, { is_checked: true });
		angular.forEach(filteredEnrolment, function(value,key){
			$scope.readystudents.push({'enrolment_id': value.enrolment_id, 'position': value.position});
			console.info(value.enrolment_id +', '+ value.position);
		});	
		
		$http.post('ProceedToNextClasses', { data: $scope.readystudents})
        .success(function (data, status, headers, config) 
        {
        	console.info(data);
        }).error(function (data, status, headers, config) {
        });
	}
	
	
	$scope.SelectAllStudent=function(is_checked)
	{
		angular.forEach($scope.gridOptionsManageStudent.data,function(value,key){
			value.is_checked=is_checked;
    	});
	}
	/*End student manage section from here .... */
	
	
}]);

//Start add modal Controller
app.controller('AddModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope',function ($modalInstance, $http, $filter, $modal, $rootScope, $scope) {
     $scope.EnrolmentEntity = {
    		 enrolment_id:0,roll_no:0,first_name:'',last_name:'',parents_id:'',
    		 father_name:'',mother_name:'',address:'',mobile_no:'',gender_id:'',
    		 religion_id:'',date_of_birth:'',profile_photo:'',enrolment_year:'',status_id:0
     };
     $scope.parentlist = [];
     $scope.genderlist = [];
     $scope.religionlist = [];
     $scope.statuslist = [];
     
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
	  
     //Load Dropdown Values 
	  $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetParentList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.parentlist = data;
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
						  }).then(function(){
							  $http({
								    headers: {'Content-Type': 'application/json'},
								    url: 'GetStatusList',
								    method: "POST"
								  }).success(function(data) {		  
									  $scope.statuslist = data;
								  });
						  });
				  });
		  });
     
     
     // Submit Enrolment Information
     $scope.enrolment = {
    		 add: function () {            
    			 console.info($scope.EnrolmentEntity);  
    			 $scope.EnrolmentEntity.date_of_birth = $filter('date')(new Date($scope.EnrolmentEntity.date_of_birth), 'yyyy-MM-dd');
	             $http.post('SaveStudentEnrolment', { data: $scope.EnrolmentEntity})
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

//Start edit modal Controller
app.controller('EditModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', '$rootScope', 'editEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, $rootScope, editEntity) {
	console.info(editEntity);
	$scope.EnrolmentEntity = editEntity;
	
	//Load Dropdown Values
	//Load Dropdown Values 
	  $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetParentList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.parentlist = data;
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
						  }).then(function(){
							  $http({
								    headers: {'Content-Type': 'application/json'},
								    url: 'GetStatusList',
								    method: "POST"
								  }).success(function(data) {		  
									  $scope.statuslist = data;
								  });
						  });
				  });
		  });
     
     $scope.enrolment = {    		 
    		 add: function () { //add function used because of same modal view used for add and edit enrolment information       
    			 $scope.EnrolmentEntity.date_of_birth = $filter('date')(new Date($scope.EnrolmentEntity.date_of_birth), 'yyyy-MM-dd');             
	             $http.post('SaveStudentEnrolment', { data: $scope.EnrolmentEntity})
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
// End edit modal Controller