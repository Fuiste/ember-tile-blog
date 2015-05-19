import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  newUsername: '',
  newUsernameSuccess: false,
  newPassword: '',
  newPasswordVerify: '',
  actions: {
    doLogin: function() {
      this.get('auth').login(this.get('username'), this.get('password'));
    },
    logout: function() {
      this.get('auth').logout();
      this.transitionToRoute('posts');
    },
    setUsername: function() {
      var self = this;
      Ember.$.ajax({
          url: ENV.APP.API_HOST + '/api/update-username/',
          data: {new_name: self.get('newUsername')},
          type: 'POST'
      }).success(function(resp){
        self.get('auth').set('username', self.get('newUsername'));
        self.set('newUsernameSuccess', true);
        self.set('newUsername', '');
      });
    }
  }
});
