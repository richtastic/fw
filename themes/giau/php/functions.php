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
	$PAGE_REQUEST_PARAMETER_SUBPAGE = "sp";
	
	$PAGE_REQUEST_TYPE_HOME = "home";
	$PAGE_REQUEST_TYPE_DEPARTMENTS = "departments";
	$PAGE_REQUEST_TYPE_STAFF = "staff";
	$PAGE_REQUEST_TYPE_FORMS = "forms";
	$PAGE_REQUEST_TYPE_INFO = "info";
	$PAGE_REQUEST_TYPE_CONTACT = "contact";

	$SUBPAGE_REQUEST_TYPE_NURSERY = "nursery";
	$SUBPAGE_REQUEST_TYPE_KINDERGARTEN = "kindergarten";
	$SUBPAGE_REQUEST_TYPE_ELEMENTARY = "elementary";
	$SUBPAGE_REQUEST_TYPE_JUNIORHIGH = "juniorhigh";
	$SUBPAGE_REQUEST_TYPE_HIGHSCHOOL = "highschool";
	$SUBPAGE_REQUEST_TYPE_KOREANSCHOOL = "koreanschool";

	$pageList = [
				[
					"title" => "Home",
					"page" => $PAGE_REQUEST_TYPE_HOME
				],[
					"title" => "Departments",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS
				],[
					"title" => "Staff",
					"page" => $PAGE_REQUEST_TYPE_STAFF
				],[
					"title" => "Forms",
					"page" => $PAGE_REQUEST_TYPE_FORMS
				],[
					"title" => "Contact Us",
					"page" => $PAGE_REQUEST_TYPE_CONTACT
				],[
					"title" => "LACPC",
					"page" => $PAGE_REQUEST_TYPE_INFO,
					"url" => "http://www.lacpc.org"
				]
				];

	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), $PAGE_REQUEST_TYPE_HOME );
	$subpageRequest = getParameterOrDefault( KEY_GET_PARAM_SUBPAGE(), null );


	// prep data stuff
	$headingTitleDisplay = "?";
	if($pageRequest==$PAGE_REQUEST_TYPE_HOME){
		$headingTitleDisplay = "";
	}else if($pageRequest==$PAGE_REQUEST_TYPE_DEPARTMENTS){
		if($subpageRequest==null || $subpageRequest==""){
			$subpageRequest=$SUBPAGE_REQUEST_TYPE_NURSERY;
		}

		if($subpageRequest==$SUBPAGE_REQUEST_TYPE_NURSERY){
			$headingTitleDisplay = "NURSERY";
		}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_KINDERGARTEN){
			$headingTitleDisplay = "KINDERGARDEN";
		}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_ELEMENTARY){
			$headingTitleDisplay = "ELEMENTARY";
		}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_JUNIORHIGH){
			$headingTitleDisplay = "\"HIS\" JR. HIGH";
		}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_HIGHSCHOOL){
			$headingTitleDisplay = "HIGH SCHOOL";
		}
	}else if($pageRequest==$PAGE_REQUEST_TYPE_STAFF){
		$headingTitleDisplay = "STAFF";
	}else if($pageRequest==$PAGE_REQUEST_TYPE_FORMS){
		$headingTitleDisplay = "FORMS";
	}else if($pageRequest==$PAGE_REQUEST_TYPE_CONTACT){
		$headingTitleDisplay = "CONTACT US";
	}else if($pageRequest==$PAGE_REQUEST_TYPE_INFO){
		$headingTitleDisplay = "LACPC";
	}

	//wordpress_data_service_2();

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
if($pageRequest==$PAGE_REQUEST_TYPE_HOME){

fillOutPageFromID(1);

}else{
 // ...
?>
<?php
/*
	<!-- FEATURE TITLE -->
	<div class="headerTitleContainer" style="display:block;">
		<div class="headerNavigationContainer" style="display:table;">
			<!-- LOGO -->
			<div class="organizationTitleContainer" style="display:table-cell;  border-collapse: collapse; ">
				<div class="mainNavigationBarTitle" >THE FATHER'S HOUSE</div>
				<div class="mainNavigationBarHeading" ><?php echo $headingTitleDisplay; ?></div>
			</div>
			<!-- NAVIGATION -->
			<?php create_navigation($pageList, $pageRequest, null); ?>
			<!-- LANGUAGE SWITCH -->
			<?php create_language_switch(""); ?>

		</div>
	</div>
*/
?>
<?php
}
?>

