<?php
// functions.php


/*

$_SERVER['HTTP_USER_AGENT']

*/

function KEY_GET_PARAM_PAGE(){
	return "page";
}
function KEY_GET_PARAM_SUBPAGE(){
	return "sp";
}

function KEY_COOKIE_PARAM_LANGUAGE(){
	return "language_value";
}
function getCookieLanguage(){
	$cookie = $_COOKIE[KEY_COOKIE_PARAM_LANGUAGE()];
	if(isset($cookie)){
		return $cookie;
	}
	return null;
}

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
					//function ffLoadedFxn(){
						//(new ScriptLoader("./",["Filter.js"],this,funLoadedFxn)).load();
					//}
					//function funLoadedFxn(){
						//var filter = new Filter();
					//}
					//var g = new giau();
				});
		</script>
		<meta name="viewport" content="width=device-width, initial-scale=1" maximum-scale=1>
	</head>
	<body style="bgColor:#F00; margin: 0 auto;">

<?php
if($pageRequest==$PAGE_REQUEST_TYPE_HOME){
?>
	<!-- FEATURE IMAGE -->
	<div class="featurePresentationContainer giauImageGallery" data-autoplay="10000"  style="">
		<?php
			$galleryPrefix = relativePathIMG()."gallery_featured/";
			$imageList = ["featured_06_opt.png","featured_02_opt.png","featured_03_opt.png","featured_04_opt.png","featured_05_opt.png","featured_01_opt.png"];
			$i;
			$len = sizeof($imageList);
			for($i=0; $i<$len; ++$i){
				$image = $imageList[$i];
				?>
				<div data-source="<?php echo $galleryPrefix.$image; ?>" style="display:none;"></div>
				<?php
			}
		?>

		<!-- FEATURE INFO OVERLAY -->
		<div class="featureInfoOverlay giauInfoOverlay" style="">
			<div class="featureInfoOverlayHeading">THE FATHER'S HOUSE</div>
			<div></div>
			<div class="featureInfoOverlayTitle" style="">JOIN US FOR WORSHIP</div>
			<div></div>
			<div class="featureInfoOverlaySubtitle">Sunday at 11:00 a.m.</div>
			<div></div>
			<!-- <a href="http://www.google.com"> -->
			<!-- <div class="featureInfoOverlayButton" style="" >Directions</div> -->
			<!-- </a> -->
		</div>
		<!-- HEADER -->
		<div class="headerNavigationContainer" style="position:absolute; display:inline-block; text-align:center;">
		<div class="" style="position:absolute; display:inline-block; left:0; right:0; top:0; height:50px; background-repeat:repeat-x; background-image:url('<?php echo relativePathIMG()."/shadow_fade_top.png"; ?>');"></div>
			<!-- LOGO -->
			<!-- <div class="organizationLogoContainer" style="display:inline-block; float:left; left:0; top:0; "><img class="navigationMenuLogo" src="<?php echo relativePathIMG()."logo_fathers_house.png" ?>" /></div> -->
			<!-- LANGUAGE SWITCH -->
			<!-- <div class="languageSwitchContainer" style="display:inline-block; float:right; padding:10px;">EN | 한국어</div> -->
			<div class="languageSwitchContainer" style="display:inline-block; position:absolute; right:0; top:0; padding-right:10px;"><?php create_language_switch("","data-color=\"0xFFFFFFFF\""); ?></div> 
			<!-- NAVIGATION -->
			<?php create_navigation($pageList, $pageRequest, null, "padding: 10px;", "data-darkmode=\"true\""); ?>
			
		</div>
	</div>

	<!-- DEPARTMENTS -->
	<div class="sectionContainerDepartments limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">DEPARTMENTS</div>
		<div class="departmentInternalContainer">
			<div class="giauCategoryListing"></div>
		</div>
		<div class="footerSectionMain"></div>
	</div>

	<!-- DIVIDER -->
	<div class="sectionContainerDividerSmall limitedWidth"  style=""></div>

	<!-- INFO STATEMENT GROUP -->
	<div class="sectionContainerMissionStatement limitedWidth"  style="">
		<!-- background-color: rgba(230,228,222,1.0); -->
		<!-- <div class="centeredText ultraImportantText">Through worship, Bible Study & accountability</div> -->
		<!-- <div class="centeredText importantText">Bible Study & accountability</div> -->
		<!-- <div class="centeredText standardText">we strive to provide an environment for our <b>children and youth</b> to experience the grace of God.</div> -->
		<div class="centeredText importantText focusedCenterpieceWidth">Through worship, Bible Study & accountability,</div>
		<div class="centeredText dividerText focusedCenterpieceWidth"></div>
		<div class="centeredText standardText focusedCenterpieceWidth">we strive to provide an environment for our children and youth to experience the grace of God. In addition, we aim to serve parents and entire families as well. More than just a children and youth ministry, our Christian Education department is a family ministry</div>
	</div>

	<!-- PHOTO GALLERY -->
	<div class="limitedWidth"  style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">PHOTOS</div>
		<div class="giauImageGallery" data-autoplay="10000" data-navigation="true" style="position:relative; width:100%; height:400px;">
		<?php
			$galleryPrefix = relativePathIMG()."gallery_featured/";
			$imageList = ["featured_01_opt.png","featured_02_opt.png","featured_03_opt.png","featured_04_opt.png","featured_05_opt.png","featured_06_opt.png"];
			$i;
			$len = sizeof($imageList);
			for($i=0; $i<$len; ++$i){
				$image = $imageList[$i];
				?>
				<div data-source="<?php echo $galleryPrefix.$image; ?>" style="display:none;"></div>
				<?php
			}
		?>
		</div>
	</div>

	<!-- DIVIDER -->
	<div class="sectionContainerDividerSmall limitedWidth"  style=""></div>

	<!-- INFO STATEMENT GROUP 2 -->
	<div class="sectionContainerMissionStatement limitedWidth"  style="">
		<div class="centeredText importantText focusedCenterpieceWidth">Deuteronomy 6:6-7</div>
		<div class="centeredText dividerText focusedCenterpieceWidth"></div>
		<div class="centeredText standardText focusedCenterpieceWidth">"These commandments I give you today are to be upon your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you are down and when you get up."</div>
	</div>


	<!-- CALENDAR EVENTS -->
	<div class="sectionContainerDepartments limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">UPCOMING EVENTS</div>
		<div class="departmentInternalContainer">
			<div class="giauCalendarList"></div>
		</div>
		<div class="footerSectionMain"></div>
	</div>

	<!-- QUOTE GALLERY -->
<!--
	<div class=""  style="height:400px; background-color: rgba(0,255,255,0.5);">
		<div class="">quotes</div>
	</div>
-->
<?php
}else{
?>
<?php
 // ...
?>

	
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
<?php
}
?>

