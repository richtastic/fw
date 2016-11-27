<?php
// giau/functions.php


/*

function giau_pu_theme_menu(){
    error_log("RICHIE INSIDE 1");
    add_theme_page( 'Giau Option', 'Giau Theme Options',  'manage_options', 'xxx.php', 'pu_theme_page');  

    return;
// add_menu_page(
//             'My Page Title',
//             'My Page',
//             'read',
//             'my-menu-page-slug',
//             'myAdminPage',
//             'to/icon/file.svg',
//             '2.1'
//         );

}

add_action('admin_menu', 'giau_pu_theme_menu');











function pu_theme_page() {
	error_log("pu_theme_page");
}



add_action('admin_menu', 'giau_test_1');

function giau_test_1(){
	error_log("giau_test_1");
	add_menu_page(
        __( 'Unsub List', 'textdomain' ),
        __( 'Unsub Emails','textdomain' ),
        'manage_options',
        'wpdocs-unsub-email-list',
        'giau_test_2',
        ''
    );
}

function giau_test_2(){
	error_log("giau_test_2");
}


function myAdminPage(){
	error_log("myAdminPage");
}

*/
//undefined
//add_menu_page( "page_title", "menu_title", "capability", "menu_slug", "function", "icon_url", "position" );

//undefined
//add_theme_page( $page_title, $menu_title, $capability, $menu_slug, $function);


/// WORKING THEME MENU STUFF
/*
function theme_options_panel(){
	error_log("theme_options_panel");
	error_log(get_template_directory_uri());
  add_menu_page('Theme page title', 'Theme menu label', 'manage_options', 'theme-options', 'wps_theme_func', get_template_directory_uri().'/giau_settings_icon.png' );
  add_submenu_page( 'theme-options', 'Settings page title', 'Settings menu label', 'manage_options', 'theme-op-settings', 'wps_theme_func_settings');
  add_submenu_page( 'theme-options', 'FAQ page title', 'FAQ menu label', 'manage_options', 'theme-op-faq', 'wps_theme_func_faq');
}
add_action('admin_menu', 'theme_options_panel');
function wps_theme_func(){
                echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
                <h2>Theme</h2></div>';
}
function wps_theme_func_settings(){
                echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
                <h2>Settings</h2></div>';
}
function wps_theme_func_faq(){
                echo '<div class="wrap"><div id="icon-options-general" class="icon32"><br></div>
                <h2>FAQ</h2></div>';
}

*/

// giau_settings_icon.png
















?>
