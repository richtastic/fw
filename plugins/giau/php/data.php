<?php
// data.php

function giau_data_default_insert_into_database(){
	$timestampNow = stringFromDate( getDateNow() );

	global $wpdb;

	// LANGUAGIZATION
	$langEng = LANGUAGE_EN_US();
	$langKor = LANGUAGE_KO_KP();

	// MAIN PAGE ITEMS:
	giau_insert_languagization($langEng,"CALENDAR_TITLE_TEXT","Upcoming Events");
	giau_insert_languagization($langKor,"CALENDAR_TITLE_TEXT","다가오는 이벤트");

	// -> BIO
	giau_insert_languagization($langEng,"BIO_FIRST_NAME_JOSEPH_KIM_TEXT","Joseph");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_JOSEPH_KIM_TEXT","Kim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_JOSEPH_KIM_TEXT","Reverend Joseph Kim");
	giau_insert_languagization($langEng,"BIO_POSITION_JOSEPH_KIM_TEXT","Director of Christian Education, Interim Junior High Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_JOSEPH_KIM_TEXT","jmkim75@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_JOSEPH_KIM_TEXT","2132006092");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_JOSEPH_KIM_TEXT","Joseph is happily married to Joyce, the woman of his dreams. He has a bachelor’s degree in civil engineering and a Master of Divinity degree and was called into vocational ministry in 2004. He began serving at LACPC as a high school pastor in December 2006 and by God’s grace is currently serving as the director of Christian Education.");
	giau_insert_languagization($langEng,"BIO_URI_JOSEPH_KIM_URI_TEXT","");
	
	giau_insert_languagization($langEng,"BIO_FIRST_NAME_TONY_PARK_TEXT","Tony");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_TONY_PARK_TEXT","Park");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_TONY_PARK_TEXT","Tony Park");
	giau_insert_languagization($langEng,"BIO_POSITION_TONY_PARK_TEXT","Elder of Christian Education");
	giau_insert_languagization($langEng,"BIO_EMAIL_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_PHONE_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_TONY_PARK_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_TONY_PARK_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_KURT_KIM_TEXT","Kurt");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_KURT_KIM_TEXT","Kim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_KURT_KIM_TEXT","Jangyeon Kim");
	giau_insert_languagization($langEng,"BIO_POSITION_KURT_KIM_TEXT","Secretary");
	giau_insert_languagization($langEng,"BIO_EMAIL_KURT_KIM_TEXT","jangyeaonkim@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_KURT_KIM_TEXT","5268571224");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_KURT_KIM_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_KURT_KIM_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_SEBASTIAN_LEE_TEXT","Sebastian");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_SEBASTIAN_LEE_TEXT","Lee");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_SEBASTIAN_LEE_TEXT","Sebastian Lee");
	giau_insert_languagization($langEng,"BIO_POSITION_SEBASTIAN_LEE_TEXT","Finance Deacon");
	giau_insert_languagization($langEng,"BIO_EMAIL_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_PHONE_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_SEBASTIAN_LEE_TEXT","");
	giau_insert_languagization($langEng,"BIO_URI_SEBASTIAN_LEE_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_ANDREW_LIM_TEXT","Andrew");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_ANDREW_LIM_TEXT","Lim");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_ANDREW_LIM_TEXT","Andrew Lim");
	giau_insert_languagization($langEng,"BIO_POSITION_ANDREW_LIM_TEXT","High School Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_ANDREW_LIM_TEXT","mrlimshhs@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_ANDREW_LIM_TEXT","6265366126");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_ANDREW_LIM_TEXT","Andrew has been attending LACPC ever since he was a high school freshman. He got his bachelor’s degree from UC Irvine and a Masters in Pastoral Studies from Azusa Pacific University. He has been serving as the high school pastor since May of last year and also works full time as a high school English teacher.");
	giau_insert_languagization($langEng,"BIO_URI_ANDREW_LIM_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_BORAM_LEE_TEXT","Boram");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_BORAM_LEE_TEXT","Lee");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_BORAM_LEE_TEXT","Boram Lee");
	giau_insert_languagization($langEng,"BIO_POSITION_BORAM_LEE_TEXT","Elementary Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_BORAM_LEE_TEXT","boramjdsn@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_BORAM_LEE_TEXT","9098688457");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_BORAM_LEE_TEXT","Born and raised in Los Angeles, Boram has a BA in cognitive psychology, a multiple subjects credential, and a master’s degree in teaching. She began seminary in January 2013 at Azusa Pacific University where she is studying to obtain an MA in pastoral studies with an emphasis is youth and family ministry. Her passion is to serve and train young children so that they can develop a solid relationship with God.");
	giau_insert_languagization($langEng,"BIO_URI_BORAM_LEE_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_SHEEN_HONG_TEXT","Sheen");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_SHEEN_HONG_TEXT","Hong");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_SHEEN_HONG_TEXT","Sheen Hong");
	giau_insert_languagization($langEng,"BIO_POSITION_SHEEN_HONG_TEXT","Kindergarten Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_SHEEN_HONG_TEXT","pastorhong71@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_SHEEN_HONG_TEXT","2133695590");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_SHEEN_HONG_TEXT","Sheen Hong is a loving mother of two children, Karis and Jin-Sung, and happy wife of Joshua, husband and a Chaplain. She has a bachelor’s degree in Christian education and Master of Arts degree in Christian Education. She was called into Children’s ministry in 2009. She began serving at LACPC as a Kindergarten pastor in December 2015.");
	giau_insert_languagization($langEng,"BIO_URI_SHEEN_HONG_URI_TEXT","");

	giau_insert_languagization($langEng,"BIO_FIRST_NAME_JESSICA_WON_TEXT","Jessica");
	giau_insert_languagization($langEng,"BIO_LAST_NAME_JESSICA_WON_TEXT","Won");
	giau_insert_languagization($langEng,"BIO_DISPLAY_NAME_JESSICA_WON_TEXT","Jessica Won");
	giau_insert_languagization($langEng,"BIO_POSITION_JESSICA_WON_TEXT","Nursery Pastor");
	giau_insert_languagization($langEng,"BIO_EMAIL_JESSICA_WON_TEXT","jcb4jessica@gmail.com");
	giau_insert_languagization($langEng,"BIO_PHONE_JESSICA_WON_TEXT","3232034004");
	giau_insert_languagization($langEng,"BIO_DESCRIPTION_JESSICA_WON_TEXT","Jessica Won is married to Peter Won and has twin boys and a girl. She has a degree of Child Development from Patten University and currently working on M.Div. from Azusa University. She loves to share gospel to children and now oversees the nursery department.");
	giau_insert_languagization($langEng,"BIO_URI_JESSICA_WON_URI_TEXT","");

	// -> CALENDAR
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHILDRENS_DAY_2016_TITLE_TEXT","Children's Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHILDRENS_DAY_2016_DESCRIPTION_TEXT","Joint Worship 11:00 AM");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_LOVE_FESTIVAL_2016_TITLE_TEXT","Love Festival");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_LOVE_FESTIVAL_2016_DESCRIPTION_TEXT","Love Festival for people with developmental disabilities");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_MOTHERS_DAY_2016_TITLE_TEXT","Mothers' Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_MOTHERS_DAY_2016_DESCRIPTION_TEXT","Mothers' Day Celebration");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHERS_DAY_2016_TITLE_TEXT","Teachers' Day");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHERS_DAY_2016_DESCRIPTION_TEXT","Annual Teachers' Day Luncheon 12:30 PM @ Patio");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_TITLE_TEXT","Prayer Meeting");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_DESCRIPTION_TEXT","Bi-Monthly Parents/Teachers' Prayer Meeting");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_TITLE_TEXT","Vacation Bible School");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_DESCRIPTION_TEXT","Vacation Bible School: Cave Quest");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_GRADUATION_2016_TITLE_TEXT","CE Graduation");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_GRADUATION_2016_DESCRIPTION_TEXT","CE Graduation");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_SUMMER_MISSION_2016_TITLE_TEXT","Short-Term Summer Mission");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_SUMMER_MISSION_2016_DESCRIPTION_TEXT","Navajo Reservation in Arizona");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_TITLE_TEXT","Junior High Summer Retreat");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_DESCRIPTION_TEXT","@ Tahquitz Pines");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_TITLE_TEXT","High School Summer Retreat");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_DESCRIPTION_TEXT","@ Lake Arrowhead");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","Orange Tour Conference");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","회의 Orange Tour");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","Korean Challenge!");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","도전! 한국어");
	giau_insert_languagization($langEng,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT","Korean Challenge!");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT","도전! 한국어");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","Hallelujah Night");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","할렐루야 의 밤");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CE Pastors’ Retreat");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CE 목사 후퇴");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","CE Thanksgiving Worship");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","추수 감사절 예배");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","Teacher Appreciation Banquet");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","교사 감사 연회");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","Christmas Celebration");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","크리스마스 축하");

	giau_insert_languagization($langEng,"CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","Junior High & High School Winter Retreat");
	giau_insert_languagization($langKor,"CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","중학교 과 고등학교 겨울 수련회");

	// CALENDAR ITEMS
	// set 1
	giau_insert_calendar("event_childrens_day_2016","CALENDAR_EVENT_CHILDRENS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_CHILDRENS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 1,11, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_love_festival_2016","CALENDAR_EVENT_LOVE_FESTIVAL_2016_TITLE_TEXT","CALENDAR_EVENT_LOVE_FESTIVAL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 7, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_mothers_day_2016","CALENDAR_EVENT_MOTHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_MOTHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 8, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_teachers_day_2016","CALENDAR_EVENT_TEACHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5,15,12,30, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_prayer_meeting_2016","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_TITLE_TEXT","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,10, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_vacation_bible_study_2016","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_TITLE_TEXT","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,17, 0, 0, 0, 0), 2*24*60*60*1000, "");
	giau_insert_calendar("event_ce_graduation_2016","CALENDAR_EVENT_CE_GRADUATION_2016_TITLE_TEXT","CALENDAR_EVENT_CE_GRADUATION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,26, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_summer_mission_2016","CALENDAR_EVENT_SUMMER_MISSION_2016_TITLE_TEXT","CALENDAR_EVENT_SUMMER_MISSION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7, 1, 0, 0, 0, 0), 7*24*60*60*1000, "");	
	giau_insert_calendar("event_jh_summer_retreat_2016","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, "");
	giau_insert_calendar("event_hs_summer_retreat_2016","CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, "");
	// set 2
	giau_insert_calendar("event_orange_tour_2016","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT", stringFromHumanTime(2016, 9,20, 0, 0, 0, 0), 1*24*60*60*1000, "");
	giau_insert_calendar("event_korean_challenge_2016","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 9,25, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_hallelujah_2016","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT", stringFromHumanTime(2016,10,31, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_pastor_retreat_2016","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT", stringFromHumanTime(2016,11,10, 0, 0, 0, 0), 1*24*60*60*1000, "");
	giau_insert_calendar("event_thanksgiving_worship_2016","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT", stringFromHumanTime(2016,11,20, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_teacher_appreciation_2016","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,10, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_christmas_celebration_2016","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,23, 0, 0, 0, 0), 0*24*60*60*1000, "");
	giau_insert_calendar("event_jh_hs_winter_retreat_2017","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT", stringFromHumanTime(2017, 1, 2, 0, 0, 0, 0), 3*24*60*60*1000, "");

	// ?
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");
	giau_insert_languagization($langEng,"","");

	// BIOs
	giau_insert_bio(
			'BIO_FIRST_NAME_JOSEPH_KIM_TEXT',
			'BIO_LAST_NAME_JOSEPH_KIM_TEXT',
			'BIO_DISPLAY_NAME_JOSEPH_KIM_TEXT',
			'BIO_POSITION_JOSEPH_KIM_TEXT',
			'BIO_EMAIL_JOSEPH_KIM_TEXT',
			'BIO_PHONE_JOSEPH_KIM_TEXT',
			'BIO_DESCRIPTION_JOSEPH_KIM_TEXT',
			'BIO_URI_JOSEPH_KIM_URI_TEXT',
			'ce-joe.png',
			'ce,bio,contact'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_TONY_PARK_TEXT',
			'BIO_LAST_NAME_TONY_PARK_TEXT',
			'BIO_DISPLAY_NAME_TONY_PARK_TEXT',
			'BIO_POSITION_TONY_PARK_TEXT',
			'BIO_EMAIL_TONY_PARK_TEXT',
			'BIO_PHONE_TONY_PARK_TEXT',
			'BIO_DESCRIPTION_TONY_PARK_TEXT',
			'BIO_URI_TONY_PARK_URI_TEXT',
			'',
			'bio'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_KURT_KIM_TEXT',
			'BIO_LAST_NAME_KURT_KIM_TEXT',
			'BIO_DISPLAY_NAME_KURT_KIM_TEXT',
			'BIO_POSITION_KURT_KIM_TEXT',
			'BIO_EMAIL_KURT_KIM_TEXT',
			'BIO_PHONE_KURT_KIM_TEXT',
			'BIO_DESCRIPTION_KURT_KIM_TEXT',
			'BIO_URI_KURT_KIM_URI_TEXT',
			'',
			'bio,contact'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_LAST_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_DISPLAY_NAME_SEBASTIAN_LEE_TEXT',
			'BIO_POSITION_SEBASTIAN_LEE_TEXT',
			'BIO_EMAIL_SEBASTIAN_LEE_TEXT',
			'BIO_PHONE_SEBASTIAN_LEE_TEXT',
			'BIO_DESCRIPTION_SEBASTIAN_LEE_TEXT',
			'BIO_URI_SEBASTIAN_LEE_URI_TEXT',
			'',
			'bio'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_ANDREW_LIM_TEXT',
			'BIO_LAST_NAME_ANDREW_LIM_TEXT',
			'BIO_DISPLAY_NAME_ANDREW_LIM_TEXT',
			'BIO_POSITION_ANDREW_LIM_TEXT',
			'BIO_EMAIL_ANDREW_LIM_TEXT',
			'BIO_PHONE_ANDREW_LIM_TEXT',
			'BIO_DESCRIPTION_ANDREW_LIM_TEXT',
			'BIO_URI_ANDREW_LIM_URI_TEXT',
			'ce-andy.png',
			'highschool,bio,contact'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_BORAM_LEE_TEXT',
			'BIO_LAST_NAME_BORAM_LEE_TEXT',
			'BIO_DISPLAY_NAME_BORAM_LEE_TEXT',
			'BIO_POSITION_BORAM_LEE_TEXT',
			'BIO_EMAIL_BORAM_LEE_TEXT',
			'BIO_PHONE_BORAM_LEE_TEXT',
			'BIO_DESCRIPTION_BORAM_LEE_TEXT',
			'BIO_URI_BORAM_LEE_URI_TEXT',
			'ce-boram.png',
			'elementary,bio,contact'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_SHEEN_HONG_TEXT',
			'BIO_LAST_NAME_SHEEN_HONG_TEXT',
			'BIO_DISPLAY_NAME_SHEEN_HONG_TEXT',
			'BIO_POSITION_SHEEN_HONG_TEXT',
			'BIO_EMAIL_SHEEN_HONG_TEXT',
			'BIO_PHONE_SHEEN_HONG_TEXT',
			'BIO_DESCRIPTION_SHEEN_HONG_TEXT',
			'BIO_URI_SHEEN_HONG_URI_TEXT',
			'ce-hong.png',
			'kindergarten,bio,contact'
	);
	giau_insert_bio(
			'BIO_FIRST_NAME_JESSICA_WON_TEXT',
			'BIO_LAST_NAME_JESSICA_WON_TEXT',
			'BIO_DISPLAY_NAME_JESSICA_WON_TEXT',
			'BIO_POSITION_JESSICA_WON_TEXT',
			'BIO_EMAIL_JESSICA_WON_TEXT',
			'BIO_PHONE_JESSICA_WON_TEXT',
			'BIO_DESCRIPTION_JESSICA_WON_TEXT',
			'BIO_URI_JESSICA_WON_URI_TEXT',
			'ce-jessica.png',
			'bio,contact'
	);


	// NAV-WIDGET
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_HOME_TEXT","Home");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_DEPARTMENTS_TEXT","Departments");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_STAFF_TEXT","Staff");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_FORMS_TEXT","Forms");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_CONTACT_TEXT","Contact");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_DISPLAY_LACPC_TEXT","LACPC");

	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_HOME_TEXT","home");
	// giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION__TEXT","");
	// giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION__TEXT","");
	// giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION__TEXT","");
	// giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION__TEXT","");
	// giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION__TEXT","");


	// WIDGET
	/*
	insert_widget('featured','{}');
	insert_widget('navigation','{}');
	insert_widget('language_switch','{}');
	insert_widget('picture_list','{}');
	insert_widget('info_statement','{}');
	insert_widget('image_gallery','{}');
	insert_widget('biography','{}');
	insert_widget('google_map','{}');
	insert_widget('calendar','{}');
	insert_widget('footer','{}');
	insert_widget('contact_form','{}');
	
*/
	// preset defined list of widgets

	$widget_id_text_display = giau_insert_widget("text_display",
		[
			"alias" => "text_display",
			"name" => "Giau Text Display",
			"cssClass" => "giauImageGallery",
			"jsClass" => "giau.ImageGallery",
			"fields" => [
				[
					"name" => "text",
					"type" => "string",
					"languagization" => "true"
				],
				[
					"name" => "class",
					"type" => "string"
				],
				[
					"name" => "style",
					"type" => "string"
				],
			]
		]

	);

	// => IMAGE GALLERY
	$widget_id_image_gallery = giau_insert_widget("image_gallery",
		[
			"alias" => "image_gallery",
			"name" => "Giau Image Gallery",
			"cssClass" => "giauImageGallery",
			"jsClass" => "giau.ImageGallery",
			"fields" => [
				[
					"name" => "autoplay",
					"type" => "number"
				],
				[
					"name" => "display_navigation",
					"type" => "boolean"
				],
				[
					"name" => "style",
					"type" => "string"
				],
				[
					"name" => "images",
					"type" => "array-image"
				]
			]
		]
	);

	giau_insert_languagization($langEng,"PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_BODY_TEXT","\"These commandments I give you today are to be upon your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you are down and when you get up.\"");
	giau_insert_languagization($langEng,"PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_TITLE_TEXT","Deuteronomy 6:6-7");

	$section_id_text_home_page_1 = giau_insert_section($widget_id_text_display,
		[
			// "name" => "home page quote deuteronomy 6, 6:7",
			// "configuration" => [
				"text" => "PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_BODY_TEXT",
				"class" => "centeredText standardText focusedCenterpieceWidth",
				"style" => ""
			//]
		]
	, []);

	// section 
	$section_id_gallery_home_page_top = giau_insert_section($widget_id_image_gallery,
		[
			"name" => "home page top image gallery",
			"configuration" => 
			[
				"autoplay" => "10000",
				"display_navigation" => "true",
				"style" => "position:relative; width:100%; height:400px;",
				"images" => [
					"featured_01_opt.png",
					"featured_02_opt.png"
				]
			]
		]
 	, []);

	// page
	/*
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		name VARCHAR(255) NOT NULL,
		sectionList VARCHAR(65535) NOT NULL,
	*/

	// $widget_front_page_navigation = [
	// 	"" => ""
	// ];
	// PAGE - MAIN
	$page_id_front_page = giau_insert_page("home_page",[
		$section_id_gallery_home_page_top
		]);
	// PAGE - DEPARTMENTS
	$page_departments_nursery = [
		"title" => ""
	];

	// SUB-NAV-WIDGET

	//EN|KO
	//HomeDepartmentsStaffFormsContact UsLACPC


	// PAGE DEPARTMENT - NURSURY
	giau_insert_languagization($langEng,"PAGE_DEPARTMENT_NURSERY_TITLE_TEXT","NURSERY");
	giau_insert_languagization($langEng,"PAGE_DEPARTMENT_NURSERY_SUBTITLE_TEXT","");
	giau_insert_languagization($langEng,"PAGE_DEPARTMENT_NURSERY_STATEMENT_TITLE_TEXT","Nursery of Overflowing Love");




	/*
	$departmentPageDataPageNursery = [
		"heading" => "NURSERY",
		"statement_title" => "Nursery of Overflowing Love",
		"statement_body" => "And now these three remain: fath, hope and love, but the greatest of these is love. - 1 Corinthians 13:13",
		"statement_image_suffix" => "featured_nursery.png",
		"statement_color_bg" => "#CBC42D",
		"statement_color_top" => "#BBBB22",
		"statement_color_bot" => "#BBBB22",
		"services" => [
			[
				"title" => "Sunday Worship<br/>1st Service",
				"body" => "9:00 AM<br/>@ Nursery Worship Room<br/>(in Nursery Building)"
			],
			[
				"title" => "Sunday Worship<br/>2nd Service",
				"body" => "11:00 AM<br/>@ Nursery Worship Room<br/>(in Nursery Building)"
			],
			[
				"title" => "Friday Night<br/>Fellowship",
				"body" => "8:00 PM<br/>@ Nursery Building"
			]
		],
		"personnel" => [
			[
				"display_name" => "Jessica Won",
				"display_email" => "jcb4jessica@gmail.com",
				"display_phone" => "(323) 203-4044",
				"image_relative_path" => "ce-jessica.png"
			]
		],
		"breakdown" => [
			[
				"type" => "bold",
				"display" => "The Nursery department at LACPC envisions a children's ministry that follows the overarching theme of the education department, \"Father's House.\" Through nursery department's worship, gudance, and nuturing, we hope to restablish the following:"
			],
			[
				"type" => "featured",
				"display" => "1"
			],
			[
				"type" => "info",
				"display" => "Family worships and communication with families that will enrich the spiritual lives of our young children."
			],
			[
				"type" => "featured",
				"display" => "2"
			],
			[
				"type" => "info",
				"display" => "Family visitations that will enhance the love of God."
			],
			[
				"type" => "featured",
				"display" => "3"
			],
			[
				"type" => "info",
				"display" => "Revival and acceptance of multicultural children and families."
			],
		],
		"image_gallery" => [ // TODO : NURSERY IMAGES
			"prefix" => relativePathIMG()."departments/galleries/"."elementary/",
			"images" => [
				"gallery_01.png",
				"gallery_02.png",
				"gallery_03.png",
				"gallery_04.png",
				"gallery_05.png",
				"gallery_06.png",
				"gallery_07.png",
				"gallery_08.png",
				"gallery_09.png"
			]
		]
	];
	*/
/*
	ALL TYPES: -- all literals are strings later parsed into actual primitive types in JS as needed
		boolean = boolean
		number = int, float
		string = string
		image = string, expecting an image URL
			-> sub attribute languagization
		array-<sub-type>
				{
					"name": "title",
					"type": "string"
					"languagization" => "true"
				}
	*/

}


?>
