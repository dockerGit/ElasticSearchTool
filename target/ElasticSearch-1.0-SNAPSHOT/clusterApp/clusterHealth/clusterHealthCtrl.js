app.controller("clusterHealthCtrl", function ($scope, $http, $rootScope) {
    $scope.clusterHealthData = {};
    $rootScope.toolBarName = "Cluster Health";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_cluster/health")
            .then(function(response) {
            $scope.clusterHealthData = response.data;
            console.log('########## Response Data Cluster Health ##############');
            console.log($scope.clusterHealthData);
    });
});
