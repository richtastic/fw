<?php
// widgets.php





function fillOutPageFromID($pageID){
	$page = giau_get_page_id($pageID);
	if($page!=null){
		fillOutFromSectionList($page["sectionList"]);
	}else{
		error_log("NO PAGE");
	}
}

function fillOutFromSectionList($sectionList){
	if($sectionList){
		$sectionList = explode(",",$sectionList);
		foreach($sectionList as $sectionID){
			fillOutSectionFromID($sectionID);
		}
	}
}

function fillOutSectionFromID($sectionID){
	//error_log("fillOutSectionFromID: ".$sectionID);
	$section = giau_get_section_id($sectionID);
	if($section!=null){
		$widgetID = $section["widget"];
		$widget = giau_get_widget_id($widgetID);
		if($widget!==null){
			fillOutSectionFromWidget($widget,$section);
		}
	}else{
		error_log("NO SECTION");
	}
}
function fillOutSectionFromWidget($widget,$section){
	$widgetName = $widget["name"];
	$lookup = [];
	// lookup table
	$lookup["content_container"] = handle_widget_content_container;
	$lookup["navigation_list"] = handle_widget_navigation_list;
	$lookup["text_display"] = handle_widget_text_display;
	$lookup["vertical_divider"] = handle_widget_vertical_divider;
	$lookup["category_listing"] = handle_widget_category_listing;
	$lookup["image_gallery"] = handle_widget_image_gallery;
	$lookup["bottom_footer"] = handle_widget_bottom_footer;
	$lookup["calendar_listing"] = handle_widget_calendar_listing;
	$lookup["social_apps"] = handle_widget_social_apps;
	$lookup["language_switch"] = handle_widget_language_switch;
	$lookup["display_overlay"] = handle_widget_display_overlay;

	$fxn = $lookup[$widgetName];
	if($fxn!=null){
		$fxn($widget,$section);
	}
}
function handle_widget_display_overlay($widget,$section){
	error_log("handle_widget_navigation_list");
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	?>
	<div class="featureInfoOverlay giauInfoOverlay" style="">
	<?php
		// sub sections
		fillOutFromSectionList($section["sectionList"]);
	?>
	</div>
	<?php
}
function handle_widget_navigation_list($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$navigationList = get_value_array($sectionJSON,"components");
	?>
	<div class="giauNavigationItemList navigationContainer" style="		display:inline-block; position:relative; text-align: center; padding:6px; text-align:center;padding: 10px; z-index:100;" data-darkmode="true">
		<ul>
		<?php
		foreach($navigationList as $item){
			$uri = $item["uri"];
			$display = $item["display_text"];
			$display = giau_languagization_substitution($display,null);
			//  data-selected="selected"
		?>
		<div class="navigationMenuItem" data-display="<?php echo $display; ?>" data-url="<?php echo $uri; ?>"></div>
		<?php
		}
		?>
		</ul>
	</div>
	<?php
	fillOutFromSectionList($section["sectionList"]);
}
function handle_widget_text_display($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$text = $sectionJSON["text"];
		$text = giau_languagization_substitution($text,null);
	$class = $sectionJSON["class"];
	?>
	<div class="<?php echo $class; ?>"><?php echo $text; ?></div>
	<?php
	// sub sections
	fillOutFromSectionList($section["sectionList"]);
}
function handle_widget_content_container ($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$style = section_get_value_widget_string($widgetJSON,$sectionJSON,"style");
	$klass = section_get_value_widget_string($widgetJSON,$sectionJSON,"class");
	?>
	<div class="<?php echo $class; ?>" style="<?php echo $style; ?>">
	<?php
		fillOutFromSectionList($section["sectionList"]);
	?>
	</div>
	<?php
}

function handle_widget_language_switch($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$languages = get_value_array($sectionJSON,"languages");
	?>
	<div class="languageSwitchContainer" style="display:inline-block; position:absolute; right:0; top:0; padding-right:10px; z-index:100;">
	<div class="giauLanguageToggleSwitch" style="display:table-cell; padding:10px; vertical-align:middle; text-align:right;"  data-storage="<?php echo KEY_COOKIE_PARAM_LANGUAGE(); ?>" data-color="0xFFFFFFFF" >
	<?php
		foreach($languages as $language){
			$lang = $language["language_name"];
			$display = $language["display_text"];
			$display = giau_languagization_substitution($display,null);
			?>
			<div style="display:inline-block;" data-language="<?php echo $lang; ?>" data-display="<?php echo $display; ?>" data-url="./"></div>
			<?php
		}
	?>
	</div>
	</div>
	<?php
	// <div style="display:inline-block;" data-language="ko" data-display="KO" data-url="./"></div>
	fillOutFromSectionList($section["sectionList"]);
}

