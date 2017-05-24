tollplazaApp = angular.module('tollplazaApp', ['ngRoute'])
  .config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'homeCtrl'
      })
      .when('/toll', {
        templateUrl: '/partials/toll.html',
        controller: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
