app.controller('PropertyCtrl', ['$scope','$http','$rootScope','$filter','$modal','$window','uiGridConstants', function ($scope,$http,$rootScope,$filter,$modal,$window,uiGridConstants) {
	
	/*Permission set*/	 
	$scope.loading = false;
	//$scope.viewCreatePermission = false;
	//$scope.viewEditPermission =false;
	//$scope.viewDeletePermission = false;
	//$scope.createNewPropertyermission = false;
	//$scope.importPropetyPermission = false;
	//$scope.generateReportPermission = false;
	//$scope.viewEditDeletePermission =false;
	$scope.editPropertyPermission = false;
	$scope.detailPropertyPermission = false;
	//$scope.exportPropertyPermission = false;
	$scope.massDeletePermission = false;
			
    
	/*  
   	$http.post('GetPermission', { moduleName: 'Property' })
    .success(function (data, status, headers, config) {
    	$scope.viewEditDeletePermission = data;
    });
    */
    
	
    /*End Permission set*/
	
	/*Decleration*/
	$scope.viewList=[];
	$scope.advanceViewList=[];
	$scope.advanceSearchDDL='0';
	$scope.editCustomView='';
	$scope.headerCheckBox=true;
	var dynamicTable=[];
	
	$scope.exportPropertys = [];
	$scope.getPropertyHeader = function () { return ["Prperty Name", "Zone","Address","Year of Top","Building Class","Status"] };
	
	
	$scope.gridOptions = {
		        columnDefs: [],
		        paginationPageSizes: ['All',5, 10, 20,30,50,100,200],
		        paginationPageSize: 100,
		        enableColumnMenus: false,
		        enableFiltering: true,
		        enableGridMenu: false,
		        headerCheck:false,
		        exporterCsvFilename: 'myFile.csv'
		    };
	
	/*---- End Decleration----*/
	
	/*Default Load*/
	
	
	
	$http.post(baseUrl+'settings/GetDataFromFlashSession')
	.success(function (data1, status, headers, config) {
		//alert(JSON.stringify(data1));
	    var patt1 = /[0-9]/g;
	    var result = data1.match(patt1).join("");
	    if(result>0)
	    	$scope.advanceSearchDDL = result;
	    DropDownList('');
	})
	

	/*---End Default Load*/
	
	/* Start Propety Selection Based on Page (like 1,2,3 )*/
	var pageSizes=$scope.gridOptions.paginationPageSize;
	var pageNumbers=1;
		
	$scope.gridOptions.onRegisterApi = function(gridApi){
		pageNumbers=gridApi.pagination.getPage();
	    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
	        pageSizes=pageSize;
	        pageNumbers=pageNumber;
	        $scope.gridOptions.headerCheck=false;
	        
	        var totalRow = $scope.gridOptions.data.length;
	        var newHeight = 100;
		    if(totalRow > pageSize)
		    	newHeight =(pageSize * 30) + 120;
		    else 
		    	newHeight =(totalRow * 30) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
	    });
	};
	
	$scope.SelectAllProperty=function(isActive)
	{
		var start=pageSizes*(pageNumbers-1);
		var limit=pageNumbers*pageSizes;

		//console.info(start+'=='+pageNumbers+'==='+limit+' All Data '+$scope.gridOptions.data.length);
		
		for(start;start<limit;start++)
		{
			if($scope.gridOptions.data.length > start)
				$scope.gridOptions.data[start].isActive=isActive;
		}
	}
	/*---- Start Propety Selection Based on Page (like 1,2,3 )----*/
	
	/* Start Refresh Property Grid*/
	$scope.RefreshAllProperty=function()
	{
		LoadPropertyGrid();
	}
	/*End Refresh Property Grid*/
	
	/*Advance Search Using DropDown List*/
	$scope.AdvanceSearchByViewID=function()
	{
		$scope.loading = true;
		LoadTableColumnName('changed');
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'GetPropetyListByViweID',
	        method: "post",
	        data:{pViewID:$scope.advanceSearchDDL}
	    }).success(function (data) {
	    	$scope.gridOptions.data = data;
	    	var temp=$filter('filter')($scope.viewList, { custom_view_id: $scope.advanceSearchDDL }, true);
	    	//console.info(temp);
	    	$scope.editCustomView= (temp.length>0)?'custom':'advancesearch';
	    	//console.info($scope.editCustomView);
	    	//console.info($scope.viewList);
	    	//console.info($scope.advanceSearchDDL );
	    	reSize($scope.gridOptions.paginationPageSize, data.length);
	    }).then(function()
	    {
	    	$scope.loading = false;
	    });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 30) + 120;
		    else 
		    	newHeight =(totalRow * 30) + 120;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	/*----End Advance Search*/
	
	/*Delete Custom view*/
	$scope.DeleteAdvSearchByViewID=function()
	{
		if($window.confirm("Are you sure to delete that custom view forever?"))
		{
			$http({
		        headers: { 'Content-Type': 'application/json' },
		        url: 'DeleteAdvSearchViewByViweID',
		        method: "post",
		        data:{pViewID:$scope.advanceSearchDDL}
		    }).success(function (data) { 
		    	$scope.advanceSearchDDL='0'; // For Refresh The DropDownList with Grid 
		    }).then(function()
		    {
		    	DropDownList('changed');
		    });
		}
	}
	/*End Delete Custom View Form DropDown List*/
	
	
	/* Generate Report*/
	$scope.GenerateReport = function(){
		var temp= $filter('filter')($scope.gridOptions.data, { isActive: true });
		
   		$modal.open({
           templateUrl: 'GeneratePropertyReportModalView',
           controller:  'GeneratePropertyReportModalCtrl',	           
           windowClass: 'generate-reportModal-modal',           
           resolve: {
       				genratePassEntity: function () { return temp; },
       				action: function () { return 'Generate Report'; }
       		}
   		}); 
	}
	/*---- End Generate Report ----*/
	
	
	
	/* Broadcast Event Listener*/
	$scope.$on('callEventForDeleteProperty', function (event, args) {	
		
		var temp=$filter('filter')($scope.gridOptions.data, { isActive: true });
		if(temp.length>0)
		{
			$http({
		        headers: { 'Content-Type': 'application/json' },
		        url: 'MassDeleteProperty',
		        method: "post",
		        data:{data:JSON.stringify(temp)}
		    }).success(function (data) {
		    	LoadPropertyGrid();
		    	//console.info(JSON.stringify(data));
		    });
		}
	});
	/*---- End Broadcast Event Listener ----*/
	
	
	
	/* Mass Delete Proepty*/
	$scope.MassDeleteProperty=function()
	{
		$modal.open({
            templateUrl: 'DeletePropertyNotification',
            controller: 'DeletePropertyNotificationCtrl',
            windowClass: 'app-modal-property-window'
        });
	}
	/*---- End Mass Delete Proepty----*/
	
	/* Strart Of Helping Function*/
	function LoadPropertyGrid()
	{   
		$scope.loading = true;		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'GetPropertyRecords',
	        method: "POST"
	    }).success(function (data) {
	    	angular.forEach(data, function (value, index) {
	    		value.isActive=false;
	            $scope.exportPropertys.push({ 
	            	'property_name': value.property_name, 
	            	'zone_name': value.zone_name, 
	            	'property_address': value.property_address, 
	            	'year_of_top': value.year_of_top, 
	            	'building_class_name': value.building_class_name,
	            	'status': value.status
	            	});
	        });
	    	var temp=$filter('filter')($scope.viewList, { custom_view_id: $scope.advanceSearchDDL }, true);
	    	$scope.editCustomView= (temp.length>0)?'custom':'advancesearch';
	    	
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
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	function DropDownList(actionfor)
	{
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'GetViewsList',
	        method: "POST"
	    }).success(function (data) {
	        $scope.viewList = data; 
	        //console.info(JSON.stringify(data));
	    }).then(function(){
	    	$http({
		        headers: { 'Content-Type': 'application/json' },
		        url: 'GetAdvanceViewsList',
		        method: "POST"
		    }).success(function (data) {
		        $scope.advanceViewList = data; 
		        //console.info(JSON.stringify(data));
		    }).then(function(){
		    	
		    	$scope.massDeletePermission =ProcessUserPermissionData('8178');// UserPermission.ProcessUserPermissionData('8178');
		    	//$scope.viewCreatePermission = UserPermission.ProcessUserPermissionData('7837');
		    	//$scope.viewEditPermission = UserPermission.ProcessUserPermissionData('9954');
		    	//$scope.viewDeletePermission = UserPermission.ProcessUserPermissionData('8648');
		    	
		    	//$scope.createNewPropertyermission = UserPermission.ProcessUserPermissionData('8118');
		    	//$scope.importPropetyPermission = UserPermission.ProcessUserPermissionData('5529');
		    	//$scope.generateReportPermission = UserPermission.ProcessUserPermissionData('9336');
		    	$scope.editPropertyPermission = ProcessUserPermissionData('8568');//UserPermission.ProcessUserPermissionData('8568');
		    	$scope.detailPropertyPermission =ProcessUserPermissionData('7156');// UserPermission.ProcessUserPermissionData('7156');
		    	//$scope.exportPropertyPermission = UserPermission.ProcessUserPermissionData('1811');
		    	
		    	LoadTableColumnName(actionfor);
		    });
	    	
	    });
		
		
	}
	function LoadTableColumnName(actionfor)
	{
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'GetTableColumnName',
	        method: "POST",
	        data:{customViewID:$scope.advanceSearchDDL}
	    }).success(function (data) {
	    	if(data.length>0 && data[0].custom_view_id !=0 )
	    		GenerateDynamicTable(data);
	    	else
	    	{
	    		var defaultTable=
	    			[
	    			 { field: 'property_id', width:50, displayName:'', cellClass: 'center',
	    			 	enableColumnResizing: false , enableCellEdit: false, 
	    			 	headerCellTemplate:'<input class="margin-left-17" ng-model="grid.options.headerCheck" ng-click="grid.appScope.SelectAllProperty(grid.options.headerCheck)" type="checkbox"/>',
	    			 	cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.isActive" type="checkbox"/></div>'
	    			 },
	    			 { field: 'property_name', displayName: 'PROPERTY NAME', cellClass: 'left', 
	    			 	enableCellEdit: false,
	    			 	cellTemplate: 
	    			 	'<div class="ui-grid-cell-contents">'+
	    			 	'<a ng-if="row.entity.property_name!=\'\' && row.entity.property_name!=null" class="" href="propertydetails/{{row.entity.property_id}}">{{row.entity.property_name}}</a>'+
	    			 	'<span ng-if="row.entity.property_name==\'\' || row.entity.property_name==null">&nbsp</span>'+
	    			 	'</div>'
	    			 },
	    			 { field: 'property_name', displayName: 'PROPERTY NAME', cellClass: 'left', 
	    			 	enableCellEdit: false,
	    			 	cellTemplate: 
	    			 	'<div class="ui-grid-cell-contents">'+
	    			 	'<span ng-if="row.entity.property_name!=\'\' && row.entity.property_name!=null" class="" >{{row.entity.property_name}}</a>'+
	    			 	'<span ng-if="row.entity.property_name==\'\' || row.entity.property_name==null">&nbsp</span>'+
	    			 	'</div>'
	    			 },
	    			 { field: 'zone_name', displayName: 'ZONE', cellClass: 'left',enableCellEdit: false,
	    				 cellTemplate: 
	    				 		'<div class="ui-grid-cell-contents">'+
	    				 		'<span ng-if="row.entity.zone_name!=\'\' && row.entity.zone_name!=null">{{row.entity.zone_name}}</span>'+
	    				 		'<span ng-if="row.entity.zone_name==\'\' || row.entity.zone_name==null">&nbsp</span>'+
	    				 		'</div>'
	    			 },
	    			 { field: 'property_address', displayName: 'ADDRESS', cellClass: 'left', enableCellEdit: false,
	    				 cellTemplate: 
	    				 		'<div class="ui-grid-cell-contents">'+
	    				 		'<span ng-if="row.entity.property_address!=\'\' && row.entity.property_address!=null">{{row.entity.property_address}}</span>'+
	    				 		'<span ng-if="row.entity.property_address==\'\' || row.entity.property_address==null">&nbsp</span>'+
	    				 		'</div>'
	    			 },
	    			 
	    			 { field: 'master_plan_name', displayName: 'MASTER PLAN', cellClass: 'left', enableCellEdit: false,
	    				 cellTemplate: 
	    				 		'<div class="ui-grid-cell-contents">'+
	    				 		'<span ng-if="row.entity.master_plan_name!=\'\' && row.entity.master_plan_name!=null">{{row.entity.master_plan_name}}</span>'+
	    				 		'<span ng-if="row.entity.master_plan_name==\'\' || row.entity.master_plan_name==null">&nbsp</span>'+
	    				 		'</div>'
	    			 },
	    			 
	    			 { field: 'tenure_name', displayName: 'TENURE', cellClass: 'left', enableCellEdit: false,
	    				 cellTemplate: 
	    				 		'<div class="ui-grid-cell-contents">'+
	    				 		'<span ng-if="row.entity.tenure_name!=\'\' && row.entity.tenure_name!=null">{{row.entity.tenure_name}}</span>'+
	    				 		'<span ng-if="row.entity.tenure_name==\'\' || row.entity.tenure_name==null">&nbsp</span>'+
	    				 		'</div>'
	    			 },
	    			 
	    			 { field: 'year_of_top',filters: [
							{
							  condition: function(term,value, row, column) {
							 
							  var termv = (term + '').replace(/\\/g, '');
							// alert(termv+'='+value);
							  if(termv<=value)
							  {
								  return true;
							  }
							  else 
								  return false;  
							},
							  placeholder: 'From'
							},
							{
							  condition: function(term,value, row, column) {
							 
							  var termv = (term + '').replace(/\\/g, '');
							// alert(termv+'='+value);
							  if(termv>=value)
							  {
								  return true;
							  }
							  else 
								  return false;  
							},
							  placeholder: 'To'
							}
						  ], displayName: 'YEAR OF TOP', cellClass: 'left', enableCellEdit: false,
	    			 	cellTemplate: 
	    			 		'<div class="ui-grid-cell-contents">'+
	    			 		'<span ng-if="row.entity.year_of_top!=\'\' && row.entity.year_of_top!=null">{{row.entity.year_of_top}}</span>'+
	    			 		'<span ng-if="row.entity.year_of_top==\'\' || row.entity.year_of_top==null">&nbsp</span>'+
	    			 		'</div>'
	    			 },
	    			 { field: 'building_class_name',filters: [
							{
							  condition: function(term,value, row, column) {
							 
							  var termv = (term + '').replace(/\\/g, '');
							// alert(termv+'='+value);
							  if(termv<=value)
							  {
								  return true;
							  }
							  else 
								  return false;  
							},
							  placeholder: 'From'
							},
							{
							  condition: function(term,value, row, column) {
							 
							  var termv = (term + '').replace(/\\/g, '');
							// alert(termv+'='+value);
							  if(termv>=value)
							  {
								  return true;
							  }
							  else 
								  return false;  
							},
							  placeholder: 'To'
							}
						  ], displayName: 'BUILDING CLASS',cellClass: 'left', enableCellEdit: false, 
	    			 	cellTemplate: 
	    			 		'<div class="ui-grid-cell-contents">'+
	    			 		'<span ng-if="row.entity.building_class_name!=\'\' && row.entity.building_class_name!=null">{{row.entity.building_class_name}}</span>'+
	    			 		'<span ng-if="row.entity.building_class_name==\'\' || row.entity.building_class_name==null">&nbsp</span>'+
	    			 		'</div>'
	    			 },
	    			 { field: 'status', width:80,  displayName: 'STATUS', cellClass: 'center', 
	    			 	enableCellEdit: false,
	    			 	cellTemplate: 
	    			 		'<div class="ui-grid-cell-contents">'+ 
	    			 		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
	    			 		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
	    			 		'</div>'
	    			 },
	    			 { field: 'property_id', width:80,  displayName: '', cellClass: 'center',
	    			 	enableColumnResizing: false , 
	    			 	enableFiltering: false,
	    			 	enableCellEdit: false,
	    			 	cellTemplate: '<div class="ui-grid-cell-contents"><a href="editproperty/{{row.entity.property_id}}" ng-click="grid.appScope.EditProperty(row.entity)" title="Edit">Edit</a></div>'
	    			 }
	    			];
	    		
	    		var temp11 = defaultTable;
	    		//alert(JSON.stringify(defaultTable));
	    		if($scope.detailPropertyPermission == true){
	    			//alert("detailPropertyPermission == true")
	    			temp11.splice(2,1);
	    		}
	    		else if($scope.detailPropertyPermission == false){
	    			//alert("detailPropertyPermission == false")
	    			temp11.splice(1,1);
	    		}
	    		if($scope.editPropertyPermission == false){
	    			//alert("editPropertyPermission == false")
	    			temp11.splice(7,1);
	    		}
	    		$scope.gridOptions.columnDefs=temp11;
	    	}
	    	//console.info(JSON.stringify(data));
	    }).then(function(){
	    	if(actionfor != 'changed')
	    		LoadPropertyGrid();
	    });
		
	}
	
	function GenerateDynamicTable(data)
	{
		dynamicTable=[];
		width=
		dynamicTable.push({ 
			field: 'property_id', width:50, displayName:'', cellClass: 'center',
		 	enableColumnResizing: false , enableCellEdit: false, 
		 	headerCellTemplate:'<input class="margin-left-17" ng-model="grid.options.headerCheck" ng-click="grid.appScope.SelectAllProperty(grid.options.headerCheck)" type="checkbox"/>',
		 	cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.isActive" type="checkbox"/></div>'
        });
		angular.forEach(data,function(value,key){
			var cellTemplate='';
			var cell_class = 'left';
			var cell_width = 100;
			if(value.column_name=='property_name')
			{
				cell_width = 200;
				if($scope.detailPropertyPermission == true){
					cellTemplate= 
					 	'<div class="ui-grid-cell-contents">'+
					 	'<a ng-if="row.entity.property_name!=\'\' && row.entity.property_name!=null" class="" href="propertydetails/{{row.entity.property_id}}">{{row.entity.property_name}}</a>'+
					 	'<span ng-if="row.entity.property_name==\'\' || row.entity.property_name==null">&nbsp</span>'+
					 	'</div>';
				}
				else if($scope.detailPropertyPermission == false){
					cellTemplate= 
					 	'<div class="ui-grid-cell-contents">'+
					 	'<span ng-if="row.entity.property_name!=\'\' && row.entity.property_name!=null" class="" ">{{row.entity.property_name}}</span>'+
					 	'<span ng-if="row.entity.property_name==\'\' || row.entity.property_name==null">&nbsp</span>'+
					 	'</div>';
					
				}
			}
			else if(value.column_name=='status'){
				cell_width = 80;
				cell_class = 'center';
				cellTemplate= 
			 		'<div class="ui-grid-cell-contents">'+ 
			 		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
			 		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
			 		'</div>';
			}
			else
			{
				if(value.column_name == 'property_address')
					cell_width = 200;
				else
					cell_width = 100;
				cellTemplate=
				'<div class="ui-grid-cell-contents">'+
        		'<span ng-if="row.entity.'+value.column_name+'!=\'\' && row.entity.'+value.column_name+'!=null">{{row.entity.'+value.column_name+'}}</span>'+
        		'<span ng-if="row.entity.'+value.column_name+'==\'\' || row.entity.'+value.column_name+'==null">&nbsp</span>'+
        		'</div>';
			}
			
			/* manage dynamic column width | mizan on 07.12.2015*/
			if(data.length > 5)
			{			
				dynamicTable.push({ field: value.column_name, width:cell_width, displayName: value.label_name,cellClass: cell_class, enableCellEdit: false, 
	            	cellTemplate: cellTemplate	
	            });
			}
			else
			{
				dynamicTable.push({ field: value.column_name, displayName: value.label_name,cellClass: cell_class, enableCellEdit: false, 
	            	cellTemplate: cellTemplate	
	            });
			}
			
    	});
		
		if($scope.editPropertyPermission == true){
			dynamicTable.push({ field: 'property_id', width:80,  displayName: '', cellClass: 'center',
	        	enableColumnResizing: false , 
	        	enableFiltering: false,
	        	enableCellEdit: false,
	        	cellTemplate: '<div class="ui-grid-cell-contents"><a  href="editproperty/{{row.entity.property_id}}" ng-click="grid.appScope.EditProperty(row.entity)" title="Edit">Edit</a></div>'
	        });
		}
		
		$scope.gridOptions.columnDefs=dynamicTable;
	}
	  
	
	
	$scope.ExportAllPropertys = function () {    	
		
        console.info("has been exported...");
    };
    
    
    function ExportPropertyRecordLoad()
	{
		
		// Load Property Records
		$http({
		    headers: {'Content-Type': 'application/json'},
		    url: 'GetPropertyRecords',
		    method: "POST"
		  })
		  .success(function(data) {	
			 //console.info(data);
		    angular.forEach(data, function (datum, index) {
		    	//
	            $scope.exportPropertys.push({ 
	            	'property_name': datum.property_name, 
	            	'zone_name': datum.zone_name, 
	            	'property_address': datum.property_address, 
	            	'year_of_top': datum.year_of_top, 
	            	'building_class_name': datum.building_class_name,
	            	'status': datum.status
	            	});
	        	});
			   
		    //console.info(data);
		  }).then(function(){		  
		  });
	}
	
}]);

