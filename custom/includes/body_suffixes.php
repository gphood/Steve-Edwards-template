<?php
class ErycBodySuffixes {

  function body_pages() {
    $uri  = \JUri::getInstance();
    $url  = $uri->toString(array('path'));
    $rgx  = preg_replace('/^\/|\/$/', '', $url);
    $str  = trim(preg_replace('/^|\//', ' er-', $rgx));
    $str  =  $str == 'er-' ? 'er-home' : $str;
    return $str;
  }

  function body_page() {
    $uri  = \JUri::getInstance();
    $url  = $uri->toString(array('path'));
    $rgx  = preg_replace('/^\/|\/$/', '', $url);
    $arr  = explode('/', $rgx);
    $str  = 'er-'.end($arr);
    $str  =  $str == 'er-' ? 'er-home' : $str;
    return $str;
  }

  function body_qs() {
    $uri  = \JUri::getInstance();
    $url  = $uri->toString(array('query'));
    $arr  = parse_str(substr($url, 1), $queries);
    $keys = array_keys($queries);
    $str  = join(' ', $keys);
    return $str;
  }

  function body_browser() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $t = strtolower($user_agent);
    $t = " " . $t;
    if     (strpos($t, 'opera'    ) || strpos($t, 'opr/')     ) return 'opera'   ;
    elseif (strpos($t, 'silktide' )                           ) return 'silktide';
    elseif (strpos($t, 'edge'     )                           ) return 'edge'    ;
    elseif (strpos($t, 'chrome'   )                           ) return 'chrome'  ;
    elseif (strpos($t, 'safari'   )                           ) return 'safari'  ;
    elseif (strpos($t, 'firefox'  )                           ) return 'firefox' ;
    elseif (strpos($t, 'msie'     ) || strpos($t, 'trident/7')) return 'msie';
    return 'Unknown';
  }
}
?>