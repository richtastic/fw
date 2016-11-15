<?php
// tables.php

// NAMES

function WORDPRESS_TABLE_PREFIX(){
	global $wpdb;
	$wordpress_prefix = $wpdb->prefix;
	return $wordpress_prefix;
}
function GIAU_UNIQUE_IDENTIFIER(){
	return "giau";
}
function GIAU_TABLE_PREFIX(){
	return "giau_";
}

function GIAU_TABLE_NAME_LANGUAGIZATION(){
	return "languagization";
}
function GIAU_TABLE_NAME_WEBSITE(){
	return "presentation_website";
}
function GIAU_TABLE_NAME_PAGE(){
	return "presentation_page";
}
function GIAU_TABLE_NAME_SECTION(){
	return "section";
}
function GIAU_TABLE_NAME_WIDGET(){
	return "widget";
}
function GIAU_TABLE_NAME_CALENDAR(){
	return "calendar";
}
function GIAU_TABLE_NAME_BIO(){
	return "bio";
}

function GIAU_FULL_TABLE_NAME_LANGUAGIZATION(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_LANGUAGIZATION();
}
function GIAU_FULL_TABLE_NAME_WEBSITE(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_WEBSITE();
}
function GIAU_FULL_TABLE_NAME_PAGE(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_PAGE();
}
function GIAU_FULL_TABLE_NAME_SECTION(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_SECTION();
}
function GIAU_FULL_TABLE_NAME_WIDGET(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_WIDGET();
}
function GIAU_FULL_TABLE_NAME_CALENDAR(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_CALENDAR();
}
function GIAU_FULL_TABLE_NAME_BIO(){
	return WORDPRESS_TABLE_PREFIX()."".GIAU_TABLE_PREFIX()."".GIAU_TABLE_NAME_BIO();
}

		/*
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		widget int NOT NULL,
		configuration TEXT NOT NULL,
		extend int,
		section_list VARCHAR(65535) NOT NULL,
		*/
function GIAU_TABLE_DEFINITION_TO_PRESENTATION(&$tableDefinition){
	// substitute or whatnot
	return $tableDefinition;

}
function GIAU_TABLE_DEFINITION_WIDGET(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_WIDGET(),
		"columns" => [
			"id" =>  [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" => "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"name" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Name",
					"order" => "3",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"configuration" => [
				"type" => "string-json",
				"attributes" =>  [
					"display_name" => "Configuration",
					"order" => "5",
					"sort" =>  "false",
					"editable" => "true",
				],
			]
		],
		"presentation" => [
			"column_aliases" => [
				"widget_id" => "id",
				"widget_created" => "created",
				"widget_modified" => "modified",
				"widget_name" => "widget_name",
				"widget_configuration" => "configuration",
			],
			"columns" => [
				// 
			]
		]
	];
}
function GIAU_TABLE_DEFINITION_SECTION(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_SECTION(),
		"columns" => [
			"id" =>  [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" => "false",
					"editable" => "false",
					"default" => null,
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
					"default" => null,
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
					"default" => null,
				],
			],
			"widget" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Widget",
					"order" => "3",
					"sort" =>  "false",
					"editable" => "false",
					"default" => null, // SECECT FROM MENU ???
				],
			],
			"extend" => [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "Extends",
					"order" => "4",
					"sort" =>  "true",
					"editable" => "false",
					"default" => null, // SELECT FROM MENU
				],
			],
			"configuration" => [
				"type" => "string-json",
				"attributes" =>  [
					"display_name" => "Configuration",
					"order" => "5",
					"sort" =>  "false",
					"editable" => "true",
					"default" => null, // 
				],
			],
			"section_list" => [
				"type" => "string-array",
				"attributes" =>  [
					"display_name" => "Subsections",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
					"default" => null,
				],
			],


			// not part of the table:
			"widget_name" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Name(Widget)",
					"order" => "7",
					"sort" =>  "false",
					"editable" => "false",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"section_id" => "id",
				"section_created" => "created",
				"section_modified" => "modified",
				"section_configuration" => "configuration",
				"section_subsections" => "section_list",
