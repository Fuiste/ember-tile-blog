import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        return Ember.RSVP.Promise.all([this.store.find('post'), this.store.find('image')]);
    },
    model: function() {
        return this.store.all('post');
    },
    setupController: function(controller, model){
        controller.set('model', model);
    }
});