<?php
if($pageRequest==$PAGE_REQUEST_TYPE_HOME){
	//
?>
<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_DEPARTMENTS){
?>
	<!-- SUB0MENU NAV -->
	<div class="headerSubNavigationContainer" style="width:100%; display:table; text-align:center; vertical-align:middle;">
	<?php
				$pageListSubmenu = [
				[
					"title" => "Nursery",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_NURSERY
				],
				[
					"title" => "Kindergarten",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_KINDERGARTEN
				],
				[
					"title" => "Elementary",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_ELEMENTARY
				],
				[
					"title" => "Junior High",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_JUNIORHIGH
				],
				[
					"title" => "High School",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_HIGHSCHOOL
				],
				[
					"title" => "Korean School",
					"page" => $PAGE_REQUEST_TYPE_DEPARTMENTS,
					"sp" => $SUBPAGE_REQUEST_TYPE_KOREANSCHOOL,
					"url" => "http://www.google.com"
				],
				];
			?>
		<?php create_navigation($pageListSubmenu, $pageRequest, $subpageRequest) ?> 
		<!-- "display:inline-block;  vertical-align:middle;");  -->
	</div>
	<?php

	$departmentPageDataPageNursery = [
		"heading" => "NURSERY",
		"statement_title" => "Nursery of Overflowing Love",
		"statement_body" => "And now these three remain: fath, hope and love, but the greatest of these is love. - 1 Corinthians 13:13",
		"statement_image_suffix" => "featured_nursery.png",
		"statement_color_bg" => "#CBC42D",
		"statement_color_top" => "#BBBB22",
		"statement_color_bot" => "#BBBB22",
		"services" => [
			[
				"title" => "Sunday Worship<br/>1st Service",
				"body" => "9:00 AM<br/>@ Nursery Worship Room<br/>(in Nursery Building)"
			],
			[
				"title" => "Sunday Worship<br/>2nd Service",
				"body" => "11:00 AM<br/>@ Nursery Worship Room<br/>(in Nursery Building)"
			],
			[
				"title" => "Friday Night<br/>Fellowship",
				"body" => "8:00 PM<br/>@ Nursery Building"
			]
		],
		"personnel" => [
			[
				"display_name" => "Jessica Won",
				"display_email" => "jcb4jessica@gmail.com",
				"display_phone" => "(323) 203-4044",
				"image_relative_path" => "ce-jessica.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "The Nursery department at LACPC envisions a children's ministry that follows the overarching theme of the education department, \"Father's House.\" Through nursery department's worship, gudance, and nuturing, we hope to restablish the following:"
			],
			[
				"type" => "featured",
				"display" => "1"
			],
			[
				"type" => "info",
				"display" => "Family worships and communication with families that will enrich the spiritual lives of our young children."
			],
			[
				"type" => "featured",
				"display" => "2"
			],
			[
				"type" => "info",
				"display" => "Family visitations that will enhance the love of God."
			],
			[
				"type" => "featured",
				"display" => "3"
			],
			[
				"type" => "info",
				"display" => "Revival and acceptance of multicultural children and families."
			],
		],
		"image_gallery" => [ // TODO : NURSERY IMAGES
			"prefix" => relativePathIMG()."departments/galleries/"."elementary/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png",
				"gallery_03.png",
				"gallery_04.png",
				"gallery_05.png",
				"gallery_06.png",
				"gallery_07.png",
				"gallery_08.png",
				"gallery_09.png"
			]
		]
	];
	$departmentPageDataPageKindergarden = [
		"heading" => "KINDERGARDEN",
		"statement_title" => "Grown in Christ, as God's Children",
		"statement_body" => "Worship the LORD with gladness: come before him with joyful song. - Psalm 100:2",
		"statement_image_suffix" => "featured_kindergarden.png",
		"statement_color_bg" => "#E0D011",
		"statement_color_top" => "#DDC313",
		"statement_color_bot" => "#DDC313",
		"services" => [
			[
				"title" => "Sunday Worship",
				"body" => "11:00 AM<br/>@ Kindergarden Worship Room<br/>(in Kindergarden Building)"
			],
			[
				"title" => "Sunday Bible Study",
				"body" => "11:40 AM<br/>@ Classroom #302, 303, 306<br/>(in Kindergarden Building)"
			],
			[
				"title" => "Friday Night<br/>Bible Study",
				"body" => "8:00 PM<br/>@ Classroom #303<br/>(in Kindergarden Building)"
			]
		],
		"personnel" => [
			[
				"display_name" => "Sheen Hong",
				"display_email" => "Pastorhong71@gmail.com",
				"display_phone" => "(213) 369-5590",
				"image_relative_path" => "ce-hong.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "As a goal, let children grow in the Lord Jesus Christ, building the image of God through the \"Word of God.\" Becoming disciples of Jesus in the joy of worshipping God as well as becoming evangelists of Jesus in Children's lives."
			],
			[
				"type" => "bold",
				"display" => "For families, Christian education builds up in a family and provide parents with training opportunities and teaching materials to be active ministry supporters."
			],
		],
		"image_gallery" => [
			"prefix" => relativePathIMG()."departments/galleries/"."kindergarden/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png",
				"gallery_03.png",
				"gallery_04.png",
				"gallery_05.png",
				"gallery_06.png",
				"gallery_07.png"
			]
		]
	];
	$departmentPageDataPageElementary = [
		"heading" => "ELEMENTARY",
		"statement_title" => null,
		"statement_body" => "Start children off on the way they should go, and even when they are old they will not turn from it - Proverbs 22:6",
		"statement_image_suffix" => "featured_elementary.png",
		"statement_color_bg" => "#F1592A",
		"statement_color_top" => "#DD5526",
		"statement_color_bot" => "#DD5526",
		"services" => [
			[
				"title" => "Sunday Worship",
				"body" => "11:00 AM<br/>@ Elementary Worship Room"
			],
			[
				"title" => "Sunday Worship<br/>2nd Service",
				"body" => "11:45 AM<br/>@ Classroom #138, 139, 140, 141, 142"
			],
			[
				"title" => "Friday Program: AWANA",
				"body" => "8:00 - 8:30 PM<br/>Game Time (Cafeteria)<br/><br/>8:30 - 9:00 PM<br>Handbook Time<br/>(Classrooms)<br/><br/>9:00 - 9:20 PM<br/>Coundil Time (Choir Room)"
			]
		],
		"personnel" => [
			[
				"display_name" => "Pastor Boram Lee",
				"display_email" => "boramjdsn@gmail.com",
				"display_phone" => "(909) 868-8457",
				"image_relative_path" => "ce-boram.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "Elementary Department's vision and goal is to start children off on their journey of faith through:"
			],
			[
				"type" => "featured",
				"display" => "1"
			],
			[
				"type" => "info",
				"display" => "Fostering a joy and desire to lean about God (fun and engaging worship, bible studies, and events)"
			],
			[
				"type" => "featured",
				"display" => "2"
			],
			[
				"type" => "info",
				"display" => "Implementing the basic Christian disciplines (prayer, quiet time, bible reading)"
			],
			[
				"type" => "featured",
				"display" => "3"
			],
			[
				"type" => "info",
				"display" => "Encouraging an active Christian lifestyle (knowledge into action)"
			],
		],
		"image_gallery" => [
			"prefix" => relativePathIMG()."departments/galleries/"."elementary/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png",
				"gallery_03.png",
				"gallery_04.png",
				"gallery_05.png",
				"gallery_06.png",
				"gallery_07.png",
				"gallery_08.png",
				"gallery_09.png"
			]
		]
	];
	$departmentPageDataPageJRHigh = [
		"heading" => "\"HIS\" JR. HIGH",
		"statement_title" => "Live for the Lord for ee are His",
		"statement_body" => "If we live, we live to the Lord; and if we die, we die to the Lord. So, whether we live or die, we belong to the Lord. -?",
		"statement_image_suffix" => "featured_jrhigh.png",
		"statement_color_bg" => "#BA1E71",
		"statement_color_top" => "#B91370",
		"statement_color_bot" => "#B91370",
		"services" => [
			[
				"title" => "Sunday Worship",
				"body" => "11:00 AM<br/>@ Junior High Worship Room"
			],
			[
				"title" => "Sunday Bible Study",
				"body" => "12:00 PM<br/>@ Classroom #150, 152, 153"
			],
			[
				"title" => "Friday Night Bible Study",
				"body" => "8:00 PM<br/>@ Junior High Worship Room"
			]
		],
		"personnel" => [
			[
				"display_name" => "Reverend Joseph Kim",
				"display_email" => "jmkim75@gmail.com",
				"display_phone" => "(213) 200-6092",
				"image_relative_path" => "ce-joe.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "We belong to God and belonging to God is the greatest blessing and encouragement that anyone can have. Being His is a great blessing but another aspect of being His is to live and die for Him. Our lives belong to Him therfore we should live our lives accodring to His will."
			],
		],
		"image_gallery" => [
			"prefix" => relativePathIMG()."departments/galleries/"."jrhigh/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png",
				"gallery_03.png",
				"gallery_04.png",
				"gallery_05.png",
				"gallery_06.png",
				"gallery_07.png",
				"gallery_08.png",
				"gallery_09.png",
				"gallery_10.png"
			]
		]
	];
	$departmentPageDataPageHighSchool = [
		"heading" => "HIGH SCHOOL",
		"statement_title" => null,
		"statement_body" => "But seek first his kingdom and his righteousness, and all these things will be given to you as well. Therefore do not worry about tomorrow, for tomorrow will worry about itself.",
		"statement_image_suffix" => "featured_highschool.png",
		"statement_color_bg" => "#3B1955",
		"statement_color_top" => "#361650",
		"statement_color_bot" => "#361650",
		"services" => [
			[
				"title" => "Sunday Worship",
				"body" => "11:00 AM<br/>@ High School Worship Room"
			],
			[
				"title" => "Sunday Bible Study",
				"body" => "12:00 PM<br/>@ Classroom #135, 136, 137, 148"
			],
			[
				"title" => "Friday Night Bible Study",
				"body" => "8:00 PM<br/>@ High School Worship Room"
			]
		],
		"personnel" => [
			[
				"display_name" => "Andrew Lim",
				"display_email" => "mrlimshhs@gmail.com",
				"display_phone" => "(626) 536-6126",
				"image_relative_path" => "ce-andy.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "Our mission is to help take the next step in their spiritual lives and grown in maturity in their relationship with Jesus. The high school years are a challenging time when sudents have so many other activities competing for their time and energy, and we emphasize prioritizing their personal relationship with Jesus amidst all of the busyness in their lives. Students are encouraged to go beyond a simple emotional relationship with God and have a relationship marked by spiritual discipline and obedience."
			],
		],
		"image_gallery" => [
			"prefix" => relativePathIMG()."departments/galleries/"."highschool/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png"
			]
		]
	];
	$departmentPageData = null;
	if($subpageRequest==$SUBPAGE_REQUEST_TYPE_NURSERY){
		$departmentPageData = $departmentPageDataPageNursery;
	}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_KINDERGARTEN){
		$departmentPageData = $departmentPageDataPageKindergarden;
	}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_ELEMENTARY){
		$departmentPageData = $departmentPageDataPageElementary;
	}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_JUNIORHIGH){
		$departmentPageData = $departmentPageDataPageJRHigh;
	}else if($subpageRequest==$SUBPAGE_REQUEST_TYPE_HIGHSCHOOL){
		$departmentPageData = $departmentPageDataPageHighSchool;
	}
	?>
	<div class="limitedWidth" style="display:block; background-color:<?php echo $departmentPageData["statement_color_bg"]; ?>; text-align:center; position:relative; border-style:solid; border-width:2px 0px 2px 0px; border-top-color:<?php echo $departmentPageData["statement_color_top"]; ?>; border-bottom-color:<?php echo $departmentPageData["statement_color_bot"]; ?>;">
		<div class="departmentStatementContainer" style="">
			<div class="departmentStatementTitle" style=""><?php echo $departmentPageData["statement_title"]; ?></div>
			<div class="departmentStatementBody" style=""><?php echo $departmentPageData["statement_body"]; ?></div>
		</div>
		<div class="departmentStatementLogoContainer" style="">
			<img src="./wp-content/themes/giau/img/departments/<?php echo $departmentPageData["statement_image_suffix"]; ?>" class="departmentStatementLogo" style="" />
		</div>
	</div>
	<!-- <div class="" style="display:block; background-color:#0F0; text-align:center;">
		<img src="./wp-content/themes/giau/img/departments/icon_leaf.png" style="max-width:100%; height:100px;" />
	</div> -->

		<!-- PHOTO GALLERY -->
	<div class="limitedWidth"  style="background-color: rgba(255,255,255,1.0);">
		<div class="giauImageGallery giauImageGalleryShowNavigation" data-autoplay="10000" style="position:relative; width:100%; height:400px;">
			<?php 
				$galleryImageContainer = $departmentPageData["image_gallery"];
				if($galleryImageContainer){
					$galleryPrefix = $galleryImageContainer["prefix"];
					if(!$galleryPrefix){
						$galleryPrefix = "";
					}
					$galleryImages = $galleryImageContainer["images"];
					if($galleryImages){
						$i;
						$len = sizeof($galleryImages);
						for($i=0; $i<$len; ++$i){
							$image = $galleryImages[$i];
							?>
							<div data-source="<?php echo $galleryPrefix.$image; ?>" style="display:none;"></div>
							<?php
						}
					}
				}
			?>
		</div>
	</div>



	<div class="" style="display:block; background-color:#FFF; padding:20px;">
		<div class="" style="display:table; width: 100%; text-align:center;">
			<div class="" style="display:table-row; text-align:center;">
			<?php
				$servicesList = $departmentPageData["services"];
				if($servicesList && sizeof($servicesList)>0 ){
				$len = sizeof($servicesList);
				$i;
				for($i=0; $i<$len; ++$i){
					$service = $servicesList[$i];
					$title = $service["title"];
					$body = $service["body"];
			?>
				<div class="departmentScheduleItemContainer" style="">
					<div class="departmentScheduleItemTitle"><?php echo $title; ?></div>
					<div class="departmentScheduleItemInfo"><?php echo $body; ?></div>
				</div>
			<?php
				}
				}
			?>
			</div>
		</div>
	</div>
	<div class="" style="display:table; position:relative; width:100%;">
		<div style="display:table-cell; width:40%; vertical-align:top; text-align:center;">
		<?php
			$personnel = $departmentPageData["personnel"][0];
			if($personnel){
				$image = $personnel["image_relative_path"];
				$name = $personnel["display_name"];
				$email = $personnel["display_email"];
				$phone = $personnel["display_phone"];
		?>
			<img class="departmentInstructorDescription" src="./wp-content/themes/giau/img/personnel/<?php echo $image; ?>" style="width:100px; border-radius: 50%; display:inline-block;">
			<div class="departmentInstructorDescriptionTitle"><?php echo $name; ?></div>
			<div class="departmentInstructorDescriptionInfo"><?php echo $email; ?></div>
			<div class="departmentInstructorDescriptionInfo"><?php echo $phone; ?></div>
		<?php
			}
		?>
		</div>
		<div style="display:table-cell; width:60%; vertical-align:top; text-align:center; padding:0px 20px 0px 20px;">
		<?php
			$breakdownList = $departmentPageData["breakdown"];
			if($breakdownList){
				$len = sizeof($breakdownList);
				$i;
			for($i=0; $i<$len; ++$i){
				$item = $breakdownList[$i];
				$type = $item["type"];
				$display = $item["display"];
				if($type=="bold"){
		?>
			<div class="departmentDescriptionItemBold"><?php echo $display; ?></div>
			<?php
				}else if($type=="featured"){
			?>
			<div class="departmentDescriptionItemFeatured"><?php echo $display; ?></div>
			<?php
				}else if($type=="info"){
			?>
			<div class="departmentDescriptionItemInfo"><?php echo $display; ?></div>
			<?php
				}
			?>
			
		<?php
			}
			}
		?>
		</div>
	</div>





	<!-- CALENDAR EVENTS -->
	<div class="sectionContainerDepartments limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">Schedule of Events</div>
		<div class="departmentInternalContainer">
			<div class="giauCalendarList"></div>
		</div>
		<div class="footerSectionMain"></div>
	</div>


