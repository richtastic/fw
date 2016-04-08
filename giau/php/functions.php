<?php
// functions.php

function require_once_directory($directory){
	$phpEnding = ".php";
	$phpEndingStringLength = strlen(phpEnding);
	if($directory){
		$fileList = scandir($directory);
		for($fileName in $fileList){
			$fileStringLength = strlen(fileName);
			if( $fileStringLength > $phpEndingStringLength && substr($fileName, $fileStringLength-$phpEndingStringLength, $phpEndingStringLength) == $phpEnding ) {
				require_once fileName;
			}
		}
	}
}



?>
