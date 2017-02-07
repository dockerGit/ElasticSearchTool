app.controller("nodesStatsCtrl", function ($scope, $http, $rootScope) {
    $scope.nodesStatsData = {};
    $rootScope.toolBarName = "Nodes Stats";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_nodes/stats")
            .then(function(response) {
            $scope.nodesStatsData = response.data;
            console.log('########## Response Nodes Stats ##############');
            console.log($scope.nodesStatsData);
    });
})