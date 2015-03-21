import Ember from 'ember';
import ENV from '../config/environment';

var auth = Ember.Object.extend({  
  authed: false,
  username: '',
  login: function(email, password){
      var self = this;
      Ember.$.ajax({
          url: ENV.APP.API_HOST + '/api/auth/',
          data: {email: email, password: password},
          type: 'POST'
      }).success(function(resp){
          console.log(resp);
      });
  },
  logout: function() {
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
