Template.submitArticle.events({
	'click button.submit': function(template) {
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		
		
		if(Meteor.user() != null) {
			Meteor.call('articleInsert', title, body, thumbnailURL, function(error, response) {
				if(error) {
					toastr.error("Failed to Publish Article... "+error);
				} else {
					var articleRoute = '/articles/' + response;
					toastr.success("Article Published!");
					document.getElementById('title').value = '';
					document.getElementById('summernote').value = '';
					document.getElementById('thumbnailURL').value = '';
					Router.go(articleRoute);
				}
			});
		}
	},
	'click button.save': function(template) {
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		
		
		if(Meteor.user() != null) {
			Meteor.call('articleSaveAsDraft', title, body, thumbnailURL, function(error, response) {
				if(error) {
					toastr.error("Failed to Save Article... "+error);
				} else {
					var articleRoute = '/articles/' + response;
					toastr.success("Article Saved!");
					document.getElementById('title').value = '';
					document.getElementById('summernote').value = '';
					document.getElementById('thumbnailURL').value = '';
					Router.go(articleRoute);
				}
			});
		}
	}
});