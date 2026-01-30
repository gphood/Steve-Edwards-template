// GLOBAL ERYC PAGINATION - create standardised pagination for multiple elements

// Create initial HTML for ERYC pagination
function ErycPaginationCreateInitWrapper(el, id) {

  var html = '<div class="eryc-pagination-tools" id="eryc-pagination-tools-' + id + '" data-id="' + id + '"></div>';
  el.find('.eryc-pagination-tools').remove();
  el.append(html);
}

// Create initial HTML for ERYC pagination
function ErycPaginationCreateInit(el, id, limit, max, label) {

  label   = label === undefined ? 'labels' : label;

  labels = {
    first:  'First',
    prev:   'Prev',
    next:   'Next',
    last:   'Last'
  };

  if (label == 'no labels') {
    jQuery.each(labels, function(i, o){
      labels[i] = '';
    })
  }

  var html = '<div class="eryc-pagination" data-id="' + id + '" data-limit="' + limit + '" data-max="' + max + '" data-start="1" data-end="' + limit + '">' +
                '<div class="left arrows">' +
                  '<a class="styled arrow first disabled" href="#" title="First"><span>' + labels.first +'</span>' + '' + '</a>' +
                  '<a class="styled arrow prev disabled" href="#" title="Prev"><span>' + labels.prev +'</span>' + '' + '</a>' +
                '</div>' +
                '<ul></ul>' +
                '<div class="right arrows">' +
                  '<a class="styled arrow next" href="#" title="Next"><span>' + labels.next +'</span>' + '' + '</a>' +
                  '<a class="styled arrow last" href="#" title="Last"><span>' + labels.last +'</span>' + '' + '</a>' +
                '</div>' +
              '</div>';
  el.find('.eryc-pagination').remove();
  el.find('.eryc-pagination-tools').append(html);

}

// Create initial HTML for ERYC pagination limiter
function ErycPaginationCreateInitLimiter(el, id) {

  var html = '<div class="eryc-limiter" data-id="' + id + '">' +
                '<select id="' + id + '-limiter" name="' + id + '-limiter" aria-label="Change the number of results shown">' +
                  '</select>' +
              '</div>';
  el.find('.eryc-limiter').remove();
  el.find('.eryc-pagination-tools').prepend(html);

}

// Create options for ERYC pagination limiter
function ErycPaginationCreateLimiterOptions(el, limit, max) {

  // List of row numbers
  var option_num = [1, 5, 10, 25, 50, 100, limit, max];

  // Sort
  option_num.sort(function(a, b){
    return a - b;
  })

  // Remove duplicates
  var no_duplicates = [];
  jQuery.each(option_num, function(i, o){
    if (no_duplicates.indexOf(o) == -1 && o <= max) {
      no_duplicates.push(o);
    }
  });

  var select_html = [];

  jQuery.each(no_duplicates, function(i, o){
    var selected  = o == limit ? 'selected' : '';
    var option    = '<option value=\"' + o + '\" ' + selected + '>' + o + '<\/option>';
    select_html.push(option);
  });

  el.find('.eryc-limiter select').html(select_html.join(''));

  if (limit > max) {
    el.find('.eryc-limiter').addClass('hidden');
    el.find('.eryc-total').addClass('eryc-limiter-hidden');
  }
  else {
    el.find('.eryc-limiter').removeClass('hidden');
    el.find('.eryc-total').removeClass('eryc-limiter-hidden');
  }

}

