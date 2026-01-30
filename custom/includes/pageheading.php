<?php
class ErycPageHeading {

  function get_pageheading_text() {
    return JFactory::getApplication()->getMenu()->getActive()->title;
  }

}
?>