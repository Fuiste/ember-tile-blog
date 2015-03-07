import Ember from 'ember';

var Ref = new window.Firebase("https://amber-torch-9285.firebaseio.com/");


var auth = Ember.Object.extend({  
  authed: false,
  username: '',
  login: function(email, password){
    var self = this;
    Ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        console.log('Login failed!');
      } else {
        self.set('authed', true);
      }
    });
  },
  logout: function() {
    Ref.unauth();
	this.set('authed', false);
  },
  authObserver: function(){
    Ember.$('#login-modal').modal('hide');
  }.observes('authed').on('set')
});


export default {  
  name: 'Auth',

  initialize: function( container, app ) {
        app.register('auth:main', auth, {singleton: true});
        app.inject('controller', 'auth', 'auth:main');
        app.inject('route', 'auth', 'auth:main');

  }
};
