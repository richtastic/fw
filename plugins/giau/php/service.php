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
crudDataFromOperation( [], "read", GIAU_TABLE_DEFINITION_SECTION());
	if( isset($_POST) && isset($_POST['operation']) ){ // if( isset($_GET) && isset($_GET['operation']) ){
		$operationType = $_POST['operation'];
		if($operationType=="get_table_page" || $operationType=="get_autocomplete"){
			$operationTable = $_POST['table'];
			$operationOffset = $_POST['offset'];
			$operationCount = $_POST['count'];
			$operationOrder = $_POST['order'];
			$operationSearch = $_POST['search'];
				$lifecycleCRUD = $_POST['lifecycle'];
			
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
		}else if($operationType=="temp_directory_remove"){
			error_log("CLEAR TEMP DIRECTORY");
			$tempDirectory = giau_plugin_temp_dir();
			$removed = removeContentsInDirectory($tempDirectory);
			$response["result"] = "success";
		}else if($operationType=="backup_download_database"){
			error_log("DOWNLOAD BACKUP DB");
			$backupURL = giau_database_backup_url();
			if($backupURL){
				$response["data"] = [
					"database_json" => $backupURL,
				];
				$response["result"] = "success";
			}
		}else if($operationType=="backup_upload_database"){
			error_log("UPLOAD BACKUP DB TXT");
			$file = $_FILES['file'];
			if($file){
				$location = $file['tmp_name'];
				$json = file_get_contents($location);
				if($json){
					$result = giau_insert_database_from_json($json, true);
					error_log("result: ".$result);
					if($result){
						$response["data"] = [
							"feedback" => $result,
						];
						$response["result"] = "success";
					}
				}
			}
		}else if($operationType=="backup_download_uploads_zip"){
			error_log("DOWNLOAD BACKUP ZIP");
			$backupURL = backup_uploads_directory_url();
			error_log("backupURL: ".$backupURL);
			if($backupURL){
				$response["data"] = [
					"uploads_zip" => $backupURL,
				];
				$response["result"] = "success";
			}
		}else if($operationType=="backup_upload_uploads_zip"){
			error_log("UPLOAD BACKUP ZIP");
			
			$file = $_FILES['file'];
			error_log("    => file:".$file);
			if($file){
				$location = $file['tmp_name'];
				error_log("    => location:".$location);
				error_log("    => error:".$file['error']);
				if($location){
					$zipSource = $location;
					$zipDestination = giau_plugin_upload_root_dir();
					error_log("UNZIP: ".$zipSource." => ".$zipDestination);
					$result = unzipDirectory($zipSource, $zipDestination);
					error_log("result: ".$result);
					if($result){
						error_log("SEND SUCCESS");
						$response["data"] = [
							"feedback" => $result,
						];
						$response["result"] = "success";
					}
				}
			}
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
			$tableSourceName = $_POST['table'];
			$dataCRUD = $_POST['data'];
			//error_log(" dataCRUD: ".$dataCRUD);
			$dataCRUD = stripslashes($dataCRUD); // remove mass baskslashes
			error_log(" dataCRUD2: '".$dataCRUD."'");
			error_log(" dataCRUD3: '".$tableSourceName."'");
			error_log(" dataCRUD4: '".$lifecycleCRUD."'");
			$dataCRUD = json_decode($dataCRUD);
			if($tableSourceName=="section"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_SECTION());
			}else if($tableSourceName=="widget"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_WIDGET());
			}else if($tableSourceName=="page"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_PAGE());
			}else if($tableSourceName=="website"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_WEBSITE());
			}else if($tableSourceName=="languagization"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_LANGUAGIZATION());
			}else if($tableSourceName=="calendar"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_CALENDAR());
			}else if($tableSourceName=="bio"){
				crudDataFromOperation($lifecycleCRUD, GIAU_TABLE_DEFINITION_BIO());
			}else{
				error_log("UNKNOWN CRUD TABLE");
			}
