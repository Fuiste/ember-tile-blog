import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        return Ember.RSVP.Promise.all([this.store.find('post', {page: 1}), this.store.find('image', {page: 1})]);
    },
    model: function() {
        return this.store.all('post');
    },
    setupController: function(controller, model){
        controller.set('model', model);
    },
    actions: {
        loadNewPage: function(page, direction){
          var self = this;
          Ember.$('#posts-body').fadeOut(200, function(){
            self.store.find('post', {page: page + direction}).then(function(posts){
              self.store.find('image', {page: page + direction}).then(function(images){
                self.controllerFor('posts').set('model', posts);
                self.controllerFor('posts').set('page', page + direction);
                Ember.$('#posts-body').fadeIn(200);
              });
            });
          });
        }
    }
});
