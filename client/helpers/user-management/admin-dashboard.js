Template.adminDashboard.helpers({
	users: function() {
		return Meteor.users.find({},{sort:{"profile.role": 1}});
	},
	userRole: function() {
		if(this.profile.role === 'Member' && this.profile.role != 'Admin' ) {
			return "selected"
		}
	},
	articles: function() {
		return Articles.find({},{sort: {submitted: -1}});
	},
	isDraft: function() {
		return this.draft;
	}
});