// LANGUAGIZATION SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="page_data"){
			$tableSourceName = $_POST['table'];
			$isRequestLibrary = $_POST['library'];
				$isRequestLibrary = $isRequestLibrary==="true";
			$offset = $_POST['offset'];
			$count =  $_POST['count'];
			if($tableSourceName=="website"){
				// $offset = 0;
				// $count = 2;
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
					// $offset = 0;
					// $count = 2;
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
				// $offset = 0;
				// $count = 2;
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
				error_log("PAGE ROWS: ".count($response["data"]));
				$metadata[] = [];
					$subsections = subsection_list($response["data"], "page_section_list");
					$metadata["section_list"] = $subsections;
				$response["metadata"] = $metadata;
				$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_PAGE() );
				
			}else if($tableSourceName=="calendar"){
				// $offset = 0;
				// $count = 2;
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
				// $offset = 0;
				// $count = 2;
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

					$response["metadata"] = $metadata;
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
					// $offset = 46;
					// $count = 1;
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
					    ORDER BY section_name ASC, section_id DESC
					";
					paged_data_service($requestInfo, table_info_section(), $response );

					// LIST SUBSECTIONS IN METADATA FOR DISPLAY
					$subsections = subsection_list($response["data"], "section_subsections");
					$metadata["section_list"] = $subsections;

					// LIST WIDGETS IN METADATA FOR DISPLAY
					$rows = $response["data"];
					$len=count($rows);
					$foundWidgets = [];
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


function crudDataFromOperation($inputData, $lifecycleCRUD, $tableDefinition){ // $tableSourceName
	$i;
	$len;
//	error_log( objectToString($lifecycleCRUD) );
//	error_log( objectToString($tableDefinition) );
	$tableFunctions = $tableDefinition["functions"];
		$tableFunctionsCRUD = $tableFunctions["crud"];
			$tableFunctionCreate = $tableFunctionsCRUD["create"];
			$tableFunctionRead = $tableFunctionsCRUD["read"];
			$tableFunctionUpdate = $tableFunctionsCRUD["update"];
			$tableFunctionDelete = $tableFunctionsCRUD["delete"];
	$tableName = $tableDefinition["table"];
	$presentation = $tableDefinition["presentation"];
	$columnAliasToReal = $presentation["column_aliases"];
		$columnRealToAlias = reverseObjectMap($columnRealToAlias);
	$tableColumns = $tableDefinition["columns"];
$editableFields = [];
	// go thru definition
	$keys = getKeys($tableColumns);
	$primaryKeyColumnName = null;
	$primaryKeyColumnAlias = null;
	$len = count($keys);
	for($i=0; $i<$len; ++$i){
		$key = $keys[$i];
		$columnRealName = $key;
		$column = $tableColumns[$key];
		$columnAliasName = $columnRealToAlias[$columnRealName];
		//error_log(" col:".$columnAliasName." =?= ".$columnRealName);
		$attributes = $column["attributes"];
		if($attributes["primary_key"] == "true"){
			$primaryKeyColumnName = $columnRealName;
			$primaryKeyColumnAlias = $columnAliasName;
			$editableFields[] = $columnAliasName;
		}
		if($attributes["editable"]=="true"){
			$editableFields[] = $columnAliasName;
		}
	}
	error_log( objectToString($editableFields) );
	if($primaryKeyColumnAlias && $primaryKeyColumnName){
		error_log("need primary key: ".$primaryKeyColumnAlias);
	}
	// get params from data
	$dataPass = [];
	$keys = getKeys($inputData);
	$hasFoundPrimaryKey = false;
	$len = count($keys);
	for($i=0; $i<$len; ++$i){
		$key = $keys[$i];
		$value = $inputData[$key];
		if($key==$primaryKeyColumnAlias){
			$hasFoundPrimaryKey = true;
		}
		if(in_array($key,$editableFields)){
			$column = $columnAliasToReal[$key];
			if($column){
				$dataPass[$column] = $value;
			}
		}
	}
	error_log("DATA PASS: ".objectToString($dataPass));
	/*
	error_log(" => READ");
		$dataID = $dataCRUD->{'section_id'};
		if($dataID!==null){
			$res = giau_read_section($dataID);
			if($res!==null){
				$response["data"] = $res;
				$response["result"] = "success";
			}
		}

function giau_read_section($sectionID){
	error_log(" read sectionID: ".$sectionID);
	if($sectionID===null){
		return null;
	}
	global $wpdb;
	$querystr = "
		SELECT ".GIAU_FULL_TABLE_NAME_SECTION().".id as section_id,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".created as section_created,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".modified as section_modified,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".name as section_name,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".configuration as section_configuration,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".section_list as section_subsections,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".widget as widget_id
		FROM ".GIAU_FULL_TABLE_NAME_SECTION()." 
		WHERE id=\"".$sectionID."\" LIMIT 1";
	$rows = $wpdb->get_results($querystr, ARRAY_A);
	error_log(" read row: ".($rows[0]["section_id"]));
	if( count($rows)==1 ){
		return $rows[0];
	}
	return null;
}

	*/
	if($lifecycleCRUD==="create"){
		return crudDataOperationCreate($tableName, $tableColumns, $dataPass);
		//return $tableFunctionCreate($dataPass);
	}else if($lifecycleCRUD==="read"){
		//return $tableFunctionRead($dataPass);
	}else if($lifecycleCRUD==="update"){
		//return $tableFunctionUpdate($dataPass);
	}else if($lifecycleCRUD==="delete"){
		//return $tableFunctionDelete($dataPass);
	}
	return null;
}

function crudDataOperationCreate($tableName, $columnInfo, $inputData){
	global $wpdb;
	$row = [];
	$i; $len; $keys;
	$keys = getKeys($columnInfo);
	for($i=0; $i<$len; ++$i){ // go thru each of the fields
		$columnName = $keys[$i];
		$column = $columnInfo[$key];
		$validation = $column["validation"];
		$validAll = array_merge($validation["all"], $validation["create"]);

		// CHECK ...
		
		// does not have editable field => return
		// 	"created" => $timestampNow,
		// 	"modified" => $timestampNow,
		// 	"name" => $sectionName,
		// 	"widget" => $widgetID,
		// 	"configuration" => $sectionConfig,
		// 	"section_list" => $sectionList,
		// )
	}
	//"all" => [ // c/r/u/d

	return null;

	$wpdb->insert($tableName, $row);
	$result = $wpdb->insert_id;
	if($result!==null){
		// return object
	}
	return null;
	/*
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


function giau_create_section($sectionName, $widgetID, $sectionConfig, $sectionList){
	error_log("giau_create_section - sectionConfig: ".$sectionConfig);
	// to array
	$sectionList = arrayFromCommaSeparatedString($sectionList);
	$sectionID = giau_insert_section($sectionName, $widgetID, $sectionConfig, $sectionIDList);
	return giau_read_section($sectionID);
}
	*/
	
}
function crudDataFromDefinition($tableDefinition){
	// ...
	$info = [];
	$primary_key = "?";
	$editableFields = [];
	$allFields = [];
	$aliases = [];
	$info["primary_key"] = $primary_key;
	$info["all_fields"] = $allFields;
	$info["column_aliases"] = $aliases;
	$info["editable_fields"] = $editableFields;
	return $info;
}
function crudDataOperationRead($tableDefinition, $dataCRUD){
	
}
function crudDataOperationUpdate($tableDefinition, $dataCRUD){
	/*
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
		*/
}
function crudDataOperationDelete($tableDefinition, $dataCRUD){
	/*
	error_log(" => DELETE");
		$dataID = $dataCRUD->{'section_id'};
		if($dataID!==null){
			$res = giau_delete_section($dataID);
			error_log(" => RESULT".$res);
			if($res!==null){
				$response["result"] = "success";
			}
		}
		*/
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
