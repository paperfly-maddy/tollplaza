tollplazaApp.factory('tollplazaFactory', function($http) {
  var urlBase = '/api/vehicles';
  var _tollplazaService = {};

  _tollplazaService.getVehicles = function() {
    return $http.get(urlBase);
  };

  _tollplazaService.saveVehicles = function(vehicles) {
    return $http.post(urlBase, vehicles);
  };

  return _tollplazaService;
});
