app.controller("clusterStatsCtrl", function ($scope, $http, $rootScope) {
    $scope.clusterStatsData = {};
    $rootScope.toolBarName = "Cluster Stats";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_cluster/stats?human&pretty")
            .then(function(response) {
            $scope.clusterStatsData = response.data;
            console.log('########## Response Data Cluster Stats ##############');
            console.log($scope.clusterHealthData);
    });
});
