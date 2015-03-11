import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['posts/edit', 'posts'],
    posts: Ember.computed.alias('controllers.posts'),
	loginVisible: false,
	username: '',
	password: '',
	actions: {
        goToPosts: function() {
            var self = this;
            Ember.$('#posts-main').fadeOut(200, function(){
                self.get('posts').set('postVisible', false);
                self.transitionToRoute('posts');
                Ember.$('#posts-main').fadeIn(200);
            });
        },
        goToNew: function() {
            var self = this;
            Ember.$('#posts-main').fadeOut(200, function(){
                self.get('posts').set('postVisible', true);
                self.transitionToRoute('posts.new');
                Ember.$('#posts-main').fadeIn(200);
            });
        },
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
