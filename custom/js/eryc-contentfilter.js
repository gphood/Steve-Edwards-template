var csv_content_filter_source_path = getUrlParameter('contentfilter-source').length > 0 ? getUrlParameter('contentfilter-source') + '/' : '';

function drop_fn(id, disabled, initial, data, index) {
  var drop            = [];
  var drop_class      = "dropdown er-drop-filter";
  var drop_options    = [];
  var drop_name       = data[0][id].split(':')[0];
  var drop_data_name  = $('.er-drop-filter-placeholder').eq(index).attr('data-name');
  var drop_options_jn = '';
  var drop_dis        = '';

  $.each(data, function(idx, obj){
    if (id == 0) {
      drop.push(obj[id].split(':')[1]);
    }
    else {
      var drop_each_low  = 0;
      var drop_each_high = id - 1;
      var drop_each_arr  = [];
      while(drop_each_low <= drop_each_high){
         drop_each_arr.push(drop_each_low++);
      }
      var drop_true_arr = [];
      $.each(drop_each_arr, function(idx, val){
        if (obj[val].split(':')[1].replace(/&#44;/g,',') == $('.er-drop-filter-placeholder').eq(index).find('select').eq(val).find('option:selected').text()) {
          drop_true_arr.push('true');
        }
        else {
          drop_true_arr.push('false');
        }
      })
      if (drop_true_arr.indexOf('false') < 0) {
        drop.push(obj[id].split(':')[1]);
      }
    }
  });

//    drop.sort();

  var drop_unq = drop.filter(function(itm, i, drop) {
      return i == drop.indexOf(itm);
  });

  $.each(drop_unq, function(idx, obj){
    var val  = obj.toLowerCase().replace(/\s/g,"-");
    var html = '<option value="' + val +  '">' + obj + '</option>';
    drop_options.push(html);
  })

  if (disabled == 1) {
    drop_dis =  'disabled';
  }
  else {
    drop_options_jn = drop_options.join('');
  }
  var drop_select = '<div class="er-drop-filter-item ' + drop_dis + '"><div class="er-select-wrapper"><select ' + drop_dis + ' class="' + drop_class + '" data-name="' + drop_data_name + '" name="' + drop_class + '-' + drop_name.toLowerCase() + '"><option value="filter">' + drop_name +'</option>' + drop_options_jn + '</select></div></div>';

  if (initial == "initial") {
    $(drop_select).appendTo($('.er-drop-filter-placeholder').eq(index).find('.er-drop-filter-content'));
  }
  else {
    $('.er-drop-filter-placeholder').eq(index).find('.er-drop-filter-content .er-drop-filter-item').eq(id).replaceWith($(drop_select));
  }
  $('.er-drop-filter-placeholder').eq(index).addClass('loaded');
}
function drop_init_fn(data, index) {
  var drop_length = data[0].length;

  var drop_len_low  = 0;
  var drop_len_high = drop_length - 1;
  var drop_len_arr  = [];
  while(drop_len_low <= drop_len_high){
     drop_len_arr.push(drop_len_low++);
  }

  $.each(drop_len_arr, function(idx, obj){
    if (idx == 0) {
      drop_fn(idx, 0, "initial", data, index);
    }
    else {
      drop_fn(idx, 1, "initial", data, index);
    }
  });

  $('.er-drop-filter-placeholder').eq(index).attr('data-len',drop_len_high);
}
function processData(allText, index, initial, id, disabled) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(',');
  var lines = [], base, key;

  for (var i=1; i<allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    if (data.length == headers.length) {
      var tarr = [];
      for (var j=0; j<headers.length; j++) {
          tarr.push(headers[j]+":"+data[j]);
      }
      lines.push(tarr);
    }
  }

  if (initial == "initial") {
    drop_init_fn(lines, index);
  }
  else {
    drop_fn(id, disabled, "reload", lines, index);
  }
}
function drop_res(order, len_adj, object) {
  if (order == len_adj) {
    var result_arr = object.parents('.er-drop-filter-content').find('select:last option:last').text().trim().slice(1,-1).split('}{');
    var result_html_arr = [];

    $.each(result_arr, function(idx, obj){
      var split = obj.split('|');
      var icon  = '';

      // Redirect
      if (split[6].indexOf('Redirect') > -1) {
        window.location.href = split[3];
        split[3] = '<span>You are being redirected to: <a href="' + split[3] + '">' + split[3] + '</a></span>';
      }

      // Add icon
      if (split[5].length > 0) {
        var icon_cls = 'fa fa-fw fa-' + split[5];
        if (split[5].indexOf(' far') > -1 || split[5].indexOf(' fab') > -1 || split[5].indexOf(' fal') > -1 || split[5].indexOf(' fas') > -1) {
          icon_cls =  'fa-fw fa-' + split[5]; 
        }
        icon = '<i class="' + icon_cls + '"></i>';
      }
      // Custom CSV function
      if (split[3].indexOf('func(') > -1) {
        var func_split = split[3].slice(6,-2).split('][');
        var func_name  = func_split[0];
        var func_arr   = [];
        $.each(func_split, function(idx, obj) {
          if (idx > 0) {
            var html = '"' + obj + '"';
            func_arr.push(html);
          }
        });
        var func_str = func_name + '(' + func_arr.join(',') + ')';
        var func_arg = func_arr.join(',');
        var func_result = window[func_name].apply(this, func_split.slice(1));
        split[3] = func_result;
      }
      // List format
      if (split[6] != undefined) {
        if (split[6].indexOf('List') > -1) {
          var list_arr = split[3].split('~');
          var list_html = [];
          //list_arr.sort();
          $.each(list_arr, function(idx, obj){
            var html = '<li>' + obj + '</li>';
            list_html.push(html);
          })
          split[3] = '<ul>' + list_html.join('') + '</ul>';
        }
      }
      // Link function
      if (split[3].indexOf('[URL=') > -1) {
        var url = split[3].match(/\[URL=.*?\].*?\[\/URL\]/g);
        $.each(url, function(idx, obj){
          var url_lnk = obj.match(/\[URL=.*?\]/)[0].slice(5, -1);
          var url_len = url_lnk.length + 6;
          var url_txt = obj.slice(url_len, -6);
          split[3] = split[3].replace(/\[URL=.*?\]/, '<a href="' + url_lnk + '">').replace(/\[\/URL\]/, '</a>');
        })
      }
      // HTML
      var open = '';
      var close = '';
      if (split[1].length > 0) {
        open  = '<' + split[1] + '>';
        close = '</' + split[1] + '>';
      }
      var item  = '<div class="' + split[0] + '">' + icon + open + split[2] + close + '<span>' + split[3] + '</span></div>';
      var html  = '<div class="er-drop-filter-results-item ' + split[4].replace('er-size', 'size') + '">' + item + '</div>';
      result_html_arr.push(html);
    })

    var result = result_html_arr.join('');

    object.parents('.er-drop-filter-block').find('.er-drop-filter-results-inner > div').remove();
    object.parents('.er-drop-filter-block').find('.er-drop-filter-results-inner').append($('<div/>'));
    object.parents('.er-drop-filter-block').find('.er-drop-filter-results-inner > div').replaceWith($(result));
    object.parents('.er-drop-filter-block').find('.er-drop-filter-results').show();
  }
  else {
    object.parents('.er-drop-filter-block').find('.er-drop-filter-results').hide();
  }
}
var drop_data = [];

