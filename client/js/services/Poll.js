var ang = angular.module('votingApp');


ang.factory("Poll",['$http',function PollingApp($http){
   return {
       read: function(url) {
           console.log(url);
           return $http.get(url);
       },
       create: function(url,data){
           return $http.post(url,data);
       },
       update: function(url,data){
           return $http.put(url,data);
       },
       delete: function(data){
           return $http.delete(data);
       },
       chart: function(data){
          var pollOption = [];
          var pollCount = [];
          var poll = data; 
          for(var i=0;i<poll[0].vote.length;i++){
            pollOption.push(poll[0].vote[i].option);
            pollCount.push(poll[0].vote[i].count);
          }
          var ctx = document.getElementById("myChart");
          
          var myChart = new Chart(ctx, {
              type: 'pie',
              data: {
                  labels: pollOption,
                  datasets: [{
                      label:"",
                      data: pollCount,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(225, 92, 92, 0.6)',
                          'rgba(153, 102, 255, 0.6)',
                          'rgba(255, 159, 64, 0.6)'
                      ],
                      borderColor: [
                          'rgba(255,99,132,1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(225, 92, 92, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1,
                  }]
              },
              options: {
                  legend: {
                      display: true
                  },
                  scales: {
                      yAxes: [{
                          display: false
                      }]
                  }
              }
          });
          
        }
   } ;
}]);
