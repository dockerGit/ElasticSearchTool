app.controller("elkReportCtrl", function ($scope, $http, $rootScope, $state,$mdDialog) {
    $scope.clusterHealthData = {};
    $rootScope.toolBarName = "Generate Elk Report";
    $scope.indexes =    ['*api*',
                        '*axis*',
                        '*axis-*',
                        '*bankbridgeservice*',
                        '*bankdb*',
                        '*bb-api-*',
                        '*campaign-tool*',
                        '*cc-axis*',
                        '*cds*',
                        '*cibil*',
                        '*cobrand*',
                        '*cp-*',
                        '*csdb*',
                        '*dataservice*',
                        '*dialerservice*',
                        '*digitalsignatureservice*',
                        '*export-service*',
                        '*exportservice*',
                        '*gratter*',
                        '*hdfc*',
                        '*hdfclimited*',
                        '*icici*',
                        '*indusind*',
                        '*indusind-pl*',
                        '*insurance-csdb*',
                        '*internal-cp*',
                        '*job-csdb*',
                        '*loans-axis*',
                        '*loans-icici*',
                        '*md*',
                        '*mfservice*',
                        '*mis-service*',
                        '*mp-*',
                        '*mpinsurance-*',
                        '*newgen*',
                        '*nginx*',
                        '*notificationservice*',
                        '*ops-csdb*',
                        '*personalfinanceservice*',
                        '*ratealert-notificationservice*',
                        '*tablet-icici*',
                        '*txnanalysis*',
                        '*userreviewservice*'];
    $scope.types=['*','tomcat','nginx'];
    $scope.hosts=['','w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
    //$scope.LTEminDate = "";
    $scope.maxDate = new Date();//.toJSON();
    $scope.maxDateGTE = new Date();
    $scope.userInputData = {};
    $scope.userInputData.dateRangeLTE = '';
    $scope.userInputData.method='report';
    $scope.userInputData.index='*api*';
    $scope.userInputData.type='*';
    $scope.userInputData.filename='test';
    $scope.userInputData.message='*';
    $scope.userInputData.url="http://10.1.20.41:9200";
    $scope.required = true;
    
    $scope.submitToServer = function(){
                var randomId = (Math.ceil((Math.random()+1) * 10000 +(Math.random()+1) * 1000 +(Math.random()+1) * 100+(Math.random()+1) * 10+Math.random())) + '';
                $scope.userInputData.filename = $scope.userInputData.filename +'_' + randomId +'.csv';
                console.log('########## Data submitted to Server ##############');
                console.log($scope.userInputData);
                $http.post("http://localhost:8081/rest/search/report",$scope.userInputData)
                .then(function(response) {
                        console.log('########## Response From Server ##############');
                        console.log(response);
                });
                /*$http.get("http://localhost:8081/rest/search/report")
                 .then(function(response) {
                 console.log('########## Response From Server ##############');
                 console.log(response);
                 });*/
            };
      $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
    
    
    $scope.refreshPage = function(){
        $state.reload();
    };
    });
