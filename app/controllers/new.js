import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    image: null,
    subPhotos: [],
    actions: {
      save: function() {
        var self = this;
        var title = this.get('title');
        var description = this.get('description');
        var author = this.get('auth.username');
        var fullWidth = this.get('fullWidth');
        var img = this.get('image');
        var date = new Date();
        if(!title.trim()) {return; } //empty string

        var post = this.store.createRecord('post', {
          title:title,
          coverPhoto:img,
          description:description,
          author:author,
          fullWidth:fullWidth,
          date:date
        });

        this.get('subPhotos').forEach(function(photo){
          post.get('subPhotos').pushObject(photo);
        });

        post.save().then(function() {
          self.set('title','');
          self.set('description','');
          self.set('author','');
          self.set('fullWidth', false);
          self.set('image', null);
          self.set('subPhotos', []);
          self.transitionToRoute('posts');
        });
      },
      handleCoverUpload: function(url) {
        var self = this;
        this.store.createRecord('image', {url: url}).save().then(function(newImg) {
          self.set('image', newImg);
        });
      },
      handleSubUpload: function(url) {
        var self = this;
        this.store.createRecord('image', {url: url}).save().then(function(newImg) {
          self.get('subPhotos').pushObject(newImg);
        });
      }
    }
});
