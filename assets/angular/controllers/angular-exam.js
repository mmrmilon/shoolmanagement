var exam = angular.module("exam", ["xeditable", "ui.bootstrap"]);

exam.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

/*Exam Listing, Add and Edit Operation*/
exam.controller('ExamCtrl', function($scope, $filter, $http) {
	// Declare the entries
	$scope.exams = [];
	$scope.years = [];
	$scope.exam = {
			end_date: new Date(1984, 4, 15)
		};
	$scope.datepickerOptions = {
		    datepickerMode:"'year'",
		    minMode:"'year'",
		    minDate:"minDate",
		    showWeeks:"false",
		 };
	
	$http({
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    url: 'GetExamRecords',
	    method: "POST"
	  }).success(function(data) {
	    $scope.exams = data;
	  });
	
	$scope.refresh = function(){
		$http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetExamRecords',
		    method: "POST"
		  })
		  .success(function(data) {
		    $scope.exams = data;
		  });
    };
	
	$scope.loadCategory = function() {
	    return $scope.categories.length ? null : $http({
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    url: 'GetCategoryList',
		    method: "POST",
		    data: $.param({"id" : 1,"categories" : 'small'}),
		  })
		  .success(function(data) {
		    $scope.categories = data;
		  });
	  };
	  
	$scope.showCategory = function(service) {
	    var selected = [];
	    if(service.category_id && $scope.categories.length) {
	      selected = $filter('filter')($scope.categories, {category_id: service.category_id});
	      return selected.length ? selected[0].text : 'Not set';
	    }else {
	      return service.category_name || 'Not set';
	    }
	  };
  
	$scope.checkExamName = function(data, id) {
	    if (data === '') {
	      return "Exam name should not be empty";
	    }
	  };
	  
	 $scope.checkExamDate = function(data, id) {
	    if (data === '') {
	      return "Date should not be empty";
	    }
	  };
	  
	  $scope.checkExamYear = function(data, id) {
	    if (data === '') {
	      return "Year should not be empty";
	    }
	  };
	  
	  
  
	//Add and Update data POST
	$scope.updateExamDetails = function(data, exam_id) {
	    angular.extend(data, {exam_id: exam_id});
	    $http.post('/sonaichandischool/member/UpdateExamRecords', data).success(function(data, status, headers, config) {
	        return $scope.refresh();
		  }).error(function(data, status, headers, config){          
	      });
  	};

  // Add Service
  $scope.addExamSchedule = function() {
    $scope.inserted = {
    		exam_id: 0,
    		exam_name: '',
    		exam_type: '',
    		start_date: '',
    		end_date:'',
    		exam_year:''
    };
    $scope.exams.push($scope.inserted);
  };
  
});

//--------------- mock $http requests ----------------------
/*app.run(function($httpBackend) {
  $httpBackend.whenGET('/groups').respond([
    {id: 1, text: 'user'},
    {id: 2, text: 'customer'},
    {id: 3, text: 'vip'},
    {id: 4, text: 'admin'}
  ]);
    
  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    return [200, {status: 'ok'}];
  });
});*/