

app.controller('UsersCtrl', ['$scope','$http','$filter','$sce','$window', function ($scope,$http,$filter,$sce,$window) {
	/*Permission set*/
	$scope.userDeletePermission = false;
	$scope.userEditPermission = false;
	$scope.userDetailPermission = false;
    /*End Permission set*/
	
	$scope.userViews = [];
	$scope.viewDDL = "0";
	
	$http.post(baseUrl+'member/GetUserViews')
	.success(function (data, status, headers, config) {
		
			$http.post(baseUrl+'settings/GetDataFromFlashSession')
			.success(function (data1, status, headers, config) {
				//alert(JSON.stringify(data1));
			    var patt1 = /[0-9]/g;
			    var result = data1.match(patt1).join("");
				$scope.viewDDL = result;
				$scope.userViews = data;
				
				$scope.userViews.unshift({'custom_view_id':"0","view_name":"All User" });
				// default load start from here
				$scope.ViewChange($scope.viewDDL);
			})
	})	
	
	$scope.exportUsers = [];
	$scope.getUserHeader = function () { return ["User Type", "User Name","First Name","Last Name","Designation",
	    	                                         "Joinning Date","Date of Birth","Status","Mobile No",
	    	                                         "CEA Registration No"
	    	                                         ] };	
	$scope.loading = false;
		
	$scope.collumnOrder = ['member_id','member_type_name','user_name','first_name','last_name','designation','joining_date','date_of_birth','status','mobile_no','cea_registration_no'];
	$scope.gridOptions = {
		        columnDefs: [],
		        paginationPageSizes: ['All',10, 20,50,100,200],
		        paginationPageSize: 100,
		        enableColumnMenus: false,
		        enableFiltering: true,
		        enableGridMenu: false,
		        exporterCsvFilename: 'users.csv',
		        rowHeight:32
		    };
	
	$scope.gridOptions.onRegisterApi = function(gridApi){
		pageNumbers=gridApi.pagination.getPage();
	    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
	        var totalRow = $scope.gridOptions.data.length;
	        var newHeight = 100;
		    if(totalRow > pageSize)
		    	newHeight =(pageSize * 32) + 120;
		    else 
		    	newHeight =(totalRow * 32) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
	    });
	};
	//default load of users
	//LoadUserList(); //this task has been done different way go to line 23 in this page
	
	$scope.RefreshUsers = function(){
		$scope.ViewChange($scope.viewDDL);
	}
	
	
	$scope.ViewChange = function(viewId){
		$scope.loading = true;
		if(viewId == 0){
			LoadUserList();
		}else{
			
			$http({
			      headers: { 'Content-Type': 'application/json' },
			      url: 'GetUserRecordsFromView',
			      method: "POST",
		    	  data:{viewId :viewId}
			  }).success(function (data) {
				  $scope.gridOptions.data = [];
				  $scope.gridOptions.columnDefs = [];
				  GenerateDynamicCollumn(data[0]);		
				  
				  angular.forEach(data, function (value, key) {
					  if(value.date_of_birth != undefined || value.date_of_birth != 'undefined')
						  value.date_of_birth = $filter('date')(new Date(value.date_of_birth), 'dd/MM/yyyy');
					  if(value.joining_date != undefined || value.joining_date != 'undefined')
						  value.joining_date = $filter('date')(new Date(value.joining_date), 'dd/MM/yyyy');
					  $scope.gridOptions.data.push(value);
			      }); 
				  $scope.loading = false;
				  
			  });
			
		}
	}
	
	$scope.UserDelete = function(memberId){		
		var r = confirm("Are you sure want to delete the member!");
		if (r == true) {				
				$http.post('UserDelete',{ 
					memberId: memberId						
				}).success(function (data, status, headers, config) {
		            if(data == "true" || data==true){
		            	LoadUserList();
		            	alert("Successfully User Deleted");
		            	//$window.location.reload();
		            }
		            else
		            	alert("Failed");
					
		        }).error(function (data, status, headers, config) {
		           
		        });
		} 
		
	}
	
	
	$scope.ViewDelete = function(viewId){		
		var r = confirm("Are you sure want to delete the view!");
		if (r == true) {
				
				$http.post('DeleteCustomView',{ 
					viewId: viewId						
				}).success(function (data, status, headers, config) {
		            if(data ==1){
		            	alert("Successfully View Deleted");
		            	$window.location.reload();
		            }
		            else
		            	alert("Failed");
					
		        }).error(function (data, status, headers, config) {
		           
		        });
		} 
		
	}
	
	
	
	function LoadUserList(){
		$scope.loading = true;
		$http({
		      headers: { 'Content-Type': 'application/json' },
		      url: 'GetUserRecords',
		      method: "POST"
		  }).success(function (data) {
			  
			  $scope.gridOptions.data = [];
			  $scope.gridOptions.columnDefs = [];
			  
			  $scope.userDeletePermission =ProcessUserPermissionData('3958');// UserPermission.ProcessUserPermissionData('3958');
			  $scope.userEditPermission =ProcessUserPermissionData('9739');// UserPermission.ProcessUserPermissionData('9739');
			  $scope.userDetailPermission =ProcessUserPermissionData('7283');// UserPermission.ProcessUserPermissionData('7283');
			  
			  
			  GenerateDynamicCollumn(data[0]);
			  
			  angular.forEach(data, function (value, key) {
				  value.date_of_birth = $filter('date')(new Date(value.date_of_birth), 'dd/MM/yyyy');
				  value.joining_date = $filter('date')(new Date(value.joining_date), 'dd/MM/yyyy');
				  $scope.gridOptions.data.push(value);
		      });
			  
		  }).then(function () {
			  $scope.loading = false;
			  reSize($scope.gridOptions.paginationPageSize, $scope.gridOptions.data.length);
			  ExportUserRecordLoad();			  
	      });
		
		var reSize = function (paginationPageSize, totalRow) {
			//console.info(paginationPageSize+"   "+totalRow);
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 32) + 120;
		    else 
		    	newHeight =(totalRow * 32) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	
	
	function GenerateDynamicCollumn(data){
		
		angular.forEach($scope.collumnOrder, function (value, key) {
			  var flag = 0;
			  angular.forEach(data, function (value1, key1) {
				  if(key1 == value){
					  flag = 1;
				  }
			  });
			  
			  if(flag == 1){				  
				  if(value == 'member_id' ){	
					  if($scope.userDeletePermission == true &&  $scope.userEditPermission == true){
						  $scope.gridOptions.columnDefs.push({ 
				            	field: 'member_id', width:80, displayName: '', cellClass: 'center',enableColumnResizing: false, enableFiltering: false, enableCellEdit: false, 
				            	cellTemplate:'<div class="ui-grid-cell-contents">'+
				            					'<span ng-if="row.entity.member_id!=\'\' && row.entity.member_id!=null">'+
													'<a  href ="javascript:void()" ng-click="grid.appScope.UserDelete(row.entity.member_id)"> Del </a> |'+
													'<a  href ="edituser/{{row.entity.member_id}}" > Edit </a>'+
												'</span>'+
												'<span ng-if="row.entity.member_id==\'\' || row.entity.member_id==null">&nbsp</span>'+
											'</div>'				            	
				            });						  
					  }
					  else if($scope.userDeletePermission == true &&  $scope.userEditPermission == false){
						  $scope.gridOptions.columnDefs.push({ 
				            	field: 'member_id',width:50, displayName: '', cellClass: 'center',enableColumnResizing: false, enableFiltering: false, enableCellEdit: false, 
				            	cellTemplate:'<div class="ui-grid-cell-contents">'+
				            					'<span ng-if="row.entity.member_id!=\'\' && row.entity.member_id!=null"><a  href ="javascript:void()" ng-click="grid.appScope.UserDelete(row.entity.member_id)"> Del </a></span>'+
				            					'<span ng-if="row.entity.member_id==\'\' || row.entity.member_id==null">&nbsp</span>'+
				            					'</div>'				            	
				            });						  
					  }
					  else if($scope.userDeletePermission == false &&  $scope.userEditPermission == true){
						  $scope.gridOptions.columnDefs.push({ 
				            	field: 'member_id',width:50, displayName: '', cellClass: 'center',enableColumnResizing: false, enableFiltering: false, enableCellEdit: false, 
				            	cellTemplate:'<div class="ui-grid-cell-contents">'+
					            		'<span ng-if="row.entity.member_id!=\'\' && row.entity.member_id!=null"><a  href ="edituser/{{row.entity.member_id}}" > Edit </a></span>'+
					            		'<span ng-if="row.entity.member_id==\'\' || row.entity.member_id==null">&nbsp</span>'+
					            		'</div>'				            	
				            });						  
					  }	
				  }
				  else if(value == 'member_type_name'){
					  $scope.gridOptions.columnDefs.push({ 
						  field: 'member_type_name',  displayName: 'USER TYPE',  cellClass: 'left', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.member_type_name!=\'\' && row.entity.member_type_name!=null"> {{row.entity.member_type_name}}</span>'+
			            		'<span ng-if="row.entity.member_type_name==\'\' || row.entity.member_type_name==null">&nbsp</span>'+
			            		'</div>'
					  })
				  }
				  else if(value == 'user_name'){
					  $scope.gridOptions.columnDefs.push({ 
						  		field: 'user_name',  displayName: 'USER NAME',  cellClass: 'left', enableCellEdit: false,
						  		cellTemplate: 
				            		'<div class="ui-grid-cell-contents">'+
				            		'<span ng-if="row.entity.user_name!=\'\' && row.entity.user_name!=null"> {{row.entity.user_name}}</span>'+
				            		'<span ng-if="row.entity.user_name==\'\' || row.entity.user_name==null">&nbsp</span>'+
				            		'</div>'
						  })
				  }
				  else if(value == 'first_name'){
					  
					  if( $scope.userDetailPermission == true){
					  
						  $scope.gridOptions.columnDefs.push({ 
				            	field: 'first_name',  displayName: 'FIRST NAME', cellClass: 'left', enableCellEdit: false ,
				            		cellTemplate: 
					            		'<div class="ui-grid-cell-contents">'+
					            		'<span ng-if="row.entity.first_name!=\'\' && row.entity.first_name!=null"><a href ="userdetails/{{row.entity.member_id}}"> {{row.entity.first_name}}</a></span>'+
					            		'<span ng-if="row.entity.first_name==\'\' || row.entity.first_name==null">&nbsp</span>'+
					            		'</div>'
				            })
					  }
					  else if($scope.userDetailPermission == false){
						  
						  $scope.gridOptions.columnDefs.push({ 
				            	field: 'first_name',  displayName: 'FIRST NAME', cellClass: 'left', enableCellEdit: false ,
				            		cellTemplate: 
					            		'<div class="ui-grid-cell-contents">'+
					            		'<span ng-if="row.entity.first_name!=\'\' && row.entity.first_name!=null"> {{row.entity.first_name}}</span>'+
					            		'<span ng-if="row.entity.first_name==\'\' || row.entity.first_name==null">&nbsp</span>'+
					            		'</div>'
				            })
					  }
				  }
				  else if(value == 'last_name'){
					  $scope.gridOptions.columnDefs.push({ 
						  field: 'last_name',  displayName: 'LAST NAME',  cellClass: 'left', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.last_name!=\'\' && row.entity.last_name!=null"> {{row.entity.last_name}}</span>'+
			            		'<span ng-if="row.entity.last_name==\'\' || row.entity.last_name==null">&nbsp</span>'+
			            		'</div>'
					  
					  })
				  }
				  else if(value == 'designation'){
					  $scope.gridOptions.columnDefs.push({ 
						  field: 'designation',  displayName: 'DESIGNATION',  cellClass: 'left', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.designation!=\'\' && row.entity.designation!=null">{{row.entity.designation}}</span>'+
			            		'<span ng-if="row.entity.designation==\'\' || row.entity.designation==null">&nbsp</span>'+
			            		'</div>'
						  
					  })
				  }
				  else if(value == 'joining_date'){
					  $scope.gridOptions.columnDefs.push({ 
			            	field: 'joining_date',  displayName: 'JOINING DATE', cellClass: 'left', enableCellEdit: false,
			            	cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.joining_date!=\'\' && row.entity.joining_date.trim()!=null ">{{row.entity.joining_date}}</span>'+
			            		'<span ng-if="row.entity.joining_date==\'\' || row.entity.joining_date.trim()==null ">&nbsp</span>'+
			            		'</div>'			            	
			            })
				  }
				  else if(value == 'date_of_birth'){
					  $scope.gridOptions.columnDefs.push({ 
						  field: 'date_of_birth',  displayName: 'DATE OF BIRTH',  cellClass: 'left', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.date_of_birth!=\'\' && row.entity.date_of_birth.trim()!=null">{{row.entity.date_of_birth}}</span>'+
			            		'<span ng-if="row.entity.date_of_birth==\'\' || row.entity.date_of_birth.trim()==null">&nbsp</span>'+
			            		'</div>'
					  })
				  }
				  else if(value == 'status'){
					  $scope.gridOptions.columnDefs.push({ 
						  field: 'status',  displayName: 'STATUS',  cellClass: 'center', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+ 
			            		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
			            		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
			            		'</div>'
					  
					  })
				  }
				  else if(value == 'mobile_no'){
					  $scope.gridOptions.columnDefs.push({
						  field: 'mobile_no',  displayName: 'MOBILE NO',  cellClass: 'left', enableCellEdit: false,
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.mobile_no!=\'\' && row.entity.mobile_no!=null">{{row.entity.mobile_no}}</span>'+
			            		'<span ng-if="row.entity.mobile_no==\'\' || row.entity.mobile_no==null">&nbsp</span>'+
			            		'</div>'  
					  })
				  }
				  else if(value == 'cea_registration_no'){
					  $scope.gridOptions.columnDefs.push( { 
						  field: 'cea_registration_no',  displayName: 'CEA REGISTRATION NO',  cellClass: 'left', enableCellEdit: false, 
						  cellTemplate: 
			            		'<div class="ui-grid-cell-contents">'+
			            		'<span ng-if="row.entity.cea_registration_no!=\'\' && row.entity.cea_registration_no!=null">{{row.entity.cea_registration_no}}</span>'+
			            		'<span ng-if="row.entity.cea_registration_no==\'\' || row.entity.cea_registration_no==null">&nbsp</span>'+
			            		'</div>'
					  })
				  }
	            
			  }
	      }); 
	}
	
	 $scope.ExportAllUsers = function () {    
         console.info("has been exported...");
     };
     
     
     function ExportUserRecordLoad()
 	{
 		
 		// Load Property Records
 		$http({
 		    headers: {'Content-Type': 'application/json'},
 		    url: 'GetUserRecords',
 		    method: "POST"
 		  })
 		  .success(function(data) {	
 			 //console.info(data);
 		    angular.forEach(data, function (datum, index) {
 		    	//
 	            $scope.exportUsers.push({ 
 	            	'member_type_name': datum.member_type_name, 
 	            	'user_name': datum.user_name, 
 	            	'first_name': datum.first_name, 
 	            	'last_name': datum.last_name, 
 	            	'designation': datum.designation,
 	            	'joining_date': datum.joining_date,
 	            	'date_of_birth': datum.date_of_birth,
 	            	'status': datum.status,
 	            	'mobile_no': datum.mobile_no,
 	            	'cea_registration_no':datum.cea_registration_no
 	            	});
 	        	});
 			   
 		    //console.info(data);
 		  }).then(function(){		  
 		  });
 	}
	  
}]);





