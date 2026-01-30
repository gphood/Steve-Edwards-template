function er_responsive_classes(idx){
  jQuery('[data-mobile], [data-large-mobile], [data-small-mobile], [data-md-mobile], [data-sm-mobile], [data-tablet], [data-portable], [data-desktop], [data-st-desktop], [data-lg-desktop], [data-xl-desktop]').each(function(i, o){
    var g_block = '';
    var g_size = '';
    var attribute       = '';

    if (jQuery(this).attr('class').indexOf('g-block') > -1) {
      g_block = 'g-block ';
      g_size = ' ' + jQuery(this).attr('class').match(/size-\d+/)[0];
    }

    if (idx == 0) {
      jQuery(this).attr('data-class', jQuery(this).attr('class'));
    }
    if (jQuery(this).attr('data-tablet') != undefined && window.innerWidth >= 768 && window.innerWidth < 960) {
      attribute = g_block + jQuery(this).attr('data-tablet');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-xl-desktop') != undefined && window.innerWidth >= 1440) {
      attribute = g_block + jQuery(this).attr('data-xl-desktop');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-lg-desktop') != undefined && window.innerWidth >= 1200 && window.innerWidth < 1440) {
      attribute = g_block + jQuery(this).attr('data-lg-desktop');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-st-desktop') != undefined && window.innerWidth >= 960 && window.innerWidth < 1200) {
      attribute = g_block + jQuery(this).attr('data-st-desktop');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-desktop') != undefined && window.innerWidth >= 960) {
      attribute = g_block + jQuery(this).attr('data-desktop');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-large-mobile') != undefined && window.innerWidth >= 480 && window.innerWidth < 768) {
      attribute = g_block + jQuery(this).attr('data-large-mobile');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-small-mobile') != undefined && window.innerWidth >= 320 && window.innerWidth < 768) {
      attribute = g_block + jQuery(this).attr('data-small-mobile');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-md-mobile') != undefined && window.innerWidth >= 360 && window.innerWidth < 480) {
      attribute = g_block + jQuery(this).attr('data-md-mobile');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-sm-mobile') != undefined && window.innerWidth >= 320 && window.innerWidth < 480) {
      attribute = g_block + jQuery(this).attr('data-sm-mobile');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-mobile') != undefined && window.innerWidth < 768) {
      attribute = g_block + jQuery(this).attr('data-mobile');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else if (jQuery(this).attr('data-portable') != undefined && window.innerWidth < 960) {
      attribute = g_block + jQuery(this).attr('data-portable');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
    else {
      attribute = g_block + jQuery(this).attr('data-class');
      attribute = g_size.length > 0 && attribute.match(/size-\d+/) != null ? attribute : attribute + g_size;
      jQuery(this).attr('class', attribute);
    }
  })
  jQuery(document).trigger('er_responsive_classes');
}
er_responsive_classes(0);

jQuery(window).resize(function() {
  er_responsive_classes(1);
});