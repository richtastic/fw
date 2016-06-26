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


function relativePathUploads(){
	return getTemplateURIPath()."uploads/";
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
	$root = site_url();
	return $root."?page=".$pageName;
}

function create_page(){
	$relativePathJSFF = relativePathJS()."code/";
	$fileJavaScriptFF = relativePathJS()."code/FF.js";
	$fileCSSMain = relativePathCSS()."theme.css";
	$fileJavaScriptMain = relativePathJS()."theme.js";
	
	$PAGE_REQUEST_TYPE_HOME = "home";
	$PAGE_REQUEST_TYPE_DEPARTMENTS = "departments";
	$PAGE_REQUEST_TYPE_STAFF = "staff";
	$PAGE_REQUEST_TYPE_FORMS = "forms";
	$PAGE_REQUEST_TYPE_LOCATION = "location";
	$PAGE_REQUEST_TYPE_CONTACT = "contact";

	$pageList = [
				[
					"title" => "Home",
					"name" => $PAGE_REQUEST_TYPE_HOME
				],[
					"title" => "Departments",
					"name" => $PAGE_REQUEST_TYPE_DEPARTMENTS
				],[
					"title" => "Staff",
					"name" => $PAGE_REQUEST_TYPE_STAFF
				],[
					"title" => "Forms",
					"name" => $PAGE_REQUEST_TYPE_FORMS
				],[
					"title" => "Directions",
					"name" => $PAGE_REQUEST_TYPE_LOCATION
				],[
					"title" => "Contact Us",
					"name" => $PAGE_REQUEST_TYPE_CONTACT
				]
				];

	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), $PAGE_REQUEST_TYPE_HOME );
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
	<div class="featurePresentationContainer giauImageGallery giauImageGalleryAutomated" style="">
		<!-- FEATURE INFO OVERLAY -->
		<div class="featureInfoOverlay giauInfoOverlay" style="">
			<div class="featureInfoOverlayTitle" style="margin: 0 auto; ">JOIN US FOR WORSHIP</div>
			<div></div>
			<div class="featureInfoOverlaySubtitle">Every Sunday at 11:00 a.m.</div>
			<div></div>
			<!-- <a href="http://www.google.com"> -->
			<div class="featureInfoOverlayButton" style="" >Directions</div>
			<!-- </a> -->
		</div>
		<!-- HEADER -->
		<div class="headerNavigationContainer" style="position:absolute;">
			<!-- LOGO -->
			<div class="organizationLogoContainer" style="display:inline-block; float:left; left:0; top:0; "><img class="navigationMenuLogo" src="<?php echo relativePathIMG()."logo_fathers_house.png" ?>" /></div>
			<!-- LANGUAGE SWITCH -->
			<div class="languageSwitchContainer" style="display:inline-block; float:right; padding:10px;">EN | 한국어</div>
			<!-- NAVIGATION -->
			<!-- <div class="giauNavigationItemList navigationContainer" style="display:inline-block; position:relative; text-align: center; float:right; padding:6px;" >Home, Departments, Staff, Forms, Directions, Contact Us</div> -->
			<?php create_navigation($pageList, $pageRequest); ?>
			
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

	<!-- INFO STATEMENT GROUP -->
	<div class="sectionContainerMissionStatement limitedWidth"  style="background-color: rgba(230,228,222,1.0);">
		<div class="centeredText ultraImportantText">THROUGH WORSHIP,</div>
		<div class="centeredText importantText">Bible Study & accountability</div>
		<div class="centeredText standardText">we strive to provide an environment for our <b>children and youth</b> to experience the grace of God.</div>
		<div class="centeredText standardText">In addition, we aim to serve <b>parents and entire families</b> as well.</div>
		<div class="centeredText standardText">More than just a children and youth ministry, our Christian Education department is a <b>family ministry</b></div>
	</div>

	<!-- PHOTO GALLERY -->
	<div class="limitedWidth"  style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">PHOTOS</div>
		<div class="giauImageGallery giauImageGalleryShowNavigation" style="position:relative; width:100%; height:400px;"></div>
	</div>


	<!-- CALENDAR EVENTS -->
	<div class="sectionContainerDepartments limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">UPCOMING EVENTS</div>
		<div class="departmentInternalContainer">
			<div class="giauCalendarList"></div>
		</div>
		<div class="footerSectionMain"></div>
	</div>


	<!-- INFO STATEMENT GROUP 2 -->
	<div class="sectionContainerMissionStatement limitedWidth"  style="background-color: rgba(230,228,222,1.0);">
		<div class="centeredText ultraImportantText">Deuteronomy 6:6-7</div>
		
		<div class="centeredText standardText">"These commandments I give you today are to be upon your hearts.</div>
		<div class="centeredText standardText">Impress them on your children. Talk about them when you sit at home and</div>
		<div class="centeredText standardText">when you walk along the road, when you are down and when you get up."</div>
	</div>

	<!-- QUOTE GALLERY -->
