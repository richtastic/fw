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
		<title>Follow The Leader</title>
		<link rel="stylesheet" href="<?php echo $fileCSSMain; ?>">
		<script rel="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptFF; ?>"></script>
		<script rel="text/javascript" src="<?php echo $fileJavaScriptMain; ?>"></script>
		<script type="text/javascript">
			// START
				$(document).ready( function(){
					console.log(FF)
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
	</head>
	<body style="bgColor:#F00;">

	<!-- HEADER NAVIGATION -->
	<!-- <?php create_navigation($pageList); ?> -->

	<!-- FEATURE IMAGE -->
	<div class="featurePresentationContainer giauImageGallery"></div>


	<!-- <div class="imageTitleHeading">JOIN US FOR WORSHIP</div>
	<div class="imageTitleInfo">Every Sunday at 11:00 a.m.</div>
	<div class="imageTitleButton">Directions</div> -->

	<!-- DEPARTMENTS -->
	<!-- <div class="">departments</div> -->

	<!-- INFO STATEMENT GROUP -->

	<!-- PHOTO GALLERY -->

	<!-- QUOTE GALLERY -->

	<!-- CALENDAR SCHEDULE -->


	<!-- DEBUGGING -->
	<?php echo $pageRequest; ?>

	<!-- FOOTER -->
	<!-- <?php create_footer(); ?> -->
	
	</body>
</html>
<?php
}



function create_navigation($pageList){
	?>
	<div class="navigationMenuContainer">
	<div class="navigationMenuLogoContainer"><img class="navigationMenuLogo" src="<?php echo relativePathIMG()."navLogo.png" ?>"></div>
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
