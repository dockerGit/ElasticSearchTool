app = angular.module('clusterApp', ['ngMaterial','ui.router']);
app.controller('ClusterController', function ($scope,$http,$rootScope) {
       $scope.hosts = [
           {"value": "10.1.20.41","text":"BB India","code":"IND"},
           {"value": "10.10.7.13","text":"BB SG","code":"SG"}           
           
       ]
    if (angular.isUndefined($rootScope.hostSelected)){
        $rootScope.hostSelected = '10.1.20.41';
    }
    $scope.hostUrl = $rootScope.hostSelected;
  });    
    
app.directive("logoHeader", function() {
    return {
        scope: true,
        templateUrl : '/clusterApp/logoHeader/logoHeader.html',
        restrict: 'E',
        controller: function($scope, $rootScope, $state){
            $scope.countryChanged =  function (){
                    $rootScope.hostSelected = $scope.hostUrl;
                    $state.reload();
                };
        }
    };
});
    
app.directive("navBar", function() {
    return {
        scope: true,
        templateUrl : '/clusterApp/navbar/navbar.html',
        restrict: 'E',
        controller: function($scope,$state){
                $scope.stateChanged = function (stateName){
                    $state.go(stateName);
                };
        }
    };
});
    
app.directive("toolbarHome", function() {
    return {
        scope: true,
        templateUrl : '/clusterApp/toolbarHome/toolbarHome.html',
        restrict: 'E',
        controller: function($scope, $rootScope){
                this.toolBarName = $rootScope.toolBarName;
        }
    };
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl : "/clusterApp/clusterHealth/clusterHealth.html",
        controller : "clusterHealthCtrl"
    })
    .state('cluster', {
        url: '/cluster',
        templateUrl : "/clusterApp/clusterHealth/clusterHealth.html",
        controller : "clusterHealthCtrl"
    })
    .state("clusterState", {
        url: '/cluster/State',
        templateUrl : "/clusterApp/clusterState/clusterState.html",
        controller : "clusterStateCtrl"
    })
    .state("clusterStats", {
        url: '/cluster/Stats',
        templateUrl : "/clusterApp/clusterStats/clusterStats.html",
        controller : "clusterStatsCtrl"
    })
    .state("clusterPendingTask", {
        url: '/cluster/pendingTask',
        templateUrl : "/clusterApp/pendingClusterTask/pendingClusterTask.html",
        controller : "pendingClusterTaskCtrl"
    })
    .state("nodesInfo", {
        url: '/cluster/nodes',
        templateUrl : "/clusterApp/nodesInfo/nodesInfo.html",
        controller : "nodesInfoCtrl"
    })
    .state("nodeInfo", {
        url: '/cluster/nodes/{nodeId}',
        templateUrl : "/clusterApp/nodeInfo/nodeInfo.html",
        controller : "nodeInfoCtrl"
    })
    .state("nodesStats", {
        url: '/cluster/nodes/stats',
        templateUrl : "/clusterApp/nodesStats/nodesStats.html",
        controller : "nodesStatsCtrl"
    })
    .state("nodeStats", {
        url: '/cluster/nodes/{nodeId}/stats',
        templateUrl : "/clusterApp/nodeStats/nodeStats.html",
        controller : "nodeStatsCtrl"
    })
    .state("diskAllocation", {
        url: '/cluster/diskAllocation',
        templateUrl : "/clusterApp/diskAllocation/diskAllocation.html",
        controller : "diskAllocationCtrl"
    })
    .state("nodesV", {
        url: '/cluster/nodesV',
        templateUrl : "/clusterApp/nodesV/nodesV.html",
        controller : "nodesVCtrl"
    })
    .state("shards", {
        url: '/cluster/shards',
        templateUrl : "/clusterApp/shards/shards.html",
        controller : "shardsCtrl"
    })
    .state("indices", {
        url: '/cluster/indices',
        templateUrl : "/clusterApp/indices/indices.html",
        controller : "indicesCtrl"
    });
    
    $urlRouterProvider.otherwise('/#/');
});

app.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
