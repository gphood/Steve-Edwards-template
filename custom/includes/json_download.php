<?php
class ErycJsonDownload {

  function download($url = '') {
    return json_decode(file_get_contents($url, false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false)))));
  }

  function download_raw($url = '') {
    return file_get_contents($url, false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false))));
  }

  function download_asset_manager($url = '', $directory = '', $date = 'D, d M Y', $tagmode = '', $order = '') {
    return json_decode(file_get_contents($url.'/'.$directory.'/output.json', false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false)))));
  }

  function download_asset_manager_raw($url = '', $directory = '', $date = 'D, d M Y', $tagmode = '', $order = '') {
    return file_get_contents($url.'/'.$directory.'/output.json', false, stream_context_create(array('ssl' => array('verify_peer' => false, 'verify_peer_name' => false))));
  }

}
?>