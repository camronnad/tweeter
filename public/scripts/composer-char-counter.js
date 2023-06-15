$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const counter = $('.counter');
    const remainingChars = 140 - $(this).val().length;
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });
});


