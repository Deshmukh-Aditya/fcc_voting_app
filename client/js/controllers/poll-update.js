
var ang = angular.module('votingApp');

ang.controller("submitPoll",['$scope','$http','$location','Poll',function($scope,$http,$location,Poll){
  
  $scope.submitOption = function(id,data){
    var parameter = JSON.stringify(data);
    if(data!==undefined){
        Poll.update('/list/'+id,parameter).success(function(){
           alert("Thank you for providing your opinion!");
           var list = this;
           Poll.read('/list/'+id).success(function(data){
             list.polls = data;
             var poll = list.polls; 
             Poll.chart(poll);
           })
          .error(function(){
              alert("An unexpected error occured!");
          });
        });
    }
    else{
      alert("Please choose an option!!");
    }
  };
}]);