// Create initial HTML for ERYC results total
function ErycPaginationCreateTotal(el, id, limit, max) {

  el = el == null ? jQuery('#' + id) : el;

  var el_total    = jQuery('.eryc-total[data-id="' + id + '"]');
  var el_pager    = jQuery('.eryc-pagination[data-id="' + id + '"]');
  var results_txt = max == 1 ? 'result' : 'results';

  var start     = '1';
  var end       = limit;

  if (end > max) {
    end          = max;
  }

  if (el_total.length > 0) {
    start       = el_pager.attr('data-start');
    end         = el_pager.attr('data-end');
  }

  var pfx       = start + '-' + end;
  var sfx       = max;
  var bfcls     = '';
  if (start == end) {
    pfx       = start;
  }
  if (end == max && (end == 1 || start == 1)) {
    bfcls       = 'hidden';
  }

  var limit_class = '';

  if (limit > max) {
    limit_class = 'eryc-limiter-hidden';
  }


  var text      = '<span class="pfx ' + bfcls + '">' + pfx + '</span><span class="prep ' + bfcls + '">&nbsp;of&nbsp;</span><span class="sfx">' + max + ' ' + results_txt + '</span>';

  var html      = '<div class="eryc-total ' + limit_class + '" data-id="' + id + '">' +
                    text +
                  '</div>';

  if (el_total.length == 0) {
    el.find('.eryc-pagination-tools').prepend(html);
  }

  else {
    el_total.empty().append(text);
  }

}

// Create options for ERYC pagination limiter
function ErycPaginationCreateLimiterOptions(el, limit, max) {

  // List of row numbers
  var option_num = [1, 5, 10, 25, 50, 100, limit, max];

  // Sort
  option_num.sort(function(a, b){
    return a - b;
  })

  // Remove duplicates
  var no_duplicates = [];
  jQuery.each(option_num, function(i, o){
    if (no_duplicates.indexOf(o) == -1 && o <= max) {
      no_duplicates.push(o);
    }
  });

  var select_html = [];

  jQuery.each(no_duplicates, function(i, o){
    var selected  = o == limit ? 'selected' : '';
    var option    = '<option value=\"' + o + '\" ' + selected + '>' + o + '<\/option>';
    select_html.push(option);
  });

  el.find('.eryc-limiter select').html(select_html.join(''));

  if (limit > max) {
    el.find('.eryc-limiter').addClass('hidden');
    el.find('.eryc-total').addClass('eryc-limiter-hidden');
  }
  else {
    el.find('.eryc-limiter').removeClass('hidden');
    el.find('.eryc-total').removeClass('eryc-limiter-hidden');
  }

}

// Create LI html for ERYC pagination
function ErycPaginationCreatePages(el, limit, length, selected) {

  // Define first LI as selected index by default
  selected = selected === undefined ? 1 : selected;

  // Calculate max number of pages
  var pages = Math.ceil(length / limit);

  // Remove previous UL to start with fresh LI list
  el.find('ul').attr('data-pages', pages).empty();

  // Create LIs
  for (var i = 1; i <= pages; i++) {
    var a_class = i == selected ? 'selected' : '';
    el.find('ul').append('<li><a href="#" class="styled ' + a_class + '" data-index="' + i + '">' + i + '</a></li>');
  }

  el.find('ul').append('<li class="width"><a href="#" class="styled ' + a_class + '" data-index="' + pages + '">' + pages + '</a></li>');

  if (pages < 2) {
    el.find('.eryc-pagination').addClass('hidden');
  }
  else {
    el.find('.eryc-pagination').removeClass('hidden');
  }
  
}


// Hide excess LIs
function ErycPaginationHideExcessPages(el) {

  var ul_width    = el.find('ul').width();
  var pages       = parseInt(el.find('ul').attr('data-pages'));
  var li_width    = el.find('li.width').outerWidth();
  var max_lis     = Math.floor(ul_width / li_width);
  var current     = parseInt(el.find('.selected').attr('data-index'));
  var series      = Math.ceil(current / max_lis);
  var max_series  = Math.ceil(pages / max_lis);
  var max_index   = pages - max_lis;

  el.find('li:not(.width)').addClass('hidden');

  el.find('li').each(function(i, o){
    var li_index = parseInt(jQuery(this).find('a').attr('data-index'));

    if (Math.ceil(li_index / max_lis) == series) {
      jQuery(this).removeClass('hidden');
    }

    if (current > max_index && li_index > max_index) {
      jQuery(this).removeClass('hidden');
    }
    else if (current > max_index && li_index <= max_index) {
      jQuery(this).addClass('hidden');
    }

  })

}

