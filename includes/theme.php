<?php

/**
 * @package   Gantry5
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2022 RocketTheme, LLC
 * @license   GNU/GPLv2 and later
 *
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

class_exists('\\Gantry\\Framework\\Gantry') or die;

use Gantry\Framework\Theme;

/**
 * Define the template.
 */
class GantryTheme extends Theme {}

// Initialize theme stream.
/** @var \Gantry\Framework\Platform $platform */
$platform = $gantry['platform'];
$platform->set(
    'streams.gantry-theme.prefixes',
    ['' => [
        "gantry-themes://{$gantry['theme.name']}/custom",
        "gantry-themes://{$gantry['theme.name']}",
        "gantry-themes://{$gantry['theme.name']}/common"
    ]]
);

// Define Gantry services.
$gantry['theme'] = static function ($c)  {
    return new GantryTheme($c['theme.path'], $c['theme.name']);
};

// Include ERYC base includes
$eryc_custom_include_theme_path = dirname(__FILE__).'/../custom/includes/theme.php';
if((@include $eryc_custom_include_theme_path) === false) {
    $eryc_custom_include_theme_path = parse_ini_file(JPATH_SITE.'/templates/'.$gantry['theme.name'].'/config.ini')['theme_php_path'];
}
include_once $eryc_custom_include_theme_path;

include_once dirname(__FILE__).'/tmpl/theme.php';