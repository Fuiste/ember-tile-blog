import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("posts");

  this.route("new", {
    path: "posts/new"
  });

  this.route("edit", {
    path: "posts/:post_id"
  });

  this.route("admin");
});

export default Router;