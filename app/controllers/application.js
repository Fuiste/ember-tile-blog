import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['edit', 'posts'],
  posts: Ember.computed.alias('controllers.posts'),
	loginVisible: false,
	username: function() {
  	this.get('auth.model.email');
  }.property('auth.model'),
	password: '',
	actions: {
    goToPosts: function() {
      this.transitionToRoute('posts');
    },
    goToNew: function() {
      this.transitionToRoute('new');
    },
		login: function() {
			Ember.$('#login-modal').modal('show');
		},
		doLogin: function() {
			this.get('auth').login(this.get('username'), this.get('password'));
		},
		logout: function() {
			this.get('auth').logout();
			this.set('controllers.edit.isEditing', false);
			this.transitionToRoute('posts');
		}
	}

});
