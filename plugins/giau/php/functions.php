<?php
// functions.php

function require_once_directory($directory){
	error_log("require_once_directory: '".$directory."'");
	$phpEnding = ".php";
	$phpEndingStringLength = strlen(phpEnding);
	if($directory){
		$directoryExists = file_exists($directory);
		if($directoryExists){
			$fileList = scandir($directory);
			foreach($fileList as $fileKey => $fileValue){
				error_log($fileKey." = ".$fileValue);
				$fileName = $fileValue;
				$fileStringLength = strlen($fileName);
				if( $fileStringLength > $phpEndingStringLength && substr($fileName, $fileStringLength-$phpEndingStringLength, $phpEndingStringLength) == $phpEnding ) {
					require_once fileName;
				}
			}
		}
	}
}

function padLeft($input, $padding, $count){
	$string = "".$input; // force string
	if( strlen($string)>$count ){
		$string = substr($string, 0, $count);
	}
	return str_pad($string, $count, $padding,STR_PAD_LEFT);
}
function padRight($input, $padding, $count){
	$string = "".$input; // force string
	if( strlen($string)>$count ){
		$string = substr($string, 0, $count);
	}
	return str_pad($string, $count, $padding,STR_PAD_RIGHT);
}
function getDateNow(){
	return dateFromString( date("Y-m-d H:i:s.0000") );
}
function stringFromHumanTime($year, $month, $day, $hour, $minute, $second, $millisecond){// 0-9999, 1-12, 1-31, 0-23, 0-59, 0-59, 0-9999
	$year = intval($year); $year = min(max($year,0),9999);
	$month = intval($month); $month = min(max($month,1),12);
	$day = intval($day); $day = min(max($day,1),31);
	$hour = intval($hour); $hour = min(max($hour,0),23);
	$minute = intval($minute); $minute = min(max($minute,0),59);
	$second = intval($second); $second = min(max($second,0),59);
	$millisecond = intval($millisecond); $millisecond = min(max($millisecond,0),9999);
	//
	$year = padLeft($year,"0",4);
	$month = padLeft($month,"0",2);
	$day = padLeft($day,"0",2);
	$hour = padLeft($hour,"0",2);
	$minute = padLeft($minute,"0",2);
	$second = padLeft($second,"0",2);
	$millisecond = padLeft($millisecond,"0",4);
	return $year."-".$month."-".$day." ".$hour.":".$minute.":".$second.".".$millisecond;
}
function stringFromDate($dat){
	return date("Y-m-d H:i:s.0000",$dat); // YYYY-MM-DD HH:NN:SS.NNNN
}
function timeValuesFromString($str){ // hour : minute : second . millisecond
	if(strlen($str)<8){
		return null;
	}
	$arr = array();
	array_push($arr, intval(substr($str,0,2),10) );
	array_push($arr, intval(substr($str,3,2),10) );
	array_push($arr, intval(substr($str,6,2),10) );
	if(strlen($str)>=13){
		array_push($arr, intval(substr($str,9,4),10) );
	}else{
		array_push($arr, 0 );
	}
	return $arr;
}
function dateFromString($str){ // seconds from Unix Epoc
	if( strlen($str)<10 ){
		return null;
	}
	$arr=null; $yyyy=0; $mm=0; $dd=0; $hh=0; $nn=0; $ss=0; $nnnn=0;
	$yyyy = intval(substr($str,0,4));
	$mm = intval(substr($str,5,2)); // +1
	$dd = intval(substr($str,8,2));
	if( strlen($str)>=19 ){
		$arr = timeValuesFromString(substr($str,11,strlen($str)));
		$hh = $arr[0];
		$nn = $arr[1];
		$ss = $arr[2];
		if(count($arr)==4){
			$nnnn = $arr[3];
		}
	}
	$date = mktime($hh,$nn,$ss,$mm,$dd,$yyyy,-1);
	// gmmktime
	return $date;
}
// function getTimestampMilliseconds($){ // 2015-06-28T12:34:56.0000Z
// 	return ;
// }
// function getTimestampISO8601FromMilliseconds($timestamp){
// 	$seconds = round($timestamp/1000);
// 	$milliseconds = ($seconds*1000) - $timestamp;
// 	timestamp = $seconds; 
// 	$date = getdate($timestamp);
// 	$seconds = $date["seconds"];
// 	$minutes = $date["minutes"];
// 	$hours = $date["hours"];
// 	$day = $date["mday"];
// 	$month = $date["mon"];
// 	$year = $date["year"];
// 	$timestamp = $year."-".$month."-".$day."T".$hour.":".$minutes.":".$seconds.".".$milliseconds;
// 	return $timestamp;
// }

/*

function dateFromString($str){
	if( strlen($str)<10 ){
		return null;
	}
	$arr=null; $yyyy=0; $mm=0; $dd=0; $hh=0; $nn=0; $ss=0; $nnnn=0;
	$yyyy = intval(substr($str,0,4));
	$mm = intval(substr($str,5,2)); // +1
	$dd = intval(substr($str,8,2));
	if( strlen($str)>=19 ){
		$arr = timeValuesFromString(substr($str,11,strlen($str)));
		$hh = $arr[0];
		$nn = $arr[1];
		$ss = $arr[2];
		if(count($arr)==4){
			$nnnn = $arr[3];
		}
	}
	$date = mktime($hh,$nn,$ss,$mm,$dd,$yyyy,-1);
	// date.setUTC
	return $date;
}

function timeValuesFromString($str){ // hour : minute : second . millisecond
	if(strlen($str)<8){
		return null;
	}
	$arr = array();
	array_push($arr, intval(substr($str,0,2),10) );
	array_push($arr, intval(substr($str,3,2),10) );
	array_push($arr, intval(substr($str,6,2),10) );
	if(strlen($str)>=13){
		array_push($arr, intval(substr($str,9,4),10) );
	}else{
		array_push($arr, 0 );
	}
	return $arr;
}


*/

?>
