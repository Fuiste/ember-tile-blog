import Ember from 'ember';
import ENV from '../../config/environment';

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
        },
        fileLoaded: function(file) {
          var formData = new FormData();
          var self = this;
          var xhr = new XMLHttpRequest();

          console.log("Got file", file.filename, file.type);
          formData.append('images[]', file, file.name);
          xhr.open('POST', ENV.APP.API_HOST + '/api/authenticate-upload/', true);
          xhr.onload = function () {
            if (xhr.status === 200) {
              // File(s) uploaded.
              uploadButton.innerHTML = 'Upload';
            } else {
              alert('An error occurred!');
            }
          };
          xhr.send(formData);
        }
    }
});
