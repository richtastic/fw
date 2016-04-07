<?php
/**
 * @package gaio
 * @version 0.0
 */
/*
Plugin Name: gaio
Plugin URI: http://wordpress.org/plugins/gaio/
Description: simple website theming
Author: Gaio
Author URI: http://www.google.com
Version: 0.0
License: Apache License Version 2.0 | http://www.apache.org/licenses/LICENSE-2.0.txt
*/

require_once(__ROOT_.'/php/functions.php');

function gaio_init_fxn() {
	// 

	// ?
	add_filter('plugins_loaded','gaio_action_unhandled_callback');
	add_filter('init','gaio_action_unhandled_callback');
	add_filter('after_setup_theme','gaio_action_unhandled_callback');
	add_filter('wp_register_sidebar_widget','gaio_action_unhandled_callback');
	add_filter('wp_loaded','gaio_action_unhandled_callback');
	add_filter('parse_request','gaio_action_unhandled_callback');
	add_filter('send_headers','gaio_action_unhandled_callback');
	add_filter('parse_query','gaio_action_unhandled_callback');
	add_filter('pre_get_posts','gaio_action_unhandled_callback');
	add_filter('posts_selection','gaio_action_unhandled_callback');
	add_filter('wp','gaio_action_unhandled_callback');
	add_filter('template_redirect','gaio_action_unhandled_callback');
	add_filter('get_header','gaio_action_unhandled_callback');
	add_filter('the_post','gaio_action_unhandled_callback');
	add_filter('get_footer','gaio_action_unhandled_callback');
	add_filter('get_sidebar','gaio_action_unhandled_callback');
	add_filter('wp_footer','gaio_action_unhandled_callback');
	add_filter('admin_bar_menu','gaio_action_unhandled_callback');
	add_filter('wp_meta','gaio_action_unhandled_callback');
	add_filter('shutdown','gaio_action_unhandled_callback');


	// ?
	add_filter('filter_name','gaio_filter_callback');
	// ?
	add_action('action_name','gaio_action_callback');
}


function gaio_filter_plugins_loaded_callback($item){
	echo "<br/>plugins loaded<br/>";
}

function gaio_filter_callback($item){
	return $item;
}

function gaio_action_callback($item){
	error_log("gaio_action_callback ".$item)
}

function gaio_action_unhandled_callback($item){
	error_log("unhandled filter callback: ".$item);
}

gaio_init_fxn();


/*
https://codex.wordpress.org/Plugin_API/Action_Reference
https://codex.wordpress.org/Plugin_API/Filter_Reference

*/

?>
