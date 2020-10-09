app.controller('DashboardExportCtrl', [ '$scope','$rootScope','$sce','$http','$filter','$modal','GlobalSetting','UserPermission', 
function($scope, $rootScope, $sce, $http, $filter,$modal,GlobalSetting,UserPermission) {
	/*
     * Export to CSV
     * Created by mizan on 16/11/2015.
     */
	
	$scope.exportProperties = [];
	$scope.exportListing = [];
	$scope.getPropertyHeader = function () { return ["Property Name", "Property Address","Zone","Year of Top","Building Class",
	                                         "Building Size","Average Floor Plate","Total No of Floors","Season Parking Charges (pm)",
	                                         "Mondays through Fridays","Saturdays","Sundays and Public Holidays",
	                                         "Ext. Charges","Transport Notes","Building Description","Anchored Tenants"
	                                         ] };
     $scope.getListingHeader = function () { 
    	 return ['Property Name','Property Address','Property Owner','Zone','Year Of Top','Building Class',
            	'Building Size','Average Floor Plate','Total No of Floors','Season Parking Charges (pm)',
            	'Mondays through Fridays','Saturdays','Sundays and Public Holidays','Ext. Charges',
            	'Transport Notes','Building Description','Anchored Tenants','Property Category','Status',
            	'Contact Company','Contact Person','Contact Number','Contact Email','Contact Address',
            	'Available Units','Gross Rate ($ psfpm)','Gross ($ pm)','Available Date',
            	'Transaction Type','Type of Use','Last Update Date','Commission Rate','Remarks'] 
    };    
    
     $scope.ExportAllProperties = function () {    	
         console.info("has been exported...");
     };
     
     $scope.ExportAllListing = function () {    	
         console.info("has been exported...");
     };
	
	/* Start Data Sync */
	$scope.SyncNow = function(){ 
        $http.post('../settings/DoSyncByModule', { 'module': 'Potential', 'refresh': "true"})
        .success(function (data, status, headers, config){
        	console.info(data);
        	alert('Please wait! it may take some time!');
        }).error(function (data, status, headers, config) {
        	alert(data);
        });
    }
	/* End Data Sync */
	
	// Load Property Records
	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: '../property/GetPropertyRecords',
	    method: "POST"
	  })
	  .success(function(data) {	
	    angular.forEach(data, function (datum, index) {
	    	//console.info(datum.anchored_tenants);
            $scope.exportProperties.push({ 'property_name': datum.property_name, 
            	'property_address': datum.property_address, 
            	'zone_name': datum.zone_name, 
            	'year_of_top': datum.year_of_top, 
            	'building_class_name': datum.building_class_name,
            	'building_size': datum.building_size,
            	'average_floor_plate': datum.average_floor_plate,
            	'total_no_of_floors': datum.total_no_of_floors,
            	'season_parking_charge': datum.season_parking_charge,
            	'monday_friday_ac':datum.monday_friday_ac,
            	'saturday_ac' : datum.saturday_ac,
            	'sundays_public_holidays_ac' : datum.sundays_public_holidays_ac,
            	'ext_charges_ac' : datum.ext_charges_ac,
            	'transport_notes' : datum.transport_notes,
            	'building_description' : datum.building_description,
            	'anchored_tenants' : datum.anchored_tenants
            	});
        	});
		   
	    //console.info(data);
	  }).then(function(){
		  ExportListingRecordLoad();		  
	  });
	
	function ExportListingRecordLoad(){
		
		// Load Listing Records
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: '../listing/GetListingRecords',
		    method: "POST"
		  })
		  .success(function(data) {	
		    angular.forEach(data, function (datum, index) {
		    	//console.info(datum.anchored_tenants);
	            $scope.exportListing.push({ 'property_name': datum.property_name, 
	            	'property_address': datum.property_address, 
	            	'property_owner': datum.property_owner, 
	            	'zone_name': datum.zone_name,
	            	'year_of_top': datum.year_of_top,
	            	'building_class_name': datum.building_class_name,
	            	'building_size': datum.building_size,
	            	'average_floor_plate': datum.average_floor_plate,
	            	'total_no_of_floors': datum.total_no_of_floors,
	            	'season_parking_charge': datum.season_parking_charge,
	            	'monday_friday_ac':datum.monday_friday_ac,
	            	'saturday_ac' : datum.saturday_ac,
	            	'sundays_public_holidays_ac' : datum.sundays_public_holidays_ac,
	            	'ext_charges_ac' : datum.ext_charges_ac,
	            	'transport_notes' : datum.transport_notes,
	            	'building_description' : datum.building_description,
	            	'anchored_tenants' : datum.anchored_tenants,
	            	'property_category' : datum.property_category,
	            	'status' : datum.status,
	            	'contact_company' : datum.contact_company,
	            	'contact_person' : datum.contact_person,
	            	'contact_number' : datum.contact_number,
	            	'contact_email' : datum.contact_email,
	            	'contact_address' : datum.contact_address,
	            	'units' : datum.units,
	            	'gross_rate' : datum.gross_rate,
	            	'gross' : datum.gross,
	            	'available_date' : datum.available_date,
	            	'transaction_type' : datum.transaction_type,
	            	'use_type_name' : datum.use_type_name,
	            	'last_update_date' : datum.last_update_date,
	            	'commission_rate' : datum.commission_rate,
	            	'remarks' : datum.remarks
	            	});
	        	});
			   
		    //console.info(data);
		  });
		
	}
	
	
	
}]);



