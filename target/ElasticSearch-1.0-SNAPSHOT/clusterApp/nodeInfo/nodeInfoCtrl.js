app.controller("nodeInfoCtrl", function ($scope, $http, $rootScope) {
    $scope.nodeInfoData = {};
    $rootScope.toolBarName = "Node Info";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_nodes/"+{nodeId})
            .then(function(response) {
            $scope.nodeInfoData = response.data;
            console.log('########## Response Node Info ##############');
            console.log($scope.nodeInfoData);
    });
});