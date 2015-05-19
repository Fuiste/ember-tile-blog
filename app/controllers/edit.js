import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    selectedPhoto: null,
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
          var self = this;
          this.get('model').destroyRecord().then(function(){
            self.store.dematerializeRecord(self.get('model'));
            self.set('isEditing', false);
            Ember.$('#edit-modal').modal('hide');
            self.transitionToRoute('posts');
          });
        },
        edit: function() {
          this.set('isEditing', true);
          Ember.$('#edit-modal').modal('show');
        },
        imageModal: function(image) {
          this.set('selectedPhoto', image);
          Ember.$('#image-modal').modal('show');
        },
        handleCoverUpload: function(url) {
          var self = this;
          var post = this.get('model');
          this.store.createRecord('image', {url: url}).save().then(function(newImg) {
            post.set('coverPhoto', newImg);
          });
        },
        handleSubUpload: function(url) {
          var self = this;
          var post = this.get('model');
          this.store.createRecord('image', {url: url}).save().then(function(newImg) {
            post.get('subPhotos').pushObject(newImg);
          });
        }
    }
});
