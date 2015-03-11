import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['posts'],
    posts: Ember.computed.alias('controllers.posts'),
    actions: {
        close: function() {
            var self = this;
            Ember.$('#posts-main').fadeOut(200, function(){
                self.get('posts').set('postVisible', false);
                self.transitionToRoute('posts');
                Ember.$('#posts-main').fadeIn(200);
            });

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
        }
    }
});
