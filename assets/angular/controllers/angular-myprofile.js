
app.controller('MyProfileCtrl', ['$scope','$http','$filter','Upload','$modal','$rootScope','$window', '$location',
 function ($scope,$http,$filter,Upload,$modal,$rootScope, $window,$location) {
 	
	/** Try to get member id **/
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/member');
	var url=temp.substring(0, index)+'/member';
	//$scope.url=temp.substring(0, index);
	var memberId= globalMemeberId;//result[result.length-1];
	
	
	
	$rootScope.user=[];
	$scope.currentPassword = ""
	$scope.newPassword ="";	
	$scope.repeatPassword ="";
	$scope.picFile= {name:"" };
	
	GetUserDataBasedId(memberId);
	$scope.enableedit = true;
	$scope.EditEnable = function(){
		$scope.enableedit = !$scope.enableedit;		
	}
 		
 	
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
 		
 		$http({
 	 	      headers: { 'Content-Type': 'application/json' },
 	 	      url:  url+'/SaveUpdateUser',
 	 	      method: "POST",
 	 	      data:{user:$rootScope.user[0]}
 	 	  }).success(function (data) {
 	 		  if(data==true || data=="true")
 	 			  alert("Successfully Updated");
 	 		  else{
 	 			 alert("Failed"); 
 	 		  }
 	 	}); 
 	}	
 	
 	$scope.MyProfileResetPassword = function(){ 	
 		//alert("test");
 		if($scope.newPassword == $scope.repeatPassword){
	 			
	 		$http({
	 	 	      headers: { 'Content-Type': 'application/json' },
	 	 	      url:  url+'/MyProfileResetPassword',
	 	 	      method: "POST",
	 	 	      data:{postData:{currentPassword:$scope.currentPassword,newPassword:$scope.newPassword, memberId:memberId}}
	 	 	  }).success(function (data) {
	 	 		  if(data==true || data=="true"){
	 	 			  alert("Successfully Updated");
	 	 			$scope.currentPassword ="";
	 	 			$scope.newPassword ="";
	 	 			$scope.repeatPassword ="";
	 	 		  }
	 	 		  else if(data==false || data=="false"){
	 	 			 alert("Failed"); 
	 	 		  }
	 	 		  else{
	 	 			alert("Current Password Mismatch"); 
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
        		$window.location.href = baseUrl+"member/myprofile";
        		GetUserDataBasedId(memberId);
        		
        		
        	}
        	else{
        		alert(data);	        		
        	}
        }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
 	}
 	
 	
 	
 	
 	
 	function GetUserDataBasedId(memberId){
 		//alert(memberId);
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

