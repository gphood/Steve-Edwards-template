<?php
// Include Body Suffixes to add data-page/pages/qs to body tag
include_once dirname(__FILE__).'/body_suffixes.php';

// Include Asset Manager Json Downloader
include_once dirname(__FILE__).'/json_download.php';

// Include Query String
include_once dirname(__FILE__).'/querystring.php';

// Include Cookies
include_once dirname(__FILE__).'/cookies.php';

// Include DateTime
include_once dirname(__FILE__).'/datetime.php';

// Include Directory TSV to Array
include_once dirname(__FILE__).'/dir_tsv_to_array.php';

// Include Page Heading
include_once dirname(__FILE__).'/pageheading.php';

// Dependency Injection of Body Suffixes
$gantry['body_suffixes'] = new \ErycBodySuffixes();

// Dependency Injection of Json Downloader
$gantry['json_download'] = new \ErycJsonDownload();

// Dependency Injection of Query Strings
$gantry['query_string'] = new \ErycQueryString();

// Dependency Injection of Query Strings
$gantry['cookies'] = new \ErycCookies();

// Dependency Injection of DateTime
$gantry['strtotime'] = new \ErycDateTime();

// Dependency Injection of DateTime
$gantry['tsv_to_arr'] = new \ErycDirTSVDownload();

// Dependency Injection of Page Heading
$gantry['pageheading'] = new \ErycPageHeading();

// Make ImageGalleryService available in Twig as gantry.imagegallery
include_once __DIR__ . '/ImageGalleryService.php';
$gantry['imagegallery'] = new \ImageGalleryService();
