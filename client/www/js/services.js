
angular.module('caixinha.services', ['ngResource','ngCordova'])

.factory('AuthenticationService', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }
  return auth;
})

.factory('LoginService',function($http,$rootScope,$window,AuthenticationService){
  return {
    login: function(user) {
      return $http.post($rootScope.restUrl + '/login',user);
    },
    logout: function() {
 
      if (AuthenticationService.isLogged) {
 
        AuthenticationService.isLogged = false;
 
        delete $window.sessionStorage.token;
        
      }
  }
}
})
.factory('RegisterService',function($http,$rootScope){
  return {
    register: function(user) {
      return $http.post($rootScope.restUrl  + '/register',user);
    }
}
})
.factory('TokenRequestInterceptor',function($q,$window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if($window.sessionStorage.token) {
        config.headers['x-access-token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config;
    }
  }
})
.factory('Users', function($resource,$rootScope) {
  return $resource($rootScope.restUrl + '/api/users/:id');
})
.factory('ContributionService', function($http,$rootScope) {
  return  {
      getAll: function() {
        return $http.get($rootScope.restUrl + '/api/contributions');
      },
      save: function(contribution){
        return $http.post($rootScope.restUrl + '/api/contribution',contribution);
      }
  }
})
.factory('PurchaseService', function($http,$rootScope,$cordovaSQLite) {
  return {
    getItemTypes: function() {
    var query = "SELECT id, description, imagePath FROM item_types";
    return $cordovaSQLite.execute(db, query, []).then(function(res) {
      var items_types = [];
          if(res.rows.length > 0) {
                  for(var i = 0; i < res.rows.length; i++) {
                    var item = {};
                    item.description = res.rows.item(i).description;
                    item.imagePath = res.rows.item(i).imagePath;
                    items_types.push(item);
                  }
            } else {
                  console.log("No results found");
               }
      return items_types;
    });
  }
}
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});