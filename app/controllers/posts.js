/**
 * Created by fuiste on 3/9/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['edit'],
    postVisible: false,
    sortedModel: function() {
      var self = this;
      var groupings = [];
      var count = 0;
      this.get('model').forEach(function(post){
        if (post.get('fullWidth')) {
          groupings.push(count);
          count = 0;
        } else {
          count++;
        }
      });
      if (count > 0) {
        groupings.push(count);
      }

      console.log(groupings);

      var newModel = [];
      var helper = 1;
      var large = false;
      var gIndex = 0;
      var curGroup = groupings[gIndex];
      var xLarge = (groupings[gIndex] === 1);
      console.log(xLarge);
      this.get('model').forEach(function(post){
        if (xLarge) {
          post.set('xLarge', true);
          post.set('large', false);
          newModel.pushObject(post);
          curGroup--;
          xLarge = false;
        } else if (helper > 0 && curGroup > 0) {
          post.set('xLarge', false);
          post.set('large', large);
          newModel.pushObject(post);
          curGroup--;
          helper--;
        } else if (helper === 0 && curGroup > 0) {
          large = !large;
          helper = 1;
          post.set('xLarge', false);
          post.set('large', large);
          newModel.pushObject(post);
          curGroup--;
        } else if (curGroup === 0) {
          gIndex++;
          curGroup = groupings[gIndex];
          xLarge = (groupings[gIndex] === 1);
          helper = 1;
          large = false;
          post.set('xLarge', false);
          post.set('large', false);
          newModel.pushObject(post);
        }
      });
      return newModel;
    }.property('model'),
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
