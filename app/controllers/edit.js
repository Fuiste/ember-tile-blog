import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    actions: {
        close: function() {
          this.transitionToRoute('posts');
        },
        save: function() {
          var d = this.get('model');
          d.set("date",new Date());
          d.save();
          this.set('isEditing', false);
          Ember.$('#edit-modal').modal('hide');
        },
        del: function() {
          this.get('model').deleteRecord();
          this.transitionToRoute('posts');
          this.get('model').save();
          this.set('isEditing', false);
          Ember.$('#edit-modal').modal('hide');
        },
        edit: function() {
          this.set('isEditing', true);
          Ember.$('#edit-modal').modal('show');
        },
        handleCoverUpload: function(url) {
          var self = this;
          var post = this.get('model');
          this.store.createRecord('image', {url: url}).save().then(function(newImg) {
            post.set('coverPhoto', newImg);
          });
        }
    }
});
