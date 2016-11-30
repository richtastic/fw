<?php
// admin.php



function giau_action_admin_menu() {
	error_log("RICHIE Y");
	// OPTIONS > GIAU PLUGIN
	//add_options_page('Giau Plugin Options', 'Giau Plugin', 'manage_options', GIAU_UNIQUE_IDENTIFIER(), 'giau_admin_plugin_options');
	// GIAU PLUGIN | MENU
	//add_menu_page('Giau Plugin Page', 'Plugin Settings', 'manage_options', 'giau-plugin-main', 'giau_admin_menu_page_main');
		//    PAGE_TITLE    MENU_TITLE    CAPABILITY   SLUG   FUNCTION    ICON_URL   POITION
		add_menu_page('Giau Plugin', 'Giau Plugin', 'manage_options', 'giau-plugin-main', 'giau_admin_menu_page_main',  giau_plugin_images_url().'/admin/giau_icon_white_24x24.png');
		add_submenu_page('giau-plugin-main', 'Giau - File Upload', 'File Upload', 'manage_options', 'giau-plugin-submenu-file-upload', 'giau_admin_menu_page_submenu_file_upload');
		add_submenu_page('giau-plugin-main', 'Giau - Data Entry', 'Data Entry', 'manage_options', 'giau-plugin-submenu-data-entry', 'giau_admin_menu_page_submenu_data_entry');
		add_submenu_page('giau-plugin-main', 'Giau - File Backup', 'File Backup', 'manage_options', 'giau-plugin-submenu-file-backup', 'giau_admin_menu_page_submenu_file_backup');
		add_submenu_page('giau-plugin-main', 'Giau - Data Backup', 'Data Backup', 'manage_options', 'giau-plugin-submenu-data-backup', 'giau_admin_menu_page_submenu_data_backup');
}



function giau_admin_menu_page_main(){
	$iconBlackMini = giau_plugin_images_url().'/admin/giau_icon_black_24x24.png';
	$THIS_URL = getCurrentRequestURL();
	$URL_FILE_UPLOAD = add_query_arg('page','giau-plugin-submenu-file-upload');
	$URL_FILE_BACKUP = add_query_arg('page','giau-plugin-submenu-file-backup');
	$URL_DATA_ENTRY = add_query_arg('page','giau-plugin-submenu-data-entry');
	$URL_DATA_BACKUP = add_query_arg('page','giau-plugin-submenu-data-backup');
?>
	<h1 style="vertical-align:middle;"><img src="<?php echo $iconBlackMini; ?>"  style="display:inline-block; vertical-align:middle;" />Giau Plugin</h1>
	<ul>
		<!-- <li>colors</li> -->
		<li><a href="<?php echo $URL_FILE_UPLOAD; ?>">File Uploading</a></li>
		<li><a href="<?php echo $URL_DATA_ENTRY; ?>">Data Entry</a></li>
		<li><a href="<?php echo $URL_FILE_BACKUP; ?>">File Backup</a></li>
		<li><a href="<?php echo $URL_DATA_BACKUP; ?>">Data Backup</a></li>
	</ul>
	<div class="giauTestA" style="width:200px; height:100px; background-color:#CCC;"></div>
	<div class="giauTestB" style="width:200px; height:100px; background-color:#CCC;"></div>
	<div class="giauTestC" style="width:200px; height:100px; background-color:#CCC;"></div>
	<script>
	
	setTimeout(function afterDelay(){
		var timestamp = new giau.InputFieldDate($(".giauTestA")[0],"2016-11-28 09:04:59.1234");
		var color = new giau.InputFieldColor($(".giauTestB")[0],"#CCFF0099");
		var duration = new giau.InputFieldDuration($(".giauTestC")[0],"1234000");
	}, 700);

	</script>
<?php
}
function giau_admin_menu_page_submenu_file_upload(){
?>
	<h1>File Upload</h1>
	<div></div>
	<div class="giauFileBrowser limitedWidth" style="">
		<div data-icon-key="icon_default" data-icon-value="<?php echo giau_plugin_images_url(); ?>/flie_browser/icon_fb_blank.png"></div>
		<div data-icon-key="icon_folder" data-icon-value="<?php echo giau_plugin_images_url(); ?>/file_browser/icon_fb_folder.png"></div>
		<div data-icon-key="icon_image_background" data-icon-value="<?php echo giau_plugin_images_url(); ?>/file_browser/icon_fb_image_background.png"></div>
	</div>
<?php
}

