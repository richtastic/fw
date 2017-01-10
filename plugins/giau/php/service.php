<?php
// service.php

function giau_wordpress_data_service(){
	error_log("giau_wordpress_data_service");
	if(!giau_is_current_user_admin()){
		return;
	}
	error_log("         wordpress_data_service -- ".$_POST['operation']);


	$response = [];
	$response["result"] = "failure";

	foreach ($_POST as $key => $value) {
		error_log("POST key: ".$key." ........... ".$value);
	}
	foreach ($_GET as $key => $value) {
		error_log("GET key: ".$key." ........... ".$value);
	}
	foreach ($_FILES as $key => $value) {
		error_log("FILES key: ".$key." ........... ".$value);
	}

	if( isset($_POST) && isset($_POST['operation']) ){ // if( isset($_GET) && isset($_GET['operation']) ){
		$operationType = $_POST['operation'];
		if($operationType=="get_table_page" || $operationType=="get_autocomplete"){
			$operationTable = $_POST['table'];
			$operationOffset = $_POST['offset'];
			$operationCount = $_POST['count'];
			$operationOrder = $_POST['order'];
			$operationSearch = $_POST['search'];
			
			//wp_send_json( $response );
			$operationOffset = max(intval($operationOffset),0);
			$operationCount = min(intval($operationCount),1000); // max 1000 results
			$operationOrder = $operationOrder!==null ? $operationOrder : [];
			$results = null;
			$rowColumns = null;
			if($operationType=="get_autocomplete"){
				if($operationTable=="localization"){
					//$operationOrder = [ ["language",1], ["id",0], ["hash_index",1] ];
					$operationOrder = [ ["hash_index",1], ["language",1], ["id",0] ];
					$results = giau_languagization_paginated($operationOffset,$operationCount,$operationOrder);
					$rowColumns = ["id","created","modified","language","hash_index","phrase_value"];
				}else{
					$operationOrder = [ ["start_date",1], ["duration",1], ["id",0] ];
					$results = giau_calendar_paginated($operationOffset,$operationCount,$operationOrder);
					$rowColumns = ["id","created","modified","short_name","title","description","start_date","duration","tags"];
				}
			}else if($operationType=="get_autocomplete"){
				$operationOffset = 0;
				if(!$operationCount){
					$operationCount = 5;
				}
				// ignore spaces
				$operationSearch = str_replace(" ", "%", $operationSearch);
				$operationCount = min(intval($operationCount),10); // max 10 results
				if($operationTable=="localization"){
					$results = giau_languagization_autocomplete($operationSearch, $operationCount);
					$rowColumns = ["hash_index","phrase_value"];
				}else{
					//
				}
			}
			// afterwards
			if($results!==null){
				$index = 0;
				$tableData = [];
				foreach( $results as $row ) {
					$tableRow = [];
					foreach($rowColumns as $column){
						$rowValue;
						if($column=="\$index"){
							$rowValue = $index;
						}else{
							$rowValue = $row[$column];
						}
						$tableRow[$column] = $rowValue;
					}
					++$index;
					array_push($tableData, $tableRow);
				}
				$response["data"] = [
					"offset" => $operationOffset,
					"count" => $index,
					"rows" => $tableData
				];
				$response["result"] = "success";
			}
			$response = json_encode($response);
// BACKUP SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="backup_upload_zip"){
			error_log("UPLOAD BACKUP ZIP");
			//
// FILE SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="file_upload_file"){
			$relative = $_POST['file_directory'];
			$filename = $_POST['file_name'];
			if(!$relative){
				$relative = "/";
			}
			if(!$filename){
				$filename = "";
			}
			$file = $_FILES['file'];
			if($file){
				$uploadDirectory = giau_plugin_directory_root()."";
				$location = $file['tmp_name'];
				$success = moveTempFileToLocation( giau_plugin_upload_root_dir(), $location, $relative, $filename, true);
				if($success){
					$response["result"] = "success";
				}
			}
		}else if($operationType=="file_list_files"){
			$relative = $_POST['path'];
			$recursive = $_POST['recursive'];
			$listing = [];
			$limit = $recursive ? 2 : 1;
			error_log("file listing: ".$relative." | ".$recursive." | ".$limit);
			$uploadDirectory = giau_plugin_upload_root_dir();
			$directory = relativePathToAbsolutePath($uploadDirectory, $relative);
			getDirectoryListingRecursive($directory,$listing, $limit, $uploadDirectory, operateOnFileListingEntry);
			$response["data"] = $listing;
			$response["result"] = "success";
		}else if($operationType=="file_create_directory"){
			error_log("add directory");
			$relative = $_POST['path'];
			$directory = giau_plugin_upload_root_dir();
			$directory = relativePathToAbsolutePath($directory, $relative);
			$created = createDirectoryAtLocation($directory);
			if($created){
				$response["result"] = "success";
			}
		}else if($operationType=="file_remove_file"){
			error_log("file delete");
			$relative = $_POST['path'];
			$root = giau_plugin_upload_root_dir();
			$directory = relativePathToAbsolutePath($root, $relative);
			$realPathA = realpath($root);
			$realPathB = realpath($directory);
			if($realPathA==$realPathB || !$realPathA || !$realPathB){
				// don't remove root path
			}else{
				$removed = removeFileAtLocation($directory);
				if($removed){
					$response["result"] = "success";
				}
			}
		}else if($operationType=="file_move_file"){
			$relativeSource = $_POST['file_source'];
			$relativeDestination = $_POST['file_destination'];
			error_log("file move");
// EMAIL FORM SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="email_form"){
			error_log("email_form");
			wp_mail( ["zirbsster@gmail.com"], "test title", "test body");
			// /usr/sbin/sendmail: not found
/*
			$toEmail = "zirbsster@gmail.com";
			$fromEmail = "zirbsster@gmail.com";
			$replyEmail = "zirbsster@gmail.com";
			$subject = "subject";
			$body = "body";
			$result = sendEmail($toEmail, $fromEmail, $replyEmail, $subject, $body);
			error_log("RESULT: '".$result."'");
*/
			$response["result"] = "success";
			$response["data"] = [];
		}else if($operationType=="crud_data"){
			error_log("CRUD DATA");
			$lifecycleCRUD = $_POST['lifecycle'];
			$tableSourceName = $_POST['table'];
			$dataCRUD = $_POST['data'];
			//error_log(" dataCRUD: ".$dataCRUD);
			$dataCRUD = stripslashes($dataCRUD); // remove mass baskslashes
			error_log(" dataCRUD2: ".$dataCRUD);
			$dataCRUD = json_decode($dataCRUD);
			if($tableSourceName=="section"){
				if($lifecycleCRUD==="create"){
					error_log(" => CREATE");
					$dataName = $dataCRUD->{'section_name'};
					$dataConfiguration = $dataCRUD->{'section_configuration'};
					$dataList = $dataCRUD->{'section_subsections'};
					$res = giau_create_section($dataName, null, $dataConfiguration, $dataList);

					if($res!==null){
						error_log("RESULT CONFIG: ".$res["section_configuration"]);
						$response["data"] = $res;
						$response["result"] = "success";
					}
				}else if($lifecycleCRUD==="read"){
					error_log(" => READ");
					$dataID = $dataCRUD->{'section_id'};
					if($dataID!==null){
						$res = giau_read_section($dataID);
						if($res!==null){
							$response["data"] = $res;
							$response["result"] = "success";
						}
					}
				}else if($lifecycleCRUD==="update"){
					error_log(" => UPDATE");
					$dataID = $dataCRUD->{'section_id'};
				error_log("dataID: ".$dataID);
					$dataName = $dataCRUD->{'section_name'};
					$dataConfiguration = $dataCRUD->{'section_configuration'};
					$dataList = $dataCRUD->{'section_subsections'};
					$res = giau_update_section($dataID, $dataName, null, $dataConfiguration, $dataList);
					if($res!==null){
						$response["data"] = $res;
						$response["result"] = "success";
					}
				}else if($lifecycleCRUD==="delete"){
					error_log(" => DELETE");
					$dataID = $dataCRUD->{'section_id'};
					if($dataID!==null){
						$res = giau_delete_section($dataID);
						error_log(" => RESULT".$res);
						if($res!==null){
							$response["result"] = "success";
						}
					}
				}
			}
// LANGUAGIZATION SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="page_data"){
			$tableSourceName = $_POST['table'];
			$isRequestLibrary = $_POST['library'];
				$isRequestLibrary = $isRequestLibrary==="true";
			if($tableSourceName=="website"){
				$offset = 0;
				$count = 2;
				$requestInfo = [];
				$requestInfo["offset"] = $offset;
				$requestInfo["count"] = $count;
				$requestInfo["query"] = "
				    SELECT ".GIAU_FULL_TABLE_NAME_WEBSITE().".id as website_id,
				    ".GIAU_FULL_TABLE_NAME_WEBSITE().".created as website_created,
				    ".GIAU_FULL_TABLE_NAME_WEBSITE().".modified as website_modified,
				    ".GIAU_FULL_TABLE_NAME_WEBSITE().".start_page as website_start_page
				    FROM ".GIAU_FULL_TABLE_NAME_WEBSITE()."
				    ORDER BY modified DESC 
				";
				error_log($requestInfo["query"]);
				paged_data_service($requestInfo, table_info_website(), $response );
				//
				$metadata[] = [];
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_WEBSITE() );
				//
			}else if($tableSourceName=="widget"){
				if($isRequestLibrary){
					$data = [];
					$metadata = [
						"index_field" => "widget_id",
						"display_fields" => [
							["name" => "widget_name"],
							["name" => "widget_modified"],
							["name" => "widget_id"],
						],
						"data_fields" => [
							"widget_id" => "widget_id",
							"widget_name" => "widget_name",
						],
					];
					$requestInfo["offset"] = 0;
					$requestInfo["count"] = 99999;
					$requestInfo["query"] = "
					    SELECT ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".modified as widget_modified,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name
					    FROM ".GIAU_FULL_TABLE_NAME_WIDGET()."
					    ORDER BY name ASC, modified DESC 
					";
					paged_data_service($requestInfo, table_info_widget(), $response , true);
					$response["metadata"] = $metadata;
				}else{
					$offset = 0;
					$count = 2;
					$requestInfo = [];
					$requestInfo["offset"] = $offset;
					$requestInfo["count"] = $count;
					$requestInfo["query"] = "
					    SELECT ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".created as widget_created,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".modified as widget_modified,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".configuration as widget_configuration
					    FROM ".GIAU_FULL_TABLE_NAME_WIDGET()."
					    ORDER BY name ASC, modified DESC 
					";
					error_log($requestInfo["query"]);
					paged_data_service($requestInfo, table_info_widget(), $response );
					//
					$metadata[] = [];
					$response["metadata"] = $metadata;
					$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_WIDGET() );
				}

			}else if($tableSourceName=="page"){
			
				$offset = 0;
				$count = 2;
				$requestInfo = [];
				$requestInfo["offset"] = $offset;
				$requestInfo["count"] = $count;
				$requestInfo["query"] = "
				    SELECT ".GIAU_FULL_TABLE_NAME_PAGE().".id as page_id,
				    ".GIAU_FULL_TABLE_NAME_PAGE().".created as page_created,
				    ".GIAU_FULL_TABLE_NAME_PAGE().".modified as page_modified,
				    ".GIAU_FULL_TABLE_NAME_PAGE().".name as page_name,
				    ".GIAU_FULL_TABLE_NAME_PAGE().".section_list as page_section_list,
				    ".GIAU_FULL_TABLE_NAME_PAGE().".tags as page_tags
				    FROM ".GIAU_FULL_TABLE_NAME_PAGE()."
				    ORDER BY name ASC, modified DESC 
				";
				error_log($requestInfo["query"]);
				paged_data_service($requestInfo, table_info_page(), $response );
				//
				$metadata[] = [];
					$subsections = subsection_list($response["data"], "page_section_list");
					$metadata["section_list"] = $subsections;
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_PAGE() );
				
			}else if($tableSourceName=="calendar"){
				$offset = 0;
				$count = 2;
				$requestInfo = [];
				$requestInfo["offset"] = $offset;
				$requestInfo["count"] = $count;
				$requestInfo["query"] = "
				    SELECT ".GIAU_FULL_TABLE_NAME_CALENDAR().".id as calendar_id,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".created as calendar_created,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".modified as calendar_modified,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".short_name as calendar_short_name,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".title as calendar_title,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".description as calendar_description,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".start_date as calendar_start_date,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".duration as calendar_duration,
				    ".GIAU_FULL_TABLE_NAME_CALENDAR().".tags as calendar_tags
				    FROM ".GIAU_FULL_TABLE_NAME_CALENDAR()."
				    ORDER BY title ASC, short_name ASC, modified DESC 
				";
				error_log($requestInfo["query"]);
				paged_data_service($requestInfo, table_info_calendar(), $response );
				//
				$metadata[] = [];
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_CALENDAR() );
			}else if($tableSourceName=="bio"){
				$offset = 0;
				$count = 2;
				$requestInfo = [];
				$requestInfo["offset"] = $offset;
				$requestInfo["count"] = $count;
				$requestInfo["query"] = "
				    SELECT ".GIAU_FULL_TABLE_NAME_BIO().".id as bio_id,
				    ".GIAU_FULL_TABLE_NAME_BIO().".created as bio_created,
				    ".GIAU_FULL_TABLE_NAME_BIO().".modified as bio_modified,
				    ".GIAU_FULL_TABLE_NAME_BIO().".first_name as bio_first_name,
				    ".GIAU_FULL_TABLE_NAME_BIO().".last_name as bio_last_name,
				    ".GIAU_FULL_TABLE_NAME_BIO().".display_name as bio_display_name,
				    ".GIAU_FULL_TABLE_NAME_BIO().".position as bio_position,
				    ".GIAU_FULL_TABLE_NAME_BIO().".email as bio_email,
				    ".GIAU_FULL_TABLE_NAME_BIO().".phone as bio_phone,
				    ".GIAU_FULL_TABLE_NAME_BIO().".description as bio_description,
				    ".GIAU_FULL_TABLE_NAME_BIO().".uri as bio_uri,
				    ".GIAU_FULL_TABLE_NAME_BIO().".image_url as bio_image_url,
				    ".GIAU_FULL_TABLE_NAME_BIO().".tags as bio_tags
				    FROM ".GIAU_FULL_TABLE_NAME_BIO()."
				    ORDER BY last_name ASC, first_name ASC, modified DESC 
				";
				error_log($requestInfo["query"]);
				paged_data_service($requestInfo, table_info_bio(), $response );
				//
				$metadata[] = [];
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_BIO() );
			}else if($tableSourceName=="languagization"){
				$offset = 0;
				$count = 2;
				$requestInfo = [];
				$requestInfo["offset"] = $offset;
				$requestInfo["count"] = $count;
				$requestInfo["query"] = "
				    SELECT ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".id as languagization_id,
				    ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".created as languagization_created,
				    ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".modified as languagization_modified,
				    ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".hash_index as languagization_hash,
				    ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".language as languagization_language,
				    ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION().".phrase_value as languagization_phrase
				    FROM ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION()."
				    ORDER BY hash_index ASC, modified DESC 
				";
				error_log($requestInfo["query"]);
				paged_data_service($requestInfo, table_info_languagization(), $response );
				//
				$metadata[] = [];
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_LANGUAGIZATION() );
			}else if($tableSourceName=="section"){
				if($isRequestLibrary){
					$data = [];
					$metadata = [
						"index_field" => "section_id",
						"display_fields" => [
							["name" => "section_name"],
							["name" => "widget_name"],
							["name" => "section_modified"],
						],
						"data_fields" => [
							"section_id" => "section_id",
							"section_name" => "section_name",
							"widget_id" => "widget_id",
							"widget_name" => "widget_name",
						],
					];
					$requestInfo["offset"] = 0;
					$requestInfo["count"] = 99999;
					$requestInfo["query"] = "
					    SELECT ".GIAU_FULL_TABLE_NAME_SECTION().".id as section_id,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".modified as section_modified,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".name as section_name,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name
					    FROM ".GIAU_FULL_TABLE_NAME_SECTION()."
					    JOIN ".GIAU_FULL_TABLE_NAME_WIDGET()."
					    ON ".GIAU_FULL_TABLE_NAME_WIDGET().".id = ".GIAU_FULL_TABLE_NAME_SECTION().".widget
					";
					paged_data_service($requestInfo, table_info_section(), $response , true);

					//$response["data"] = $data;
					$response["metadata"] = $metadata;
					//$response["result"] = "success";
				}else{
					global $wpdb;
					/*
					lang:
						- set of options for language
					sect:
						- use model & object model for config
						- use section list id-library
					page:
						- 
					- comma-separated array fields
					// get a list
						- offset, count, ordering
						=> total, columns = all column names, data = each row entry
					// add a new row
						=> columns & options/specs
						- values
						=> created column
					// delete a row
						- id
						=> success/fail
					// edit a row
						- values WHERE id
					*/
					// TEST FOR MANY SUB SECTIONS
					$offset = 46;
					$count = 1;
					// $offset = 50;
					// $count = 1;
					$requestInfo = [];
					$requestInfo["offset"] = $offset;
					$requestInfo["count"] = $count;
					$requestInfo["query"] = "
					    SELECT ".GIAU_FULL_TABLE_NAME_SECTION().".id as section_id,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".created as section_created,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".modified as section_modified,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".name as section_name,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".configuration as section_configuration,
					    ".GIAU_FULL_TABLE_NAME_SECTION().".section_list as section_subsections,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name,
					    ".GIAU_FULL_TABLE_NAME_WIDGET().".configuration as widget_configuration
					    FROM ".GIAU_FULL_TABLE_NAME_SECTION()."
					    JOIN ".GIAU_FULL_TABLE_NAME_WIDGET()."
					    ON ".GIAU_FULL_TABLE_NAME_WIDGET().".id = ".GIAU_FULL_TABLE_NAME_SECTION().".widget
					";
					paged_data_service($requestInfo, table_info_section(), $response );

					// LIST SUBSECTIONS IN METADATA FOR DISPLAY
					$subsections = subsection_list($response["data"], "section_subsections");
					/*
					$rows = &$response["data"];
					$i;
					$len = count($rows);
					$foundSubsections = [];
					for($i=0; $i<$len; ++$i){
						$row = &$rows[$i];
						$subsections = $row["section_subsections"];
						$subsections = arrayFromCommaSeparatedString($subsections);
						foreach ($subsections as $section){
							$index = "".$section;
							if( $index !="" ){
								$foundSubsections[$index] = true;
							}
						}
					}

					// sections
					$foundSubsections = array_keys($foundSubsections);
					$subsections = [];
					
					if( count($foundSubsections)>0){
						$subsectionsList = implode(",",$foundSubsections);
						$query = "
							SELECT
								sections.id AS section_id,
								sections.name AS section_name,
								".GIAU_FULL_TABLE_NAME_WIDGET().".id AS widget_id,
								".GIAU_FULL_TABLE_NAME_WIDGET().".name AS widget_name
							FROM
							(
								SELECT *
								FROM ".GIAU_FULL_TABLE_NAME_SECTION()." 
								WHERE ".GIAU_FULL_TABLE_NAME_SECTION().".id IN (".$subsectionsList.") 
							) as sections
							JOIN ".GIAU_FULL_TABLE_NAME_WIDGET()." 
					    	ON ".GIAU_FULL_TABLE_NAME_WIDGET().".id = sections.widget 
					    	";
						$subsections = $wpdb->get_results($query, ARRAY_A);
					}
					*/
					$metadata["section_list"] = $subsections;
					

										$foundWidgets = [];
					// LIST WIDGETS IN METADATA FOR DISPLAY
					for($i=0; $i<$len; ++$i){
						$row = &$rows[$i];
						$widget_id = $row["widget_id"];
						$foundWidgets[]= $widget_id;
					}

					// widgets
						$subwidgetsList = implode(",",$foundWidgets);
						$query = "
							SELECT ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
						    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name
						    FROM ".GIAU_FULL_TABLE_NAME_WIDGET()."
						    WHERE ".GIAU_FULL_TABLE_NAME_WIDGET().".id IN (".$subwidgetsList.") 
						";
						$subwidgets = $wpdb->get_results($query, ARRAY_A);
					error_log("subwidgets count: ".count($subwidgets));
					$metadata["widget_list"] = $subwidgets;

					// metadata
					$response["metadata"] = $metadata;
					$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_SECTION() );
				}
			}
		}else{// if($operationType=="file_upload"){
			$result = exec('whoami');
			error_log("who am i: ".$result);
			error_log("other operation: ".$operationType);
			//$response["result"] = "success";
		}
		wp_send_json( $response );
	}
}

