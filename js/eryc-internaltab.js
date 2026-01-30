(function ($) {

  $(document).ready(function(){

    var eryc_visitor_cookie = ERYC_CookieHide_getCookie('eryc_visitor');

    console.log(eryc_visitor_cookie);

    if (eryc_visitor_cookie == 'eryc_csn') {

      var outline_id = $('body').attr('class').match(/outline-(\d+)/)[1];

      $.get('https://csn.eastriding.org.uk/internaltab/layout-' + outline_id + '.html', function(data) {

          if ($('.accordions').length > 0) {

            var html = `<div class="accordion closed meta-none" id="internal_information">
                          <a class="styled accordion-header closed" href="#internal_information">
                            <h2 class="title "><span class="title-text"><p><i class="far fa-info-circle" aria-hidden="true"></i> Internal Information</p></span></h2>
                            <span class="open-close-text"></span>
                            <i aria-hidden="true" class="arrow"></i>
                          </a>
                          <div class="content accordion-content" style="">
                            <div class="desc accordion-desc accordion-extra-desc">${data}</div>
                          </div>
                        </div>`;

            $('.accordions').prepend(html);

          }

      });

    }

  });

})(jQuery)