app.controller('CreateUsersCtrl', ['$scope','$http','$filter','Upload','$modal','$rootScope','$window', '$location',
function ($scope,$http,$filter,Upload,$modal,$rootScope, $window,$location) {
	
	$rootScope.repeatPassword ="";
	$rootScope.picFile= {name:"" };
	$rootScope.user ={			
			user_name : "",
			password:"",
			crm_owner_name: "",
			title :"",
			first_name :"",
			last_name : "",
			cea_licence_no : "",
			cea_registration_no :"",
			department :"",
			designation :"",
			member_type_id :"",
			date_of_birth :"",
			joining_date :"",
			contact_no :"",
			mobile_no :"",
			email :"",
			profile_photo : "",	
			crmId:""
	}
	
	$scope.CRMOwnerName = []
	$scope.userTypes = []
	$scope.titles = ['Dr.','Mdm.','Miss.','Mr.','Mrs.','Ms','Rev.'];
	
	$http({
	      headers: { 'Content-Type': 'application/json' },
	      url: 'GetCRMOwnerName',
	      method: "POST"
	  }).success(function (data) {
		  $scope.CRMOwnerName = data;
	}); 
	
	$http({
	      headers: { 'Content-Type': 'application/json' },
	      url: 'GetSameUserTypeName',
	      method: "POST"
	  }).success(function (data) {
		  $scope.userTypes = data;
	}); 
		
	
		
   //Angular date picker
   $scope.dobpicker = { opened: false };
   $scope.jdpicker = { opened: false };
   
   $scope.openPicker = function() {
     $timeout(function() {
       $scope.picker.opened = true;
     });
   };
   
   $scope.closePicker = function() {
     $scope.picker.opened = false;
   };
   
   $scope.GeneratePassword = function(){
	   $modal.open({
           templateUrl: 'GeneratePasswordModalView',
           controller:  'GeneratePasswortModalCtrl',
           
           windowClass: 'generate-password-modal',           
           resolve: {
           		genratePassEntity: function () { return ""; }
           }
       }); 
   }   
   
	
	$scope.SaveUserData = function(file){
		console.log($rootScope.user);
		
		//alert("t"+$rootScope.repeatPassword +"t"+$rootScope.user.password+"t");
		if($rootScope.user.password.trim() == $rootScope.repeatPassword.trim()){
			Upload.upload({
	            url: 'SaveUser',
	            data: {file: file, 'data':  $rootScope.user}
	        }).success(function (data, status, headers, config) {
	        	//alert($location.host());
	        	if(data == true || data == 'true'){
	        		alert("Successfully Saved.");
	        		//alert($location.host());
	        		$window.location.href = 'users';
	        		
	        		$rootScope.repeatPassword ="";
	        		//$rootScope.picFile = null;
	        		$rootScope.picFile= {name:"" };
		            $rootScope.user ={			
		        			user_name : "",
		        			password:"",
		        			crm_owner_name: "",
		        			title :"",
		        			first_name :"",
		        			last_name : "",
		        			cea_licence_no : "",
		        			cea_registration_no :"",
		        			department :"",
		        			designation :"",
		        			member_type_id :"",
		        			date_of_birth :"",
		        			joining_date :"",
		        			contact_no :"",
		        			mobile_no :"",
		        			email :"",
		        			profile_photo : "",	
		        			crmId:""
		        	}
	        	}
	        	else{
	        		alert(data);	        		
	        	}
            }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
	        
			// This commit code is used for progress bar. in this we don't need the bar	        
	       /* .then(function (resp) {
	            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	        	
	        	
	        }, function (resp) {
	           // console.log('Error status: ' + resp.status);
	        }, function (evt) {
	           // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });	*/
		}
		else{
			alert("Password and Repeat Password must be same.");
		}
	}	
}]);

app.controller('EditUsersCtrl', ['$scope','$http','$filter','Upload','$modal','$rootScope','$window', '$location',
 function ($scope,$http,$filter,Upload,$modal,$rootScope, $window,$location) {
 	
	
	$scope.changeSelfPhotoPermission = false;
	$scope.changeSelfPhotoPermission = ProcessUserPermissionData('9301');
	/** Try to get member id **/
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/member');
	var url=temp.substring(0, index)+'/member';
	$scope.url=temp.substring(0, index);
	var memberId=result[result.length-1];
	
	$rootScope.user=[];
	$scope.password ="";
	$scope.repeatPassword ="";
	$scope.picFile= {name:"" };
	

	GetUserDataBasedId();
	
 		
 	
 	$scope.CRMOwnerName = []
 	$scope.userTypes = []
 	$scope.titles = ['Dr.','Mdm.','Miss.','Mr.','Mrs.','Ms','Rev.'];
 	
 	$http({
 	      headers: { 'Content-Type': 'application/json' },
 	      url:  url+'/GetCRMOwnerName',
 	      method: "POST"
 	  }).success(function (data) {
 		  $scope.CRMOwnerName = data;
 	}); 
 	
 	$http({
 	      headers: { 'Content-Type': 'application/json' },
 	      url:  url+'/GetSameUserTypeName',
 	      method: "POST"
 	  }).success(function (data) {
 		  $scope.userTypes = data;
 	}); 
 		
 	
 		
    //Angular date picker
    $scope.dobpicker = { opened: false };
    $scope.jdpicker = { opened: false };
    
    $scope.openPicker = function() {
      $timeout(function() {
        $scope.picker.opened = true;
      });
    };
    
    $scope.closePicker = function() {
      $scope.picker.opened = false;
    };
    
   
    
 	// Start update of user
 	$scope.UpdateUser = function(){
 		
 		/*var postUserData = [];
 		angular.forEach($rootScope.user, function(value, key){
 			postUserData.push({			
 	 				user_name : value.user_name,
 	 				crm_owner_name: value.crm_owner_name,
 	 				title :value.title,
 	 				first_name :value.first_name,
 	 				last_name : value.last_name,
 	 				cea_licence_no : value.cea_licence_no,
 	 				cea_registration_no : value.cea_registration_no,
 	 				department :value.department,
 	 				designation :value.designation,
 	 				member_id : value.member_id,
 	 				member_type_id :value.member_type_id,
 	 				date_of_birth :value.date_of_birth,
 	 				joining_date :value.joining_date,
 	 				contact_no :value.contact_no,
 	 				mobile_no :value.mobile_no,
 	 				email :value.email,
 	 				crmId:value.crmId,
 	 				account_id:value.account_id,
 	 				account_name:value.account_name,
 	 				status : value.status,
 	 				modified_by: value.modified_by,
 	 				modified_on : value.modified_on 	 				
 	 		})
 		});
 		*/
 		//console.log(postUserData[0]);
 		
 		$http({
 	 	      headers: { 'Content-Type': 'application/json' },
 	 	      url:  url+'/SaveUpdateUser',
 	 	      method: "POST",
 	 	      data:{user:$rootScope.user[0]}
 	 	  }).success(function (data) {
 	 		  if(data=="true" || data==true)
 	 			  alert("Successfully Updated");
 	 		  else{
 	 			 alert("Failed"); 
 	 		  }
 	 	}); 
 	}	
 	
 	$scope.ResetPassword = function(){ 			
 		if($scope.password == $scope.repeatPassword){
	 			
	 		$http({
	 	 	      headers: { 'Content-Type': 'application/json' },
	 	 	      url:  url+'/ResetPassword',
	 	 	      method: "POST",
	 	 	      data:{postData:{password:$scope.password, memberId:memberId}}
	 	 	  }).success(function (data) {
	 	 		  if(data=="true" || data==true){
	 	 			  alert("Successfully Updated");
	 	 			$scope.password ="";
	 	 			$scope.repeatPassword ="";
	 	 		  }
	 	 		  else{
	 	 			 alert("Failed"); 
	 	 		  }
	 	 	}); 
 		}else{
 			alert("Password and Repeat Password must be same.")
 			
 		}
 	}
 	
 	$scope.photoFile= {name:"" }; 	
 	$scope.ChangePhoto = function(file){
 		
 		Upload.upload({
            url: url+'/ChangePhoto',
            data: {file: file,  memberId:memberId}
        }).success(function (data, status, headers, config) {
        	if(data == true || data == "true"){
        		alert("Successfully Updated.");
        		$window.location.href= memberId;
        		GetUserDataBasedId();
        	}
        	else{
        		alert(data);	        		
        	}
        }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
 	}
 	
 	
 	
 	
 	
 	function GetUserDataBasedId(){
 		$http({
	      headers: { 'Content-Type': 'application/json' },
	      url: url+'/GetUserDataBasedId',
	      method: "POST",
	      data:{memberId:memberId }
	  }).success(function (data) {
		  $rootScope.user = data;
		  
		  
	  }); 
 	}
 	
 }]);


//Start add announcement modal Controller
app.controller('GeneratePasswortModalCtrl', ['$modalInstance', '$http', '$filter', '$modal', '$rootScope', '$scope', 'genratePassEntity',
 function ($modalInstance, $http, $filter, $modal, $rootScope, $scope, genratePassEntity) {
	$scope.passValue =randomPassword(12);
	$rootScope.repeatPassword ="";
	$rootScope.picFile= {name:"" };
	
	$scope.GeneratePass = function(){		
		$scope.passValue =  randomPassword(12);
	}

   
     $scope.SubmitPassword = function (){
    	 $rootScope.user.password = $scope.passValue;
    	 $rootScope.repeatPassword = $scope.passValue;
    	 $scope.cancel();
     }
     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };
     
     function randomPassword(length) {
    	    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    	    var pass = "";
    	    for (var x = 0; x < length; x++) {
    	        var i = Math.floor(Math.random() * chars.length);
    	        pass += chars.charAt(i);
    	    }
    	    return pass;
    	}

 }]);
// End add announcement modal Controller





/* Import Property Controller*/
app.controller('UserImportCtrl', ['$scope','$http','Upload','$window','$sce', function ($scope,$http,Upload,$window,$sce) {

	$scope.userFile='';
	$scope.userMappingPage=true;
	$scope.userImportSuccessPage=false;
	$scope.userMappingConfirmationPage=false;
	$scope.result=[];
	$scope.MappingFields=[];
	$scope.FieldsMapping={
			user_name:'',
			password:'',
			user_type:'',
			joining_date:'',
			date_of_birth:'',
			title:'',	
			first_name:'',			
			last_name:'',			
			designation:'',		
			cea_registration_no:'',
			cea_licence_no:'',
			department_group:'',
			contact_no:'',
			mobile_no:'',
			email:''
		}
	
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/member');
	url=temp.substring(0, index)+'/member';
	
	if(temp.indexOf('/importusermaping')!=-1)
	{
		LoadMappingDropDown();
	}
	
	$scope.SaveImportData = function(){
		 
		 Upload.upload({
	            url: 'SaveImportFile',
	            headers: {'Content-Type': $scope.userFile.type},
	            method: 'POST',
	            data: {file: $scope.userFile}
		        }).then(function (resp) {
		        	if(resp.data)
		        		$window.location.href=url+'/importusermaping';
		        }, function (resp) {
		            console.log('Error status: ' + resp.status);
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	      });
	}
	
	
	$scope.CheckUnselectMappingListing=function()
	{
		//$scope.loading = true;
		//$scope.disabled= true;
		
		$scope.UnSelectedMappingField='';
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'CheckUnselectMappingListing',
	        method: "post",
	        data:{data:JSON.stringify($scope.FieldsMapping)}
	    }).success(function (data) {
	    	$scope.UnSelectedMappingField = $sce.trustAsHtml(data);
	    	$scope.userMappingPage=false;
	    	$scope.userMappingConfirmationPage=true;
	    	$scope.userImportSuccessPage=false;
	    });
	}
	$scope.FinalSaveImportData=function()
	{   
		//$scope.loading = true;
		//$scope.disabled= true;
		
		$scope.ListingImportSuccessfullMessage='';
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'FinalImportListingSubmit',
	        method: "post",
	        data:{data:JSON.stringify($scope.FieldsMapping)}
	    }).success(function (data) {
	    	//alert("test");
	    	//$scope.ListingImportSuccessfullMessage = $sce.trustAsHtml(data);
	    	$scope.userMappingPage=false;
	    	$scope.userMappingConfirmationPage=false;
	    	$scope.userImportSuccessPage=true;
	    	$scope.result=data;
	    	
	    	  
	    	//console.info(JSON.stringify(data));
	    });
	}   
	
	$scope.BackToImport=function(){
		$window.location.href = url+'/importuser';
	};

	$scope.BackToMapping=function(){
		$scope.userMappingPage=true;
    	$scope.userMappingConfirmationPage=false;
    	$scope.userImportSuccessPage=false;
	};
	$scope.BackToUser=function(){
		$window.location.href = url+'/users';
	};
	
	$scope.ImportCancel= function(){		
		$window.location.href = url+'/users';
	}
	
	function LoadMappingDropDown()
	{
		$http({
            headers: { 'Content-Type': 'application/json' },
            url: 'GetMappingFields',
            method: "POST"
        }).success(function (data) {
        	//console.info(JSON.stringify(data));
        	$scope.MappingFields = data;
        });
	}
}]);










