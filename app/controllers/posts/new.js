import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    actions: {
        save: function() {
            var title = this.get('title');
            var description = this.get('description');
            var author = this.get('auth').username;
            var large = this.get('large');
            var fullWidth = this.get('fullWidth');
            var date = new Date();
            if(!title.trim()) {return; } //empty string

            var post = this.store.createRecord('post', {
                title:title,
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
            post.save();
            var self = this;
            Ember.$('#posts-main').fadeOut(200, function(){
                self.get('posts').set('postVisible', false);
                self.transitionToRoute('posts');
                Ember.$('#posts-main').fadeIn(200);
            });
        }
    }
});
