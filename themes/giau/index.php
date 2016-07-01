<?php
/**
 * giau
 *
 * @package giau
 * @subpackage giau
 */


include (TEMPLATEPATH . '/php/functions.php');


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
add_rewrite_rule("bacon","/wordpress/index.php","top");

//flush_rewrite_rules();

// flush_rewrite_rules();
// add_rewrite_rule("bacon","index.php","top");
// flush_rewrite_rules();

global $wp_rewrite;
print_r($wp_rewrite->rules);


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
