<?php
class ErycDirTSVDownload {

  function tsv_to_arr($url) {
    $data         = file_get_contents($url, false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false))));
    $lines        = explode("\n", $data);
    $header_row   = 4;
    $idx          = 0;
    $headers      = array();
    $results      = array();

    foreach ($lines as $key => $line) {

      if ($idx >= 4) {

        $cols = explode("\t", $line);
        $results[] = $cols;

      }

      $idx++;

    }

    return json_encode($results);

  }

}
?>