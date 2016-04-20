<?php
// functions.php

function KEY_GET_PARAM_PAGE(){
	return "page";
}

function getTemplateURIPath(){
	return get_template_directory_uri()."/";
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
	$fileCSSMain = relativePathCSS()."theme.css";
	$pageRequest = getParameterOrDefault( KEY_GET_PARAM_PAGE(), "" );
	$pageList = ["Home", "Departments", "Staff", "Forms", "Directions", "Contact Us"];

?>
<html>
	<head>
		<title>Follow The Leader</title>
		<link rel="stylesheet" href="<?php echo $fileCSSMain; ?>">
	</head>
	<body style="bgColor:#F00;">
	<?php create_navigation($pageList); ?>
	<div class="imageTitleHeading">JOIN US FOR WORSHIP</div>
	<div class="imageTitleInfo">Every Sunday at 11:00 a.m.</div>
	<div class="imageTitleButton">Directions</div>
	<footer>
		<?php echo $pageRequest; ?>
	</footer>
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

?>
