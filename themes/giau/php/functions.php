<?php
// functions.php

/*

$_SERVER['HTTP_USER_AGENT']

*/


// function wp_test(){
// 	error_log("richie - wp_test");
// 	wordpress_data_service();
// }
// add_action('wp_init','wp_test');


//add_action('admin_head','admin_test');
//add_action('get_header','another_test');
//add_action('wp_head','another_test');


// function printArray_2($array, $pad=''){
//      foreach ($array as $key => $value){
//         //echo $pad . "$key => $value";
//         error_log( $pad . "$key => $value");
//         if(is_array($value)){
//             printArray($value, $pad.' ');
//         }  
//     } 
// }

// function wordpress_data_service_2(){
// 	//
// 	error_log("         wordpress_data_service -- ".$_POST['operation']);
// 	//error_log("         wordpress_data_service -- ".$_GET['operation']);
// 	error_log("         ".($_POST) );
// 	error_log("         ".implode($_POST) );
// 	//error_log("         ".print_r($_POST) );
// 	printArray($_POST);
// 	//printArray($_GET);
// 	if( isset($_POST) && isset($_POST['operation']) ){
// 	//if( isset($_GET) && isset($_GET['operation']) ){
// 		$operationType = $_POST['operation'];
// 		error_log("OOOOOOOOOOOOOOOOOOOOOOOOOOO === ".$operationType);
// 		$response = '{ "result": "success" }';
// 		wp_send_json( $response );
// 	}
// }



function KEY_GET_PARAM_PAGE(){
	return "page";
}
function KEY_GET_PARAM_SUBPAGE(){
	return "sp";
}

function KEY_COOKIE_PARAM_LANGUAGE(){
	return "language_value";
}
// function getCookieLanguage(){
// 	$cookie = $_COOKIE[KEY_COOKIE_PARAM_LANGUAGE()];
// 	if(isset($cookie)){
// 		return $cookie;
// 	}
// 	return null;
// }

function getTemplateURIPath(){
	return wp_make_link_relative( get_template_directory_uri()."/" );
}

function relativePathCSS(){
	return getTemplateURIPath()."css/";
}

function relativePathJS(){
	return getTemplateURIPath()."js/";
}

function relativePathIMG(){
	return getTemplateURIPath()."img/";
}


function relativePathUploads(){
	return getTemplateURIPath()."uploads/";
}


function absoluteWordpressServerURL(){
	return site_url();
}

function getColorHexFooter(){
	return "111E2F";
}


// function getParameterOrDefault($param){
// 	return getParameterOrDefault($param,"");
// }



function page_link_from_page_name($pageName){
	return page_link_from_page_name_subpage($pageName,null);
}

function page_link_from_page_name_subpage($pageName,$subpage){
	$root = absoluteWordpressServerURL();
	return $root."?page=".$pageName."&sp=".($subpage ? $subpage : "");
}

function create_page(){
	$relativePathJSFF = relativePathJS()."code/";
		$fileJavaScriptFF = relativePathJS()."code/FF.js";
	$fileJavaScriptFFMinified = relativePathJS()."code/FF.min.js";
	$fileCSSMain = relativePathCSS()."theme.css";
	$fileJavaScriptMain = relativePathJS()."theme.js";

	$PAGE_REQUEST_PARAMETER_PAGE = "page";
	$PAGE_REQUEST_TYPE_DEFAULT = "__live";
	$PAGE_REQUEST_TYPE_ERROR = "__error";

	$pageRequest = getPageRequest();

?>
<html>
	<head>
		<title>The Father's House | <?php echo $headingTitleDisplay; ?></title>
		<link rel="stylesheet" href="<?php echo $fileCSSMain; ?>">
		<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
		<!--<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>-->
		<!--<script rel="text/javascript" src="<?php echo $fileJavaScriptFFMinified; ?>"></script>-->
<!--<script rel="text/javascript" src="<?php echo $fileJavaScriptMain; ?>"></script>-->
		<script type="text/javascript">
			// START
				GLOBAL_SERVER_ROOT_PATH = "<?php echo absoluteWordpressServerURL(); ?>";
				GLOBAL_SERVER_QUERY_PATH = "<?php echo absoluteWordpressServerURL().'/'.'data'; ?>";
				GLOBAL_SERVER_IMAGE_PATH = "<?php echo relativePathIMG(); ?>";
				$(document).ready( function(){
					var ff = new FF("<?php echo $relativePathJSFF; ?>/",function(){
						var list = ["<?php echo $fileJavaScriptMain; ?>"];
						scriptLoader = new ScriptLoader("",list, this, function(e){
							var g = new giau();
						},null);
						scriptLoader.load();
					});
				});
		</script>
		<?php
			$FAV_ICON_LOCATION = "/images/theming/favicon.ico";
				$FAV_ICON_LOCATION = giau_plugin_url_from_any_url($FAV_ICON_LOCATION);
			$FAV_ICON_LOCATION = getRelativeURLFromAbsoluteURL($FAV_ICON_LOCATION);
		?>
		<meta name="viewport" content="width=device-width, initial-scale=1" maximum-scale=1>
		<!-- FAV ICON -->
		<link rel="shortcut icon" href="<?php echo $FAV_ICON_LOCATION; ?>" type="image/x-icon">
		<link rel="icon" href="<?php echo $FAV_ICON_LOCATION; ?>" type="image/x-icon">
		
	</head>
	<body style="bgColor:#F00; margin: 0 auto;">
	<?php
		error_log("PAgE: ".$pageRequest);
		$page = giau_get_page_tag($pageRequest);
		//fillOutPageFromID($page["id"]);
		// <div class="giauFileBrowser limitedWidth" style=""></div>
	?>

	<div class="limitedWidth" style="width:100%; display:block; position:relative;">
		<div style="width:70%; height:600px; display:inline-block; background-color:#F0F; float:left;"><div class="giauCRUD" style=""></div></div><div style="width:30%; display:inline-block; background-color:#0FF; float:left;"><div class="giauLibraryView" style=""></div></div>
	</div>

 <!-- width:auto; height:auto; -->
	</body>
</html>

<?php
}



