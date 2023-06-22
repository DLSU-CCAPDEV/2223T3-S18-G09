$(document).ready(function () {
    // Your jQuery code goes here
    // For example:
    const USERNAME = "Brian Gabini";
    const USERPFP = "./images/user-pfp.jpg";
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const defaultLikes = 0;

    var currDate = new Date();

    var currDateString = monthNames[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();

    // form submission for the review
    $('#submit-review').click(function () {
        var review_container = $('#review-container');

        var userReviewText = $('#floatingTextarea2').val();

        var userReviewTitle = $('#review-title').val();

        // get the rating 
        var rating = $('input[name="rating"]:checked').val();
        var remainingRating = 5 - rating;

        // elements for the picture part
        var outerMostDiv = $('<div></div>').addClass('row mb-5');
        var outerDiv1 = $('<div></div>').addClass('col-md-2 mb-3 pt-3');
        var innerDiv1 = $('<div></div>').addClass('container');
        var innerDiv1Child1 = $('<div></div>').addClass('row mb-3 justify-content-center');
        var userPFP = $('<img>').addClass('rounded-circle').attr('src', USERPFP);
        $(userPFP).css('width', '100px');
        $(userPFP).css('height', '75px');
        var innerDiv1Child2 = $('<div></div>').addClass('row justify-content-center text-center');
        var userName = $('<h6></h6>').text(USERNAME);

        var outerDiv2 = $('<div><div>').addClass('col-md-10');
        var outerDiv2Child1 = $('<h6></h6>')
        var text = $('<span></span>').text(' • Reviewed on ' + currDateString);

        // outerDiv2Child1.text(' • Reviewed on ' + currDateString);
        var outerDiv2Child2 = $('<h4></h4>').text(userReviewTitle);
        $(outerDiv2Child2).css('font-weight', '600');
        var outerDiv2Child3 = $('<p></p>').text(userReviewText);
        var outerDiv2Child4 = $('<p></p>').text('👍👎');

        $(innerDiv1Child1).append(userPFP);
        $(innerDiv1Child2).append(userName);
        $(innerDiv1).append(innerDiv1Child1);
        $(innerDiv1).append(innerDiv1Child2);
        $(outerDiv1).append(innerDiv1);

        // append the checked star, rating times
        for (var i = 0; i < rating; i++) {
            var checkedStar = $('<span><span>').addClass('fa fa-star checked');
            outerDiv2Child1.append(checkedStar);
        }

        for (var i = 0; i < remainingRating; i++) {
            var unCheckedStar = $('<span><span>').addClass('fa fa-star');
            outerDiv2Child1.append(unCheckedStar);
        }

        outerDiv2Child1.append(text);

        $(outerDiv2).append(outerDiv2Child1);
        $(outerDiv2).append(outerDiv2Child2);
        $(outerDiv2).append(outerDiv2Child3);
        $(outerDiv2).append(outerDiv2Child4);

        $(outerMostDiv).append(outerDiv1);
        $(outerMostDiv).append(outerDiv2);

        $(review_container).append(outerMostDiv);

        // reset input fields after submission
        $('#floatingTextarea2').val('');
        $('#review-title').val('');
        $('input[name="rating"]:checked').prop('checked', false);

    });
});