function subsection_list(&$rows, $columnName){ // LIST SUBSECTIONS IN METADATA FOR DISPLAY
	global $wpdb;
	
	$i;
	$len = count($rows);
	$foundSubsections = [];
	for($i=0; $i<$len; ++$i){
		$row = &$rows[$i];
		$subsections = $row[$columnName];
		$subsections = arrayFromCommaSeparatedString($subsections);
		foreach ($subsections as $section){
			$index = "".$section;
			if( $index !="" ){
				$foundSubsections[$index] = true;
			}
		}
	}

	// sections
	$foundSubsections = array_keys($foundSubsections);
	$subsections = [];
	if( count($foundSubsections)>0){
		$subsectionsList = implode(",",$foundSubsections);
		$query = "
			SELECT
				sections.id AS section_id,
				sections.name AS section_name,
				".GIAU_FULL_TABLE_NAME_WIDGET().".id AS widget_id,
				".GIAU_FULL_TABLE_NAME_WIDGET().".name AS widget_name
			FROM
			(
				SELECT *
				FROM ".GIAU_FULL_TABLE_NAME_SECTION()." 
				WHERE ".GIAU_FULL_TABLE_NAME_SECTION().".id IN (".$subsectionsList.") 
			) as sections
			JOIN ".GIAU_FULL_TABLE_NAME_WIDGET()." 
	    	ON ".GIAU_FULL_TABLE_NAME_WIDGET().".id = sections.widget 
	    	";
		$subsections = $wpdb->get_results($query, ARRAY_A);
	}
	return $subsections;
}

