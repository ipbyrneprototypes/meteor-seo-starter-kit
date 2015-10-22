Meteor.methods({
	// Admin Dashboard
	getUserCount: function () {
		count = Meteor.users.find().count();
		return count;
	},
	setUserRole: function(userId, role) {
		Meteor.users.update({_id: userId}, {$set: {"profile.role": role}})
	},
	editUser: function(userId, newEmail, name) {
		var user = Meteor.users.findOne({_id: userId});
		Accounts.removeEmail(userId, user.emails[0].address);
		Accounts.addEmail(userId, newEmail, false);
		Meteor.users.update({_id: userId}, {$set: {"profile.name": name}});
	},
	resetUserPassword: function(userId, email) {
		Accounts.sendResetPasswordEmail(userId, email);
	},
	resetNewUserPassword: function(email) {
		var user = Accounts.findUserByEmail(email);
		var userId = user._id;
		Accounts.sendResetPasswordEmail(userId, email);
	},
	createNewUser: function(user) {
		Accounts.createUser(user);
	},
	deleteUser: function(userId) {
		Meteor.users.remove(userId);
	},
	// Article Methods
	articleInsert: function(title, body, thumbnailURL) {
		var articleId = Articles.insert({
			title: title,
			body: body,
			thumb: thumbnailURL,
			likes: 0,
			likers: [],
			comments: [],
			submitted: new Date(),
			user: Meteor.userId(),
			useremail: Meteor.user().emails[0].address,
			username: Meteor.user().profile.name,
			draft: false
		});
		var article = Articles.findOne({title: title})
		return article._id;
	},
	articleSaveAsDraft: function(title,body, thumbnailURL) {
		var articleId = Articles.insert({
			title: title,
			body: body,
			thumb: thumbnailURL,
			likes: 0,
			likers: [],
			comments: [],
			submitted: new Date(),
			user: Meteor.userId(),
			useremail: Meteor.user().emails[0].address,
			username: Meteor.user().profile.name,
			draft: true
		});
		var article = Articles.findOne({title: title})
		return article._id;
	},
	articleUpdate: function(articleId, title, body, thumbnailURL, draft) {
		Articles.update({_id: articleId}, {$set: {
			title:title,
			body:body,
			thumb: thumbnailURL,
			draft: draft}
		});
	},
	likeArticle: function(articleId) {
		Articles.update({_id:articleId}, {$inc: {likes: 1}});
		Articles.update({_id:articleId}, {$addToSet: {likers: Meteor.userId()}});
	},
	unlikeArticle: function(articleId) {
		Articles.update({_id:articleId}, {$inc: {likes: -1}});
		Articles.update({_id:articleId}, {$pull: {likers: Meteor.userId()}});
	},
	deleteArticle: function(articleId) {
		Articles.remove({_id:articleId});
		Comments.remove({articleId: articleId});
	},
	// Comment Methods
	commentInsert: function(comment) {
		Comments.insert(comment);
	},
	likeComment: function(commentId) {
		Comments.update({_id:commentId}, {$inc: {likes: 1}});
		Comments.update({_id:commentId}, {$addToSet: {likers: Meteor.userId()}});
	},
	unlikeComment: function(commentId) {
		Comments.update({_id:commentId}, {$inc: {likes: -1}});
		Comments.update({_id:commentId}, {$pull: {likers: Meteor.userId()}});
	},
	deleteComment: function(commentId) {
		Comments.remove({_id: commentId});
	}
});