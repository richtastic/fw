<?php
/**
 * @package giau
 * @version 0.0
 */
/*
Plugin Name: giau
Plugin URI: http://wordpress.org/plugins/giau/
Description: simple website theming
Author: Gaio
Author URI: http://www.google.com
Version: 0.0
License: Apache License Version 2.0 | http://www.apache.org/licenses/LICENSE-2.0.txt
*/


// this is called every time the plugins page is listed


$GIAU_ROOT_PATH = dirname(__FILE__);
error_log("GIAU_ROOT_PATH: ".$GIAU_ROOT_PATH);
require_once($GIAU_ROOT_PATH.'/php/functions.php');


function WORDPRESS_TABLE_PREFIX(){
	global $wpdb;
	$wordpress_prefix = $wpdb->prefix;
	return $wordpress_prefix;
}
function GIAU_UNIQUE_IDENTIFIER(){
	return "giau";
}
function GIAU_TABLE_PREFIX(){
	return "giau_";
}
function GIAU_TABLE_NAME_LANGUAGIZATION(){
	return "languagization";
}
function GIAU_TABLE_NAME_PAGE(){
	return "presentation_page";
}
function GIAU_TABLE_NAME_SECTION(){
	return "section";
}
function GIAU_TABLE_NAME_WIDGET(){
	return "widget";
}
function GIAU_TABLE_NAME_CALENDAR(){
	return "calendar";
}
function GIAU_TABLE_NAME_BIO(){
	return "bio";
}

function GIAU_FULL_TABLE_NAME_LANGUAGIZATION(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_LANGUAGIZATION();
}
function GIAU_FULL_TABLE_NAME_PAGE(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_PAGE();
}
function GIAU_FULL_TABLE_NAME_SECTION(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_SECTION();
}
function GIAU_FULL_TABLE_NAME_WIDGET(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_WIDGET();
}
function GIAU_FULL_TABLE_NAME_CALENDAR(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_CALENDAR();
}
function GIAU_FULL_TABLE_NAME_BIO(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_BIO();
}

// function GIAU_FULL_TABLE_NAME_NAVIGATION(){
// 	global $wpdb;
// 	$wordpress_prefix = $wpdb->prefix;
// 	return $wordpress_prefix."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_LANGUAGIZATION();
// }


function include_all_files(){
	require_once_directory( dirname(__FILE__)."/php/" );
}


function giau_callback_activation(){
	error_log("giau_callback_activation");
	giau_init_fxn();
}

function giau_callback_deactivation(){
	error_log("giau_callback_deactivation");
	giau_remove_database();
	// Our post type will be automatically removed, so no need to unregister it
	// Clear the permalinks to remove our post type's rules
	flush_rewrite_rules();
}






function giau_init_fxn() {
	error_log("giau_init_fxn");
	include_all_files();

	$WP_ACTION_PLUGINS_LOADED = "plugins_loaded";
	$WP_ACTION_INIT = "init";

	$GIAU_PLUGIN_VERSION_KEY = "GIAU_PLUGIN_VERSION";
	$GIAU_PLUGIN_VERSION_VALUE = "0.0.0";

	if(!defined($GIAU_PLUGIN_VERSION_KEY)){
		define($GIAU_PLUGIN_VERSION_KEY, $GIAU_PLUGIN_VERSION_VALUE);
	}else{
		return;
	}

	// CREATE DATABASE & TABLES
	giau_create_database();
	giau_default_fill_database();

	// PREPARE ACTION HANDLERS
	add_action(WP_ACTION_PLUGINS_LOADED, "giau_action_plugins_loaded_callback");
	//
	add_action(WP_ACTION_INIT, "giau_action_init_callback");
}

function giau_action_admin_menu() {
	error_log("RICHIE Y");
	// OPTIONS > GIAU PLUGIN
	add_options_page('Giau Plugin Options', 'Giau Plugin', 'manage_options', GIAU_UNIQUE_IDENTIFIER(), 'giau_admin_plugin_options');
	// GIAU PLUGIN | MENU
	add_menu_page('Giau Plugin Page', 'Giau Plugin', 'manage_options', 'giau-plugin-main', 'giau_admin_menu_page_main');
		add_submenu_page('giau-plugin-main', 'Giau Sub Menu', 'Sub Menu', 'manage_options', 'giau-plugin-submenu', 'giau_admin_menu_page_submenu');
}

function giau_admin_plugin_options() {
	error_log("RICHIE PLUGIN OPTIONS");
	if(!current_user_can('manage_options'))  {
	wp_die( __('You do not have sufficient permissions to access this page.') );
	}
?>
	<div class="wrap">
		<p>Here is where the form would go if I actually had options.</p>
	</div>
<?php
}