//				"section_extend_widget_id" => "extend",
				// unavailable
				"widget_id" => null,
				"widget_name" => "widget_name",
				"widget_configuration" => null,
			],
			"columns" => [
				"configuration" => [
					"json_model_column" => "widget_configuration",
				],
				"widget" =>  [
					"box" => "true",
				],
				"section_list" =>  [
					"drag_and_drop" =>  [
						"source" =>  [
							"name" => "library_section_list",
							"url" => "",
						]
					]
				],
			]
		]
	];
}
function GIAU_TABLE_DEFINITION_LANGUAGIZATION(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_LANGUAGIZATION(),
		"columns" => [
			"id" => [
				"type" => "string-number",
				"attributes" => [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" =>  "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" => [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" => [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"hash_index" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Hash Index",
					"order" => "3",
					"sort" =>  "true",
					"editable" => "true",
					"monospace" => "true",
				],
			],
			"language" => [
				"type" => "string-option",
				"options" => [
					[
						"display" => "english",
						"value" => "en-US",
						"default" => "true",
					],
					[
						"display" => "korean",
						"value" => "ko-KP",
					]
				],
				"attributes" => [
					"display_name" => "Language",
					"order" => "4",
					"monospace" => "true",
					"editable" => "true",
				],
			],
			"phrase_value" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Phrase",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"languagization_id" => "id",
				"languagization_created" => "created",
				"languagization_modified" => "modified",
				"languagization_hash" => "hash_index",
				"languagization_language" => "language",
				"languagization_phrase" => "phrase_value",
			],
			"columns" => [
				"hash_index" => [
					"row_grouping" => [
						//
					]
				]
			]
		]
	];
}
function GIAU_TABLE_DEFINITION_BIO(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_BIO(),
		"columns" => [
			"id" => [
				"type" => "string-number",
				"attributes" => [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" =>  "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" => [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" => [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"first_name" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "First Name",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"last_name" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Last Name",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"display_name" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Display Name",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"position" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Position",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"email" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Email",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"phone" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Phone",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"description" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Description",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"uri" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Web URL",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"image_url" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Image URL",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
			"tags" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Tags",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"bio_id" => "id",
				"bio_created" => "created",
				"bio_modified" => "modified",
				"bio_first_name" => "first_name",
				"bio_last_name" => "last_name",
				"bio_display_name" => "display_name",
				"bio_position" => "position",
				"bio_email" => "email",
				"bio_phone" => "phone",
				"bio_description" => "description",
				"bio_uri" => "uri",
				"bio_image_url" => "image_url",
				"bio_tags" => "tags",
			],
			"columns" => [
				//
			],
		]
	];
}

function GIAU_TABLE_DEFINITION_CALENDAR(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_SECTION(),
		"columns" => [
			"id" =>  [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" => "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"short_name" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Short Name",
					"order" => "3",
					"sort" =>  "false",
					"editable" => "false",
				],
			],
			"title" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Title",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
				],
			],
			"description" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Description",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
				],
			],
			"start_date" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Start Date",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
				],
			],
			"duration" => [
				"type" => "string-seconds",
				"attributes" =>  [
					"display_name" => "Duration",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
				],
			],
			"tags" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Tags",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"calendar_id" => "id",
				"calendar_created" => "created",
				"calendar_modified" => "modified",
				"calendar_short_name" => "short_name",
				"calendar_title" => "title",
				"calendar_description" => "description",
				"calendar_start_date" => "start_date",
				"calendar_duration" => "duration",
				"calendar_tags" => "tags",
			],
			"columns" => [
				//
			],
		]
	];
}
function GIAU_TABLE_DEFINITION_PAGE(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_PAGE(),
		"columns" => [
			"id" =>  [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" => "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"name" => [
				"type" => "string",
				"attributes" =>  [
					"display_name" => "Name",
					"order" => "3",
					"sort" =>  "false",
					"editable" => "false",
				],
			],
			"section_list" => [
				"type" => "string-array",
				"attributes" =>  [
					"display_name" => "Sections",
					"order" => "6",
					"sort" =>  "false",
					"editable" => "true",
				],
			],
			"tags" => [
				"type" => "string",
				"attributes" => [
					"display_name" => "Tags",
					"order" => "5",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"page_id" => "id",
				"page_created" => "created",
				"page_modified" => "modified",
				"page_name" => "name",
				"page_section_list" => "section_list",
				"page_tags" => "tags",
			],
			"columns" => [
				//
			],
		]
	];
}
function GIAU_TABLE_DEFINITION_WEBSITE(){
	return
	[
		"table" => GIAU_FULL_TABLE_NAME_WEBSITE(),
		"columns" => [
			"id" =>  [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "ID",
					"order" => "0",
					"primary_key" => "true",
					"sort" => "false",
					"editable" => "false",
				],
			],
			"created" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Created",
					"order" => "1",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"modified" => [
				"type" => "string-date",
				"attributes" =>  [
					"display_name" => "Modified",
					"order" => "2",
					"sort" =>  "true",
					"editable" => "false",
				],
			],
			"start_page" => [
				"type" => "string-number",
				"attributes" =>  [
					"display_name" => "Start Page",
					"order" => "3",
					"sort" =>  "true",
					"editable" => "true",
				],
			],
		],
		"presentation" => [
			"column_aliases" => [
				"website_id" => "id",
				"website_created" => "created",
				"website_modified" => "modified",
				"website_start_page" => "start_page",
			],
			"columns" => [
				// 
			]
		]
	];
}
	// sectioned, binned, boxed, atomic, tagged, capsule, parcel


