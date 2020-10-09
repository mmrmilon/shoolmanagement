var app = angular.module('HomePage',['ng-fusioncharts']);

app.controller('HomeCtrl', [ '$scope', '$http', '$filter', function($scope, $http, $filter) {	
	$scope.piechartarray = [];	
	$http({
	    headers: {'Content-Type': 'application/json'},
	    url: 'home/GetAlumniSummary',
	    method: "POST"
	  }).success(function(data) {
		  angular.forEach(data, function (value, key) {	
	    		$scope.piechartarray.push({ 'label': value.passing_year, 'value': value.total_alumni });
	         });
	  });
		
	// chart details
	$scope.myDataSource = {
		    chart: {
		        caption: "50 Year Anniversary",
		        subcaption: "Join the party",
		        startingangle: "120",
		        showlabels: "1",
		        showlegend: "1",
		        enablemultislicing: "0",
		        slicingdistance: "15",
		        showpercentvalues: "1",
		        showpercentintooltip: "0",
		        plottooltext: "Year : $label Total Student : $datavalue",
		        theme: "fint"
		    },
		    data: $scope.piechartarray
		}
}]);






















