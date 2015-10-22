Meteor.startup(function () {
	Session.set("user-search-query", '');
	Session.set("article-search-query", '');
});