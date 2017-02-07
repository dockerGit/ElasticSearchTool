app.controller("shardsCtrl", function ($scope, $http, $rootScope) {
    $scope.shardsData = [];
    $rootScope.toolBarName = "Indexes/Shards";
    host = $rootScope.hostSelected;
    $scope.show = false;
    $http.get("http://"+host+":9200/_cat/shards?v")
            .then(function(response) {
            var shardsResponse = response.data;
            //console.log('########## Response Data shards Response Response ##########');
            //console.log(shardsResponse);
            //console.log('########## Converted Response Data Disk Allocation Response ##########');
            $scope.shardsData = covertToJSON(shardsResponse);
            $scope.shardsDataLen = $scope.shardsData.length;
            $scope.newShardsData = restructureData($scope.shardsData);
            console.log('########## Re-structured Shards Response ##########');
            //generateChartData();
            delete $scope.shardsData;
            //console.log($scope.newShardsData);
        
    });
    
    function covertToJSON(rowData){
        var convertedData = [];
        var lines = rowData.split('\n');
        var keys = lines[0].split(' ');
        /*console.log('########## Keys ##########'+'   length = '+keys.length);
        console.log(keys);*/
        for(var i = 1;i < lines.length;i++){
            var vals = lines[i].split(' ');
            /*console.log('########## vals ##########'+'   length = '+vals.length);
            console.log(vals);*/
            var newJSON = {};
            var k = 0;
                for(var j=0;j<keys.length;j++){
                    while(vals[k] == "" && k<vals.length)
                        k++;
                    if(vals[k] != "" && keys[j] != ""){
                        newJSON[keys[j]] = vals[k];
                        k++;
                    }
                    else{
                        if(keys[j] != "" && k>=vals.length)
                            newJSON[keys[j]] = "";
                    }    
                }
            convertedData.push(newJSON);
        }
        return convertedData;
    }
    
    function restructureData(oldData){
        var listData = {};
        var dataLen = oldData.length;
        for(var i=0; i < dataLen; i++){
            var itrObj = oldData[i];
            if(angular.isUndefined(itrObj['index']))
                continue;
            if(itrObj['index'].split("-").length>1){
                var firstChildKey = itrObj['index'].slice(0,itrObj['index'].length-11);
                var secondChildKey = itrObj['index'].slice(itrObj['index'].length-10,itrObj['index'].length);
            }
            else{
                var firstChildKey = itrObj['index'];
                var secondChildKey = "";
            }
            var thirdChildKey = itrObj['state'];
            if(angular.isUndefined(listData[firstChildKey])){
                listData[firstChildKey] = {};
            }
            if(secondChildKey != ""){
               if(angular.isUndefined(listData[firstChildKey][secondChildKey])){
                listData[firstChildKey][secondChildKey] = [];
                }
                listData[firstChildKey][secondChildKey].push(oldData[i]);  
            }
            else{
                if(angular.isUndefined(listData[firstChildKey][thirdChildKey])){
                    listData[firstChildKey][thirdChildKey] = [];
                }
                listData[firstChildKey][thirdChildKey].push(oldData[i]);
            } 
        }
        return listData;
    }
    
/*        function restructureData(oldData){
        var listData = {};
        var dataLen = oldData.length;
        for(var i=0; i < dataLen; i++){
            var itrObj = oldData[i];
            if(angular.isUndefined(itrObj['index']))
                continue;
            if(itrObj['index'].split("-").length>1){
                var firstChildKey = itrObj['index'].slice(0,itrObj['index'].length-11);
                var secondChildKey = itrObj['index'].slice(itrObj['index'].length-10,itrObj['index'].length);
            }
            else{
                var firstChildKey = itrObj['index'];
                var secondChildKey = "";
            }
            var thirdChildKey = itrObj['state'];
            if(angular.isUndefined(listData[firstChildKey])){
                listData[firstChildKey] = {};
            }
            if(secondChildKey != ""){
               if(angular.isUndefined(listData[firstChildKey][secondChildKey])){
                listData[firstChildKey][secondChildKey] = {};
                }
                if(angular.isUndefined(listData[firstChildKey][secondChildKey][thirdChildKey])){
                    listData[firstChildKey][secondChildKey][thirdChildKey] = [];
                }
                listData[firstChildKey][secondChildKey][thirdChildKey].push(oldData[i]);  
            }
            else{
                if(angular.isUndefined(listData[firstChildKey][thirdChildKey])){
                    listData[firstChildKey][thirdChildKey] = [];
                }
                listData[firstChildKey][thirdChildKey].push(oldData[i]);
            } 
        }
        return listData;
    }*/
});