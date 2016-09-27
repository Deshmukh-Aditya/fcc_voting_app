var ang = angular.module('votingApp');

ang.controller("VotingListController",['$scope','$http','Poll',function($scope,$http,Poll){
  var list = this;
  Poll.read('/list').success(function(data){
    list.polls=data;
  });
}]);