<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_STAFF){
?>
	<!-- STAFF BIOGRAPHIES -->
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">MEET THE STAFF</div>
			<div class="giauBiographyList"></div>
		<div class="footerSectionMain"></div>
	</div>
<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_FORMS){
?>
	
	<!-- DOWNLOADS -->
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<!-- <div class="headerSectionMain">FORMS</div> -->
		<div class="titleSectionMain">Download forms and documentation here:</div>
		<div class="formItemDownload">
			<a href="<?php echo relativePathUploads()."/lacpc_medical_release_form_2016_2017.pdf"; ?>">LACPC Medical Release Form 2016-2017 (pdf)</a>
		</div>
		<div class="formItemDownload">
			<a href="<?php echo relativePathUploads()."/photograph_release_form.pdf"; ?>">LACPC Photograph Release Form (pdf)</a>
		</div>
	</div>
<?php
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
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="addressSectionTitle">Los Angeles Presbyterian Church</div>
		<div class="addressSectionDescription">2241 N. Eastern Ave. Los Angeles, CA 90032</div>
		<div class="addressSectionDivider"></div>
	</div>
	
	<!-- GOOGLE MAP -->
	<div class="limitedWidth"  style="background-color: rgba(255,255,255,0.0); text-align:center; width:100%;">
	<script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script>
	<div style='overflow:hidden;height:400px;width:100%; display:inline-block; margin: 0 auto;'>
		<div id='gmap_canvas' style='height:400px;width:100%;'></div>
<!-- 		<div><small><a href="http://embedgooglemaps.com">embed google maps</a></small></div>
		<div><small><a href="http://www.proxysitereviews.com/lime-proxies">lime proxies</a></small></div> -->
		<style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div>
		<script type='text/javascript'>
		function init_map(){var myOptions = {zoom:10,center:new google.maps.LatLng(34.0709617,-118.1812235),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(34.0709617,-118.18122349999999)});infowindow = new google.maps.InfoWindow({content:'<strong>The Father\'s House</strong><br>2241 N Eastern Ave<br/>Los Angeles, CA 90032<br/>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);
		</script>
	</div>

	
	<!-- CONTACT -->
	<div class="limitedWidth" style="">
		<div class="giauContactForm"></div>
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
?>

	<!-- DEBUGGING -->
	<!-- <?php echo $pageRequest; ?> -->

	<!-- FOOTER -->
	<div class="sectionContainerFooter" style="background-color: #<?php echo getColorHexFooter(); ?>;">
		<!-- <div class="footerElementLogo">
			<img style="width:150px;" src="<?php echo relativePathIMG()."logo_fathers_house.png" ?>" />
		</div> -->
		<div class="footerElementTitle">THE FATHER'S HOUSE</div>
		<div class="footerElementSocialGrouping">
		<a href="https://www.facebook.com/thefathershouse.lacpc"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_facebook.png" ?>" /></a>
		<a href="https://twitter.com/thefathersh0use?lang=en"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_twitter.png" ?>" /></a>
			<img class="footerElementSocialItem" style="opacity: 0.25;" src="<?php echo relativePathIMG()."social/icon_footer_instagram.png" ?>" />
			<a href="mailto:ce@lacpc.org"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_email.png" ?>" /></a>
		</div>
		<div class="footerElementTextLine">Los Angeles Presbyterian Church</div>
		<div class="footerElementTextLine">2241 N. Eastern Ave.</div>
		<div class="footerElementTextLine">Los Angeles, CA 90032</div>
		<div class="footerElementTextLine">&nbsp;</div>
		<div class="footerElementTextCopyright">LACPC Christian Education &copy; 2016</div>
		<div class="footerElementBottom"></div>
	</div>
	<!-- <?php create_footer(); ?> -->
	
	</body>
</html>
<?php
}


/*

departments
border:EEF0EF
body: #EFF1F0


pages = {
	name: "nursery", title: "Nursery"
	title: "Kindergarten"
	title: "Elementary"
	title: "Junior High"
	title: "High School"
	title: "Korean School"
}

*/
function create_language_switch($overrideCSS,$additionalHTML){
	$additionalHTML = $additionalHTML ? $additionalHTML : "";
	?>
			<div class="languageSwitchContainer giauLanguageToggleSwitch" style="display:table-cell; padding:10px; vertical-align:middle; text-align:right;"  data-storage="<?php echo KEY_COOKIE_PARAM_LANGUAGE(); ?>"  <?php echo $additionalHTML; ?> >
				<div style="display:inline-block;" data-language="en" data-display="EN" data-url="./"></div>
				<div style="display:inline-block;" data-language="ko" data-display="KO" data-url="./"></div>
			</div>
<?php
}
function create_navigation($pageList, $currentPageName, $currentSubPageName, $additional, $additionalData){
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
	?>
	<footer>
	<div class="footerContainer">
		<div class="footerLogo"></div>
		<div class="footerSocialMedia"></div>
		<div class="footerContact">
			Los Angeles Presbyterian Church
			2241 N. Eastern Ave.
			Los Angeles, CA 90032
		</div>
	</div>
	</footer>
	<?php
}





?>







