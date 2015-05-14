/**
 * Created by fuiste on 3/17/15.
 */
import DS from 'ember-data';

export default DS.Model.extend({
    url: DS.attr('string'),
    inlineStyle: function() {
        var url = this.get('url');
        if(url){
            return "background-image: url(" + url + ");";
        } else {
            return ""
        }
    }.property('url')
});
