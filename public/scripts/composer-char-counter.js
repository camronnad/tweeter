$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const counter = $('.counter');
    const remainingChars = 140 - $(this).val().length;
    counter.text(remainingChars);
    
    if (remainingChars < 0) {
      $(".counter").css("color", '#f51414');
    } else {
      $(".counter").css("color", '#4a4a4a') 
    }
  });
});


