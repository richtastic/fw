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
					"page" => $PAGE_REQUEST_TYPE_INFO
				]
				];

	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), $PAGE_REQUEST_TYPE_HOME );
	$subpageRequest = getParameterOrDefault( KEY_GET_PARAM_SUBPAGE(), $PAGE_REQUEST_TYPE_HOME );
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
		<div class="giauImageGallery giauImageGalleryShowNavigation" style="position:relative; width:100%; height:400px;"></div>
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

	
	<!-- FEATURE TITLE -->
	<div class="headerTitleContainer" style="display:block;">
		<div class="headerNavigationContainer" style="display:table;">
			
			<!-- LOGO -->
			<div class="organizationTitleContainer" style="display:table-cell;  border-collapse: collapse; ">
				<div class="mainNavigationBarTitle" >THE FATHER'S HOUSE</div>
				<div class="mainNavigationBarHeading" >FORMS</div>
			</div>
			<!-- NAVIGATION -->
			<?php create_navigation($pageList, $pageRequest, null); ?>
			<!-- LANGUAGE SWITCH -->
			<div class="languageSwitchContainer giauLanguageToggleSwitch" style="display:table-cell; padding:10px; color:#000;">
				<div style="display:inline-block;" data-language="en">EN</div>
				<div style="display:inline-block;" data-language="ko">KO</div>
			</div>

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
	<div class="headerSubNavigationContainer" style="height:50px; width:100%; display:table; text-align:center; vertical-align:middle;">
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
					"sp" => $SUBPAGE_REQUEST_TYPE_KOREANSCHOOL
				],
				];
			?>
		<?php create_navigation($pageListSubmenu, $pageRequest, $subpageRequest) ?> 
		<!-- "display:inline-block;  vertical-align:middle;");  -->
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
	<div class="sectionContainerBiographies limitedWidth" style="background-color: rgba(255,255,255,1.0);">
		<div class="headerSectionMain">DIRECTIONS</div>
	</div>

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
		function init_map(){var myOptions = {zoom:10,center:new google.maps.LatLng(34.0709617,-118.18122349999999),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(34.0709617,-118.18122349999999)});infowindow = new google.maps.InfoWindow({content:'<strong>The Father\'s House</strong><br>2241 N Eastern Ave<br/>Los Angeles, CA 90032<br/>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);
		</script>
	</div>

<?php
}else if($pageRequest==$PAGE_REQUEST_TYPE_CONTACT){
?>
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
function create_navigation($pageList, $currentPageName, $currentSubPageName){
	$isTable = true;
	$displayType = null;
	?>
	<div class="giauNavigationItemList navigationContainer" style="<?php
	if($displayType!=null){
		echo $displayType;
	}else{
		if($isTable){ ?>
		display:table-cell; vertical-align:middle; text-align:center;
		<?php
		}else{ ?>
		display:inline-block; position:relative; text-align: center; float:right; padding:6px; <?php
		}
	}
	?> " >
		<ul><?php
			foreach($pageList as $pageData){
				$pageName = $pageData["page"];
				$subPageName = $pageData["sp"];
				$pageDisplayTitle = $pageData["title"];
				$pageURL = page_link_from_page_name_subpage($pageName,$subPageName);
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







