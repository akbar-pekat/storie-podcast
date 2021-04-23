var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: false,
  slideToClickedSlide: true,
  simulateTouch: true,
  slidesPerView: 'auto',
});
$('.tab .item').click(function(){
  $('.tab .item').removeClass("active");
  $(this).addClass("active");
});
$('#playlist').click(function(){
  $('.deskripsi-tab').hide();
  $('.swiper-container').show();
});
$('#deskripsi').click(function(){
  $('.swiper-container').hide();
  $('.deskripsi-tab').show();
});
$('#backbtn').click(function(){
  window.history.go(-1);
  return false;
});
const player = new Plyr('#player', {
  controls: ['play', 'progress', 'current-time', 'volume'],
});
var datacerita =localStorage.getItem("datacerita");
var datasys =localStorage.getItem("datasys");
var client = contentful.createClient({
  space: 'm4kn5gy5cnl3',
  accessToken: 'w89RyefJ9fdNplr5lxi7gCpCYqkgDTBxoLEClJ0lHKA'
})
client.getEntry(datasys).then(function (entry) {
    var cerita = entry.fields.judulCerita;
    $("#judul").text(entry.fields.judulCerita)
    $("#lisensi").text(entry.fields.lisensiCerita)
    var thumbnailcerita = entry.fields.thumbnailCerita;
    $("#thumbnail").attr("src",thumbnailcerita);
    var backgroundcerita = entry.fields.backgroundCerita;
    $("body").css("background-image", 'url('+backgroundcerita+')');
    $("#desctext").text(entry.fields.deskripsiCerita);
})
client.getEntries({
  content_type: 'audioPost'
}).then(function (entries) {
  var ei = entries.items;
  var i;
  for (i = 0; i < ei.length; i++) {
    var idcerita = ei[i].fields.idCerita;
    var judul = ei[i].fields.judulEpisode;
    var thumbnail = ei[i].fields.thumbnailEpisode;
    var audio = ei[i].fields.audioMp3;
    var keterangan = ei[i].fields.keteranganEpisode;
    var firstaudio = ei[0].fields.audioMp3;
    $("#player").attr("src", firstaudio);
    if (datacerita == idcerita) {
      swiper.appendSlide('<div class="swiper-slide"><div data-audio="'+audio+'" data-episode="'+judul+'" data-thumbnail="'+thumbnail+'" class="wrapper"><img src="'+thumbnail+'"/><div class="data"><h4>'+judul+'</h4><small>'+keterangan+'</small></div></div></div>');
    }
  }
  $(".swiper-slide .wrapper").click(function(event) {
    event.preventDefault();
    var dataaudio = $(this).attr("data-audio");
    $("#player").attr("src", dataaudio);
    var metacerita = $("#judul").text();
    var metaepisode = $(this).attr("data-episode");
    var metathumbnail = $(this).attr("data-thumbnail");
    setTimeout(function() {
      $('#player').get(0).play().then(_ => {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
          title: metaepisode,
          artist: 'Storie',
          album: metacerita,
          artwork: [
            { src: metathumbnail, sizes: '512x512', type: 'image/png' },
          ]
        });
      }
    })
    }, 1000);
  });
});