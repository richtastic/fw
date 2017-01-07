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



define( 'GIAU_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GIAU_PLUGIN_URL', plugin_basename(__FILE__) );


$GIAU_ROOT_PATH = dirname(__FILE__);
//error_log("GIAU_ROOT_PATH: ".$GIAU_ROOT_PATH);
require_once($GIAU_ROOT_PATH.'/php/widgets.php');
require_once($GIAU_ROOT_PATH.'/php/functions.php');
require_once($GIAU_ROOT_PATH.'/php/async.php');
require_once($GIAU_ROOT_PATH.'/php/tables.php');
require_once($GIAU_ROOT_PATH.'/php/data.php');
require_once($GIAU_ROOT_PATH.'/php/files.php');
require_once($GIAU_ROOT_PATH.'/php/service.php');
require_once($GIAU_ROOT_PATH.'/php/admin.php');

function giau_plugin_directory_root(){
	return GIAU_PLUGIN_DIR;
}
function giau_plugin_upload_root_dir(){
	return giau_plugin_directory_root()."uploads";
}
function giau_plugin_temp_dir(){ // sudo chown www-data ../repo/fw/plugins/giau/tmp
	return giau_plugin_directory_root()."tmp";
}
function giau_plugin_url(){
	return plugins_url()."/giau";
}
function giau_plugin_temp_url(){
	return giau_plugin_url()."/tmp";
}
function giau_plugin_images_url(){
	return giau_plugin_url()."/images";
}
// function giau_plugin_temp_url(){
// 	return giau_plugin_url()."/temp";
// }
function giau_plugin_upload_root_url(){
	return giau_plugin_url()."/uploads";
}
function giau_plugin_url_from_any_url($image){
	if(!$image){
		return "";
	}
	$beginsWithSlash = preg_match('/^\//',$image);
	// assume upload directory
	if( $beginsWithSlash && count($beginsWithSlash)>0 ){
		$image = giau_plugin_upload_root_url()."".$image;
	}
	return $image;
}


function giau_is_current_user_admin(){
	return is_admin();
}

class YC_AdminTools {

function __construct() {

	// add_action( 'admin_menu', array($this, 'ycat_admin_menu') );
	// add_action( 'admin_init', array($this, 'ycat_register_setting') );
	// add_action( 'admin_enqueue_scripts', array($this, 'add_scripts_and_styles') );
	// add_action( 'plugins_loaded', array($this, 'ycat_load_textdomain') ); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// add_action( 'pre_user_query', array($this, 'admin_user_hidden_query') );
	// add_action( 'pre_current_active_plugins', array($this, 'hide_admin_tools_plugin') );
	// add_action( 'admin_menu', array($this, 'remove_admin_menus'), 999 );
	// add_action( 'pre_current_active_plugins', array($this, 'hide_plugins') );
	// add_action( 'login_enqueue_scripts', array($this, 'my_login_logo') );
	// add_action( 'init', array($this, 'hide_top_bar') ); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	//add_action( 'admin_enqueue_scripts', array($this, 'my_small_logo') );
	// add_action( 'wp_enqueue_scripts', array( $this, 'my_small_logo' ) );

	// filter	
}

}



/*
function wp_ajax_create_new_post_handler(){
	error_log("A");
	if( isset($_POST) && isset($_POST['operation']) ){
		error_log("OOOOOOOOOOOOOOOOOOOOOOOOOOO");
		$response = '{ "result": "success" }';
		wp_send_json( $response );
	}
}
// function wp_ajax_create_new_post_handler(){
// 	error_log("B");
// }
// Triggered for users that are logged in.
add_action( 'wp_ajax_create_new_post', 'wp_ajax_create_new_post_handler' );
// Triggered for users that are not logged in.
add_action( 'wp_ajax_nopriv_create_new_post', 'wp_ajax_create_new_post_handler' );
*/

function admin_test(){
	error_log("richie - admin test");
	//wordpress_data_service();
}
//add_action('admin_init','admin_test');

