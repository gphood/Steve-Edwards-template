(function ($) {
  // Open accordion
  function openAccordion(el) {
    el.parent().toggleClass('open').toggleClass('closed');
    el.toggleClass('open').toggleClass('closed');
    $.when(el.next('.content').slideToggle()).then(function(){
      if (el.parents('.slick-slider')) {
        var slick_parent = el.parents('.slick-slider');
        slick_parent.find(".slick-slide").height("auto");
        slick_parent.slick("setOption", '', '', true);
      }
    })
  }
  $(window).on('load', function() {
    $('.accordion-container').on('click', '.accordion-header', function(e){
      e.preventDefault();
      openAccordion($(this));

      $(this).mouseleave(function(me){
        $(this).blur();
        return false;
      })

    })

    // Scroll
    function er_page_acc_hash() {
      var er_window_hash = window.location.hash;
      $('.accordion-container .accordion').each(function(idx, obj){
        if (er_window_hash.length > 0 && $(this).attr('id') == er_window_hash.slice(1)) {
          if ($(this).hasClass('open') == false) {
            $(this).find('> .accordion-header')[0].click();
          }
          if ($(this).hasClass('accordion-child')) {
            $(this).parents('.child').parents('.accordion:not(.open)').find('> .accordion-header')[0].click();
          }
        }
      })
    }
    er_page_acc_hash();
    $(window).on('hashchange smoothScrollFinished', function(e){
      er_page_acc_hash();
    })

    // Tags
    if ($('.accordion-container .accordion-tags').length > 0) {

      $('.accordion-container').each(function(i, o){

        var el = $(this);

        var tag_id_arr  = [];
        var tag_arr     = [];

        if ($(this).find('.accordion-tag').length > 0) {

          $(this).find('.accordion-tag').each(function(){

            var tag_id  = $(this).attr('data-id');
            var tag_txt = $(this).text().trim();

            if (tag_id_arr.indexOf(tag_id) == -1) {
              tag_id_arr.push(tag_id);
              tag_arr.push({
                id: tag_id,
                text: tag_txt
              });
            }

          })

          tag_arr.sort(function(a, b){
            aSort = a.id;
            bSort = b.id;

            if (aSort < bSort) {
              return -1;
            }
            if (aSort > bSort) {
              return 1;
            }
            else {
              return 0;
            }

          })

          el.find('#accordion-tag-selector-loader').remove();

          $.each(tag_arr, function(k, v){

            el.find('.accordion-tags-selector').append('<a href="#" class="link-styled " id="accordion-tag-selector-' + v.id + '" data-id="' + v.id + '" data-search="' + v.text + '">' + v.text + '</a>');

          })

        }

      })

      $('.accordion-container .accordion-tags-selector').on('click', 'a', function(e){

        e.preventDefault();

        var el_parent = $(this).parents('.accordion-container');
        var click_id  = $(this).attr('data-id');

        if (!$(this).hasClass('active')) {

          $(this).parent().find('.active').removeClass('active');
          $(this).addClass('active');

          if (click_id != 'all') {

            el_parent.find('> .accordions > .accordion').addClass('hidden');
            el_parent.find('.accordion-tag[data-id="' + click_id + '"]').parents('.accordion').removeClass('hidden');

          }
          else {
            el_parent.find('> .accordions > .accordion').removeClass('hidden');
          }

        }

      })

    }

    // Reorder
    $('.accordion-container .accordion-reorder-btns a').click(function(e){
      e.preventDefault();

      if (!$(this).hasClass('active')) {
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');

        var mode = $(this).attr('data-id');

        var order_arr = [];

        $(this).parents('.accordion-container').find('.accordions > .accordion').each(function(i, o){
          var arr = [{
            id: $(this).attr('id'),
            latest: $(this).attr('data-order-latest'),
            atoz: $(this).attr('data-order-atoz')
          }]
          order_arr.push(arr);
        })

        var order_arr_sorted = order_arr.slice(0);

        if (mode == 'latest') {
          order_arr_sorted.sort(function(a, b){
            aSort = parseInt(a[0].latest);
            bSort = parseInt(b[0].latest);

            if (aSort < bSort) {
              return 1;
            }
            if (aSort > bSort) {
              return -1;
            }
            else {
              return 0;
            }

          })

        }

        else if (mode == 'atoz') {
          order_arr_sorted.sort(function(a, b){
            aSort = a[0].atoz;
            bSort = b[0].atoz;

            if (aSort < bSort) {
              return -1;
            }
            if (aSort > bSort) {
              return 1;
            }
            else {
              return 0;
            }

          })

        }

        $.each(order_arr_sorted, function(i, o){

          $('#' + o[0].id).css('order', i);

        });

      }

    })

    // Open/close all
    $('.accordion-container .accordion-openclose-btns a').click(function(e){
      e.preventDefault();

      if (!$(this).hasClass('active')) {
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
      }

      const mode = $(this).attr('data-id');

      $(this).parents('.accordion-container').find('.accordion').each(function() {
        const $accordion = $(this);

        if (mode === "closeall") {
          $accordion.removeClass('open').addClass('closed');
          $accordion.find('.accordion-header').removeClass('open').addClass('closed');
          $accordion.find('.contact-item').removeClass('open');
          $accordion.find('.contact-display').hide();
          $accordion.find('.accordion-content').slideUp(200);
        } else {
          $accordion.removeClass('closed').addClass('open');
          $accordion.find('.accordion-header').removeClass('closed').addClass('open');
          $accordion.find('.contact-item').addClass('open');
          $accordion.find('.contact-display').show();
          $accordion.find('.accordion-content').slideDown(200);
        }
        $(this)
      });
    })

    // End

    if ($('[data-particle-inject-to]').length > 0) {

      var data_particle_inject_froms = [];

      $('[data-particle-inject-to]').each(function(i, o){

        var to = $(this).attr('data-particle-inject-to')

        if ($('[data-particle-inject-from="' + to + '"]').length > 0 && $(this).find('[data-particle-inject-from]').length == 0) {

          data_particle_inject_froms.push(to);


          $('section[id^="g-inject"] [data-particle-inject-from="' + to + '"]:first').appendTo($(this));

        }

      })

      $.each(data_particle_inject_froms, function(i, o){

        $('section[id^="g-inject"] [data-particle-inject-from="' + o + '"]').remove();

      })

    }

  });

})(jQuery)