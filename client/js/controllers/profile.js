var ang = angular.module('votingApp');

ang.controller("profileController",function($scope,$window,Poll){
  var profile = this;
  $scope.openurl = function(data){
      Poll.read(data.replace("?","%3F")).success(function(data){
          $window.location.href = data;
      });
  };
  
  $scope.delete = function(data){
      Poll.delete(data.replace("?","%3F")).success(function(res){
          alert(res);
          $window.location.reload();
      });
  };
  
  Poll.read('/profile').success(function(data){
   profile.user = data;
  });
  
});
