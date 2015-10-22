Router.route('/', {layoutTemplate: 'home'});
Router.route('/sign-in', {layoutTemplate: 'signIn'});
Router.route('/sign-up', {layoutTemplate: 'signUp'});
Router.route('/reset-password', {layoutTemplate: 'resetPassword'});
Router.route('/recover-password', {layoutTemplate: 'recoverPassword'});
Router.route('/dashboard', {layoutTemplate: 'dashboard'});
// Article Routes
Router.route('/articles', {layoutTemplate: 'articleList'});
Router.route('/submit-article', {layoutTemplate: 'submitArticle'});
Router.route('/articles/:_id', {
	name: 'articlePage',
	layoutTemplate: 'articlePage',
	data: function() {
		return Articles.findOne(this.params._id);
	}
});
Router.route('/articles/edit/:_id', {
	name: 'articleEditPage',
	layoutTemplate: 'articleEditPage',
	data: function() {
		return Articles.findOne(this.params._id);
	}
});