function regular_test(){
	//error_log("richie - regular test");
	giau_wordpress_data_service();
}
add_action('init','regular_test');

function another_test(){
	//error_log("richie - another_test test");
	error_log("         ".($_POST) );
	printArray($_POST);
	error_log("         ".($_GET) );
	printArray($_GET);
	//wordpress_data_service();
}
//add_action('wp_headers','another_test'); // WORKS ON MAIN PAGE ...

//add_action('admin_head','admin_test');
//add_action('get_header','another_test');
//add_action('wp_head','another_test');


function printArray($array, $pad=''){
     foreach ($array as $key => $value){
        //echo $pad . "$key => $value";
        error_log( $pad . "$key => $value");
        if(is_array($value)){
            printArray($value, $pad.' ');
        }  
    } 
}

function LANGUAGE_EN_US(){
	return "en-US";
}
function LANGUAGE_KO_KP(){
	return "ko-KP";
}

function CALENDAR_MONTHS_LONG_EN(){
	return ["January","February","March","April","May","June","July","August","September","October","November","December"];
}
function CALENDAR_MONTHS_LONG_KO(){
	return ["일월","이월","행진","사월","오월","유월","칠월","팔월","구월","시월","십일월","십이월"];
}
function CALENDAR_MONTHS_SHORT_EN(){
	return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
}
function CALENDAR_MONTHS_SHORT_KO(){
	return CALENDAR_MONTHS_LONG_KO();
}
function CALENDAR_DAYS_LONG_EN(){
	return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
}
function CALENDAR_DAYS_LONG_KO(){
	return ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
}
function CALENDAR_DAYS_SHORT_EN(){
	return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}
function CALENDAR_DAYS_SHORT_KO(){
	return CALENDAR_DAYS_LONG_KO();
}


function languageSpecificFromLanguage($lang){
	$map = [
		"en" => LANGUAGE_EN_US(),
		"ko" => LANGUAGE_KO_KP()
	];
	$sub = $map[$lang];
	if($sub){
		return $sub;
	}
	return $lang;
}

function getCookieLanguage(){
	$cookie = $_COOKIE[KEY_COOKIE_PARAM_LANGUAGE()];
	if(isset($cookie)){
		return languageSpecificFromLanguage($cookie);
	}
	return null;
}
function getValueFromMapCookieLanguage($map,$default){
	$language = getCookieLanguage();
	if($language!==null){
		$value = $map[$language];
		if($value!==null){
			return $value;
		}
	}
	return $default;
}
function getCookieMonthsOfYearLong(){
	$map = [];
	$map[LANGUAGE_EN_US()] = CALENDAR_MONTHS_LONG_EN();
	$map[LANGUAGE_KO_KP()] = CALENDAR_MONTHS_LONG_KO();
	return getValueFromMapCookieLanguage($map, CALENDAR_MONTHS_LONG_EN());
}
function getCookieMonthsOfYearShort(){
	$map = [];
	$map[LANGUAGE_EN_US()] = CALENDAR_MONTHS_SHORT_EN();
	$map[LANGUAGE_KO_KP()] = CALENDAR_MONTHS_SHORT_KO();
	return getValueFromMapCookieLanguage($map, CALENDAR_MONTHS_LONG_EN());
}
function getCookieDaysOfWeekLong(){
	$map = [];
	$map[LANGUAGE_EN_US()] = CALENDAR_DAYS_LONG_EN();
	$map[LANGUAGE_KO_KP()] = CALENDAR_DAYS_LONG_KO();
	return getValueFromMapCookieLanguage($map, CALENDAR_MONTHS_LONG_EN());
}
function getCookieDaysOfWeekShort(){
	$map = [];
	$map[LANGUAGE_EN_US()] = CALENDAR_DAYS_SHORT_EN();
	$map[LANGUAGE_KO_KP()] = CALENDAR_DAYS_SHORT_KO();
	return getValueFromMapCookieLanguage($map, CALENDAR_MONTHS_LONG_EN());
}

