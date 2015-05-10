/**
 * Created by fuiste on 3/9/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['edit'],
    postVisible: false,
    page: 1,
    twoWayNav: function() {
      if(this.get('page') > 1) {
        return true;
      } else {
        return false;
      }
    }.property('page'),
    actions: {
        transitionToPost: function(post) {
            this.transitionToRoute('edit', post.get('id'));
        }
    }

});
