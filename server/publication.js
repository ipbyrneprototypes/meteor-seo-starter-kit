Meteor.publish("users", function (userSearchKeyword, limit) {
		// Publish Collection Count
		Counts.publish(this, 'users', Meteor.users.find(), { noReady: true });
		userSearchQuery = new RegExp( userSearchKeyword, 'i' );
    return Meteor.users.find({$or: [{"emails.address": userSearchQuery}]}, {limit: limit});
});

Meteor.publish("articles", function (articleSearchKeyword, limit) {
	// Publish Collection Count
	Counts.publish(this, 'articles', Articles.find(), { noReady: true });
	
	articleSearchQuery = new RegExp( articleSearchKeyword, 'i' );
	return Articles.find({$or: [{body: articleSearchQuery}, {_id: articleSearchQuery}, {title: articleSearchQuery}, {submitted: articleSearchQuery}, {useremail: articleSearchQuery}]}, {limit:limit});
});

Meteor.publish("comments", function(limit) {
	return Comments.find({},{limit: limit});
});