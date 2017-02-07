app = angular.module('elkApp', ['ngMaterial','ui.router','ngMessages','ui.bootstrap.datetimepicker','moment-picker']);
app.controller('elkController', function ($scope,$http,$rootScope) {
/*       $scope.hosts = [
           {"value": "10.1.20.41","text":"BB India","code":"IND"},
           {"value": "10.10.7.13","text":"BB SG","code":"SG"}           
           
       ]
    if (angular.isUndefined($rootScope.hostSelected)){
        $rootScope.hostSelected = '10.1.20.41';
    }
    $scope.hostUrl = $rootScope.hostSelected;*/
  });    
    
app.directive("logoHeader", function() {
    return {
        scope: true,
        templateUrl : '/elkApp/logoHeader/logoHeader.html',
        restrict: 'E',
        controller: function($scope, $rootScope, $state){
            /*$scope.countryChanged =  function (){
                    $rootScope.hostSelected = $scope.hostUrl;
                    $state.reload();
                };*/
        }
    };
});
    
app.directive("navBar", function() {
    return {
        scope: true,
        templateUrl : '/elkApp/navbar/navbar.html',
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
        templateUrl : '/elkApp/toolbarHome/toolbarHome.html',
        restrict: 'E',
        controller: function($scope, $rootScope){
                this.toolBarName = $rootScope.toolBarName;
        }
    };
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl : "/elkApp/elkReport/elkReport.html",
        controller : "elkReportCtrl"
    })
    .state('elkReport', {
        url: '/elkReport',
        templateUrl : "/elkApp/elkReport/elkReport.html",
        controller : "elkReportCtrl"
    });
    
    $urlRouterProvider.otherwise('/#/');
});

app.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
