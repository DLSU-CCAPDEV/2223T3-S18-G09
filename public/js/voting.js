$(document).ready(function () {
    $('.upvote').on('click', function () {
        var review_id = $(this).attr('data');
        var upvoteLabel = $(this).prevAll('.numUpvotes').first();
        var downvoteLabel = $(this).nextAll('.numDownvotes').first();

        $.get('/upvote', { review_id: review_id }, function (data) {

            if (data.success) {
                console.log('success');

                // change the number of upvotes and downvotes using jquery
                $(upvoteLabel).text(data.numUpvotes);
                $(downvoteLabel).text(data.numDownvotes);
            }
        });
    });

    $('.downvote').on('click', function () {
        var review_id = $(this).attr('data');
        var upvoteLabel = $(this).prevAll('.numUpvotes').first();
        var downvoteLabel = $(this).prevAll('.numDownvotes').first();


        $.get('/downvote', { review_id: review_id }, function (data) {

            console.log(data);
            if (data.success) {
                console.log('success');
                // change the number of upvotes and downvotes using jquery
                $(upvoteLabel).text(data.numUpvotes);
                $(downvoteLabel).text(data.numDownvotes);          
            }

        });
    });
});