function giau_admin_menu_page_main(){
?>
	<h1>Hello World Giau</h1>
<?php
}
function giau_admin_menu_page_submenu(){
	// <form action="<?php echo $plugins_url ?>" method="post" enctype="multipart/form-data">
?>
	<h1>Hello World Sub Giau</h1>
	<!-- <form action="/wp-content/plugins/listeningto/formhtml.php" method="post"> -->
	<form action="../wp-content/plugins/giau/php/admin_input.php" method="post">
		Album: <input type="text" name="album" />
		Artist: <input type="text" name="artist" />
		<input type="submit">
	</form>
<?php
}

function giau_action_init_callback(){
	error_log("giau_action_init_callback");
	// Trigger our function that registers the custom post type
//	pluginprefix_setup_post_types();
	// Clear the permalinks after the post type has been registered
	flush_rewrite_rules();
}


function giau_action_plugins_loaded_callback($item){
	error_log("giau_action_plugins_loaded_callback");
	echo "<br/>plugins loaded<br/>";
}

function giau_filter_callback($item){
	return $item;
}

function giau_action_callback($item){
	error_log("gaio_action_callback ".$item);
}

function giau_action_unhandled_callback($item){
	error_log("unhandled filter callback: ".$item);
}





function giau_create_database(){
	error_log("giau_create_database");
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' ); // dbDelta
	global $wpdb;

	// languagization lookup table
	// key: TEXT-TO-APPEAR-FOR-CALENDAR-DATE
	// language: en | en-US | kr | ...
	// value: 

	$charset_collate = $wpdb->get_charset_collate();

	// LANGUAGIZATION
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// hash_index = index lookup  EG: "CALENDAR_TITLE_TEXT"
	// language = (ISO639-1)-(IETF tag/ISO3166-1) language code  EG: en, en-US, sp-MX, ko, ko-KP/ko-KR
	// phrase_value = value to substitute in location  EG: "Upcoming Events"
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		hash_index VARCHAR(255) NOT NULL,
		language VARCHAR(16) NOT NULL,
		phrase_value TEXT NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );


	// WIDGET
	// id
	// created
	// modified
	// name = widget name
	// configuration = default json configuration
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_WIDGET()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		name VARCHAR(32) NOT NULL,
		configuration TEXT NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// SECTION
	// id
	// created
	// modified
	// short_name = ?
	// title = display title
	// configuration = overriding json configuration
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_SECTION()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		short_name VARCHAR(16) NOT NULL,
		title VARCHAR(255) NOT NULL,
		widget VARCHAR(255) NOT NULL,
		configuration TEXT NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// PAGES
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// short_name
	// title
	// section_list = comma-separated list of configured section objects
	// 
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_PAGE()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		short_name VARCHAR(16) NOT NULL,
		title VARCHAR(255) NOT NULL,
		sectionList VARCHAR(255) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// CALENDAR
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// short_name = human readable id
	// title = 
	// description = 
	// start_date = millisecond time stamp
	// duration = milliseconds
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_CALENDAR()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		short_name VARCHAR(32) NOT NULL,
		title VARCHAR(255) NOT NULL,
		description VARCHAR(65535) NOT NULL,
		start_date VARCHAR(32) NOT NULL,
		duration VARCHAR(32) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// BIO
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// first_name = 
	// last_name = 
	// display_name = 
	// position = 
	// description = 
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_BIO()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		first_name VARCHAR(32) NOT NULL,
		last_name VARCHAR(32) NOT NULL,
		display_name VARCHAR(64) NOT NULL,
		position VARCHAR(255) NOT NULL,
		description VARCHAR(65535) NOT NULL,
		uri VARCHAR(256) NOT NULL,
		image_url VARCHAR(256) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

}


function giau_remove_database(){
	error_log("giau_remove_database");
	global $wpdb;

	// LANGUAGIZATION
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION()." ;";
	$wpdb->query($sql);

	// PAGE
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_PAGE()." ;";
	$wpdb->query($sql);

	// SECTION
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_SECTION()." ;";
	$wpdb->query($sql);

	// WIDGET
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_WIDGET()." ;";
	$wpdb->query($sql);

	// CALENDAR
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_CALENDAR()." ;";
	$wpdb->query($sql);

	// BIO
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_BIO()." ;";
	$wpdb->query($sql);
}






// plugin activation
register_activation_hook( __FILE__, 'giau_callback_activation' );
register_deactivation_hook( __FILE__, 'giau_callback_deactivation' );
// admin menu
add_action('admin_menu', 'giau_action_admin_menu');