function giau_create_database(){
	error_log("giau_create_database");
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' ); // dbDelta
	global $wpdb;

	// languagization lookup table
	// key: TEXT-TO-APPEAR-FOR-CALENDAR-DATE
	// language: en | en-US | kr | ...
	// value: 

	$charset_collate = $wpdb->get_charset_collate();

	// LANGUAGIZATION
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// hash_index = index lookup  EG: "CALENDAR_TITLE_TEXT"
	// language = (ISO639-1)-(IETF tag/ISO3166-1) language code  EG: en, en-US, sp-MX, ko, ko-KP/ko-KR
	// phrase_value = value to substitute in location  EG: "Upcoming Events"
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		hash_index VARCHAR(255) NOT NULL,
		language VARCHAR(16) NOT NULL,
		phrase_value TEXT NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// WIDGET
	// id
	// created
	// modified
	// name = widget name
	// configuration = default json configuration
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_WIDGET()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		name VARCHAR(32) NOT NULL,
		configuration TEXT NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// SECTION
	// id
	// created
	// modified
	// short_name = ?
	// title = display title
	// configuration = overriding json configuration
	// extends = section this extends from (uses as default but overrides specified criteria)
	// sectionList = list of additional sections to process, contained inside sectionList
	// 		extend int,
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_SECTION()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		widget int NOT NULL,
		configuration TEXT NOT NULL,
		section_list VARCHAR(65535) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// PAGES
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// short_name
	// title
	// section_list = comma-separated list of configured section objects
	// 
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_PAGE()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		name VARCHAR(255) NOT NULL,
		section_list VARCHAR(65535) NOT NULL,
		tags VARCHAR(255) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// WEBSITE
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// start_page = main page id
	// 
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_WEBSITE()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		start_page int NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );


	// CALENDAR
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// short_name = human readable id
	// title = 
	// description = 
	// start_date = millisecond time stamp
	// duration = milliseconds
	// tags = comma-separated filtering
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_CALENDAR()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		short_name VARCHAR(32) NOT NULL,
		title VARCHAR(255) NOT NULL,
		description VARCHAR(255) NOT NULL,
		start_date VARCHAR(32) NOT NULL,
		duration VARCHAR(32) NOT NULL,
		tags VARCHAR(255) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );

	// BIO
	// id = unique entry number EG: 123
	// created = ISO-8601 timestamp first made  EG: 2016-07-01T18:35:43.0000Z
	// modified = ISO-8601 timestamp last changed  EG: 2015-06-28T12:34:56.0000Z
	// first_name = 
	// last_name = 
	// display_name = 
	// position = 
	// description = 
	// email = 
	// phone = 
	// uri = 
	// image_url = 
	// tags =  ??? group =  ??? department? tags ? for filtering
	$sql = "CREATE TABLE ".GIAU_FULL_TABLE_NAME_BIO()." (
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		first_name VARCHAR(255) NOT NULL,
		last_name VARCHAR(255) NOT NULL,
		display_name VARCHAR(255) NOT NULL,
		position VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		phone VARCHAR(255) NOT NULL,
		description VARCHAR(255) NOT NULL,
		uri VARCHAR(255) NOT NULL,
		image_url VARCHAR(255) NOT NULL,
		tags VARCHAR(255) NOT NULL,
		UNIQUE KEY id (id)
		) $charset_collate
	;";
	dbDelta( $sql );
	
}

// DROP

function giau_remove_database(){
	error_log("giau_remove_database");
	global $wpdb;

	// LANGUAGIZATION
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_LANGUAGIZATION()." ;";
	$wpdb->query($sql);

	// WEBSITE
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_WEBSITE()." ;";
	$wpdb->query($sql);

	// PAGE
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_PAGE()." ;";
	$wpdb->query($sql);

	// SECTION
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_SECTION()." ;";
	$wpdb->query($sql);

	// WIDGET
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_WIDGET()." ;";
	$wpdb->query($sql);

	// CALENDAR
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_CALENDAR()." ;";
	$wpdb->query($sql);

	// BIO
	$sql = "DROP TABLE IF EXISTS ".GIAU_FULL_TABLE_NAME_BIO()." ;";
	$wpdb->query($sql);
}



// CREATE
function giau_insert_website($startPage){
	error_log("giau_insert_website: ".$startPage);
	// startPage must be non-empty
	if($startPage===null){
		return;
	}
	//
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_WEBSITE(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"start_page" => $startPage,
		)
	);
	return $wpdb->insert_id;
}