/* End Of Helping Function*/

/* Start Modal Controller */

app.controller('GeneratePropertyReportModalCtrl',['$scope','$modalInstance','$http','$window','genratePassEntity','action','$modal',
  function ($scope,$modalInstance,$http,$window,genratePassEntity,action,$modal) {
	
	$scope.savedata = {
			reportName: ''
		};
	//console.log(genratePassEntity);
	
	$scope.reportsubmitdata = [];
	var temp=$window.location.href;
 	var result=temp.split('/');
	var index=temp.indexOf('/property');
	var url=temp.substring(0, index)+'/property';
	var reporturl=temp.substring(0, index)+'/report';
	
	if(action == 'Generate Report')
	{
		if(genratePassEntity.length < 1){
			$scope.showAlert=true;
			$scope.showContent=false;
		}
		else{
			if(genratePassEntity.length >= 100  &&  globalMemeberTypeId != 1){
				alert("You have selected more than 100 properties.");
				$scope.hundredCondition = false;
				$http({
				     headers: { 'Content-Type': 'application/json' },
					 url: url+'/SendEmail',
					 method: "post"
				 }).success(function (data) {
					 //alert(data);
				 });
			}else{
				$scope.hundredCondition = true;
			}
			
			$scope.report_id = '';		
			$scope.showAlert=false;
			$scope.showContent=true;
			$http({
			     headers: { 'Content-Type': 'application/json' },
				 url: url+'/ReportGenerate',
				 method: "post",
			     data:{data:JSON.stringify(genratePassEntity)}
			 }).success(function (data) {
			 	$scope.report_id = data;
			 });
		}		
	}
	else if(action == 'Save Report'){
		$scope.reportsubmitdata = genratePassEntity;
	}
	
	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
    };
    
    $scope.ReportSavingSubmit=function()
	{
    	$scope.reportsubmitdata.reportName = $scope.savedata.reportName;
		//alert(JSON.stringify($scope.reportsubmitdata));
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: reporturl+'/SubmitSaveReport',
	        method: "post",
	        data:{data:JSON.stringify($scope.reportsubmitdata)}
	    }).success(function (data) {
	    	
	    	 $modalInstance.dismiss('cancel');
	    	 $scope.data = {
			    boldTextTitle: "Done !! ",
			    textAlert : "Your report has been successfully saved.",
			    mode : 'info'
			  } 
	    	 
	    	$modal.open({
	            templateUrl: 'GenerateSuccessModalView',
	            controller:  'GenerateSuccessModalCtrl',	           
	            windowClass: 'generate-susscess-modal',           
	            resolve: {
	            	data: function () { return $scope.data; }
        			}
    			});
	    });
	}
 }]);

