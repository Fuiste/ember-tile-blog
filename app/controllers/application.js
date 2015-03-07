import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['posts/edit'],
	loginVisible: false,
	username: '',
	password: '',
	actions: {
		login: function() {
			Ember.$('#login-modal').modal('show');
		},
		doLogin: function() {
			this.get('auth').login(this.get('username'), this.get('password'));
		},
		logout: function() {
			this.get('auth').logout();
			this.set('controllers.posts/edit.isEditing', false);
			this.transitionToRoute('posts');

		}
	}

});
