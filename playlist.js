var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: false,
  slideToClickedSlide: true,
  simulateTouch: true,
  slidesPerView: 4,
});

const player = new Plyr('#player', {
  controls: ['play','progress','current-time','volume'],
});


$('.tab .item').click(function(){
  $('.tab .item').removeClass("active");
  $(this).addClass("active");
});
$('#episode').click(function(){
  $('.description-cont').hide();
  $('.swiper-container').fadeIn();
});
$('#deskripsi').click(function(){
  $('.swiper-container').hide();
  $('.description-cont').fadeIn();
});

$('#tes').click(function(){
  localStorage.removeItem("datasys");
  localStorage.removeItem("datacerita");
  window.history.go(-1);
  return false;
});

var datacerita = localStorage.getItem("datacerita");
var datasys = localStorage.getItem("datasys");
if (datacerita == null) {
  window.location.replace("index.html");
}

var client = contentful.createClient({
  space: 'm4kn5gy5cnl3',
  accessToken: 'w89RyefJ9fdNplr5lxi7gCpCYqkgDTBxoLEClJ0lHKA'
})
client.getEntry(datasys).then(function (entry) {
  var backgroundcerita = entry.fields.backgroundCerita;
  $("#judul").text(entry.fields.judulCerita)
  $("#author").text(entry.fields.lisensiCerita)
  $("header").css("background-image", 'url('+backgroundcerita+')');
  $("#sinopsis").text(entry.fields.deskripsiCerita);
})
client.getEntries({
  content_type: 'audioPost',
  order: '-sys.createdAt'
}).then(function (entries) {
  var ei = entries.items;
  var i;
  for (i = 0; i < ei.length; i++) {
    var idcerita = ei[i].fields.idCerita;
    var judul = ei[i].fields.judulEpisode;
    var thumbnail = ei[i].fields.thumbnailEpisode;
    var audio = ei[i].fields.audioMp3;
    var keterangan = ei[i].fields.keteranganEpisode;
    if (datacerita == idcerita) {
      swiper.appendSlide('<div class="swiper-slide" data-judul="'+judul+'" data-audio="'+audio+'" data-thumbnail="'+thumbnail+'"><span class="iconify" data-icon="fe:play" data-inline="false"></span><div class="thumbnail"><img src="'+thumbnail+'" /></div><div class="text"><p>'+judul+'</p><small>'+keterangan+'</small></div></div>')
    }
  }
  $(".swiper-slide").click(function(event) {
    event.preventDefault();
    $(".swiper-slide .iconify").hide();
    $(this).find(".iconify").fadeIn();
    $(".player").css("bottom","0px")
    var datajudul = $(this).attr("data-judul");
    var dataaudio= $(this).attr("data-audio");
    var datathumbnail = $(this).attr("data-thumbnail");
    var datacerita = $("#judul").text();
    var dataauthor = $("#author").text();
    $("#player").attr("src", dataaudio);
    setTimeout(function() {
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
    }, 1000);
  });
});