app.controller('UserDetailCtrl', ['$scope','$http','$filter','Upload','$modal','$rootScope','$window', '$location',
 function ($scope,$http,$filter,Upload,$modal,$rootScope, $window,$location) {
 	
	/** Try to get member id **/
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/member');
	var url=temp.substring(0, index)+'/member';
	$scope.url=temp.substring(0, index);
	var memberId=result[result.length-1];
	
	$scope.urlMemberid = memberId;
	
	//alert(memberId);
	
	$rootScope.user=[];
	$scope.password ="";
	$scope.repeatPassword ="";
	$scope.picFile= {name:"" };
	

	GetUserDataBasedId();
	$scope.enableedit = true;
 		
	$scope.memberGroups =[];
 	$scope.CRMOwnerName = []
 	$scope.userTypes = []
 	$scope.titles = ['Dr.','Mdm.','Miss.','Mr.','Mrs.','Ms','Rev.'];
 	
 	$http({
 	      headers: { 'Content-Type': 'application/json' },
 	      url:  url+'/GetCRMOwnerName',
 	      method: "POST"
 	  }).success(function (data) {
 		  $scope.CRMOwnerName = data;
 	}); 
 	
 	$http({
 	      headers: { 'Content-Type': 'application/json' },
 	      url:  url+'/GetSameUserTypeName',
 	      method: "POST"
 	  }).success(function (data) {
 		 $scope.userTypes = []
 		 if(data.length>0)
 		  $scope.userTypes = data;
 	}); 
 		
 	$http({
	      headers: { 'Content-Type': 'application/json' },
	      url:  url+'/MemberGroup',
	      method: "POST"
	  }).success(function (data) {
		  $scope.memberGroups = [];
		  angular.forEach(data, function (value, index) {
			  if(value.member_id == 0)
				  value['selected'] = false;
			  else
				  value['selected'] = true;
			  $scope.memberGroups.push(value);
		  });
		  
	});
 	
 		
    //Angular date picker
    $scope.dobpicker = { opened: false };
    $scope.jdpicker = { opened: false };
    
    $scope.openPicker = function() {
      $timeout(function() {
        $scope.picker.opened = true;
      });
    };
    
    $scope.closePicker = function() {
      $scope.picker.opened = false;
    };
    
   
    
 	// Start update of user
 	$scope.UpdateUser = function(){
 		
 		$http({
 	 	      headers: { 'Content-Type': 'application/json' },
 	 	      url:  url+'/SaveUpdateUser',
 	 	      method: "POST",
 	 	      data:{user:$rootScope.user[0]}
 	 	  }).success(function (data) {
 	 		  if(date=="true")
 	 			  alert("Successfully Updated");
 	 		  else{
 	 			 alert("Failed"); 
 	 		  }
 	 	}); 
 	}	
 	
 	$scope.ResetPassword = function(){ 			
 		if($scope.password == $scope.repeatPassword){
	 			
	 		$http({
	 	 	      headers: { 'Content-Type': 'application/json' },
	 	 	      url:  url+'/ResetPassword',
	 	 	      method: "POST",
	 	 	      data:{postData:{password:$scope.password, memberId:memberId}}
	 	 	  }).success(function (data) {
	 	 		  if(data==true){
	 	 			  alert("Successfully Updated");
	 	 			$scope.password ="";
	 	 			$scope.repeatPassword ="";
	 	 		  }
	 	 		  else{
	 	 			 alert("Failed"); 
	 	 		  }
	 	 	}); 
 		}else{
 			alert("Password and Repeat Password must be same.")
 			
 		}
 	}
 	
 	$scope.photoFile= {name:"" }; 	
 	$scope.ChangePhoto = function(file){
 		
 		Upload.upload({
            url: url+'/ChangePhoto',
            data: {file: file,  memberId:memberId}
        }).success(function (data, status, headers, config) {
        	if(data == true){
        		alert("Successfully Updated.");
        		$window.location.href= memberId;
        		GetUserDataBasedId();
        		//alert($location.host());
        		//$window.location.href = 'users';
        		
        	}
        	else{
        		alert(JSON.stringify(data));	        		
        	}
        }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
 	}
 	
 	$scope.AssignGroup = function(){		
 		
 		var selectedItem =[];
 		angular.forEach($scope.memberGroups, function (value, index) {
			  if(value.selected == true){
				  selectedItem.push(value);
			  }
		  });
 		
 		
 
 		$http({
 		      headers: { 'Content-Type': 'application/json' },
 		      url: url+'/AssignGroup',
 		      method: "POST",
 		      data:{memberGroup: JSON.stringify(selectedItem), memberId:memberId }
 		  }).success(function (data) {
 			  if(data == true || data == 'true')
 			  	alert("Successfully Updated");	  
 			  
 		  }); 
 		
 		//alert(JSON.stringify($scope.memberGroups));
 	}
 	
 	
 	
 	function GetUserDataBasedId(){
 		$http({
	      headers: { 'Content-Type': 'application/json' },
	      url: url+'/GetUserDataBasedId',
	      method: "POST",
	      data:{memberId:memberId }
	  }).success(function (data) {
		  $rootScope.user = data;
		  
		  
	  }); 
 	}
 	
 }]);









































