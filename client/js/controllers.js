tollplazaApp.controller('homeCtrl', function($rootScope, $scope, tollplazaFactory) {
  $scope.vehicles = [];
  $scope.isEditable = [];
  $scope.addFlag = false;
  $scope.vehiclesDetails = {
  "vehicleNo":"",
  "transportType":"",
  "wheelsCount":0,
  "axleCount":0,
  "governmentVehicle":"",
  "toll":0
};
var addVehicle =  {};
  // get all vehicles on Load
  tollplazaFactory.getVehicles().then(function(data) {
    $scope.vehicles = data.data;
  });

  // Save a vehicle to the server
  $scope.save = function($event) {
    if ($event.which == 13 && $scope.vehiclesInput) {

      tollplazaFactory.saveVehicles({
        "vehicles": $scope.vehiclesInput,
        "isCompleted": false
      }).then(function(data) {
        $scope.vehicles.push(data.data);
      });
      $scope.vehiclesInput = '';
    }
  };

$scope.calculateToll = function()
{

  $scope.vehiclesDetails.wheelsCount = parseInt($scope.vehiclesDetails.wheelsCount);
  $scope.vehiclesDetails.axleCount = parseInt($scope.vehiclesDetails.axleCount);

  if($scope.vehiclesDetails.governmentVehicle=='Yes')
  {
    $scope.vehiclesDetails.toll = 0
  }
  else{
  if($scope.vehiclesDetails.wheelsCount==2)
  {
    $scope.vehiclesDetails.toll = 20;
  }
  else if($scope.vehiclesDetails.wheelsCount==3)
  {
    $scope.vehiclesDetails.toll = 50;
  }
  else if($scope.vehiclesDetails.wheelsCount==4 && $scope.vehiclesDetails.transportType=='NonTransport')
  {
    $scope.vehiclesDetails.toll = 100;
  }
  else if($scope.vehiclesDetails.wheelsCount==4 && $scope.vehiclesDetails.transportType=='Transport' )
  {
    $scope.vehiclesDetails.toll = 200;
  }
  else if($scope.vehiclesDetails.wheelsCount==6)
  {
    $scope.vehiclesDetails.toll = 500;
  }
  else if($scope.vehiclesDetails.wheelsCount>6 && $scope.vehiclesDetails.axleCount>2)
  {
    $scope.vehiclesDetails.toll = 500 + 100 * ($scope.vehiclesDetails.axleCount-2);
  }
  }
  addVehicle = {
    "vehicleNo":$scope.vehiclesDetails.vehicleNo,
    "transportType":$scope.vehiclesDetails.transportType,
    "wheelsCount":parseInt($scope.vehiclesDetails.wheelsCount),
    "axleCount":parseInt($scope.vehiclesDetails.axleCount),
    "governmentVehicle":$scope.vehiclesDetails.governmentVehicle,
    "toll":$scope.vehiclesDetails.toll
  }


tollplazaFactory.saveVehicles({
  "vehicleNo":$scope.vehiclesDetails.vehicleNo,
  "type":$scope.vehiclesDetails.transportType,
  "wheelsCount":parseInt($scope.vehiclesDetails.wheelsCount),
  "axleCount":parseInt($scope.vehiclesDetails.axleCount),
  "governmentVehicle":$scope.vehiclesDetails.governmentVehicle,
  "toll":$scope.vehiclesDetails.toll
}).then(function(data) {
  if(data.data.resultcode==1||data.data.resultcode=='1')
  {
    $scope.addFlag = true;
    $scope.vehiclesDetails = {
      "vehicleNo":"",
      "transportType":"",
      "wheelsCount":0,
      "axleCount":0,
      "governmentVehicle":"",
      "toll":0
    };
addVehicle = {};
  }
  else{
    $scope.addFlag = false;
  }


});

};

$scope.addAnother = function()
{
  $scope.addFlag = false;
}
  
});


tollplazaApp.controller('tollCtrl', function($rootScope, $scope, tollplazaFactory) {
  $scope.vehiclesList = {};

$scope.List = function(){

    // get all vehicle list
    tollplazaFactory.getVehicles().then(function(data) {
      $scope.vehiclesList = data.data;
      console.log($scope.vehiclesList);
    });
};
$scope.List();
});
