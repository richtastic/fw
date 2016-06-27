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
ln -s /repos/ff/src/code /repos/fw/themes/giau/js/



#speicfic files

cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/php/functions.php /repos/fw/themes/giau/php/functions.php 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/js/theme.js /repos/fw/themes/giau/js/theme.js 
cp /media/sf_zirbr001/dev/extRepos/fw/themes/giau/css/theme.css /repos/fw/themes/giau/css/theme.css 
cp /media/sf_zirbr001/dev/extRepos/ff/src/code/Code.js /repos/ff/src/code/Code.js 


```


## lftp
```
lftp
open -u USERNAME,PASSWORD  ftp.lacpc.org
# GOTO
cd www/ce/wp-content/themes
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
```




