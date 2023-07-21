function replaceSpaceWithHyphen(str) {
    return str.replace(/\s/g, '-');
}

function replaceHyphenWithSpace(str) {
    return str.replace(/-/g, ' ');
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function formatNumReview(reviewCount) {
    if (reviewCount == 1) {
        return reviewCount + " Review";
    }
    else {
        return reviewCount + " Reviews";
    }
}

module.exports = { replaceSpaceWithHyphen, replaceHyphenWithSpace, formatDate, formatNumReview };