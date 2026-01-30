<?php
class ErycQueryString {

  function query_string_isset($query = '') {

    if (isset($_GET[$query])) {
      return true;
    }

    else {
      return false;
    }

  }

  function query_string_get($query = '') {

    if (isset($_GET[$query])) {
      return $_GET[$query];
    }

    else {
      return false;
    }

  }

}
?>