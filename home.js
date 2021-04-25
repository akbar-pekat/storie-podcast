const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  slideToClickedSlide: true,
  simulateTouch: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});

var client = contentful.createClient({
  space: 'm4kn5gy5cnl3',
  accessToken: 'w89RyefJ9fdNplr5lxi7gCpCYqkgDTBxoLEClJ0lHKA'
})
client.getEntries({
  content_type: 'contentPost',
  order: 'sys.createdAt'
}).then(function (entries) {
  var ei = entries.items;
  var i;
  for (i = 0; i < ei.length; i++) {
    var idcerita = ei[i].fields.idCerita;
    var idsys = ei[i].sys.id;
    var judul = ei[i].fields.judulCerita;
    var thumbnail = ei[i].fields.thumbnailCerita;
    var lisensi = ei[i].fields.lisensiCerita;
    //swiper.appendSlide('<div class="swiper-slide"><a class="link" href="#" data-sys="'+idsys+'" data-cerita="'+idcerita+'"></a><img src="'+thumbnail+'"/><div class="data"><h3>'+judul+'</h3><small>'+lisensi+'</small></div></div>')
    swiper.appendSlide('<div class="swiper-slide"><a class="link" href="#" data-sys="'+idsys+'" data-cerita="'+idcerita+'"></a><div class="thumbnail"><img src="'+thumbnail+'"/></div><span class="iconify" data-icon="fe:play" data-inline="false"></span><div class="text"><h3>'+judul+'</h3><small>'+lisensi+'</p></div></div>')
  }
  
  $(".link").click(function(event) {
    event.preventDefault();
    var datacerita = $(this).attr("data-cerita");
    var datasys = $(this).attr("data-sys");
    localStorage.setItem("datacerita", datacerita);
    localStorage.setItem("datasys", datasys);
    window.location.href = "playlist.html"
  });
});