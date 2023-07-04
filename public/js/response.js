$(document).ready(function () {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currDate = new Date();
    var currDateString = monthNames[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();

    // form submission for the response
    $('#submit-response').click(function () {
		var response_container = $('#response-container');
		var forIndent = $('<div></div>').addClass('mx-5');
        var userResponseText = $('#floatingTextarea2').val();
		var showbtn = $('<a></a>').attr({onclick:'hideResponseFunction(myRep1, show1, hide1)', id:'myRep1'}).text(' • Show Response');

        var responseContent = $('<span></span>').addClass('col-md-10 position-relative');
        var responseContent_hidden = $('<span></span>').addClass('col-md-10 position-relative');

        // create span for the date
        var text1 = $('<span></span>').text('Response from the Owner ').addClass('fw-bold');

        var text2 = $('<span></span>').text('Replied on ' + currDateString).css('color', '#B4B4B4');

        var date = $('<span></span>').append(text1).append(text2);

        var responseContentText = $('<span></span>').text(userResponseText);
		var responseContentText_hidden = $('<span></span>').text('Response from the Owner').addClass('fw-bold').attr('id', 'show1');
		
        var responseContentDate = $('<span></span>').addClass('star-group');
        responseContentDate.append(date);
        $(responseContent).append(responseContentDate);
		$(responseContent).append("<br />");
        $(responseContent).append(responseContentText).css('display', 'none').attr('id', 'hide1');;
		$(responseContent_hidden).append(responseContentText_hidden);
		
		$(forIndent).append(responseContent_hidden);
		$(forIndent).append(responseContent);
		$(forIndent).append(showbtn);
		
		$(response_container).append(forIndent);
		
        // reset input fields after submission
        $('#floatingTextarea2').val('');
        $('#response-btn').hide();
        alert('Response submitted!');
    });
});