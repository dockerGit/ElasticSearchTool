app.controller("nodesInfoCtrl", function ($scope, $http, $rootScope) {
    $scope.nodesInfoData = {};
    $rootScope.toolBarName = "Nodes Info";
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_nodes")
            .then(function(response) {
            $scope.nodesInfoData = response.data;
            console.log('########## Response Nodes Info ##############');
            console.log($scope.nodesInfoData);
    });
});