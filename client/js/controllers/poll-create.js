
var ang = angular.module('votingApp');

ang.controller("pollCreateController",function($scope,$location,Poll){
    
    $scope.createPoll = function(question,options){
        var body = {"question":question,"options":options};
        Poll.create("/list/newpoll",body).success(function(data){
            Poll.read('/profile').success(function(user){
                var data = {"user":user,"question":question};
                Poll.update('/list/updateuser/postq',data).success(function(){
                    alert("Thank you for creating this poll");
                    $location.url('/list');
                });
            });
        });
    };
});
