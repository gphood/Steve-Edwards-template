(function ($) {
  $(document).ready(function() {
    var er_cookie_hide_el             = $('.er-cookie-close');
    var er_cookie_hide_id             = '';
    var er_cookie_hide_cookie_name    = '';
    var er_cookie_hide_cookie_expire  = 365;
    var er_cookie_hide_cookie_mins    = 0;

    er_cookie_hide_el.each(function(idx, obj){
      er_cookie_hide_id               = $(this).attr('data-id');
      er_cookie_hide_cookie_name      = 'er_cookie_hide_' + $(this).attr('data-cookie');
      er_cookie_hide_cookie_expire    = parseInt($(this).attr('data-expire'));

      if (er_cookie_hide_cookie_expire == 0) {
        er_cookie_hide_cookie_mins = 20;
      }

      if (ERYC_CookieHide_getCookie(er_cookie_hide_cookie_name).length == 0) {
        $('#' + er_cookie_hide_id).removeClass('hidden');
      }

      else {

        $('#' + er_cookie_hide_id).addClass('hidden');

        ERYC_CookieHide_setCookie(er_cookie_hide_cookie_name, 'close', er_cookie_hide_cookie_expire, er_cookie_hide_cookie_mins);
      }

      if ($('#' + er_cookie_hide_id)[0].hasAttribute('data-hide-override') == true) {
        $('#' + er_cookie_hide_id).removeClass('hidden');
      }

      $('#' + er_cookie_hide_id).trigger('er-cookie-trigger');

    })

    er_cookie_hide_el.click(function(e){
      e.preventDefault();
      er_cookie_hide_id               = $(this).attr('data-id');
      er_cookie_hide_cookie_name      = 'er_cookie_hide_' + $(this).attr('data-cookie');
      er_cookie_hide_cookie_expire    = parseInt($(this).attr('data-expire'));

      if (er_cookie_hide_cookie_expire == 0) {
        er_cookie_hide_cookie_mins = 20;
      }

      $('#' + er_cookie_hide_id).addClass('hidden');

      ERYC_CookieHide_setCookie(er_cookie_hide_cookie_name, 'close', er_cookie_hide_cookie_expire, er_cookie_hide_cookie_mins);
      $('#' + er_cookie_hide_id).trigger('er-cookie-trigger');
    })

  });

})(jQuery)