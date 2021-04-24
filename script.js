window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    $('.container').css('box-shadow', '0 -7px 10px 0 rgba(0,0,0,.05)');
  }
};
$(window).scroll(function () {
  if ($(this).scrollTop()  <= 0 ){
    $('.container').css('box-shadow', 'none');
  }
});