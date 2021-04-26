const player = new Plyr('#player', {
  controls: ['progress'],
});

$('#tes').click(function(){
  window.history.go(-1);
  return false;
});


var datajudul = localStorage.getItem("datajudul");
var datathumbnail = localStorage.getItem("datathumbnail");
var dataaudio = localStorage.getItem("dataaudio")
var datacerita = localStorage.getItem("datacerita")
var dataauthor = localStorage.getItem("dataauthor")
if (datajudul == null) {
  window.location.replace("playlist.html");
}
setTimeout(function(){
  $("#judul").text(datajudul);
  $("#author").text(dataauthor);
  $("#player").attr("src", dataaudio);
  $("#thumbnail").attr("src", datathumbnail);
}, 500);

$('#play').click(function() {
  $('#play').hide();
  $('#pause').fadeIn();
  $('#player').get(0).play().then(_ => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: datajudul,
        artist: 'Storie',
        album: datacerita,
        artwork: [
          { src: datathumbnail, sizes: '512x512', type: 'image/png' },
        ]
      });
    }
  })
});

$('#pause').click(function() {
  $("#player")[0].pause();
  $('#pause').hide();
  $('#play').fadeIn();
});
var playera = document.getElementById("player");
playera.muted = false;
$('#volume').click(function() {
  playera.muted = true;
  $('#volume').hide();
  $('#mute').fadeIn();
});
$('#mute').click(function() {
  playera.muted = false;
  $('#mute').hide();
  $('#volume').fadeIn();
});

