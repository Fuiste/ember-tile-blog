import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    image: null,
    actions: {
        save: function() {
            var title = this.get('title');
            var description = this.get('description');
            var author = this.get('auth').username;
            var large = this.get('large');
            var fullWidth = this.get('fullWidth');
            var img = this.get('image');
            var date = new Date();
            if(!title.trim()) {return; } //empty string

            var post = this.store.createRecord('post', {
                title:title,
                coverPhoto:img,
                description:description,
                author:author,
                large:large,
                fullWidth:fullWidth,
                date:date
            });
            this.set('title','');
            this.set('description','');
            this.set('author','');
            this.set('large', false);
            this.set('fullWidth', false);
            this.set('image', null);
            post.save();
            this.transitionToRoute('posts');
        },
        handleCoverUpload: function(url) {
          var self = this;
          this.store.createRecord('image', {url: url}).save().then(function(newImg) {
            self.set('image', newImg);
          });
        }
    }
});
