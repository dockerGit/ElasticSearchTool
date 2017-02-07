app.controller("clusterStateCtrl", function ($scope, $http, $rootScope) {
    $scope.clusterStateData = {};
    $rootScope.toolBarName = "Cluster State";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_cluster/state")
            .then(function(response) {
            $scope.clusterStateData = response.data;
            console.log('########## Response Data Cluster State ##############');
            console.log($scope.clusterStateData);
    });
});