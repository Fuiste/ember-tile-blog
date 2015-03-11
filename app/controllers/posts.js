/**
 * Created by fuiste on 3/9/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['posts/edit'],
    postVisible: false,
    actions: {
        transitionToPost: function(post) {
            var self = this;
            Ember.$('#posts-main').fadeOut(200, function(){
                self.set('postVisible', true);
                self.transitionToRoute('posts.edit', post.get('id'));
                Ember.$('#posts-main').fadeIn(200);
            });
        }
    }

});