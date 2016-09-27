(function(){
/*global Chart*/  
/*global angular*/


// Declare app level module which depends on views, and components
var ang = angular.module('votingApp', ['ngRoute']);


ang.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
              $routeProvider
              .when('/list',{
                 templateUrl:'/../template/poll_list.html',
                 controller:'VotingListController',
                 controllerAs:'v'
              })
              .when('/list/:id',{
                 templateUrl:'/../template/poll_view.html',
                 controller:'pollViewController',
                 controllerAs:'pollView'
              })
              .when('/login',{
                templateUrl:'/../template/login.html',
                controller: 'loginController',
                controllerAs:'lgnctrl'
              })
              .when('/logout',{
                controller: 'loginController'
              })
              .when('/profile',{
                templateUrl:'/../template/profile.html',
                controller: 'profileController'
              })
              .when('/create',{
                templateUrl:'/../template/poll_create.html',
                controller: 'pollCreateController'
              })
              
              .otherwise({redirectTo:'/list'});
              
              //$locationProvider.html5Mode({enabled:true,requireBase: false});
          }]);

})();

