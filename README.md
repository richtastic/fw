# README.md

#### fw




## giau theme
```

```


## giau plugin

```

- navigation
	> presents list of pages
- page
	> presents a continuous list of sections
		- display name
		- 
- section
	> presents a widget
- widget
	> piece of user functionality: presentation, interaction, 
- 


- content
	- language
	- tagname
	- type (image / text)
	- value (file / string)
	- 


- widget
	- navigation (list of pages, logo, language switch, )
	- title/heading bar
	- image scroller
	- ?
	- content list (various fonts / sizes / paragraphs / images)
	- calendar (list of events)
	- social list (present facebook, twitter, instagram, email)
	- staff list (image, name, title, description)
	- dept list (image+title)
	- 
	- 
```



image gallery sizes:
1) low - loading: 480x270
2) med - old-phone: 960x540
3) high - desktop : 1920x1080


## box testing
```
rm -r /repos/ff
rm -r /repos/fw
cp -r /media/sf_zirbr001/dev/extRepos/ff /repos
cp -r /media/sf_zirbr001/dev/extRepos/fw /repos

chmod -R 777 /repos/ff
chmod -R 777 /repos/fw

rm /repos/fw/themes/giau/js/code 
ln -s /repos/ff/src/code /repos/fw/themes/giau/js/code

# theme
rm -r /var/www/html/wordpress/wp-content/themes/giau/index.php 
cp -r /media/sf_zirbr001/dev/extRepos/fw/themes/giau/index.php /var/www/html/wordpress/wp-content/themes/giau/index.php 
chmod -R 777 /repos/fw/

rm -r /var/www/html/wordpress/wp-content/themes/giau
cp -r /media/sf_zirbr001/dev/extRepos/fw/themes/giau /var/www/html/wordpress/wp-content/themes/giau
chmod -R 777 /var/www/html/wordpress/wp-content/themes/giau
rm /var/www/html/wordpress/wp-content/themes/giau/js/code
ln -s /repos/ff/src/code /var/www/html/wordpress/wp-content/themes/giau/js



# plugin
rm -r /var/www/html/wordpress/wp-content/plugins/giau
cp -r /media/sf_zirbr001/dev/extRepos/fw/plugins/giau/ /var/www/html/wordpress/wp-content/plugins/giau
chmod -R 777 /var/www/html/wordpress/wp-content/plugins/giau

# rm -r /var/www/html/wordpress/wp-content/plugins/giau && cp -r /media/sf_zirbr001/dev/extRepos/fw/plugins/giau/ /var/www/html/wordpress/wp-content/plugins/giau && chmod -R 777 /var/www/html/wordpress/wp-content/plugins/giau



#speicfic files

cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/index.php /repos/fw/themes/giau/index.php 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/data.php /repos/fw/themes/giau/data.php 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/php/functions.php /repos/fw/themes/giau/php/functions.php 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/js/theme.js /repos/fw/themes/giau/js/theme.js 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/css/theme.css /repos/fw/themes/giau/css/theme.css 
cp /media/sf_zirbr001/dev/extRepos/ff/src/code/Code.js /repos/ff/src/code/Code.js 



rm -r /var/www/html/wordpress/wp-content/themes/giau && cp -r /media/sf_zirbr001/dev/extRepos/fw/themes/giau/ /var/www/html/wordpress/wp-content/themes/giau &&  rm /var/www/html/wordpress/wp-content/themes/giau/js/code && ln -s /repos/ff/src/code /var/www/html/wordpress/wp-content/themes/giau/js/code && chmod -R 777 /var/www/html/wordpress/wp-content/themes/giau
rm -r /var/www/html/wordpress/wp-content/plugins/giau && cp -r /media/sf_zirbr001/dev/extRepos/fw/plugins/giau/ /var/www/html/wordpress/wp-content/plugins/giau && chmod -R 777 /var/www/html/wordpress/wp-content/plugins/giau


#DEBUGGING
tail -f /var/log/php_errors.log
tail -f /var/log/apache2/error.log

```



