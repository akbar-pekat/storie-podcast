$(document).ready(function() {
  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    slideToClickedSlide: true,
    simulateTouch: true,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });
  setTimeout(function() {
    $(".tutorial-swipe").fadeOut();
  }, 5000);
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
      console.log(ei)
      var idcerita = ei[i].fields.idCerita;
      var idsys = ei[i].sys.id;
      var judul = ei[i].fields.judulCerita;
      var thumbnail = ei[i].fields.thumbnailCerita;
      var lisensi = ei[i].fields.lisensiCerita;
      swiper.appendSlide('<div class="swiper-slide"><a class="link" href="#" data-sys="'+idsys+'" data-cerita="'+idcerita+'"></a><img src="'+thumbnail+'"/><div class="data"><h3>'+judul+'</h3><small>'+lisensi+'</small></div></div>')
    }
    $(".link").click(function(event) {
      event.preventDefault();
      var datacerita = $(this).attr("data-cerita");
      var datasys = $(this).attr("data-sys");
      localStorage.setItem("datacerita", datacerita);
      localStorage.setItem("datasys", datasys);
      //alert(datacerita+' • '+datasys);
      window.location.href = "audio.html"
    });
  });
});

