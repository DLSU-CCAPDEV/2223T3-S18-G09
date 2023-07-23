$(document).ready(function () {
    $('#submit').click(function () {
        // AJAX CALL    
        // Get input from fields
        if($('#update-newpassword').val() == $('#verify-newpassword').val()){
            var first_name = $('#update-firstname').val();
            var last_name = $('#update-lastname').val();
            var username = $('#update-username').val();
            var description = $('#update-description').val();
            var oldPassword = $('#update-oldpassword').val();
            var newPassword = $('#update-newpassword').val();

            $.get('/update-2db', { first_name, last_name, username, description, oldPassword, newPassword});
            alert('Profile Updated!');
            window.location.href = '/user-profile-overview/' + username;
        }
        else {
            alert('New Passwords do not match!');
            //$.get error
        }
    });
});