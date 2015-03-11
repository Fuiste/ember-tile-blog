import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            var title = this.get('title');
            var description = this.get('description');
            var author = this.get('auth').username;
            var large = this.get('large');
            var date = new Date();
            if(!title.trim()) {return; } //empty string

            var post = this.store.createRecord('post', {
                title:title,
                description:description,
                author:author,
                large:large,
                date:date

            });
            this.set('title','');
            this.set('description','');
            this.set('author','');
            this.set('large', false);
            post.save();
            this.transitionToRoute('posts');

        }
    }
});