/*---- End Modal Controller ----*/

/*---- Property Report Start ------*/
app.controller('PropertyReportCtrl',['$scope','$http','$window','$modal','$filter',
    function ($scope,$http,$window,$modal,$filter) {
  	$scope.CRMPotentialData = [];
  	
  	// Angular date picker
  	$scope.savedpicker = { opened: false };
    
  	$scope.openPicker = function() {
  		$timeout(function() {
  			$scope.picker.opened = true;
  		});
  	};
    
  	$scope.closePicker = function() {
  		$scope.picker.opened = false;
  	};
  	
  	$scope.reportsubmitdata={
  		reportName:'',
  		reportid:'',
  		report_type:'',
  		module_type:'',
  		saveddate:'',
  		propertytype:'',
  		crmId:'',
  		reportdata:''
  	}
  	
  	var temp=$window.location.href;
  	var result=temp.split('/');
  	var index=temp.indexOf('/property');
  	var reportId=result[result.length-1];
  	var reportarray = reportId.split('?report-id=')
  	var url=temp.substring(0, index)+'/property/';
  	var reporturl=temp.substring(0, index)+'/report/';
  	
  	DropDownList();
  	var reportWindow = result[result.length-2];
  	
  	var reportlistingurl = '';
  	if(reportWindow == 'rentalguidetemplatereportforproperty')
  		reportlistingurl = url+'GetRentalGuideTemplateReport'+reportId;
  	else if(reportWindow == 'buildingfactsheettemplatereport')
  		reportlistingurl = url+'GetBuildingFactsheetTemplateReport'+reportId;
	else if(reportWindow == 'industrialbuildingfactsheettemplatereport')
  		reportlistingurl = url+'Getindustrialbuildingfactsheettemplatereport'+reportId;
	else if(reportWindow == 'officebuildingfactsheettemplatereport')
  		reportlistingurl = url+'Getofficebuildingfactsheettemplatereport'+reportId;
  	else if(reportWindow == 'detailslistingreport')
  		reportlistingurl = url+'GetDetailsListingReport'+reportId;
  	
  	//tushar 
	$scope.isLoading = true;
  	$scope.newReportRecords = [];
  	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: reportlistingurl,
	    method: "GET"
	  })
	  .success(function(data) {
		  angular.forEach(data, function (value, key) {
              $scope.newReportRecords.push(value);
          }); 
		  $scope.isLoading = false;;
    });
  	
  	function DropDownList(){
  		$http({
  	        headers: { 'Content-Type': 'application/json' },
  	        url: url+'GetCRMPotentialList',
  	        method: "POST"
  	    }).success(function (data) {
  	    	$scope.CRMPotentialData = data; 
  	    });
  	}
  	
  	$scope.ReportSavingModal = function(){		
  		
  		$scope.reportsubmitdata.reportid = reportarray[1];		
  		$scope.reportsubmitdata.reportdata = $scope.newReportRecords;
  		
  		if(reportWindow == 'rentalguidetemplatereportforproperty'){
  			$scope.reportsubmitdata.report_type = 3; // Report Type = 3 = Rental Guide;
  			$scope.reportsubmitdata.module_type = 1; // Module Type = 1 = Property Module;
  		}
  		else if(reportWindow == 'buildingfactsheettemplatereport'){
  			$scope.reportsubmitdata.report_type = 2; // Report Type = 2 = Buildingfact sheet Report;
  			$scope.reportsubmitdata.module_type = 1; // Module Type = 1 = Property Module;
  		}
		else if(reportWindow == 'industrialbuildingfactsheettemplatereport'){
  			$scope.reportsubmitdata.report_type = 8; // Report Type = 2 = Buildingfact sheet Report;
  			$scope.reportsubmitdata.module_type = 1; // Module Type = 1 = Property Module;
  		}
		else if(reportWindow == 'officebuildingfactsheettemplatereport'){
  			$scope.reportsubmitdata.report_type = 9; // Report Type = 2 = Buildingfact sheet Report;
  			$scope.reportsubmitdata.module_type = 1; // Module Type = 1 = Property Module;
  		}
  		else if(reportWindow == 'detailslistingreport'){
  			$scope.reportsubmitdata.report_type = 1; // Report Type = 1 = Details listing Report;
  			$scope.reportsubmitdata.module_type = 1; // Module Type = 1 = Property Module;
  		}
  		
     		$modal.open({
             templateUrl: 'GenerateReportSaveModalView',
             controller:  'GeneratePropertyReportModalCtrl',	           
             windowClass: 'generate-reportModal-modal',           
             resolve: {
     				genratePassEntity: function () { return $scope.reportsubmitdata; },
     				action: function () { return 'Save Report'; }
     			}
 			}); 
  	 }
  	
  	$scope.GeneratePdf = function () {
  		if($scope.reportsubmitdata.saveddate == '' || $scope.reportsubmitdata.saveddate == null)
  			$scope.reportsubmitdata.saveddate= '';
  		else
  			$scope.reportsubmitdata.saveddate=$filter('date')(new Date($scope.reportsubmitdata.saveddate), "dd/MM/yyyy");
  		
  		$scope.reportsubmitdata.reportid = reportarray[1];
  		$scope.reportsubmitdata.reportdata = $scope.newReportRecords;
  		
  		var generatepdfurl = '';
  		if(reportWindow == 'rentalguidetemplatereportforproperty'){
  			generatepdfurl = reporturl+'downloadrentalguidetemplatereportforpropertypdf';
  		}
  		else if(reportWindow == 'buildingfactsheettemplatereport'){
  			generatepdfurl = reporturl+'downloadbuildingfactsheettemplatereportpdf';
  		}
		else if(reportWindow == 'industrialbuildingfactsheettemplatereport'){
  			generatepdfurl = reporturl+'downloadIndustrialbuildingfactsheettemplatereportpdf';
  		}
		else if(reportWindow == 'officebuildingfactsheettemplatereport'){
  			generatepdfurl = reporturl+'downloadofficebuildingfactsheettemplatereportpdf';
  		}
  		else if(reportWindow == 'detailslistingreport'){
  			generatepdfurl = reporturl+'downloaddetailslistingreportpdf';
  		}
  		
  		var tabName = "PdfDisplayTab";
  		var form = document.createElement("form");
  		form.setAttribute("id", "noid");
  		form.setAttribute("method", "post");
  		form.setAttribute("action", generatepdfurl);
  		form.setAttribute("target", tabName);
  		form.setAttribute("style", "display: none;");

  		var field = document.createElement("input"); //add a post data value
  		field.setAttribute("name", 'data');
  		field.setAttribute("value", JSON.stringify($scope.reportsubmitdata));
  		form.appendChild(field);

  		document.body.appendChild(form);
  		window.open('about:blank', tabName); //open form in new window
  		form.submit();
  	};  	
}]);

