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


	// ?
	add_action('admin_bar_menu', 'add_site_menu_to_top_bar' );
}

function add_site_menu_to_top_bar() {
	error_log("RICHIE add_site_menu_to_top_bar");
	global $wp_admin_bar;
	$menus = get_terms('nav_menu');
	error_log("$menus: ".print_r($menus));
}

function giau_action_admin_menu() {
	error_log("RICHIE Y");
	// OPTIONS > GIAU PLUGIN
	add_options_page('Giau Plugin Options', 'Giau Plugin', 'manage_options', GIAU_UNIQUE_IDENTIFIER(), 'giau_admin_plugin_options');
	// GIAU PLUGIN | MENU
	add_menu_page('Giau Plugin Page', 'Plugin Settings', 'manage_options', 'giau-plugin-main', 'giau_admin_menu_page_main');
		add_submenu_page('giau-plugin-main', 'Giau Sub Menu', 'Data Entry | Control', 'manage_options', 'giau-plugin-submenu', 'giau_admin_menu_page_submenu');
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


function sendEmail($toEmail, $fromEmail, $replyEmail, $subject, $body){
	// http://www.html-form-guide.com/email-form/php-script-not-sending-email.html
	// http://stackoverflow.com/questions/24644436/php-mail-form-doesnt-complete-sending-e-mail
	if( $toEmail==null || count($toEmail)<1 ){
		return 0;
	}
	$headers = "From: ".$fromEmail."\r\nReply-To: ".$replyEmail."";
	return mail($toEmail, $subject, $body, $headers);
	//error_log('MAIL: '.$toEmail.' | '.$subject.' | '.$body);
}

function giau_admin_menu_page_main(){
?>
	<h1>Giau Plugin Settings</h1>
<?php
}
function giau_admin_menu_page_submenu(){
	// print phpinfo();  
	// return;
	// $sendMail = sendEmail("zirbsster@gmail.com","zirbsster@gmail.com","zirbsster@gmail.com","subject","body");
	// error_log("sendMail --- ".$sendMail );

	// <form action=" echo $plugins_url " method="post" enctype="multipart/form-data">
	/*
	  onsubmit="return checkForm()"

	*/
	$form_name = "admin_tools_form";

error_log("RICHIE --- ".esc_url( $_SERVER['REQUEST_URI'] ) );
error_log("GOT --- ".$_POST["richie"] );
if( isset($_POST["richie"]) ) {
	error_log("DO" );
	giau_insert_bio('Richie','X','X','X', '', '','');
}
// /wp/wp-admin/admin.php?page=giau-plugin-submenu,
/*
<form id="<?php echo $form_name; ?>" name="<?php echo $form_name; ?>" action="../wp-content/plugins/giau/php/admin_input.php" method="post">
*/
?>

	<h1>Data Entry | Control</h1>
	<!-- <form action="/wp-content/plugins/listeningto/formhtml.php" method="post"> -->


<ul class="tab">
  <li><a href="#" class="tablinks active" onclick="openCity(event, 'General')"><?php _e( 'General', 'admin-tools' ) ?></a></li>
  <li><a href="#" class="tablinks" onclick="openCity(event, 'AdminMenu')"><?php _e( 'Admin Menu', 'admin-tools' ) ?></a></li>
  <li><a href="#" class="tablinks" onclick="openCity(event, 'Plugins')"><?php _e( 'Plugins', 'admin-tools' ) ?></a></li>
  <li><a href="#" class="tablinks" onclick="openCity(event, 'TopBar')"><?php _e( 'Top Bar', 'admin-tools' ) ?></a></li>
</ul>
<!-- http://www.w3schools.com/howto/howto_js_tabs.asp -->

<?php
// TEST SEARCHING DATABASE:
	$languagizationResults = giau_languagization_paginated(0,10,[ ["language",0], ["id",0], ["hash_index",1] ]);
	$index = 0;
	foreach( $languagizationResults as $row ) {
		$row_id = $row["id"];
		$row_created = $row["created"];
		$row_modified = $row["modified"];
		$row_language = $row["language"];
		$row_hash_index = $row["hash_index"];
		$row_phrase_value = $row["phrase_value"];
		error_log("GOT ITEM: (".$index.") = ".$row_hash_index);
		++$index;
	}

	$substitutePhrase = giau_languagization_substitution("JOSEPH_KIM_BIO_FIRST_NAME_TEXT","en-US");
	error_log("SUB 1: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("JOSEPH_KIM_BIO_FIRST_NAME_TEXT","ko-KP");
	error_log("SUB 2: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("JOSEPH_KIM_BIO_FIRST_NAME_TEXT","x");
	error_log("SUB 3: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("JOSEPH_KIM_BIO_FIRST_NAME_TEXT",null);
	error_log("SUB 4: ".$substitutePhrase);
?>


	<?php
	// LANGUAGIZATION
	$config = [
		"items" => [
			[
				"name" => "hash_index",
				"title" => "Identifier",
				"type" => "text",
				"hint" => "unique tag",
				"value" => ""
			],
			[
				"name" => "language",
				"title" => "Language Code",
				"type" => "option",
				"hint" => "",
				"options" => [
					[
						"display" => "EN",
						"value" => "en-US"
					],
					[
						"display" => "KO",
						"value" => "ko-KP"
					]
				],
				"value" => ""
			],
			[
				"name" => "phrase_value",
				"title" => "Phrase",
				"type" => "textarea",
				"hint" => "display text",
				"value" => ""
			]
		],
		"submit_text" => "Insert Language Phrase"
	];
	createForm("languagization", $_SERVER['REQUEST_URI'], $config);
	// BIO
	$config = [
		"items" => [
			[
				"name" => "first_name",
				"title" => "First Name",
				"type" => "text",
				"hint" => "first name",
				"value" => ""
			],
			[
				"name" => "last_name",
				"title" => "Last Name",
				"type" => "text",
				"hint" => "first name",
				"value" => ""
			],
			[
				"name" => "display_name",
				"title" => "Display Name",
				"type" => "text",
				"hint" => "display name",
				"value" => ""
			],
			[
				"name" => "position",
				"title" => "Position",
				"type" => "text",
				"hint" => "executive, artist, etc.",
				"value" => ""
			],
			[
				"name" => "email",
				"title" => "Email Address",
				"type" => "text",
				"hint" => "email",
				"value" => ""
			],
			[
				"name" => "phone",
				"title" => "Phone Number",
				"type" => "text",
				"hint" => "phone",
				"value" => ""
			],
			[
				"name" => "tags",
				"title" => "Tags",
				"type" => "text",
				"hint" => "bio, ",
				"value" => ""
			],
			[
				"name" => "uri",
				"title" => "URL",
				"type" => "text",
				"hint" => "http://www.google.com",
				"value" => ""
			],
			[
				"name" => "image_url",
				"title" => "Image",
				"type" => "text",
				"hint" => "todo: get from upload",
				"value" => ""
			],
			[
				"name" => "description",
				"title" => "Description",
				"type" => "textarea",
				"hint" => "description",
				"value" => ""
			]
		],
		"submit_text" => "Insert User Bio"
	];
	createForm("bio", $_SERVER['REQUEST_URI'], $config);
	
	// CALENDAR
	$config = [
		"items" => [
			[
				"name" => "first_name",
				"title" => "First Name",
				"type" => "text",
				"hint" => "first name",
				"value" => ""
			]
		],
		"submit_text" => "Insert User Bio"
	];
	createForm("calendar", $_SERVER['REQUEST_URI'], $config);


?>
	<ul>
		<li>languages / translations</li>
		<li>pages</li>
		<li>sections</li>
		<li>widgets</li>
		<li>calendars</li>
		<li>bios</li>
	</ul>
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


function createForm($formName, $uri, $config){
	?>
	<form id="<?php echo $formName; ?>" name="<?php echo $formName; ?>" action="<?php esc_url( $uri ); ?>" method="post">
		<?php
			$items = $config["items"];
			$submitText = $config["submit_text"];
			$i;
			for($i=0; $i<count($items); ++$i){
				$item = $items[$i];
				$title = $item["title"];
				$type = $item["type"];
				$name = $item["name"];
				$hint = $item["hint"];
				$value = $item["value"];
				?>
				<div><?php echo $title; ?>: </div>
				<?php
				if($type=="text"){
					?>
					<input type="text" name="<?php echo $name; ?>" value="<?php echo $value; ?>"  placeholder="<?php echo $hint; ?>" />
					<?php
				}else if($type=="textarea"){
					?>
					<textarea name="<?php echo $name; ?>" value="<?php echo $value; ?>"  placeholder="<?php echo $hint; ?>"></textarea>
					<?php
				}else if($type=="option"){
					$options = $item["options"];
					?>
					<select name="<?php echo $name; ?>">
					<?php
					for($j=0; $j<count($options); ++$j) {
						$option = $options[$j];
						$display = $option["display"];
						$value = $option["value"];
						?>
						<option value="<?php echo $value; ?>"><?php echo $display; ?></option>
						<?php
					}
					?>
					</select>
					<?php
				}else if($type=="radio"){
					//
				}else if($type=="hidden"){
					//
				}
				?>
				<br />
				<?php
			}
		?>
		<input type="hidden" name="richie" value="HIDDEN-RICHIE" />
		<input type="submit" value="<?php echo $submitText; ?>">
	</form>
	<?php
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
	// tags = comma-separated filtering
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_CALENDAR()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		short_name VARCHAR(32) NOT NULL,
		title VARCHAR(255) NOT NULL,
		description VARCHAR(65535) NOT NULL,
		start_date VARCHAR(32) NOT NULL,
		duration VARCHAR(32) NOT NULL,
		tags VARCHAR(255) NOT NULL,
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
	// email = 
	// phone = 
	// uri = 
	// image_url = 
	// tags =  ??? group =  ??? department? tags ? for filtering
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_BIO()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		first_name VARCHAR(32) NOT NULL,
		last_name VARCHAR(32) NOT NULL,
		display_name VARCHAR(64) NOT NULL,
		position VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		phone VARCHAR(255) NOT NULL,
		description VARCHAR(65535) NOT NULL,
		uri VARCHAR(256) NOT NULL,
		image_url VARCHAR(256) NOT NULL,
		tags VARCHAR(255) NOT NULL,
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
function sortingQueryParamFromLists($columns, $sortIndexDirection){
	// arrays must be non-null and non-zero lengths
	if( !$columns || count($columns) == 0 || !$sortIndexDirection || count($sortIndexDirection) == 0 ){
		return "";
	}
	$sortList = [];
	$i;
	$len = count($sortIndexDirection);
	for($i=0; $i<$len; ++$i){
		$method = $sortIndexDirection[$i];
		if($method){
			$column = $method[0];
			$direction = $method[1];
			if($column && $direction){
				if(in_array($column,$colmns)){
					$dir = "ASC";
					if($direction==0){
						$dir = "DESC";
					}
					sortList.push($column." ".$dir)
				}
			}
		}
	}
	if( count($sortList) > 0 ){
		$sortString = join(", ",$sortList);
		$sortString = "ORDER BY ".$sortString;
		return $sortString;
	}
	return "";
}
function giau_languagization_paginated($offset,$count,$sortIndexDirection){
	// offset must be positive
	if !$offset || $offset < 0 {
		$offset = 0;
	}
	// count must be positive
	if !$count || $count < 0 {
		$count = 0;
	}
	if $count == 0 { // no results
		return []
	}
	$limit = $offset + $count - 1;
	// ordering
	$indexes = ["id","created","modified","hash_index","language","phrase_value"];
	$sorting = sortingQueryParamFromLists($indexes,$sortIndexDirection);
	// QUERY
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_LANGUAGIZATION();
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$sorting."
	    LIMIT ".$offset",".$limit."
	";
	error_log("LANGUAGIZATION QUERY: ".$querystr);
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

function giau_languagization_substitution($hash_index, $language){
	$DEFAULT_LANGUAGE = "en-US";
	// hash_index must be non-null and non-zero length
	if(!$hash_index || strlen($hash_index)==0 ){
		return "";
	}
	// language must be non-null and non-zero length
	if(!$language || strlen($language)==0 ){
		$language = $DEFAULT_LANGUAGE; // default language lookup
	}
	global $wpdb;
	$hash_index = mysqli_real_escape_string($hash_index); // can limit based on allowed hash length
	$language = mysqli_real_escape_string($language);
	$table = GIAU_FULL_TABLE_NAME_LANGUAGIZATION();
	$querystr = "
	    SELECT language, phrase_value
	    FROM ".$table."
	    WHERE hash_index='".$hash_index."'
	    ORDER BY id DESC
	";
	error_log("LANGUAGIZATION QUERY: ".$querystr);
	// see if exact match exists, else default to 
	$didFindMatch = false;
	$matchFirst = null;
	$matchSecond = null;
	$matchThird = null;
	$results = $wpdb->get_results($querystr, ARRAY_A);

	foreach( $results as $row ) {
		$row_language = $row["language"];
		$row_phrase_value = $row["phrase_value"];
		if($row_language==$language){ // desired exact language match
			$matchFirst = $row_phrase_value;
			break; // found top-priority match == done
		}else if($row_language==$DEFAULT_LANGUAGE){ // desired language default
			$matchSecond = $row_phrase_value;
		}else if(!$matchThird){ // last-resort match anything
			$matchThird = $row_phrase_value;
		}
	}
	if($matchFirst){
		return $matchFirst;
	}else if($matchSecond){
		return $matchSecond;
	}else if($matchThird){
		return $matchThird;
	} // default return original phrase
	return $hash_index;
}

function giau_default_fill_database(){
	error_log("giau_default_fill_database");

	$timestampNow = stringFromDate( getDateNow() );

	global $wpdb;


	// LANGUAGIZATION
	$langEng = "en-US";
	$langKor = "ko-KP";
	giau_insert_languagization($langEng,"CALENDAR_TITLE_TEXT","Upcoming Events");
	giau_insert_languagization($langKor,"CALENDAR_TITLE_TEXT","다가오는 이벤트");

	// -> BIO
	function giau_insert_bio($firstName,$lastName,$displayName,$position,$email,$phone,$description,$uri,$imageURL,$tags){
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_FIRST_NAME_TEXT","Joseph");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_LAST_NAME_TEXT","Kim");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_DISPLAY_NAME_TEXT","Reverend Joseph Kim");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_POSITION_TEXT","Director of Christian Education, Interim Junior High Pastor");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_EMAIL_TEXT","jmkim75@gmail.com");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_PHONE_TEXT","2132006092");
	giau_insert_languagization($langEng,"JOSEPH_KIM_BIO_DESCRIPTION_TEXT","Joseph is happily married to Joyce, the woman of his dreams. He has a bachelor’s degree in civil engineering and a Master of Divinity degree and was called into vocational ministry in 2004. He began serving at LACPC as a high school pastor in December 2006 and by God’s grace is currently serving as the director of Christian Education.");
	
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");


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
	insert_bio(
			'JOSEPH_KIM_BIO_FIRST_NAME_TEXT',
			'JOSEPH_KIM_BIO_LAST_NAME_TEXT',
			'JOSEPH_KIM_BIO_DISPLAY_NAME_TEXT',
			'JOSEPH_KIM_BIO_POSITION_TEXT',
			'JOSEPH_KIM_BIO_EMAIL_TEXT',
			'JOSEPH_KIM_BIO_PHONE_TEXT',
			'JOSEPH_KIM_BIO_DESCRIPTION_TEXT',
			'JOSEPH_KIM_BIO_URI_TEXT',
			'ce-joe.png',
			'ce,bio,contact'
			);
	insert_bio(
			'Tony',
			'Park',
			'Tony Park',
			'Elder of Christian Education',
			'',
			'',
			'',
			'',
			'',
			'bio'
			);
	insert_bio( // kurt == jangyeon
			'Kurt',
			'Kim',
			'Jangyeon Kim',
			'Secretary',
			'jangyeaonkim@gmail.com',
			'5268571224',
			'',
			'',
			'',
			'bio,contact'
			);
	insert_bio(
			'Sebastian',
			'Lee',
			'Sebastian Lee',
			'Finance Deacon',
			'',
			'',
			'',
			'',
			'',
			'bio'
			);
	insert_bio(
			'Andrew',
			'Lim',
			'Andrew Lim',
			'High School Pastor',
			'mrlimshhs@gmail.com',
			'6265366126',
			'Andrew has been attending LACPC ever since he was a high school freshman. He got his bachelor’s degree from UC Irvine and a Masters in Pastoral Studies from Azusa Pacific University. He has been serving as the high school pastor since May of last year and also works full time as a high school English teacher.',
			'',
			'ce-andy.png',
			'highschool,bio,contact'
			);
	insert_bio(
			'Boram',
			'Lee',
			'Boram Lee',
			'Elementary Pastor',
			'boramjdsn@gmail.com',
			'9098688457',
			'Born and raised in Los Angeles, Boram has a BA in cognitive psychology, a multiple subjects credential, and a master’s degree in teaching. She began seminary in January 2013 at Azusa Pacific University where she is studying to obtain an MA in pastoral studies with an emphasis is youth and family ministry. Her passion is to serve and train young children so that they can develop a solid relationship with God.',
			'',
			'ce-boram.png',
			'elementary,bio,contact'
			);
	insert_bio(
			'Sheen',
			'Hong',
			'Sheen Hong',
			'Kindergarten Pastor',
			'pastorhong71@gmail.com',
			'2133695590',
			'Sheen Hong is a loving mother of two children, Karis and Jin-Sung, and happy wife of Joshua, husband and a Chaplain. She has a bachelor’s degree in Christian education and Master of Arts degree in Christian Education. She was called into Children’s ministry in 2009. She began serving at LACPC as a Kindergarten pastor in December 2015.',
			'',
			'ce-hong.png',
			'kindergarten,bio,contact'
			);
	insert_bio(
			'Jessica Won',
			'Won',
			'Jessica Won',
			'Nursery Pastor',
			'jcb4jessica@gmail.com',
			'3232034004',
			'Jessica Won is married to Peter Won and has twin boys and a girl. She has a degree of Child Development from Patten University and currently working on M.Div. from Azusa University. She loves to share gospel to children and now oversees the nursery department.',
			'',
			'ce-jessica.png',
			'bio,contact'
			);
}

function giau_insert_languagization($language,$hash,$phrase){
	// hash must be non-empty
	if !$hash || strlen($hash) == 0 {
		return
	}
	// language must be non-empty
	if !$language || strlen($language) == 0 {
		return
	}
	// phrase must be non-null
	if !$phrase {
		return
	}
	//
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_LANGUAGIZATION(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"hash_index" => $hash,
			"language" => $language,
			"phrase_value" => $position,
		)
	);
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
function giau_insert_bio($firstName,$lastName,$displayName,$position,$email,$phone,$description,$uri,$imageURL,$tags){
	// phone: limit to only numbers
	// tags: limit to comma-separated-length 255
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_BIO(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"first_name" => $firstName,
			"last_name" => $lastName,
			"position" => $position,
			"email" => $email,
			"phone" = $phone,
			"description" => $description,
			"uri" => $uri,
			"image_url" => $imageURL,
			"tags" = $tags
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
