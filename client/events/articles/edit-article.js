Template.articleEditPage.events({
	'click button.submit': function(template) {
		var articleId = this._id;
		var articleRoute = '/articles/' + articleId;
		var url = $('#url').val();
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		var draft = false;
		
		Meteor.call('articleUpdate', articleId, title, body, thumbnailURL, draft, function(error) {
			if(error) {
				toastr.error("Failed to Update Article... " + error);
			} else {
				toastr.success("Article Saved.");
				document.getElementById('title').value = '';
				document.getElementById('summernote').value = '';
				document.getElementById('thumbnailURL').value = '';
				Router.go(articleRoute);
			}
		});
	},
	'click button.save': function(template) {
		var articleId = this._id;
		var articleRoute = '/articles/' + articleId;
		var url = $('#url').val();
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		var draft = true;
		
		Meteor.call('articleUpdate', articleId, title, body, thumbnailURL, draft, function(error) {
			if(error) {
				toastr.error("Failed to Save Article... " + error);
			} else {
				toastr.success("Article Saved as Draft.");
				document.getElementById('title').value = '';
				document.getElementById('summernote').value = '';
				document.getElementById('thumbnailURL').value = '';
				Router.go(articleRoute);
			}
		});
	}
});