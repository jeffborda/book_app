'use strict';

$('.show-detail-button').on('click', function() {
  //this.next  remove class hide-section
  $(this).next().removeClass('hidden');
});

$('.update-book').on('click', function() {
  //this.next  remove class hide-section
  $(this).siblings().removeClass('hidden');
});
