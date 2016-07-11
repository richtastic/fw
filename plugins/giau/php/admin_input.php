<?php
// admin_input.php

error_log("ADMIN INPUT");
/*

https://codex.wordpress.org/Custom_Fields#PostMeta_Functions
https://developer.wordpress.org/reference/functions/get_post_meta/



*/
/*
http://www.makeuseof.com/tag/tutorial-ajax-wordpress/
*/
/*
https://www.sitepoint.com/handling-post-requests-the-wordpress-way/
*/


/*
global $wpdb;
$table_name = $wpdb->prefix . "simple_prods_six";

$name=$_POST['name'];
$price=$_POST['price'];
$text=$_POST['text'];
$imgurl=$_POST['imgurl'];

$insert = "INSERT INTO " . $table_name .
            " (name, text, price, imgurl) " .
            "VALUES ('$name','$text','$price','$imgurl')";
$results = $wpdb->query( $insert );

print "Your information has been successfully added to the database.";
*/


// https://wordpress.org/support/topic/write-to-database-from-form-in-a-plugin





/*
https://www.inkthemes.com/how-you-can-easily-create-customized-form-in-wordpress/

<form name="customer_details" method="POST" onsubmit="return form_validation()" action="../customer-details.php">
Your Name: <input type="text" id="customer_name" name="customer_name" /><br />
Your Email: <input type="text" id="customer_email" name="customer_email" /><br />
Sex: <input type="radio" name="customer_sex" value="male">Male <input type="radio" name="customer_sex" value="female">Female<br />
Your Age: <input type="text" id="customer_age" name="customer_age" /><br />
<input type="submit" value="Submit"/>
</form>
*/
?>