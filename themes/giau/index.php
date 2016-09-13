<?php
/**
 * giau
 *
 * @package giau
 * @subpackage giau
 */


include_once (TEMPLATEPATH . '/php/functions.php');

// 
$fxns = TEMPLATEPATH . '/../../plugins/giau/php/functions.php';
error_log($fxns);
// include_once ($fxns);

// $GIAU_ROOT_PATH = dirname(__FILE__);
// error_log("GIAU_ROOT_PATH: ".$GIAU_ROOT_PATH);
// require_once($GIAU_ROOT_PATH.'/php/functions.php');
//require_once_directory( dirname(__FILE__)."/php/" );

//error_log( dateFromString( "2016-07-05 12:45:31.6000" ) );


    // $results = giau_calendar_events_all();

    // foreach( $results as $row ) {
    //     $row_id = $row["id"];
    //     $row_created = $row["created"];
    //     $row_modified = $row["modified"];
    //     $row_short_name = $row["short_name"];
    //     $row_title = $row["title"];
    //     $row_description = $row["description"];
    //     $row_start_date = $row["start_date"];
    //     $row_duration = $row["duration"];
    //     error_log("FOUND: ".$row_id." = ".$row_title);
    // }







// for($i=0; $i<count($results); ++$i){
// 	$result = $results[$i];
// 	//$modified = $result["modified"];
// 	error_log($i.": ".$result);
// 	print_r($result);
// 	echo "<br/>";
// 	print_r($result->modified);
// 	echo "<br/>";



error_log("HAI - ".time());
/*
function dcc_rewrite_tags() {
	error_log("dcc_rewrite_tags - ".time());
flush_rewrite_rules();
//$res = add_rewrite_rule(".*","index.php","top");
add_rewrite_rule("bacon","index.php","top");
flush_rewrite_rules();
//echo "'".$res."'";
}

add_action('init', 'dcc_rewrite_tags', 10, 0);
*/

flush_rewrite_rules();
//add_rewrite_rule("bacon","index.php","top");
add_rewrite_rule("bacon","/wp/index.php","top");

//flush_rewrite_rules();

// flush_rewrite_rules();
// add_rewrite_rule("bacon","index.php","top");
// flush_rewrite_rules();


// // HERE REWRITE RULE PRINT OUT
// global $wp_rewrite;
// print_r($wp_rewrite->rules);







create_page();
//echo "hai";

//echo $_SERVER['REQUEST_URI'];

//echo $page;

?>

<?php
//get_header();
?>
<?php
//get_sidebar();
?>
<?php
//php get_footer();
?>
