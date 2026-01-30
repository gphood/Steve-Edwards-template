<?php
class ErycCookies {

  function is_cookie($name, $value, $search) {

    if (isset($_COOKIE[$name])) {

      if ($search == 'is_exactly') {
        if ($_COOKIE[$name] == $value) {
          return true;
        }
      }

      elseif ($search == 'contains') {
        if (strpos($_COOKIE[$name], $value) !== false) {
          return true;
        }
      }

      else {
        return false;
      }

    }

    else {
      return false;
    }

  }

}
?>