function table_info_website(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_WEBSITE(),
	];
}
function table_info_page(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_PAGE(),
	];
}
function table_info_languagization(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_LANGUAGIZATION(),
	];
}
function table_info_section(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_SECTION(),
	];
}
function table_info_widget(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_WIDGET(),
	];
}
function table_info_bio(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_BIO(),
	];
}
function table_info_calendar(){
	return [
		"table" => GIAU_FULL_TABLE_NAME_CALENDAR(),
	];
}

function paged_data_service($requestInfo, $tableInfo, &$response, $override=false){
	global $wpdb;
	$table = $tableInfo["table"];
	//$columns = $tableInfo["columns"];
	$offset = $requestInfo["offset"];
	$count = $requestInfo["count"];
	
	$offset = esc_sql($offset);
	$count = esc_sql($count);
	$table = esc_sql($table);

	// offset must be positive
	if(!$offset || $offset < 0){
		$offset = 0;
	}

	// count must be positive
	if(!$count || $count < 0){
		$count = 0;
	}
	if($count == 0){ // no results
		return [];
	}
	if(!$override){
		$count = min($count, 100);
	}

	$criteria = "";

	// TOTAL
	$total = 0;
	$queryTotal = "
	    SELECT COUNT(*) AS total
	    FROM ".$table."
	    ".$criteria." 
	";
	error_log("TOTAL - RICHIE ".$queryTotal);
	// SELECT TABLE_NAME, TABLE_ROWS as total FROM information_schema.tables;
	// SELECT TABLE_ROWS as total FROM information_schema.tables WHERE TABLE_NAME = 'wp_giau_bio';
	// wp_giau_languagization
	$resultTotal = $wpdb->get_results($queryTotal, ARRAY_A);
	error_log("TOTAL - RICHIE ".count($resultTotal));
	$total = intval($resultTotal[0]["total"]);
	error_log("TOTAL - RICHIE == ".$total);
	// QUERY

	$querystr = $requestInfo["query"];
	if(!$querystr){
		$querystr = "
		    SELECT ".$table.".* 
		    FROM ".$table."
		    ".$criteria." 
		";
	}
	$querystr = $querystr . " LIMIT ".$offset.",".$count." ";
	$results = $wpdb->get_results($querystr, ARRAY_A);
	// return $results;
	$response["result"] = "success";
	$response["offset"] = $offset;
	$response["count"] = count($results);
	$response["data"] = $results;
	$response["total"] = $total;
}


?>
