giau


language
	- id
	- slug (en, es, ko, ...)
	- admin-name

display
	- lookup name
	- text ids[]
	- 

text
	- id
	- language
	- value



navigation
	- show
	- top/bottom
	- snap
	- listed page-sections[] (click to navigate to page OR page+section)

page
	- active : start date GMT
	- admin-name
	- slug
	- sections[]

section
	- slug
	- type
	- element

element (non DB item)
	- js activity