function getParameterOrDefault($param, $def){
	$value = $_GET[$param];
	if($value){
		return $value;
	}
	if($def){
		return $def;
	}
	return "";
}


function getPageRequestParameterPage(){
	return "page";
}
function getPageRequestTypeDefault(){
	return "__live";
}
function getPageRequestTypeError(){
	return "__error";
}
function getPageRequest(){
	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), getPageRequestTypeDefault() );
	return $pageRequest;
}

function getRelativeURLFromAbsoluteURL($url){
	$rootURL = get_site_url();
	$pattern = "#^".preg_quote($rootURL)."?#";
	$urlRelative = preg_replace($pattern, ".", $url);
	return $urlRelative;
}
function operateOnFileListingEntry(&$entry){
	// $entry["url"] = site_url($entry["path"]); // trash
	$rootURL = get_site_url();
	$dirPluginUpload = giau_plugin_upload_root_dir();
	$urlPluginUpload = giau_plugin_upload_root_url();
	error_log($rootURL." | ".$dirPluginUpload." | ".$urlPluginUpload);
	$path = $entry["path"];
		$pattern = "#^".preg_quote($dirPluginUpload)."?#";
	$url = preg_replace($pattern, $urlPluginUpload, $path);
	$urlRelative = getRelativeURLFromAbsoluteURL($url);
	$entry["url_relative"] = $urlRelative;
	$entry["url"] = $url;
	unset($entry);
}