function giau_insert_languagization($language,$hash,$phrase){
	// hash must be non-empty
	if($hash===null || strlen($hash) == 0){
		return;
	}
	// language must be non-empty
	if($language===null || strlen($language) == 0){
		return;
	}
	// phrase must be non-null
	if($phrase===null){
		$phrase = "";
	}
	//
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
// TODO: CHECK IF LANG ALREADY EXISTS
	$wpdb->insert(GIAU_FULL_TABLE_NAME_LANGUAGIZATION(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"hash_index" => $hash,
			"language" => $language,
			"phrase_value" => $phrase,
		)
	);
	return $wpdb->insert_id;
}

function giau_insert_bio($firstName,$lastName,$displayName,$position,$email,$phone,$description,$uri,$imageURL,$tags){
	//$phone = getOnlyNumbersFromString($phone); // this is a text field
	$tags = commaSeparatedStringFromString($tags, 255);
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_BIO(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"first_name" => $firstName,
			"last_name" => $lastName,
			"display_name" => $displayName,
			"position" => $position,
			"email" => $email,
			"phone" => $phone,
			"description" => $description,
			"uri" => $uri,
			"image_url" => $imageURL,
			"tags" => $tags
		)
	);
	return $wpdb->insert_id;
}

function giau_insert_calendar($shortName, $title, $description, $startDate, $duration, $tags){
	$tags = commaSeparatedStringFromString($tags, 255);
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_CALENDAR(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"short_name" => $shortName,
			"title" => $title,
			"description" => $description,
			"start_date" => $startDate,
			"duration" => $duration,
			"tags" => $tags,
		)
	);
}

function giau_insert_widget($widgetName,$widgetConfig){
	$widgetConfig = json_encode($widgetConfig);
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_WIDGET(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"name" => $widgetName,
			"configuration" => $widgetConfig,
		)
	);
	return $wpdb->insert_id;
}

function giau_insert_section($widgetID, $widgetConfig, $sectionIDList){
	$widgetConfig = json_encode($widgetConfig);
	if(!$sectionIDList){
		$sectionIDList = [];
	}
	$sectionList = implode(",", $sectionIDList);
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_SECTION(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"widget" => $widgetID,
			"configuration" => $widgetConfig,
			"section_list" => $sectionList,
		)
	);
	return $wpdb->insert_id;
}
function giau_create_section($sectionID){
	//
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
	    ".GIAU_FULL_TABLE_NAME_SECTION().".configuration as section_configuration,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".section_list as section_subsections,
	    ".GIAU_FULL_TABLE_NAME_SECTION().".widget as widget_id
		FROM ".GIAU_FULL_TABLE_NAME_SECTION()." 
		WHERE id=\"".$sectionID."\" LIMIT 1";
	$rows = $wpdb->get_results($querystr, ARRAY_A);
	error_log(" read row: ".count($rows));
	if( count($rows)==1 ){
		return $rows[0];
	}
	return null;
}
function giau_update_section($sectionID, $widgetID, $sectionConfig, $sectionList){
	$section = giau_read_section($sectionID);
	if($section){
		$timestampNow = stringFromDate( getDateNow() );
		$sectionID = $section['section_id'];
		global $wpdb;
		$array = [];
		if($widgetID!==null){
			$array['widget'] = $widgetID;
		}
		error_log("sectionConfig: ".$sectionConfig);
		if($sectionConfig!==null){
			$array['configuration'] = $sectionConfig;
		}
		if($sectionList!==null){
			$array['section_list'] = $sectionList;
		}
		if( count($array)>0 ){
			$array['modified'] = $timestampNow;
			$result = $wpdb->update( GIAU_FULL_TABLE_NAME_SECTION(), $array,
				['id' => $sectionID]);
			if($result===false){
				return null;
			}
		}
		$section = giau_read_section($sectionID);
		return $section;
	}
	return null;

}
function giau_delete_section($sectionID){
	error_log(" delete sectionID: ".$sectionID);
	$section = giau_read_section($sectionID);
	if($section){
		$sectionID = $section['section_id'];
		global $wpdb;
		$result = $wpdb->delete(GIAU_FULL_TABLE_NAME_SECTION(), ['id' => $sectionID]);
		error_log("  result: ".$result);
		if($result===false){
			return null;
		}
		return true;
	}
	return null;
}

function giau_insert_page($pageName, $sectionIDList, $tags){
	$tags = commaSeparatedStringFromString($tags, 255);
	if(!$sectionIDList){
		$sectionIDList = [];
	}
	$sectionList = implode(",", $sectionIDList);
	$timestampNow = stringFromDate( getDateNow() );
	global $wpdb;
	$wpdb->insert(GIAU_FULL_TABLE_NAME_PAGE(),
		array(
			"created" => $timestampNow,
			"modified" => $timestampNow,
			"name" => $pageName,
			"section_list" => $sectionList,
			"tags" => $tags
		)
	);
	return $wpdb->insert_id;
}


// UPDATE


// READ


// DELETE



?>
