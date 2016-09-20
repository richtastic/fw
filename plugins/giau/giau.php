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
error_log("GIAU_ROOT_PATH: ".$GIAU_ROOT_PATH);
require_once($GIAU_ROOT_PATH.'/php/functions.php');




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
	error_log("richie - regular test");
	wordpress_data_service();
}
add_action('init','regular_test');

function another_test(){
	error_log("richie - another_test test");
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

function wordpress_data_service(){
	error_log("         wordpress_data_service -- ".$_POST['operation']);
	if( isset($_POST) && isset($_POST['operation']) ){
	//if( isset($_GET) && isset($_GET['operation']) ){
		$operationType = $_POST['operation'];
		$operationTable = $_POST['table'];
		$operationOffset = $_POST['offset'];
		$operationCount = $_POST['count'];
		$operationOrder = $_POST['order'];
		$operationSearch = $_POST['search'];
		$response = [];
		$response["result"] = "failure";
		//wp_send_json( $response );
		if($operationType=="get_table_page"){
			$operationOffset = max(intval($operationOffset),0);
			$operationCount = min(intval($operationCount),1000); // max 1000 results
			$operationOrder = $operationOrder!==null ? $operationOrder : [];
			$results = null;
			$rowColumns = null;
			if($operationTable=="localization"){
				//$operationOrder = [ ["language",1], ["id",0], ["hash_index",1] ];
				$operationOrder = [ ["hash_index",1], ["language",1], ["id",0] ];
				$results = giau_languagization_paginated($operationOffset,$operationCount,$operationOrder);
				$rowColumns = ["id","created","modified","language","hash_index","phrase_value"];
			}else{
				$operationOrder = [ ["start_date",1], ["duration",1], ["id",0] ];
				$results = giau_calendar_paginated($operationOffset,$operationCount,$operationOrder);
				$rowColumns = ["id","created","modified","short_name","title","description","start_date","duration","tags"];
			}
		}else if($operationType=="get_autocomplete"){
			$operationOffset = 0;
			if(!$operationCount){
				$operationCount = 5;
			}
			// ignore spaces
			$operationSearch = str_replace(" ", "%", $operationSearch);
			$operationCount = min(intval($operationCount),10); // max 10 results
			if($operationTable=="localization"){
				$results = giau_languagization_autocomplete($operationSearch, $operationCount);
				$rowColumns = ["hash_index","phrase_value"];
			}else{
				//
			}
		}
		// afterwards
		if($results!==null){
			$index = 0;
			$tableData = [];
			foreach( $results as $row ) {
				$tableRow = [];
				foreach($rowColumns as $column){
					$rowValue;
					if($column=="\$index"){
						$rowValue = $index;
					}else{
						$rowValue = $row[$column];
					}
					$tableRow[$column] = $rowValue;
				}
				++$index;
				array_push($tableData, $tableRow);
			}
			$response["data"] = [
				"offset" => $operationOffset,
				"count" => $index,
				"rows" => $tableData
			];
			$response["result"] = "success";
		}
		$response = json_encode($response);
		wp_send_json( $response );
	}
}


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
	$relativePathJSFF = getPluginURIPath()."/js/code/";
	error_log("js path: ".$fileJavaScriptFF);
	?>
	<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
	<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
	<script type="text/javascript">
		$(document).ready( function(){
			var ff = new FF("<?php echo $relativePathJSFF; ?>/",function(){
				var g = new giau();
			});
		});
	</script>
	<?php
}