function handle_widget_vertical_divider($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$show_bar = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"show_bar");
	// <div class="sectionContainerDividerSmall limitedWidth"  style="">
	?>
	
	<div class="giauVerticalDividerContainer limitedWidth"  style="">
	<?php
	if($show_bar){
		?>
		<div class="giauVerticalDividerBar"  style=""></div>
		<?php
	}
	?>
	</div>
	<?php
	// sub sections
	fillOutFromSectionList($section["sectionList"]);
}

function handle_widget_category_listing($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$categoryList = $sectionJSON["categories"];
	$categoryLength = count($categoryList);
	$rounded = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"rounded") ? "true" :  "false";
	$style = section_get_value_widget_string($widgetJSON,$sectionJSON,"style");
	$klass = section_get_value_widget_string($widgetJSON,$sectionJSON,"class");
	?>
	<div class="giauCategoryListingContainer limitedWidth <?php echo $klass; ?>" style="<?php echo $style; ?>">
		<div class="giauCategoryListing">
			<?php
			$i;
			for($i=0;$i<$categoryLength;++$i){
				$category = $categoryList[$i];
				$image = $category["image"];
				$name = $category["name"];
				$uri = $category["uri"];
				$shading = "";
				$cover = "";
				?>
				<div style="display:none;" data-data="true" data-rounded="<?php echo $rounded; ?>" data-title="<?php echo $name; ?>" data-image="<?php echo $image; ?>" data-url="<?php echo $uri; ?>" data-cover="<?php echo $cover; ?>"  data-shading="<?php echo $shading; ?>" ?>" ></div>
				<?php
			}
			?>
		</div>
	</div>
	<?php
	// sub sections
	fillOutFromSectionList($section["sectionList"]);
}


function handle_widget_image_gallery($widget,$section){
	error_log("handle_widget_image_gallery: ".$section);
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$autoPlay = section_get_value_widget_number_int($widgetJSON,$sectionJSON,"autoplay");
	$displayNavigation = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"display_navigation") ? "true" : "false";

	$imageList = section_get_value_widget_array($widgetJSON,$sectionJSON,"images");

	$style = section_get_value_widget_string($widgetJSON,$sectionJSON,"style");
	$klass = section_get_value_widget_string($widgetJSON,$sectionJSON,"class");
	// position:relative; width:100%; height:400px;
	?>
		<div class="giauImageGallery <?php echo $klass; ?>" data-autoplay="<?php echo $autoPlay; ?>" data-navigation="<?php echo $displayNavigation; ?>" style="<?php echo $style; ?> position:relative; width:100%; height:400px;">
		<?php
			$i;
			$len = count($imageList);
			error_log("autoPlay: ".$autoPlay);
			for($i=0; $i<$len; ++$i){
				$image = $imageList[$i];
				?>
				<div data-source="<?php echo $image; ?>" style="display:none;"></div>
				<?php
			}
		// sub sections
		fillOutFromSectionList($section["sectionList"]);
		?>
		</div>
	<?php
}

function handle_widget_bottom_footer($widget,$section){
	?>
	<div class="giauFooterContainer sectionContainerFooter">
		<?php
		// sub sections
		fillOutFromSectionList($section["sectionList"]);
		?>
	</div>
	<?php
}

function handle_widget_social_apps($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$lookupList = get_value_array(get_value_array(get_value_array($widgetJSON,"fields"),"social"),"fields");
	$valueList =  get_value_array($sectionJSON,"social"); //section_get_value_widget_array($widgetJSON,$sectionJSON,"fields");
	$klass = section_get_value_widget_array($widgetJSON,$sectionJSON,"class");
	?>
	<div class="footerElementSocialGrouping">
	<?php
	foreach($lookupList as $lookupKey => $lookupValue){
		$item = $valueList[$lookupKey];
		if($item){
			//print_r($item);
			$uri = $item["uri"];
			$icon = $item["icon"];
			$style2 = "";
			if($uri==""){
				$style2 = "opacity: 0.25;";
			}
			if($uri){
				echo '<a href="'.$uri.'">';
			}
				echo '<img class="'.$klass.'" style="'.$style2.'" src="'.$icon.'" />';
			if($uri){
				echo '</a>';
			}
			
		}
	}
	?>
	</div>
	<?php
	/*
			
		<a href="https://www.facebook.com/thefathershouse.lacpc"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_facebook.png" ?>" /></a>
		<a href="https://twitter.com/thefathersh0use?lang=en"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_twitter.png" ?>" /></a>
			<img class="footerElementSocialItem" style="opacity: 0.25;" src="<?php echo relativePathIMG()."social/icon_footer_instagram.png" ?>" />
			<a href="mailto:ce@lacpc.org"><img class="footerElementSocialItem" src="<?php echo relativePathIMG()."social/icon_footer_email.png" ?>" /></a>
		</div>
	*/
	// sub sections
	fillOutFromSectionList($section["sectionList"]);
}

