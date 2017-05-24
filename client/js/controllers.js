tollplazaApp.controller('homeCtrl', function($rootScope, $scope, tollplazaFactory) {
  $scope.vehicles = [];
  $scope.isEditable = [];
  $scope.addFlag = false;
  $scope.vehiclesDetails = {
  "vehicleNo":"",
  "transportType":"",
  "wheelsCount":"",
  "axleCount":"",
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
    $scope.vehiclesDetails.toll = 0;
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
  };


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
      "wheelsCount":"",
      "axleCount":"",
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
};

});


tollplazaApp.controller('tollCtrl', function($rootScope, $scope, tollplazaFactory) {
  $scope.vehiclesList = {};
  $scope.state = "MH";
$scope.List = function(){

    // get all vehicle list
    tollplazaFactory.getVehicles().then(function(data) {
      $scope.vehiclesList = data.data;
      $scope.total = $scope.vehiclesList.length;
      $scope.gVehicles = 0;
      $scope.sVehicles = 0;
      $scope.totalToll = 0;
      $scope.wheeler2 = 0;
      $scope.wheeler3 = 0;
      $scope.wheeler4 = 0;
      $scope.wheeler6 = 0;
      $scope.multiAxle = 0;
      $scope.trans = 0;
      $scope.nonTrans = 0;

      for (var i=0;i<$scope.total;i++)
      {
        
        if($scope.vehiclesList[i].vehicleNo.substring(0, 2)==$scope.state)
        {
          $scope.sVehicles++;
          $scope.vehiclesList[i].toll = 0;
        }
        if($scope.vehiclesList[i].governmentVehicle=="Yes")
        {
          $scope.gVehicles++;
        }
        if($scope.vehiclesList[i].wheelsCount==2)
        {
          $scope.wheeler2++;
        }
        if($scope.vehiclesList[i].wheelsCount==3)
        {
          $scope.wheeler3++;
        }
        if($scope.vehiclesList[i].wheelsCount==4)
        {
          $scope.wheeler4++;
        }
        if($scope.vehiclesList[i].wheelsCount==6)
        {
          $scope.wheeler6++;
        }
        if($scope.vehiclesList[i].wheelsCount>6)
        {
          $scope.multiAxle++;
        }
        if($scope.vehiclesList[i].type=="Transport")
        {
          $scope.trans++;
        }
        if($scope.vehiclesList[i].type=="NonTransport")
        {
          $scope.nonTrans++;
        }
        $scope.totalToll = $scope.totalToll + $scope.vehiclesList[i].toll;
      }

    });
};
//$scope.List();
});