function giau_admin_menu_page_submenu_data_backup(){
	?>
	<h1>Data Backup</h1>
	<ul>
		<li>DOWNLOAD BACKUP</li>
		<li>UPLOAD BACKUP</li>
	</ul>
	<?php
	// SAVE DOWNLOAD FILE TO LOCATION?
	// UPLOAD FILE TO LOCATION?
	global $wpdb;

	$returnData = [];
	$allTables = GIAU_TABLE_DEFINITION_ALL_TABLES();
	$tableCount = count($allTables);
	//echo "<br/>".$tableCount;
	for($i=0; $i<$tableCount; ++$i){
		$tableDefinition = $allTables[$i];
		$tableName = $tableDefinition["table"];
		$tableColumns = $tableDefinition["columns"];
		$columnCount = count($tableColumns);
			$returnData[$tableName] = [];
		// create array of column names
		$columnNames = [];
		foreach ($tableColumns as $columnName => $columnDefinition){
			array_push($columnNames, $columnName);
		}
		// get database info -- TODO: PAGING
		$query = 'SELECT * FROM '.$tableName.' LIMIT 1';
		$rows = $wpdb->get_results($query, ARRAY_A);
		$rowCount = count($rows);
		$backupRow = [];
		// copy contents into return data
		for($j=0; $j<$rowCount; ++$j){
			$backupRow = [];
			for($k=0; $k<$columnCount; ++$k){
				$columnName = $columnNames[$k];
				$backupRow[$columnName] = $rows[$j][$columnName];
			}
			$returnData[$tableName][] = $backupRow;
		}
		//echo $query."<br/>".count($rows);
	}
	// print out return data:
	$returnJSON = json_encode($returnData);
	echo "<br/>".$returnJSON;
	// PUT INTO FILE URL
	giau_insert_database_from_json($returnJSON, true);
}

function giau_insert_database_from_json($jsonSource, $deleteTables){
	global $wpdb;

	//$jsonSource = '{"wp_giau_presentation_website": [{"id": "1","created": "2016-11-22 04:03:37.0000","modified": "2016-11-22 04:03:37.0000","start_page": "0"}] }';
	
	echo "<br/>";
	$jsonObject = json_decode($jsonSource, true);
	$tableCount = count($jsonObject);
	
	foreach ($jsonObject as $tableName => $rowList) {
		echo "TABLE: ".$tableName."<br/>";
		if($deleteTables){
			echo "TODO: DELETE TABLE: ".$tableName."<br/>";
			$dropQuery = "DROP TABLE IF EXISTS ".$tableName." ;";
			//$wpdb->query($dropQuery);
		}
		$rowCount = count($rowList);
		for($i=0; $i<$rowCount; ++$i){
			$row = $rowList[$i];
			$insertArray = [];
			foreach ($row as $column => $value) {
				echo $i." ".$column." = ".$value."<br/>";
				$insertArray[$column] = $value;
			}
			// INSERT
			$result = $wpdb->insert($tableName, $insertArray);
			echo "RESULT: '".$result."' <br/>";
		}
	}
	
	echo "<br/>";
}

function giau_admin_menu_page_submenu_file_backup(){
	?>
	<h1>File Backup</h1>
	<ul>
		<li>DOWNLOAD BACKUP</li>
		<li>UPLOAD BACKUP</li>
	</ul>
	<?php
	return;
	$zipDirectory = giau_plugin_upload_root_dir();
	$zipFilename = "/tmp/zipfile.zip";
	giau_zip_directory($zipDirectory, $zipFilename);
	// LINK TO FILE ...
}

function giau_zip_directory($zipDirectory, $zipFilename){
	/*
	$requiredExtensions = ["zip","zlib"];
	$requiredCount = count($requiredExtensions);
	for($i=0; $i<$requiredCount; ++$i){
		$extension = $requiredExtensions[$i];
		$isLoaded = extension_loaded ( $extension );
		echo "EXTENSION LOADED: ".$extension." '" . $isLoaded . "' <br/>";
		if(!$isLoaded){
			$toLoadSO = $extension.".so";
			echo "LOADING: '".$toLoadSO."' <br/>";
			$didLoad = dl($toLoadSO);
			if(!$didLoad){
				return;
			}
		}
	}
	*/

	echo "ZIPPING: '".$zipDirectory."' to '".$zipFilename."' <br/>";
	$fileList = [];
	getDirectoryListingRecursive($zipDirectory, $fileList, 10);

	$zip = new ZipArchive();
	$zip->open($zipFilename, ZipArchive::CREATE | ZipArchive::OVERWRITE);

	giau_zip_directory_recursive($zip, $fileList, $zipDirectory);
	
	$zip->close();
}