function giau_calendar_events_all(){
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_CALENDAR();
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ORDER BY id DESC
	";
	error_log("QUERY: ".$querystr);
	$results = $wpdb->get_results($querystr, ARRAY_A);
	return $results;
	// foreach( $results as $row ) {
	// 	$row_id = $row["id"];
	// 	$row_created = $row["created"];
	// 	$row_modified = $row["modified"];
	// 	$row_short_name = $row["short_name"];
	// 	$row_title = $row["title"];
	// 	$row_description = $row["description"];
	// 	$row_start_date = $row["start_date"];
	// 	$row_duration = $row["duration"];
	// }
}


function giau_default_fill_database(){
	error_log("giau_default_fill_database");

	$timestampNow = stringFromDate( getDateNow() );

	global $wpdb;


	// LANGUAGIZATION
	$wpdb->insert(GIAU_FULL_TABLE_NAME_LANGUAGIZATION(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"hash_index" => "CALENDAR_TITLE_TEXT",
			"language" => "en-US",
			"phrase_value" => "Upcoming Events",
			)
		);

	// WIDGET
	insert_widget('featured','{}');
	insert_widget('navigation','{}');
	insert_widget('language_switch','{}');
	insert_widget('picture_list','{}');
	insert_widget('info_statement','{}');
	insert_widget('image_gallery','{}');
	insert_widget('biography','{}');
	insert_widget('google_map','{}');
	insert_widget('calendar','{}');
	insert_widget('footer','{}');
	insert_widget('contact_form','{}');

	// SECTION

	// PAGE

	// CALENDAR ITEMS
	$wpdb->insert(GIAU_FULL_TABLE_NAME_CALENDAR(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"short_name" => "childrens-day-2016",
			"title" => "Children's Day",
			"description" => "Joint Worship 11:00 AM",
			"start_date" =>  stringFromDate( dateFromString("2016-05-01 11:00:00.0000") ),
			"duration" => "0",
			)
		);
	// preset defined list of widgets

	// BIOs
	insert_bio('Joseph','Kim','Joseph Kim','Director of Christian Education, Interim Junior High Pastor',
			'Joseph is happily married to Joyce, the woman of his dreams. He has a bachelor’s degree in civil engineering and a Master of Divinity degree and was called into vocational ministry in 2004. He began serving at LACPC as a high school pastor in December 2006 and by God’s grace is currently serving as the director of Christian Education.',
			'','ce-joe.png');
	insert_bio('Tony','Park','Tony Park','Elder of Christian Education',
			'',
			'','');
	insert_bio('Kurt','Kim','Kurt Kim','Secretary',
			'',
			'','');
	insert_bio('Sebastian','Lee','Sebastian Lee','Finance Deacon',
			'',
			'','');
	insert_bio('Andrew','Lim','Andrew Lim','High School Pastor',
			'Andrew has been attending LACPC ever since he was a high school freshman. He got his bachelor’s degree from UC Irvine and a Masters in Pastoral Studies from Azusa Pacific University. He has been serving as the high school pastor since May of last year and also works full time as a high school English teacher.',
			'','ce-andy.png');
	insert_bio('Boram','Lee','Boram Lee','Elementary Pastor',
			'Born and raised in Los Angeles, Boram has a BA in cognitive psychology, a multiple subjects credential, and a master’s degree in teaching. She began seminary in January 2013 at Azusa Pacific University where she is studying to obtain an MA in pastoral studies with an emphasis is youth and family ministry. Her passion is to serve and train young children so that they can develop a solid relationship with God.',
			'','ce-boram.png');
	insert_bio('Sheen','Hong','Sheen Hong','Kindergarten Pastor',
			'Sheen Hong is a loving mother of two children, Karis and Jin-Sung, and happy wife of Joshua, husband and a Chaplain. She has a bachelor’s degree in Christian education and Master of Arts degree in Christian Education. She was called into Children’s ministry in 2009. She began serving at LACPC as a Kindergarten pastor in December 2015.',
			'','ce-hong.png');
	insert_bio('Jessica Won','Won','Jessica Won','Nursery Pastor',
			'Jessica Won is married to Peter Won and has twin boys and a girl. She has a degree of Child Development from Patten University and currently working on M.Div. from Azusa University. She loves to share gospel to children and now oversees the nursery department.',
			'','ce-jessica.png');
}

function insert_widget($widgetName,$widgetConfig){
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_WIDGET(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"name" => $widgetName,
			"configuration" => $widgetConfig,
			)
		);
}
function insert_bio($firstName,$lastName,$displayName,$position,$description,$uri,$imageURL){
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_BIO(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"first_name" => $firstName,
			"last_name" => $lastName,
			"position" => $position,
			"description" => $description,
			"uri" => $uri,
			"image_url" => $imageURL
			)
		);
}

function localizationUSEnglish(){
	return "en-US";
}

function localizationKoreaKorean(){
	return "ko-KP";
}

/*
https://codex.wordpress.org/Plugin_API/Action_Reference
https://codex.wordpress.org/Plugin_API/Filter_Reference


*/


	/*
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
	*/

?>