// INSERT VALUES
function GIAU_DATA_QUERY_FORM_INDEX(){
	return "form_id";
}
function GIAU_DATA_QUERY_TYPE_LANGUAGIZATION(){
	return "languagization";
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

// add_action( 'send_headers', 'add_header_xua' );
// function add_header_xua() {
// 	header( 'X-UA-Compatible: IE=edge,chrome=1' );
// }



//	add_action('wp_head', 'giau_action_page_head');
	add_action('admin_head', 'giau_action_page_head');
//add_action( 'get_header', 'giau_action_page_head' );

// function wpb_adding_scripts() {
// 	error_log("RICHIE - wpb_adding_scripts");
// 	// wp_register_script('my_amazing_script', plugins_url('amazing_script.js', __FILE__), array('jquery'),'1.1', true);
// 	// wp_enqueue_script('my_amazing_script');
// }
// add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' ); 


// function themeslug_enqueue_style() {
// 	wp_enqueue_style( 'core', 'style.css', false ); 
// }
// function themeslug_enqueue_script() {
// 	wp_enqueue_script( 'my-js', 'filename.js', false );
// }
// add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_style' );
// add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_script' );


// function my_small_logo() {
// 	error_log("my_small_logo - my_small_logo - my_small_logo - my_small_logo- my_small_logo");
// 	wp_enqueue_script( 'my-js', 'filename.js', false );
// }
add_action( 'admin_enqueue_scripts', 'giau_admin_add_scripts' );


function giau_init_fxn() {
	error_log("giau_init_fxn");
	include_all_files();

	$WP_ACTION_PLUGINS_LOADED = "plugins_loaded";
	$WP_ACTION_INIT = "init";

	$WP_ACTION_ADMIN_MENU_BAR = "admin_bar_menu";

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
	add_action($WP_ACTION_PLUGINS_LOADED, "giau_action_plugins_loaded_callback");
	//
	add_action($WP_ACTION_INIT, "giau_action_init_callback");

	//add_action('wp_head', 'giau_action_page_head');

	// ?
	add_action($WP_ACTION_ADMIN_MENU_BAR, 'add_site_menu_to_top_bar' );
}

function getPluginURIPath(){
	//return wp_make_link_relative( get_template_directory_uri()."/" );
	//return wp_make_link_relative( get_template_directory_uri()."/" );
	return plugins_url( "", GIAU_PLUGIN_URL );
}

function giau_action_page_head(){ // inject as desired

	$fileJavaScriptFF = getPluginURIPath()."/js/code/FF.js";
	$fileJavaScriptCode = getPluginURIPath()."/js/code/Code.js";
	$relativePathJSFF = getPluginURIPath()."/js/code/";
	$relativePathJSPluginJS = getPluginURIPath()."/js/";
	//$fileJavaScriptGiau = getPluginURIPath()."/js/theme.js";
	error_log("js path: ".$fileJavaScriptFF);
	?>
	<script rel="text/javascript" src="<?php echo $fileJavaScriptCode; ?>"></script>
	<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
	
	<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
	<script type="text/javascript">
		$(document).ready( function(){
			var classesLoadedFxn = function(){
				var g = new giau();
			}
			var ff = new FF("<?php echo $relativePathJSFF; ?>/",function(){
				var scriptLoader = new ScriptLoader("<?php echo $relativePathJSPluginJS; ?>",["theme.js"],null,classesLoadedFxn,null);
				scriptLoader.load();
				//var g = new giau();
			});
		});
	</script>
	<?php
}



function giau_admin_add_scripts(){ // enqueue as expected
	//wp_enqueue_script( "giau.js", plugins_url( "/js/giau.js", GIAU_PLUGIN_URL ) );
	//wp_enqueue_script( "theme.js", plugins_url( "/js/theme.js", GIAU_PLUGIN_URL ) );
}



function add_site_menu_to_top_bar() {
	error_log("RICHIE add_site_menu_to_top_bar");
	global $wp_admin_bar;
	$menus = get_terms('nav_menu');
	error_log("$menus: ".print_r($menus));
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
	error_log("sendEmail: ".$toEmail." - ".$fromEmail." - ".$replyEmail." - ".$subject." - ".$body);
	return mail("zirbsster@gmail.com", "test postfix", "test mail");
	// https://easyengine.io/tutorials/php/test-email-sending/
	// 
	// http://www.html-form-guide.com/email-form/php-script-not-sending-email.html
	// http://stackoverflow.com/questions/24644436/php-mail-form-doesnt-complete-sending-e-mail
	if( $toEmail==null || count($toEmail)<1 ){
		return 0;
	}
	$headers = "From: ".$fromEmail."\r\nReply-To: ".$replyEmail."";
	//return mail($toEmail, $subject, $body, $headers);
	//error_log('MAIL: '.$toEmail.' | '.$subject.' | '.$body);
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
				if($type!="hidden"){
					?>
					<div><?php echo $title; ?>: </div>
					<?php
				}
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
					?>
					<input type="hidden" name="<?php echo $name; ?>" value="<?php echo $value; ?>" />
					<?php
				}
				?>
				<br />
				<?php
			}
		?>
		<input type="submit" value="<?php echo $submitText; ?>">
	</form>
	<?php
}








// plugin activation
register_activation_hook( __FILE__, 'giau_callback_activation' );
register_deactivation_hook( __FILE__, 'giau_callback_deactivation' );
// admin menu
add_action('admin_menu', 'giau_action_admin_menu');

/*
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
*/
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
		if($method!==null){
			$column = $method[0];
			$direction = $method[1];
			if($column!==null && $direction!==null){
				if(in_array($column,$columns)){
					$dir = "ASC";
					if($direction==0){
						$dir = "DESC";
					}
					array_push($sortList, $column." ".$dir);
				}
			}
		}
	}
	if(count($sortList) > 0){
		$sortString = join(", ",$sortList);
		$sortString = "ORDER BY ".$sortString;
		return $sortString;
	}
	return "";
}

// select * from wp_giau_languagization where hash_index ilike '%joe%';
function giau_languagization_autocomplete($searchValue, $count){ // search input / value / term
	// value must be 2+characters
	if($searchValue===null || strlen($searchValue)<=1){
		return [];
	}
	$searchValue = esc_sql($searchValue);
	// count must be positive
	if(!$count || $count < 0){
		$count = 0;
	}
	if($count == 0){ // no results
		return [];
	}
	$criteria = "WHERE hash_index like '%".$searchValue."%' OR phrase_value like '%".$searchValue."%' ";
	// QUERY
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_LANGUAGIZATION();
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$criteria." 
	    LIMIT ".$count."
	";
	$results = $wpdb->get_results($querystr, ARRAY_A);
	return $results;
}