function giau_admin_add_scripts(){ // enqueue as expected
	//wp_enqueue_script( "giau.js", plugins_url( "/js/giau.js", GIAU_PLUGIN_URL ) );
	
	wp_enqueue_script( "theme.js", plugins_url( "/js/theme.js", GIAU_PLUGIN_URL ) );
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
//error_log("GOT --- ".$_POST["richie"] );
// if( isset($_POST["richie"]) ) {
// 	error_log("DO" );
// 	giau_insert_bio('Richie','Last','Disp','Position', 'email', 'phone','description','uri','image','tags');
// }


if( isset($_POST) && isset($_POST['form_id']) ){
	error_log("form data, send back json ??? " );
	// $response = '{ "result": "success" }';
	// wp_send_json( $response );

	//GIAU_DATA_QUERY_FORM_INDEX()
	$formID = $_POST(GIAU_DATA_QUERY_FORM_INDEX());
	if( $formID == GIAU_DATA_QUERY_TYPE_LANGUAGIZATION() ){
		error_log("DO LANGUAGE INSERTION ...");
	}
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
	$languagizationResults = giau_languagization_paginated(0,10,[ ["language",1], ["id",0], ["hash_index",1] ]);
	$index = 0;
	foreach( $languagizationResults as $row ) {
		$row_id = $row["id"];
		$row_created = $row["created"];
		$row_modified = $row["modified"];
		$row_language = $row["language"];
		$row_hash_index = $row["hash_index"];
		$row_phrase_value = $row["phrase_value"];
		//error_log("GOT ITEM: (".$index.") = ".$row_hash_index);
		++$index;
	}


	$rowColumns = ["\$index","created","modified","language","hash_index","phrase_value"];
	$results = $languagizationResults;
	$index = 0;
	?>$dataServiceURL = getPluginURIPath();
		<table>
	<?php
	foreach( $languagizationResults as $row ) {
		error_log("GOT ITEM: (".$index.") = ");
		?>
		<tr>
		<?php
		foreach($rowColumns as $column){
			$rowValue;
			if($column=="\$index"){
				$rowValue = $index;
			}else{
				$rowValue = $row[$column];
			}
			?>
			<td><?php echo $rowValue; ?></td>
			<?php
		}
		//error_log("GOT ITEM: (".$index.") = ".$row_hash_index);
		++$index;
		?>
		</tr>
		<?php
	}
	?>
		</table>

<?php
	//$dataServiceURL = getPluginURIPath();
	//$dataServiceURL = get_site_url();
	//$dataServiceURL = getPluginURIPath();
	$dataServiceURL = "./";
	error_log("THE URL: ".$dataServiceURL);
?>
		<div class="giauDataTable"  data-table="localization" data-columns="created,modified,language,hash_index,phrase_value" data-url="<?php echo $dataServiceURL; ?>" data-settings-pages="true"  data-settings-arbitrary-page="true">
		</div>


		//wordpress_data_service();


	<?php

	/*
	$substitutePhrase = giau_languagization_substitution("BIO_FIRST_NAME_JOSEPH_KIM_TEXT","en-US");
	error_log("SUB 1: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("BIO_FIRST_NAME_JOSEPH_KIM_TEXT","ko-KP");
	error_log("SUB 2: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("BIO_FIRST_NAME_JOSEPH_KIM_TEXT","x");
	error_log("SUB 3: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("BIO_FIRST_NAME_JOSEPH_KIM_TEXT",null);
	error_log("SUB 4: ".$substitutePhrase);
	$substitutePhrase = giau_languagization_substitution("BIO_FIRST_NAME_JOSEPH_KIM_TEXT_X",null);
	error_log("SUB 5: ".$substitutePhrase);
	*/
?>
	<?php
	// LANGUAGIZATION
	$config = [
		"items" => [
			[
				"name" => "hash_index",
				"title" => "Identifier",
				"type" => "text",
				"hint" => "unique tag, eg: PAGE_TITLE_SUBTITLE_NAME_TEXT",
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
			],
			[
				"name" => "".GIAU_DATA_QUERY_FORM_INDEX()."",
				"type" => "hidden",
				"value" => "".GIAU_DATA_QUERY_TYPE_LANGUAGIZATION().""
			]
		],
		"submit_text" => "Insert Language Phrase"
	];
	createForm(GIAU_DATA_QUERY_TYPE_LANGUAGIZATION(), $_SERVER['REQUEST_URI'], $config);
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
		description VARCHAR(255) NOT NULL,
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

function giau_calendar_paginated($offset,$count,$sortIndexDirection, $startDate,$endDate){
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
	$criteria = " WHERE start_date >= ".$startDate." AND start_date <= ".$endDate." "; // BETWEEN, duration?
	$querystr = "
	    SELECT ".$table.".* 
	    FROM ".$table."
	    ".$criteria."
	    ".$sorting."
	    LIMIT ".$offset.",".$limit."
	";
	error_log("CALENDAR QUERY B: ".$querystr);
	$results = $wpdb->get_results($querystr, ARRAY_A);
	return $results;
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
	error_log("LANGUAGIZATION QUERY A: ".$querystr);
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

	// MAIN PAGE ITEMS:
	giau_insert_languagization($langEng,"CALENDAR_TITLE_TEXT","Upcoming Events");
	giau_insert_languagization($langKor,"CALENDAR_TITLE_TEXT","다가오는 이벤트");

	// -> BIO
	giau_insert_languagization($langEng,"BIO_FIRST_NAME_JOSEPH_KIM_TEXT","Joseph");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_JOSEPH_KIM_TEXT","Kim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_JOSEPH_KIM_TEXT","Reverend Joseph Kim");
	giau_insert_languagization($langEng,"BIO_POSITION_JOSEPH_KIM_TEXT","Director of Christian Education, Interim Junior High Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_JOSEPH_KIM_TEXT","jmkim75@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_JOSEPH_KIM_TEXT","2132006092");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_JOSEPH_KIM_TEXT","Joseph is happily married to Joyce, the woman of his dreams. He has a bachelor’s degree in civil engineering and a Master of Divinity degree and was called into vocational ministry in 2004. He began serving at LACPC as a high school pastor in December 2006 and by God’s grace is currently serving as the director of Christian Education.");
	giau_insert_languagization($langEng,"BIO_URI_JOSEPH_KIM_URI_TEXT","");
	
	giau_insert_languagization($langEng,"BIO_FIRST_NAME_TONY_PARK_TEXT","Tony");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_TONY_PARK_TEXT","Park");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_TONY_PARK_TEXT","Tony Park");
	giau_insert_languagization($langEng,"BIO_POSITION_TONY_PARK_TEXT","Elder of Christian Education");
	giau_insert_languagization($langEng,"BIO_EMAIL_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_PHONE_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_TONY_PARK_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_KURT_KIM_TEXT","Kurt");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_KURT_KIM_TEXT","Kim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_KURT_KIM_TEXT","Jangyeon Kim");
	giau_insert_languagization($langEng,"BIO_POSITION_KURT_KIM_TEXT","Secretary");
	giau_insert_languagization($langEng,"BIO_EMAIL_KURT_KIM_TEXT","jangyeaonkim@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_KURT_KIM_TEXT","5268571224");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_KURT_KIM_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_KURT_KIM_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_SEBASTIAN_LEE_TEXT","Sebastian");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_SEBASTIAN_LEE_TEXT","Lee");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_SEBASTIAN_LEE_TEXT","Sebastian Lee");
	giau_insert_languagization($langEng,"BIO_POSITION_SEBASTIAN_LEE_TEXT","Finance Deacon");
	giau_insert_languagization($langEng,"BIO_EMAIL_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_PHONE_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_SEBASTIAN_LEE_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_ANDREW_LIM_TEXT","Andrew");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_ANDREW_LIM_TEXT","Lim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_ANDREW_LIM_TEXT","Andrew Lim");
	giau_insert_languagization($langEng,"BIO_POSITION_ANDREW_LIM_TEXT","High School Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_ANDREW_LIM_TEXT","mrlimshhs@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_ANDREW_LIM_TEXT","6265366126");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_ANDREW_LIM_TEXT","Andrew has been attending LACPC ever since he was a high school freshman. He got his bachelor’s degree from UC Irvine and a Masters in Pastoral Studies from Azusa Pacific University. He has been serving as the high school pastor since May of last year and also works full time as a high school English teacher.");
	giau_insert_languagization($langEng,"BIO_URI_ANDREW_LIM_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_BORAM_LEE_TEXT","Boram");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_BORAM_LEE_TEXT","Lee");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_BORAM_LEE_TEXT","Boram Lee");
	giau_insert_languagization($langEng,"BIO_POSITION_BORAM_LEE_TEXT","Elementary Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_BORAM_LEE_TEXT","boramjdsn@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_BORAM_LEE_TEXT","9098688457");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_BORAM_LEE_TEXT","Born and raised in Los Angeles, Boram has a BA in cognitive psychology, a multiple subjects credential, and a master’s degree in teaching. She began seminary in January 2013 at Azusa Pacific University where she is studying to obtain an MA in pastoral studies with an emphasis is youth and family ministry. Her passion is to serve and train young children so that they can develop a solid relationship with God.");
	giau_insert_languagization($langEng,"BIO_URI_BORAM_LEE_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_SHEEN_HONG_TEXT","Sheen");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_SHEEN_HONG_TEXT","Hong");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_SHEEN_HONG_TEXT","Sheen Hong");
	giau_insert_languagization($langEng,"BIO_POSITION_SHEEN_HONG_TEXT","Kindergarten Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_SHEEN_HONG_TEXT","pastorhong71@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_SHEEN_HONG_TEXT","2133695590");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_SHEEN_HONG_TEXT","Sheen Hong is a loving mother of two children, Karis and Jin-Sung, and happy wife of Joshua, husband and a Chaplain. She has a bachelor’s degree in Christian education and Master of Arts degree in Christian Education. She was called into Children’s ministry in 2009. She began serving at LACPC as a Kindergarten pastor in December 2015.");
	giau_insert_languagization($langEng,"BIO_URI_SHEEN_HONG_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_JESSICA_WON_TEXT","Jessica");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_JESSICA_WON_TEXT","Won");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_JESSICA_WON_TEXT","Jessica Won");
	giau_insert_languagization($langEng,"BIO_POSITION_JESSICA_WON_TEXT","Nursery Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_JESSICA_WON_TEXT","jcb4jessica@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_JESSICA_WON_TEXT","3232034004");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_JESSICA_WON_TEXT","Jessica Won is married to Peter Won and has twin boys and a girl. She has a degree of Child Development from Patten University and currently working on M.Div. from Azusa University. She loves to share gospel to children and now oversees the nursery department.");
	giau_insert_languagization($langEng,"BIO_URI_JESSICA_WON_URI_TEXT","");

	// -> CALENDAR
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHILDRENS_DAY_2016_TITLE_TEXT","Children's Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHILDRENS_DAY_2016_DESCRIPTION_TEXT","Joint Worship 11:00 AM");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_LOVE_FESTIVAL_2016_TITLE_TEXT","Love Festival");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_LOVE_FESTIVAL_2016_DESCRIPTION_TEXT","Love Festival for people with developmental disabilities");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_MOTHERS_DAY_2016_TITLE_TEXT","Mothers' Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_MOTHERS_DAY_2016_DESCRIPTION_TEXT","Mothers' Day Celebration");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHERS_DAY_2016_TITLE_TEXT","Teachers' Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHERS_DAY_2016_DESCRIPTION_TEXT","Annual Teachers' Day Luncheon 12:30 PM @ Patio");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_TITLE_TEXT","Prayer Meeting");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_DESCRIPTION_TEXT","Bi-Monthly Parents/Teachers' Prayer Meeting");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_TITLE_TEXT","Vacation Bible School");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_DESCRIPTION_TEXT","Vacation Bible School: Cave Quest");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_GRADUATION_2016_TITLE_TEXT","CE Graduation");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_GRADUATION_2016_DESCRIPTION_TEXT","CE Graduation");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_SUMMER_MISSION_2016_TITLE_TEXT","Short-Term Summer Mission");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_SUMMER_MISSION_2016_DESCRIPTION_TEXT","Navajo Reservation in Arizona");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_TITLE_TEXT","Junior High Summer Retreat");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_DESCRIPTION_TEXT","@ Tahquitz Pines");

	giau_insert_languagization($langEng,"CALENDAR_EVENT__2016_TITLE_TEXT","High School Summer Retreat");
	giau_insert_languagization($langEng,"CALENDAR_EVENT__2016_DESCRIPTION_TEXT","@ Lake Arrowhead");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","Orange Tour Conference");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","회의 Orange Tour");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","Korean Challenge!");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","도전! 한국어");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT","Korean Challenge!");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT","도전! 한국어");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","Hallelujah Night");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","할렐루야 의 밤");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CE Pastors’ Retreat");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CE 목사 후퇴");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","CE Thanksgiving Worship");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","추수 감사절 예배");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","Teacher Appreciation Banquet");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","교사 감사 연회");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","Christmas Celebration");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","크리스마스 축하");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","Junior High & High School Winter Retreat");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","Junior High & High School Winter Retreat");
	// set 1
	giau_insert_calendar("event__2016","CALENDAR_EVENT_CHILDRENS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_CHILDRENS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 1,11, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_LOVE_FESTIVAL_2016_TITLE_TEXT","CALENDAR_EVENT_LOVE_FESTIVAL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 7, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_MOTHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_MOTHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 8, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_TEACHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5,15,12,30, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_TITLE_TEXT","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,10, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_TITLE_TEXT","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,17, 0, 0, 0, 0), 2*24*60*60*1000, "");
	giau_insert_calendar("event_ce_graduation_2016","CALENDAR_EVENT_CE_GRADUATION_2016_TITLE_TEXT","CALENDAR_EVENT_CE_GRADUATION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,26, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT_SUMMER_MISSION_2016_TITLE_TEXT","CALENDAR_EVENT_SUMMER_MISSION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7, 1, 0, 0, 0, 0), 7*24*60*60*1000, "");	
	giau_insert_calendar("event__2016","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, "");
	giau_insert_calendar("event__2016","CALENDAR_EVENT__2016_TITLE_TEXT","CALENDAR_EVENT__2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, "");
	// set 2
	giau_insert_calendar("event_orange_tour_2016","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT", stringFromHumanTime(2016, 9,20, 0, 0, 0, 0), 1*24*60*60*1000, "");
	giau_insert_calendar("event_korean_challenge_2016","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 9,25, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_hallelujah_2016","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT", stringFromHumanTime(2016,10,31, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_pastor_retreat_2016","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT", stringFromHumanTime(2016,11,10, 0, 0, 0, 0), 1*24*60*60*1000, "");
	giau_insert_calendar("event_thanksgiving_worship_2016","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT", stringFromHumanTime(2016,11,20, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_teacher_appreciation_2016","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,10, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_christmas_celebration_2016","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,23, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_jh_hs_winter_retreat_2017","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT", stringFromHumanTime(2017, 1, 2, 0, 0, 0, 0), 3*24*60*60*1000, "");

	// ?
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
	giau_insert_bio(
			'BIO_FIRST_NAME_JOSEPH_KIM_TEXT',
			'BIO_LAST_NAME_JOSEPH_KIM_TEXT',
			'BIO_DISPLAY_NAME_JOSEPH_KIM_TEXT',
			'BIO_POSITION_JOSEPH_KIM_TEXT',
			'BIO_EMAIL_JOSEPH_KIM_TEXT',
			'BIO_PHONE_JOSEPH_KIM_TEXT',
			'BIO_DESCRIPTION_JOSEPH_KIM_TEXT',
			'BIO_URI_JOSEPH_KIM_URI_TEXT',
			'ce-joe.png',
			'ce,bio,contact'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_TONY_PARK_TEXT',
			'BIO_LAST_NAME_TONY_PARK_TEXT',
			'BIO_DISPLAY_NAME_TONY_PARK_TEXT',
			'BIO_POSITION_TONY_PARK_TEXT',
			'BIO_EMAIL_TONY_PARK_TEXT',
			'BIO_PHONE_TONY_PARK_TEXT',
			'BIO_DESCRIPTION_TONY_PARK_TEXT',
			'BIO_URI_TONY_PARK_URI_TEXT',
			'',
			'bio'
			);
		giau_insert_bio(
			'BIO_FIRST_NAME_KURT_KIM_TEXT',
			'BIO_LAST_NAME_KURT_KIM_TEXT',
			'BIO_DISPLAY_NAME_KURT_KIM_TEXT',
			'BIO_POSITION_KURT_KIM_TEXT',
			'BIO_EMAIL_KURT_KIM_TEXT',
			'BIO_PHONE_KURT_KIM_TEXT',
			'BIO_DESCRIPTION_KURT_KIM_TEXT',
			'BIO_URI_KURT_KIM_URI_TEXT',
			'',
			'bio,contact'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_LAST_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_DISPLAY_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_POSITION_SEBASTIAN_LEE_TEXT',
			'BIO_EMAIL_SEBASTIAN_LEE_TEXT',
			'BIO_PHONE_SEBASTIAN_LEE_TEXT',
			'BIO_DESCRIPTION_SEBASTIAN_LEE_TEXT',
			'BIO_URI_SEBASTIAN_LEE_URI_TEXT',
			'',
			'bio'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_ANDREW_LIM_TEXT',
			'BIO_LAST_NAME_ANDREW_LIM_TEXT',
			'BIO_DISPLAY_NAME_ANDREW_LIM_TEXT',
			'BIO_POSITION_ANDREW_LIM_TEXT',
			'BIO_EMAIL_ANDREW_LIM_TEXT',
			'BIO_PHONE_ANDREW_LIM_TEXT',
			'BIO_DESCRIPTION_ANDREW_LIM_TEXT',
			'BIO_URI_ANDREW_LIM_URI_TEXT',
			'ce-andy.png',
			'highschool,bio,contact'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_BORAM_LEE_TEXT',
			'BIO_LAST_NAME_BORAM_LEE_TEXT',
			'BIO_DISPLAY_NAME_BORAM_LEE_TEXT',
			'BIO_POSITION_BORAM_LEE_TEXT',
			'BIO_EMAIL_BORAM_LEE_TEXT',
			'BIO_PHONE_BORAM_LEE_TEXT',
			'BIO_DESCRIPTION_BORAM_LEE_TEXT',
			'BIO_URI_BORAM_LEE_URI_TEXT',
			'ce-boram.png',
			'elementary,bio,contact'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_SHEEN_HONG_TEXT',
			'BIO_LAST_NAME_SHEEN_HONG_TEXT',
			'BIO_DISPLAY_NAME_SHEEN_HONG_TEXT',
			'BIO_POSITION_SHEEN_HONG_TEXT',
			'BIO_EMAIL_SHEEN_HONG_TEXT',
			'BIO_PHONE_SHEEN_HONG_TEXT',
			'BIO_DESCRIPTION_SHEEN_HONG_TEXT',
			'BIO_URI_SHEEN_HONG_URI_TEXT',
			'ce-hong.png',
			'kindergarten,bio,contact'
			);
	giau_insert_bio(
			'BIO_FIRST_NAME_JESSICA_WON_TEXT',
			'BIO_LAST_NAME_JESSICA_WON_TEXT',
			'BIO_DISPLAY_NAME_JESSICA_WON_TEXT',
			'BIO_POSITION_JESSICA_WON_TEXT',
			'BIO_EMAIL_JESSICA_WON_TEXT',
			'BIO_PHONE_JESSICA_WON_TEXT',
			'BIO_DESCRIPTION_JESSICA_WON_TEXT',
			'BIO_URI_JESSICA_WON_URI_TEXT',
			'ce-jessica.png',
			'bio,contact'
			);
}

function giau_insert_languagization($language,$hash,$phrase){
	// hash must be non-empty
	if(!$hash || strlen($hash) == 0){
		return;
	}
	// language must be non-empty
	if(!$language || strlen($language) == 0){
		return;
	}
	// phrase must be non-null
	if(!$phrase){
		return;
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
			"phrase_value" => $phrase,
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
			"phone" => $phone,
			"description" => $description,
			"uri" => $uri,
			"image_url" => $imageURL,
			"tags" => $tags
		)
	);
}

function giau_insert_calendar($shortName, $title, $description, $startDate, $duration, $tags){
	// tags: limit to comma-separated-length 255
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_BIO(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"short_name" => $shortName,
			"title" => $title,
			"description" => $description,
			"start_date" => $startDate,
			"duration" => $duration,
			"tags" => $tags
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