<!--
	<div class=""  style="height:400px; background-color: rgba(0,255,255,0.5);">
		<div class="">quotes</div>
	</div>
-->
	
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
		<div class="headerSectionMain">FORMS</div>
		<a href="<?php echo relativePathUploads()."/lacpc_medical_release_form_2015_2016.pdf"; ?>">lacpc_medical_release_form_2015_2016.pdf</a>
	</div>
<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_LOCATION){
?>
		<!-- GOOGLE MAP -->
	<div class="limitedWidth"  style="background-color: rgba(255,0,5,0.5); text-align:center; width:100%;">
	<script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script>
	<div style='overflow:hidden;height:400px;width:100%; display:inline-block; margin: 0 auto;'>
		<div id='gmap_canvas' style='height:400px;width:100%;'></div>
<!-- 		<div><small><a href="http://embedgooglemaps.com">embed google maps</a></small></div>
		<div><small><a href="http://www.proxysitereviews.com/lime-proxies">lime proxies</a></small></div> -->
		<style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div>
		<script type='text/javascript'>
		function init_map(){var myOptions = {zoom:10,center:new google.maps.LatLng(34.0709617,-118.18122349999999),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(34.0709617,-118.18122349999999)});infowindow = new google.maps.InfoWindow({content:'<strong>The Father\'s House</strong><br>2241 N Eastern Ave<br/>Los Angeles, CA 90032<br/>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);
		</script>
	</div>

<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_CONTACT){
?>
	<!-- CONTACT -->
	<div class="limitedWidth" style="background-color: rgba(0,255,255,0.5);">
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
	<?php echo $pageRequest; ?>

	<!-- FOOTER -->
	<div class="sectionContainerFooter" style="background-color: #303030;">
		<div class="footerElementLogo">
			<img style="width:150px;" src="<?php echo relativePathIMG()."logo_fathers_house.png" ?>" />
		</div>
		<div class="footerElementSocialGrouping">
		<a href="https://www.facebook.com/thefathershouse.lacpc"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_facebook.png" ?>" /></a>
		<a href="https://twitter.com/thefathersh0use?lang=en"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_twitter.png" ?>" /></a>
			<img class="footerElementSocialItem" style="opacity: 0.25;" src="<?php echo relativePathIMG()."social/icon_footer_instagram.png" ?>" />
			<a href="mailto:ce@lacpc.org"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_email.png" ?>" /></a>
		</div>
		<div class="footerElementTextLine">Los Angeles Presbyterian Church</div>
		<div class="footerElementTextLine">2241 N. Eastern Ave.</div>
		<div class="footerElementTextLine">Los Angeles, CA 90032</div>
		<div class="footerElementBottom"></div>
	</div>
	<!-- <?php create_footer(); ?> -->
	
	</body>
</html>
<?php
}



function create_navigation($pageList, $currentPageName){
	?>
	<div class="giauNavigationItemList navigationContainer" style="display:inline-block; position:relative; text-align: center; float:right; padding:6px;" >
		<ul><?php
			foreach($pageList as $pageData){
				$pageName = $pageData["name"];
				$pageDisplayTitle = $pageData["title"];
				$pageURL = page_link_from_page_name($pageName);
				?>
				<li class="navigationMenuItem">
					<div class="display"><?php echo $pageDisplayTitle; ?></div>
					<div class="url"><?php echo $pageURL; ?></div>
					<?php
					if( strcmp($pageName,$currentPageName)==0 ){
						?>
						<div class="selected"></div>
						<?php
					}
					?>
				</li>
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
