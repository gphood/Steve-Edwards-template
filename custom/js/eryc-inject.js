(function ($) {

  $(window).on('load', function() {

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