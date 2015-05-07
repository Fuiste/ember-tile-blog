import Ember from 'ember';
import ENV from '../config/environment';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: ENV.APP.API_HOST + '/api/authenticate-upload/',
  post: -1,
  isCover: false,
  filesDidChange: (function() {
    var self = this;
    var uploadUrl = this.get('url');
    var files = this.get('files');
    var uploader = EmberUploader.Uploader.create({url: uploadUrl});

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]).then(function(data) {
        self.sendAction('action', data.url);
      }, function(error) {
        console.log("Error uploading file: " + error);
      });
    }
  }).observes('files')
});
