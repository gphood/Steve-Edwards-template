function er_slick_add_arrows_class(el) {

  el.on('setPosition', function(event, slick){
    if (slick.options.arrows == true) {
      jQuery(this).addClass('slick-arrows');
    }
    else {
      jQuery(this).removeClass('slick-arrows');
    }
  });

}