app.controller('GenerateSuccessModalCtrl',['$scope','$modalInstance','$http','$window','data',
    function ($scope,$modalInstance,$http,$window,data) {
  		$scope.successdata = data;
  		$scope.cancel = function () {
  		    $modalInstance.dismiss('cancel');
  	    };
   }]);
/*---- Property report End --------*/

app.controller('DeletePropertyNotificationCtrl', ['$scope','$http','$rootScope','$modalInstance', function ($scope,$http,$rootScope,$modalInstance) {
	
	$scope.confirm = function () {
		$rootScope.$broadcast('callEventForDeleteProperty', { });
        $modalInstance.close();
    };
	$scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);


  /*Create Propety Controller*/

app.controller('PropertyCreateCtrl', ['$scope','$http','$location','$window','$rootScope','Upload', function ($scope,$http,$location,$window,$rootScope,Upload) {
	
	/* variable Declaration */
	var propertyId='';
	var url='';
	$scope.zoneList=[];
	$scope.proCategoryList=[];
	$scope.proBuildingClassList=[];
	//added by tushar on 09-12-15
	$scope.foorSystemList = [];
	$scope.securityTurnstileList = [];
	$scope.masterPlanList =[];
	$scope.tenureList =[];
	//End
	$scope.updateProperty={};
	$scope.stockInfo={};
	$scope.createProperty={
			propertyName:'',chineseName:'',propertyCategory:'',propertyAddress:'',
			zone:'',status:'',buildingClass:'',buildingSize:'',averageFloorPlate:'',
			totalNumberOfFloor:'',seasonParkingCharge:'',yearOfTop:'',noOfCarPark:'',
			floorToCeilHeight:'',floorLoading:'',mondaysThroughFriday:'',saturday:'',
			sundayPublicHoliday:'',extCharge:'',transportNote:'',buldingDescription:'',
			anchoredTenant:'', 
			//added by tushar on 09-12-15
			mgntOfficeContactNo:'', floorSystem:'',	securityTurnstiles:'',
			lift:'',loadingBays:'',powerSupply:'', masterPlan:'', tenure:'',
			effectiveDate: ''
			
			
			
	}
	
	$scope.detailProperty=
	{
			photoTitle:'',
			photoFile:'',
			photoStatus:1,
			docTitle:'',
			docFile:'',
			docStatus:1
	}
	/*End variable*/
	
	/** Dynamic Url for Create, Update and Details**/
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/property');
	url=temp.substring(0, index)+'/property';
	$scope.url=temp.substring(0, index);
	propertyId=result[result.length-1];
	/** Dynamic Url for Create,Update and Details**/
	
	/*Conditon for insert, update and details*/
	if(isNaN(propertyId)==false && temp.indexOf('/editproperty')!=-1)
	{
		LoadPropertyDataById(propertyId);
		LoadDropDownList(url);
	}
	else if (temp.indexOf('/propertydetails')!=-1 )
	{
		LoadDetailsPropertyDataById(propertyId);
		GetAllstockinformation(propertyId);
	}
	else
		LoadDropDownList(url);
	/*Conditon for insert, update and details*/
	
	/*Start Function Call*/
	
	$scope.UploadAttachment = function(){
		 
		 Upload.upload({
	            url: url+'/UploadPropertyAttachment',
	            headers: {'Content-Type': $scope.detailProperty.docFile.type},
	            method: 'POST',
	            data: {
	            	file: $scope.detailProperty.docFile,
	            	title:$scope.detailProperty.docTitle,
	            	status:$scope.detailProperty.docStatus,
	            	propertyId:propertyId
	            	}
		        }).then(function (resp) {
	        		 alert(resp.data);
		        	
		        }, function (resp) {
		            console.log('Error status: ' + resp.status);
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	      });
	}
	
	$scope.UploadPhoto=function()
	{
		Upload.upload({
            url: url+'/UploadPropertyPhoto',
            method: 'POST',
            data: {
            	file: $scope.detailProperty.photoFile,
            	title:$scope.detailProperty.photoTitle,
            	status:$scope.detailProperty.photoStatus,
            	propertyId:propertyId
            	}
        }).success(function (data, status, headers, config) {
        	if(data == true||data == "true"){
        		alert("Successfully Upload.");
        	}
        	else{
        		alert(JSON.stringify(data));	        		
        	}
        }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
	}
	$scope.SavePeperty=function()
	{
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/SaveNewProperty',
	        method: "post",
	        data:{data:JSON.stringify($scope.createProperty)}
	    }).success(function (data) {
	        $window.location.href = url;
	    	//console.info(JSON.stringify(data));
	    });
		//alert(JSON.stringify($scope.createProperty));
	}
	$scope.UpdatePeperty=function()
	{
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/UpdateProperty',
	        method: "post",
	        data:{data:JSON.stringify($scope.createProperty),propertyId:propertyId}
	    }).success(function (data) {
	        $window.location.href = url+'/propertydetails/'+propertyId;
	    	//console.info(JSON.stringify(data));
	    });
	}
	$scope.GoTOPropertyEdit=function(){
		$window.location.href=url+'/editproperty/'+propertyId;
	}
	function LoadPropertyDataById(propertyId) {
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetPropertyById',
	        method: "post",
	        data:{propertyId:propertyId}
	    }).success(function (data) {
	    	//console.info(JSON.stringify(data));
        	$scope.createProperty.propertyName=data.property_name;
			$scope.createProperty.chineseName=data.chinese_name;
			$scope.createProperty.propertyCategory=data.property_category_id;
			$scope.createProperty.propertyAddress=data.property_address;
			$scope.createProperty.zone=data.zone_id;
			$scope.createProperty.status=data.status;
			$scope.createProperty.buildingClass=data.building_class_id;
			$scope.createProperty.buildingSize=data.building_size;
			$scope.createProperty.averageFloorPlate=data.average_floor_plate;
			$scope.createProperty.totalNumberOfFloor=data.total_no_of_floors;
			$scope.createProperty.seasonParkingCharge=data.season_parking_charge;
			$scope.createProperty.yearOfTop=data.year_of_top;
			$scope.createProperty.noOfCarPark=parseInt(data.no_of_car_park);
			$scope.createProperty.floorToCeilHeight=data.floor_to_ceil_height;
			$scope.createProperty.floorLoading=data.floor_loading;
			$scope.createProperty.mondaysThroughFriday=data.monday_friday_ac;
			$scope.createProperty.saturday=data.saturday_ac;
			$scope.createProperty.sundayPublicHoliday=data.sundays_public_holidays_ac;
			$scope.createProperty.extCharge=data.ext_charges_ac;
			$scope.createProperty.transportNote=data.transport_notes;
			$scope.createProperty.buldingDescription=data.building_description;
			$scope.createProperty.anchoredTenant=data.anchored_tenants;
			//added by tushar on 
			$scope.createProperty.mgntOfficeContactNo=data.management_contact_no;
			$scope.createProperty.floorSystem = data.floor_system_id;
			$scope.createProperty.securityTurnstiles=data.security_turnstiles_id;
			$scope.createProperty.lift = data.lifts;
			$scope.createProperty.loadingBays = data.loading_bays;
			$scope.createProperty.powerSupply = data.power_supply;
			$scope.createProperty.masterPlan = data.master_plan_id;
			$scope.createProperty.tenure = data.tenure_id;
			$scope.createProperty.effectiveDate = data.effective_date;
			
	    });
    }
	function LoadDetailsPropertyDataById(propertyId) {
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetPropertyById',
	        method: "post",
	        data:{propertyId:propertyId}
	    }).success(function (data) {
	    	$scope.updateProperty=data;
	    	//console.info(JSON.stringify(data))
	    });
    }
	function GetAllstockinformation(propertyId) {
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetAllstockinformation',
	        method: "post",
	        data:{propertyId:propertyId}
	    }).success(function (data) {
	    	$scope.stockInfo=data;
	    	//console.info(JSON.stringify(data))
	    });
    }
	
	function LoadDropDownList(url)
	{
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetZoneList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.zoneList=data;
	    	//console.info(JSON.stringify(data));
	    });
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetPropertyCategoryList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.proCategoryList=data;
	    	//console.info(JSON.stringify(data));
	    });
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetBuidlingClassesList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.proBuildingClassList=data;
	    	//console.info(JSON.stringify(data));
	    });
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetFoorSystemList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.foorSystemList=data;
	    	//console.info(JSON.stringify(data));
	    });
		
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetSecurityTurnstileList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.securityTurnstileList = data;
	    	//console.info(JSON.stringify(data));
	    });
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetMasterPlanList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.masterPlanList = data;
	    	//console.info(JSON.stringify(data));
	    });
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: url+'/GetTenureList',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.tenureList = data;
	    	//console.info(JSON.stringify(data));
	    });
		
		
	}
	/*End Function Call*/
	
}]);

