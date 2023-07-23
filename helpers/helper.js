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

function stars (n, block) {
    n = typeof n === 'number' ? Math.round(n) :Math.round(Number(n)) || 0;
    let filledStars = `<span class="fa fa-star checked"></span>`.repeat(n);
    let emptyStars = `<span class="fa fa-star-o checked"></span>`.repeat(5 - n);
    return filledStars + emptyStars;
};

function isEqual (value1, value2) {
    return value1 == value2;
}

function trimAndReadMore(id, body_desc) {
    if (body_desc.length <= 250) {
      return body_desc;
    } else {
      const trimmedText = body_desc.substr(0, 250);
      return `
        <p style='text-align: justify; text-justify: inter-word'>${trimmedText}<span id="dots${id}">...</span><span id="more${id}" style="display: none;">${body_desc.substr(250, body_desc.length)}</span> 
        <a onclick="readMoreFunction(dots${id}, more${id}, myBtn${id})" id="myBtn${id}" style="color: var(--primary)">Read more</a></p>`;
    }
}
  

function inArray(element, array) {
    if (array.includes(element))
      return true;
    else
      return false;
}
  

module.exports = { replaceSpaceWithHyphen, replaceHyphenWithSpace, formatDate, formatNumReview, stars, isEqual, trimAndReadMore, inArray };