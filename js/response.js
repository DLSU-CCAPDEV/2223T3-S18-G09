$(document).ready(function () {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currDate = new Date();
    var currDateString = monthNames[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();

    // form submission for the response
    $('#submit-response').click(function () {
        var response_container = $('#response-container');

        var userResponseText = $('#floatingTextarea2').val();
        var response = $('<div></div>').addClass('row mb-5 user-review');

        var responseContent = $('<div><div>').addClass('col-md-10 mx-5 position-relative');
        var responseContentBox = $('<div></div>').addClass('d-flex justify-content-end position-absolute start-100 top-0');
        var date = $('<span></span>').text('Response from the Owner • Replied on ' + currDateString);

        var responseContentText = $('<p></p>').text(userResponseText);

        var responseContentDate = $('<h6></h6>').addClass('star-group');
        responseContentDate.append(date);
        $(responseContent).append(responseContentBox);
        $(responseContent).append(responseContentDate);
        $(responseContent).append(responseContentText);

        $(response).append(responseContent);

        $(response_container).append(response);

        // reset input fields after submission
        $('#floatingTextarea2').val('');
        $('#response-btn').hide();
        alert('Response submitted!');
    });
});