### SQL
```
mysql -u wordpressuser -p
> qwerty
show databases;
use wordpress;
show tables;
show columns from wp_giau_languagization;


wp methods excape strings for you, no need for mysql_real_escape_string

```


## lftp
```
lftp
open -u USERNAME,PASSWORD  ftp.lacpc.org

# ---- 1:
# GOTO
cd /www/ce/wp-content/themes
lcd /media/sf_zirbr001/dev/extRepos/fw/themes/
# COPY GIAU
rm -rf ./giau
mirror -R giau giau
# COPY FF
cd /www/ce/wp-content/themes/giau/js
lcd /media/sf_zirbr001/dev/extRepos/ff/src
# COPY CODE
mirror -R code code
# CHMOD READ ACCESS:
cd /www/ce/wp-content/themes/
chmod -R 755 giau/


# ---- 2: THEMES
# GOTO
cd /www/ce/wp-content/themes
lcd ~/universe/repo/fw/themes
# COPY GIAU
rm -rf ./giau
mirror -R giau giau
# COPY FF
cd /www/ce/wp-content/themes/giau/js
lcd ~/universe/repo/ff/src
# COPY CODE
mirror -R code code
# CHMOD READ ACCESS:
cd /www/ce/wp-content/themes/
chmod -R 755 giau/

# ---- 3: PLUGIN
# GOTO
cd /www/ce/wp-content/pugins
lcd ~/universe/repo/fw/plugins
# COPY GIAU
rm -rf ./giau
mirror -R giau giau
# CODE ... ?
# CHMOD READ ACCESS:
cd /www/ce/wp-content/plugins/
chmod -R 755 giau/

```



/*
sudo chown -R www-data:www-data /media/giau/universe/universe/repo/fw/plugins/giau/uploads
sudo chmod 755 /media/giau/universe/universe/repo/fw/plugins/giau/uploads


sudo vi /etc/php/7.0/apache2/php.ini 
sys_temp_dir = "/tmp/php"

sudo chown -R www-data:www-data /tmp/php
sudo chmod 755 /tmp/php

*/





https://codex.wordpress.org/Administration_Menus


http://code.tutsplus.com/articles/data-sanitization-and-validation-with-wordpress--wp-25536





http://ottopress.com/2009/wordpress-settings-api-tutorial/
https://codex.wordpress.org/Creating_Options_Pages
















# VBOX
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/js/theme.js /var/www/html/wordpress/wp-content/themes/giau/js/theme.js 
chmod -R 777 /var/www/html/wordpress/wp-content/themes/giau
### SINGLE LINE
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/js/theme.js  /var/www/html/wordpress/wp-content/themes/giau/js/theme.js ; chmod -R 777 /var/www/html/wordpress/wp-content/themes/giau

rm -r /repos/ff
cp -r /media/sf_zirbr001/dev/extRepos/ff /repos
chmod -R 777 /repos/ff
rm /var/www/html/wordpress/wp-content/themes/giau/js/code
ln -s /repos/ff/src/code /var/www/html/wordpress/wp-content/themes/giau/js









# XUBUNTU NATIVE SETUP

ln -s ~/universe/repo/fw/themes/giau/ /var/www/html/wordpress/wp-content/themes/giau
ln -s ~/universe/repo/fw/plugins/giau/ /var/www/html/wordpress/wp-content/plugins/giau




# WP NOTES:
```
list of all hooks:
http://adambrown.info/p/wp_hooks/hook







```



some code:

<?php
$dataServiceURL = get_site_url()."?data";
$dataServiceURL = "";
error_log("THE URL: ".$dataServiceURL);
?>
	<div class="giauDataTable giauTableDisplayData" data-table="localization" data-columns="language,hash_index,phrase_value" data-url="<?php echo $dataServiceURL; ?>" data-settings-pages="true"  data-settings-arbitrary-page="true">
	</div>

	<input type="text" class="giauAutoComplete" placeholder="language" data-columns="hash_index,phrase_value" data-params='{"operation":"get_autocomplete","table":"localization"}' data-url="<?php echo $dataServiceURL; ?>" style="width:300px; height:32px;">