<?php
if($pageRequest==$PAGE_REQUEST_TYPE_HOME){
	//
?>
<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_DEPARTMENTS){

	error_log("FILLING OUT DEPARTS");
	//fillOutPageFromID(2);
	//fillOutPageFromID(3);
	//fillOutPageFromID(4);
	fillOutPageFromID(5);

}else if($pageRequest==$PAGE_REQUEST_TYPE_STAFF){
?>
	<!-- STAFF BIOGRAPHIES -->
	<div class="sectionContainerBiographies limitedWidth" style="">
		<!-- <div class="giauBiographyList"></div> -->
		<?php
			fillOutSectionFromID("28");
		?>
		<div class="footerSectionMain"></div>
	</div>
<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_FORMS){
?>
<?php
/*
	<!-- DOWNLOADS -->
	<div class="limitedWidth" style="">
		<!-- <div class="headerSectionMain>FORMS</div> -->
		<div class="titleSectionMain">Download forms and documentation here:</div>
		<div class="formItemDownload">
			<a href="<?php echo relativePathUploads()."/lacpc_medical_release_form_2016_2017.pdf"; ?>">LACPC Medical Release Form 2016-2017 (pdf)</a>
		</div>
		<div class="formItemDownload">
			<a href="<?php echo relativePathUploads()."/photograph_release_form.pdf"; ?>">LACPC Photograph Release Form (pdf)</a>
		</div>
	</div>
*/
	?>
	<!-- <div class="giauFileBrowser limitedWidth" style=""></div> -->
	<div class="giauObjectComposer limitedWidth" style="">
	<?php
	/*
		<div style="display:none;"  data-model="true"><?php
		$widget = giau_get_widget_id(2);
		if($widget){
			echo $widget["configuration"];
		}
		?></div>
	*/
	?>
	<?php
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

			$sectionConfig = json_encode($sectionConfig);
			$widgetConfig = json_encode($widgetConfig);

			echo '<div style="display:none;" data-object="true">'. $sectionConfig .'</div>';
			echo '<div style="display:none;"  data-model="true">' . $widgetConfig . '</div>';
		?>
	</div>
<?php
// <script>
// 	var definition = {"widget":"name"}
// </script>
}else if($pageRequest==$PAGE_REQUEST_TYPE_INFO){
?>
	<!-- DIRECTIONS -->
	<!-- <div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">DIRECTIONS</div>
	</div> -->


<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_CONTACT){
?>

	<!-- ADDRESS -->
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0); padding-top:32px;">
		<!-- <div class="addressSectionTitle">Los Angeles Presbyterian Church</div>
		<div class="addressSectionDescription">2241 N. Eastern Ave. Los Angeles, CA 90032</div>
		<div class="addressSectionDivider"></div> -->
	</div>
	
	<!-- GOOGLE MAP -->
	<div class="giauMobileLimted limitedWidth"  style="background-color: rgba(255,255,255,0.0); text-align:center; width:100%; height:400px;" data-limited-width-activation="" data-limited-height="300px" data-limited-interaction="true">
	<!-- if the height of the item is greater than the viewable page, interaction is disabled to allow mobile devices to scroll -->
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.9435064350605!2d-118.18318181958668!3d34.07096242428407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c5b8f66d4e9d%3A0xa798b42cbfdca248!2sLos+Angeles+Christian+Presbyterian!5e0!3m2!1sen!2sus!4v1475290571183" frameborder="0" style="overflow:hidden;height:100%;width:100%; display:inline-block; margin: 0 auto;" allowfullscreen>
		</iframe>
	</div>

	
	<!-- CONTACT -->
	<div class="limitedWidth" style="display:block; padding:10px;">
		<div class="customContactContainer" style="width:100%;">
		<div class="customContactInfo">
			<div class="customContactTitle" style="">Contact Info</div>
			<div class="customContactAddress" style="">2241 N. Eastern Ave.</div>
			<div class="customContactAddress" style="">Los Angeles, CA 90032</div>
			<?php 
			// $bioDefault = [
			// 	"heading" => "CE",
			// 	"title" => "Reverend Joseph Kim",
			// 	"email" => "jmkim75@gmail.com",
			// 	"phone" => "(213) 200-6092",
			// ];
			// $bioList = [$bioDefault];//,$bioDefault,$bioDefault,$bioDefault,$bioDefault,$bioDefault];
			$offset = null;
			$count = null;
			$sortIndexDirection = null;
			$tags = ["contact"];
			$bios = giau_bio_paginated($offset,$count,$sortIndexDirection,$tags);
			$bioCount = count($bios);

			$bioOrdering = [
				[
					"index" => 0,
					"title" => "CE",
				],
				[
					"index" => 3,
					"title" => "Elementary",
				],
				[
					"index" => 5,
					"title" => "Nursery",
				],
				[
					"index" => 2,
					"title" => "High School",
				],
				[
					"index" => 4,
					"title" => "Kindergarten",
				],
				[
					"index" => 1,
					"title" => "Korean School",
				]
			];
			$orderCount = count($bioOrdering);

			$bioList = [];

			for($i=0; $i<$bioCount; ++$i){
				$title = null;
				$bio = null;
				if($orderCount>$i){
					$lookup = $bioOrdering[$i];
					$index = $lookup["index"];
					if($index!==null){
						$bio = $bios[$index];
					}
					$title = $lookup["title"];
				}else{
					$bio = $bios[$i];
					
				}
				if(!$title){
					$title = $bio["position"];
				}
				
				$name = $bio["display_name"];
				$email = $bio["email"];
				$phone = $bio["phone"];
					$phone = getHumanReadablePhone($phone);
				$item = [
					"heading" => $title,
					"title" => $name,
					"email" => $email,
					"phone" => $phone
				];
				$bioList[] = $item;
			}
				foreach ($bioList as $bio) {
					$heading = $bio["heading"];
					$title = $bio["title"];
					$email = $bio["email"];
					$phone = $bio["phone"];
			?>
			<div class="customContactBioContainer" style="">
				<div class="customContactBioHeading" style=""><?php echo $heading; ?></div>
				<div class="customContactBioTitle" style=""><?php echo $title; ?></div>
				<?php
				if($email!==null && strlen($email)>0){
				?>
					<div style=""><a class="customContactBioEmail" href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a></div>
				<?php
				}
				?>
				<div class="customContactBioPhone" style=""><?php echo $phone; ?></div>
			</div>
			<?php
				}
			?>
		</div>
		<div class="giauContactForm"></div>
		</div>
	</div>

