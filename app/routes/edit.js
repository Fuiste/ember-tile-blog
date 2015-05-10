import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var self = this;
    Ember.RSVP.Promise.all([this.store.find('image', {post: params.post_id})]);
    return self.store.find('post', params.post_id);
  }
});
