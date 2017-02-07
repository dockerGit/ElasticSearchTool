app.controller("nodeStatsCtrl", function ($scope, $http, $rootScope) {
    $scope.nodeStatsData = {};
    $rootScope.toolBarName = "Node Stats";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_nodes/stats")
            .then(function(response) {
            $scope.nodeStatsData = response.data;
            console.log('########## Response Node Stats ##############');
            console.log($scope.nodeStatsData);
    });
})