function giau_languagization_paginated($offset,$count,$sortIndexDirection){
	// offset must be positive
	if(!$offset || $offset < 0){
		$offset = 0;
	}
	// count must be positive
	if(!$count || $count < 0){
		$count = 0;
	}
	if($count == 0){ // no results
		return [];
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
	    LIMIT ".$offset.",".$limit."
	";
	error_log("LANGUAGIZATION QUERY B: ".$querystr);
	$results = $wpdb->get_results($querystr, ARRAY_A);
	return $results;
}

function giau_calendar_paginated($offset,$count,$sortIndexDirection, $startDate,$endDate, $tags){
	// offset must be positive
	if(!$offset || $offset < 0){
		$offset = 0;
	}
	// count must be positive
	if(!$count || $count < 0){
		$count = 0;
	}
	if($count == 0){ // no results
		return [];
	}

	$limit = $offset + $count - 1;
	// ordering
	$indexes = ["id","created","modified","short_name","title","description","start_date","duration","tags"];
	$sorting = sortingQueryParamFromLists($indexes,$sortIndexDirection);
	// QUERY
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_CALENDAR();
	$criteria = "";
	
	$criteria = [];
	if($startDate && $endDate){
		// double-check date values if not null
		$startDate = esc_sql($startDate);
		$endDate = esc_sql($endDate);
		$dateFormat = "%Y-%m-%d %k:%i:%s.%f";
		array_push($criteria, "STR_TO_DATE(start_date,\"".$dateFormat."\") BETWEEN STR_TO_DATE(\"".$startDate."\",\"".$dateFormat."\") AND STR_TO_DATE(\"".$endDate."\",\"".$dateFormat."\") ");
	}
	$tags = tagsCriteriaFromTagList($tags);
	if($tags){
		foreach($tags as $tagCriteria){
			$criteria[] = $tagCriteria;
		}
	}
	if(count($criteria)>0){
		$criteria = "WHERE ".(implode(" AND ", $criteria));
	}

	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$criteria."
	    ".$sorting."
	    LIMIT ".$offset.",".$limit."
	";
	$results = $wpdb->get_results($querystr, ARRAY_A);
	$results = filterRowsLanguagization($results,["title","description"]);
	return $results;
}

function tagsCriteriaFromTagList($tags,$index="tags") {
	$criteria = null;
	if($tags!=null && count($tags)>0 ){
		$criteria = [];
		foreach($tags as $tag){
			$tag = esc_sql($tag);
			array_push($criteria, " ".$index." REGEXP \"(^|,)".$tag."(,|$)\" "); 
		}
	}
	return $criteria;
}

function giau_get_page_tag($tag){
	$tags = [$tag];
	$tags = tagsCriteriaFromTagList($tags);
	//
	$criteria = "";
	if($tags){
		$criteria = "WHERE ".(implode(" AND ", $tags));
	}
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_PAGE();
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$criteria."
	    LIMIT 1
	";
	error_log($querystr);
	$results = $wpdb->get_results($querystr, ARRAY_A);
	error_log( count($results) );
	if(count($results) == 1){
		$pageID = $results[0]["id"];
		error_log( $pageID );
		return giau_get_page_id($pageID);
	}
	return null;

}
function giau_get_page_id($pageID){
	return giau_get_table_row_from_col(GIAU_FULL_TABLE_NAME_PAGE(), "id", $pageID);
}

function giau_get_section_id($sectionID){
	return giau_get_table_row_from_col(GIAU_FULL_TABLE_NAME_SECTION(), "id", $sectionID);
}

function giau_get_widget_id($widgetID){
	return giau_get_table_row_from_col(GIAU_FULL_TABLE_NAME_WIDGET(), "id", $widgetID);
}

function giau_get_table_row_from_col($table,$column,$value){
	if(!$table || !$column || !$value){
		return null;
	}
	$sectionID = esc_sql($sectionID);
	global $wpdb;
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    WHERE ".$column."=".$value."
	    LIMIT 1
	";
	$results = $wpdb->get_results($querystr, ARRAY_A);
	if(count($results)>0){
		$row = $results[0];
		return $row;
	}
	return null;
}

function giau_bio_paginated($offset,$count,$sortIndexDirection, $tags=null){
	$DEFAULT_PAGE = 100;
	// offset must be positive
	if(!$offset || $offset < 0){
		$offset = 0;
	}
	// count must be positive
	if(!$count){
		$count = $DEFAULT_PAGE; // default count
	}
	if($count <= 0){ // no results
		return [];
	}
	$count = min($count,$DEFAULT_PAGE);

	$limit = $offset + $count - 1;
	// ordering
	$indexes = ["id","created","modified","first_name","last_name","position","email","phone","description","uri","image_url","tags"];
	$sorting = sortingQueryParamFromLists($indexes,$sortIndexDirection);
	// QUERY
	global $wpdb;
	$table = GIAU_FULL_TABLE_NAME_BIO();
	$criteria = "";
	$tags = tagsCriteriaFromTagList($tags);
	if($tags){
		$criteria = "WHERE ".(implode(" AND ", $tags));
	}
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$criteria."
	    ".$sorting."
	    LIMIT ".$offset.",".$limit."
	";
	$results = $wpdb->get_results($querystr, ARRAY_A);
	$results = filterRowsLanguagization($results,["first_name","last_name","display_name","phone","email","position","title","description"]);
	return $results;
}

function filterRowsLanguagization($rows,$fields){
	$desiredLanguage = getCookieLanguage();
	$i;
	$len = count($rows);
	for($i=0; $i<$len; ++$i){
		$row = $rows[$i];
		foreach($fields as $field){
			$original = $row[$field];
			if($original!==null){
				$substitution = giau_languagization_substitution($original,$desiredLanguage);
				$row[$field] = $substitution;
			}
		}
		$rows[$i] = $row;
	}
	return $rows;
}

function giau_languagization_substitution_and_html($hash_index, $language=null){
	$result = giau_languagization_substitution($hash_index, $language);
	$result = substituteLiteralNewlinesToHTMLBreaks($result);
	return $result;
}

function giau_languagization_substitution($hash_index, $language=null){
	$DEFAULT_LANGUAGE = LANGUAGE_EN_US();
	// hash_index must be non-null and non-zero length
	if(!$hash_index || strlen($hash_index)==0 ){
		return "";
	}
	// language must be non-null and non-zero length
	if(!$language || strlen($language)==0 ){
		$language = getCookieLanguage(); // default language lookup
		if(!$language){
			$language = $DEFAULT_LANGUAGE;
		}
	}
	global $wpdb;
	//  wpdb::_real_escape
	// mysqli_real_escape_string
	$hash_index = esc_sql($hash_index); // can limit based on allowed hash length
	$language = esc_sql($language);
	$table = GIAU_FULL_TABLE_NAME_LANGUAGIZATION();
	$querystr = "
	    SELECT language, phrase_value
	    FROM ".$table."
	    WHERE hash_index='".$hash_index."'
	    ORDER BY id DESC
	";
	// see if exact match exists, else default to 
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
	if($matchFirst!==null){
		return $matchFirst;
	}else if($matchSecond!==null){
		return $matchSecond;
	}else if($matchThird!==null){
		return $matchThird;
	} // default return original phrase
	return $hash_index;
}

function giau_default_fill_database(){
	error_log("giau_default_fill_database");
	giau_data_default_insert_into_database();
}

function getOnlyNumbersFromString($original){
	return preg_replace('/[^0-9]/s', '', $original);
}

function getOnlyAsNumbers($phone){
	$i; $ch; $re; $result = ""; $len = strlen($phone);
	for($i=0;$i<$len;++$i){
		$ch = substr($phone,$i,1);
		$re = preg_replace('/[0-9]/',"",$ch);
		if($re==""){
			$result = $result."".$ch;
		}
	}
	return $result;
}
function getHumanReadablePhone($phone){
	if(!$phone){
		return "";
	}
	$phone = getOnlyAsNumbers($phone);
	$phoneLength = strlen($phone);
	if($phoneLength==7){ // XXX-XXXX
		return substr($phone, 0,3)."-".substr($phone, 3,4);
	}
	if($phoneLength==10){ // (XXX) XXX-XXXX
		return "(".substr($phone, 0,3).")"." ".substr($phone, 3,3)."-".substr($phone, 6,4);
	}
	if($phoneLength==11){ // X-XXX-XXX-XXXX
		return substr($phone, 0,1)."(".substr($phone, 1,3).")"." ".substr($phone, 4,3)."-".substr($phone, 7,4);
	}
	return $phone;
}

function arrayFromCommaSeparatedString($input){
	if(!$input){
		return [];
	}
	$array = explode(",", $input);
	return $array;
}
function commaSeparatedStringFromString($input, $limitCount = null){
	if(!$input){
		return "";
	}
	if(is_array($input)){
		$input = implode(",", $input);
	}
	$split = explode(",", $input);
	$i;
	$len = count($split);
	$cleaned = [];
	for($i=0; $i<$len; ++$i){ // remove whitespace from ends
		$value = trim($split[$i]);
		error_log("VALUE: ".$value);
		if(strlen($value)>0){
			array_push($cleaned, $value);
		}

	}
	// no limit
	if($limitCount===null){
		return implode(",",$cleaned);
	}
	// specified limit
	$output = "";
	$len = count($cleaned);
	$stringLength = 0;
	$addedCount = 0;
	for($i=0; $i<$len; ++$i){
		$tag = $cleaned[$i];
		$l = strlen($len);
		if($stringLength+$l <= ($limitCount+1)){
			if($addedCount==0){
				$output = $output."".$tag;
			}else{
				$output = $output.",".$tag;
			}
			$stringLength += $l;
			$addedCount += 1;
		}else{
			break;
		}
	}
	return $output;
}
function divWithDatasValuesLabelsExtras($object, $included, $labels, $extra){
	if($extra==null){
		$extra = "";
	}
	if($included==null){
		$included = [];
	}
	if($labels==null){
		$labels = $included;
	}
	$div = '<div';
	$i;
	$len =  min(count($included), count($labels));
	for($i=0; $i<$len; ++$i){
		$lookup = $included[$i];
		$value = $object[$lookup];
		$key = $labels[$i];
		if($value!==null && $key!==null){
			$key = esc_html($key);
			$value = esc_html($value);
			$div = $div.' '.$key.'="'.$value.'" ';
		}
	}
	$div = $div.' '.$extra.'></div>';
	return $div;
}

function executeCommand($command){
	//$command = " ".$command."  > /dev/null 2>&1 ";
	$result = shell_exec("$command");
	return $result;
}


function zipDirectory($source, $destination){
	if(!$source || !$destination){
		return;
	}
	error_log("zipDirectory");
	error_log("location: ".$source);
	error_log("destination: ".$destination);
	$command = " cd ".$source."  &&  zip -r ".$destination." ./* ";
	error_log("command: ".$command);
	executeCommand($command);
}

function unzipDirectory($source, $destination){
	if(!$source || !$destination){
		return;
	}
	error_log("unzipDirectory");
	error_log("location: ".$source);
	error_log("destination: ".$destination);
	$command = " unzip ".$source."  -d ".$destination." ";
	error_log("command: '".$command."'");
	$result = executeCommand($command);
	error_log("result: '".$result."'");
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

//include_all_files(); // NOT WORK?

?>
