angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})



//Loading screen overlay function
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Loading..'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })

})
//END of Loading Function



//Retrieve Payment History
.controller('MainCtrl', function($scope, $http) {
 $http.get('https://butlerspay.dev.fireworkx.com/api/pizza').then(function(resp) {
    console.log('Success', resp);
    $scope.payments = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})



//Post Amount Method
.controller('PayCtrl', function ($scope, $http) {
    $scope.Response = "Send message";
    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');
            $scope.Response = "Sending..."
            $http({
                method: "POST",
                url: "https://butlerspay.dev.fireworkx.com/api/pizza/pay",
                headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
               },
                data: {
                    'Amount': '=' + $scope.Amount
                }
            }).success(function (data) {
                var response = data.split('\"').join('');
                $scope.Response = response;
                $('#userForm')[0].reset();
            });

    };
})








.filter("mydate", function() {
    var re = /\\\/Date\(([0-9]*)\)\\\//;
    return function(x) {
        var m = x.match(re);
        if( m ) return new Date(parseInt(m[1]));
        else return null;
    };
})
















