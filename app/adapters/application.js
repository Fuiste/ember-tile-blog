import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
		firebase: new window.Firebase('https://amber-torch-9285.firebaseio.com/')
});
