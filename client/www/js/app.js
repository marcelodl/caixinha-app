// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('caixinha', ['ionic', 'ngCordova' ,'caixinha.controllers', 'caixinha.services'])

.run(function($ionicPlatform,$rootScope,$cordovaSQLite) {

  //$rootScope.restUrl = 'http://:3000';
  $rootScope.restUrl = 'http://10.40.0.223:3000';


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     window.plugins.sqlDB.copy("caixinha.db", function() {
            db = $cordovaSQLite.openDB("caixinha.db");
        }, function(error) {
            console.error("There was an error copying the database: " + JSON.stringify(error));
            db = $cordovaSQLite.openDB("caixinha.db");
        });
  });
})

.config(function($httpProvider,$stateProvider, $urlRouterProvider) {

  $httpProvider.interceptors.push('TokenRequestInterceptor');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  // setup an abstract state for the tabs directive
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
   .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
   .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/mainContainer.html',
    controller: 'MainContainerCtrl'
   }) 
  .state('main.tab', {
    url: "/tab",
    views: {
      'main': {
      templateUrl: 'templates/tabs.html',
      controller: 'TabsPageCtrl'
      }
    }
  })
  .state('main.tab.minibox', {
    url: '/minibox',
    cache: false,
    views: {
      'tab-minibox': {
        templateUrl: 'templates/tab-minibox.html',
        controller: 'MiniboxCtrl'
      }
    }
  })

  .state('main.tab.purchases', {
      url: '/purchases',
      views: {
        'tab-purchases': {
          templateUrl: 'templates/tab-purchases.html',
          controller: 'PurchaseCtrl'
        }
      }
    })
    .state('main.tab.purchase-detail', {
      url: '/purchases/:purchaseId',
      views: {
        'tab-purchases': {
          templateUrl: 'templates/purchase-detail.html',
          controller: 'PurchaseDetailCtrl'
        }
      }
    })

  .state('main.tab.contributions', {
    url: '/contributions',
    cache: false,
    views: {
      'tab-contributions': {
        templateUrl: 'templates/tab-contributions.html',
        controller: 'ContributionCtrl'
      }
    }
  })
 // .state('main.tab.add-contribution', {
   //   url: '/contributions/addContribution',
     // views: {
       // 'add-contribution': {
         // templateUrl: 'templates/add-contribution.html',
        //  controller: 'AddContributionCtrl'
        //}
      //}
    //})
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
