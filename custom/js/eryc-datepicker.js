var eryc_weekday_arr  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var eryc_month_arr    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const eryc_today     = new Date(new Date().setHours(0,0,0,0));
const eryc_now       = new Date();

function er_datepicker_init() {

  jQuery('.er-datepicker:not(.hasDatepicker)').each(function(i, o){

    var format    = jQuery(this).attr('data-date-format') == undefined ? 'D, d M yy' : jQuery(this).attr('data-date-format');
    var min_date  = jQuery(this).attr('data-date-min') == undefined ? null : jQuery(this).attr('data-date-min');
    var max_date  = jQuery(this).attr('data-date-max') == undefined ? null : jQuery(this).attr('data-date-max');
    var set_date  = min_date != null ? min_date : 'today';

    var $this     = jQuery(this);

    jQuery(this).datepicker({
      dateFormat: format,
      minDate: min_date,
      maxDate: max_date,
      onSelect: function(date, obj){
        $this.attr('data-value', er_datepicker_get_date_value(jQuery(this)));
        $this.trigger('eryc-datepicker-select');
      }
    }).datepicker('setDate', set_date).attr('data-value', er_datepicker_get_date_value(jQuery(this)));

  })

  var mobis_defaults = {
    format: 'DDD, DD MMM YYYY',
  };

  jQuery('.er-mobis-datepicker').each(function(i, o){

    var defaults = {
      format: jQuery(this).attr('data-date-format') == undefined ? mobis_defaults.format : jQuery(this).attr('data-date-format'),
      mindate: jQuery(this).attr('data-date-min') == undefined ? null : jQuery(this).attr('data-date-min'),
      maxdate: jQuery(this).attr('data-date-max') == undefined ? null : jQuery(this).attr('data-date-max'),
    };

    var $this     = jQuery(this);

    jQuery(this).mobiscroll().datepicker({
      controls: ['calendar'],
      dateFormat: defaults.format,
      min: defaults.mindate,
      max: defaults.maxdate,
      onChange: function(event, inst) {
        $this.next().val(er_date_get_date_value(event.value, 'value'));
        $this.next().trigger('eryc-datepicker-select');
      }
    }).mobiscroll('setVal', eryc_today);

  })

}

function er_datepicker_get_date_value(el) {
  var getdate   = el.datepicker('getDate');
  var date_y    = getdate.getFullYear();
  var date_m    = ("0" + (getdate.getMonth() + 1)).slice(-2);
  var date_d    = ('0' + getdate.getDate()).slice(-2);
  var date_ymd  = [date_y, date_m, date_d].join('-');
  var date      = date_ymd;

  return date;
}

function er_date_get_date_value(date, mode, today_text, tomorrow_text) {

  var getdate   = ("0" + date.getDate()).slice(-2);
  var getmonth  = ("0" + (date.getMonth() + 1)).slice(-2);
  var getyear   = date.getFullYear();
  var getday    = date.getDay();
  var date_val  = [getyear, getmonth, getdate].join('-');
  var date_txt  = eryc_weekday_arr[getday] + ' - ' + getdate + ' ' + eryc_month_arr[getmonth - 1];

  var date_offset = (date - eryc_today) / 1000 / 86400;

  if (mode == 'text') {

    if (today_text && date_offset == 0) {
      date_txt = 'Today';
    }
    if (tomorrow_text && date_offset == 1) {
      date_txt = 'Tomorrow';
    }
    return date_txt;
  }

  else {
    return date_val;
  }

}

function er_time_24_to_12(time) {

  var hours   = parseInt(time.slice(0,2));
  var mins    = parseInt(time.slice(-2));

  var ampm    = hours >= 12 ? 'pm' : 'am';

  var txt_h   = hours > 12 ? hours - 12 : hours;
  var txt_m   = mins > 0 ? '.' + mins : '';

  return txt_h + txt_m + ampm;

}

er_datepicker_init();