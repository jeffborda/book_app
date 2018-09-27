'use strict';

$('.show-detail-button').on('click', function() {
  //this.next  remove class hide-section
  $(this).next().removeclass('hidden');
});
