var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: false,
  slideToClickedSlide: true,
  simulateTouch: true,
  slidesPerView: 4,
  spaceBetween: 10,
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
    $("#judul").text(entry.fields.judulCerita)
    $("#lisensi").text(entry.fields.lisensiCerita)
    var thumbnailcerita = entry.fields.thumbnailCerita;
    $("#thumbnail").attr("src",thumbnailcerita);
    $("#desctext").text(entry.fields.lisensiCerita);
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
    if (datacerita == idcerita) {
      swiper.appendSlide('<div class="swiper-slide"><div class="wrapper"><img src="'+thumbnail+'"/><div class="data"><h4>'+judul+'</h4><p>'+keterangan+'</p></div><i data-audio="'+audio+'" class="uil uil-play-circle"></i></div></div>');
    }
  }
  $(".uil-play-circle").click(function(event) {
    event.preventDefault();
    var dataaudio = $(this).attr("data-audio");
    $("#player").attr("src", dataaudio);
    setTimeout(function() {
      $('#player').get(0).play();
      $(this).hide();
    }, 1000);
  });
});