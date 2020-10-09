app.controller('SubjectCtrl', [ '$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {	
	// Declare the entries
	$scope.subjects = [];
	
	/* ui grid configuration */
	$scope.gridOptions = {
	        columnDefs: [

	            { field: 'subject_id', visible:false},
	            { field: 'subject_name', displayName: 'Subject', cellClass: 'text-left', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'subject_code', displayName: 'Subject Code', cellClass: 'text-center', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'class_name', displayName: 'Class', cellClass: 'text-center', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'section_name', displayName: 'Section/Group', cellClass: 'text-center', enableColumnResizing: false ,enableCellEdit: false},
	            { field: 'is_optional', displayName: 'Is Optional?', cellClass: 'text-center', enableColumnResizing: false ,enableCellEdit: false,
	              cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.is_optional==1" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.is_optional==0" src="../assets/images/no.png">'+
	            		'</div>'
	            },
	            { 
	            	field: 'subject_id', width:80, displayName: 'ACTION', cellClass: 'text-center', enableColumnResizing: false , enableCellEdit: false,
	            	cellTemplate: '<button id="editBtn" type="button" class="btn btn-success button-small" ng-click="grid.appScope.EditSubjectModal(row.entity)" ><i class=" fa fa-pencil"></i> Edit</button> '
	            }
	        ],	        
	        enableColumnMenus: false,
	        enableFiltering: false,
	        enableGridMenu: false
	 };
	/* end ui grid configuration */	
	LoadSubjectRecords() // default load
	// broadcast
	$scope.$on('callChangeEventForSubject', function (event, args) {		
		LoadSubjectRecords();
	});
	
	//Add Subject Modal View 
	$scope.OpenAddSubjectModal = function () {
        $modal.open({
            templateUrl: 'AddSubjectModalView',
            controller: 'AddSubjectModalCtrl'
        });
    }
	
	//Edit Announcement Modal View 
	$scope.EditSubjectModal = function (entity) {
		console.info(entity);
		$modal.open({
            templateUrl: 'EditSubjectModalView',
            controller: 'EditSubjectModalCtrl',
            resolve: {
            	editSubjectEntity: function (){ return entity;}
            }
        });       
    }
		
	function LoadSubjectRecords(){
		$scope.loading = true;
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetSubjectList',
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
	
}]);

//Start add announcement modal Controller
app.controller('AddSubjectModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope) {
     $scope.SubjectEntity = {subject_id: 0, subject_name:'', subject_code:'', class_id: 0, section_id: 0, is_optional: 0};
     $scope.classlist = [];
     $scope.sectionlist = [];
     //Load Dropdown Values
     $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetClassList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.classlist = data;
			  $scope.classlist.unshift({'class_id':0, 'class_name':'--- select class ---'});
			  /*if(member_group_id == 0)
				  $scope.member_group_id = (typeof($scope.usertypelist[0]) == 'undefind'? 0 : $scope.usertypelist[0].member_group_id);
			  else
				  $scope.member_group_id = member_group_id;
			  */
			  //console.info($scope.member_group_id);
		  }).then(function(){			  
			  $http({
				    headers: {'Content-Type': 'application/json'},
				    url: 'GetSectionList',
				    method: "POST"
				  }).success(function(data) {		  
					  $scope.sectionlist = data;
					  $scope.sectionlist.unshift({'section_id':0, 'section_name':'--- select section ---'});
					  /*if(member_group_id == 0)
						  $scope.member_group_id = (typeof($scope.usertypelist[0]) == 'undefind'? 0 : $scope.usertypelist[0].member_group_id);
					  else
						  $scope.member_group_id = member_group_id;
					  */
					  //console.info($scope.member_group_id);
				  });
		  });
     
     // Submit Subject Information
     $scope.subject = {
    		 add: function () {            
    			 console.info($scope.SubjectEntity);    
    			 
	             $http.post('SaveSubject', { data: $scope.SubjectEntity})
	             .success(function (data, status, headers, config) 
	             {
	            	 $rootScope.$broadcast('callChangeEventForSubject', { });
	                 $modalInstance.close();
	                 
	             }).error(function (data, status, headers, config) {
	             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End add announcement modal Controller

//Start edit announcement modal Controller
app.controller('EditSubjectModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', '$rootScope', 'editSubjectEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, $rootScope, editSubjectEntity) {
	console.info(editSubjectEntity.is_optional);
	$scope.SubjectEntity = editSubjectEntity; 
	$scope.SubjectEntity.is_optional = (editSubjectEntity.is_optional == 0? false : true);
	//Load Dropdown Values
    $http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetClassList',
		    method: "POST"
		  }).success(function(data) {		  
			  $scope.classlist = data;
			  $scope.classlist.unshift({'class_id':0, 'class_name':'--- select class ---'});
		  }).then(function(){			  
			  $http({
				    headers: {'Content-Type': 'application/json'},
				    url: 'GetSectionList',
				    method: "POST"
				  }).success(function(data) {		  
					  $scope.sectionlist = data;
					  $scope.sectionlist.unshift({'section_id':0, 'section_name':'--- select section ---'});
				  });
		  });
     
     $scope.subject = {
    		 edit: function () {            
    			 //console.info(JSON.stringify($scope.AnnouncementEntity));             
	             $http.post('SaveSubject', { data: $scope.SubjectEntity})
	             .success(function (data, status, headers, config) 
	             {
	            	 $rootScope.$broadcast('callChangeEventForSubject', { });
	                 $modalInstance.close();
	                 
	             }).error(function (data, status, headers, config) {
	             });
         }
     }

     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End edit announcement modal Controller