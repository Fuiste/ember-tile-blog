import Ember from 'ember';
import ENV from '../config/environment';

var auth = Ember.Object.extend({
    authed: function() {
        return this.get('token') != null;
    }.property('token'),
    username: null,
    userId: null,
    token: null,
    reset: function() {
        localStorage.APP_auth_token = null;
        this.setProperties({
            username: null,
            model: null,
            token: null
        });
    },
    hasValidToken: function() {
        console.log(localStorage.APP_auth_token);
        var token = this.get('token');
        if (!token) {
            token = localStorage.APP_auth_token;
        }
        return (!Ember.isEmpty(token) && token != 'null' && token !== 'undefined');
    }.property('token'),
    setupAjax: function() {
        var self = this, token = this.get('token');
        Ember.$(document).ajaxSend(function(event, xhr) {
            // there is also a 'settings' param available
            if (self.get('hasValidToken')) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            }
        });
    },
    setCurrentUser: function() {
        if (this.get('hasValidToken')) {
            var currentUser = this.get('userId');
            this.set('model', currentUser);
        } else {
            this.reset();
        }
    },
    login: function(email, password){
        var self = this;
        Ember.$.ajax({
            url: ENV.APP.API_HOST + '/api/auth/',
            data: {email: email, password: password},
            type: 'POST'
        }).success(function(resp){
            self.set('username', resp.email);
            self.set('userId', resp.user);
            self.set('token', resp.token);
        });
    },
    logout: function() {
        this.reset();
    },
    tokenChanged: function() {
        localStorage.APP_auth_token = this.get('token');
        this.setupAjax();
        this.setCurrentUser();
    }.observes('token'),
    authObserver: function(){
        Ember.$('#login-modal').modal('hide');
    }.observes('authed').on('set')
});


export default {
    name: 'Auth',

        initialize: function( container, app ) {
        app.register('auth:main', auth, {singleton: true});
        app.inject('controller', 'auth', 'auth:main');
        app.inject('route', 'auth', 'auth:main');

    }
};