function handle_widget_calendar_listing($widget,$section){
	$widgetJSON = decodeWidget($widget);
	$sectionJSON = decodeSection($section);
	$tagList = section_get_value_widget_array($widgetJSON,$sectionJSON,"tags");
	$orderRecentFirst = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"order_recent_first");
	$rangeStart = section_get_value_widget_number_int($widgetJSON,$sectionJSON,"range_start");
	$rangeEnd = section_get_value_widget_number_int($widgetJSON,$sectionJSON,"range_end");
	$isRelative = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"relative");
	$minCount = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"min_count");
	$maxCount = section_get_value_widget_boolean($widgetJSON,$sectionJSON,"max_count");
	$style = section_get_value_widget_string($widgetJSON,$sectionJSON,"style");
	$klass = section_get_value_widget_string($widgetJSON,$sectionJSON,"class");
	?>
	
	<div class="giauCalendarList <?php echo $klass; ?>" style="<?php echo $style; ?>"
		data-months-short="<?php echo(implode(",",getCookieMonthsOfYearShort())); ?>"
		data-months-long="<?php echo(implode(",",getCookieMonthsOfYearLong())); ?>"
		data-days-short="<?php echo(implode(",",getCookieDaysOfWeekShort())); ?>"
		data-days-long="<?php echo(implode(",",getCookieDaysOfWeekLong())); ?>"
		data-min-count="<?php echo($minCount); ?>"
		data-max-count="<?php echo($maxCount); ?>"
		>
			<?php
				$startDate;
				$endDate;
				if($isRelative){
					$dateNow = getDateNow();
					$dateLimit = addTimeToSeconds($dateNow, 0,0,0, 0,0,$rangeStart/1000, 0);
					$startDate = stringFromDate($dateNow);
					$dateLimit = addTimeToSeconds($dateNow, 0,0,0, 0,0,$rangeEnd/1000, 0);
					$endDate = stringFromDate($dateLimit);
				}else{ // absolute
					$startDate = stringFromDate($rangeStart/1000);
					$endDate = stringFromDate($rangeEnd/1000);
				}
				$orderDateNumber = $orderRecentFirst ? 1 : 0;
				error_log("now: ".$dateNow);
				error_log("start: ".$startDate);
				error_log("  end: ".$endDate);
				$operationOffset = 0;
				$operationCount = 100;
				$operationOrder = [ ["start_date",$orderDateNumber], ["duration",1], ["id",0] ];
				$results = giau_calendar_paginated($operationOffset,$operationCount,$operationOrder, $startDate,$endDate, $tagList);
				$length = count($results);
				$index = 0;
				foreach($results as $row){
					$row["$__"] = $index;
					$included = ["$__","title","description","start_date","duration"];
					$labels = ["data-index","data-title","data-description","data-start-date","data-duration"];
					$extra = "";
					$div = divWithDatasValuesLabelsExtras($row, $included, $labels, $extra);
					echo $div;
					++$index;
				}
	// sub sections
	fillOutFromSectionList($section["sectionList"]);
			?>
	
	</div>
	<div class="" style="padding-top:32px;"></div>
	<?php
}



function decodeSection($section){
	return json_decode($section["configuration"],true);
}
function decodeWidget($widget){
	return json_decode($widget["configuration"],true);
}
function section_get_value_widget_boolean($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		if($value=="true"){
			return true;
		}
	}
	return false;
}
function section_get_value_widget_number_int($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		return intval($value);
	}
	return 0;
}
function section_get_value_widget_number_float($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		return floatval($value);
	}
	return 0;
}
function section_get_value_widget_string($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		// STRING CHECK
		return $value;
	}
	return "";
}
function section_get_value_widget_array($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		// ARRAY CHECK
		return $value;
	}
	return [];
}
function section_get_value_widget_object($widget,$section,$field){
	$value = section_get_value_widget_any($widget,$section,$field);
	if($value!=null){
		// OBJECT CHECK
		return $value;
	}
	return [];
}
function section_get_value_widget_any($widget,$section,$field){
	if(!$section || !$widget){
		return null;
	}
	$sectionValue = $section[$field]; // value
	$widgetInfo = $widget[$field]; // info
	if($sectionValue!=null){
		return $sectionValue;
	}
	return null;
}



function get_value_array($object,$field){
	if(!$object){
		return [];
	}
	$value = $object[$field];
	if($value!=null){
		return $value;
	}
	return [];
}


?>