app.controller('PropertyAdvanceSearchCtrl', ['$scope','$http','$rootScope','$filter','$modal', function ($scope,$http,$rootScope,$filter,$modal) {
	
	/* Start Declaration*/
	$scope.conditionList=["is", "isn't", 'contains',"doesn't contain",'starts with','ends with','is empty','is not empty'];
	$scope.limitedConditinList=["is", "isn't",'is empty','is not empty'];
	$scope.yearToConditions=["is", "Greater than",'Less than'];
	$scope.headerCheckBox=false;
	$scope.selectItem=[];
	$scope.businessClassList=[];
	
	$scope.masterPlanList=[];
	$scope.tenureList=[];
	$scope.floorSystemList=[];
	$scope.securityTurnstilesList=[];
	
	$scope.zoneList=[];
	$scope.advanceSearch={
			property_name:'contains',property_name_value:'',
			property_address:'',property_address_value:'',
			zone_name:'',zone_value:'',zone_multiValue:[],
			year_of_top:'',year_of_top_value:'',
			status:'is',status_value:'',
			building_class_id:'',building_class_value:'',
			building_size:'',building_size_value:'',
			average_floor_plate:'',average_floor_plate_value:'',
			total_no_of_floors:'',total_no_of_floors_value:'',
			season_parking_charges:'',season_parking_charges_value:'',
			no_of_car_park:'',no_of_car_park_value:'',
			floor_to_ceil_height:'',floor_to_ceil_height_value:'',
			floor_loading:'',floor_loading_value:'',
			monday_friday_ac:'',monday_friday_ac_value:'',
			saturday_ac:'',saturday_ac_value:'',
			sundays_public_holidays_ac:'',sundays_public_holidays_value:'',
			ext_charges_ac:'',ext_charges_value:'',
			transport_notes:'',transport_notes_value:'',
			building_description:'',building_description_value:'',
			anchored_tenants:'',anchored_tenants_value:'',
			mng_contact_no:'', mng_contact_no_value:'',
			master_plan:'', master_plan_multiValue:'',
			tenure:'', tenure_multiValue:'',
			floor_system:'', floor_system_value:'',
			security_turnstiles:'', security_turnstiles_value:'',
			lift: '', lift_value:'',
			loading_bays:'',loading_bays_value:''
				
	}
	/*End Declaration*/
	
	/* Generate Report*/
	$scope.GenerateReport = function(){
		var temp= $filter('filter')($scope.gridOptions.data, { isActive: true });
		
   		$modal.open({
           templateUrl: 'GeneratePropertyReportModalView',
           controller:  'GeneratePropertyReportModalCtrl',	           
           windowClass: 'generate-reportModal-modal',           
           resolve: {
       				genratePassEntity: function () { return temp; },
       				action: function () { return 'Generate Report'; }
       		}
   		}); 
	}
	/*---- End Generate Report ----*/
	
	/* Start Search Result Grid*/
	$scope.gridOptions = {
	        columnDefs: [

	            { field: 'property_id', width:50, displayName:'', cellClass: 'center',
	            	enableColumnResizing: false , enableCellEdit: false, 
	            	headerCellTemplate:'<input class="margin-left-17" ng-model="headerCheckBox" ng-click="grid.appScope.SelectAllProperty(headerCheckBox)" type="checkbox"/>',
	            	cellTemplate: '<div class="ui-grid-cell-contents"><input ng-model="row.entity.isActive" type="checkbox"/></div>'
	            },
	            { field: 'property_name', displayName: 'PROPERTY NAME', cellClass: 'left', 
	            	enableCellEdit: false,
	            	cellTemplate: 
	        		 	'<div class="ui-grid-cell-contents">'+
	        		 	'<a ng-if="row.entity.property_name!=\'\' && row.entity.property_name!=null" class="" href="propertydetails/{{row.entity.property_id}}">{{row.entity.property_name}}</a>'+
	        		 	'<span ng-if="row.entity.property_name==\'\' || row.entity.property_name==null">&nbsp</span>'+
	        		 	'</div>'
	            },
	            { field: 'zone_name',displayName: 'ZONE', cellClass: 'left',enableCellEdit: false,
	            	cellTemplate: 
				 		'<div class="ui-grid-cell-contents">'+
				 		'<span ng-if="row.entity.zone_name!=\'\' && row.entity.zone_name!=null">{{row.entity.zone_name}}</span>'+
				 		'<span ng-if="row.entity.zone_name==\'\' || row.entity.zone_name==null">&nbsp</span>'+
				 		'</div>'
	            
	            },
	            { field: 'property_address', displayName: 'ADDRESS', cellClass: 'left', enableCellEdit: false,
	            	cellTemplate: 
				 		'<div class="ui-grid-cell-contents">'+
				 		'<span ng-if="row.entity.property_address!=\'\' && row.entity.property_address!=null">{{row.entity.property_address}}</span>'+
				 		'<span ng-if="row.entity.property_address==\'\' || row.entity.property_address==null">&nbsp</span>'+
				 		'</div>'
	            },
	            { field: 'year_of_top', displayName: 'YEAR OF TOP', cellClass: 'left', enableCellEdit: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+
	            		'<span ng-if="row.entity.year_of_top!=\'\' && row.entity.year_of_top!=null">{{row.entity.year_of_top}}</span>'+
	            		'<span ng-if="row.entity.year_of_top==\'\' || row.entity.year_of_top==null">&nbsp</span>'+
	            		'</div>'
	            },
	            { field: 'building_class_name', displayName: 'BUILDING CLASS',cellClass: 'left', enableCellEdit: false, 
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+
	            		'<span ng-if="row.entity.building_class_name!=\'\' && row.entity.building_class_name!=null">{{row.entity.building_class_name}}</span>'+
	            		'<span ng-if="row.entity.building_class_name==\'\' || row.entity.building_class_name==null">&nbsp</span>'+
	            		'</div>'
	            },
	            { field: 'status', displayName: 'STATUS', cellClass: 'center', 
	            	enableCellEdit: false,
	            	cellTemplate: 
	            		'<div class="ui-grid-cell-contents">'+ 
	            		'<img ng-if="row.entity.status==1" src="../assets/images/yes.png">'+
	            		'<img ng-if="row.entity.status==0" src="../assets/images/no.png">'+
	            		'</div>'
	            },
	            { field: 'property_id', width:80,  displayName: '', cellClass: 'center',
	            	enableColumnResizing: false , 
	            	enableFiltering: false,
	            	enableCellEdit: false,
	            	cellTemplate: '<div class="ui-grid-cell-contents"><a href="editproperty/{{row.entity.property_id}}" ng-click="grid.appScope.EditProperty(row.entity)" title="Edit">Edit</a></div>'
	            }
	        ],
	        paginationPageSizes: ['All',10, 20,30,50,100,200],
	        paginationPageSize: 100,
	        enableColumnMenus: false,
	        enableGridMenu: false,
	        exporterCsvFilename: 'AdvanceSearch.csv'
	    };
	/* End Search Result Grid*/
	
	$scope.SelectAllProperty=function(isActive)
	{
		angular.forEach($scope.gridOptions.data,function(value,key){
			value.isActive=isActive;
    	});
	}
	$scope.SearchPeperty=function()
	{
		var result=[];
		result.push({propertyName:'property_name',propertyCondition:$scope.advanceSearch.property_name,propetyValue:$scope.advanceSearch.property_name_value});
		result.push({propertyName:'property_address',propertyCondition:$scope.advanceSearch.property_address,propetyValue:$scope.advanceSearch.property_address_value});
		result.push({propertyName:'zone_name',propertyCondition:$scope.advanceSearch.zone_name,propetyValue:$scope.advanceSearch.zone_multiValue});
		result.push({propertyName:'year_of_top',propertyCondition:$scope.advanceSearch.year_of_top,propetyValue:$scope.advanceSearch.year_of_top_value});
		result.push({propertyName:'status',propertyCondition:$scope.advanceSearch.status,propetyValue:$scope.advanceSearch.status_value});
		result.push({propertyName:'building_class_id',propertyCondition:$scope.advanceSearch.building_class_id,propetyValue:$scope.advanceSearch.building_class_value});
		result.push({propertyName:'building_size',propertyCondition:$scope.advanceSearch.building_size,propetyValue:$scope.advanceSearch.building_size_value});
		result.push({propertyName:'average_floor_plate',propertyCondition:$scope.advanceSearch.average_floor_plate,propetyValue:$scope.advanceSearch.average_floor_plate_value});
		result.push({propertyName:'total_no_of_floors',propertyCondition:$scope.advanceSearch.total_no_of_floors,propetyValue:$scope.advanceSearch.total_no_of_floors_value});
		result.push({propertyName:'season_parking_charge',propertyCondition:$scope.advanceSearch.season_parking_charges,propetyValue:$scope.advanceSearch.season_parking_charges_value});
		//result.push({propertyName:'no_of_car_park',propertyCondition:$scope.advanceSearch.no_of_car_park,propetyValue:$scope.advanceSearch.no_of_car_park_value});
		//result.push({propertyName:'floor_to_ceil_height',propertyCondition:$scope.advanceSearch.floor_to_ceil_height,propetyValue:$scope.advanceSearch.floor_to_ceil_height_value});
		//result.push({propertyName:'floor_loading',propertyCondition:$scope.advanceSearch.floor_loading,propetyValue:$scope.advanceSearch.floor_loading_value});
		result.push({propertyName:'monday_friday_ac',propertyCondition:$scope.advanceSearch.monday_friday_ac,propetyValue:$scope.advanceSearch.monday_friday_ac_value});
		result.push({propertyName:'saturday_ac',propertyCondition:$scope.advanceSearch.saturday_ac,propetyValue:$scope.advanceSearch.saturday_ac_value});
		result.push({propertyName:'sundays_public_holidays_ac',propertyCondition:$scope.advanceSearch.sundays_public_holidays_ac,propetyValue:$scope.advanceSearch.sundays_public_holidays_value});
		result.push({propertyName:'ext_charges_ac',propertyCondition:$scope.advanceSearch.ext_charges_ac,propetyValue:$scope.advanceSearch.ext_charges_value});
		result.push({propertyName:'transport_notes',propertyCondition:$scope.advanceSearch.transport_notes,propetyValue:$scope.advanceSearch.transport_notes_value});
		result.push({propertyName:'building_description',propertyCondition:$scope.advanceSearch.building_description,propetyValue:$scope.advanceSearch.building_description_value});
		result.push({propertyName:'anchored_tenants',propertyCondition:$scope.advanceSearch.anchored_tenants,propetyValue:$scope.advanceSearch.anchored_tenants_value});
		
		// added by tushar 11-12-15
		result.push({propertyName:'management_contact_no',propertyCondition:$scope.advanceSearch.mng_contact_no,propetyValue:$scope.advanceSearch.mng_contact_no_value});
		result.push({propertyName:'master_plan_id', propertyCondition:$scope.advanceSearch.master_plan, propetyValue:$scope.advanceSearch.master_plan_multiValue});		
		result.push({propertyName:'tenure_id', propertyCondition:$scope.advanceSearch.tenure, propetyValue:$scope.advanceSearch.tenure_multiValue});
		result.push({propertyName:'floor_system_id',propertyCondition:$scope.advanceSearch.floor_system,propetyValue:$scope.advanceSearch.floor_system_value});
		result.push({propertyName:'security_turnstiles_id', propertyCondition:$scope.advanceSearch.security_turnstiles, propetyValue:$scope.advanceSearch.security_turnstiles_value});
		result.push({propertyName:'lifts',propertyCondition:$scope.advanceSearch.lift, propetyValue:$scope.advanceSearch.lift_value});
		result.push({propertyName:'loading_bays',propertyCondition:$scope.advanceSearch.loading_bays, propetyValue:$scope.advanceSearch.loading_bays_value});
		
		
		
		$scope.loading = true;
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url:'AdvanceSearch',
	        method: "POST",
	        data:{data:JSON.stringify(result)}
	    }).success(function (data) {
	    	angular.forEach(data,function(value,key){
				value.isActive=false;
				if(value.year_of_top)
					value.year_of_top=value.year_of_top.trim();
	    	});
	    	
	    	$scope.gridOptions.data=data;
	    	//console.info(JSON.stringify(data));
	    	reSize($scope.gridOptions.paginationPageSize, data.length);
	    }).then(function(){
	    	$scope.loading = false;
	    });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 30) + 125;
		    else 
		    	newHeight =(totalRow * 30) + 125;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	
	
	$scope.ResetField = function(){
		
		$scope.advanceSearch.property_name='contains'; 	$scope.advanceSearch.property_name_value='';
		$scope.advanceSearch.property_address=''; 		$scope.advanceSearch.property_address_value;'';
		$scope.advanceSearch.year_of_top='';			$scope.advanceSearch.year_of_top_value='';
		$scope.advanceSearch.zone_name='is'; 			$scope.advanceSearch.zone_value=''; $scope.advanceSearch.zone_multiValue=[];	
		$scope.advanceSearch.building_class_id=''; 		$scope.advanceSearch.building_class_value='';
		$scope.advanceSearch.building_size=''; 			$scope.advanceSearch.building_size_value='';
		$scope.advanceSearch.average_floor_plate='';	$scope.advanceSearch.average_floor_plate_value='';
		$scope.advanceSearch.total_no_of_floors=''; 	$scope.advanceSearch.total_no_of_floors_value='';
		$scope.advanceSearch.season_parking_charges='';	$scope.advanceSearch.season_parking_charges_value='';
		$scope.advanceSearch.no_of_car_park=''; 		$scope.advanceSearch.no_of_car_park_value='';
		$scope.advanceSearch.floor_to_ceil_height='';	$scope.advanceSearch.floor_to_ceil_height_value='';
		$scope.advanceSearch.floor_loading='';			$scope.advanceSearch.floor_loading_value='';
		$scope.advanceSearch.monday_friday_ac=''; 		$scope.advanceSearch.monday_friday_ac_value='';
		$scope.advanceSearch.saturday_ac='';			$scope.advanceSearch.saturday_ac_value='';
		$scope.advanceSearch.sundays_public_holidays_ac=''; $scope.advanceSearch.sundays_public_holidays_value='';
		$scope.advanceSearch.ext_charges_ac=''; 		$scope.advanceSearch.ext_charges_value='';
		$scope.advanceSearch.transport_notes=''; 		$scope.advanceSearch.transport_notes_value='';
		$scope.advanceSearch.building_description=''; 	$scope.advanceSearch.building_description_value='';
		$scope.advanceSearch.anchored_tenants='';		$scope.advanceSearch.anchored_tenants_value='';
		$scope.advanceSearch.mng_contact_no=''; 		$scope.advanceSearch.mng_contact_no_value='';
		$scope.advanceSearch.master_plan=''; 			$scope.advanceSearch.master_plan_multiValue='';
		$scope.advanceSearch.tenure=''; 				$scope.advanceSearch.tenure_multiValue='';
		$scope.advanceSearch.floor_system=''; 			$scope.advanceSearch.floor_system_value='';
		$scope.advanceSearch.security_turnstiles=''; 	$scope.advanceSearch.security_turnstiles_value='';
		$scope.advanceSearch.lift= ''; 					$scope.advanceSearch.lift_value='';
		$scope.advanceSearch.loading_bays='';			$scope.advanceSearch.loading_bays_value='';
		
	}
	
	$scope.SaveView=function()
	{
		var temp=$filter('filter')($scope.gridOptions.data, { isActive: true });
		if(temp.length>0)
		{
			$modal.open({
	            templateUrl: 'AdvSearchView',
	            controller: 'CustomViewModalCtrl',
	            //windowClass: 'app-modal-CreatView-window',
	            resolve:
	            {
	            	propertyIds:function(){ return temp; }
	            }
	        });
		}
		
	}
	/* Default Load */
	LoadPropertyGrid();
	
	function LoadAdvanceSearchOptions()
	{
		//Condition DrowDown List
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url:'GetProAdvSearchFieldCondition',
	        method: "POST"
	    }).success(function (data) {
	    	$scope.selectItem=data;
	    	angular.forEach(data,function(val,key){
	    		DefaultDropDownValue(val,key);
	    	});
	    	//console.info(JSON.stringify(data));
	    }).then(function(){
	    	//Field Value List
			$http({
		        headers: { 'Content-Type': 'application/json' },
		        url:'GetProAdvSearchFieldValue',
		        method: "POST"
		    }).success(function (data) {
		    	angular.forEach(data,function(val,key){
		    		$scope.advanceSearch[key]=val;
		    	});
		    	//console.info(JSON.stringify($scope.advanceSearch));
		    }).then(function(){
		    	//Building Class List
				$http({
			        headers: { 'Content-Type': 'application/json' },
			        url:'GetTableData',
			        method: "POST",
			        data:{tableName:'BuildingClasses',orderBy:'name'}
			    }).success(function (data) {
			    	$scope.businessClassList=data;
			    	//console.info(JSON.stringify(data));
			    }).then(function(){
			    	// Zone list
					$http({
				        headers: { 'Content-Type': 'application/json' },
				        url:'GetTableData',
				        method: "POST",
				        data:{tableName:'Zones',orderBy:'zone_name'}
				    }).success(function (data) {
				    	$scope.zoneList=data;
				    	//console.info(JSON.stringify(data));
				    }).then(function(){
				    	// master plan list 
				    	$http({
					        headers: { 'Content-Type': 'application/json' },
					        url:'GetTableData',
					        method: "POST",
					        data:{tableName:'MasterPlan',orderBy:'name'}
					    }).success(function (data) {
					    	$scope.masterPlanList=data;
					    	//console.info(JSON.stringify(data));
					    }).then(function(){
					    	// for tenure list
					    	$http({
						        headers: { 'Content-Type': 'application/json' },
						        url:'GetTableData',
						        method: "POST",
						        data:{tableName:'Tenure',orderBy:'name'}
						    }).success(function (data) {
						    	$scope.tenureList=data;
						    	//console.info(JSON.stringify(data));
						    }).then(function(){
						    	// floor system list
						    	$http({
							        headers: { 'Content-Type': 'application/json' },
							        url:'GetTableData',
							        method: "POST",
							        data:{tableName:'FloorSystem',orderBy:'name'}
							    }).success(function (data) {
							    	$scope.floorSystemList=data;
							    	//console.info(JSON.stringify(data));
							    }).then(function(){
							    	
							    	$http({
								        headers: { 'Content-Type': 'application/json' },
								        url:'GetTableData',
								        method: "POST",
								        data:{tableName:'SecurityTurnstiles',orderBy:'name'}
								    }).success(function (data) {
								    	$scope.securityTurnstilesList=data;
								    	//console.info(JSON.stringify(data));
								    })
							    })
						    	
						    })
					    	
					    })
					    
					    
				    	
				    });
			    });
		    });
	    });	
	}
	
	function LoadPropertyGrid()
	{
		$scope.loading = true;
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'GetPropertyRecords',
	        method: "POST"
	    }).success(function (data) {
	    	angular.forEach(data,function(value,key){
	    		value.isActive=false;
	    	});
	        $scope.gridOptions.data = data; 
	        
	        reSize($scope.gridOptions.paginationPageSize, data.length);
	    }).then(function(){
	    	$scope.loading = false;
	    	LoadAdvanceSearchOptions();
	    });
		
		var reSize = function (paginationPageSize, totalRow) {
		    // This will adjust the css after the Data is loaded
		    var newHeight = 100;
		    if(totalRow > paginationPageSize)
		    	newHeight =(paginationPageSize * 30) + 125;
		    else 
		    	newHeight =(totalRow * 30) + 125;
		    
		    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
		  };
	}
	
	function DefaultDropDownValue(val,key)
	{
		if(val==null)
		{
			$scope.advanceSearch[key]=$scope.conditionList[0];
		}
			
	}
	
}]);