app.controller('DashboardAnnouncementCtrl', [ '$scope','$rootScope','$sce','$http','$filter','$modal','GlobalSetting', 
function($scope,$rootScope, $sce, $http, $filter,$modal,GlobalSetting) {	
	// Declare the entries
	$scope.announcements = [];
	$scope.loading = true;
	
	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: 'GetAnnouncementRecords',
	    method: "POST"
	  })
	  .success(function(data) {
		  $scope.announcements = [];
		  angular.forEach(data, function (value, key) {
			  value.title = stripslashes(value.title);
			  value.details = stripslashes($sce.trustAsHtml(value.details));
			  value.created_on = $filter('date')(new Date(value.created_on.split(" ")[0]), 'dd/MM/yyyy');
               $scope.announcements.push(value);
               //console.log($scope.announcements);
          }); 		 
	    
	  }).then(function(){
		  $scope.loading = false;
		  $rootScope.$broadcast('callEventForNewListingCtrl');
	  });
	
	$scope.$on('callEventForAnnouncementCtrl', function (event, args) {
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetAnnouncementRecords',
		    method: "POST"
		  })
		  .success(function(data) {
			  $scope.announcements = [];
			  angular.forEach(data, function (value, key) {
				  value.title = stripslashes(value.title);
				  value.details = stripslashes($sce.trustAsHtml(value.details));
				  value.created_on = $filter('date')(new Date(value.created_on.split(" ")[0]), 'dd/MM/yyyy');
	               $scope.announcements.push(value);
	               //console.log($scope.announcements);
	          }); 		 
		    
		  }).then(function(){
			  $scope.loading = false;
			  if(GlobalSetting.advSearchPermission)
				  $rootScope.$broadcast('callEventForAdvSearchViewCtrl');
			  else if(GlobalSetting.createdReportsPermission)
				  $rootScope.$broadcast('callEventForUserCreatedReportCtrl');
			  else
				  $rootScope.$broadcast('callEventForNewListingCtrl');
		  });
    });
	
	
	$scope.DashboardAnnouncementView= function(announce){		
		$modal.open({
            templateUrl: 'ViewDashboardAnnouncementModalView',
            controller: 'ViewDBAnnouncementModalCtrl',
            resolve: {
            	announcementEntity: function (){ return announce;}
            }
        });
	}
	
}]);


//Start edit announcement modal Controller
app.controller('ViewDBAnnouncementModalCtrl', ['$modalInstance','$sce', '$http', '$filter', '$modal', '$rootScope', '$scope', '$rootScope', 'announcementEntity',
 function ($modalInstance,$sce, $http, $filter, $modal, $rootScope, $scope, $rootScope, announcementEntity) {
	
	$scope.AnnouncementEntity = announcementEntity;
	
	$scope.AnnouncementEntity.details = $sce.trustAsHtml(announcementEntity.details.toString());
	//console.log($scope.AnnouncementEntity);
	//console.info(JSON.stringify($scope.AnnouncementEntity));
   
     $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
     };

 }]);
// End edit announcement modal Controller



app.controller('AdvSearchViewCtrl', [ '$scope','$rootScope','$sce','$http','$filter','GlobalSetting', function($scope, $rootScope,$sce, $http, $filter,GlobalSetting) {	
	// Declare the entries

	//$scope.advSearchPermission = false;
	//console.info("in controll"+$scope.advSearchPermission);
	//alert($scope.advSearchPermission+ "="+GlobalSetting.advSearchPermission);
	$scope.advSearchData = [];
	$scope.$on('callEventForAdvSearchViewCtrl', function (event, args) {
		$scope.advSearchPermission = GlobalSetting.advSearchPermission; 
	});
	
	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: 'GetAdvSearchViewRecords',
	    method: "POST"
	  })
	  .success(function(data) {		  
		  $scope.advSearchData = [];
		  angular.forEach(data, function (value, key) {
			  value.created_on = $filter('date')(new Date(value.created_on.split(" ")[0]), 'dd/MM/yyyy');
               $scope.advSearchData.push(value);
          }); 
	    
	  });
}]);



