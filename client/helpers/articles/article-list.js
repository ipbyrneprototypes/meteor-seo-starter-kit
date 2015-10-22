Template.articleList.helpers({
	articles: function() {
		return Articles.find({draft:false},{sort: {submitted: -1}});
	}
});