app.controller('CustomViewModalCtrl', ['$scope','$http','$rootScope','$modalInstance','propertyIds', function ($scope,$http,$rootScope,$modalInstance,propertyIds) {
	
	$scope.AdvView={
			viewName:''
	};
	$scope.name='';
	$scope.confirm = function () {
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url:'SavePropertyAdvanceSearchView',
	        method: "POST",
	        data:
	        {
	        	pModuleName:'Property',
	        	pViewName:$scope.AdvView.viewName,
	        	pListOfId:JSON.stringify(propertyIds)
	        }
	    }).success(function (data) {
	    	$modalInstance.close();
	    	//console.info(JSON.stringify(data));
	    });
		//$rootScope.$broadcast('callEventForDeleteProperty', { }); 
    }
	$scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
}]);


/* Import Property Controller*/
app.controller('PropertyImportCtrl', ['$scope','$http','Upload','$window','$sce', function ($scope,$http,Upload,$window,$sce) {

	$scope.propertyFile='';
	$scope.propetyMappingPage=true;
	$scope.propetyImportSuccessPage=false;
	$scope.propertyMappingConfirmationPage=false;
	$scope.result=[];
	$scope.MappingFields=[];
	$scope.FieldsMapping={
			property_name:'',
			chinese_name:'',
			property_address:'',
			property_category_id:'',
			status:'',
			zone_id:'',	
			total_no_of_carpark_lots:'',			
			floor_loading:'',			
			floor_to_ceiling_height:'',		
			year_of_top:'',
			building_class_id:'',
			building_size:'',
			average_floor_plate:'',
			total_number_of_floor:'',
			season_parking_charges:'',
			mondays_through_fridays:'',
			saturdays:'',
			sundays_and_public_holidays:'',
			ext_charges:'',
			transport_notes:'',
			building_description:'',
			anchored_tenants:''
		}
	
	var temp=$window.location.href;
	var result=temp.split('/');
	var index=temp.indexOf('/property');
	url=temp.substring(0, index)+'/property';
	
	if(temp.indexOf('/importpropertymaping')!=-1)
	{
		LoadMappingDropDown();
	}
	
	$scope.SaveImportData = function(){
		 
		 Upload.upload({
	            url: 'SaveImportFile',
	            headers: {'Content-Type': $scope.propertyFile.type},
	            method: 'POST',
	            data: {file: $scope.propertyFile}
		        }).then(function (resp) {
		        	if(resp.data)
		        		$window.location.href=url+'/importpropertymaping';
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
	    	$scope.propetyMappingPage=false;
	    	$scope.propertyMappingConfirmationPage=true;
	    	$scope.propetyImportSuccessPage=false;
	    });
	}
	$scope.FinalSaveImportData=function()
	{
		//$scope.loading = true;
		//$scope.disabled= true;
		$scope.propetyMappingPage=false;
    	$scope.propertyMappingConfirmationPage=false;
    	$scope.propetyImportSuccessPage=true;
		$scope.ListingImportSuccessfullMessage='';
		
		$http({
	        headers: { 'Content-Type': 'application/json' },
	        url: 'FinalImportListingSubmit',
	        method: "post",
	        data:{data:JSON.stringify($scope.FieldsMapping)}
	    }).success(function (data) {
	    	$scope.result=data;
	    	//$scope.ListingImportSuccessfullMessage = $sce.trustAsHtml(data);
	    	//console.info(JSON.stringify(data));
	    });
	}
	
	$scope.BackToImport=function(){
		$window.location.href = url+'/importproperty';
	};

	$scope.BackToMapping=function(){
		$scope.propetyMappingPage=true;
    	$scope.propertyMappingConfirmationPage=false;
    	$scope.propetyImportSuccessPage=false;
	};
	$scope.BackToListing=function(){
		$window.location.href = url;
	};
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