function er_drop_dt(start_date, end_date, days, format) {
  var audit   = 0
  if ($('#er-wrapper[data-qs*="drop-filter-audit"]').length > 0) {
    audit = 1;
  }

  var initial = new Date(start_date);
  var arr     = [];
  arr.push(initial);
  days        = parseInt(days);

  var now     = date('Y-m-d', new Date());
  var dates   = [];
  var bank    = eryc_bank_holidays;
  var start   = new Date(start_date);
  var end     = new Date(end_date);

  while(start < end) {
    arr.push(start);
    start = new Date(start.setDate(
      start.getDate() + days
    ))
  }

  $.each(arr, function(idx, obj){
    var date_str = obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
    if (obj > now && bank.indexOf(date_str) < 0) {
      if (audit == 0) {
        dates.push(obj);
      }
      else {
        dates.push('<p>' + obj + '</p>');
      }
    }
  })

  if (audit == 0) {
    return $.datepicker.formatDate(format, new Date(Date.parse(dates[0])));
  }
  else {
    return dates.join('');
  }
};

$(document).ready(function(){
  var drop_wrapper = '<div class="er-drop-filter-block"><div class="er-drop-filter-content"></div><div class="er-drop-filter-results"><div class="er-drop-filter-results-inner"><div></div></div></div></div>';

  if ($('.er-drop-filter-placeholder').length > 0) {
    $('.er-drop-filter-placeholder').each(function(idx,obj){
      if ($(this).children().length == 0) {
        $(this).wrapInner(drop_wrapper)
        $(this).attr('data-idx',idx);
      }
      var asset   = $(this).attr('data-asset');
      var file    = ($(this).attr('data-file') != null) ? $(this).attr('data-file') : 'asset';
      var name_id = $(this).attr('data-name').toLowerCase().replace(/ /g, '_').replace(/\'/g, '');
      $.ajax({
        type: "GET",
        url: (file == 'asset') ? "/EasySiteWeb/GatewayLink.aspx?alId=" + asset : 'https://downloads.eastriding.org.uk/content-filters/' + name_id + '/' + csv_content_filter_source_path + 'data.csv',
        dataType: "text",
        success: function(data) {
          drop_data.push(data);
          processData(data, idx, "initial");
          $('.er-drop-filter-placeholder').each(function(ind, val) {
            $(this).find('select:first').addClass('unique');
          });
        }
      });
    });
  }
});

$(document).on('change', '.er-drop-filter', function(event){
  event.stopPropagation();
  event.stopImmediatePropagation();
  var $this   = $(this);
  var order   = $(this).parents('.er-drop-filter-item').index();
  var next    = order + 1;
  var len     = $(this).parents('.er-drop-filter-content').find('select').length -1;
  var len_adj = len - 1;
  var val     = $(this).val();
  var asset   = $(this).parents('.er-drop-filter-placeholder').attr('data-asset');
  var file    = ($(this).parents('.er-drop-filter-placeholder').attr('data-file') != null) ? $(this).parents('.er-drop-filter-placeholder').attr('data-file') : 'asset';
  var ind     = $(this).parents('.er-drop-filter-placeholder').attr('data-idx');
  var name_id = $(this).parents('.er-drop-filter-placeholder').attr('data-name').toLowerCase().replace(/ /g, '_').replace(/\'/g, '');

  $(this).parents('.er-drop-filter-placeholder').find('select').removeClass('unique');

  $(this).parents('.er-drop-filter-placeholder').removeClass('loaded');

  if (val == "filter") {
    $(this).parents('.er-drop-filter-content').find('select').each(function(idx, obj) {
      if (idx > order && idx < len) {
        if ($(this).parents('.er-drop-filter-item').hasClass('disabled') == false) {
          $(this).parents('.er-drop-filter-item').addClass('disabled');
        }
        $(this).attr('disabled', 'disabled');
        $(this).find('option:not([value="filter"])').remove();
      }
      if (order <= len_adj) {
        $(this).parents('.er-drop-filter-block').find('.er-drop-filter-results').hide();
      }
    });
    $(this).parents('.er-drop-filter-placeholder').addClass('loaded');
  }
  else {
    $.ajax({
      type: "GET",
      url: (file == 'asset') ? "/EasySiteWeb/GatewayLink.aspx?alId=" + asset : 'https://downloads.eastriding.org.uk/content-filters/' + name_id + '/' + csv_content_filter_source_path + 'data.csv',
      dataType: "text",
      success: function(data) {
        $.when(processData(data, ind, "reload", next, 0)).then(drop_res(order, len_adj, $this));
      }
    });
  }
})