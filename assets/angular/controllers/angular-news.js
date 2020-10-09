var app = angular.module('ngNewsApp',['ngTouch','ngAnimate','ui.bootstrap','ngSanitize']);

app.controller('NewsCtrl', [ '$scope', '$http', '$filter', function($scope, $http, $filter) {	
    $scope.newslist = [];
	$scope.NewsEntity = {news_id:0, member_id:0, head_line:'', details:'', news_photo:'', post_on:''};
	
	// Load event list
	LoadNewsList();	
	  
	// Submit Alumni Information
    $scope.news = {
    		save: function () {    
   			 $scope.NewsEntity.post_on = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
   			 console.info($scope.NewsEntity); 
             
   			 $http.post('SaveNews', { data: $scope.NewsEntity})
             .success(function (data, status, headers, config) 
             {
            	 if(data)
            	 {
            		 alert('Saved');
            		 LoadNewsList();
            	 }
            	 else
            		 alert(data);
            	 
             }).error(function (data, status, headers, config) {
             });
             
    	}
    }
    
    $scope.edit = function (entity){
    	console.info(entity);
    	$scope.NewsEntity.news_id = entity.news_id;
    	$scope.NewsEntity.member_id = entity.member_id;
    	$scope.NewsEntity.head_line = entity.head_line;
    	$scope.NewsEntity.details = entity.details;
    	$scope.NewsEntity.news_photo = entity.news_photo;
    	$scope.NewsEntity.post_on = entity.post_on;
    }
    
    $scope.load = function () {
    	LoadNewsList();
    }
        
    function LoadNewsList(){
    	$scope.newslist = [];
    	$http({
    	    headers: {'Content-Type': 'application/json'},
    	    url: 'GetNewsList',
    	    method: "POST"
    	  }).success(function(data) {
    		  $scope.newslist = data;
    	  });
    }
    
}]);