/*
// WHAT TO DO ABOUT SECTION SUB ITEM LIST ?
		//$section = giau_get_section_id(1);
		$section = giau_get_section_id(8);
		//$section = giau_get_section_id(25);
		if($section){
			$widgetID = $section["widget"];
			if($widgetID){
				$widget = giau_get_widget_id($widgetID);
				if($widget){
					echo '<div style="display:none;" data-object="true">'. $section["configuration"].'</div>';
					echo '<div style="display:none;"  data-model="true">' . $widget["configuration"].'</div>';
				}
			}
		}
			NAME:
				name : object field key index (for objects only, not for arrays)
			TYPES:
				boolean : (stored as string)
				number : (stored as string)
				string
				string-number : (expects a number: float or integet or scientific notation)
				string-url : (expects a URL)
				string-image : (expects a URL to an image)
				string-date : (expects a date in format: YYYY-MM-DD hh:mm:ss.nnnn)
				string-color : (expects a color in the format: 0xAARRGGBB) (#|0x)(RGB|ARGB|RRGGBB|AARRGGBB)
				object
				array-number
				array-string(-*)
				array-object
				array-array
			ATTRIBUTES:
				hint : text to display 
				default-value : assigned value when creating a new primitive
				description: detailed feedback on purpose of value
				languagization: boolean on whether the field should pass through a language substitution-filter
				depends: another field that must exist with non-empty object/array/primitive
					depends-value: <regex> depends specific value for string/boolean/number
			SUBTYPES:
				fields : specify parameters for objects, contained-types for arrays
		*/
			$widgetConfig = [
				"name" => "Giau Test",
				"fields" => [
					"boolean" => [
						"type" => "boolean",
						"defaut-value" => "false"
					],
					"number" => [
						"type" => "number",
						"defaut-value" => "0.0"
					],
					"string" => [
						"type" => "string",
						"defaut-value" => ' < unknown>', // wtf php
					],
					"object" => [
						"type" => "object",
						"fields" => [
							"fieldA" => [
								"type" => "string"
							],
							"fieldB" => [
								"type" => "string"
							]
						]
					],
					"array_strings" => [
						"type" => "array-string"
					],
					"array_objects" => [
						"type" => "array-object",
						"fields" => [
							"type" => "object",
							"fields" => [
								"fieldA" => [
									"type" => "string"
								],
								"fieldB" => [
									"type" => "string"
								]
							]
						]
					],
					"array_list" => [
						"type" => "array-array",			// array of arrays
						"fields" => [
							"type" => "array-array",		// array of arrays
							"fields" => [
								"type" => "array-string"	// array of strings
							]
						]
					]
				]
			];
			$sectionConfig = [
				"boolean" => "true",
				"number" => "3.141",
				"string" => "pi",
				"object" => [
					"fieldA" => "value A",
					"fieldB" => "value B",
				],
				"array_strings" => [
					"string0",
					"string1"
				],
				"array_objects" => [
					[
						"fieldA" => "valueA",
						"fieldB" => "valueB",
					]
				],
				"array_list" => [
					[
						[
							"string0",
							"string1",
							"string2"
						]
					]
				]

			];

			// $sectionConfig = json_encode($sectionConfig);
			// $widgetConfig = json_encode($widgetConfig);
			// echo '<div style="display:none;" data-object="true">'. $sectionConfig .'</div>';
			// echo '<div style="display:none;"  data-model="true">' . $widgetConfig . '</div>';
?>







