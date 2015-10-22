Template.editUserModal.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var userId = this._id;
		var newUserEmail = $('#email'+this._id).val();
		var name = $('#name'+this._id).val();
		
		if(newUserEmail != '') {
			// Close Modal
			$('#edit-user-modal'+this._id).modal('toggle');
			Meteor.call("editUser", userId, newUserEmail, name, function(error) {
				if(error) {
					toastr.error("Failed to Update User... " + error);
				} else {
					toastr.success("Member Updated Successfully");
				}
			});
		} else {
			toastr.error("You can't leave any fields blank");
		}
		
	},
	'click button.reset-password': function() {
		
		Meteor.call('resetUserPassword', this._id, this.emails[0].address, function(error) {
			if(error) {
					toastr.error("Failed to Reset Password... " + error);
				} else {
					toastr.success("Password Reset Email Sent Successfully");
				}
		});
	}
});