function giau_zip_directory_recursive(&$zip, &$fileList, &$zipDirectory){
	$fileCount = count($fileList);
//	echo "COUNT: ".$fileCount." <br/>";
	for($i=0; $i<$fileCount; ++$i){
		$file = $fileList[$i];
		$absoluteFilePath = $file["path"];
		$isDirectory = $file["isDirectory"];
		if($isDirectory){
			$contents = $file["contents"];
//			echo "DIRECTORY: ".$absoluteFilePath."<br/>";
			giau_zip_directory_recursive($zip, $contents, $zipDirectory);
		}else{
			$relativePath = preg_replace('#^'. preg_quote($zipDirectory."/",'/') .'#', '', $absoluteFilePath);
			//echo $zipDirectory." && ".$absoluteFilePath." == ".$relativePath." <br/>";
			echo "".$relativePath." <br/>";
			$zip->addFile($absoluteFilePath, $relativePath);
		}
	}
}

function getCurrentRequestURL(){
	$THIS_URL = $_SERVER['REQUEST_URL'];
	return $THIS_URL;
}

function giau_admin_menu_page_submenu_data_entry(){
	if( !giau_is_current_user_admin() ){
		return;
	}

	$selectedTableGetParameter = $_GET['table'];

	$THIS_URL = getCurrentRequestURL();
	$LANGUAGE_URL = add_query_arg('table','languages');
	$CALENDAR_URL = add_query_arg('table','calendar');
	$BIOS_URL = add_query_arg('table','bios');
	$PAGES_URL = add_query_arg('table','pages');
	$SECTIONS_URL = add_query_arg('table','sections');

	$TABLE_LIST = [
		[
			"display" => 'Language Texts',
			"url" => $LANGUAGE_URL,
			"get_table" => "languages",
			"data_table" => "languagization",
		],
		[
			"display" => 'Calendar Events',
			"url" => $CALENDAR_URL,
			"get_table" => "calendar",
			"data_table" => "calendar",
		],
		[
			"display" => 'Bios',
			"url" => $BIOS_URL,
			"get_table" => "bios",
			"data_table" => "bio",
		],
		[
			"display" => 'Pages',
			"url" => $PAGES_URL,
			"get_table" => "pages",
			"data_table" => "page",
		],
		[
			"display" => 'Sections',
			"url" => $SECTIONS_URL,
			"get_table" => "sections",
			"data_table" => "section",
		],
	];

	$selectedTableDisplayName = "";
	$selectedTableDataName = "";
?>
	<h1>Data Entry</h1>
	
	<ul>
		<?php
			foreach ($TABLE_LIST as $key => $value) {
				$display = $value["display"];
				$url = $value["url"];
				$table = $value["get_table"];
				echo '<li><a href="'.$url.'">'.$display.'</a></li>';
				if($selectedTableGetParameter==$table){
					$selectedTableDataName = $value["data_table"];
					$selectedTableDisplayName = $display;
				}
			}
			
		?>
		<!-- <li>Widgets</li> -->
		<!-- <li></li> -->
	</ul>
	<h2><?php echo $selectedTableDisplayName; ?></h2>

	<!-- table? -->
		<div class="limitedWidth" style="width:100%; display:block; position:relative;">
		<div style="width:70%; min-height:600px; display:inline-block; background-color:#F0F; float:left;"><div class="giauCRUD" style=""></div></div><div style="width:30%; display:inline-block; background-color:#0FF; float:left;"><div class="giauLibraryView" style="" data-name="section_id" data-display-value="section_id" data-display-title="widget_name" data-display-subtitle="section_modified"><div  data-key="table" data-value="section"></div></div><div class="giauLibraryView" style="" data-name="widget_id" data-display-value="widget_id" data-display-title="widget_name" data-display-subtitle="widget_modified"><div data-key="table" data-value="widget"></div></div></div>
	</div>
<?php
}


?>