<?php
}else{
?>
	<!-- UNKNOWN 404 -->
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain"><?php echo $pageRequest; ?></div>
	</div>
<?php
}




// TEMPORARY FOOTER
if($pageRequest!=$PAGE_REQUEST_TYPE_HOME){
 create_footer();
}

?>
	</body>
</html>
<?php
}


function create_language_switch($overrideCSS,$additionalHTML=null){
	$additionalHTML = $additionalHTML ? $additionalHTML : "";
	?>
			<div class="languageSwitchContainer giauLanguageToggleSwitch" style="display:table-cell; padding:10px; vertical-align:middle; text-align:right;"  data-storage="<?php echo KEY_COOKIE_PARAM_LANGUAGE(); ?>"  <?php echo $additionalHTML; ?> >
				<div style="display:inline-block;" data-language="en" data-display="EN" data-url="./"></div>
				<div style="display:inline-block;" data-language="ko" data-display="KO" data-url="./"></div>
			</div>
<?php
}
function create_navigation($pageList, $currentPageName, $currentSubPageName, $additional=null, $additionalData=null){
	$isTable = true;
	$displayType = null;
	if($additional){
		$isTable = false;
	}
	$additionalData = $additionalData ? $additionalData : "";
	?>
	<div class="giauNavigationItemList navigationContainer" style="<?php
	if($displayType!=null){
		echo $displayType;
	}else{
		if($isTable){ ?>
		display:table-cell; vertical-align:middle; text-align:center;     padding: 8px 0px 8px 0px; 
		<?php
		}else{ ?>
		display:inline-block; position:relative; text-align: center; padding:6px; text-align:center;<?php echo $additional;
		}
	}
	?> " <?php echo $additionalData; ?> >
		<ul><?php
			foreach($pageList as $pageData){
				$pageName = $pageData["page"];
				$subPageName = $pageData["sp"];
				$pageDisplayTitle = $pageData["title"];
				$pageURL = $pageData["url"];
				if(!$pageURL){
					$pageURL = page_link_from_page_name_subpage($pageName,$subPageName);
				}
				?>
				<div class="navigationMenuItem"
					data-display="<?php echo $pageDisplayTitle; ?>"
					data-url="<?php echo $pageURL; ?>"
					<?php
					if( strcmp($pageName,$currentPageName)==0 ){
						if(!$subPageName || ($subPageName && strcmp($subPageName,$currentSubPageName)==0) ){
						?>
						data-selected="selected"
						<?php
						}
					}
					?>
					>
				</div>
				<?php
			}
		?></ul>
	</div>
	<?php
}



function create_footer(){
	// for($i=0;$i<=26;++$i){
 //       fillOutSectionFromID($i); // select id,widget from wp_giau_section;
	// }
	fillOutSectionFromID(28);
}


?>







