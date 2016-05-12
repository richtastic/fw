<?php
// functions.php

function KEY_GET_PARAM_PAGE(){
	return "page";
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


function create_page(){
	$relativePathJSFF = relativePathJS()."code/";
	$fileJavaScriptFF = relativePathJS()."code/FF.js";
	$fileCSSMain = relativePathCSS()."theme.css";
	$fileJavaScriptMain = relativePathJS()."theme.js";
	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), "" );
	$pageList = ["Home", "Departments", "Staff", "Forms", "Directions", "Contact Us"];

?>
<html>
	<head>
		<title>The Father's House</title>
		<link rel="stylesheet" href="<?php echo $fileCSSMain; ?>">
		<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptMain; ?>"></script>
		<script type="text/javascript">
			// START
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
	<body style="bgColor:#F00;">

	<!-- HEADER NAVIGATION -->
	<!-- <?php create_navigation($pageList); ?> -->

	<!-- FEATURE IMAGE -->
	<div class="featurePresentationContainer giauImageGallery" style="">
		<!-- FEATURE INFO OVERLAY -->
		<div class="featureInfoOverlay giauInfoOverlay" style="">
			<div class="featureInfoOverlayTitle" style="margin: 0 auto; ">JOIN US FOR WORSHIP</div>
			<div></div>
			<div class="featureInfoOverlaySubtitle">Every Sunday at 11:00 a.m.</div>
			<div></div>
			<a href="http://www.google.com">
			<div class="featureInfoOverlayButton" style="" >Directions</div>
			</a>
		</div>
		<!-- HEADER -->
		<div class="headerNavigationContainer" style="position:relative;">
			<!-- LOGO -->
			<div class="organizationLogoContainer" style="display:inline-block; position:absolute; left:0; top:0; "><img class="navigationMenuLogo" src="<?php echo relativePathIMG()."navLogo.png" ?>" /></div>
			<!-- NAVIGATION -->
			<div class="navigationContainer" style="display:inline-block; margin: 0 auto; text-align: center;  position:absolute; top:0; ">Home, Departments, Staff, Forms, Directions, Contact Us</div>
			<!-- LANGUAGE SWITCH -->
			<div class="languageSwitchContainer" style="display:inline-block; position:absolute; right:0; top:0;  ">EN | 한국어</div>
		</div>
	</div>


	<!-- DEPARTMENTS -->
	<div class="sectionContainerDepartments" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">DEPARTMENTS</div>
		<div class="departmentInternalContainer">
			<div class="giauCategoryListing"></div>
		</div>
		<div class="footerSectionMain"></div>
	</div>

	<!-- INFO STATEMENT GROUP -->
	<div class="sectionContainerMissionStatement"  style="background-color: rgba(230,228,222,1.0);">
		<div class="centeredText ultraImportantText">THROUGH WORSHIP,</div>
		<div class="centeredText importantText">Bible Study & accountability</div>
		<div class="centeredText standardText">we strive to provide an environment for our <b>children and youth</b> to experience the grace of God.</div>
		<div class="centeredText standardText">In addition, we aim to serve <b>parents and entire families</b> as well.</div>
		<div class="centeredText standardText">More than just a children and youth ministry, our Christian Education department is a <b>family ministry</b></div>
	</div>

	<!-- PHOTO GALLERY -->
	<div class=""  style="height:400px; background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">PHOTOS</div>
	</div>

	<!-- QUOTE GALLERY -->
	<div class=""  style="height:400px; background-color: rgba(0,255,255,0.5);">
		<div class="">quotes</div>
	</div>

	<!-- CALENDAR SCHEDULE -->
	<div class=""  style="height:400px; background-color: rgba(255,0,5,0.5);">
		<div class="">info</div>
	</div>

	<!-- DEBUGGING -->
	<?php echo $pageRequest; ?>

	<!-- FOOTER -->
	<div class=""  style="height:400px; background-color: #303030;">
		<div class="">info</div>
	</div>
	<!-- <?php create_footer(); ?> -->
	
	</body>
</html>
<?php
}



function create_navigation($pageList){
	?>
	<div class="navigationMenuContainer">
	<div class="navigationMenuLogoContainer">
		<img class="navigationMenuLogo" src="<?php echo relativePathIMG()."navLogo.png" ?>" />
	</div>
	<ul><?php
		foreach($pageList as $pageName){
			?>
			<li class="navigationMenuItem"><?php echo $pageName; ?></li>
			<?php
		}
	?></ul></div>
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
