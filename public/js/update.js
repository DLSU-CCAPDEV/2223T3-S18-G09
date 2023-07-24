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

            var input_arr;
            if(!input_banner.files && !input_pfp.files) {
                input_arr = null;
            }
            else {
                var input_arr = [];

                input_arr.length = 2;
                input_arr[0] = input_pfp.files[0];
                input_arr[1] = input_banner.files[0];
            }
            console.log(input_arr);

            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('description', description);
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);

            for (let i = 0; i < input_arr.length; i++) {
                formData.append(`files`, input_arr[i]);
            }

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