// ERYC Pagination click
jQuery(document).on('click', '.eryc-pagination a:not(.disabled)', function(e){
  // Stop default click event
  e.preventDefault();

  var el_scroll   = jQuery(this).parents('.eryc-pagination-tools');
  var el_parent   = jQuery(this).parents('.eryc-pagination');
  var pages       = parseInt(el_parent.find('ul').attr('data-pages'));
  var click_el    = jQuery(this).parent().is('li') ? 'li' : 'btn';
  var current_idx = parseInt(el_parent.find('.selected').attr('data-index'));
  var new_idx     = parseInt(jQuery(this).attr('data-index'));


  if (click_el == 'btn') {

    if (jQuery(this).hasClass('first')) {
      new_idx        = 1;
    }

    if (jQuery(this).hasClass('prev')) {
      new_idx        = current_idx - 1;
    }

    if (jQuery(this).hasClass('next')) {
      new_idx        = current_idx + 1;
    }

    if (jQuery(this).hasClass('last')) {
      new_idx        = pages;
    }

  }

  if (new_idx == 1) {
    el_parent.find('.first, .prev').addClass('disabled');
  }

  if (new_idx > 1) {
    el_parent.find('.first, .prev').removeClass('disabled');
  }

  if (new_idx == pages) {
    el_parent.find('.last, .next').addClass('disabled');
  }

  if (new_idx < pages) {
    el_parent.find('.last, .next').removeClass('disabled');
  }

  el_parent.find('.selected').removeClass('selected');
  el_parent.find('ul a[data-index="' + new_idx +'"]').addClass('selected');


  ErycPaginationHideExcessPages(el_parent)

  // Trigger click event
  el_scroll.trigger('eryc_pagination_click');

  // Scroll tools into view if not visible
  var top_of_element    = jQuery(this).offset().top;
  var bottom_of_element = jQuery(this).offset().top + jQuery(this).outerHeight();
  var bottom_of_screen  = jQuery(window).scrollTop() + jQuery(window).innerHeight();
  var top_of_screen     = jQuery(window).scrollTop();

  var offset_to_bottom = (jQuery(window).innerHeight() - el_scroll.height() - 100) * -1;

  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
  } else {
    jQuery.smoothScroll({
      scrollTarget: el_scroll[0],
      offset: offset_to_bottom
    })
  }

})

// Trigger LI hide/show script on click
jQuery(document).on('eryc_pagination_click', '.eryc-pagination', function(e){
  ErycPaginationHideExcessPages(jQuery(this));
});

// Trigger LI hide/show script on window resize
jQuery(window).on('resize', function(){
  jQuery('.eryc-pagination').each(function(i, o){
    ErycPaginationHideExcessPages(jQuery(this));
  })
});

// ERYC limiter change
jQuery(document).on('change', '.eryc-limiter select', function(e){

  var value   = parseInt(jQuery(this).val());
  var data_id = jQuery(this).parents('.eryc-limiter').attr('data-id');
  var el_id   = jQuery('#' + data_id);
  var el      = jQuery('#' + data_id + ' .eryc-pagination');
  var max     = parseInt(el.attr('data-max'));

  jQuery.when(
    ErycPaginationCreatePages(el_id, value, max)
  ).then(
    ErycPaginationHideExcessPages(el_id)
  );

  el.attr('data-limit', value);

  el.find('ul li:first a').click();

  jQuery(document).trigger('eryc_pagination_limiter_change');

});

// Fires all relevant pagination scripts in order
function ErycPaginationScripts(el, id, limit, max, labels, limit_select, total) {

  jQuery.when(
    ErycPaginationCreateInitWrapper(el, id)
  ).then(function(){
    if (limit_select == '1') {
      ErycPaginationCreateInitLimiter(el, id)
    }
  }).then(function(){
    if (limit_select == '1') {
      ErycPaginationCreateLimiterOptions(el, limit, max)
    }
  }).then(function(){
    if (total == '1') {
      ErycPaginationCreateTotal(el, id, limit, max);
    }
  }).then(
    ErycPaginationCreateInit(el, id, limit, max, labels)
  ).then(
    ErycPaginationCreatePages(el, limit, max)
  ).then(
    ErycPaginationHideExcessPages(el)
  );

}
