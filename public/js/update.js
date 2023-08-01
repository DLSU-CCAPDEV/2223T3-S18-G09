$(document).ready(function () {
    $('#submit-update').click(function () {
        console.log(`test`);
        // AJAX CALL    
        // Get input from fields
        if($('#update-newpassword').val() == $('#verify-newpassword').val()){
            var first_name = $('#update-firstname').val();
            var last_name = $('#update-lastname').val();
            var username = $('#update-username').val();
            var description = $('#update-description').val();
            var oldPassword = $('#update-oldpassword').val();
            var newPassword = $('#update-newpassword').val();

            // Get files uploaded
            var input_banner = null;
            var input_pfp = null;

            input_banner = document.getElementById('updateform-banner');
            input_pfp = document.getElementById('updateform-pfp');

            console.log(input_pfp.files[0]);
            console.log(input_banner.files[0]);

            const formData = new FormData();
            formData.append('avatar', input_pfp.files[0]);
            formData.append('banner', input_banner.files[0]);
            
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('description', description);
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);

            $.post({
                url: "/update-2db",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    // After updating database
                    window.location.href = '/user-profile-overview/' + username;
                },
            });

        }
        else {
            alert('New Passwords do not match!');
            //$.get error
        }
    });
});