App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });
		// Post will be rendered in the outline in the view
	});
	// place post route out of function to replace posts page with post page in browser. 
});


App.PostsRoute = Ember.Route.extend({
	 model: function() {
	 		return posts;
			// To pull from API, add here. See the end of Tom Dales Intro to Ember video on youtube to find out
			
	 }
});

App.PostRoute = Ember.Route.extend({
	 model: function(params) {
	 		return posts.findBy('id', params.post_id);
			// To pull from API, add here. See the end of Tom Dales Intro to Ember video on youtube to find out
	 }
});
// Get the post url when refresh



App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

// Handlebar helper that
// Takes date as an input value. Uses the
// moment API to convert it into a string 
// that contains the date relativized from
// the current time
// Add helper method to the date in template
Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

// Helper for markdown editor

// Uses Showdown javascript library
// Takes some markdown as input and returns that markdown
// as HTML.
// SafeString removes all protections from malicious HTML
// So I take responsibility if malicious code is placed there
var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [{
	id: '1',
	title: "Rails is Omakase",
	author: { name: "aeb" },
	date: new Date('12-27-2012'),
	excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
}, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."
}];
