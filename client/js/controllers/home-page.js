var ang = angular.module('votingApp');

ang.controller("logoutController",function(Poll){
  Poll.read('/logout');
});

ang.controller("pollController",function($scope,Poll){
    
    Poll.read('/check').success(function(data){
        
        if(data==0){
            $scope.flag = false;
        }
        else if(data==1){
            $scope.flag = true;
        }
        
    });
    
  
});
