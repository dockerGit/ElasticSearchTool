app.controller("pendingClusterTaskCtrl", function ($scope, $http, $rootScope) {
    $scope.pendingClusterTaskData = {};
    $rootScope.toolBarName = "Cluster Pending Task";
    $scope.show = false;
    host = $rootScope.hostSelected;
    $http.get("http://"+host+":9200/_cluster/pending_tasks")
            .then(function(response) {
            $scope.pendingClusterTaskData = response.data;
            console.log('########## Response Data PendingClusterTaskData ##############');
            console.log($scope.pendingClusterTaskData);
    });
/*    $scope.pendingClusterTaskData = {
   "tasks": [
      {
         "insert_order": 101,
         "priority": "URGENT",
         "source": "create-index [foo_9], cause [api]",
         "time_in_queue_millis": 86,
         "time_in_queue": "86ms"
      },
      {
         "insert_order": 46,
         "priority": "HIGH",
         "source": "shard-started ([foo_2][1], node[tMTocMvQQgGCkj7QDHl3OA], [P], s[INITIALIZING]), reason [after recovery from shard_store]",
         "time_in_queue_millis": 842,
         "time_in_queue": "842ms"
      },
      {
         "insert_order": 45,
         "priority": "HIGH",
         "source": "shard-started ([foo_2][0], node[tMTocMvQQgGCkj7QDHl3OA], [P], s[INITIALIZING]), reason [after recovery from shard_store]",
         "time_in_queue_millis": 858,
         "time_in_queue": "858ms"
      }
  ]
};*/
});