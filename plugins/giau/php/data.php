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

	$calendar_tag_front_page = "frontpage";//"fp";
	$calendar_tag_nursery = "nrs";//"nursery";
	$calendar_tag_kindergarten = "kg";//"kindergarten";
	$calendar_tag_elementary = "ele";//"elementary";
	$calendar_tag_juniorhigh = "jrh";//"juniorhigh";
	$calendar_tag_highschool = "hs";//"highschool";
	$calendar_tag_koreanschool = "ks";//"koreanschool";

	// CALENDAR ITEMS
	// set 1
	giau_insert_calendar("event_childrens_day_2016","CALENDAR_EVENT_CHILDRENS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_CHILDRENS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 1,11, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_love_festival_2016","CALENDAR_EVENT_LOVE_FESTIVAL_2016_TITLE_TEXT","CALENDAR_EVENT_LOVE_FESTIVAL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 7, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_mothers_day_2016","CALENDAR_EVENT_MOTHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_MOTHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5, 8, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_teachers_day_2016","CALENDAR_EVENT_TEACHERS_DAY_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHERS_DAY_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 5,15,12,30, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_prayer_meeting_2016","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_TITLE_TEXT","CALENDAR_EVENT_PRAYER_MEETING_JUNE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,10, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page]);
	giau_insert_calendar("event_vacation_bible_study_2016","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_TITLE_TEXT","CALENDAR_EVENT_VACATION_BIBLE_SCHOOL_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,17, 0, 0, 0, 0), 2*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_ce_graduation_2016","CALENDAR_EVENT_CE_GRADUATION_2016_TITLE_TEXT","CALENDAR_EVENT_CE_GRADUATION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 6,26, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_summer_mission_2016","CALENDAR_EVENT_SUMMER_MISSION_2016_TITLE_TEXT","CALENDAR_EVENT_SUMMER_MISSION_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7, 1, 0, 0, 0, 0), 7*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_jh_summer_retreat_2016","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_JH_SUMMER_RETREAT_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh]);
	giau_insert_calendar("event_hs_summer_retreat_2016","CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_HS_SUMMER_RETREAT_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 7,31, 0, 0, 0, 0), 4*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_highschool]);
	// set 2
	giau_insert_calendar("event_orange_tour_2016","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT","CALENDAR_EVENT_ORANGE_TOUR_CONFERENCE_2016_TITLE_TEXT", stringFromHumanTime(2016, 9,20, 0, 0, 0, 0), 1*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_korean_challenge_2016","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_TITLE_TEXT","CALENDAR_EVENT_KOREAN_CHALLENGE_2016_DESCRIPTION_TEXT", stringFromHumanTime(2016, 9,25, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_hallelujah_2016","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT","CALENDAR_EVENT_HALLELUJAH_NIGHT_2016_TITLE_TEXT", stringFromHumanTime(2016,10,31, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_pastor_retreat_2016","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT","CALENDAR_EVENT_CE_PASTOR_RETREAT_2016_TITLE_TEXT", stringFromHumanTime(2016,11,10, 0, 0, 0, 0), 1*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_thanksgiving_worship_2016","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT","CALENDAR_EVENT_CE_THANKSGIVING_WORSHIP_2016_TITLE_TEXT", stringFromHumanTime(2016,11,20, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_teacher_appreciation_2016","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT","CALENDAR_EVENT_TEACHER_APPRECIATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,10, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_christmas_celebration_2016","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT","CALENDAR_EVENT_CHRISTMAS_CELEBRATION_2016_TITLE_TEXT", stringFromHumanTime(2016,12,23, 0, 0, 0, 0), 0*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_nursery, $calendar_tag_kindergarten, $calendar_tag_elementary, $calendar_tag_juniorhigh, $calendar_tag_highschool]);
	giau_insert_calendar("event_jh_hs_winter_retreat_2017","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT","CALENDAR_EVENT_JH_HS_WINTER_RETREAT_TITLE_TEXT", stringFromHumanTime(2017, 1, 2, 0, 0, 0, 0), 3*24*60*60*1000, [$calendar_tag_front_page, $calendar_tag_juniorhigh, $calendar_tag_highschool]);

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

	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_HOME_TEXT","Home");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_DEPARTMENTS_TEXT","Departments");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_STAFF_TEXT","Staff");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_FORMS_TEXT","Forms");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_CONTACT_TEXT","Contact Us");
	giau_insert_languagization($langEng,"NAV_ITEM_PAGE_NAVIGATION_LACPC_TEXT","LACPC");
	

	giau_insert_languagization($langEng,"LANGUAGE_SWITCH_ENGLISH_TEXT","EN");
	giau_insert_languagization($langEng,"LANGUAGE_SWITCH_KOREAN_TEXT","KO");

	giau_insert_languagization($langEng,"FOOTER_TITLE_TEXT","THE FATHER'S HOUSE");
	giau_insert_languagization($langEng,"FOOTER_ADDRESS_1_TEXT","Los Angeles Presbyterian Church");
	giau_insert_languagization($langEng,"FOOTER_ADDRESS_2_TEXT","2241 N. Eastern Ave.");
	giau_insert_languagization($langEng,"FOOTER_ADDRESS_3_TEXT","Los Angeles, CA 90032");
	giau_insert_languagization($langEng,"FOOTER_COPYRIGHT_TEXT","LACPC Christian Education © 2016");

	giau_insert_languagization($langEng,"PAGE_HOME_OVERLAY_TITLE_1_TEXT","THE FATHER'S HOUSE");
	giau_insert_languagization($langEng,"PAGE_HOME_OVERLAY_TITLE_2_TEXT","JOIN US FOR WORSHIP");
	giau_insert_languagization($langEng,"PAGE_HOME_OVERLAY_TITLE_3_TEXT","Sunday at 11:00 a.m.");

	giau_insert_languagization($langEng,"HEADING_HOME_CALENDAR_SCHEDULE_TEXT","Schedule of Events");


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

	// => EMPTY CONTAINER
	$widget_id_content_container = giau_insert_widget("content_container",
		[
			"alias" => "content_container",
			"name" => "Giau Empty",
			"cssClass" => "",
			"jsClass" => "",
			"fields" => [
				"class" => [
					"type" => "string"
				],
				"style" => [
					"type" => "string"
				],
			]
		]
	);

	// => NAVIGATION
	$widget_id_navigation_list = giau_insert_widget("navigation_list",
		[
			"alias" => "navigation_list",
			"name" => "Giau Navigation",
			"cssClass" => "giauNavigationItemList",
			"jsClass" => "giau.NavigationList",
			"fields" => [
				"components" => [
					"type" => "array-object",
					"description" => "navigation item",
					"fields" => [
						"display_text" => [
							"type" => "string",
							"description" => "displayed text"
						],
						"uri" => [
							"type" => "string",
							"description" => "location destination"
						]
					]
				],
				"class" => [
					"type" => "string"
				],
				"style" => [
					"type" => "string"
				],
			]
		]
	);

	// => LANGUAGE TOGGLE SWITCH
	$widget_id_language_switch = giau_insert_widget("language_switch",
		[
			"alias" => "language_switch",
			"name" => "Giau Language Toggle",
			"cssClass" => "giauLanguageToggleSwitch",
			"jsClass" => "giau.LanguageToggle",
			"fields" => [
				"languages" => [
					"type" => "array-object",
					"description" => "list of language switches",
					"fields" => [
						"display_text" => [
							"type" => "string",
							"description" => "displayed text"
						],
						"language_name" => [
							"type" => "string",
							"description" => "language type, eg: en, en-US, ko, ko-KP"
						],
					]
				]
			]
		]
	);

	// => DISPLAY OVERLAY
	$widget_id_display_overlay = giau_insert_widget("display_overlay",
		[
			"alias" => "display_overlay",
			"name" => "Giau Display Overlay",
			"cssClass" => "giauInfoOverlay",
			"jsClass" => "giau.InfoOverlay",
			"fields" => [
				//
			]
		]
	);

	// => HALLMARK EMBLEM
	$widget_id_hallmark_emblem = giau_insert_widget("hallmark_emblem",
		[
		]
	);

	// => TEXT DISPLAY
	$widget_id_text_display = giau_insert_widget("text_display",
		[
			"alias" => "text_display",
			"name" => "Giau Text Display",
			"cssClass" => "giauImageGallery",
			"jsClass" => "giau.ImageGallery",
			"fields" => [
				"text" => [
					"type" => "string",
					"languagization" => "true"
				],
				"class" => [
					"type" => "string"
				],
				"style" => [
					"type" => "string"
				],
			]
		]
	);

	// => VERTICAL DIVIDER
	$widget_id_vertical_divider = giau_insert_widget("vertical_divider",
		[
			"alias" => "vertical_divider",
			"name" => "Giau Vertical Divider",
			"cssClass" => "",
			"jsClass" => "",
			"fields" => [
				"show_bar" => [
					"type" => "boolean",
				],
				"height" => [
					"type" => "string"
				],
				"class" => [
					"type" => "string"
				],
			]
		]
	);

	// => CATEGORY LISTING
	$widget_id_category_listing = giau_insert_widget("category_listing",
		[
			"alias" => "category_listing",
			"name" => "Giau Category Listing",
			"cssClass" => "giauCategoryListing",
			"jsClass" => "giau.CategoryListing",
			"fields" => [
				"categories" => [
					"type" => "array-object",
					"description" => "category items",
					"fields" => [
						"image" => [
							"type" => "string-image",
							"description" => "image for item"
						],
						"name" => [
							"type" => "string",
							"description" => "name for item"
						]
					]
				],
				"rounded" => [
					"type" => "boolean",
					"description" => "round image edges"
				],
				"style" => [
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
				"autoplay" => [
					"type" => "number",
					"description" => "time in milliseconds to autoplay, 0 or negative turns this off",
					"hint" => "eg: 10000"
				],
				"display_navigation" => [
					"type" => "boolean",
					"description" => "show the left and right navigation arrows"
				],
				"style" => [
					"type" => "string"
				],
				"images" => [
					"type" => "array-image",
					"description" => "list of images for gallery"
				]
			]
		]
	);

	// => FOOTER
	$widget_id_footer = giau_insert_widget("bottom_footer",
		[
			"alias" => "bottom_footer",
			"name" => "Giau Bottom Footer",
			"cssClass" => "",
			"jsClass" => "",
			"fields" => [
				// "?" => [
				// 	"type" => "?",
				// 	"description" => "?"
				// ]
			]
		]
	);

	// => CALENDAR LISTING
	$widget_id_calendar_listing = giau_insert_widget("calendar_listing",
		[
			"alias" => "calendar_listing",
			"name" => "Giau Bottom Footer",
			"cssClass" => "giauCalendarList",
			"jsClass" => "giau.CalendarListView",
			"fields" => [
				"tags" => [
					"type" => "array-string",
					"description" => "list of tags to filter on"
				],
				"range_start" => [
					"type" => "number",
					"description" => "start date or lookback time (milliseconds)"
				],
				"range_end" => [
					"type" => "number",
					"description" => "end date or lookahead time (milliseconds)"
				],
				"relative" => [
					"type" => "boolean",
					"description" => "whether to use start/end range from current date or as absolute date"
				],
				"order_recent_first" => [
					"type" => "boolean",
					"description" => "order by earlier to later"
				],
				"min_count" => [
					"type" => "number",
					"description" => "minimum number of items to display"
				],
				"max_count" => [
					"type" => "number",
					"description" => "maximum number of items to display"
				]
			]
		]
	);

	// => SOCIAL APPS
	$widget_id_social_apps = giau_insert_widget("social_apps",
		[
			"alias" => "social_apps",
			"name" => "Giau Social Apps",
			"cssClass" => "",
			"jsClass" => "",
			"fields" => [
				"social" => [
					"type" => "object",
					"description" => "social items",
					"fields" => [
						"facebook" => [
							"type" => "array-object",
							"description" => "facebook data",
							"fields" => [
								"uri" => [
									"type" => "string",
									"description" => "external link url"
								],
								"icon" => [
									"type" => "string-image",
									"description" => "display image"
								]
							]
						],
						"twitter" => [
							"type" => "array-object",
							"description" => "twitter data",
							"fields" => [
								"uri" => [
									"type" => "string",
									"description" => "external link url"
								],
								"icon" => [
									"type" => "string-image",
									"description" => "display image"
								]
							]
						],
						"instagram" => [
							"type" => "array-object",
							"description" => "instagram data",
							"fields" => [
								"uri" => [
									"type" => "string",
									"description" => "external link url"
								],
								"icon" => [
									"type" => "string-image",
									"description" => "display image"
								]
							]
						],
						"tumblr" => [
							"type" => "array-object",
							"description" => "tumblr data",
							"fields" => [
								"uri" => [
									"type" => "string",
									"description" => "external link url"
								],
								"icon" => [
									"type" => "string-image",
									"description" => "display image"
								]
							]
						],
						"email" => [
							"type" => "array-object",
							"description" => "email data",
							"fields" => [
								"uri" => [
									"type" => "string",
									"description" => "external link url"
								],
								"icon" => [
									"type" => "string-image",
									"description" => "display image"
								]
							]
						]
					]
				],
				"class" => [
					"type" => "string"
				],
			]
		]
	);

	
	$section_id_navigation_main = giau_insert_section($widget_id_navigation_list,
		[
			"components" => [ // return $root."?page=".$pageName."&sp=".($subpage ? $subpage : "");
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_HOME_TEXT",
					"uri" => "./?page=home&sp="
				],
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_DEPARTMENTS_TEXT",
					"uri" => "./?page=departments&sp="
				],
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_STAFF_TEXT",
					"uri" => "./?page=staff&sp="
				],
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_FORMS_TEXT",
					"uri" => "./?page=forms&sp="
				],
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_CONTACT_TEXT",
					"uri" => "./?page=contact&sp="
				],
				[
					"display_text" => "NAV_ITEM_PAGE_NAVIGATION_LACPC_TEXT",
					"uri" => "http://www.lacpcks.org"
				]
			]
		]
	, []);

	$section_id_language_switch = giau_insert_section($widget_id_language_switch,
		[
			"languages" => [
				[
					"display_text" => "LANGUAGE_SWITCH_ENGLISH_TEXT",
					"language_name" => "en"
				],
				[
					"display_text" => "LANGUAGE_SWITCH_KOREAN_TEXT",
					"language_name" => "ko"
				]
			]
		]
	, []);


	$section_id_text_overlay_1 = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_OVERLAY_TITLE_1_TEXT",
			"class" => "featureInfoOverlayHeading",
		]
	, []);
	$section_id_text_overlay_2 = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_OVERLAY_TITLE_2_TEXT",
			"class" => "featureInfoOverlayTitle",
		]
	, []);
	$section_id_text_overlay_3 = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_OVERLAY_TITLE_3_TEXT",
			"class" => "featureInfoOverlaySubtitle",
		]
	, []);
	$section_id_text_overlay_spacer = giau_insert_section($widget_id_text_display,
		[
			"text" => "",
			"class" => "",
		]
	, []);

	$section_id_home_gallery_overlay = giau_insert_section($widget_id_display_overlay,
		[
			//
		]
	, [$section_id_text_overlay_1,$section_id_text_overlay_spacer,$section_id_text_overlay_2,$section_id_text_overlay_spacer,$section_id_text_overlay_3,$section_id_text_overlay_spacer]);

	giau_insert_languagization($langEng,"PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_BODY_TEXT","\"These commandments I give you today are to be upon your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you are down and when you get up.\"");
	giau_insert_languagization($langEng,"PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_TITLE_TEXT","Deuteronomy 6:6-7");
	giau_insert_languagization($langEng,"PAGE_HOME_QUOTE_PURPOSE_BODY_TEXT","Through worship, bible study & accountability, we strive to provide an environment for our children and youth to experience the grace of God. In addition, we aim to serve parents and entire families as well. More than just a children and youth ministry, our Christian Education department is a family ministry.");


		$section_category_prefix = "./wp-content/themes/giau/img/departments/";
	$section_id_category_listing_departments = giau_insert_section($widget_id_category_listing,
		[
			"categories" => [
				[
					"image" => $section_category_prefix."category_nursery.png",
					"name" => "Nursery",
					"uri" => "./?page=departments&sp=nursery"
				],
				[
					"image" => $section_category_prefix."category_kindergarten.png",
					"name" => "Kindergarten",
					"uri" => "./?page=departments&sp=kindergarten"
				],
				[
					"image" => $section_category_prefix."category_elementary.png",
					"name" => "Elementary",
					"uri" => "./?page=departments&sp=elementary"
				],
				[
					"image" => $section_category_prefix."category_junior_high.png",
					"name" => "Junior High",
					"uri" => "./?page=departments&sp=juniorhigh"
				],
				[
					"image" => $section_category_prefix."category_high_school.png",
					"name" => "High School",
					"uri" => "./?page=departments&sp=highschool"
				],
				[
					"image" => $section_category_prefix."category_korean_school.png",
					"name" => "Korean School",
					"uri" => "http://www.lacpcks.org"
				]
			],
			"class_image" => "",
			"class_text" => "",
			"rounded" => "true",
			"class" => "customCategoryDepartments",
			"style" => ""
		]
	, []);

	$section_id_navigation_main_shadow = giau_insert_section($widget_id_content_container,
		[
			"style" => "position:absolute; display:inline-block; left:0; right:0; top:0; height:50px; background-repeat:repeat-x; background-image:url('./wp-content/themes/giau/img/shadow_fade_top.png');",
			"class" => ""
		]
	, []);


	$section_id_navigation_main_container = giau_insert_section($widget_id_content_container,
		[
			"style" => "position:absolute; display:inline-block; text-align:center;  width:100%;",
			"class" => "headerNavigationContainer"
		]
	, [$section_id_navigation_main_shadow, $section_id_language_switch, $section_id_navigation_main]);


		$section_image_gallery_prefix = "./wp-content/themes/giau/img/gallery_featured/";
	$section_id_gallery_home_page_primary = giau_insert_section($widget_id_image_gallery,
		[
			"autoplay" => "10000",
			"display_navigation" => "false",
			"images" => [
				$section_image_gallery_prefix."featured_06_opt.png",
				$section_image_gallery_prefix."featured_01_opt.png",
				$section_image_gallery_prefix."featured_02_opt.png",
				$section_image_gallery_prefix."featured_03_opt.png",
				$section_image_gallery_prefix."featured_04_opt.png",
				$section_image_gallery_prefix."featured_05_opt.png",
			],
			"style" => "",
			"class" => "featurePresentationContainer"
		]
	, [$section_id_home_gallery_overlay, $section_id_navigation_main_container]);

	// $section_id_home_page_top = giau_insert_section($widget_id_content_container,
	// 	[
	// 		"style" => "",
	// 		"class" => ""
	// 	]
	// , []);


	$section_id_image_gallery_home_secondary = giau_insert_section($widget_id_image_gallery,
		[
			"autoplay" => "20000",
			"display_navigation" => "true",
			"images" => [
				$section_image_gallery_prefix."featured_01_opt.png",
				$section_image_gallery_prefix."featured_02_opt.png",
				$section_image_gallery_prefix."featured_03_opt.png",
				$section_image_gallery_prefix."featured_04_opt.png",
				$section_image_gallery_prefix."featured_05_opt.png",
				$section_image_gallery_prefix."featured_06_opt.png",
			],
			"style" => "position:relative; width:100%; height:400px;",
			"class" => "limitedWidth"
		]
	, []);


	$section_id_text_home_page_deuteronomy_title = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_TITLE_TEXT",
			"class" => "centeredText importantText focusedCenterpieceWidth customHeadingQuoteTitle",
		]
	, []);
	$section_id_text_home_page_deuteronomy_body = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_QUOTE_DEUTERONOMY_6_6_7_BODY_TEXT",
			"class" => "centeredText standardText narrow50Text customHeadingQuoteBody",
		]
	, []);
	$section_id_text_home_page_deuteronomy_spacer = giau_insert_section($widget_id_text_display,
		[
			"text" => "",
			"class" => "dividerText",
		]
	, []);
	$section_id_text_home_page_purpose_body = giau_insert_section($widget_id_text_display,
		[
			"text" => "PAGE_HOME_QUOTE_PURPOSE_BODY_TEXT",
			"class" => "centeredText standardText narrow50Text customHeadingQuoteBody",
		]
	, []);

	$section_id_divider_with_bar = giau_insert_section($widget_id_vertical_divider,
		[
			"show_bar" => "true",
			"height" => "8",
		]
	, []);


	$section_id_text_footer_title = giau_insert_section($widget_id_text_display,
		[
			"text" => "FOOTER_TITLE_TEXT",
			"class" => "footerElementTitle",
		]
	, []);

	$section_id_text_footer_address_1 = giau_insert_section($widget_id_text_display,
		[
			"text" => "FOOTER_ADDRESS_1_TEXT",
			"class" => "footerElementTextLine",
		]
	, []);

	$section_id_text_footer_address_2 = giau_insert_section($widget_id_text_display,
		[
			"text" => "FOOTER_ADDRESS_2_TEXT",
			"class" => "footerElementTextLine",
		]
	, []);

	$section_id_text_footer_address_3 = giau_insert_section($widget_id_text_display,
		[
			"text" => "FOOTER_ADDRESS_3_TEXT",
			"class" => "footerElementTextLine",
		]
	, []);

	$section_id_text_footer_copyright = giau_insert_section($widget_id_text_display,
		[
			"text" => "FOOTER_COPYRIGHT_TEXT",
			"class" => "footerElementTextCopyright",
		]
	, []);

	$section_id_text_footer_bottom_empty = giau_insert_section($widget_id_text_display,
		[
			"text" => "",
			"class" => "footerElementBottom",
		]
	, []);

	$section_id_text_calendar_heading = giau_insert_section($widget_id_text_display,
		[
			"text" => "HEADING_HOME_CALENDAR_SCHEDULE_TEXT",
			"class" => "customHeadingCalendarSchedule limitedWidth",
		]
	, []);

	$section_id_social_apps = giau_insert_section($widget_id_social_apps,
		[
			"social" => [
				"facebook" => [
					"uri" => "https://www.facebook.com/thefathershouse.lacpc",
					"icon" => "./wp-content/themes/giau/img/social/icon_footer_facebook.png"
				],
				"twitter" => [
					"uri" => "https://twitter.com/thefathersh0use?lang=en",
					"icon" => "./wp-content/themes/giau/img/social/icon_footer_twitter.png"
				],
				"instagram" => [
					"uri" => "",
					"icon" => "./wp-content/themes/giau/img/social/icon_footer_instagram.png"
				],
				"email" => [
					"uri" => "mailto:ce@lacpc.org",
					"icon" => "./wp-content/themes/giau/img/social/icon_footer_email.png"
				],
			],
			"class" => "footerElementSocialItem"
		]
	, []);
	
	$section_id_footer_all = giau_insert_section($widget_id_footer,
		[
				//
		]
	, [$section_id_text_footer_title, $section_id_social_apps, $section_id_text_footer_address_1, $section_id_text_footer_address_2 , $section_id_text_footer_address_3 , $section_id_text_footer_copyright, $section_id_text_footer_bottom_empty]);

	$section_id_calendar_listing_home = giau_insert_section($widget_id_calendar_listing,
		[
			"tags" => [$calendar_tag_front_page],
			"range_start" => "".(-10*24*60*60*1000), // 7 days ago
			"range_end" => "".(120*24*60*60*1000), // 4 months into future
			"relative" => "true", // treat numbers as milliseconds around date |OR| as absolute unix epoc times
			"order_recent_first" => "true",
			"class" => "limitedWidth"
		]
	, []);


	// PAGES 
	
	$PAGE_TAG_LIVE = "live";
	// PAGE - MAIN
	$page_id_front_page = giau_insert_page("home_page",
		[
			//$section_id_home_page_top,
			$section_id_gallery_home_page_primary,

			$section_id_category_listing_departments,

			$section_id_divider_with_bar,
			$section_id_text_home_page_purpose_body,
			$section_id_text_home_page_deuteronomy_spacer,
			
			$section_id_image_gallery_home_secondary,

			$section_id_text_home_page_deuteronomy_title,
			$section_id_text_home_page_deuteronomy_body,

			$section_id_divider_with_bar,

			$section_id_text_calendar_heading,

			$section_id_calendar_listing_home,

			$section_id_footer_all
		],
		"".$PAGE_TAG_LIVE.""
	);
	// PAGE - DEPARTMENTS
	

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
