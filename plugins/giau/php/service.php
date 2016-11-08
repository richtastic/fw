<?php
// service.php

function giau_wordpress_data_service(){
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
// LANGUAGIZATION SERVICE --------------------------------------------------------------------------------------------------------------
		}else if($operationType=="page_data"){
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
			$offset = 46;
			$count = 1;
			$requestInfo = [];
			$requestInfo["offset"] = $offset;
			$requestInfo["count"] = $count;
			$requestInfo["query"] = "
	    SELECT ".GIAU_FULL_TABLE_NAME_SECTION().".id as section_id,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".created as section_created,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".modified as section_modified,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".configuration as section_configuration,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".section_list as section_list,
	    ".GIAU_FULL_TABLE_NAME_WIDGET().".id as widget_id,
	    ".GIAU_FULL_TABLE_NAME_WIDGET().".name as widget_name,
	    ".GIAU_FULL_TABLE_NAME_WIDGET().".configuration as widget_configuration
	    FROM ".GIAU_FULL_TABLE_NAME_SECTION()."
	    JOIN ".GIAU_FULL_TABLE_NAME_WIDGET()."
	    ON ".GIAU_FULL_TABLE_NAME_WIDGET().".id = ".GIAU_FULL_TABLE_NAME_SECTION().".widget
	";
			paged_data_service($requestInfo, table_info_section(), $response );

			// LIST SUBSECTIONS IN METADATA FOR DISPLAY
			$rows = &$response["data"];
			$i;
			$len = count($rows);
			$foundSubsections = [];
			for($i=0; $i<$len; ++$i){
				$row = &$rows[$i];
				$subsections = $row["section_list"];
				$subsections = arrayFromCommaSeparatedString($subsections);
				foreach ($subsections as $section){
					$index = "".$section;
					if( $index !="" ){
						$foundSubsections[$index] = true;
					}
				}
			}
			$foundSubsections = array_keys($foundSubsections);
			//
			$subsections = [];
			if( count($foundSubsections)>0){
				$subsectionsList = implode(",",$foundSubsections);
				global $wpdb;
				$query = 'SELECT '.GIAU_FULL_TABLE_NAME_SECTION().'.* FROM '.GIAU_FULL_TABLE_NAME_SECTION().' WHERE id IN ('.$subsectionsList.')';
				$subsections = $wpdb->get_results($query, ARRAY_A);
			}
			$metadata["subsections"] = $subsections;
			$response["metadata"] = $metadata;

			$response["definition"] = GIAU_TABLE_DEFINITION_TO_PRESENTATION( GIAU_TABLE_DEFINITION_SECTION() );
		}else{// if($operationType=="file_upload"){
			$result = exec('whoami');
			error_log("who am i: ".$result);
			error_log("other operation: ".$operationType);
			//$response["result"] = "success";
		}
		wp_send_json( $response );
	}
}

function table_info_section(){
	$data = [
		"table" => GIAU_FULL_TABLE_NAME_SECTION(),
	];
	return $data;
}

function paged_data_service($requestInfo, $tableInfo, &$response){
	global $wpdb;
	$table = $tableInfo["table"];
	//$columns = $tableInfo["columns"];
	$offset = $requestInfo["offset"];
	$count = $requestInfo["count"];
	
	$offset = esc_sql($offset);
	$count = esc_sql($count);
	$table = esc_sql($table);

	//$searchValue = esc_sql($searchValue);
	global $wpdb;

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
	$count = min($count, 100);

	$criteria = "";


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
	$response["count"] = count($results);
	$response["data"] = $results;
}


?>
