(function ($) {
  /**
    Script to change parent links to separators on mobile for better usability
  **/

  // Menu selectors
  var menu_el   = $('.g-main-nav');
  var mobile_el = $('#g-mobilemenu-container');

  // Mobile menu breakpoint
  var mobile_bp = parseInt(mobile_el.attr('data-g-menu-breakpoint').match(/\d+/)[0]) * 16;

  // Script class
  var init_cls  = 'g-offcanvas-init';

  // Class to identify that a swap has been executed
  var a2sep_cls = 'er-a2sep';

  // Trigger on toggle click
  $(document).on('click touchstart', '.g-offcanvas-toggle', function(e){

    // Run only if HTML does not have g-offcanvas-init to prevent unnecessary resource use
    if ($('html').hasClass(init_cls) == false) {

      // Added class that determines whether the first time script has been ran
      $('html').addClass(init_cls);

      // Get all links which hve dropdowns
      mobile_el.find('.g-menu-item-link-parent').each(function(i, o){

        var li_cls      = $(this).attr('class');
        var link_el     = $(this).find('> a');
        var link_text   = link_el.find('.g-menu-item-title').text().trim();
        var link_href   = link_el.attr('href');

        // Store original classes as data attribute for easy access from mobile to desktop
        $(this).attr('data-override', li_cls);

        // Remove link specific classes
        $(this).removeClass('g-menu-item-type-component g-menu-item-link-parent');

        // Add separator class and script identifier class
        $(this).addClass('g-menu-item-separator ' + a2sep_cls);


        // Switch parent to link to separator
        link_el.replaceWith('<div class="g-menu-item-container" data-g-menuparent data-href="' + link_href + '">' + link_el.html() + '</div>').find('.g-menu-item-content').addClass('g-separator');

        // Construct HTML of link duplicate that will sit under parent dropdown
        var link_html   = '<li class="er-duplicate ' + li_cls.replace(/g-menu-item-link-parent|g-parent|g-standard/g, '') + '"><a class="g-menu-item-container" href="' + link_href + '"><span class="g-menu-item-content"><span class="g-menu-item-title">' + link_text + '</span></span></a></li>';

        // Add duplicate under parent dropdown
        var back_el     = $(this).find('.g-go-back:first');
        back_el.after(link_html);

        if (back_el.next('.er-duplicate').siblings('.active').length > 0) {
          back_el.next('.er-duplicate').removeClass('active');
        }

      })

      // Click through to last active item in mobile menu
      var li_active_el  = mobile_el.find('li.active:not(.er-duplicate):not(.hidden-portables):not(.hidden-phone)');
      var li_active_len = li_active_el.length;
      var li_active_max = li_active_len - 1;

      if (li_active_len > 1) {

        clearInterval(li_active_interval);
        var li_active_timer = 0;
        var li_active_interval = setInterval(function() {
          li_active_timer++
          if ($('#g-offcanvas').attr('aria-expanded') == 'true') {
            li_active_el.each(function(i, o){
              if (i < li_active_max) {
                $(this).find('> .g-menu-item-container').click();
              }
            })
            clearInterval(li_active_interval);

          }
        }, 100);

      }

    }


  })

  // Reset menu when moving from mobile to desktop
  $(window).resize(function(){

    if ($(window).width() >= mobile_bp && $('html').hasClass(init_cls) == true) {

      // Remove duplicate from dropdown
      menu_el.find('.er-duplicate').remove();

      // Change separators to links
      menu_el.find('.' + a2sep_cls).each(function(i, o){

        $(this).attr('class', $(this).attr('data-override'));

        var link_el   = $(this).find(' > .g-menu-item-container');
        var link_href = link_el.attr('data-href');

        link_el.replaceWith('<a class="g-menu-item-container" href="' + link_href + '">' + link_el.html() + '</a>').find('.g-separator').removeClass('g-separator');

      })

      // Remove class to allow script to execute if going from desktop to mobile
      $('html').removeClass(init_cls);

    }

  })

  $('a.g-menu-item-container').focus(function(){

    var parents         = $(this).parents('.g-menu-item');
    var parents_reverse = parents.toArray().reverse();

    $.each(parents_reverse, function(i, o){
      if ($(this).hasClass('g-selected') == false) {
        $(this).find('> .g-menu-item-container > .g-menu-parent-indicator').click();
      }
    })
  })

  // ACTIVE ALIASES
  $('.g-menu-item-type-alias').each(function(i, o){

    var alias_url = $(this).find('a').attr('href') + '/';
    var pathname = window.location.pathname;

    if (alias_url == pathname) { 
      $(this).addClass('active');
      $(this).parents('li').addClass('active');
    }

  })

})(jQuery)