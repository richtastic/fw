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
	$fileCSSMain = relativePathCSS()."theme.css";
	$fileJavaScriptMain = relativePathJS()."theme.js";

	$PAGE_REQUEST_PARAMETER_PAGE = "page";
	//$PAGE_REQUEST_PARAMETER_SUBPAGE = "sp";
	$PAGE_REQUEST_TYPE_DEFAULT = "__live";

	$pageRequest = getPageRequest();
	//$subpageRequest = getParameterOrDefault( KEY_GET_PARAM_SUBPAGE(), null );

?>
<html>
	<head>
		<title>The Father's House | <?php echo $headingTitleDisplay; ?></title>
		<link rel="stylesheet" href="<?php echo $fileCSSMain; ?>">
		<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptMain; ?>"></script>
		<script type="text/javascript">
			// START
				GLOBAL_SERVER_ROOT_PATH = "<?php echo absoluteWordpressServerURL(); ?>";
				GLOBAL_SERVER_QUERY_PATH = "<?php echo absoluteWordpressServerURL().'/'.'data'; ?>";
				GLOBAL_SERVER_IMAGE_PATH = "<?php echo relativePathIMG(); ?>";
				$(document).ready( function(){
					var ff = new FF("<?php echo $relativePathJSFF; ?>/",function(){
						var g = new giau();
					});
				});
		</script>
		<?php
			//$FAV_ICON_LOCATION =  get_stylesheet_directory_uri()."/img/favicon.ico";
			$FAV_ICON_LOCATION = get_stylesheet_directory_uri()."/img/favicon.ico";
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
		fillOutPageFromID($page["id"]);
	?>
	</body>
</html>

<?php
}
?>