app.controller('UserCreatedReportCtrl', [ '$scope','$rootScope','$sce','$http','$filter','GlobalSetting', function($scope,$rootScope, $sce, $http, $filter,GlobalSetting) {	
	// Declare the entries

	//$scope.createdReportsPermission = false;
	
	$scope.userCreatedReports = [];
	$scope.$on('callEventForUserCreatedReportCtrl', function (event, args) {
		
		$scope.createdReportsPermission = GlobalSetting.createdReportsPermission;
		
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetUserCreatedReportRecords',
		    method: "POST"
		  })
		  .success(function(data) {		  
			  $scope.userCreatedReports = [];
			  angular.forEach(data, function (value, key) {
				 if(value.report_type == 1)
	  			{
					 value.report_type_name = 'Detailed Listing Report';
	  			}
	  			else if(value.report_type == 2)
	  			{
	  				value.report_type_name = 'Building Factsheet';
	  			}	
	  			else if(value.report_type == 3)
	  			{
	  				value.report_type_name = 'Rental Guide';
	  			}
	  			else if(value.report_type == 4)
	  			{
	  				value.report_type_name = 'Viewing Schedule';
	  			}
	  			else if(value.report_type == 5)
	  			{
	  				value.report_type_name = 'Listing Report';
	  			}
	  			else if(value.report_type == 6)
	  			{
	  				value.report_type_name = 'Listing Report (Internal Use)';
	  			} 
				else if(value.report_type == 7)
	  			{
						value.report_type_name = 'Letter of Indent';
	  			} 
				else if(value.report_type == 8)
	  			{
						value.report_type_name = 'Industrial Building Factsheet';
	  			} 
				else if(value.report_type == 9)
	  			{
						value.report_type_name = 'Office Building Factsheet';
	  			} 
				  var splitDate = value.create_on.split(" ")[0].split("-");
				  var splitTime = value.create_on.split(" ")[1].split(":");
				  value.create_on = splitDate[1]+"/"+splitDate[2] +"/"+splitDate[0]+" "+splitTime[0]+":"+splitTime[1];
	               $scope.userCreatedReports.push(value);
	          }); 
			  $rootScope.$broadcast('callEventForNewListingCtrl')
		  });
	});
	
	
	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: 'GetUserCreatedReportRecords',
	    method: "POST"
	  })
	  .success(function(data) {		  
		  $scope.userCreatedReports = [];
		  angular.forEach(data, function (value, key) {
			 if(value.report_type == 1)
  			{
				 value.report_type_name = 'Detailed Listing Report';
  			}
  			else if(value.report_type == 2)
  			{
  				value.report_type_name = 'Building Factsheet';
  			}	
  			else if(value.report_type == 3)
  			{
  				value.report_type_name = 'Rental Guide';
  			}
  			else if(value.report_type == 4)
  			{
  				value.report_type_name = 'Viewing Schedule';
  			}
  			else if(value.report_type == 5)
  			{
  				value.report_type_name = 'Listing Report';
  			}
  			else if(value.report_type == 6)
  			{
  				value.report_type_name = 'Listing Report (Internal Use)';
  			} 
			else if(value.report_type == 7)
  			{
					value.report_type_name = 'Letter of Indent';
  			} 
			else if(value.report_type == 8)
  			{
					value.report_type_name = 'Industrial Building Factsheet';
  			} 
			else if(value.report_type == 9)
  			{
					value.report_type_name = 'Office Building Factsheet';
  			} 
			  var splitDate = value.create_on.split(" ")[0].split("-");
			  var splitTime = value.create_on.split(" ")[1].split(":");
			  value.create_on = splitDate[1]+"/"+splitDate[2] +"/"+splitDate[0]+" "+splitTime[0]+":"+splitTime[1];
               $scope.userCreatedReports.push(value);
          }); 
	  });
	
}]);



app.controller('NewListingCtrl', [ '$scope','$rootScope','$sce','$http','$filter', function($scope,$rootScope, $sce, $http, $filter) {	
	// Declare the entries
	$scope.newListingRecords = [];
	$scope.loading = true;
	$scope.$on('callEventForNewListingCtrl', function (event, args) {
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetNewListingRecords',
		    method: "POST"
		  })
		  .success(function(data) {		  
			  $scope.newListingRecords = [];
			  angular.forEach(data, function (value, key) {
				  value.last_update_date = $filter('date')(new Date(value.last_update_date.split(" ")[0]), 'dd/MM/yyyy');
				  value.available_date = $filter('date')(new Date(value.available_date.split(" ")[0]), 'dd/MM/yyyy');
	               $scope.newListingRecords.push(value);
	          }); 
		    
		  }).then(function(){
			  $scope.loading = false;
			  
		  });
	});
}]);


app.controller('ReportViewer', [ '$scope','$sce','$http','$filter','$window', function($scope, $sce, $http, $filter,$window) {	
	$scope.goBack = function(){
		$window.history.back();
	}
}]);










