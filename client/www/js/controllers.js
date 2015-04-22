angular.module('caixinha.controllers', ['caixinha.services','ngCordova'])
.controller('MainContainerCtrl', function($scope,$state,LoginService) {
$scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
$scope.logout = function() {
  LoginService.logout();
  $state.go('login');
}
})
.controller('TabsPageCtrl', function($scope) {
  $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
})
.controller('LoginCtrl', function($scope,$window,$state,LoginService,AuthenticationService,RegisterService) {
  $scope.user = {};

  $scope.login = function() {
      LoginService.login($scope.user).success(function(data){

      if(data.type) {

        AuthenticationService.isLogged = true;
        $window.sessionStorage['token'] = data.data.token;
        console.log("token" + $window.sessionStorage['token']);
        $window.sessionStorage['user'] = JSON.stringify(data.data);

        $state.go('main.tab.minibox',  null, { reload: true });
      } else {
        alert('Usuário ou senha errada');
      }
      }).error(function(status){
        alert('Erro');
      })
    

  }

})
.controller('RegisterCtrl', function($scope,$window,$state,AuthenticationService,RegisterService) {
  $scope.user = {};

  $scope.register = function() {

      RegisterService.register($scope.user)
      .success(function(userdata){
        AuthenticationService.isLogged = true;
 
          $window.sessionStorage['token'] = userdata.token;
          $window.sessionStorage['user'] = JSON.stringify(userdata); 
          

          $state.go('main.tab.minibox', null, { reload: true });
          $scope.user = {};
      })
      .error(function(status){
        alert('Erro');
      })
  }

})

.controller('MiniboxCtrl', function($scope,$window,Users) {
  $scope.title = '<i class="icon ion-briefcase"></i> Caixa';

  $scope.users = Users.query();

})

.controller('PurchaseCtrl', function($scope, $cordovaSQLite,PurchaseService) {

  $scope.title = '<i class="icon ion-briefcase"></i> Compras';

  //Populates the ItemTypes
  PurchaseService.getItemTypes().then(function(itemsTypes) {
             $scope.itemsTypes = itemsTypes;
       });
})

.controller('PurchaseDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ContributionCtrl', function($scope,$state,$window,$ionicModal, ContributionService) {
  $scope.title = '<i class="icon ion-briefcase"></i> Contribuições';
	  
  ContributionService.getAll().then(function(data) {
    $scope.contributions = data.data;
  });

  $ionicModal.fromTemplateUrl('templates/add-contribution.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.addContribution = function(newContribution) {
    var user = JSON.parse($window.sessionStorage['user'] || {});
    var contributionModel = {
      contributor: user._id,
      date: Date.now(),
      value: newContribution.value
    };
    
    ContributionService.save(contributionModel).then(function(data) {
      $scope.modal.hide();
      $state.go($state.current, {}, {reload: true});
    });
  };

});

//.controller('AddContributorCtrl', function($scope,$state,$window, Contributions) {
 // $scope.title = '<i class="icon ion-briefcase"></i> Adicionar Contribuição';
 // $scope.contribution = {};

//  $scope.addContribution = function() {
  	
  //	var newContribution = new Contributions();
  	//newContribution.value = $scope.contribution.value;
   // newContribution.date = Date.now();
   // newContribution.user = $window.sessionStorage.user;

  //	newContribution.$save(
  	//	function(contribution){
  	//		$state.go('main.tab.contributions', null, { reload: true });
  	//	},
  	//	function(err){
  //			console.log(err);
  	//	});
//  };
//});