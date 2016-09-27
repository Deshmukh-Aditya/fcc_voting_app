var ang = angular.module('votingApp');

ang.controller('pollViewController',function($scope,$http,$routeParams,Poll){
       var list = this;
       Poll.read('/list/'+$routeParams.id).success(function(data){
           list.polls = data;
          Poll.chart(data);
       })
       .error(function(){
           alert("An unexpected error occured!");
       });
});
