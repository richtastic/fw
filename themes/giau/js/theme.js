


function giau(){
	// Code.inheritClass(giau.ImageGallery, JSDispatchable);
	// Code.inheritClass(giau.InfoOverlay, JSDispatchable);
	this.initialize();
	
}


giau.prototype.initialize = function(){
	// SETTINGS
	giau.Theme = {};
	giau.Theme.Color = {};
	giau.Theme.Color.LightRed = Code.getJSColorFromARGB(0xFFCC2244);
	giau.Theme.Color.MediumRed = Code.getJSColorFromARGB(0xFF990022);
	giau.Theme.Color.DarkRed = Code.getJSColorFromARGB(0xFF550011);
	giau.Theme.Color.TextOnDark = Code.getJSColorFromARGB(0xFFFFFFFF);
	giau.Theme.Color.TextOnLight = Code.getJSColorFromARGB(0xFF660011);
	giau.Theme.Color.backgroundLight = Code.getJSColorFromARGB(0xFFDDD6DD);
	
	// GLOBAL | EVENTS
	var bus = giau.MessageBus();
	this.mouseTracker = new PointerTracker();
	this.DND = new DragNDrop(bus, giau.MessageBus.EVENT_OBJECT_DRAG_START, giau.MessageBus.EVENT_OBJECT_DRAG_SELECT, giau.MessageBus.EVENT_OBJECT_DRAG_AVAILABLE);
	

	// NAVIGATION
	var navigationLists = $(".giauNavigationItemList");
	navigationLists.each(function(index, element){
		var navigation = new giau.NavigationList(element);
	});
	
	// LANGUAGE TOGGLES
	var languageLists = $(".giauLanguageToggleSwitch");
	languageLists.each(function(index, element){
		var languageSwitch = new giau.LanguageToggle(element);
	});

	// IMAGE GALLERIES
	var imageGalleries = $(".giauImageGallery");
	imageGalleries.each(function(index, element){
		var gallery = new giau.ImageGallery(element);
	});
	
	// OVERLAYS
	var imageGalleries = $(".giauInfoOverlay");
	imageGalleries.each(function(index, element){
		var gallery = new giau.InfoOverlay(element);
	});

	// CATEGORIES
	var categoryListings = $(".giauCategoryListing");
	categoryListings.each(function(index, element){
		var listing = new giau.CategoryListing(element);
	});

	// CALENDARS
	var calendarListings = $(".giauCalendarList");
	calendarListings.each(function(index, element){
		var listing = new giau.CalendarListView(element);
	});

	// BIOGRAPHIES
	var bioListings = $(".giauBiographyList");
	bioListings.each(function(index, element){
		var listing = new giau.BioView(element);
	});

	// CONTACT
	var contactListings = $(".giauContactForm");
	contactListings.each(function(index, element){
		var contact = new giau.ContactView(element);
	});

	// INFO FLOATERS
	var imageGalleries = $(".giauElementFloater");
	imageGalleries.each(function(index, element){
		var gallery = new giau.ImageGallery(element);
	});


	// ADMIN TYPE STUFF --------------
	// DATA - TABLES
	var dataTableLists = $(".giauDataTable");
	dataTableLists.each(function(index, element){
		var dataTable = new giau.DataTable(element);
	});

	// FILE BROWSING
	var fileBrowsingLists = $(".giauFileBrowser");
	fileBrowsingLists.each(function(index, element){
		var fileBrowser = new giau.FileBrowser(element);
	});

	// OBJECT COMPOSITION
	var objectComposerLists = $(".giauObjectComposer");
	objectComposerLists.each(function(index, element){
		var objectComposer = new giau.ObjectComposer(element);
	});

	// AUTO COMPLETE
	var autoCompleteLists = $(".giauAutoComplete");
	autoCompleteLists.each(function(index, element){
		var autoComplete = new giau.AutoComplete(element);
	});
	
	// CRUD
	var dataTableLists = $(".giauCRUD");
	dataTableLists.each(function(index, element){
		var dataTable = new giau.CRUD(element);
	});

	// LIB VIEW
	var dataTableLists = $(".giauLibraryView");
	dataTableLists.each(function(index, element){
		var dataTable = new giau.LibraryScroller(element);
	});

	var fileDropAreas = $(".giauDropArea");
	fileDropAreas.each(function(index, element){
		var dropArea = new giau.FileUploadDropArea(element);
	});

	// var listener = function(e){
	// 	console.log(e);
	// 	THIS._mousePosition = new V2D(e.clientX,e.clientY);
	// }
	// var _jsDispatch = new JSDispatch();
	// _jsDispatch.addJSEventListener(document.body, Code.JS_EVENT_MOUSE_MOVE, listener);
//THIS = this;
}

giau.ElementFloater = function(element){ //
}

giau.Navigation = function(element){ //
}

giau.ButtonToggle = function(element){ //
}


giau.MessageBus = function() {
	if(!giau.MessageBus._bus){
		giau.MessageBus._bus = new MessageBus();
	}
	return giau.MessageBus._bus;
}
giau.MessageBus._bus = null;
giau.MessageBus.EVENT_NAVIGATION_SELECT = "navigate_select_";
giau.MessageBus.EVENT_OTHER = "other_";
// DRAGGING
giau.MessageBus.EVENT_OBJECT_DRAG_START = "drag_begin_";
giau.MessageBus.EVENT_OBJECT_DRAG_SELECT = "drag_select_";
giau.MessageBus.EVENT_OBJECT_DRAG_AVAILABLE = "drag_available_";


giau.ContactView = function(element){ //
	this._container = element;
	var i, j;

	this._jsDispatch = new JSDispatch();

	var inputTextColor = "#000";
	var submitColor = "#4966D0";
	var submitColorDark = "#4055CC";

	var propertyDataMessageSuccess = "data-message-success";
	var propertyDataName = "data-name";
	var propertyDataTitle = "data-title";
	var propertyDataInput = "data-input";
	var propertyDataRequired = "data-required";
	var propertyDataHint = "data-hint";
	var propertyDataMessage = "data-message";
	var propertyDataURL = "data-url";

	this._url = Code.getProperty(this._container, propertyDataURL);
	this._submitMessageSuccess = Code.getPropertyOrDefault(this._container, propertyDataMessageSuccess,"Submitted");

	var elements = [];
	this._formElements = [];
	for(i=0; i<Code.numChildren(this._container); ++i){ // UL
		var div = Code.getChild(this._container,i);
		for(j=0; j<Code.numChildren(div); ++j){ // LI
			var child = Code.getChild(div,j);
			if(Code.hasProperty(child,propertyDataInput)){
				var name = Code.getProperty(child, propertyDataName);
				var title = Code.getProperty(child, propertyDataTitle);
				var input = Code.getProperty(child, propertyDataInput);
				var required = Code.getProperty(child, propertyDataRequired);
				var hint = Code.getProperty(child, propertyDataHint);
				var message = Code.getProperty(child, propertyDataMessage);

				var elementEntry;
				console.log(name,title,input,required,hint,message);
				if(input=="message"){
					elementEntry = Code.newInputTextArea();
					Code.setStyleHeight(elementEntry,"80px");
				}else{
					elementEntry = Code.newInputText();
					Code.setStyleHeight(elementEntry,"24px");
				}
				if(input=="submit"){
					var elementEntry = Code.newInputSubmit(message);
					Code.setStyleDisplay(elementEntry,"block");
					Code.setStyleTextAlign(elementEntry,"center");
					Code.setStyleBorder(elementEntry,"solid");
					Code.setStyleBorderWidth(elementEntry,"1px");
					Code.setStyleBorderColor(elementEntry,submitColorDark);
					Code.setStylePaddingLeft(elementEntry,"24px");
					Code.setStylePaddingRight(elementEntry,"24px");
					Code.setStylePaddingTop(elementEntry,"8px");
					Code.setStylePaddingBottom(elementEntry,"8px");
					Code.setStyleBackground(elementEntry,submitColor);
					Code.setStyleMargin(elementEntry,"0 auto");
						Code.setStyleFontFamily(elementEntry,"'siteThemeLight'");
						Code.setStyleFontSize(elementEntry,"12px");
						Code.setStyleColor(elementEntry,"#FFF");
					this._jsDispatch.addJSEventListener(elementEntry, Code.JS_EVENT_CLICK, this._handleSubmitClickedFxn, this);
					this._jsDispatch.addJSEventListener(elementEntry, Code.JS_EVENT_TOUCH_TAP, this._handleSubmitTappedFxn, this);
				}else{
					Code.setTextPlaceholder(elementEntry,hint);
					Code.setStyleWidth(elementEntry,"100%");
					Code.setStyleDisplay(elementEntry,"block");
					Code.setStyleTextAlign(elementEntry,"left");
					Code.setStyleBorder(elementEntry,"solid");
					Code.setStyleBorderWidth(elementEntry,"1px");
					Code.setStyleBorderColor(elementEntry,"#EEE");
					Code.setStyleColor(elementEntry,inputTextColor);
				}
				Code.setProperty(elementEntry,"data-name",input);
				Code.setProperty(elementEntry,"data-required",(required && required=="true" ) ? "true" : "false");

				this._formElements.push(elementEntry);
				var divContainer = Code.newDiv();
					Code.setStyleWidth(divContainer,"100%");
					Code.setStyleHeight(divContainer,"10px");
				elements.push(divContainer, elementEntry);
			}
		}
	}
		var rows = [];
	rows.push({ "leftContent": null,
				"rightElements":elements,
				"rightContent": null});

	var use2Colums = false;

	var containerElement = this._container;

	var i, j, len = rows.length;
	for(i=0;i<len;++i){
		var row = rows[i];
		var rowElement = Code.newDiv();
		var leftColElement = Code.newDiv();
		var rightColElement = Code.newDiv();

		var leftContent = row["leftContent"];
		var rightContent = row["rightContent"];
		var rightElements = row["rightElements"];
		
		if(rightContent){
			Code.setContent(rightColElement, rightContent);
		}else if(rightElements && rightElements.length>0){
			for(j=0;j<rightElements.length;++j){
				var element = rightElements[j];
				Code.addChild(rightColElement, element);
			}
		}
		Code.addChild(containerElement, rowElement);
		var widthLeft = "0%";
		var widthRight = "100%";
		if(use2Colums){
			Code.setContent(leftColElement, leftContent);
			Code.addChild(rowElement,leftColElement);
			widthLeft = "50%";
			widthRight = "50%";
		}
		Code.addChild(rowElement,rightColElement);
		

		Code.setStyleDisplay(rowElement,"block");
		//Code.setStyleBackground(rowElement,"#00F");
		//Code.setStylePadding(rowElement,"10px");

		Code.setStyleVerticalAlign(rowElement,"top");

		Code.setStyleWidth(leftColElement,widthLeft);
			Code.setStyleFontFamily(leftColElement,"'siteThemeRegular'");
			Code.setStyleFontSize(leftColElement,"20px");
			Code.setStyleDisplay(leftColElement,"inline-block");
			//Code.setStyleDisplay(leftColElement,"table-cell");
			Code.setStyleFloat(leftColElement,"left");
			Code.setStylePadding(leftColElement,"0px");
			Code.setStylePosition(leftColElement,"relative");
			Code.setStyleColor(leftColElement,"#000");
			//Code.setStyleBackground(leftColElement,"#0F0");
			
		Code.setStyleWidth(rightColElement,widthRight);
			Code.setStyleFontFamily(rightColElement,"'siteThemeLight'");
			Code.setStyleDisplay(rightColElement,"inline-block");
			Code.setStyleFontSize(rightColElement,"14px");
			//Code.setStyleDisplay(rightColElement,"table-cell");
			//Code.setStyleFloat(rightColElement,"right");
			Code.setStylePadding(rightColElement,"0px");
			Code.setStylePosition(rightColElement,"relative");
			//Code.setStyleBackground(rightColElement,"#F00");
			Code.setStyleColor(rightColElement,"#333");

			// Code.setStyleVerticalAlign(containerElement,"top");
			// Code.setStyleHeight(containerElement,"100%");
			// Code.setStyleMinHeight(containerElement,"100px");
	}
	//Code.setStylePadding(containerElement,"10px");
		
}
giau.ContactView.prototype._handleSubmitClickedFxn = function(e){
	console.log(e);
	this._submitFormData();
}
giau.ContactView.prototype._handleSubmitTappedFxn = function(e){
	console.log(e);
	this._submitFormData();
}
giau.ContactView.prototype._clearTextInput = function(args){
	var element = args[0];
	Code.setInputTextValue(element,"");
}
giau.ContactView.prototype._clearTextArea = function(args){
	var element = args[0];
	Code.setTextAreaValue(element,"");
}
giau.ContactView.prototype._submitFormData = function(){
	var i;
	var url = this._url;
	var validForm = true;
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	var validCount = 0;
	var requiredCount = 0;
	var operations = [];
	for(i=0; i<this._formElements.length; ++i){
		var element = this._formElements[i];
		var isRequired = Code.getProperty(element,"data-required") == "true";
		if(isRequired){
			++requiredCount;
		}
		var tag = Code.getElementTag(element);
		var type = Code.getProperty(element,"type");
		var key = Code.getProperty(element,"data-name");
		var value = null;
		if(tag=="input" && type=="text" ){
			value = Code.getInputTextValue(element);
			operations.push([this._clearTextInput,[element]]);
		}else if(tag=="textarea"){
			var e = {"element":element};
			value = Code.getInputTextValue(e);
			operations.push([this._clearTextArea,[element]]);
		}
		if(key && key!="" && value){
			if( isRequired && value.length<=1 ){
				validForm = false;
				break;
			}
			ajax.append(key,value);
			++validCount;
		}
	}
	if( !(validForm && validCount>=requiredCount) ){
		Code.emptyArray(operations);
		return;
	}
	while(operations.length>0){
		var arr = operations.pop();
		var fxn = arr[0];
		var args = arr[1];
		fxn(args);
	}
	ajax.append("operation","email_form");
	ajax.context(this);
	ajax.callback(function(e){
		var json = Code.parseJSON(e);
		//console.log(json);
		if(json && json["result"]=="success"){
//			alert(this._submitMessageSuccess);
		}
	});
	ajax.send();
	
}

giau.BioView = function(element){ //
	this._container = element;

	var propertyDefaultImage = "data-default-image"
	var propertyDefultDescription = "data-default-description";

	this._default_bio_description = Code.getPropertyOrDefault(this._container,propertyDefultDescription, "");
	this._default_bio_image = Code.getPropertyOrDefault(this._container,propertyDefaultImage, "");

	var propertyData = "data-data";
	var propertyFirstName = "data-first-name";
	var propertyLastName = "data-last-name";
	var propertyDisplayName = "data-display-name";
	var propertyTitle = "data-title";
	var propertyEmail = "data-email";
	var propertyPhone = "data-phone";
	var propertyDescription = "data-description";
	var propertyImage = "data-image";
	var propertyURL = "data-uri";

	var i;
	var personnelList = [];
	for(i=0; i<Code.numChildren(this._container); ++i){
		var div = Code.getChild(this._container,i);
		if(Code.hasProperty(div,propertyData)){
			var firstName = Code.getProperty(div,propertyFirstName, null);
			var lastName = Code.getProperty(div,propertyLastName, null);
			var displayName = Code.getProperty(div,propertyDisplayName, null);
			var title = Code.getPropertyOrDefault(div,propertyTitle, null);
			var email = Code.getProperty(div,propertyEmail, null);
			var phone = Code.getProperty(div,propertyPhone, null);
			var description = Code.getPropertyOrDefault(div,propertyDescription, null);
			var image = Code.getProperty(div,propertyImage, null);
			var url = Code.getPropertyOrDefault(div,propertyURL, null);

			var departmentImagePrefix = "./wp-content/themes/giau/img/departments/";
			personnelList.push({
				"first_name": firstName,
				"last_name": lastName,
				"display_name": displayName,
				"title": title,
				"description": description,
				"image_url": image,
				"uri": url
			});
		}
	}

	this._personnelList = personnelList;
//Code.addChild(this._container,containerElement);
Code.setStyleDisplay(this._container,"block");
Code.setStylePosition(this._container,"relative");
Code.setStyleWidth(this._container,"100%");
Code.setStylePaddingTop(this._container,"32px");
Code.setStylePaddingBottom(this._container,"64px");
//Code.setStyleBackgroundColor(this._container,"#F6F7F9");
var backgroundColor = 0xFFF6F7F9;
backgroundColor = Code.getJSColorFromARGB(backgroundColor);
Code.setStyleBackgroundColor(this._container,backgroundColor);
var parent = Code.getParent(this._container);
Code.setStyleBackgroundColor(parent,backgroundColor);
	var col = 0;
	var i, len = personnelList.length;
	for(i=0; i<len; ++i){
		var person = personnelList[i];
	var outerElement = Code.newDiv();
			//Code.setStyleDisplay(outerElement,"inline-block");
			Code.setStyleDisplay(outerElement,"table-cell");
			Code.setStylePosition(outerElement,"relative");
		var containerElement = Code.newDiv();
			//Code.setStyleBackgroundColor(containerElement,"#F6F7F9");
			Code.setStyleDisplay(containerElement,"inline-block"); // fit height
			Code.setStylePosition(containerElement,"relative");
			Code.setStyleVerticalAlign(containerElement,"top");
			Code.setStyleHeight(containerElement,"100%");
			Code.setStyleMinHeight(containerElement,"100px");

		var imageIconElement = Code.newImage();
			var imageURL = person["image_url"];
			if(!imageURL || imageURL==""){
				imageURL = this._default_bio_image;
			}
			Code.setSrc(imageIconElement, imageURL);
			Code.setStyleWidth(imageIconElement,"100%");
			Code.setStyleBorderRadius(imageIconElement,"100%;");
			//Code.setStyleMargin(imageIconElement,"0 10px");
		var nameElement = Code.newDiv();
			Code.setContent(nameElement,person["display_name"]);
			Code.setStyleDisplay(nameElement,"block");
			Code.setStyleFontFamily(nameElement,"siteThemeBold");
			Code.setStyleFontSize(nameElement,"16px");
			Code.setStyleColor(nameElement,"#333");
			Code.addStyle(nameElement,"text-transform:uppercase");
			Code.setStylePadding(nameElement,"2px 0px 10px 0px");
		var titleElement = Code.newDiv();
			Code.setContent(titleElement,person["title"]);
			Code.setStyleDisplay(titleElement,"block");
			Code.setStyleFontFamily(titleElement,"siteThemeLight");
			Code.setStyleFontSize(titleElement,"10px");
			Code.setStyleFontStyle(titleElement,"italic");
			Code.setStyleColor(titleElement,"#555");
		var descriptionElement = Code.newDiv();
			var description = person["description"];
			if(!description || description==""){
				description = this._default_bio_description;
			}
			Code.setContent(descriptionElement,description);
			Code.setStyleDisplay(descriptionElement,"block");
			Code.setStyleFontFamily(descriptionElement,"siteThemeLight");
			Code.setStyleFontSize(descriptionElement,"14px");
			Code.setStyleColor(descriptionElement,"#333");
		var leftColumnElement = Code.newDiv();
			Code.setStyleTextAlign(leftColumnElement,"center");
			Code.setStyleDisplay(leftColumnElement,"inline-block");
//			Code.setStyleBackground(leftColumnElement,"#F0F");
			Code.setStyleWidth(leftColumnElement,"20%");
			Code.setStyleFloat(leftColumnElement,"left");
			// Code.setStyleHeight(leftColumnElement,"100%");
			// Code.setStylePosition(leftColumnElement,"relative");
			// Code.setStyleLeft(leftColumnElement,"0px");
			// Code.setStyleTop(leftColumnElement,"0px");

		var midColumnElement = Code.newDiv();
			Code.setStyleDisplay(midColumnElement,"inline-block");
			Code.setStyleWidth(midColumnElement,"6%");
			Code.setStyleFloat(midColumnElement,"left");

		var rightColumnElement = Code.newDiv();
			//Code.setStyleBackground(rightColumnElement,"#F00");
			Code.setStyleDisplay(rightColumnElement,"inline-block");
//			Code.setStyleBackground(rightColumnElement,"#0FF");
			Code.setStyleWidth(rightColumnElement,"74%");
			Code.setStyleFloat(rightColumnElement,"right");
			// Code.setStylePosition(rightColumnElement,"relative");
			// Code.setStyleRight(rightColumnElement,"0px");
			// Code.setStyleTop(rightColumnElement,"0px");
		Code.addChild(this._container, outerElement);
		Code.addChild(outerElement,containerElement);
			Code.addChild(containerElement,leftColumnElement);
				Code.addChild(leftColumnElement,imageIconElement);

			Code.addChild(containerElement,midColumnElement);

				Code.addChild(containerElement,rightColumnElement);
				Code.addChild(rightColumnElement,titleElement);
				Code.addChild(rightColumnElement,nameElement);
				Code.addChild(rightColumnElement,descriptionElement);
		person["element"] = outerElement;
		person["container"] = containerElement;
	}
	this.updateLayout();

	// LISTENERS
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
}

giau.BioView.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
}

giau.BioView.prototype.updateLayout = function(){
	var listings = this._galleryList;
	var maximumColumnCount = 2;
	var elementMinWidth = 300;
	var elementMaxWidth = 350; // to next row size
	var widthContainer = Code.getElementWidth(this._container);
	var heightContainer = Code.getElementHeight(this._container);

	var outerPadding = 10;
	var innerPadding = 14;
	var sidePadding = 14;
		widthContainer -= sidePadding*2;
	var columns = Math.floor(widthContainer/elementMaxWidth);
	if(widthContainer<elementMinWidth){
		columns = 1;
	}
	columns = Math.max(1,columns);

	if(columns>maximumColumnCount){
		columns = maximumColumnCount;
	}
	var colWidth = Math.floor(widthContainer/columns);

	var personnelList = this._personnelList;
	var i, len = personnelList.length;
Code.removeAllChildren(this._container);
var row;
	for(i=0; i<len; ++i){
		if(i%columns==0){
			row = Code.newDiv();
			Code.setStyleDisplay(row,"inline-block");
			Code.setStylePosition(row,"relative");
			Code.setStyleWidth(row,widthContainer+"px");
			Code.setStylePaddingLeft(row,sidePadding+"px");
			Code.setStylePaddingRight(row,sidePadding+"px");
		}
		var person = personnelList[i];
		var outerElement = person["element"];
		var innerElement = person["container"];
		// 
		//	TODO: USE A ROW BLOCK FOR THE CELL TO EXPAND TO
		//
		var outerWidth = (colWidth-2*outerPadding);
		var innerWidth = (outerWidth-2*innerPadding);
		Code.setStyleWidth(outerElement,outerWidth+"px");
		Code.setStylePadding(outerElement,outerPadding+"px");
		Code.setStyleWidth(innerElement,innerWidth);
		Code.setStylePadding(innerElement,innerPadding+"px");
		Code.setStyleBackground(innerElement,"#FFF");
			Code.setStyleMinHeight(innerElement,"200px");
			if(i<len-columns){
				var div = outerElement;
				// Code.setStyleBorderColor(div,"#EEE");
				// Code.setStyleBorder(div,"solid");
				// Code.setStyleBorderWidthTop(div,"0px");
				// Code.setStyleBorderWidthLeft(div,"0px");
				// Code.setStyleBorderWidthRight(div,"0px");
				// Code.setStyleBorderWidthBottom(div,"1px");
			}else{
				var div = outerElement;
				//Code.setStyleBorder(div,"none");
			}
		/*
		var outerElement = Code.newDiv();
			Code.setStyleDisplay(outerElement,"table-cell");
			//Code.setStylePosition(outerElement,"relative");
			Code.setStyleWidth(outerElement,"50%");
			Code.setStyleHeight(outerElement,"100%");
			Code.setStyleBackground(outerElement,"#F3f");
			if(i%2==0){
				Code.setContent(outerElement,"56346345645 ad ");
			}else {
				Code.setContent(outerElement,"56346345645 ad 56346345645 ad 56346345645 ad 56346345645 ad 56346345645 ad 56346345645 ad ");
			}
		*/
		Code.addChild(this._container, row);
		Code.addChild(row, outerElement);
	}
}

giau.CategoryListing = function(element){
	this._container = element;

	// LAYOUT
	Code.setStylePosition(this._container, "relative");
	Code.setStyleDisplay(this._container, "inline-block");
	Code.setStyleWidth(this._container, "100%");

	var propertyData = "data-data";
	var propertyTitle = "data-title";
	var propertyImage = "data-image";
	var propertyURL = "data-url";
	var propertyShading = "data-shading";
	var propertyCover = "data-cover";
	var propertyRounded = "data-rounded";

	var listings = [];

	var i;
	for(i=0; i<Code.numChildren(this._container); ++i){
		var div = Code.getChild(this._container,i);
		if(Code.hasProperty(div,propertyData)){
			var title = Code.getPropertyOrDefault(div,propertyTitle, null);
			var image = Code.getProperty(div,propertyImage, null);
			var url = Code.getPropertyOrDefault(div,propertyURL, null);
			var shading = Code.getPropertyOrDefault(div,propertyShading, null);
			var cover = Code.getPropertyOrDefault(div,propertyCover, null);
			var rounded = Code.getPropertyOrDefault(div,propertyRounded, false) ? true : false;

			var departmentImagePrefix = "./wp-content/themes/giau/img/departments/";
			listings.push({
				"title":title,
				"shading_color":shading, // HEX: 0xAARRGGBB
				"icon_url":cover,
				"image_url":image,
				"rounded":rounded,
				"link_url":url
			});
		}
	}

	this._galleryList = listings;

	var iconToContainerWidthToHeight = 0.75;
	var iconPercentSize = 30;//50;
	var iconLeftPercent = (100-iconPercentSize)*0.5; // 25
	var iconTopPercent = (100-iconPercentSize)*iconToContainerWidthToHeight*0.5; // 10

	var i, len = listings.length;
	for(i=0; i<len; ++i){
		var listing = listings[i];
		var url = listing["link_url"];
		var container = Code.newDiv();
		var title = Code.newDiv();
		Code.setContent(title,listing["title"]);
		Code.addClass(title,"");
		var img = Code.newImage();
			Code.setSrc(img,listing["image_url"]);
			Code.setStylePosition(img,"absolute");
			Code.setStyleWidth(img,"100%");
			Code.setStyleHeight(img,"100%");
			Code.setStyleLeft(img,"0px");
			Code.setStyleTop(img,"0px");
		var icon_url = listing["icon_url"];
		var icon = null;
		if(icon_url){
			icon = Code.newImage();
			Code.setSrc(icon,icon_url);
			Code.setStyleDisplay(icon,"inline");
			Code.setStylePosition(icon,"absolute");
			Code.setStyleLeft(icon,"0px");
			Code.setStyleTop(icon,"0px");
			Code.setStyleWidth(icon,iconPercentSize+"%");
			//Code.setStyleHeight(icon,"50%");
			Code.setStylePadding(icon,iconTopPercent+"% 0% 0% "+iconLeftPercent+"%");
		}
		var shader = Code.newDiv();
			var colorHex = listing["shading_color"];
			var colorJS = Code.getJSColorFromARGB(colorHex);
			Code.setStyleBackground(shader,colorJS);
			Code.setStylePosition(shader,"absolute");
			Code.setStyleWidth(shader,"100%");
			Code.setStyleHeight(shader,"100%");
			Code.setStyleLeft(shader,"0px");
			Code.setStyleTop(shader,"0px");
		var contentContainer = Code.newDiv();
			Code.setStyleVerticalAlign(contentContainer,"middle");
			Code.setStyleTextAlign(contentContainer,"center");
		var anchor = Code.newAnchor(url);

			// Code.addChild(this._container,container);
			// Code.addChild(container,contentContainer);
			// 	Code.addChild(contentContainer, img);
			// 	Code.addChild(contentContainer, shader);
			// 	Code.addChild(contentContainer, icon);
			// Code.addChild(container,title);
			Code.addChild(this._container,anchor);
				Code.addChild(anchor,container);
				Code.addChild(container,contentContainer);
					Code.addChild(contentContainer, img);
					Code.addChild(contentContainer, shader);
					if(icon){
						Code.addChild(contentContainer, icon);
					}
				Code.addChild(container,title);
		listing["content"] = contentContainer;
		listing["image"] = img;
		listing["text"] = title;
		listing["icon"] = icon;
		listing["element"] = container;
		listing["anchor"] = anchor;
	}
	this.updateLayout();

	// LISTENERS
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
}

giau.CategoryListing.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
}

giau.CategoryListing.prototype.updateLayout = function(){
	var listings = this._galleryList;
	var maximumColumnCount = 3;
	var elementMinWidth = 292;
	var elementMaxWidth = 196;
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();

	var elementCount = listings.length;
	// var elementWidth = 200;//elementMinWidth;
	// var elementHeight = 150;//elementMinWidth;
// SHOULD GET FROM IMAGES
	var elementWidth = 180;
	var elementHeight = 180;

	var elementWidthToHeight = elementWidth/elementHeight;
	var colCount = Math.floor(widthContainer/elementWidth);

	if(colCount<=1){
		colCount = 1;
		elementWidth = widthContainer;
		elementHeight = elementWidth/elementWidthToHeight;
	}
	var i, j, len = listings.length;
	if(colCount>len){
		colCount = len;
	}
	if(colCount>maximumColumnCount){
		colCount = maximumColumnCount;
	}
	var rowCount = Math.ceil(colCount/elementCount);

//	console.log(widthContainer+"x"+heightContainer+" = colCount "+colCount)
	
var padAllSides = true;
	var lm1 = len-1;
	var currentX = 0;
	var currentY = 0;
	var spacingX = (widthContainer - (elementWidth*colCount))/(colCount-1);
	if(padAllSides){
		spacingX =  (widthContainer - (elementWidth*colCount))/colCount;
		currentX += spacingX*0.5;
	}
	spacingX = colCount<=1 ? 0.0 : spacingX;
	var spacingY = 60;
	
	var row = 0;
	var rowHeight = elementHeight + spacingY;
	var colWidth = elementWidth + spacingX;
	j = 0;
	for(i=0; i<len; ++i){
		
		var listing = listings[i];
		var container = listing["element"];
		var content = listing["content"];
			Code.setStylePosition(content, "absolute");
			Code.setStyleLeft(content, currentX+"px");
			Code.setStyleTop(content, currentY+"px");
			Code.setStyleWidth(content, elementWidth+"px");
			Code.setStyleHeight(content, elementHeight+"px");
		var icon = listing["icon"];
		if(icon){
			Code.setStyleMargin(icon, "0 auto");
		}
		var img = listing["image"];
			Code.setStylePosition(img, "relative");
			Code.setStyleWidth(img, "100%");
			Code.setStyleHeight(img, "100%");
			Code.setStyleMargin(img, "0");
		if(listing["rounded"]==true){
			Code.setStyleBorderRadius(img,"100%;");
		}else{
			Code.setStyleBorderRadius(img,"0;");
		}
		var title = listing["text"];
		//title.style.font.size = 32+"px";
		//title.style.fontsize = 32+"px";
		Code.setStyleFontWeight(title, "lighter");
		if(colCount==1){
			Code.setStyleFontSize(title, 22+"px");
		}else{
			Code.setStyleFontSize(title, 14+"px");
		}
		Code.setStyleFontFamily(title, "'siteThemeLight', Arial, sans-serif");
			Code.setStylePadding(title, "8px 0px 0px 0px");
			Code.setStyleColor(title, "#666");
			Code.setStyleDisplay(title, "inline-block");
			Code.setStyleTextAlign(title, "center");
			Code.setStylePosition(title, "absolute");
			Code.setStyleLeft(title, currentX+"px");
			Code.setStyleWidth(title, elementWidth+"px");
			Code.setStyleTop(title, (currentY+elementHeight)+"px");
		++j
		currentX += colWidth;
		if(j==colCount){

			j = 0;
			currentX = 0;
			if(padAllSides){
				currentX += spacingX*0.5;
			}
			if(i<lm1){
				currentY += rowHeight;
			}
		}
	}
	currentY += rowHeight;
	// container
	Code.setStyleHeight(this._container, currentY+"px");
}

giau.LanguageToggle = function(element){
	this._container = element;

	// LISTENERS
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);

	var styleTextSize = 12;
	var styleTextColor = 0xFF111111;
	var propertyColor = Code.getProperty(this._container,"data-color");
	if(propertyColor){
		styleTextColor = parseInt(propertyColor);
	}
	var styleTextColorDisabled = Code.setAlpARGB(styleTextColor, 0x66);

	var storageDictionaryKey = Code.getPropertyOrDefault(this._container, "data-storage", "language");
	var storageDictionaryValue = Code.getCookie(storageDictionaryKey);
	this._storageDictionaryKey = storageDictionaryKey;

	this._languageList = [];
	var i, len, entry, div, element, name, language, child, enabled;
	len = Code.numChildren(this._container);
	for(i=0; i<len; ++i){
		child = Code.getChild(this._container, i);
		language = Code.getProperty(child, "data-language");
		var display = Code.getProperty(child, "data-display");
		var url = Code.getProperty(child, "data-url");
		var enabled = Code.getProperty(child, "data-enabled");
			enabled = enabled === "true";
		if(display && language && url){
			entry = {"name":display, "language":language, "url":url, "enabled":enabled, "element":null};
			this._languageList.push(entry);
		}
	}
	// add items automatically
	Code.removeAllChildren(this._container);
	len = this._languageList.length;
	var foundLanguageIndex = -1;
	for(i=0; i<len; ++i){
		entry = this._languageList[i];
		name = entry["name"];
		language = entry["language"];
		enabled = entry["enabled"];
		div = Code.newDiv();
			Code.setContent(div, name);
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleFontSize(div,styleTextSize+"px");
			Code.setStyleColor(div, Code.getJSColorFromARGB(styleTextColor) );
			Code.setStylePadding(div,"10px 2px 10px 2px");
		if(storageDictionaryValue==language){
			Code.setStyleFontFamily(div,"'siteThemeRegular'");
			Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_DEFAULT);
			foundLanguageIndex = i;
		}else{
			Code.setStyleFontFamily(div,"'siteThemeLight'");
			Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_FINGER);
		}
		entry["element"] = div;
		Code.addChild(this._container, div);
		// listening
		if(enabled){
			this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_CLICK, this._handleContentClickedFxn, this);
			this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_TOUCH_TAP, this._handleContentTappedxn, this);
		}else{
			Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_DEFAULT);
			Code.setStyleColor(div, Code.getJSColorFromARGB(styleTextColorDisabled) );
		}
		// divider
		if(i<len-1){
			div = Code.newDiv();
			Code.setContent(div,"|");
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleFontSize(div,styleTextSize+"px");
			Code.setStyleFontFamily(div,"'siteThemeLight'");
			Code.setStyleColor(div, Code.getJSColorFromARGB(styleTextColor) );
			Code.setStylePadding(div,"0px 0px 0px 0px");
			Code.addChild(this._container, div);
		}
	}
	// 
	if(foundLanguageIndex<0 && this._languageList.length>0){
		foundLanguageIndex = 0;
		language = this._languageList[foundLanguageIndex]["language"];
		Code.setCookie(storageDictionaryKey, language);
		
	}
	this._selectedLanguageIndex = foundLanguageIndex;
	// 
	this.updateLayout();
};
giau.LanguageToggle.prototype._handleContentClickedFxn = function(element){
	this._selectElement(element);
};
giau.LanguageToggle.prototype._handleContentTappedxn = function(element){
	this._selectElement(element);
};
giau.LanguageToggle.prototype._selectElement = function(e){
	var target = Code.getTargetFromMouseEvent(e);
	for(var i=0; i<this._languageList.length; ++i){
		var entry = this._languageList[i];
		var ele = entry["element"];
		if(target==ele){
			if(i!=this._selectedLanguageIndex){
				var language = entry["language"];
				Code.setCookie(this._storageDictionaryKey, language);
				var url = entry["url"];
				document.location.reload();
			}
			break;
		}
	}
	// set the local language
	// reload the page
};
giau.LanguageToggle.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
};
giau.LanguageToggle.prototype.updateLayout = function(){
	//
};



giau.NavigationList = function(element){
	this._container = element;
	this._isAnimating = false;
	this._isOpen = false;

	var propertyAnimatesDown = "data-animates-down";
	var propertyAnimatesUp = "data-animates-up";
	var propertyStartHidden = "data-start-hidden";

	// MESSAGE BUS
	this._busEventAnimateDown = null;
	this._busEventAnimateUp = null;
	var bus = giau.MessageBus();
	var div = this._container;
	if(Code.hasProperty(div,propertyAnimatesDown)){
		var listenEventName = Code.getProperty(div,propertyAnimatesDown);
		listenEventName = giau.MessageBus.EVENT_NAVIGATION_SELECT+""+listenEventName;
		bus.addFunction(listenEventName, this._handleNavigationBusEventDown, this);
		//this._busEventAnimateDown = listenEventName;
	}
	if(Code.hasProperty(div,propertyAnimatesUp)){
		var listenEventName = Code.getProperty(div,propertyAnimatesUp);
		listenEventName = giau.MessageBus.EVENT_NAVIGATION_SELECT+""+listenEventName;
		bus.addFunction(listenEventName, this._handleNavigationBusEventUp, this);
		//this._busEventAnimateUp = listenEventName;
	}
	if(Code.hasProperty(div,propertyStartHidden)){
		Code.setStyleDisplay(div,"none");
		this._isOpen = false;
	}

	// LISTENERS
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);

	var styleMenuColor = 0xFF000000; // FFF
	var styleMenuShadow = null; // 0xFF000000
	var styleBorderMenuColorBottom = null;//0xFFEEF0EF;
	var styleBorderMenuColorTop = null;//0xFFDDE3DD;
	var styleBGMenuColor = 0xFFFFFFFF;//0xFFEFF1F0;
	var styleFontTextColor = 0xFF333333;
	var styleFontTextSize = 12;

	var isBlackMode = Code.getProperty(this._container,"data-darkmode");
	if(isBlackMode){
		styleBorderMenuColorBottom = null;
		styleBorderMenuColorTop = null;
		styleBGMenuColor = 0x00000000;
		styleFontTextColor = 0xFFFFFFFF;
		var styleMenuShadow = 0xFF000000;
	}

	// container styling
	if(styleBGMenuColor){
		Code.setStyleBackground(this._container, Code.getJSColorFromARGB(styleBGMenuColor) );
	}
	
	Code.setStyleBorder(this._container,"solid");
	if(styleBorderMenuColorTop){
		Code.setStyleBorderWidthTop(this._container,"2px");
		Code.setStyleBorderColorTop(this._container, Code.getJSColorFromARGB(styleBorderMenuColorTop) );
	}else{
		Code.setStyleBorderWidthTop(this._container,"0px");
	}
	if(styleBorderMenuColorBottom){
		Code.setStyleBorderWidthBottom(this._container,"2px");
		Code.setStyleBorderColorBottom(this._container, Code.getJSColorFromARGB(styleBorderMenuColorBottom) );
	}else{
		Code.setStyleBorderWidthBottom(this._container,"0px");
	}
	if(true){
		Code.setStyleBorderWidthLeft(this._container,"0px");
		Code.setStyleBorderWidthRight(this._container,"0px");
	}

	var i, len;
	var listElement = element;//Code.getChild(element,0);
	var menuItems = [];
	var foundSelectedIndex = -1;
	if(listElement){
		len = Code.numChildren(listElement);
		for(i=0; i<len; ++i){
			var child = Code.getChild(listElement,i);
			var title = "";
			var url = "";
			var dataDisplay = "data-display";
			var dataURL = "data-url";
			var dataName = "data-name";
			var dataSelected = "data-selected";
			var title = Code.getPropertyOrDefault(child,dataDisplay,title);
			var url = Code.getPropertyOrDefault(child,dataURL,url);
			var name = Code.getPropertyOrDefault(child,dataName,name);
if(!url || url==""){ // 
	title = title + " &#x25BE;";
}
			if(Code.hasProperty(child,dataSelected)){
				foundSelectedIndex = i;
			}
			Code.emptyDom(child);

			menuItems.push( {"title":title, "url":url, "name":name} );
		}
	}
	Code.emptyDom(listElement);
	Code.emptyDom(this._container);
	//console.log("navigation: "+contents);
	var optionElementList = [];
	var div;
	for(i=0; i<len; ++i){
		div = Code.newDiv();
		var title = menuItems[i]["title"];
		var url = menuItems[i]["url"];
		var name = menuItems[i]["name"];
		Code.setContent(div,title);
		Code.setStyleDisplay(div,"inline-block");
		Code.setStylePadding(div,"6px 10px 4px 10px");
		Code.setStyleFontSize(div,"14px");
		Code.setStyleColor(div, Code.getJSColorFromARGB(styleMenuColor) );
		if(styleMenuShadow){
			Code.addStyle(div,"text-shadow: 0px 1px 3px "+Code.getJSColorFromARGB(styleMenuShadow)+";");
		}
		if(foundSelectedIndex==i){
			Code.setStyleFontFamily(div,"'siteThemeRegular'");
			Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_DEFAULT);
		}else{
			Code.setStyleFontFamily(div,"'siteThemeLight'");
			Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_FINGER);
		}
		Code.setStyleBackground(div,"rgba(0,0,0,0.0)");
		Code.setStyleColor(div, Code.getJSColorFromARGB(styleFontTextColor) );
		Code.setStyleFontSize(div, styleFontTextSize+"px" );
		Code.addChild(this._container,div);
		optionElementList.push({"element":div,"url":url,"name":name});
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_CLICK, this._handleContentClickedFxn, this);
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_TOUCH_TAP, this._handleContentTappedxn, this);
	}
	this._optionElementList = optionElementList;
	div = Code.newDiv();
		Code.setContent(div,"");
		Code.setStyleDisplay(div,"inline-block");
		Code.setStylePosition(div,"absolute");
		//Code.setStyleBorder(div,"solid");
		//Code.setStyleBorderWidth(div,"2px");
		Code.setStyleBorderColor(div,"#FFF");
		Code.addStyle(div,"top:0px; left:0px;");
		Code.addChild(this._container,div);
		var borderColor = "#FFF";
		var borderWidth = "2px";
		var border = [];
			for(i=0;i<4;++i){
				var d = Code.newDiv();
				Code.addChild(div,d);
				Code.setStyleDisplay(d,"inline-block");
				Code.setStylePosition(d,"absolute");
				Code.setStyleBackground(d,borderColor);
				if(i==0||i==1){ // t/b
					Code.setStyleWidth(d,"100%");
					Code.setStyleHeight(d,borderWidth);
					Code.setStyleLeft(d,"0px");
				}else if(i==2||i==3){ // l/r
					Code.setStyleHeight(d,"100%");
					Code.setStyleWidth(d,borderWidth);
					Code.setStyleTop(d,"0px");
				}
				if(i==0){ // t
					Code.setStyleTop(d,"0px");
				}else if(i==1){ // b
					Code.setStyleBottom(d,"0px");
				}else if(i==2){ // l
					Code.setStyleLeft(d,"0px");
				}else if(i==3){ // r
					Code.setStyleRight(d,"0px");
				}
			}

	this._selectedIndex = foundSelectedIndex; // home
	this._selectedHighlight = div;
	
	//this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_CLICK, this._handleContainerClickedFxn, this);

	// SET INITIAL LAYOUT
	this.updateLayout();
}

giau.NavigationList.prototype._handleNavigationBusEventDown = function(e){
	if(!this._isAnimating && !this._isOpen){
		console.log("down event ");
		this._startAnimating();
		Code.setStyleDisplay(this._container,"inline-block");
		this._isOpen = true;
	}
}
giau.NavigationList.prototype._handleNavigationBusEventUp = function(e){
	if(!this._isAnimating && this._isOpen){
		console.log("up event ");
		this._startAnimating();
		Code.setStyleDisplay(this._container,"none");
		this._isOpen = false;
	}
}
giau.NavigationList.prototype._startAnimating = function(){
	if(!this._isAnimating){
		this._isAnimating = true;
		this._tickerAnimation = new Ticker(250);
		this._tickerAnimation.addFunction(Ticker.EVENT_TICK, this._stopAnimating, this);
		this._tickerAnimation.start();
	}
}
giau.NavigationList.prototype._stopAnimating = function(){
	this._tickerAnimation.stop();
	this._isAnimating = false;
}
giau.NavigationList.prototype._handleContentClickedFxn = function(e){
	var target = Code.getTargetFromMouseEvent(e);
	for(var i=0; i<this._optionElementList.length; ++i){
		if(this._optionElementList[i]["element"]==target){
			this.selectedIndex(i);
		}
	}
}
giau.NavigationList.prototype._handleContentTappedFxn = function(e){
	//console.log(e);
}
giau.NavigationList.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
}
giau.NavigationList.prototype.selectedIndex = function(index){
	var selected = this._optionElementList[index];
	console.log(selected)
	var url = selected["url"];
	if(url && url!=""){
		document.location.href = url;
	}
	var bus = giau.MessageBus();
	console.log(bus)
	var name = selected["name"];
	console.log(name)

	var listenEventName = giau.MessageBus.EVENT_NAVIGATION_SELECT+""+name;
	console.log(listenEventName)
	bus.alertAll(listenEventName, this);
}
giau.NavigationList.prototype.updateLayout = function(){
	//console.log("UPDATE LAYOUT")
	/*
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();
	//var widthElement = $(this._eleme
	var highlightElement = this._selectedHighlight;
	var selected = this._optionElementList[this._selectedIndex]["element"];
	var pos = $(selected).position();
	var width = $(selected).outerWidth();
	var height = $(selected).outerHeight();
	console.log(pos,width,height)
	Code.setStyleLeft(highlightElement,pos.left+"px");
	Code.setStyleTop(highlightElement,pos.top+"px");
	Code.setStyleWidth(highlightElement,width+"px");
	Code.setStyleHeight(highlightElement,height+"px");
	*/
}

giau.InfoOverlay = function(element){ // Overlay Float Alert
	this._jsDispatch = new JSDispatch();
	//giau.InfoOverlay._.constructor.call(this);

	// SET ROOT ELEMENTimage
	this._container = Code.getParent(element);
	this._element = element;
	Code.setStyleZIndex(element,"100");
	Code.setStylePosition(element,"absolute");
	Code.setStyleDisplay(element,"inline-block");

	// LISTENERS
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	//this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_CLICK, this._handleContainerClickedFxn, this);

	// SET INITIAL LAYOUT
	this.updateLayout();
}
giau.InfoOverlay.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
}
giau.InfoOverlay.prototype.updateLayout = function(){
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();
	var widthElement = $(this._element).width();
	var heightElement = $(this._element).height();
	
	// SET CENTER:
	var centerX = (widthContainer - widthElement)*0.5;
	var centerY = (heightContainer - heightElement)*0.5;
	Code.setStyleLeft(this._element,centerX+"px");
	Code.setStyleTop(this._element,centerY+"px");
	//Code.setStylePosition(this._primaryImageContainer, "relative");
}

giau.ImageGallery = function(element){
	this._jsDispatch = new JSDispatch();
	this.optimalImageWidthToHeight = 1920.0/1080.0;

	// SET ROOT ELEMENT
	this._container = element;
	Code.setStyleOverflow(this._container,"hidden"); // overflow: hidden;

	var propertyDataPageIndicators = "data-show-page-indicators";
	var propertyOverlayColor = "data-ovarlay-color";
	var overlayColor = Code.getPropertyOrDefault(this._container, propertyOverlayColor, "0x00000000");
	overlayColor = Number(overlayColor);
	overlayColor = Code.getJSColorFromARGB(overlayColor);

	this._showPageIndicators = Code.getPropertyOrDefault(this._container, propertyDataPageIndicators, "false") === "true" ? true : false;


	var showNavigation = Code.getProperty(this._container,"data-navigation");
	showNavigation = showNavigation=="true";
	
	
	// CREATE HIERARCHY
	this._functionalityContainer = Code.newDiv();
	this._interactionContainer = Code.newDiv();
	this._leftButton = Code.newDiv();
	this._rightButton = Code.newDiv();
	this._coverContainer = Code.newDiv();
		this._coverIconLeft = Code.newImage();
		this._coverIconRight = Code.newImage();
		this._coverBorderLeft = Code.newImage();
		this._coverBorderRight = Code.newImage();
		if(showNavigation){
			this._overlayBorderLeft = Code.newDiv();
			this._overlayBorderRight = Code.newDiv();
		}
		var overlayBorderColor = 0x44000000;
		Code.setStyleBackgroundColor(this._coverContainer,overlayColor);
		// A
	this._primaryImageContainer = Code.newDiv();
		Code.setStyleLeft(this._primaryImageContainer,0+"px");
		Code.setStyleTop(this._primaryImageContainer,0+"px");
		Code.setStylePosition(this._primaryImageContainer, "absolute");
		// B
	this._secondaryImageContainer = Code.newDiv();
		Code.setStyleLeft(this._secondaryImageContainer,0+"px");
		Code.setStyleTop(this._secondaryImageContainer,0+"px");
		Code.setStylePosition(this._secondaryImageContainer, "absolute");
	
	this._primaryImageElement = Code.newImage();
	this._secondaryImageElement = Code.newImage();
	Code.addChild(this._container,this._functionalityContainer);
		Code.addChild(this._functionalityContainer,this._secondaryImageContainer);
			Code.addChild(this._secondaryImageContainer,this._secondaryImageElement);
		Code.addChild(this._functionalityContainer,this._primaryImageContainer);
			Code.addChild(this._primaryImageContainer,this._primaryImageElement);
		Code.addChild(this._functionalityContainer,this._coverContainer);
			Code.addChild(this._coverContainer, this._coverBorderLeft);
			Code.addChild(this._coverContainer, this._coverBorderRight);
			if(showNavigation){
				Code.addChild(this._coverContainer, this._overlayBorderLeft);
				Code.addChild(this._coverContainer, this._overlayBorderRight);
			}
			Code.addChild(this._coverContainer, this._coverIconLeft);
			Code.addChild(this._coverContainer, this._coverIconRight);
			//this._coverBorderLeft
			
			if(showNavigation){
				this._coverIconLeft.src = GLOBAL_SERVER_IMAGE_PATH+"gallery_arrow_left.png";
				this._coverIconRight.src = GLOBAL_SERVER_IMAGE_PATH+"gallery_arrow_right.png";
				Code.setStyleBackground(this._overlayBorderLeft,""+Code.getJSColorFromARGB(overlayBorderColor));
				Code.setStyleBackground(this._overlayBorderRight,""+Code.getJSColorFromARGB(overlayBorderColor));
			}else{

			}
			this._coverBorderLeft.src = GLOBAL_SERVER_IMAGE_PATH+"/gallery_fade_left.png";
			this._coverBorderRight.src = GLOBAL_SERVER_IMAGE_PATH+"/gallery_fade_right.png";
			//Code.addChild(this._coverContainer, img);
			//gallery_fade_left
		Code.addChild(this._functionalityContainer,this._interactionContainer);
			Code.addChild(this._interactionContainer,this._leftButton);
			Code.addChild(this._interactionContainer,this._rightButton);
			
	this._isLoadingImage = false;
	this._animating = false;
	this._animatonTicker = null;
	this._automatedTicker = null;
	this._isAutomated = false;
	var autoTime = Code.getProperty(this._container,"data-autoplay");
	if(autoTime){
		autoTime = Number(autoTime);
		autoTime = Math.max(autoTime,100);
		this._isAutomated = true;
		this._automatedTicker = new Ticker(autoTime);
		this._automatedTicker.addFunction(Ticker.EVENT_TICK, this._handleAutomatedTickerFxn, this);
		this._automatedTicker.start();
	}
	

	this._currentIndex = null;
	this._coverElement = null;
	this._underElement = null;

	// generate images from children
	this._loadedImages = [];
	this._images = [];
	var i, len, child, url;
	var index = 0;
	for(i=0; i<Code.numChildren(this._container); ++i){
		child = Code.getChild(this._container,i);
		if(child){
			url = Code.getProperty(child,"data-source");
			if(url){
				this._images[index] = url;
				this._loadedImages[index] = null;
				++index;
				Code.removeChild(this._container,child);
				--i; // redo index
			}
		}
	}

	// page indicators
	this._pageIndicatorContainer = Code.newDiv();
		Code.addChild(this._container,this._pageIndicatorContainer);
		Code.setStyleWidth(this._pageIndicatorContainer,"100%");
		Code.setStyleDisplay(this._pageIndicatorContainer,"block");
		Code.setStyleMargin(this._pageIndicatorContainer,"0 auto");
		Code.setStyleTextAlign(this._pageIndicatorContainer,"center");
		Code.setStyleZIndex(this._pageIndicatorContainer,"99");
		Code.setStylePosition(this._pageIndicatorContainer,"absolute");
		Code.setStyleBottom(this._pageIndicatorContainer,"0px");
	
	// LISTENERS
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	this._jsDispatch.addJSEventListener(this._leftButton, Code.JS_EVENT_CLICK, this._handleLeftButtonClickedFxn, this);
	this._jsDispatch.addJSEventListener(this._rightButton, Code.JS_EVENT_CLICK, this._handleRightButtonClickedFxn, this);

	// INITIALIZE WITH FIRST IMAGE
	this.nextImage();
}


giau.ImageGallery.prototype._updatePageIndicators = function(){ 
	if(!this._showPageIndicators){
		return;
	}
	var iconActiveLocation = GLOBAL_SERVER_IMAGE_PATH+"/gallery_page_dot_active.png";
	var iconInactiveLocation = GLOBAL_SERVER_IMAGE_PATH+"/gallery_page_dot_inactive.png";
	var iconSizeWidth = 20;
	var iconSizeHeight = 20;
	Code.removeAllChildren(this._pageIndicatorContainer);
	var imageCount = this._images.length;
	var index = this._currentIndex;
	var i;
	for(i=0; i<imageCount; ++i){
		var image = Code.newImage();
		if(i==index){
			Code.setSrc(image, iconActiveLocation);
		}else{
			Code.setSrc(image, iconInactiveLocation);
		}
		Code.setStyleWidth(image,iconSizeWidth+"px");
		Code.setStyleHeight(image,iconSizeHeight+"px");
		Code.addChild(this._pageIndicatorContainer,image);
	}
	
}
giau.ImageGallery.prototype._handleAutomatedTickerFxn = function(){
	this._automatedTicker.stop();
	this._handleRightButtonClickedFxn();
	this._automatedTicker.start();
}

giau.ImageGallery.prototype._handleLeftButtonClickedFxn = function(e,f){
	if(this._images.length<=1){ return; }
	if(!this._animating){
		this.prevImage();
	}
}
giau.ImageGallery.prototype._handleRightButtonClickedFxn = function(e){
	if(this._images.length<=1){ return; }
	if(!this._animating){
		this.nextImage();
	}
}
giau.ImageGallery.prototype._handleWindowResizedFxn = function(){
	if(this._animating){
		// STOP IT OR UPDATE IT
	}
	this._updateLayout(this._currentIndex);
}

giau.ImageGallery.prototype.prevImage = function(){
	var index = this._currentIndex;
	if(index==null){
		index = 0;
	}else{
		--index;
	}
	if(index<0){ // loop around
		index = this._images.length - 1;
	}
	return this._loadOrShowImageAtIndex(index,true);
}
giau.ImageGallery.prototype.nextImage = function(){
	var index = this._currentIndex;
	if(index==null){
		index = 0;
	}else{
		++index;
	}
	if(index>=this._images.length){ // loop around
		index = 0;
	}
	return this._loadOrShowImageAtIndex(index,false);
}
giau.ImageGallery.prototype._loadOrShowImageAtIndex = function(index, isNext){
	if(this._isLoadingImage===true){
		return;
	}
	this._isLoadingImage = true;
	isNext = isNext!==undefined ? isNext : true;
	if(index<0 || index>=this._images.length){
		this._isLoadingImage = false;
		return;
	}
	var prev = this._currentIndex;
	var next = index;
	if(this._loadedImages[index]==null){
		// TODO: wait for old requests
		var imageSource = this._images[index];
		var self = this;
		imageLoader = new ImageLoader("",[imageSource], null,function(info){
			self._handleImageLoaded(info, index);
			if(prev!==null){
				self._updateLayout(prev);
				self._animateToNewImage(prev,next,isNext);
			}else{ // 1st time
				self._currentIndex = index;
				self._updateLayout(self._currentIndex);
			}
			self._isLoadingImage = false;
		},null);
		imageLoader.load();
	}else{
		this._isLoadingImage = false;
		this._currentIndex = index;
		this._updateLayout(this._currentIndex);
		this._animateToNewImage(prev,next,isNext);
	}
}
giau.ImageGallery.ANIMATION_DIRECTION_UNKNOWN = 0;
giau.ImageGallery.ANIMATION_DIRECTION_TO_LEFT = 1;
giau.ImageGallery.ANIMATION_DIRECTION_TO_RIGHT = 2;
giau.ImageGallery.ANIMATION_DIRECTION_FADE_IN = 3;
giau.ImageGallery.ANIMATION_DIRECTION_FADE_OUT = 4;

giau.ImageGallery.prototype._animateToNewImage = function(prevIndex,nextIndex,isRight){
	this._transitionIndexPrevious = prevIndex;
	this._transitionIndexNext = nextIndex;
	this._currentIndex = this._transitionIndexNext;
	this._animating = true;
	this._animationDirection = isRight ? giau.ImageGallery.ANIMATION_DIRECTION_TO_RIGHT : giau.ImageGallery.ANIMATION_DIRECTION_TO_LEFT;
	// SETUP DISPLAY
	var info;
	info = this._loadedImages[this._transitionIndexPrevious];
	Code.setSrc(this._primaryImageElement,info.url);
	info = this._loadedImages[this._transitionIndexNext];
	Code.setSrc(this._secondaryImageElement,info.url);
		
	// START ANIMATING
	this._time = 0;
	this._animatonTicker = new Ticker(20);
	this._animatonTicker.addFunction(Ticker.EVENT_TICK, this._handleTickerFxn, this);
	this._animatonTicker.start();
}
giau.ImageGallery.prototype._handleTickerFxn = function(){
	this._time = this._time!==undefined ? this._time : 0;
	this._time++;
	var countMax = 20;
	
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();
	var percent = (this._time/countMax);
	//percent = Code.bezier1DCubicAtT(0.0,0.0,1.0,1.0, percent); // ease-in-out
	percent = 1.0 - (Math.cos(percent*Math.PI) + 1.0)*0.5; // sin-ease-in-out
	//percent = Math.pow(percent,2); // ease-in
	var distance = percent * widthContainer;
	if(this._animationDirection == giau.ImageGallery.ANIMATION_DIRECTION_TO_RIGHT){
		distance *= 1.0;
	}else{
		distance *= -1.0;
	}
	Code.setStyleLeft(this._primaryImageContainer,distance+"px");
	//Code.setStyleLeft(this._primaryImageContainer,Math.round(percent*100.0)+"%");
	if(this._time>=countMax){
		// STOP ANIMATION
		Code.setStyleLeft(this._primaryImageContainer,0+"px");
		this._animating = false;
		this._animatonTicker.stop();
		this._animatonTicker.kill();
		this._animatonTicker = null;
		// SETUP DISPLAY
		var info;
		info = this._loadedImages[this._transitionIndexNext];
		Code.setSrc(this._primaryImageElement,info.url);
		Code.setSrc(this._secondaryImageElement,"");
		this._transitionIndexNext = null;
		this._transitionIndexPrevious = null;
		this._updatePageIndicators();
	}
}
giau.ImageGallery.prototype._handleImageLoaded = function(info, index){
	var image = info.images[0];
	var source = info.files[0];
	var info = {};
	info.width = image.width;
	info.height = image.height;
	info.url = source;
	this._loadedImages[index] = info;
	// update display
	//this._updateLayout(index);
}
giau.ImageGallery.prototype._updateLayout = function(index){
	var info = this._loadedImages[index];
	if(info){
		var widthContainer = $(this._container).width();
		var heightContainer = $(this._container).height();
			Code.setStyleWidth(this._primaryImageContainer,Math.floor(widthContainer)+"px");
			Code.setStyleHeight(this._primaryImageContainer,Math.floor(heightContainer)+"px");
			Code.setStyleWidth(this._secondaryImageContainer,Math.floor(widthContainer)+"px");
			Code.setStyleHeight(this._secondaryImageContainer,Math.floor(heightContainer)+"px");
		//var img = this._primaryImageElement;
		var size = Code.sizeToFitRectInRect(info.width,info.height, widthContainer,heightContainer);
		var diffX = widthContainer - size.width;
		var diffY = heightContainer - size.height;
		var iconButtonWidth = 15;
		var iconButtonHeight = 15;
		var barIconWidth = 50;
var iconButtonOffset = Math.floor((barIconWidth-iconButtonWidth)*0.5);
		Code.setSrc(this._primaryImageElement,info.url);

		// FUNCTIONALITY CONTAINER
			Code.setStylePosition(this._coverContainer, "absolute");
			Code.setStyleLeft(this._coverContainer, 0+"px");
			Code.setStyleTop(this._coverContainer, 0+"px");
			Code.setStyleWidth(this._coverContainer, "100%");
			Code.setStyleHeight(this._coverContainer, "100%");
				// LEFT
				Code.setStylePosition(this._coverBorderLeft, "absolute");
				Code.setStyleLeft(this._coverBorderLeft, 0+"px");
				Code.setStyleTop(this._coverBorderLeft, 0+"px");
				Code.setStyleHeight(this._coverBorderLeft, "100%");
				Code.setStyleWidth(this._coverBorderLeft, "100px");
				// RIGHT
				Code.setStylePosition(this._coverBorderRight, "absolute");
				Code.setStyleRight(this._coverBorderRight, 0+"px"); // widthContainer
				Code.setStyleTop(this._coverBorderRight, 0+"px");
				Code.setStyleHeight(this._coverBorderRight, "100%");
				Code.setStyleWidth(this._coverBorderRight, "100px");
				Code.setStylePosition(this._coverBorderRight, "absolute");
				// SOLID
				if(this._overlayBorderLeft && this._coverBorderRight){
					// LEFT
					Code.setStylePosition(this._overlayBorderLeft, "absolute");
					Code.setStyleLeft(this._overlayBorderLeft, 0+"px");
					Code.setStyleTop(this._overlayBorderLeft, 0+"px");
					Code.setStyleBottom(this._overlayBorderLeft, 0+"px");
					Code.setStyleWidth(this._overlayBorderLeft, barIconWidth+"px");
					Code.setStyleHeight(this._overlayBorderLeft, "100%");
					// RIGHT
					Code.setStylePosition(this._overlayBorderRight, "absolute");
					Code.setStyleRight(this._overlayBorderRight, 0+"px");
					Code.setStyleTop(this._overlayBorderRight, 0+"px");
					Code.setStyleBottom(this._overlayBorderRight, 0+"px");
					Code.setStyleWidth(this._overlayBorderRight, barIconWidth+"px");
					Code.setStyleHeight(this._overlayBorderRight, "100%");
				}
				// LEFT - BUTTON
				if(this._coverIconLeft.src){
					Code.setStylePosition(this._coverIconLeft, "absolute");
					Code.setStyleLeft(this._coverIconLeft, iconButtonOffset+"px");
					Code.setStyleTop(this._coverIconLeft, ((heightContainer-iconButtonHeight)*0.5)+"px");
					//Code.setStyleHeight(this._coverIconLeft, iconButtonHeight+"px");
					Code.setStyleWidth(this._coverIconLeft, iconButtonWidth+"px");
					// RIGHT - BUTTON
					Code.setStylePosition(this._coverIconRight, "absolute");
					Code.setStyleRight(this._coverIconRight, iconButtonOffset+"px");
					Code.setStyleTop(this._coverIconRight, ((heightContainer-iconButtonHeight)*0.5)+"px");
					//Code.setStyleHeight(this._coverIconRight, iconButtonHeight+"px");
					Code.setStyleWidth(this._coverIconRight, iconButtonWidth+"px");
				}
			// behind
			// ...
		// INTERACTION CONTAINER
			Code.setStylePosition(this._interactionContainer, "absolute");
			Code.setStyleLeft(this._interactionContainer, 0+"px");
			Code.setStyleTop(this._interactionContainer, 0+"px");
			Code.setStyleWidth(this._interactionContainer, "100%");
			Code.setStyleHeight(this._interactionContainer, "100%");
			// ... 
		// LEFT
			Code.setStylePosition(this._leftButton, "absolute");
			Code.setStyleLeft(this._leftButton, 0+"px");
			Code.setStyleTop(this._leftButton, 0+"px");
			Code.setStyleWidth(this._leftButton, "50%");
			Code.setStyleHeight(this._leftButton, "100%");
			//Code.setStyleBackground(this._leftButton, "rgba(0,255,0,0.5)");
		// RIGHT
			Code.setStylePosition(this._rightButton, "absolute");
			Code.setStyleRight(this._rightButton, 0+"px");
			Code.setStyleTop(this._rightButton, 0+"px");
			Code.setStyleWidth(this._rightButton, "50%");
			Code.setStyleHeight(this._rightButton, "100%");
			//Code.setStyleBackground(this._rightButton, "rgba(255,0,0,0.5)");
		// IMAGE CONTAINER
			// PRIMARY _primaryImageContainer
			// SECONDARY _secondaryImageContainer
		// IMAGE
		Code.setStylePosition(this._primaryImageElement, "absolute");
		Code.setStyleWidth(this._primaryImageElement,Math.round(size.width)+"px");
		Code.setStyleHeight(this._primaryImageElement,Math.round(size.height)+"px");
		Code.setStyleLeft(this._primaryImageElement,Math.round(diffX*0.5)+"px");
		Code.setStyleTop(this._primaryImageElement,Math.round(diffY*0.5)+"px");
		var primary = Code.getProperty(this._primaryImageElement,"style");
		Code.setProperty(this._secondaryImageElement, "style", primary);
		//
	}
	this._updatePageIndicators();
}


giau.CalendarListView = function(element){
	this._container = element;
	var eventList = [];
	var i, div;
	var propertyMonthsShort = "data-months-short";
	var propertyMonthsLong = "data-months-long";
	var propertyDaysShort = "data-days-short";
	var propertyDaysLong = "data-days-long";
	var propertyIndex = "data-index";
	var propertyTitle = "data-title";
	var propertyDescription = "data-description";
	var propertyStartDate = "data-start-date";
	var propertyDuration = "data-duration";
	for(i=0; i<Code.numChildren(this._container); ++i){
		div = Code.getChild(this._container,i);
		if(Code.hasProperty(div,propertyIndex)){
			var index = Code.getProperty(div,propertyIndex);
			var title = Code.getProperty(div,propertyTitle);
			var description = Code.getProperty(div,propertyDescription);
			var startDate = Code.getProperty(div,propertyStartDate);
			var duration = Code.getProperty(div,propertyDuration);
			duration = parseInt(duration);
			eventList.push({
				"start": startDate,
				"duration": duration,
				"title": title,
				"description": description,
				"index": index
			});
			Code.removeChild(this._container,div);
			--i; // recheck
		}
	}
	// TRANSLATION DAYS | MONTHS
	this._calendarMonthsShort = Code.monthsShort;
	if(Code.hasProperty(this._container,propertyMonthsShort)){
		var months = Code.getProperty(this._container,propertyMonthsShort);
		this._calendarMonthsShort = months.split(",");
		Code.setProperty(this._container,propertyMonthsShort,"");
	}
	this._calendarMonthsLong = Code.monthsLong;
	if(Code.hasProperty(this._container,propertyMonthsLong)){
		var months = Code.getProperty(this._container,propertyMonthsLong);
		this._calendarMonthsLong = months.split(",");
		Code.setProperty(this._container,propertyMonthsLong,"");
	}
	this._calendarDaysShort = Code.daysOfWeekShort;
	if(Code.hasProperty(this._container,propertyDaysShort)){
		var days = Code.getProperty(this._container,propertyDaysShort);
		this._calendarDaysShort = days.split(",");
		Code.setProperty(this._container,propertyDaysShort,"");
	}
	this._calendarDaysLong = Code.daysOfWeekLong;
	if(Code.hasProperty(this._container,propertyDaysLong)){
		var days = Code.getProperty(this._container,propertyDaysLong);
		this._calendarDaysLong = days.split(",")
;		Code.setProperty(this._container,propertyDaysLong,"");
	}
	// INIT
	var container = this._container;
	var i, len=eventList.length;
	var todayNowMilliseconds = Code.getTimeMilliseconds(true);
	var yesterdayNowMilliseconds = todayNowMilliseconds - 1*24*60*60*1000; // 1 day previous
	var foundActiveEvents = 0;
	var div;
	var noFoundEventsText = "No Upcoming Events";
	var noEventsTextColor = "#666";
	for(i=0;i<len;++i){
		var event = eventList[i];
		var start = event.start;
		var duration = event.duration;
		var date = Code.getTimeFromTimeStamp(start);

		var end = date + duration;
		// don't display past events
		var timeCutOff = todayNowMilliseconds - 30*24*60*60*1000; // 1 week previous
		var titleColor = "#000000";
		var descriptionColor = "#333";
		//var backgroundColor = "#EEEEEE";
		var backgroundColor = "#FFFFFF";

		if(end<timeCutOff){
			continue;
		}

		if(end<yesterdayNowMilliseconds){
			//backgroundColor = "#F5F5F5";
			backgroundColor = "#FFFFFF";
			titleColor = "#999";
			descriptionColor = "#999";
		}

		++foundActiveEvents;
		
		var stamp = Code.getTimeStamp(date);
		var displayDate = this.formatTimeHumanReadable(date, duration);
		var displayTitle = event.title;
		var displayDescription = event.description;
		
		div = Code.newDiv();
			//Code.setStyleWidth(div,"100%");
			Code.setStyleMargin(div,"0");
			Code.setStyleDisplay(div,"block");
			Code.setStyleTextAlign(div,"center");
			Code.setStylePadding(div,"20px 2px 20px 2px");
			Code.setStyleBackground(div,backgroundColor);
			Code.setStyleMargin(div,"0px 0px 12px 0px");
			Code.addChild(container,div);
			if(i<len-1){
				Code.setStyleBorderColor(div,"#EEE");
				Code.setStyleBorder(div,"solid");
				Code.setStyleBorderWidthTop(div,"0px");
				Code.setStyleBorderWidthLeft(div,"0px");
				Code.setStyleBorderWidthRight(div,"0px");
				Code.setStyleBorderWidthBottom(div,"1px");
			}
		var cont = div;
		// LEFT
		div = Code.newDiv();
			Code.setContent(div, displayTitle);
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleWidth(div,"60%");
			//Code.setStyleFontSize(div,"18px");
			Code.setStyleTextAlign(div,"left");
			//Code.setStyleFontWeight(div,"bold");
			Code.addClass(div,"calendarEventListItemTitle");
			Code.setStyleColor(div,titleColor);
			Code.setStyleVerticalAlign(div,"top");
			//Code.setStyleWidth(div,"30%");
			Code.addChild(cont,div);
		/*
		// DIV
			div = Code.newDiv();
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleWidth(div,"5%");
			Code.addChild(cont,div);
		// CENTER
		div = Code.newDiv();
			Code.setContent(div, displayDescription);
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleWidth(div,"30%");
			Code.setStyleFontSize(div,"12px");
			Code.setStyleTextAlign(div,"left");
			Code.addClass(div,"calendarEventListItemDescription");
			Code.setStyleColor(div,descriptionColor);
			Code.setStyleVerticalAlign(div,"top");
			Code.addChild(cont,div);
		// DIV
			div = Code.newDiv();
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleWidth(div,"5%");
			Code.addChild(cont,div);
			*/
		// RIGHT
		div = Code.newDiv();
			Code.setContent(div, displayDate);
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleWidth(div,"40%");
			//Code.setStyleFontSize(div,"14px");
			Code.setStyleTextAlign(div,"right");
			Code.addClass(div,"calendarEventListItemDate");
//			Code.setStyleColor(div,descriptionColor);
			Code.setStyleVerticalAlign(div,"top");
			Code.addChild(cont,div);
	}
	if(foundActiveEvents==0){
		div = Code.newDiv();
			Code.setContent(div, noFoundEventsText);
			Code.setStyleDisplay(div,"block");
			// Code.setStyleWidth(div,"30%");
			Code.setStyleFontSize(div,"12px");
			Code.setStyleFontStyleItalic(div);
			Code.setStyleTextAlign(div,"center");
			Code.setStyleColor(div,noEventsTextColor);
			Code.addChild(container,div);
	}
// Code.getTimeStamp
//Code.getTimeMilliseconds();
//Code.getTimeZone = function(){
}
giau.CalendarListView.prototype.formatTimeHumanReadable = function(timestamp, duration){
	var date1 = new Date(timestamp);
		var month1 = this._calendarMonthsLong[date1.getMonth()];
		var day1 = date1.getDate();
		var dow1 = this._calendarDaysLong[(date1.getDay()+6)%7];
		var hour1 = date1.getHours();
		var min1 = date1.getMinutes();
		var ampm1 = "AM"
		if(hour1 >= 12){
			ampm1 = "PM";
			if(hour1 >= 13){
				hour1 -= 12;
			}
		}
	if(duration==0){
		return ""+dow1+", "+month1+" "+day1;//+" @ "+hour1+":"+Code.prependFixed(""+min1,"0",2)+" "+ampm1;
	}else{
		var dowShort1 = this._calendarDaysShort[(date1.getDay()+6)%7];
		var date2 = new Date(timestamp + duration);
		var month2 = this._calendarMonthsLong[date2.getMonth()];
		var day2 = date2.getDate();
		var dow2 = this._calendarDaysLong[(date2.getDay()+6)%7];
		var dowShort2 = this._calendarDaysShort[(date2.getDay()+6)%7];
		var hour2 = date2.getHours();
		var min2 = date2.getMinutes();
		return ""+month1+" "+day1+" ("+dowShort1+")"+" - "+month2+" "+day2+" ("+dowShort2+")";
	}
	return null;
}

giau.DataTable = function(element){
	this._container = element;
	this._jsDispatch = new JSDispatch();
	console.log("data table");

	this._url = Code.getProperty(this._container, "data-url");
	this._currentPage = 0;
	this._pageCount = 10;
		var columns = Code.getProperty(this._container, "data-columns");
	this._dataColumns = columns.split(",");
	console.log(this._dataColumns)
	this._dataTable = Code.getProperty(this._container, "data-table");
	

	this._button = Code.newInputButton("TAP");
	Code.addChild(this._container, this._button);

	this._jsDispatch.addJSEventListener(this._button, Code.JS_EVENT_CLICK, this._handleButtonClickedFxn, this);
	this._jsDispatch.addJSEventListener(this._button, Code.JS_EVENT_TOUCH_TAP, this._handleButtonClickedFxn, this);


	// ... 
	this._getPage();
}
giau.DataTable.prototype._getPage = function(){
	console.log(data);
	var start = this._currentPage * this._pageCount;
	var end = start + this._pageCount;
	var count = end-start;

	var table = this._dataTable;
	var url = this._url;

	console.log("A-URL: "+url);
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	ajax.params({
		"operation":"get_table_page",
		"table":table,
		"offset":start,
		"count":count
	});
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		this.updateFromData(obj);
	});
	ajax.send();

}
giau.DataTable.prototype.updateFromData = function(data){
	if(data){
		var result = data["result"];
		if(result=="success"){
			var info = data["data"];
			var offset = info["offset"];
			var count = info["count"];
			var rows = info["rows"];
			var page = Math.floor(offset / this._pageCount);
			var cols = this._dataColumns;
			var i, j;
			var rowCount = rows.length;
			var colCount = cols.length;
			//
			var elementTable = Code.newTable();
			var elementHeader = Code.addHeader(elementTable);
			var elementRow = Code.addRow(elementHeader);
			// HEADER
			for(j=0; j<colCount; ++j){
				var col = cols[j];
				var elementCol = Code.addCell(elementRow);
				Code.setContent(elementCol,col);
			}
			var elementBody = Code.addBody(elementTable);
			// BODY
			for(i=0; i<rowCount; ++i){
				var row = rows[i];
				var elementRow = Code.addRow(elementBody);
				for(j=0; j<colCount; ++j){
					var col = cols[j];
					var value = row[col];
					var elementCol = Code.addCell(elementRow);
					Code.setContent(elementCol,value);
					if(i%2==0){
						Code.addClass(elementCol,"even");
					}else{
						Code.addClass(elementCol,"odd");
					}
				}
				
			}
			// FOOTER
			Code.removeAllChildren(this._container);
			Code.addChild(this._container,elementTable);
		}
	}
}
giau.DataTable.prototype._handleButtonClickedFxn = function(){
	console.log("get data");
}







giau.AutoComplete = function(element){
	this._container = element;
	this._jsDispatch = new JSDispatch();
	console.log("autocomplete");

	this._changeMiniumTime = 250;
	this._lastChangeTimestamp = -1;
	this._lastChangeValue = "";
	this._ticker = new Ticker(this._changeMiniumTime);
	this._ticker.addFunction(Ticker.EVENT_TICK, this._handleTickerFxn, this);
	this._hintIsActive = false;

	this._url = Code.getProperty(this._container, "data-url");
		var params = Code.getProperty(this._container, "data-params");
	this._dataParameters = Code.parseJSON(params);
		var columns = Code.getProperty(this._container, "data-columns");
	this._dataColumns = columns.split(",");
	console.log(this._dataColumns)

	//
	this._overlay = Code.newDiv();
	Code.addChild(document.body,this._overlay);
	Code.setStylePosition(this._overlay,"absolute");
	Code.setStyleZIndex(this._overlay,"999");
	Code.setStyleLeft(this._overlay,"0px");
	Code.setStyleTop(this._overlay,"0px");
	Code.setStyleBackground(this._overlay,"#FFF");
	Code.setStyleBorderWidth(this._overlay,"1px");
	Code.setStyleBorder(this._overlay,"solid");
	Code.setStyleBorderColor(this._overlay,"#F00");

	Code.setStyleOverflow(this._overlay,"hidden");
	//Code.setContent(this._overlay,"all good");

	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_CLICK, this._handleElementClickedFxn, this);
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_TOUCH_TAP, this._handleElementClickedFxn, this);

	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_FOCUS_IN, this._handleElementFocusInFxn, this);
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_FOCUS_OUT, this._handleElementFocusOutFxn, this);
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_PASTE, this._handleElementPasteFxn, this);
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_KEY_PRESS, this._handleElementKeyPressFxn, this);
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_KEY_UP, this._handleElementKeyUpFxn, this);
	//
	// this._jsDispatch.addJSEventListener(this._container, "change", this._handleA, this);
	// this._jsDispatch.addJSEventListener(this._container, "onchange", this._handleA, this);
	this._container.change = function(e){
		console.log("nside");
		var target = Code.getTargetFromEvent(e);
		console.log(target.value);
	}

	// Code.JS_EVENT_CHANGE
	// JS_EVENT_ONCHANGE
	// Code.JS_EVENT_TEXT_INPUT = "textinput";
	// Code.JS_EVENT_ON_INPUT = "oninput";
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	// ... 
//	this._check();
//this._ticker.start();
}

giau.AutoComplete.prototype._handleA = function(){
	console.log("A");
}
giau.AutoComplete.prototype._handleElementKeyUpFxn = function(e){

	var key = Code.getKeyCodeFromKeyboardEvent(e);
	if(key==Keyboard.KEY_ESC){
		this._setHintActive(!this._hintIsActive);
	}
}
giau.AutoComplete.prototype._handleElementKeyPressFxn = function(e){
	var target = Code.getTargetFromEvent(e);
	var value = Code.getInputTextValue(target);
	//console.log("got: "+value);
	//console.log(e);
	this._check(value);
}
giau.AutoComplete.prototype._handleElementPasteFxn = function(){
	//console.log("paste");
	this._check();
}
giau.AutoComplete.prototype._handleElementFocusInFxn = function(){
	this._setHintActive(true);
	this._check();
}
giau.AutoComplete.prototype._handleElementFocusOutFxn = function(){
	//this._setHintActive(false); // timed ?
	this._check();
}
giau.AutoComplete.prototype._handleElementClickedFxn = function(){
	//console.log("click");
}
giau.AutoComplete.prototype._handleWindowResizedFxn = function(){
	this._updateLayout();
}
giau.AutoComplete.prototype._setHintActive = function(toActive){
	this._hintIsActive =  toActive;
	this._updateLayout();
}
giau.AutoComplete.prototype._handleTickerFxn = function(){
	console.log("ticked");
	this._ticker.stop();
	this._check();
//	this._ticker.start();
}
giau.AutoComplete.prototype._check = function(value){
	value = value !== undefined ? value : Code.getInputTextValue(this._container);
	console.log(value);
	this._requestData(value);
	// console.log( $(this._container) );
	// console.log( $(this._container).value );
	/*
console.log("check");
	var currentTime = Code.getTimeMilliseconds();
	var deltaTime = currentTime - this._lastChangeTimestamp;
	if(deltaTime > this._changeMiniumTime){
console.log("A");
		this._ticker.stop();
		this._lastChangeTimestamp = currentTime;
		var value = Code.getInputTextValue(this._container);
console.log("B",value,"C",this._lastChangeValue);
console.log(Code.getProperty(this._container,"value") );
		if(value!=this._lastChangeValue){
			this._lastChangeValue = value;
console.log(value);
			if(value!=""){
				if(this._hintIsActive){
					//
				}
			}
		}
		// query url with param and get results
	}else{
		// set timer 
		this._ticker.start();
	}
*/
	//this._ticker.start();
}
giau.AutoComplete.prototype._updateLayout = function(){
	if(this._hintIsActive){
		console.log("show")
		Code.setStyleDisplay(this._overlay,"block");
	}else{
		console.log("hide")
		Code.setStyleDisplay(this._overlay,"none");
	}

	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();
		var offsetContainer = $(this._container).offset();
	var xContainer = offsetContainer.left;
	var yContainer = offsetContainer.top;

	Code.setStyleLeft(this._overlay,""+xContainer+"px");
	Code.setStyleTop(this._overlay,""+(yContainer+heightContainer)+"px");
	Code.setStyleWidth(this._overlay,""+widthContainer+"px");
	//Code.setStyleTop(this._overlay,""+(yContainer+heightContainer)+"px");
console.log(xContainer,yContainer,widthContainer,heightContainer)
}
giau.AutoComplete.prototype._requestData = function(searchValue){
	var url = this._url;
	this._dataParameters["search"] = searchValue; // replace search param
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	ajax.params(this._dataParameters);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		this.updateFromData(obj);
	});
	ajax.send();
}

giau.AutoComplete.prototype.updateFromData = function(data){
	console.log(data);
	if(data){
		var result = data["result"];
		if(result=="success"){
			var info = data["data"];
			var offset = info["offset"];
			var count = info["count"];
			var rows = info["rows"];
			var page = Math.floor(offset / this._pageCount);
			var cols = this._dataColumns;
			var i, j;
			var rowCount = rows.length;
			var colCount = cols.length;
			colCount = 1;
Code.removeAllChildren(this._overlay);
			for(i=0; i<rowCount; ++i){
				var row = rows[i];
				//var elementRow = Code.addRow(elementBody);
				var rowValue = row[cols[0]];// same for entire row
				for(j=0; j<colCount; ++j){
					var col = cols[j];
					var value = row[col];
					//var elementCol = Code.addCell(elementRow);
					//Code.setContent(elementCol,value);
					var elementCol = Code.newDiv(value);
					Code.setProperty(elementCol,"data-data",rowValue);
					Code.addChild(this._overlay,elementCol);
					if(i%2==0){
						Code.addClass(elementCol,"even");
					}else{
						Code.addClass(elementCol,"odd");
					}
					//
					this._jsDispatch.addJSEventListener(elementCol, Code.JS_EVENT_CLICK, this._handleSelectElementClickFxn, this);
				}
				
			}
			this._updateLayout();
		}
	}
}

giau.AutoComplete.prototype._handleSelectElementClickFxn = function(e){
	var target = Code.getTargetFromEvent(e);
	var data = Code.getProperty(target,"data-data");
	Code.setInputTextValue(this._container,data);
	this._setHintActive(false);
}














giau.FileBrowser = function(element){
	this._container = element;

	this._iconLookupTable = {};
	var propertyDataIconKey = "data-icon-key";
	var propertyDataIconValue = "data-icon-value";
	var i;
	for(i=0; i<Code.numChildren(this._container);++i){
		var ele = Code.getChild(this._container,i);
		if( Code.hasProperty(ele,propertyDataIconKey) ){
			var iconKey = Code.getProperty(ele, propertyDataIconKey);
			var iconValue = Code.getProperty(ele, propertyDataIconValue);
			this._iconLookupTable[iconKey] = iconValue;
			console.log(iconKey,iconValue);
			Code.removeChild(this._container,ele);
			--i;
		}
	}

	this._elementPathContainer = Code.newDiv();
		Code.addChild(this._container,this._elementPathContainer);
		this._elementPath = Code.newDiv();
			Code.addChild(this._elementPathContainer,this._elementPath);
		this._elementRelative = Code.newDiv();
			Code.addChild(this._elementPathContainer,this._elementRelative);
	this._elementFileContainer = Code.newDiv();
		Code.addChild(this._container,this._elementFileContainer);
		this._elementFileList = Code.newDiv();
			Code.addChild(this._elementFileContainer,this._elementFileList);
	this._elementURL = Code.newDiv();
		Code.addChild(this._container,this._elementURL);
	this._elementUploadContainer = Code.newDiv();
		Code.addChild(this._container,this._elementUploadContainer);
		this._elementUploadDropTarget = Code.newDiv();
			Code.addChild(this._elementUploadContainer,this._elementUploadDropTarget);
		this._elementCreateDirectory = Code.newDiv();
			Code.addChild(this._elementUploadContainer,this._elementCreateDirectory);
		this._elementUpDirectory = Code.newDiv();
			Code.addChild(this._elementUploadContainer,this._elementUpDirectory);
		this._elementDelete = Code.newDiv();
			Code.addChild(this._elementUploadContainer,this._elementDelete);

	// container:
	div = this._container;
	Code.setStyleWidth(div,"100%");
	//Code.setStyleHeight(div,"");
	Code.setStyleBackground(div,"#0F0");

	// path container:
	div = this._elementPathContainer;
	Code.setStyleWidth(div,"100%");
	Code.setStyleBackground(div,"#FF0");

	// path:
	div = this._elementPath;
	Code.setStyleWidth(div,"50%");
	Code.setStyleDisplay(div,"inline-block");
	Code.setStyleMargin(div,"0");
	Code.setStylePadding(div,"0");
	Code.setStyleBorderWidth(div,"0");
	Code.setContent(div,"");
	Code.setStyleBackground(div,"#FF0");
	Code.setStyleFontSize(div,"10px");
	Code.setStyleColor(div,"#000");

	// relative:
	div = this._elementRelative;
	Code.setStyleWidth(div,"50%");
	Code.setStyleDisplay(div,"inline-block");
	Code.setStyleMargin(div,"0");
	Code.setStylePadding(div,"0");
	Code.setStyleBorderWidth(div,"0");
	Code.setContent(div,"");
	Code.setStyleBackground(div,"#0FF");
	Code.setStyleFontSize(div,"10px");
	Code.setStyleColor(div,"#000");

	// file scroller
	div = this._elementFileContainer;
	Code.setStyleWidth(div,"100%");
	Code.setStyleHeight(div,"400px");
	Code.setStyleBackground(div,"#FFF");
	Code.setStyleOverflow(div,"scroll");
	Code.setStyleOverflowX(div,"hidden");

	// file scroller
	div = this._elementFileList;
	Code.setStyleWidth(div,"100%");
	//Code.setStyleHeight(div,"400px");
	Code.setStyleBackground(div,"#FFF");

	// additional types:
		// up a directory
		// +create directory
	//
	
	// drop target
		div = this._elementUploadDropTarget;
		Code.setStyleWidth(div,"100px");
		Code.setStyleHeight(div,"100px");
		Code.setStyleBackground(div,"#F00");
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleTextAlign(div,"center")
		Code.setStyleVerticalAlign(div,"middle")
		Code.setContent(div,"drag file here to upload");
	// create directory
		div = this._elementCreateDirectory;
		Code.setStyleWidth(div,"100px");
		Code.setStyleHeight(div,"100px");
		Code.setStyleBackground(div,"#990");
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleTextAlign(div,"center")
		Code.setStyleVerticalAlign(div,"middle")
		Code.setContent(div,"create new directory here");
	// up a directory
		div = this._elementUpDirectory;
		Code.setStyleWidth(div,"100px");
		Code.setStyleHeight(div,"100px");
		Code.setStyleBackground(div,"#0FF");
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleTextAlign(div,"center")
		Code.setStyleVerticalAlign(div,"middle")
		Code.setContent(div,"go up a directory");
	// delete
		div = this._elementDelete;
		Code.setStyleWidth(div,"100px");
		Code.setStyleHeight(div,"100px");
		Code.setStyleBackground(div,"#F0F");
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleTextAlign(div,"center")
		Code.setStyleVerticalAlign(div,"middle")
		Code.setContent(div,"delete selected item");

	// LISTNERS
	this._jsDispatch = new JSDispatch();
	// UPLOAD
	this._jsDispatch.addJSEventListener(this._elementUploadDropTarget, Code.JS_EVENT_DRAG_OVER, this._handleDragOverUploadFxn, this);
	this._jsDispatch.addJSEventListener(this._elementUploadDropTarget, Code.JS_EVENT_DRAG_DROP, this._handleDragDropUploadFxn, this);
	// CREATE DIR
	this._jsDispatch.addJSEventListener(this._elementCreateDirectory, Code.JS_EVENT_CLICK, this._handleClickCreateDirectoryFxn, this);
	this._jsDispatch.addJSEventListener(this._elementCreateDirectory, Code.JS_EVENT_TOUCH_TAP, this._handleClickCreateDirectoryFxn, this);
	// UP DIR
	this._jsDispatch.addJSEventListener(this._elementUpDirectory, Code.JS_EVENT_CLICK, this._handleNavigateUpDirectoryFxn, this);
	this._jsDispatch.addJSEventListener(this._elementUpDirectory, Code.JS_EVENT_TOUCH_TAP, this._handleNavigateUpDirectoryFxn, this);
	// DELETE DIR
	this._jsDispatch.addJSEventListener(this._elementDelete, Code.JS_EVENT_CLICK, this._handleDeleteDirectoryFxn, this);
	this._jsDispatch.addJSEventListener(this._elementDelete, Code.JS_EVENT_TOUCH_TAP, this._handleDeleteDirectoryFxn, this);
	//

	// START AT ROOT
	this._selectedIndex = -1;
	this._path = [];
	this._contents = [];
	// INIT
	this.refreshBrowser();
}
giau.FileBrowser.prototype.refreshBrowser = function(){
	this.setSelectedIndex(-1);
	this.listFiles( this.currentFullPath() );
}
giau.FileBrowser.prototype.releaseFileElements = function(){
	for(var i=0; i<Code.numChildren(this._elementFileList); ++i){
		var div = Code.getChild(this._elementFileList,i);
		var cover = Code.getChild(div,2);
		this._jsDispatch.removeAllListeners(cover);
	}
	Code.removeAllChildren(this._elementFileList);
}
giau.FileBrowser.prototype.elementFromFile = function(file, index){
	var title = Code.getValueOrDefault(file, "name", "?");
	var mimetype = Code.getValueOrDefault(file, "mimetype", "");
	var url = Code.getValueOrDefault(file, "url", "?");
	//var relativeURL = Code.getValueOrDefault(file, "url_relative", "?");
	var absoluteURL = Code.getValueOrDefault(file, "url", "?");
	title = Code.clipStringToMaxChars(title,24,"...");



	//
	var div = Code.newDiv();
	//Code.setStyleDisplay(div,"inline-block");
		Code.setStyleDisplay(div,"table-cell");
		Code.setStyleBorder(div,"solid");
		Code.setStyleBorderWidth(div,"1px");
		Code.setStylePadding(div,"10px");
//Code.setStyleWidth(div,"60px");
		Code.setStylePosition(div,"relative");
		//Code.setStyleVerticalAlign(div,"middle");
		Code.setStyleVerticalAlign(div,"top");
		Code.setStyleTextAlign(div,"center");
	var img = this.iconFromFileType(mimetype, absoluteURL);//relativeURL);
	var label = Code.newDiv();
		Code.setStyleFontSize(label,"11px");
		Code.setStyleColor(label,"#000000");
		Code.setContent(label,title);
Code.setStyleWidth(label,"60px");
		Code.setStyleWordWrap(label,"break-word");
	var cover = Code.newDiv();
		Code.setStyleLeft(cover,"0px");
		Code.setStyleTop(cover,"0px");
		Code.setStyleWidth(cover,"100%");
		Code.setStyleHeight(cover,"100%");
		Code.setStyleBackground(cover,"rgba(255,0,0, 0.0)");
		Code.setStylePosition(cover,"absolute");
	
	Code.addChild(div,img);
	Code.addChild(div,label);
	Code.addChild(div,cover);

	this.unhighlightFileElement(div);

	Code.setProperty(cover,"data-index",index+"");
	this._jsDispatch.addJSEventListener(cover, Code.JS_EVENT_CLICK, this._handleClickFileElement, this);
	this._jsDispatch.addJSEventListener(cover, Code.JS_EVENT_TOUCH_TAP, this._handleClickFileElement, this);
	this._jsDispatch.addJSEventListener(cover, Code.JS_EVENT_DOUBLE_CLICK, this._handleDoubleClickFileElement, this);
	//var gest = new FF.Gesticulator();
	//gest.attachElement(cover);
	//this._jsDispatch.addJSEventListener(cover, Code.JS_EVENT_DOUBLE_CLICK, this._handleDoubleClickFileElement, this);

	return div;
}

giau.FileBrowser.prototype.highlightFileElement = function(element){
	var div = element;
	Code.setStyleBackgroundColor(div,"rgba(0,0,255, 0.25)");
		Code.setStyleBorderColor(div,"rgba(0,0,222, 0.25)");
}
giau.FileBrowser.prototype.unhighlightFileElement = function(element){
	var div = element;
	Code.setStyleBackgroundColor(div,"inherit");
	Code.setStyleBorderColor(div,"rgba(0,0,0, 0.0)");
}
giau.FileBrowser.prototype._handleNavigateUpDirectoryFxn = function(e){
	this.navigateDirectory();
	this.refreshBrowser();
}
giau.FileBrowser.prototype._handleDeleteDirectoryFxn = function(e){
	var file = this.getSelectedFile();
	if(file){
		var name = file["name"];
		var path = file["path"];
		//var fullPath = this.currentFullPath()+"/"+name;
		//this.removeFile("test");
		var isDirectory = file["isDirectory"];
		var result = confirm("are you sure you want to delete\n"+name+" ?");
		if(result){
			if(isDirectory){
				result = confirm(""+name+" is a directory.\ndo you want to delete all contents?");
				if(result){
					this.removeFile(path);
				}
			}else{
				this.removeFile(path);
			}
		}

	}
	//this.navigateDirectory();
	//this.refreshBrowser();
}
giau.FileBrowser.prototype._handleClickFileElement = function(e){
	var file = this.fileElementFromEvent(e);
	if(file){
		var name = file["name"];
		var index = file["index"];
		this.setSelectedIndex(index);
	}
}
giau.FileBrowser.prototype.getSelectedFile = function(){
	var index = this._selectedIndex;
	if(index<this._contents.length){
		var file = this._contents[index];
		return file;
	}
	return null;
}
giau.FileBrowser.prototype.setSelectedIndex = function(index){
	var prevIndex = this._selectedIndex;
	var div;
	if(prevIndex>=0){
		div = Code.getChild(this._elementFileList,prevIndex);
		if(div){
			this.unhighlightFileElement(div);
		}
	}
	if(index<this._contents.length){
		this._selectedIndex = index;
		div = Code.getChild(this._elementFileList,index);
		if(div){
			this.highlightFileElement(div);
		}
		file = this._contents[index];
		if(file){
			div = this._elementRelative;
			var relative = Code.escapeSpaces(file["path"]); // "url_relative"
			Code.setContent(div,relative);
		}
	}
}
giau.FileBrowser.prototype._handleDoubleClickFileElement = function(e){
	var file = this.fileElementFromEvent(e);
	if(file){
		var name = file["name"];
		if(file["isDirectory"]){ // goto location
			this.navigateDirectory(name);
			this.refreshBrowser();
		}else{ // goto item
			var url = file["url"];
			window.open(url,"_blank")
		}
	}
}
giau.FileBrowser.prototype.navigateDirectory = function(name){
	if(name){ // sub directory
		this._path.push(name);
	}else{ // up directory
		this._path.pop();
	}
}
giau.FileBrowser.prototype.fileElementFromEvent = function(e){
	e.stopPropagation();
	e.preventDefault();
	var target = Code.getTargetFromEvent(e);
	var index = Code.getProperty(target,"data-index");
	if(index!==null && index.length>0){
		index = Number(index);
		var file = this._contents[index];
		return file;
	}
	return null;
}
giau.FileBrowser.prototype._handleClickCreateDirectoryFxn = function(e){
	e.stopPropagation();
	e.preventDefault();
	var result = window.prompt("create new directory","");
	if(result!==null && result.length>0){
		var fullPath = this.currentFullPath();
		fullPath = fullPath+"/"+result;
		this.createDirectory(fullPath);
	}
}

giau.FileBrowser.prototype.currentFullPath = function(){
	return "/"+this._path.join("/");
}
giau.FileBrowser.prototype._handleDragOverUploadFxn = function(e){
	//console.log("over");
	e.stopPropagation();
	e.preventDefault();
	//console.log(e);
}
giau.FileBrowser.prototype._updateLayout = function(e){
	// remove old
	this.releaseFileElements();
	// set path
	Code.setContent(this._elementPath,"Path: "+this.currentFullPath());
	// add files:
	var i;
	var len = this._contents.length;
	for(i=0; i<len; ++i){
		var file = this._contents[i];
		var element = this.elementFromFile(file, i);
		Code.addChild(this._elementFileList,element);
	}
}
giau.FileBrowser.prototype._handleDragDropUploadFxn = function(e){
	var directory = this.currentFullPath();
	e.stopPropagation();
	e.preventDefault();
	var fileList = e.dataTransfer.files;
	var i, len = fileList.length;
	for(i=0; i<len; ++i){
		var file = fileList[i];
		var filename = file.name;
		var filetype = file.type;
		if(this.fileTypeAcceptable(filetype)){
			this.uploadFile(file, filename, directory);
			/*
			var self = this;
			var fileReader = new FileReader();
			fileReader.onload = function(event){
				console.log(event);
				console.log("loaded file: "+filename);
				var target = Code.getTargetFromEvent(event);
				var result = target.result;
				self.uploadFile(file, filename);
			}
			fileReader.readAsDataURL(file);
			*/
		}
	}

}
giau.FileBrowser.prototype.iconFromFileType = function(filetype, url){
	var source = this._iconLookupTable["icon_default"];
	var useBackground = false;
	if(filetype){
		if(filetype == "directory"){ // directory
			source =  this._iconLookupTable["icon_folder"];
		}else if( filetype.match("image\/.*") ){  // any image
			source = url;
			useBackground = true;
		}
		
		// if other type, use iconography
		// mime_content_type
		var lookupTable = {
			"image/png" : null
		};
	}
	var img = Code.newImage();
		img.src = source;
		Code.setStyleWidth(img,"32px");
		Code.setStyleHeight(img,"32px");
		if(useBackground){
			Code.setStyleBackground(img,"url('"+this._iconLookupTable["icon_image_background"]+"')");
		}
	return img;
}

giau.FileBrowser.prototype.fileTypeAcceptable = function(type){
	// image/*, ...
	return true;
}
giau.FileBrowser.prototype.downloadFile = function(relative){
	//
}

giau.FileBrowser.prototype.moveFile = function(relativeSource,relativeDestination){
	//
}
giau.FileBrowser.prototype.removeFile = function(relative){
	if(!relative){
		return;
	}
	var url = "./";
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
		ajax.append('operation','file_remove_file');
		ajax.append('path',relative);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		console.log(obj);
		this.refreshBrowser();
	});
	ajax.send();
}
giau.FileBrowser.prototype.createDirectory = function(relative){
	if(!relative){
		return;
	}
	var url = "./";
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
		ajax.append('operation','file_create_directory');
		ajax.append('path',relative);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		console.log(obj);
		this.refreshBrowser();
	});
	ajax.send();
}

giau.FileBrowser.prototype.listFiles = function(relative){
	relative = relative!==undefined ? relative : "/";
	var url = "./";
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
		ajax.append('operation','file_list_files');
		ajax.append('path',relative);
		ajax.append('recursive',false);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		console.log(obj);
		var itemList = obj["data"];
		var currentPath = obj["path"];
		if(itemList){
			this._contents = itemList;
		}else{
			this._contents = [];
		}
		this.sortContents();
		this._updateLayout();
	});
	ajax.send();
}
giau.FileBrowser.prototype.sortContents = function(){
	this._contents.sort( function(a,b){
		var filenameA = a["name"];
		var isDirectoryA = a["isDirectory"];
		var filenameB = b["name"];
		var isDirectoryB = b["isDirectory"];
		if(isDirectoryA && isDirectoryB){
			return filenameA < filenameB ? -1 : 1;
		}else if(isDirectoryA){
			return -1;
		}else if(isDirectoryB){
			return 1;
		} // else both files
		return filenameA < filenameB ? -1 : 1;
	});
	var i, len = this._contents.length;
	for(i=0; i<len; ++i){
		var file = this._contents[i];
		file["index"] = i;
	}
}
giau.FileBrowser.prototype.uploadFile = function(file,filename,directory){
	var url = "./";
	filename = filename!==undefined ? filename : "";
	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
		ajax.append('operation','file_upload_file');
		ajax.append('file_directory',directory);
		ajax.append('file_name',filename);
		ajax.append('file',file);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		console.log(obj);
		this.refreshBrowser();
	});
	ajax.send();
}





giau.FileUploadDropArea = function(element){
	this._container = element;
	this._elementUploadDropTarget = Code.newDiv();
	this._allowedMimeTypes = [];
	this._ajaxParameters = [];

	var propertyDataParamKey = "data-parameter-key";
	var propertyDataParamValue = "data-parameter-value";
	var propertyDataMimeType = "data-parameter-accepted-filetype";
	for(i=0; i<Code.numChildren(this._container); ++i){
		var ele = Code.getChild(this._container,i);
		if( Code.hasProperty(ele,propertyDataParamKey) ){
			var key = Code.getProperty(ele,propertyDataParamKey);
			var value = Code.getProperty(ele,propertyDataParamValue);
			this._ajaxParameters.push({"key":key,"value":value});
			Code.removeChild(this._container,ele);
			--i;
		}else if( Code.hasProperty(ele,propertyDataMimeType) ){
			var mime = Code.getProperty(ele,propertyDataMimeType);
			this._allowedMimeTypes.push(mime);
		}
	}

	Code.addChild(this._container,this._elementUploadDropTarget);
	// drop target
		div = this._elementUploadDropTarget;
		// Code.setStyleWidth(div,"100px");
		// Code.setStyleHeight(div,"100px");
		// Code.setStyleBackground(div,"#F00");
		// Code.setStyleDisplay(div,"inline-block");
		// Code.setStyleTextAlign(div,"center")
		// Code.setStyleVerticalAlign(div,"middle")
		// Code.setContent(div,"drag file here to upload");

	// LISTNERS
	this._jsDispatch = new JSDispatch();
	// UPLOAD
	this._jsDispatch.addJSEventListener(this._elementUploadDropTarget, Code.JS_EVENT_DRAG_OVER, this._handleDragOverUploadFxn, this);
	this._jsDispatch.addJSEventListener(this._elementUploadDropTarget, Code.JS_EVENT_DRAG_DROP, this._handleDragDropUploadFxn, this);

	// START AT ROOT
	this._selectedIndex = -1;
	this._path = [];
	this._contents = [];
}
giau.FileUploadDropArea.prototype._handleDragOverUploadFxn = function(e){
	e.stopPropagation();
	e.preventDefault();
}
giau.FileUploadDropArea.prototype._handleDragDropUploadFxn = function(e){
	e.stopPropagation();
	e.preventDefault();
	var fileList = e.dataTransfer.files;
	var i, len = fileList.length;
	for(i=0; i<len; ++i){
		var file = fileList[i];
		var filename = file.name;
		var filetype = file.type;
		if(this.fileTypeAcceptable(filetype)){
			this.uploadFile(file, filename);
			break; // only one
		}
	}
}
giau.FileUploadDropArea.prototype.fileTypeAcceptable = function(type){
	console.log(this._allowedMimeTypes,type);
	if(this._allowedMimeTypes.length==0){
		return true;
	}
	return Code.elementExists(this._allowedMimeTypes,type);
}
giau.FileUploadDropArea.prototype.uploadFile = function(file,filename){
	var url = "./";
	filename = filename!==undefined ? filename : "";
	var ajax = new Ajax();
	ajax.timeout(100*1000);
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	var i;
	for(i=0; i<this._ajaxParameters.length; ++i){
		var key = this._ajaxParameters[i]["key"];
		var value = this._ajaxParameters[i]["value"];
		console.log(key,value);
		ajax.append(key,value);
	}
		ajax.append('file_name',filename);
		ajax.append('file',file);
	ajax.context(this);
	ajax.callback(function(d){
		console.log("returned: ");
		console.log(d);
		var div = this._elementUploadDropTarget;
		var obj = Code.parseJSON(d);
		var oldBG = Code.getStyleBackgroundColor(div);
		var newBG = 0xFF00FF00;
		var duration = 500;
		var deltaTime = 25;
		var steps = Math.ceil(duration/deltaTime);
		var ticker = new Ticker(deltaTime);
		var count = 0;
var oldR = Code.getRedARGB(oldBG) / 255.0;
var oldG = Code.getGrnARGB(oldBG) / 255.0;
var oldB = Code.getBluARGB(oldBG) / 255.0;
var oldA = Code.getAlpARGB(oldBG) / 255.0;
var newR = Code.getRedARGB(newBG) / 255.0;
var newG = Code.getGrnARGB(newBG) / 255.0;
var newB = Code.getBluARGB(newBG) / 255.0;
var newA = Code.getAlpARGB(newBG) / 255.0;
		ticker.addFunction(Ticker.EVENT_TICK,function(){
			if(count<=steps){
				var percent = count/steps;
				var percm1 = 1.0 - percent;
				var red = oldR*percm1 + newR*percent;
				var grn = oldG*percm1 + newG*percent;
				var blu = oldB*percm1 + newB*percent;
				var alp = oldA*percm1 + newA*percent;
				var col = Code.getColARGBFromFloat(alp,red,grn,blu);
				col = Code.getJSColorFromARGB(col);
				Code.setStyleBackgroundColor(div,col);
				++count;
			}else{
				ticker.stop();
			}
		},null);
		ticker.start();
		//this.refreshBrowser();
	});
	ajax.send();
}

// giau.ObjectDesigner Constructor  Composer Layout
giau.ObjectComposer = function(element, model, object){
	this._container = element;
	this._dataModel = {};
	this._dataInstance = {};
	if(model && object){
		this._dataModel = model;
		this._dataInstance = object;
	}else{
		var propertyDataModel = "data-model";
		var propertyDataObject = "data-object";
		

		var i;
		for(i=0; i<Code.numChildren(this._container); ++i){
			var ele = Code.getChild(this._container,i);
			if( Code.hasProperty(ele,propertyDataModel) ){
					var objectString = Code.getContent(ele);
					console.log(objectString)
					var object = Code.parseJSON(objectString);
					this._dataModel = object;
				Code.removeChild(this._container,ele);
				--i;
			}else if( Code.hasProperty(ele,propertyDataObject) ){
					var objectString = Code.getContent(ele);
					var object = Code.parseJSON(objectString);
					this._dataInstance = object;
				Code.removeChild(this._container,ele);
				--i;
			}
		}
	}

	this._jsDispatch = new JSDispatch();
	this._dataNonce = {"reference":"reference"};
	// console.log("model:",this._dataModel);
	// console.log("insta:",this._dataInstance);
	this.initialize();
};
giau.ObjectComposer.prototype.instance = function(i){
	if(i!==undefined){
		this._dataInstance = Code.parseJSON(i);
		this._updateLayout();
	}
	return this._dataInstance;
}
giau.ObjectComposer.prototype.model = function(m){
	if(m!==undefined){
		this._dataModel = Code.parseJSON(m);
		this._updateLayout();
	}
	return this._dataModel;
}
giau.ObjectComposer.prototype._updateLayout = function(){
	// TODO: cleaner way to cleanup / reset
	Code.removeAllChildren(this._container);
	this.initialize();
}

giau.ObjectComposer.prototype._handleSubmitClickFxn = function(e){
	this.prepareObjectForSubmission();
}
giau.ObjectComposer.prototype.initialize = function(){
	var modelObject = this._dataModel;
	var instanceObject = this._dataInstance;
	if(!modelObject){
		return;
	}
	this.fillOutModelFromElement(this._container, modelObject["fields"], instanceObject);
}
giau.ObjectComposer.prototype.prepareObjectForSubmission = function(){ // go thru object and set values from fields
	console.log(this._dataInstance);
	console.log(this._dataModel);
	var jsObject = {};
	this.fillOutObjectFromElements(this._dataInstance,jsObject);
	console.log(jsObject);
}
giau.ObjectComposer.prototype.fillOutObjectFromElements = function(inObject, jsObject, limit){
limit = limit!==undefined ? limit : 3;
--limit;
if(limit==0){
	return;
}
	var isArray = Code.isArray(jsObject);
	var keys = null;
	if(!isArray){
		keys = Code.keys(inObject);
	}
	var i, key, val, input;
	var len = isArray ? jsObject.length : keys.length;
	for(i=0; i<len; ++i){
		key = isArray ? i : keys[i];
		val = inObject[key];
		// console.log("KEY: ",key);
		// console.log("VAL: ",val);
		if(val && val["nonce"] == this._dataNonce){ // primitive
			console.log("PRIMITIVE: ",key);
			input = val["input"];
			value = Code.getInputTextValue(input);
			jsObject[key] = value;
		}else{ // is non-primitive
			if(Code.isArray(val)){ // array
				console.log("ARRAY: ",key);
				value = [];
			}else{ // object
				console.log("OBJECT: ",key);
				value = {};
			}
			jsObject[key] = value;
			this.fillOutObjectFromElements(val, value, limit);
		}
	}
}
giau.ObjectComposer.prototype._handleNewArrayItem = function(e,d){
	var target = Code.getTargetFromEvent(e);
	var model = d["model"];
	var array = d["array"];
	var element = d["element"];
	var field = d["field"];
	var superModel = d["superModel"];
		var type = model["type"];
	var subType = giau.ObjectComposer.fieldTypeArraySubtype(type);
	if(subType=="array"){ // create default array
		array.push([]);
	}else if(subType=="object"){ // create default object
		console.log("new object");
		array.push({});
	}else{ // create default primitive
		console.log("primitive?: "+type+" | "+subType);
		array.push("");
	}

	Code.removeAllChildren(superModel[0]);
	this.fillOutModelFromElement(superModel[0],superModel[1],superModel[2],superModel[3]);
}


giau.ObjectComposer.prototype._handleDeleteArrayItem = function(e,d){
	var model = d["model"];
	var array = d["array"];
	var element = d["element"];
	var field = d["field"];
	var type = model["type"];
	var superModel = d["superModel"];
	
	Code.removeElementAt(array,field);
	Code.removeAllChildren(superModel[0]);

	this.fillOutModelFromElement(superModel[0],superModel[1],superModel[2],superModel[3]);
}

giau.ObjectComposer.prototype.fillOutModelFromElementArray = function(element,modelFieldInfo,array,field, superModel){
	var modelFieldType = modelFieldInfo["type"];
	var modelSubType = giau.ObjectComposer.fieldTypeArraySubtype(modelFieldType);
	//console.log("\t=> array of "+modelSubType);
	if(modelSubType=="array"){ // array of arrays
		var objectModel = modelFieldInfo["fields"];
		for(var i=0; i<array.length; ++i){
			var subElement = this.newSubElement(element,i+": (array)","array", array[i], i, modelFieldInfo, array, superModel);
			this.fillOutModelFromElementArray(subElement,objectModel,array[i], field, superModel);
		}
	}else if(modelSubType=="object"){ // array of objects
		var objectModel = modelFieldInfo["fields"];
		for(var i=0; i<array.length; ++i){
			var subElement = this.newSubElement(element,i+": (object)","object", array[i], i, modelFieldInfo, array, superModel);
			this.fillOutModelFromElement(subElement,objectModel,array[i], false);
		}
	}else{ // array of primitives
		this._fillOutWithPrimitiveType(element,modelFieldInfo, array, null, modelSubType, array, superModel);
	}
	var button = this._interactActionButton("&nbsp;+&nbsp;", element);
	var data = {"model":modelFieldInfo, "array":array, "element":element, "field":field, "superModel": superModel};
	this._jsDispatch.addJSEventListener(button, Code.JS_EVENT_CLICK, this._handleNewArrayItem, this, data);
}

giau.ObjectComposer.prototype.fillOutModelFromElement = function(element,modelObject,instanceObject, newField){
	var superModel = [element, modelObject, instanceObject, newField]; // recall this with exact params
	var modelKeys = Code.keys(modelObject);
	var i, modelFieldName, modelFieldType, modelFieldInfo;
	for(i=0; i<modelKeys.length; ++i){
		modelFieldName = modelKeys[i];
		modelFieldInfo = modelObject[modelFieldName];
		modelFieldType = modelFieldInfo["type"];
		if(modelFieldType){
			var isArray = giau.ObjectComposer.isFieldTypeArray(modelFieldType);
			var subObject = instanceObject[modelFieldName];
			if(isArray){
				if(!subObject){ // create default array
					subObject = [];
					instanceObject[modelFieldName] = subObject;
				}
				var subElement = this.newSubElement(element,"["+modelFieldName+"]","array", instanceObject, modelFieldName, modelFieldInfo);
				this.fillOutModelFromElementArray(subElement, modelFieldInfo, subObject, modelFieldName, superModel, instanceObject);
			}else{
				if(modelFieldType=="object"){
					if(!subObject){ // create default object
						subObject = {};
						instanceObject[modelFieldName] = subObject;
					}
					var object = instanceObject[modelFieldName];
					var subElement = this.newSubElement(element,"{"+modelFieldName+"}","object", instanceObject, modelFieldName, modelFieldInfo);
					this.fillOutModelFromElement(subElement,modelFieldInfo["fields"],object, false);
				}else{ // primitive
					if(subObject==undefined){ // create default primitive
						subObject = "";
						instanceObject[modelFieldName] = subObject;
					}
					this._fillOutWithPrimitiveType(element, modelObject,instanceObject, modelFieldName,modelFieldType, false);
				}
			}
		}
	}
}

giau.ObjectComposer.prototype.newSubElement = function(element,name,type, container, field, model,  isReallyArray, superModel){
	var div = this.defaultInputRowObject(element);
	var label = null;
	var holder = null;
	if(type=="array"){
		label = this.defaultInputRowLabelObject(div,""+name, model);
		label = div;
		holder = element;
	}else if(type=="object"){
		label = this.defaultInputRowLabelObject(div,""+name, model);
		label = div;
		holder = element;
	}else if(type=="primitive"){
		var value = container[field];
		var fieldType = model[field]["type"];
		var fieldValue = container[field];
		if(giau.ObjectComposer.isFieldTypeBoolean(fieldType)){
			var input = this._inputBooleanField(div,field, value, container, model);
			holder = element;
		}else if(giau.ObjectComposer.isFieldTypeColor(fieldType)){
			var input = this._inputColorField(div,field, value, container, model);
			holder = element;
		}else if(giau.ObjectComposer.isFieldTypeDate(fieldType)){
			var input = this._inputDateField(div,field, value, container, model);
			holder = element;
		}else if(giau.ObjectComposer.isFieldTypeDuration(fieldType)){
			var input = this._inputDurationField(div,field, value, container, model);
			holder = element;
		}else{
			var criteria = {};
//criteria[giau.InputFieldText.CRITERIA_MAX_CHARACTERS] = 9;
// giau.InputFieldText.EVENT_CHANGE = "giau.InputFieldText.EVENT_CHANGE";
// giau.InputFieldText.CRITERIA_MAX_CHARACTERS = "max_characters";
// giau.InputFieldText.CRITERIA_FIELD_TYPE = "type";
// giau.InputFieldText.CRITERIA_FIELD_VALUE_SINT = "signed_integer";
// giau.InputFieldText.CRITERIA_FIELD_VALUE_NUM = "number";
// giau.InputFieldText.CRITERIA_FIELD_VALUE_UINT = "unsigned_integer";
			if(giau.ObjectComposer.isFieldTypeNumber(fieldType)){
				criteria[giau.InputFieldText.CRITERIA_FIELD_VALUE_NUM] = true;
			}
			var input = this._inputTextField(div,field, value, container, model);
			holder = element;
if(isReallyArray){
label = div;
}

		}
	}

	if(label && holder && isReallyArray){
		var button = this._interactActionButton("&nbsp;-&nbsp;");
			Code.addChild(label,button);
		var data = {"model":model, "array":isReallyArray, "element":holder, "field":field, "superModel":superModel};
		this._jsDispatch.addJSEventListener(button, Code.JS_EVENT_CLICK, this._handleDeleteArrayItem, this, data);
	}
	return div;
}

// (element,modelFieldInfo, array,                null, modelSubType, array, superModel
// element, modelObject,instanceObject, modelFieldName,modelFieldType, isArray
giau.ObjectComposer.prototype._fillOutWithPrimitiveType = function(element, modelObject,instanceObject, modelFieldName,modelFieldType, isArray, superModel){
	var found = false;
	if( giau.ObjectComposer.isFieldTypeString(modelFieldType) ){
		found = true;
	}else if( giau.ObjectComposer.isFieldTypeBoolean(modelFieldType) ){
		found = true;
	}else if( giau.ObjectComposer.isFieldTypeNumber(modelFieldType) ){
		found = true;
	}else if( giau.ObjectComposer.isFieldTypeColor(modelFieldType) ){
		found = true;
	}else if( giau.ObjectComposer.isFieldTypeDate(modelFieldType) ){
		found = true;
	}
	if(found && instanceObject){
		var primitive = null;
		if(isArray){
			//console.log("is array");
			var i, len = instanceObject.length;
			for(i=0;i<len;++i){
				primitive = instanceObject[i];
				// TODO: THIS IS HACKY
				// passing fake model because newSubElement expects the subtype inside the model
				var subType = giau.ObjectComposer.fieldTypeArraySubtype(modelFieldType);
				var tempModel = {};
				tempModel[i] = {"type":subType};
				//var subElement = this.newSubElement(element,null,"primitive", instanceObject,i, modelObject, instanceObject, superModel);
				var subElement = this.newSubElement(element,null,"primitive", instanceObject,i, tempModel, instanceObject, superModel);
			}
		}else{
			primitive = instanceObject[modelFieldName];
			var subElement = this.newSubElement(element,null,"primitive", instanceObject,modelFieldName, modelObject);
		}
	}
}

giau.ObjectComposer.regexArrayPrefix = new RegExp('^array-','i');
giau.ObjectComposer.regexStringPrefix = new RegExp('^string-','i');

giau.ObjectComposer.isFieldTypeBoolean = function(s){ // boolean or string-boolean
	var isBoolean = s=="boolean" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="boolean";
	return isBoolean;
}
giau.ObjectComposer.isFieldTypeNumber = function(s){ // number or string-number
	var isBoolean = s=="number" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="number";
	return isBoolean;
}
giau.ObjectComposer.isFieldTypeDate = function(s){ // number or string-number
	var isBoolean = s=="date" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="date";
	return isBoolean;
}
giau.ObjectComposer.isFieldTypeColor = function(s){ // number or string-color
	var isBoolean = s=="color" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="color";
	return isBoolean;
}
giau.ObjectComposer.isFieldTypeDuration = function(s){ // number or string-duration
	var isBoolean = s=="duration" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="duration";
	return isBoolean;
}
giau.ObjectComposer.isFieldTypeString = function(s){ // string or string-SUBTYPE
	var regexStringPrefix = new RegExp('^string-','i');
	var isString = s=="string" || s.match(regexStringPrefix);
	return isString;
}
giau.ObjectComposer.fieldTypeStringSubtype = function(s){
	var regexStringPrefix = new RegExp('^string-','i');
	var stringSubType = s.replace(regexStringPrefix,"");
	return stringSubType;
}
giau.ObjectComposer.isFieldTypeArray = function(s){ // array-SUBTYPE
	var regexArrayPrefix = new RegExp('^array-','i');
	var isArray = s.match(regexArrayPrefix);
	return isArray;
}
giau.ObjectComposer.fieldTypeArraySubtype = function(s){

	var regexArrayPrefix = new RegExp('^array-','i');
	var arraySubType = s.replace(regexArrayPrefix,"");
	return arraySubType;
}


giau.ObjectComposer.prototype._handlePrimitiveTextUpdate = function(e,d){
	// console.log("_handlePrimitiveUpdate");
	// var element = d["element"];
	// var container = d["container"];
	// var field = d["field"];
	// var model = d["model"];
	// var inputElement = d["input"];
	// var value = Code.getInputTextValue(inputElement);
	// container[field] = value; // update data object
	// console.log(this._dataInstance);
	console.log("_handlePrimitiveTextUpdate");
	this._handlePrimitiveUpdateAny(d);
}


giau.ObjectComposer.prototype._handlePrimitiveDateUpdate = function(e,f){
	console.log("_handlePrimitiveColorUpdate");
	this._handlePrimitiveUpdateAny(e);
}

giau.ObjectComposer.prototype._handlePrimitiveColorUpdate = function(e,f){
	console.log("_handlePrimitiveColorUpdate");
	this._handlePrimitiveUpdateAny(e, function(value){
		return Code.getHexColorARGB(value);
	});
}

giau.ObjectComposer.prototype._handlePrimitiveBooleanUpdate = function(e,f){
	console.log("_handlePrimitiveBooleanUpdate");
	this._handlePrimitiveUpdateAny(e);
}

giau.ObjectComposer.prototype._handlePrimitiveTextUpdate = function(e,f){
	console.log("_handlePrimitiveTextUpdate");
	this._handlePrimitiveUpdateAny(e);
}

giau.ObjectComposer.prototype._handlePrimitiveUpdateAny = function(e, fxn){
	var control = e["control"];
	var object = e["object"];
	var key = e["key"];
	var value = e["value"]; // beginning old value
	var newValue = null;
	console.log(control)
	if(false){ // e["isElement"] ){//!Code.isObject(control) ){ // text field has no object
		var input = control;
		newValue = Code.getInputTextValue(input);
	}else{
		newValue = control.value();
	}
	if(fxn){
		newValue = fxn(newValue);
	}
	object[key] = newValue;
	console.log("NEW VALUE: "+newValue);
	console.log(object);
}


giau.ObjectComposer.prototype._inputDurationField = function(element, key,value, container, model){
	var input = Code.newDiv();
		Code.setStyleBackgroundColor(input,"#F00");
		Code.setStyleDisplay(input,"inline-block");
	var jsObject = new giau.InputFieldDurationModal(input,value);
	var data = {"object":container, "key":key, "value":value, "control":jsObject};
	jsObject.addFunction(giau.InputFieldCompositeModal.EVENT_CHANGE, this._handlePrimitiveDurationUpdate, this, data);
	var content = this._inputField(element,input, key, model);
	return {"container":content, "input":input};
}


giau.ObjectComposer.prototype._inputDateField = function(element, key,value, container, model){
	var input = Code.newDiv();
		// Code.setStyleWidth(input,200+"px");
		// Code.setStyleHeight(input,120+"px");
		//Code.setStyleHeight(input,100+"%");
		Code.setStyleBackgroundColor(input,"#F00");
		Code.setStyleDisplay(input,"inline-block");
		//var jsObject = new giau.InputFieldDate(input,value);
var jsObject = new giau.InputFieldDateModal(input,value);
			var data = {"object":container, "key":key, "value":value, "control":jsObject};
jsObject.addFunction(giau.InputFieldCompositeModal.EVENT_CHANGE, this._handlePrimitiveDateUpdate, this, data);
			//jsObject.addFunction(giau.InputFieldDate.EVENT_CHANGE, this._handlePrimitiveDateUpdate, this, data);
	var content = this._inputField(element,input, key, model);
	return {"container":content, "input":input};
}

giau.ObjectComposer.prototype._inputColorField = function(element, key,value, container, model){
	var input = Code.newDiv();
		Code.setStyleBackgroundColor(input,"#F00");
		Code.setStyleDisplay(input,"inline-block");
// var jsObject = new giau.InputFieldColor(input,value);
var jsObject = new giau.InputFieldColorModal(input,value);
			var data = {"object":container, "key":key, "value":value, "control":jsObject};
//jsObject.addFunction(giau.InputFieldColor.EVENT_CHANGE, this._handlePrimitiveColorUpdate, this, data);
jsObject.addFunction(giau.InputFieldCompositeModal.EVENT_CHANGE, this._handlePrimitiveColorUpdate, this, data);
	var content = this._inputField(element,input, key, model);
	return {"container":content, "input":input};
}

giau.ObjectComposer.prototype._inputTextField = function(element, key,value, container, model, criteria){
	var input = Code.newDiv();
		Code.setStyleWidth(input,100+"%");
		Code.setStyleMarginRight(input,0+"px");
		Code.setStyleBackgroundColor(input,giau.Theme.Color.MediumRed);
		Code.setStyleDisplay(input,"table-cell");
// HERE
		var jsObject = new giau.InputFieldTextModal(input,value, criteria, function(element){
			Code.setStyleColor(element,"#FFF");
			//Code.setStyleDisplay(element,"inline");
			Code.setStyleVerticalAlign(element,"middle");
			Code.setStyleVerticalAlign( Code.getParent(element) ,"middle");
		});
			var data = {"object":container, "key":key, "value":value, "control":jsObject};
			jsObject.addFunction(giau.InputFieldCompositeModal.EVENT_CHANGE, this._handlePrimitiveTextUpdate, this, data);
	var content = this._inputField(element,input, key, model);
	return {"container":content, "input":input};
}

giau.ObjectComposer.prototype._inputBooleanField = function(element, key,value, container, model){
	// MAPPING?
	var input = Code.newDiv();
		// Code.setStyleWidth(input,100+"px");
		// Code.setStyleHeight(input,20+"px");
		Code.setStyleBackgroundColor(input,"#F00");
		Code.setStyleDisplay(input,"table-cell");
		Code.setStyleMarginRight(input,0+"px");
		var jsObject = new giau.InputFieldBoolean(input,value);
			var data = {"object":container, "key":key, "value":value, "control":jsObject};
			jsObject.addFunction(giau.InputFieldBoolean.EVENT_CHANGE, this._handlePrimitiveBooleanUpdate, this, data);
	var content = this._inputField(element,input, key);
	return {"container":content, "input":input};
}



// giau.ObjectComposer.prototype._inputSelectField = function(element, key,value, container){
// 	// MAPPING?
// 	var input = Code.newDiv();
// 		// Code.setStyleWidth(input,100+"px");
// 		// Code.setStyleHeight(input,20+"px");
// 		Code.setStyleBackgroundColor(input,"#0F0");
// 		Code.setStyleDisplay(input,"inline-block");
// var options = [{"value":"val0", "display":"value 0"},
// 	{"value":"val1", "display":"value 1"},
// 	{"value":"val2", "display":"value 2"},
// ];
// var optionSelectedIndex = 2;
// 		var jsObject = new giau.InputFieldDiscrete(input,options,optionSelectedIndex);
// 			//var data = {"object":container, "key":key, "value":value, "control":jsObject};
// 			//jsObject.addFunction(giau.InputFieldBoolean.EVENT_CHANGE, this._handlePrimitiveBooleanUpdate, this, data);
// 	var content = this._inputField(element,input, key);
// 	return {"container":content, "input":input};
// }


//giau.InputFieldTags
//giau.InputFieldDiscrete

giau.ObjectComposer.prototype._inputField = function(element,input, key, model){
	var radius = 4;
	var content = Code.newDiv();
	var label = this.defaultInputRowLabelPrimitive(element, ""+key, model ? model[key] : undefined);
	Code.addChild(content,label);
	Code.addChild(content,input);
	Code.addChild(element,content);
	return content;
}
giau.ObjectComposer.prototype.defaultInputRowObject = function(element){
	var color = 0x11110000;
		color = Code.getJSColorFromARGB(color);
	var div = Code.newDiv();
	Code.setStylePaddingTop(div,"2px");
	Code.setStylePaddingBottom(div,"2px");
	Code.setStylePaddingRight(div,"1px");
	Code.setStylePaddingLeft(div,25+"px");
		//Code.setStylePadding(div,"2px");
	Code.setStyleBackgroundColor(div,color);
	if(element){
		Code.addChild(element,div);
	}
	var radius = 6;
		Code.setStyleBorderRadius(div,radius+"px");
	return div;
}
giau.ObjectComposer.prototype.defaultInputRowLabel = function(element, title, model){
	var bgColor = giau.Theme.Color.MediumRed;
	div = Code.newDiv();
	Code.setStylePaddingTop(div,"4px");
	Code.setStylePaddingBottom(div,"4px");
	Code.setStylePaddingRight(div,"4px");
	Code.setStylePaddingLeft(div,"4px");
	Code.setStyleBackgroundColor(div,bgColor);
		Code.setStyleBorder(div,"solid");
		Code.setStyleBorderWidth(div,1+"px");
		Code.setStyleBorderColor(div,giau.Theme.Color.LightRed);
	//Code.setStyleDisplay(div,"inline-block");
	Code.setStyleDisplay(div,"table-cell");
	Code.setStyleColor(div,"#FFF");
	Code.setStyleFontSize(div,12+"px");

	Code.setStyleVerticalAlign(div,"top");

	var description = model && model["description"] ? model["description"] : "";
	var datum =  {"description":description};
	this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_MOUSE_DOWN, giau.ObjectComposer.alertHelpInfoField, datum);

	if(element){
		Code.addChild(element,div);
	}
	if(title){
		Code.setContent(div, title)
	}
	return div;
}
giau.ObjectComposer.alertHelpInfoField = function(e){
	if(!Code.getMouseLeftClick(e)){
		return;
	}
	var description = this["description"];
	var overlay = new giau.InputOverlay();
	var div = Code.newDiv();
		Code.setContent(div,description);
		Code.setStyleBackgroundColor(div,"#FFF");
		Code.setStyleWidth(div,300+"px");
		Code.setStyleHeight(div,200+"px");
	overlay.setContent(div);
	overlay.centerContent();
	overlay.show();
}
giau.ObjectComposer.prototype.defaultInputRowLabelObject = function(element, title, model){
	var radius = 2;
	var div = this.defaultInputRowLabel(element, title, model);
		Code.setStyleBorderRadius(div,radius+"px");
	return div;
}
giau.ObjectComposer.prototype.defaultInputRowLabelPrimitive = function(element, title, model){
	var radius = 4;
	var div = this.defaultInputRowLabel(element, title, model);
		Code.setStyleBorderRadius(div,radius+"px "+0+"px "+0+"px "+radius+"px");
	return div;
}
giau.ObjectComposer.prototype._interactActionButton = function(display, element){
	var radius = 3;
	var button = Code.newInputButton(display);"" // NEW ARRAY OBJECT
		Code.setStylePadding(button,3+"px");
		Code.setStyleColor(button,"#FFF");
		Code.setStyleBorderRadius(button,radius+"px");
		Code.setStyleBorder(button,"solid");
		Code.setStyleBorderWidth(button,1+"px");
		Code.setStyleBorderColor(button,giau.Theme.Color.LightRed);
		Code.setStyleBackgroundColor(button,giau.Theme.Color.MediumRed);
		Code.setStyleDisplay(button,"inline-block");
		Code.setStyleVerticalAlign(button,"top");
	if(element){
		Code.addChild(element, button);
	}
	return button;
}





giau.LibraryScroller = function(element, name, url, params){
	console.log("LibraryScroller");
	url = url !== undefined ? url : "./";
	params = params !== undefined ? params : {};
	this._scrollBarSize = Code.getScrollBarSize();
	this._itemsPerPage = 20;

	this._jsDispatch = new JSDispatch();

	this._container = element;
	name = name !== undefined ? name : "library_scroller";
	
	this._displayHeight = 500;
	this._displayWidth = 150;

	var containerBG = 0xFFBBBBCC;
	var scrollerBG = 0xFF0000FF;
	var contentBG = 0xFFDDDDEE;

	containerBG = Code.getJSColorFromARGB(containerBG);
	scrollerBG = Code.getJSColorFromARGB(scrollerBG);
	contentBG = Code.getJSColorFromARGB(contentBG);

	this._elementScroller = Code.newDiv();
	this._elementContents = Code.newDiv();

	Code.addChild(this._container,this._elementScroller);
		Code.addChild(this._elementScroller,this._elementContents);

	var radiusContainer = 4;

	Code.setStyleDisplay(this._container,"inline-block");
	Code.setStyleTextAlign(this._container,"left");
	Code.setStyleBorderRadius(this._container,radiusContainer+"px");
	Code.setStyleBackgroundColor(this._container,containerBG);
	Code.setStyleWidth(this._container,this._displayWidth+"px");
	Code.setStyleHeight(this._container,this._displayHeight+"px");
	var paddingInterriorLeft = 5;
	var paddingInterriorRight = 5;
	var paddingInterriorTop = 5;
	var paddingInterriorBottom = 5;
	var scrollerWidth = this._displayWidth - paddingInterriorLeft - paddingInterriorRight;
	var scrollerHeight = this._displayHeight - paddingInterriorTop - paddingInterriorBottom;

	Code.setStylePosition(this._container,"relative");

	//  scroller
	Code.setStyleBackgroundColor(this._elementScroller,scrollerBG);
	Code.setStylePosition(this._elementScroller,"relative");
	Code.setStyleDisplay(this._elementScroller,"block");
	Code.setStyleLeft(this._elementScroller,paddingInterriorLeft+"px");
	Code.setStyleTop(this._elementScroller,paddingInterriorTop+"px");
	Code.setStyleWidth(this._elementScroller,scrollerWidth+"px");
	Code.setStyleHeight(this._elementScroller,scrollerHeight+"px");
	//Code.setStyleOverflow(this._elementScroller,"hidden");
	Code.setStyleOverflowX(this._elementScroller,"hidden");
	Code.setStyleOverflowY(this._elementScroller,"scroll");
	Code.setStyleMargin(this._elementScroller,"0px");

	Code.addStyle(this._elementScroller,"scrollbar-face-color","#FF0000");
	Code.addStyle(this._elementScroller,"scrollbar-shadow-color","#FF0000");
	Code.addStyle(this._elementScroller,"scrollbar-highlight-color","#FF0000");
	Code.addStyle(this._elementScroller,"scrollbar-arrow-color","#FF0000");
	// scrollbar-face-color: #367CD2;
 //    scrollbar-shadow-color: #FFFFFF;
 //    scrollbar-highlight-color: #FFFFFF;
 //    scrollbar-3dlight-color: #FFFFFF;
 //    scrollbar-darkshadow-color: #FFFFFF;
 //    scrollbar-track-color: #FFFFFF;
 //    scrollbar-arrow-color: #FFFFFF;
	Code.setStyleWidth(this._elementContents,"100%");
	Code.setStyleBackgroundColor(this._elementContents,contentBG);


	this._getSizeFxn = giau.LibraryScroller._generateSize;
	this._createElementFxn = giau.LibraryScroller._generateDiv;


	var i;
	// fill out parameters from elements
	
	var propertyDataParamKey = "data-key";
	var propertyDataParamValue = "data-value";
	var propertyDataName = "data-name";
	var propertyDataDisplayTitle = "data-display-title";
	var propertyDataDisplaySubtitle = "data-display-subtitle";
	var propertyDataDisplayImage = "data-display-image";
	var propertyDataDisplayValue = "data-display-value";

	if(Code.hasProperty(this._container,propertyDataName)){
		name = Code.getProperty(this._container, propertyDataName);
		Code.removeProperty(this._container, propertyDataName);
	}
	for(i=0; i<Code.numChildren(this._container); ++i){ 
		var child = Code.getChild(this._container,i);
		if(Code.hasProperty(child,propertyDataParamKey)){
			var key = Code.getProperty(child, propertyDataParamKey);
			var value = Code.getProperty(child, propertyDataParamValue);
			params[key] = value;
			Code.removeChild(this._container, child);
			--i;
		}
	}
	this._name = name;
	this._dataSource = new giau.DataSource(url,this._itemsPerPage, params);
	this._dataSource.addFunction(giau.DataSource.EVENT_PAGE_DATA, this._updateWithData, this);
	this._dataSource.getPage(0);
}
giau.LibraryScroller._generateSize = function(info, data){
	var size = {};
	var width = info["width"];
	var height = Math.floor(0.6*width);
	size["width"] = width;
	size["height"] = height;
	return size;
}

giau.LibraryScroller._generateDiv = function(info, data){//, displayData){
	var bus = giau.MessageBus();
	this._messageBus = bus;
	// display data from metadata
		var meta = this._metaData;
		var displayFields = meta["display_fields"];
		var i, j;
		var displayData = [];
		var row = data;
		for(j=0; j<displayFields.length; ++j){
			var field = displayFields[j];
			var name = field["name"];
			var value = row[name];
			displayData.push(value);
		}
	var dataIndex = info["index"];
	var dataA = displayData.length>0 ? displayData[0] : "";
	var dataB = displayData.length>1 ? displayData[1] : "";
	var dataC = displayData.length>2 ? displayData[2] : "";
	// 

	var color;
	var index = info["index"];
	var width = info["width"];
	var height = info["height"];
	var x = info["x"];
	var y = info["y"];
	var div = Code.newDiv();
	Code.setStyleWidth(div,width+"px");
	Code.setStyleHeight(div,height+"px");
	Code.setStylePosition(div,"absolute");
	Code.setStyleDisplay(div,"block");
	Code.setStyleLeft(div,x+"px");
	Code.setStyleTop(div,y+"px");
	//Code.setStylePadding(div,"2px");
	// 	color = 0xFF330011;
	// 	color = Code.getJSColorFromARGB(color);
	// Code.setStyleBackgroundColor(div,color);

	var radiusContainer = 4;
	var exterriorPadding = 4;
	var exterriorWidth = (width-2*exterriorPadding);
	var exterriorHeight = (height-2*exterriorPadding);
	var elementExterrior = Code.newDiv();
	Code.setStyleBorderRadius(elementExterrior,radiusContainer+"px");
	Code.setStyleWidth(elementExterrior,exterriorWidth+"px");
	Code.setStyleHeight(elementExterrior,exterriorHeight+"px");
	Code.setStylePosition(elementExterrior,"absolute");
	Code.setStyleDisplay(elementExterrior,"block");
	Code.setStyleLeft(elementExterrior,exterriorPadding+"px");
	Code.setStyleTop(elementExterrior,exterriorPadding+"px");
		color = giau.Theme.Color.MediumRed;
	Code.setStyleBackgroundColor(elementExterrior,color);

	Code.setStyleOverflow(elementExterrior,"hidden");


	var radiusContainer = 4;
	var interriorPadding = 4;
	var interriorWidth = (exterriorWidth-2*interriorPadding);
	var interriorHeight = (exterriorHeight-2*interriorPadding);
	
	var elementInterrior = Code.newDiv();
	Code.setStyleBorderRadius(elementInterrior,radiusContainer+"px");
	Code.setStyleWidth(elementInterrior,interriorWidth+"px");
	Code.setStyleHeight(elementInterrior,interriorHeight+"px");
	Code.setStylePosition(elementInterrior,"absolute");
	Code.setStyleDisplay(elementInterrior,"block");
	Code.setStyleLeft(elementInterrior,interriorPadding+"px");
	Code.setStyleTop(elementInterrior,interriorPadding+"px");
		
	
	var elementID = Code.newDiv();
		Code.setContent(elementID,"#"+(dataIndex+1));
		Code.setStyleFontSize(elementID,"10px");
		Code.setStyleColor(elementID,"#DBB");
		Code.setStyleMarginTop(elementID,-4+"px");
		Code.setStyleMarginBottom(elementID,-4+"px");
	var elementName = Code.newDiv();
		Code.setContent(elementName,dataA);
		Code.setStyleFontSize(elementName,"12px");
		Code.setStyleColor(elementName,"#FFF");
	var elementModified = Code.newDiv();
		Code.setContent(elementModified,dataB);
		Code.setStyleFontSize(elementModified,"9px");
		Code.setStyleColor(elementModified,"#C99");
	

	Code.addChild(div,elementExterrior);
		Code.addChild(elementExterrior,elementInterrior);
			Code.addChild(elementInterrior,elementID);
			Code.addChild(elementInterrior,elementName);
			Code.addChild(elementInterrior,elementModified);

	return div;
}
giau.LibraryScroller.prototype._updateLayout = function(){
	console.log("LibraryScroller - _updateLayout");
	var widthContainer = $(this._elementScroller).width();
	var heightContainer = $(this._elementScroller).height();
	widthContainer -= this._scrollBarSize;
	//var divSizeY = 60;
	var divSpacingY = 0;

	// derived vars
	var data = this._dataRows;
	var i, j;
	var offsetY = 0;
	var info;
	for(i=0; i<data.length; ++i){
		var row = data[i];
		info = {
			"index":i,
			"width":widthContainer,
			"height":heightContainer,
		};
		var size = this._getSizeFxn(info, row);
		var elementWidth = size["width"];
		var elementHeight = size["height"];
		info = {
			"index":i,
			"width":elementWidth,
			"height":elementHeight,
			"x":0,
			"y":offsetY,
		};
		var div = this._createElementFxn(info, row);//, displayData);
		Code.addChild(this._elementScroller,div);
		offsetY += elementHeight;
		if(i<data.length-1){
			offsetY += divSpacingY;
		}
		var meta = this._metaData;
		var indexField = meta["index_field"];
		var displayFields = meta["display_fields"];
		var dataFields = meta["data_fields"];
		var datum = {};
		var object = {};
		var internal = {};
		datum["element"] = div;
		//datum["source"] = row;
		//datum["display"] = row[displayData["title"]];
		datum["value"] = object;
			indexValue = row[indexField];
			object[indexValue] = internal;
			var fieldKeys = Code.keys(dataFields);
			//for(j=0; j<dataFields.length; ++j){
			for(j=0; j<fieldKeys.length; ++j){
				var field = fieldKeys[j];
				var index = dataFields[field];
				var value = row[field];
				internal[index] = value;
			}
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_MOUSE_DOWN, this._handleElementMouseDownFxn, this, datum);
	}
	Code.setStyleHeight(this._elementContents,offsetY+"px");
}

giau.LibraryScroller.prototype._handleElementMouseDownFxn = function(e,data){
	var target = Code.getTargetFromEvent(e);
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var targetX = $(target).offset().left;
		var targetY = $(target).offset().top;
		var offsetX = e.offsetX;
		var offsetY = e.offsetY;
		var offX = Math.round(offsetX);//targetX - mouseX;
		var offY = Math.round(offsetY);//targetY - mouseY;
	var element = data["element"];
	var div = element.cloneNode(true);
	var off = new V2D(offX,offY);
	var bus = this._messageBus;
	var datum = {};
		datum["display"] = data["display"];
		datum["value"] = data["value"];
		datum["element"] = data["element"]; // ???
	//var criteria = {"type":"section_id"};
		var criteria = {"name":this._name};
	var obj = {"element":div, "offset":off, "data":datum, "criteria":criteria};
	bus.alertAll(giau.MessageBus.EVENT_OBJECT_DRAG_START, obj);
}

giau.LibraryScroller.prototype._updateWithData = function(data){
	var offset = data["offset"];
	var count = data["count"];
	var rows = data["data"];
	var total = data["total"];
	var metadata = data["metadata"];
	this._metaData = metadata;
	this._dataRows = rows;
	this._updateLayout();
}
giau.LibraryScroller.prototype._scrollTo = function(){
	//
}



giau.PagingDisplay = function(element, currentPage, totalPages, pagingFxn){ // pages in [0...total-1]
	Code.constructorClass(giau.PagingDisplay, this);
	this._pagingGetParam = "p";
	this._container = element;
		Code.setStyleTextAlign(this._container,"center");
	this._currentPage = 0;
	this._totalPages = 0;
	this._pagingDisplayFxn = giau.PagingDisplay._defaultPagingDisplay;
	this._pagingDisplayCtx = null;
	this.pagingDisplayFunction(pagingFxn);
		if(true){ // set from get param
			currentPage = Code.getURLParameter(Code.getURL(),this._pagingGetParam);
			if(currentPage){
				currentPage = parseInt(currentPage);
			}else{
				currentPage = 0;
			}
		}
	this.set(currentPage, totalPages);
};
Code.inheritClass(giau.PagingDisplay, Dispatchable);
giau.PagingDisplay.EVENT_REQUEST_PAGE_URL = "PagingDisplay.EVENT_REQUEST_PAGE_URL";
giau.PagingDisplay._defaultPagingDisplay = function(datum){
	var page = datum["page"];
	var currentPage = datum["pageCurrent"];
	var pagesTotal = datum["pagesTotal"];
	var url = "";
	if(currentPage!=page){
		//url = pageURL+"&"+getParamKeyPage+"="+page;
		url = Code.setURLParameter(Code.getURL(),this._pagingGetParam,page);
	}
	return {"url":url, "display":(""+(page+1))};
}
giau.PagingDisplay.prototype.updateFunction = function(datum){
	if(this._pagingDisplayFxn){
		if(this._pagingDisplayCtx){
			return this._pagingDisplayFxn.call(ctx,datum)
		}else{
			return this._pagingDisplayFxn();
		}
	}
}
giau.PagingDisplay.prototype._updateLayout = function(){
	Code.removeAllChildren(this._container);
	if(this._totalPages==0){ return; }
	var i, len, lm1, div;
	len = this._totalPages;
	lm1 = len-1;
	var maxPagesToLimit = 20;
	var limitBefore = 5;
	var limitAfter = 5;
	var limitBegin = 3;
	var limitEnd = 3;
	var shownEllipsesBefore = false;
	var shownEllipsesAfter = false;
var pageLinkColor = 0xFFCC0033;
	pageLinkColor = Code.getJSColorFromARGB(pageLinkColor);
var pageNoneColor = 0xFF776677;
	pageNoneColor = Code.getJSColorFromARGB(pageNoneColor);
//this._currentPage = 8;
//this._currentPage = 14;
//this._currentPage = 5;
// prev
div = Code.newDiv("<");
Code.setStyleColor(div,pageNoneColor);
Code.setStyleDisplay(div,"inline-block");
Code.addChild(this._container,div);
giau.PagingDisplay._addSpacer(this._container);
	for(i=0; i<len; ++i){
		var datum = this._callPagingDisplay({"pagesTotal":this._totalPages, "page":i, "pageCurrent":this._currentPage});
		var display = datum["display"];
		var url = datum["url"];
		var shouldShowPage = true;
		if(this._totalPages >= maxPagesToLimit){
			shouldShowPage = false;
			if( i<limitBegin && i<=(this._currentPage+limitAfter) ){ // left (+mid)
				shouldShowPage = true;
			}
			if( i>(this._totalPages-limitEnd-1) && i>=(this._currentPage-limitBefore) ){ // right (+mid)
				shouldShowPage = true;
			}
			if( i>=(this._currentPage-limitBefore) && i<=(this._currentPage+limitAfter) ){ // middle
				shouldShowPage = true;
			}
			if(i>=limitBegin && i<(this._currentPage-limitBefore) && !shownEllipsesBefore){ // ellipses before
				shownEllipsesBefore = true;
				div = Code.newDiv();
				Code.setContent(div, "...");
				Code.setStyleDisplay(div,"inline-block");
				Code.addChild(this._container,div);
				giau.PagingDisplay._addSpacer(this._container);
			}
			if(i>(this._currentPage+limitAfter) && i<=(this._totalPages-limitEnd-1) && !shownEllipsesAfter){ // ellipses after
				shownEllipsesAfter = true;
				div = Code.newDiv();
				Code.setContent(div, "...");
				Code.setStyleDisplay(div,"inline-block");
				Code.addChild(this._container,div);
				giau.PagingDisplay._addSpacer(this._container);
			}
		}
		if(shouldShowPage){
			if(url && url!==""){
				div = Code.newAnchor(url, display);
				Code.setStyleColor(div,pageLinkColor);
			}else{
				div = Code.newDiv(display);
				Code.setStyleColor(div,pageNoneColor);
			}
			Code.setStyleDisplay(div,"inline-block");
			Code.addChild(this._container,div);
			if(i<lm1){
				giau.PagingDisplay._addSpacer(this._container);
			}
		}
	}
	// next
	giau.PagingDisplay._addSpacer(this._container);
	div = Code.newDiv(">");
	Code.setStyleColor(div,pageNoneColor);
	Code.setStyleDisplay(div,"inline-block");
	Code.addChild(this._container,div);
};
giau.PagingDisplay._addSpacer = function(container){
	var spacer = Code.newDiv();
	Code.setStyleWidth(spacer,5+"px");
	Code.setStyleDisplay(spacer,"inline-block");
	Code.addChild(container,spacer);
	return spacer;
}
giau.PagingDisplay.prototype.set = function(currentPage, totalPages){
	this.currentPage(currentPage);
	this.totalPages(totalPages);
	this._updateLayout();
};
giau.PagingDisplay.prototype.currentPage = function(p){
	if(p!==undefined){
		this._currentPage = p;
		this._updateLayout();
	}
	return this._currentPage;
};
giau.PagingDisplay.prototype.totalPages = function(p){
	if(p!==undefined){
		this._totalPages = p;
		this._updateLayout();
	}
	return this._totalPages;
};
giau.PagingDisplay.prototype.pagingDisplayFunction = function(p, c){
	if(p!==undefined){
		this._pagingDisplayFxn = p;
	}
	if(c!==undefined){
		this._pagingDisplayCtx = c;
	}
	return this._pagingDisplayFxn;
};
giau.PagingDisplay.prototype._callPagingDisplay = function(datum){
	var page = datum["page"];
	var isCurrentPage = datum["pageCurrent"];
	var pagesTotal = datum["pagesTotal"];
	if(this._pagingDisplayFxn){
		if(this._pagingDisplayCtx){
			return this._pagingDisplayFxn.call(ctx,datum)
		}else{
			return this._pagingDisplayFxn(datum);
		}
	}else{
		return {"url":"", "display":(""+page)};
	}
}


giau.DataSource = function(url, itemsPerPage, params){
	giau.DataSource._.constructor.call(this);
	this._arrayWindow = [];
	this._url = (url!==undefined && url!==null) ? url : "./";
	this._urlParams = params;
	this._itemsPerPage = itemsPerPage;
	this._currentPageIndex = 0;
}
Code.inheritClass(giau.DataSource, Dispatchable);

giau.DataSource.EVENT_PAGE_DATA = "EVENT_PAGE_DATA";
giau.DataSource.prototype.getPage = function(pageToGet){
	this._currentPage = pageToGet;
	var start = this._currentPage * this._itemsPerPage;
	var end = start + this._itemsPerPage;
	var count = this._itemsPerPage;//end-start;

	var table = this._dataTable;
	var url = this._url;

	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	ajax.append(this._urlParams);
	ajax.append("operation","page_data");
	ajax.append("offset",""+start);
	ajax.append("count",""+count);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		this.alertAll(giau.DataSource.EVENT_PAGE_DATA,obj);
	});
	ajax.send();

}


// repository alter update  amend  revise modify
// single access
giau.DataCRUD = function(url, defaultParams, callbackFxn, callbackCtx){
	giau.DataSource._.constructor.call(this);
	this._url = (url!==undefined && url!==null) ? url : "./";
	this._defaultParams = (defaultParams!==undefined && defaultParams!==null) ? defaultParams : {};
}
Code.inheritClass(giau.DataCRUD, Dispatchable);

giau.DataCRUD.EVENT_CREATE = "EVENT_DATA_CRUD_CREATE";
giau.DataCRUD.EVENT_READ = "EVENT_DATA_CRUD_READ";
giau.DataCRUD.EVENT_UPDATE = "EVENT_DATA_CRUD_UPDATE";
giau.DataCRUD.EVENT_DELETE = "EVENT_DATA_CRUD_DELETE";

giau.DataCRUD.prototype.create = function(data, returnData){
	this._asyncOperation("create", data, returnData, giau.DataCRUD.EVENT_CREATE);
}
giau.DataCRUD.prototype.read = function(data, returnData){
	this._asyncOperation("read", data, returnData, giau.DataCRUD.EVENT_READ);
}
giau.DataCRUD.prototype.update = function(data, returnData){
	console.log("SEND AN UPDATE");
	this._asyncOperation("update", data, returnData, giau.DataCRUD.EVENT_UPDATE);
}
giau.DataCRUD.prototype.remove = function(data, returnData){
	this._asyncOperation("delete", data, returnData, giau.DataCRUD.EVENT_DELETE);
}
// //function giau_update_section($sectionID, $widgetID, $sectionConfig, $sectionList){
giau.DataCRUD.prototype._asyncOperation = function(lifecycle, data, returnData, alertEventName){
	var url = this._url;

	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	ajax.append(this._defaultParams);
	ajax.append("lifecycle",lifecycle);
	ajax.append("data",data);
	ajax.context(this);
	ajax.callback(function(d){
		var obj = Code.parseJSON(d);
		if(obj["data"]){
			obj = obj["data"];
		}
		this.alertAll(alertEventName, {"source":returnData, "data":obj});
	});
	ajax.send();
}





giau.CRUD = function(element){
	var propertyDataTableName = "data-table-name";
	var valueTableName = Code.getProperty(element,propertyDataTableName);
	console.log("CRUD TABLE NAME: "+valueTableName);
	this._itemsPerPage = 20;
	// simulate got data:
/*
	section
	languagization
	bio
	calendar
	page
	widget
*/
	//var dataTableName = "section";
	var dataTableName = valueTableName;

	/*
	var model = {
		"fields": {
			"text": {
				"type": "string"
			},
			"number": {
				"type": "string-number"
			},
			"boolean": {
				"type": "string-boolean"
			},
			"array-strings": {
				"type": "array-string"
			},
			"array-strings": {
				"type": "array-string"
			},
			"object": {
				"type": "object",
				"fields": {
					"fieldA": {
						"type":"string"
					},
					"fieldB": {
						"type":"string"
					}
				}
			},
			
			
			"array-arrayX": {
				"type": "array-array",
				"fields": {
					"type" : "array-object",
					"fields": {
						"parameterA": {
							"type": "string"
						}
					}
				}
			},
			
			"objectA": {
				"type": "object",
				"fields": {
					"objectB": {
						"type" : "object",
						"fields": {
							"parameterA": {
								"type": "string"
							}
						}
					}
				}
			},
			
		}
	};
	var object = {
		
		"text": "_TEXT_VALUE_",
		"number": "3.141",
		"boolean": "true",
		"array-strings": ["A","B","C"],
		"object": {
			"fieldA": "_FIELD_A_VALUE_",
			"fieldB": "_FIELD_B_VALUE_",
		},
		"array-arrayX": [
			[
				{
					"parameterA":"_VALUE_A_",
				},
				{
					"parameterA":"_VALUE_B_",
				},
			],
			[
				{
					"parameterA":"_VALUE_C_",
				},
			]
		],
		"objectA": {
			"objectB": {
				"parameterA": "valueA",
			},
		},
		
	};
	var composer = new giau.ObjectComposer(element, model, object);
	Code.setStyleBackgroundColor(element,"#FFFFFF");

return;
*/


	this._container = element;
	this._jsDispatch = new JSDispatch();
	this._elementContainer = Code.newDiv();
	this._elementPagingTop = Code.newDiv();
	this._elementPagingBottom = Code.newDiv();
	this._elementTools = Code.newDiv();
	this._elementOrdering = Code.newDiv();
	this._elementTable = Code.newDiv();
	Code.addChild(this._container,this._elementContainer);
		
		Code.addChild(this._elementContainer,this._elementPagingTop);
//		Code.addChild(this._elementContainer,this._elementOrdering);
		Code.addChild(this._elementContainer,this._elementTools);
		Code.addChild(this._elementContainer,this._elementTable);
		Code.addChild(this._elementContainer,this._elementPagingBottom);

	// PAGING
	Code.setStyleDisplay(this._elementPagingTop, "block");
	Code.setStyleMinHeight(this._elementPagingTop, 25+"px");
	Code.setStyleDisplay(this._elementPagingBottom, "block");
	Code.setStyleMinHeight(this._elementPagingBottom, 25+"px");
	this._pagingTop = new giau.PagingDisplay(this._elementPagingTop, 0,0);
	this._pagingBottom = new giau.PagingDisplay(this._elementPagingBottom, 0,0);

	// CONTAINER
	Code.setStyleWidth(this._elementContainer,"100%");
	Code.setStyleHeight(this._elementContainer,"100%");
	// Code.setStyleMinHeight(this._elementTable,500+"px");
	// Code.setStyleMaxHeight(this._elementTable,800+"px");
	// Code.setStylePosition(this._elementTable,"relative");
	Code.setStyleDisplay(this._elementContainer,"inline-block");
	//Code.setStyleBackgroundColor(this._elementContainer,"#00F");

	// TOOLS
	Code.setStyleWidth(this._elementTools,"100%");
	//Code.setStyleMinHeight(this._elementTools,50+"px");
	Code.setStyleDisplay(this._elementTools,"inline-block");
	//Code.setStyleBackgroundColor(this._elementTools,"#F0F");
	var div;
	div = this._buttonInput("&plus;", this._elementTools);
		// div = Code.newDiv();
		// Code.setContent(div,"[&plus;]");
		// Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_FINGER);
		// Code.addChild(this._elementTools,div);
		var ctx = {"element":div};
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_CLICK, this._handleCreateFxn, this, ctx);	

	// ORDERING
	Code.setStyleWidth(this._elementOrdering,"100%");
	Code.setStyleMinHeight(this._elementOrdering,50+"px");
	Code.setStyleDisplay(this._elementOrdering,"inline-block");
	Code.setStyleBackgroundColor(this._elementOrdering,"#F00");
	
	// TABLE
		Code.setStyleBorderRadius(this._elementTable,5+"px");
	//Code.setStyleWidth(this._elementTable,500+"px");
	Code.setStyleWidth(this._elementTable,"100%");
	Code.setStyleMinHeight(this._elementTable,100+"px");
	Code.setStylePosition(this._elementTable,"relative");
	Code.setStyleDisplay(this._elementTable,"inline-block");
	Code.setStyleBackgroundColor(this._elementTable,giau.Theme.Color.backgroundLight);
	
	this._dataSource = new giau.DataSource("./",this._itemsPerPage, {"table":dataTableName} );
	this._dataSource.addFunction(giau.DataSource.EVENT_PAGE_DATA, this._updateWithData, this);
	this._dataSource.getPage(this._pagingTop.currentPage());
	// table listing
	this._dataCRUD = new giau.DataCRUD("./", {"operation":"crud_data", "table":dataTableName} );
	// row CRUD
	this._dataCRUD.addFunction(giau.DataCRUD.EVENT_CREATE, this._handleCreateCompleteFxn, this);
	this._dataCRUD.addFunction(giau.DataCRUD.EVENT_READ, this._handleReloadCompleteFxn, this);
	this._dataCRUD.addFunction(giau.DataCRUD.EVENT_UPDATE, this._handleUpdateCompleteFxn, this);
	this._dataCRUD.addFunction(giau.DataCRUD.EVENT_DELETE, this._handleDeleteCompleteFxn, this);
}

giau.CRUD.prototype._buttonInput = function(display,element){
	var div;
		div = Code.newDiv();
			var d = Code.newDiv();
			Code.setContent(d,display);
			Code.setStyleDisplay(d,"inline-block");
			Code.setStyleFontSize(d, 12+"px");
			Code.setStyleColor(d, giau.Theme.Color.TextOnDark);
				Code.setStyleLineHeight(d, "12px");
			//Code.setStyleDisplay(d,"table-cell");
			// Code.setStyleWidth(d, "100%");
			// Code.setStyleHeight(d, "100%");
			//Code.setStyleLineHeight(d, "100%");
			Code.addChild(div,d);
		Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_FINGER);
		//Code.setStyleDisplay(div,"inline-block");
		Code.setStyleDisplay(div,"table-cell");
		Code.setStyleBackgroundColor(div, giau.Theme.Color.MediumRed);
		// Code.setStyleColor(div, giau.Theme.Color.TextOnDark);
		// Code.setStylePaddingLeft(div, 6+"px");
		// Code.setStylePaddingRight(div, 6+"px");
		// Code.setStylePaddingTop(div, 3+"px");
		// Code.setStylePaddingBottom(div, 3+"px");
		//Code.setStyleFontBold(div);
		//Code.setStyleFontSize(div, 12+"px");
		Code.setStyleBorderColor(div,giau.Theme.Color.LightRed);
		Code.setStyleBorder(div,"solid");
		Code.setStyleBorderWidth(div,1+"px");
		Code.setStyleBorderRadius(div, 4+"px");
		Code.setStyleMargin(div, 2+"px");
		Code.setStyleWidth(div, 24+"px");
		Code.setStyleHeight(div, 24+"px");
		Code.setStyleTextAlign(div, "center");
		Code.setStyleVerticalAlign(div, "middle");
		if(element){
			Code.addChild(element,div);
		}
	return div;
}

giau.CRUD.prototype._handleCreateFxn = function(e,data){
	console.log("CREATE");
	console.log(data);

	var view = this._dataView;
	var dataInfo = view["data"];
	var dataFields = dataInfo["fields"];
	var dataFieldKeys = Code.keys(dataFields);
	var i;
	// create a default object using default fields
	var defaultObject = {};
	for(i=0; i<dataFieldKeys.length; ++i){
		var index = dataFieldKeys[i];
		var field = dataFields[index];
		var attr = field["attributes"];
		var pres = field["presentation"];
		var defaultValue = attr["default"];
		defaultObject[index] = defaultValue;
	}
	// request an insert into table
	console.log(defaultObject);
	var jsonString = Code.StringFromJSON(defaultObject);
	var passBack = {};
	this._dataCRUD.create(jsonString, passBack);
}
giau.CRUD.prototype._handleReloadFxn = function(e,data){
	console.log("CRUD - READ");
	console.log(data);
	// get primary key index value
	var passBack = {};
		passBack["index"] = data["index"];
		passBack["value"] = data["value"];
	// request get with primary key
	var jsonData = {};
var textIndex = data["index"];
var textModal = data["value"];
var textValue = textModal.value();
console.log(textIndex);
console.log(textValue);
	jsonData[ textIndex ] = textValue;

	var jsonString = Code.StringFromJSON(jsonData);
	console.log("jsonString: "+jsonString);
	this._dataCRUD.read(jsonString, passBack);
}
giau.CRUD.prototype._handleUpdateFxn = function(e,data){
	console.log("UPDATE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		var dataInfo = this._dataView["data"];
		var dataFields = dataInfo["fields"];
	var criteriaIndex = data["index"];
	var criteriaValue = data["value"];

	if( Code.isObjectOrInstance(criteriaValue)){
		criteriaValue = criteriaValue.value();
	}
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
	if(rowData){
		var row = rowData["row"];
		var updateData = {};
		for(var i=0; i<row.length; ++i){
			var mapping = row[i];
			var index = mapping.field();
			var field = dataFields[index];
			//console.log(field)
			var attr = field["attributes"];
			var pres = field["presentation"];
			if(attr["editable"]==="true" || attr["primary_key"]==="true"){
				if(pres && pres["json_model_column"]){ // json configuration
					var json = mapping.value().instance();
					var str = Code.StringFromJSON(json);
					updateData[index] = str;
				}else{
					var mappingValue = mapping.value();
					var value = null;
					if( Code.isObjectOrInstance(mappingValue) ){
						value = mappingValue.value();
					}else{
						value = mappingValue;
					}
					updateData[index] = value+""; // cast to string


				}
			}
		}
console.log("+++++++++");
console.log(updateData);
console.log("---------");
		// pass editable values to server
		var jsonData = updateData;
		var jsonString = Code.StringFromJSON(jsonData);
console.log(jsonString);
		// get row data back
		var passBack = {};
			passBack["index"] = data["index"];
			passBack["value"] = data["value"];
		this._dataCRUD.update(jsonString, passBack);
	}
}
giau.CRUD.prototype._handleDeleteFxn = function(e,data){
	console.log("DELETE");
	var keyIndex = data["index"];
	var keyValue = data["value"];
		keyValue = keyValue.value(); // value stored inside json object
	var passBack = {};
		passBack["index"] = keyIndex;
		passBack["value"] = keyValue;
	var jsonData = {};
	jsonData[ keyIndex ] = keyValue;
	var jsonString = Code.StringFromJSON(jsonData);
	var name = keyIndex+" : "+keyValue;
	var alertDelete = confirm("are you sure you want to delete\n"+name+" ?");
	if(alertDelete){
		this._dataCRUD.remove(jsonString, passBack);
	}
}

giau.CRUD.prototype._handleCreateCompleteFxn = function(e,d){
	console.log("CREATE COMPLETE");
	var source = e["source"];
	var data = e["data"];
	if(data && Code.isArray(data) && data.length>0){
		data = data[0];
	}
	// get back new row
	var row = data;
	//
	var view = this._dataView;
	var fields = view["data"]["fields"];
	var editFields = view["data"]["edit_fields"];
	var rows = view["rows"];
	var viewRow = [];
	var j;
	for(j=0; j<editFields.length; ++j){
		var field = editFields[j];
		var column = field["column"];
		var alias = field["alias"];
		//console.log(field,column,alias);
		var mapping = this._mappingFromData(field,row,alias);
		if(mapping.value){
			console.log(mapping.value().value());
		}
		if(mapping){
			viewRow.push(mapping);
		}
	}
	// add row to top of table 
	rows.unshift(viewRow);
	// update display
	this._updateLayout();
}
giau.CRUD.prototype._handleReloadCompleteFxn = function(e){
	console.log("READ COMPLETE");

	var original = e["source"];
	var criteriaIndex = original["index"];
	var criteriaValue = original["value"];
	if(Code.isObjectOrInstance(criteriaValue)){
		criteriaValue = criteriaValue.value();
	}
	var sourceData = e["data"];
		if(Code.isArray(sourceData)){
			sourceData = sourceData[0]; //assuming single returned read object
		}
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
// LOCAL
var dataInfo = this._dataView["data"];
var dataFields = dataInfo["fields"];
	if(rowData && sourceData){
		var row = rowData["row"];
		// UPDATE VALUES / CONTAINERS
		for(var i=0; i<row.length; ++i){
			// REPLACE WITH NEW:
			var mapping = row[i];
			var field = mapping.field();
			var sourceValue = sourceData[field];
			if(mapping!==null){
				var jsObject = mapping.value();
				localField = dataFields[field];
				var attr = localField["attributes"];
				var pres = localField["presentation"];
				if(Code.isObjectOrInstance(jsObject)){
					if(pres && pres["json_model_column"]){ // json configuration
						var colJSON = pres["json_model_column"];
						var modl = sourceData[colJSON];
						var inst = sourceValue;
						jsObject.model(modl);
						jsObject.instance(inst);
					}else{
						jsObject.value(sourceValue);
					}
				}else{
					var action = {"action":"update","data":{"value":sourceValue}};
					mapping.updateDataFromAction(action);
				}
				mapping.updateElementFromData();
			}
		}

	}
	this._updateLayout();

}
giau.CRUD.prototype._handleUpdateCompleteFxn = function(e){
	console.log("UPDATE COMPLETE");
	this._handleReloadCompleteFxn(e);
}

giau.CRUD.prototype._handleDeleteCompleteFxn = function(e){
	console.log("DELETE COMPLETE");
	var original = e["source"];
	var criteriaIndex = original["index"];
	var criteriaValue = original["value"];
	console.log(original);
	console.log(criteriaIndex);
	console.log(criteriaValue);
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
	console.log(rowData);
	if(rowData){
		this._dataRowRemoveAt(rowData["index"]);
	}
	this._updateLayout();
}

giau.CRUD.prototype._dataRowRemoveAt = function(rowIndex){
	Code.removeElementAt(this._dataView["rows"], rowIndex);
}
giau.CRUD.prototype._dataRowFromKeyValue = function(criteriaIndex, criteriaValue){
	var i, j;
	var data = this._dataView;
	var rows = data["rows"];
	for(i=0; i<rows.length; ++i){
		var row = rows[i];
		for(j=0; j<row.length; ++j){
			var mapping = row[j];
			var index = mapping.field();
			if(index===criteriaIndex){
				var value = mapping.value(); // json object container
				if(Code.isObjectOrInstance(value)){
					value = value.value();
				}
				if(value===criteriaValue){
					return {"index":i, "row":row};
				}
			}
		}
	}
	return null;
}

giau.CRUD.prototype._updateWithData = function(data){
console.log("giau.CRUD.prototype._updateWithData");
	var offset = data["offset"];
	var count = data["count"];
	var rows = data["data"];
	var total = data["total"];
	var definition = data["definition"];
	var columns = definition["columns"];
	var presentation = definition["presentation"];
	var columnPresentations = presentation["columns"];
	var metadata = data["metadata"];
	var pagesTotal = total>0 ? Math.ceil(total/this._itemsPerPage) : 0;
	var pageCurrent = Math.floor( offset/this._itemsPerPage);
	this._pagingTop.set(pageCurrent, pagesTotal);
	this._pagingBottom.set(pageCurrent, pagesTotal);

	view = {};
	view["data"] = data;
	view["rows"] = [];
	this._dataView = view;

	var i, column, pres, alias, row, keys;

	// PUT ALL DATA INTO SINGLE STRUCTURE
	var searchFields = [];
	var editFields = [];
	var lookupFields = {};
	var aliases = presentation["column_aliases"];
	keys = Code.keys(aliases);
	for(i=0; i<keys.length; ++i){
		key = keys[i];
		alias = aliases[key];
		if(alias){
			//console.log(key,alias);
			column = columns[alias];
			if(column){
				//console.log(column);
				var attributes = column["attributes"];
				if(attributes){
					pres = columnPresentations[alias];
					//
					var info = {};
					info["column"] = alias;
					info["alias"] = key;
					info["definition"] = column;
					info["attributes"] = attributes;
					info["presentation"] = pres;
					info["metadata"] = metadata;
					editFields.push(info);
					lookupFields[key] = info;
					var sortable = attributes["sort"];
					if(sortable && sortable=="true"){
						searchFields.push(info);
					}
				}
			}
		}
	}
	// sort field 'columns'
	editFields.sort(function(a,b){
		var attrA = a["attributes"];
			var orderA = attrA["order"];
				orderA = parseInt(orderA);
		var attrB = b["attributes"];
			var orderB = attrB["order"];
				orderB = parseInt(orderB);
		return orderA>orderB ? 1 : -1;
	});
	// console.log(editFields);
	view["data"]["metadata"] = metadata;
	view["data"]["fields"] = lookupFields;
	view["data"]["edit_fields"] = editFields;
	this._searchFields = searchFields;
	this._rowElements = [];
	// 
	for(i=0; i<rows.length; ++i){
		var row = rows[i];
		var viewRow = [];
		view["rows"].push(viewRow);
		for(j=0; j<editFields.length; ++j){
			var field = editFields[j];
			var column = field["column"];
			var alias = field["alias"];
			var mapping = this._mappingFromData(field,row,alias);
			if(mapping){
				viewRow.push(mapping);
			}
		}
	}
	this._updateLayout();
}
giau.CRUD.prototype._updateLayout = function(){
	console.log(this._dataView);
	var searchFields = this._searchFields;
	var i, j;
	
	Code.removeAllChildren(this._elementOrdering);
	for(i=0; i<searchFields.length; ++i){
		var field = searchFields[i];
			var attributes = field["attributes"];
		var name = attributes["display_name"];
		var div = Code.newDiv();
		Code.setContent(div,""+name+"&DownArrowBar;"); // &darr; &dArr; &#8681; &#10507; &DownArrowBar;
		Code.setStyleDisplay(div,"table-cell");
		Code.setStyleColor(div,"#000");
		Code.addChild(this._elementOrdering,div);
	}

	Code.removeAllChildren(this._elementTable);
	var view = this._dataView;
	var rows = view["rows"];
	var data = view["data"];
	var fields = data["fields"];
	//var i, dataCount = data.length;
	for(i=0; i<rows.length; ++i){
		var row = rows[i];
		var elementRow = Code.newDiv();
			Code.setStyleBackgroundColor(elementRow,"#FFF");
			Code.setStyleMargin(elementRow,5+"px");
		Code.addChild(this._elementTable,elementRow);
		var primaryKeyIndex = null;
		var primaryKeyValue = null;
		for(j=0; j<row.length; ++j){
			var mapping = row[j];
			Code.addChild(elementRow,mapping.element());
			var fieldKey = mapping.field();
			var fieldValue = mapping.object()[fieldKey];
			var field = fields[fieldKey];
			if(field){
				var attr = field["attributes"];
				if(attr){
					var primary = attr["primary_key"];
					if(primary==="true"){
						primaryKeyIndex = fieldKey;
						primaryKeyValue = fieldValue;
					}
				}
			}
		}
		// CONTEXT
		if(primaryKeyIndex!==null && primaryKeyValue!==null){
			var dataContext = {};
			dataContext["index"] = primaryKeyIndex;
			dataContext["value"] = primaryKeyValue;
			// DELETE
			var elementDelete = this._buttonInput("&times;", elementRow);
			//Code.setStyleFloat(elementDelete,"right");
				this._jsDispatch.addJSEventListener(elementDelete, Code.JS_EVENT_CLICK, this._handleDeleteFxn, this, dataContext);
			// UPDATE
			var elementUpdate = this._buttonInput("&uArr;", elementRow);
				this._jsDispatch.addJSEventListener(elementUpdate, Code.JS_EVENT_CLICK, this._handleUpdateFxn, this, dataContext);
			// RESET ???
				// re-get the data?
			var elementReset = this._buttonInput("&#10227;", elementRow);
				this._jsDispatch.addJSEventListener(elementReset, Code.JS_EVENT_CLICK, this._handleReloadFxn, this, dataContext);
		}
	}

	return;

	var FA = new FragArray();
	console.log(FA);
	console.log(FA.toString());
	//FA.addElements( [0,1,2,3,4], 0, 4 );
	console.log(FA.toString());
	FA.addElements( [6,7], 6, 7 );
	console.log(FA.toString());
	FA.addElements( [8,9], 8, 9 );
	console.log(FA.toString());
	FA.addElements( [12,13,14,15,16,17], 12, 17 );
//	FA.addElements( [7,8,9], 7, 9 );
	console.log(FA.toString());
	FA.addElements( [0,1,2,3,4], 0, 4 );

	//FA.addElements( [4,5,6], 6, 7 );

	console.log(FA.toString());
}

giau.CRUD._elementSelectColor = function(mapping){
	var elementContainer = Code.newDiv();
	return elementContainer;
}

giau.CRUD._elementSelectDuration = function(mapping){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];

	var elementContainer = Code.newDiv();
	var jsObject = new giau.InputFieldDurationModal(elementContainer, value);
	mapping.value(jsObject);
	mapping.updateElementFxn(giau.CRUD._fieldEditDurationUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditDurationUpdateDataFxn);

	return elementContainer;
}

giau.CRUD._elementSelectStringArray = function(mapping){
		var object = mapping.object();
	var field = mapping.field();
	var value = object[field];

	var container = Code.newDiv();
	var jsObject = new giau.InputFieldTags(container, value);
	mapping.value(jsObject);
	mapping.updateElementFxn(giau.CRUD._fieldEditStringArrayElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditStringArrayUpdateDataFxn);

	return container;
}

giau.CRUD._elementSelectOption = function(mapping, table){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field]; // == mapping.value()

	var elementContainer = Code.newDiv();
	
	var options = [];
	var option, row, val, disp, i;
	var optionIndex = null;
	for(i=0; i<table.length; ++i){
		row = table[i];
		val = row["value"];
		disp = row["display"];
		option = {};
		option["display"] = disp;
		option["value"] = val;
		var isDefault = row["default"] ? true : false;
		option["default"] = isDefault;
		if(isDefault && optionIndex===null){
			optionIndex = i;
		}
		if(val==value){
			optionIndex = i;
		}
		options.push(option);
	}
	var jsObject = new giau.InputFieldDiscrete(elementContainer, options, optionIndex);
	mapping.value(jsObject);
	mapping.updateElementFxn(giau.CRUD._fieldEditOptionUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditOptionUpdateDataFxn);

	return elementContainer;
}



// giau.CRUD._fieldEditDateUpdateElementFxn = function(mapping){
// 	console.log("_fieldEditDateUpdateElementFxn");
// 	var data = mapping.object();
// 	var field = mapping.field();
// 	var element = mapping.element();
// }

// giau.CRUD._fieldEditDateUpdateDataFxn = function(mapping, action){
// 	console.log("_fieldEditDateUpdateDataFxn");
// 	var data = mapping.object();
// 	var field = mapping.field();
// 	var element = mapping.element();
// }


giau.CRUD._elementSelectDate = function(mapping){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];
	var elementContainer = Code.newDiv();
	var jsObject = new giau.InputFieldDateModal(elementContainer, value);
	mapping.value(jsObject);
	mapping.updateElementFxn(giau.CRUD._fieldEditDateUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditDateUpdateDataFxn);
	return elementContainer;
}

giau.CRUD._elementSelectString = function(mapping){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];

	var container = Code.newDiv();
		Code.setStyleWidth(container,"100%");
		Code.setStyleHeight(container,50+"px");
		var backgroundColor = giau.Theme.Color.MediumRed;
		var borderColor = giau.Theme.Color.DarkRed;
		//Code.setStylePaddingLeft(container,2+"px");
		// Code.setStyleDisplay(container,"inline-block");
		Code.setStyleBorderWidth(container,1+"px");
		Code.setStyleBorderColor(container,borderColor);
		Code.setStyleBorder(container,"solid");
		// Code.setStyleFontSize(container,12+"px");
		Code.setStyleBackgroundColor(container,backgroundColor);
		Code.setStyleBorderRadius(container,2+"px");
		//Code.setStyleBackgroundColor(container,"#00F");
	var jsObject = new giau.InputFieldTextModal(container, value, null, function style(e){

		Code.setStyleColor(e,giau.Theme.Color.TextOnDark);
	});

	mapping.value(jsObject);
	mapping.updateElementFxn(giau.CRUD._fieldEditStringUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditStringUpdateDataFxn);
	return container;
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------- DRAG N DROP
giau.InputFieldDragAndDrop = function(element, bus, value, table, dd){
	Code.constructorClass(giau.InputFieldDragAndDrop, this);
	this._bus = bus;
	this._lookupTable = table;
	this._ddInfo = dd;
	this._value = value;
	this._bus.addFunction(giau.MessageBus.EVENT_OBJECT_DRAG_SELECT, this._handleDragSelectFxn, this);

	this._container = element;
	Code.setStyleBackgroundColor(this._container,"#EEE");
		Code.setStyleBorderColor(this._container,"#CCC");
		Code.setStyleBorder(this._container,"solid");
		Code.setStyleBorderWidth(this._container,1+"px");
		Code.setStyleMinHeight(this._container,24+"px");
		Code.setStylePadding(this._container,2+"px");
		Code.setStyleBorderRadius(this._container,4+"px");
	Code.setProperty(this._container,"data-value","true");

	this.value(value);
}
Code.inheritClass(giau.InputFieldDragAndDrop, Dispatchable);


giau.InputFieldDragAndDrop.prototype._handleDragSelectFxn = function(e){ // e is passed by self, f is passed by alert
	var myCriteria = this._ddInfo;
		var mySource = myCriteria["source"];
			var myName = mySource["name"];
	var criteria = e["criteria"];
	if(criteria){
		var name = criteria["name"];
		if(name===myName){
			var bus = this._bus;
			var element = this._container;
				var lef = $(element).offset().left;
				var top = $(element).offset().top;
				var wid = $(element).outerWidth();
				var hei = $(element).outerHeight();
			var rect = new Rect(lef,top, wid,hei);
			var obj = {"rect": rect, "fxn": this._handleDragLifecycleFxn, "ctx": this};
			bus.alertAll(giau.MessageBus.EVENT_OBJECT_DRAG_AVAILABLE, obj);
		}
	}
}
giau.InputFieldDragAndDrop.prototype.value = function(v){
	if(v!==undefined){
		this._value = v;
		this._updateLayout();
	}
	return this._value;
}

giau.InputFieldDragAndDrop.prototype._handleDragLifecycleFxn = function(event, data){
	if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_START){
		// 
	}else if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_STOP){
		// 
	}else if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_DROP){
		var source = this._lookupTable;
		var value = this._value;
		var array = Code.arrayFromCommaSeparatedString(value);

		// MAX COUNT
		var maxCount = null;
		var replaceOnAdd = false;
		var dndInfo = this._ddInfo;
		if(dndInfo){
			var sourceInfo = dndInfo["source"];
			var infoMaxCount = sourceInfo["max_count"];
			if(infoMaxCount!==null){
				maxCount = parseInt(infoMaxCount);
			}
			var infoReplace = sourceInfo["replace_on_add"];
			if(infoReplace && infoReplace==="true"){
				replaceOnAdd = true;
			}
		}
		// if(maxCount!==null && maxCount!==undefined && maxCount>=array.length){
		// 	return;
		// }
		var i, key, val;
		var dataObject = data["value"];
		var keys = Code.keys(dataObject);
		for(i=0; i<keys.length; ++i){
			key = keys[i];
			val = dataObject[key];
			array.push(key);
			source.push(val); // should replace if already exists
		}
		if(maxCount!==null && array.length>maxCount){
			if(replaceOnAdd){ // should remove out source too if no longer need that index
				array.shift();
			}
		}
		value = Code.stringFromCommaSeparatedArray(array);
		this.value(value);
	}
}

giau.InputFieldDragAndDrop.prototype._updateLayout = function(){
	var value = this._value;
	var element = this._container;
	var ele = Code.getElementsWithFunction(element, function(e){
			return Code.hasProperty(e,"data-value");
		}, true);
	ele = ele.length > 0 ? ele[0] : null;
	if(ele!==null && value!==null){
		var array = Code.arrayFromCommaSeparatedString(value);
		var elements = this.generateBoxDivsFromArray(array);
		Code.removeAllChildren(ele);
		for(var i=0; i<elements.length; ++i){
			Code.addChild(ele,elements[i]);
		}
	}
}

giau.InputFieldDragAndDrop.prototype._boxActionHandle = function(event){
	// N/A
}
giau.InputFieldDragAndDrop.prototype._boxActionClose = function(e){
	var self = this["context"];
	var index = this["index"];
	var array = Code.arrayFromCommaSeparatedString(self._value);

	// MIN COUNT
	var minCount = null;
	var dndInfo = self._ddInfo;
	if(dndInfo){
		var sourceInfo = dndInfo["source"];
		var infoMinCount = sourceInfo["min_count"];
		if(infoMinCount!==null){
			minCount = parseInt(infoMinCount);
		}
	}
	if(minCount!==null && minCount!==undefined && minCount<=array.length){
		return;
	}

	Code.removeElementAt(array,index);
	var value = Code.stringFromCommaSeparatedArray(array);
	self.value(value);
}


giau.InputFieldDragAndDrop.prototype.generateBoxDivsFromArray = function(array){
	if(!array){
		return [];
	}
	var dd = this._ddInfo;
	var indexMatch = dd["metadata"]["match_index"];
	var indexDisplay = dd["metadata"]["display_index"];
		indexDisplay = indexDisplay ? indexDisplay : indexMatch;
	var source = this._lookupTable;
	var handleFxn = this._boxActionHandle;
	var closeFxn = this._boxActionClose;
	var i, j, value, displayValue, len = array.length;
	var elements = [];
	for(i=0; i<len; ++i){
		value = array[i];
		displayValue = value;
		if(indexMatch){
			for(j=0; j<source.length; ++j){
				src = source[j];
				if(src && src[indexMatch]==value){
					displayValue = src[indexDisplay];
					if(displayValue == ""){ // default to index if visual not existing
						displayValue = "("+value+")";
					}
					break;
				}
			}
		}
		var obj = {"index":i, "context":this};
		elements.push( giau.CRUD.generateBoxDiv(displayValue, obj, handleFxn, closeFxn) );
	}
	return elements;
}


giau.CRUD._elementSelectDiscrete = function(mapping, table, dd){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];
	var elementContainer = Code.newDiv();

	var bus = giau.MessageBus();
	var jsObject = new giau.InputFieldDragAndDrop(elementContainer, bus, value, table, dd);
	mapping.value(jsObject);

	return elementContainer;
}

giau.CRUD._fieldEditBoolean = function(definition, container, fieldName, elementContainer, mapping){ // NOT USED YET NOT USED YET NOT USED YET NOT USED YET NOT USED YET NOT USED YET 
	var elementText = giau.CRUD._elementSelectBoolean(mapping);
		Code.addChild(elementContainer,elementText);
}

giau.CRUD._fieldEditDate = function(definition, container, fieldName, elementContainer, mapping){
	var elementText = giau.CRUD._elementSelectDate(mapping);
	Code.addChild(elementContainer,elementText);
}

giau.CRUD._fieldEditColor = function(definition, container, fieldName, elementContainer, mapping){
	var elementText = giau.CRUD._elementSelectColor(mapping);
		Code.addChild(elementContainer,elementText);
}


giau.CRUD._fieldEditDuration = function(definition, container, fieldName, elementContainer, mapping){
	var elementText = giau.CRUD._elementSelectDuration(mapping);
		Code.addChild(elementContainer,elementText);
}


giau.CRUD._fieldEditStringArray = function(definition, container, fieldName, elementContainer, mapping){
	var presentation = definition["presentation"];
	var metadata = definition["metadata"];
	var value = container[fieldName];
	if(presentation && presentation["drag_and_drop"]){ // DRAG AND DROP
			var dd = presentation["drag_and_drop"];
			var table = null;
			if(dd["metadata"]){
				var index_name = dd["metadata"]["source"];
				table = metadata[index_name];
			}
		// update mapping
		//mapping.updateElementFxn(giau.CRUD._fieldEditCommaSeparatedStringUpdateElementFxn);
		//mapping.updateDataFxn(giau.CRUD._fieldEditCommaSeparatedStringUpdateDataFxn);
		var elementDrop = giau.CRUD._elementSelectDiscrete(mapping, table, dd);
		Code.addChild(elementContainer,elementDrop);

	}else{ // regular tags
		var elementText = giau.CRUD._elementSelectStringArray(mapping);
		Code.addChild(elementContainer,elementText);
	}
}

giau.CRUD._fieldEditOption = function(definition, container, fieldName, elementContainer, mapping){
	var presentation = definition["presentation"];
	var metadata = definition["metadata"];
	var value = container[fieldName];
	var table = presentation ? presentation["options"] : [];
	var elementText = giau.CRUD._elementSelectOption(mapping, table);
	Code.addChild(elementContainer,elementText);
}


// -------------------------------------------------------------------------------- MAPPING STRING
giau.CRUD._fieldEditString = function(definition, container, fieldName, elementContainer, mapping){
	var presentation = definition["presentation"];
	var metadata = definition["metadata"];
	var value = container[fieldName];
	if(false){
		// ?
	}else{ // TEXTFIELD
		mapping.updateElementFxn(giau.CRUD._fieldEditStringPrimitiveUpdateElementFxn);
		mapping.updateDataFxn(giau.CRUD._fieldEditStringPrimitiveUpdateDataFxn);
		var elementText = giau.CRUD._elementSelectString(mapping,value);
		Code.addChild(elementContainer,elementText);
		var data = {"mapping":mapping};
		giau.CRUD._jsDispatch.addJSEventListener(mapping.element(), Code.JS_EVENT_INPUT_CHANGE, giau.CRUD._handleInputStringDidChange, null, data);
	}
}
giau.CRUD._handleInputStringDidChange = function(e, data){
	console.log(e)
	console.log(data)
	var mapping = data["mapping"];
	var element = mapping.element();
	element = Code.getElementsWithFunction(element, function(e){
			return Code.getElementTag(e)=="textarea";
		}, true)[0];
	console.log(element)
	var value = Code.getInputTextValue(element);
	data = {"action":"update", "data":{"value":value}};
	mapping.updateDataFromAction(data);
}

giau.CRUD._fieldEditStringPrimitiveUpdateDataFxn = function(mapping, action){
	console.log("UPDATE STRING ELEMENT");
	var operation = action["action"];
	var data = action["data"];
	var value = data["value"];
	if(operation=="update"){
		mapping.value(value);
	}
}
giau.CRUD._fieldEditStringPrimitiveUpdateElementFxn = function(mapping){
	console.log("UPDATE ELEMENT");
	var value = mapping.value();
	var element = mapping.element();
	element = Code.getElementsWithFunction(element, function(e){
			return Code.getElementTag(e)=="textarea";
		}, true)[0];
	Code.setInputTextValue(element, value);
}

// -------------------------------------------------------------------------------- MAPPING JSON
giau.CRUD._fieldEditJSON = function(definition, container, fieldName, elementContainer, mapping){
	// update mapping
	mapping.updateElementFxn(giau.CRUD._fieldEditJSONUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditJSONUpdateDataFxn);
	var elementJSON = Code.newDiv();
		Code.addChild(elementContainer,elementJSON);
	var presentation = definition["presentation"];
	var jsonModelColumn = presentation["json_model_column"];
	var modelString = container[jsonModelColumn]; // ALSO: mapping.object()["json_model_column"];
	var model = Code.parseJSON(modelString);
	//console.log(mapping.value());
	var object = Code.parseJSON(mapping.value());
	// set source to objects instead of strings
	container[jsonModelColumn] = model;
/*
// FAKE MODEL
	model = {
		"fields" : {
			"string" : {
				"type": "string"
			},
			"number" : {
				"type": "string-number"
			},
			"boolean" : {
				"type": "string-boolean"
			},
			"date": {
				"type": "string-date"
			},
			"color" : {
				"type": "string-color"
			},
			"duration" : {
				"type": "string-duration"
			}
			
		}
	};
// FAKE OBJECT
	object = {
		"string": "STRING",
		"number": "3.141",
		"boolean": "false",
		"date": "2016-11-12 12:34:56.7890",
		"color": "0x99AABBCC",
		"duration": "1234567890",
	}
*/
//	console.log("--------------------------------------------------------------------------------------------------------------- COMPOSER START");
	var composer = new giau.ObjectComposer(elementJSON, model, object);
	mapping.value(composer);
//	console.log("--------------------------------------------------------------------------------------------------------------- COMPOSER END");
	//console.log(composer);
	return elementJSON;
}

giau.CRUD._fieldEditJSONUpdateDataFxn = function(mapping, action){
	var field = mapping.field();
	var operation = action["action"];
	var action = action["data"];
	var element = mapping.element();
	var composer = mapping.value(composer);
	if(operation=="update"){
		var updatedValue = action["value"];
		composer.instance(updatedValue);
	}
}

giau.CRUD._fieldEditJSONUpdateElementFxn = function(mapping){
	var data = mapping.object();
	var field = mapping.field();
	var element = mapping.element();
}

// -------------------------------------------------------------------------------- MAPPING DATE

giau.CRUD._fieldEditDateUpdateDataFxn = function(mapping, action){
	console.log("_fieldEditDateUpdateDataFxn");
	console.log(mapping)
	console.log(action)
	console.log(".....................................................................................")
	console.log(mapping.element())
	console.log(mapping.value())
	var action = action["data"];
	var dateValue = action["value"];
	var dateModal = mapping.value();
	console.log(dateModal);
	if(dateModal && dateModal.value){
		dateModal.value(dateValue);
	}
}
giau.CRUD._fieldEditDateUpdateElementFxn = function(mapping){
	// N/A
}

// -------------------------------------------------------------------------------- MAPPING STRING
giau.CRUD._fieldEditStringUpdateDataFxn = function(mapping, action){
	//console.log("_fieldEditStringUpdateDataFxn");
}
giau.CRUD._fieldEditStringUpdateElementFxn = function(mapping){
	//console.log("_fieldEditStringUpdateElementFxn");
}

giau.CRUD.prototype._mappingFromData = function(fieldDescription, sourceObject, itemIndex){
	var alias = fieldDescription["alias"];
	var column = fieldDescription["column"];
	var attributes = fieldDescription["attributes"];
	var presentation = fieldDescription["presentation"];
	var definition = fieldDescription["definition"];
	// SUB
	var name = attributes["display_name"];
	var shouldDisplay = attributes["display"];
		shouldDisplay = shouldDisplay!=="false"; // default to true
shouldDisplay = true;
	var fieldType = definition["type"];
console.log(itemIndex+" = "+fieldType+" ... "+sourceObject[itemIndex]);
	// DISPLAY
	var elementField = Code.newDiv();
	var elementTitle = Code.newDiv();
	var elementValue = Code.newDiv();
		Code.addChild(elementField,elementTitle);
		Code.addChild(elementField,elementValue);
	// STYLES
	Code.setStyleFontFamily(elementTitle,"monospace");
	Code.setStyleFontSize(elementTitle,10+"px");
	Code.setStyleColor(elementTitle,"#000");
	Code.setStyleWordWrap(elementTitle,"break-word");
	// CONTAINER
	Code.setStylePaddingLeft(elementField,4+"px");
	Code.setStylePaddingRight(elementField,4+"px");
	Code.setStylePaddingTop(elementField,2+"px");
	Code.setStylePaddingBottom(elementField,0+"px");
	// VALUES
	Code.setContent(elementTitle,""+name+":");
if(!shouldDisplay){
	return null;
}
	
	var mapping = new MapDataDisplay();
	mapping.element(elementField);
	mapping.object(sourceObject);
	mapping.field(itemIndex);
	//console.log(mapping)
	var operationFxn = {};
		operationFxn["string"] = [giau.CRUD._fieldEditString,giau.CRUD._fieldEditString];
		operationFxn["string-number"] = [giau.CRUD._fieldEditNumber,giau.CRUD._fieldEditString];
		operationFxn["string-date"] = [giau.CRUD._fieldEditDate,giau.CRUD._fieldEditDate];
		operationFxn["string-color"] = [giau.CRUD._fieldEditColor,giau.CRUD._fieldEditColor];
		operationFxn["string-json"] = [giau.CRUD._fieldEditJSON,giau.CRUD._fieldEditJSON];
		// 
operationFxn["string-duration"] = [giau.CRUD._fieldEditDuration,giau.CRUD._fieldEditDuration];
operationFxn["string-array"] = [giau.CRUD._fieldEditStringArray,giau.CRUD._fieldEditStringArray]; // comma separated
operationFxn["string-option"] = [giau.CRUD._fieldEditOption,giau.CRUD._fieldEditOption]; // select list
		
	var operation = operationFxn[fieldType];
	var updateElementFunction = null;
	if(operation){
		var statFxn = operation[0];
		var editFxn = operation[1];
		if(attributes["editable"]=="true"){
			//editFxn(definition, attributes, presentation, value, source, elementValue, mapping);
		}else{
			//statFxn(definition, attributes, presentation, value, source, elementValue, mapping);
		}
			editFxn(fieldDescription, sourceObject, itemIndex, elementValue, mapping);
	}
	mapping.updateElementFromData();
	return mapping;
}

giau.CRUD.prototype._checkSubmitChange = function(field, value, source){
	var str = Code.StringFromJSON(model);
	console.log(str)
}

giau.CRUD._jsDispatch = new JSDispatch(); // TODO: USE SOMETHING ELSE
giau.CRUD.generateBoxDiv = function(value, ctx, handleFxn, closeFxn){
	var textColor = "#FFF";
	var backgroundColor = giau.Theme.Color.MediumRed;
	var borderColor = giau.Theme.Color.DarkRed;
	var container = Code.newDiv();
		Code.setStylePadding(container,2+"px");
		Code.setStyleDisplay(container,"inline-block");
		Code.setStyleBorderWidth(container,1+"px");
		Code.setStyleBorderColor(container,borderColor);
		Code.setStyleBorder(container,"solid");
		Code.setStyleFontSize(container,12+"px");
		Code.setStyleBackgroundColor(container,backgroundColor);
		Code.setStyleBorderRadius(container,2+"px");
	var content = Code.newDiv();
		Code.setContent(content,value+""+"&nbsp;");
		Code.setStyleDisplay(content,"inline");
		Code.setStyleColor(content,textColor);
		Code.addChild(container,content);
	var closeButton = giau.CRUD._generateSubButton("&times;", container);
	if(closeFxn){
		this._jsDispatch.addJSEventListener(closeButton, Code.JS_EVENT_CLICK, closeFxn, ctx);
	}
	if(handleFxn){
		this._jsDispatch.addJSEventListener(content, Code.JS_EVENT_CLICK, handleFxn, ctx);
	}
	return container;
};

giau.CRUD._generateSubButton = function(display,element){
	var div;
		div = Code.newDiv();
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleFontSize(div, 14+"px");
		Code.setStyleColor(div,giau.Theme.Color.TextOnDark);
		Code.setStylePaddingLeft(div,4+"px");
		Code.setStylePaddingRight(div,4+"px");
		Code.setStylePaddingTop(div,1+"px");
		Code.setStylePaddingBottom(div,1+"px");
		Code.setStyleBorderWidth(div,1+"px");
		Code.setStyleBorderColor(div,giau.Theme.Color.MediumRed);
		Code.setStyleBorder(div,"solid");
		Code.setStyleMarginLeft(div,4+"px");
		Code.setStyleBackgroundColor(div,giau.Theme.Color.LightRed);
		Code.setStyleCursor(div,Code.JS_CURSOR_STYLE_FINGER);

	if(display){
		Code.setContent(div,display);
	}
	if(element){
		Code.addChild(element,div);
	}
	return div;
}


giau.InputFieldTextMini = function(element, value, stylingFxn){
	giau.InputFieldTextMini._.constructor.call(this);
	this._container = element;
	this._value = "";
	var textElement = Code.newDiv();
// Code.setStyleDisplay(this._container,"block");
Code.setStyleOverflow(this._container,"hidden");
		Code.setStyleWidth(this._container,"100%");
		Code.setStyleHeight(this._container,"100%");


		Code.setStyleDisplay(textElement,"inline-block");
		Code.setStylePadding(textElement,0+"px");
		Code.setStyleBorderWidth(textElement,0+"px");
		Code.setStyleBorder(textElement,0+"px");
		
		Code.setStyleColor(textElement,"#000");
		Code.setStyleFontSize(textElement,11+"px");
		
		//Code.setStyleWidth(textElement,"100%");
		//Code.setStyleHeight(textElement,"100%");

		//Code.setStyleBackgroundColor(textElement,"#FFF");
		//Code.setStyleBackgroundColor(input,Code.getJSColorFromARGB(0x00000000));
		//Code.setStyleOverflow(textElement,"hidden");
		//Code.setStylePadding(textElement,"2px");
		//Code.setTextPlaceholder(textElement,"(empty)");
	Code.addChild(this._container,textElement);
	// outside styling
	if(stylingFxn){
		stylingFxn(textElement);
	}

	this._jsDispatch = new JSDispatch();
	// textElement clear background makes not selectable
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_MOUSE_DOWN, this._handleMouseDownFxn, this, {});

	this._textElement = textElement;
	this.value(value);
}

Code.inheritClass(giau.InputFieldTextMini, Dispatchable);

giau.InputFieldTextMini.EVENT_CHANGE = "giau.InputFieldTextMini.EVENT_CHANGE";
giau.InputFieldTextMini.EVENT_SELECT = "giau.InputFieldTextMini.EVENT_SELECT";

giau.InputFieldTextMini.prototype._handleMouseDownFxn = function(e){
	console.log("down");
	this.alertAll(giau.InputFieldTextMini.EVENT_SELECT,this);
};
giau.InputFieldTextMini.prototype._updateLayout = function(v){
	var value = this._value;
	var textElement = this._textElement;
	var value = Code.escapeHTML(value);
		value = value.replace( new RegExp(/\n/,"g") ,"<br/>");
	Code.setContent(textElement,value);
};
giau.InputFieldTextMini.prototype.value = function(v){
	if(v!==undefined){
		this._value = v;
		this._updateLayout();
		this.alertAll(giau.InputFieldTextMini.EVENT_CHANGE,this);
	}
	return this._value;
};

giau.InputFieldText = function(element, value, criteria){ // string, string-number
	giau.InputFieldText._.constructor.call(this);
	this._container = element;
	this._criteria = criteria!==undefined ? criteria : {};
	var radius = 4;
	//var input = Code.newInputText();
	var input = Code.newInputTextArea();
		Code.setStyleBorder(input,"solid");
		Code.setStyleBorderWidth(input,1+"px");
		Code.setStyleBorderColor(input,"#CCC");
		Code.setStyleBorderRadius(input,0+"px "+radius+"px "+radius+"px "+0+"px");
			//Code.setStyleBackgroundColor(input,"#FFF");
			//Code.setStyleBackgroundColor(input,Code.getJSColorFromARGB(0x00000000));
		Code.setStyleDisplay(input,"inline-block");
		Code.setStyleColor(input,"#000");
		Code.setStylePadding(input,"2px");
		Code.setStyleFontSize(input,11+"px");
		Code.setTextPlaceholder(input,"(empty)");

		Code.setStyleWidth(input,"100%");
		Code.setStyleHeight(input,"100%");

	Code.addChild(this._container,input);
	//Code.setStyleBackgroundColor(this._container,Code.getJSColorFromARGB(0x00000000));


	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(input, Code.JS_EVENT_INPUT_CHANGE, this._handleInputTextChangeFxn, this, {});

	// [0-9]+(\.[0-9]+)?(E|e)?(\+|\-)?([0-9]+)?

	// this._criteria = 0;
	// this._criteriaMinLength = 2; // alert?
	// this._criteriaMaxLength = 10; // chop
	// this._criteriaNumber = 0; // either:
	// 	this._criteriaFloat = 0; // A.B[e|E[]]
	// 	this._criteriaInteger = 0; // A^


	this._input = input;
	
	this.value(value);
}
Code.inheritClass(giau.InputFieldText, Dispatchable);

giau.InputFieldText.EVENT_CHANGE = "giau.InputFieldText.EVENT_CHANGE";
giau.InputFieldText.CRITERIA_MAX_CHARACTERS = "max_characters";
giau.InputFieldText.CRITERIA_FIELD_TYPE = "type";
giau.InputFieldText.CRITERIA_FIELD_VALUE_SINT = "signed_integer";
giau.InputFieldText.CRITERIA_FIELD_VALUE_NUM = "number";
giau.InputFieldText.CRITERIA_FIELD_VALUE_UINT = "unsigned_integer";
giau.InputFieldText.CRITERIA_FIELD_VALUE_SINGLE_LINE = "single_line";

giau.InputFieldText.prototype._handleInputTextChangeFxn = function(e){
	var newText = Code.getTextAreaValue(this._input);
	this._dataValue = newText;
	this._alertChanged();
};
giau.InputFieldText.prototype._filterMaxCharacters = function(s, max){
	if(s.length>max){
		return s.substring(0,max-1);
	}
	return s;
};
giau.InputFieldText.prototype._filterSingleLineOnly = function(s){
	var regExLine = new RegExp('\n','g');
	return s.replace(regExLine,"");
};
giau.InputFieldText.prototype._filterTEST = function(n){
	var numbers = ["1","12","0.0",".09","3.141","3.141E4","3.141E+3","3.141E-25",   "asd452345","2344.6455+343"]
	//var regex = new RegExp('([0-9]+(\.[0-9]+)?(E(\\+|\-)?[0-9]+))','i');
	//var regex = new RegExp('[0-9]+(\.([0-9]+)?)?','i');
	var regex = new RegExp('[0-9]+(\.([0-9]+(E((\\+|\-)?[0-9]+))?)?)?','i');
	for(var i=0; i<numbers.length; ++i){
		var number = numbers[i];
		//console.log( number + "  ===  " + number.search( new RegExp('([0-9]+(\.[0-9]+)?(E(\\+|\-)?[0-9]+))','i') ) );
		//console.log( number + "  ===  " + number.search( regex ) );
		console.log( number + "  ===  " + number.match( regex ) );
	}
};
giau.InputFieldText.prototype._filterSignedIntegerOnly = function(n){
	var regExInteger = new RegExp('(\\+|\-)?[0-9]+','i');
	return this._filterRegExOnly(n,regExNumber,"0");
};
giau.InputFieldText.prototype._filterUnsignedIntegerOnly = function(n){
	var regExInteger = new RegExp('[0-9]+','i');
	return this._filterRegExOnly(n,regExNumber,"0");
};
giau.InputFieldText.prototype._filterNumberOnly = function(n){
	var regExNumber = new RegExp('(\\+|\-)?[0-9]+(\.([0-9]+(E((\\+|\-)?[0-9]+))?)?)?','i');
	// 
	return this._filterRegExOnly(n,regExNumber,"0");
};
giau.InputFieldText.prototype._filterRegExOnly = function(n,r,d){
	var matches = n.match(r);
	var value = d!==undefined ? d : "";
	if(matches && matches.length>0){
		var match = matches[0];
		if(match==n){
			value = match;
		}
	}
	return value;
};
giau.InputFieldText.prototype.getFocus = function(){
	// this._input.focus(); // does not work, need to delay
	var t = new Ticker(1);
	t.addFunction(Ticker.EVENT_TICK,function(){
		t.stop();
		this._input.focus();
	}, this);
	t.start();
}
giau.InputFieldText.prototype.applyFilters = function(){
	var criteria = this._criteria;
	var keys = Code.keys(criteria);
	var text = this._dataValue;
	for(var i=0; i<keys.length; ++i){
		var key = keys[i];
		var value = criteria[key];
		if(key==giau.InputFieldText.CRITERIA_MAX_CHARACTERS){
			var maxChars = value;
			text = this._filterMaxCharacters(text,maxChars);
		}else if(key==giau.InputFieldText.CRITERIA_FIELD_VALUE_NUM){
			text = this._filterNumberOnly(text);
		}else if(key==giau.InputFieldText.CRITERIA_FIELD_VALUE_SINGLE_LINE){
			text = this._filterSingleLineOnly(text);
		}
		
	}
	this._dataValue = text;
	this._updateLayout();
}

giau.InputFieldText.prototype._updateLayout = function(v){
	var value = this._dataValue;
	var input = this._input;
	Code.setInputTextValue(input,value);
};
giau.InputFieldText.prototype._alertChanged = function(){
	this.alertAll(giau.InputFieldText.EVENT_CHANGE,this);
}
giau.InputFieldText.prototype.value = function(v){
	if(v!==undefined){
		this._dataValue = v;
		this._updateLayout();
	}
	return this._dataValue;
}

giau.InputFieldBoolean = function(element, value){
	giau.InputFieldBoolean._.constructor.call(this);
	this._container = element;
	this.value(value);
	this._elementCheckbox = Code.newDiv();
	this._elementRect = Code.newDiv();
	this._elementCover = Code.newDiv();
	Code.addChild(this._container, this._elementRect);
		Code.addChild(this._elementRect, this._elementCheckbox);
		Code.addChild(this._elementRect, this._elementCover);

	Code.setStylePosition(this._elementRect,"relative");
	Code.setStyleVerticalAlign(this._elementRect,"middle");
	Code.setStyleDisplay(this._elementRect,"inline-block");
	Code.setStyleMinWidth(this._elementRect,40+"px");
	Code.setStyleHeight(this._elementRect,100+"%");
	Code.setStyleBackgroundColor(this._elementRect,Code.getJSColorFromARGB(0x99000000));
	Code.setStyleTextAlign(this._elementRect,"center");

	var checkSize = 24;
	Code.setStyleDisplay(this._elementCheckbox,"inline-block");
	Code.setStyleVerticalAlign(this._elementCheckbox,"middle");
	Code.setStyleFontSize(this._elementCheckbox,checkSize+"px");

	Code.setStylePosition(this._elementCover,"absolute");
	Code.setStyleLeft(this._elementCover,0+"px");
	Code.setStyleTop(this._elementCover,0+"px");
	Code.setStyleDisplay(this._elementCover,"inline-block");
	Code.setStyleWidth(this._elementCover,"100%");
	Code.setStyleHeight(this._elementCover,"100%");
	Code.setStyleBackgroundColor(this._elementCover,Code.getJSColorFromARGB(0x00000000));

	this._updateFieldFromValue();
	
	// 
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(this._elementCover, Code.JS_EVENT_MOUSE_DOWN, this._handleRectMouseDownFxn, this, {});
}
Code.inheritClass(giau.InputFieldBoolean, Dispatchable);

giau.InputFieldBoolean.EVENT_CHANGE = "EVENT_CHANGE";

giau.InputFieldBoolean.prototype._handleRectMouseDownFxn = function(e,f){
	var value = this._valueBoolean();
	if(value){
		this.value("false");
	}else{
		this.value("true");
	}
	this._updateFieldFromValue();
	this.alertAll(giau.InputFieldBoolean.EVENT_CHANGE, this);
}
giau.InputFieldBoolean.prototype._updateFieldFromValue = function(){
	var value = this._dataValue;
	var content = "?";
	if(value=="true"){
		content = "&check;";
		Code.setStyleColor(this._elementCheckbox,"#11AA33");
	}else if(value=="false"){
		content = "&cross;";
		Code.setStyleColor(this._elementCheckbox,"#CC2233");
	}
	Code.setContent(this._elementCheckbox,content);
}

giau.InputFieldBoolean.prototype._valueBoolean = function(){
	return this._dataValue == "true" ? true : false;
}
giau.InputFieldBoolean.prototype.value = function(v){
	if(v!==undefined){
		if(Code.isString(v)){
			v = v==="true" ? "true" : "false";
		}else{
			v = v ? "true" : "false";
		}
		this._dataValue = v;
	}
	return this._dataValue;
}
giau.InputFieldDuration = function(element, value){
	giau.InputFieldDuration._.constructor.call(this);
	this._container = element;
		Code.setStyleBackgroundColor(this._container,"#FFF");
	this._fieldYears = Code.newInputText("years");
	this._fieldDays = Code.newInputText("days");
	this._fieldHours = Code.newInputText("hours");
	this._fieldMinutes = Code.newInputText("minutes");
	this._fieldSeconds = Code.newInputText("seconds");
	this._fieldMilliseconds = Code.newInputText("milli");

	this._jsDispatch = new JSDispatch();

	var i;
	var rows = [];
	for(i=0; i<3; ++i){
		var row = Code.newDiv();
		Code.addChild(this._container, row);
		rows.push(row);
	}
	this._rows = rows;

	var fields = [this._fieldYears,this._fieldMinutes, this._fieldDays,this._fieldSeconds ,this._fieldHours,this._fieldMilliseconds];
	var titleTexts = ["YEAR","MINS", "DAYS","SECS", "HOUR","MILI"];
	var titles = [];
	for(i=0; i<6; ++i){
		var field = fields[i];
		var t = titleTexts[i];
		var col = Code.newDiv();
		var row = rows[Math.floor(i/2)];
		var title = Code.newDiv();
			Code.setContent(title,t);
		Code.addChild(row,col);
		if(i%2==0){
			Code.addChild(col, title);
			Code.addChild(col, field);
			Code.setStyleTextAlign(title,"left");
		}else{
			Code.addChild(col, field);
			Code.addChild(col, title);
			Code.setStyleTextAlign(title,"right");
		}
		Code.setStyleDisplay(col,"inline-block");

		Code.setStyleDisplay(title,"inline-block");
		Code.setStyleFontSize(title,12+"px");

		Code.setStyleDisplay(field,"inline-block");
		Code.setStyleFontSize(field,12+"px");
		Code.setStylePadding(field,0+"px");
		Code.setStyleMargin(field,0+"px");
		Code.setStyleBorder(field,0+"px");

		Code.setStyleWidth(col,"50%");

		Code.setStyleWidth(title,"40%");
		Code.setStyleWidth(field,"60%");
		this._jsDispatch.addJSEventListener(field, Code.JS_EVENT_INPUT_CHANGE, this._handleFieldChangeFxn, this, {"index":i});
		titles.push(title);
	}
	this._titles = titles;
	this._updateFieldsFromValue();
	this._updateValueFromFields();
	this.value(value);
}
Code.inheritClass(giau.InputFieldDuration, Dispatchable);
giau.InputFieldDuration.EVENT_CHANGE = "InputFieldDuration.EVENT_CHANGE";
giau.InputFieldDuration.prototype._handleFieldChangeFxn = function(e,f){
	var index = f["index"];

	this._updateFilterFields();
	this._updateValueFromFields();	
}
giau.InputFieldDuration.prototype._updateFilterFields = function(){
	this._filterField(this._fieldMilliseconds);
	this._filterField(this._fieldSeconds);
	this._filterField(this._fieldMinutes);
	this._filterField(this._fieldHours);
	this._filterField(this._fieldDays);
	this._filterField(this._fieldYears);
}
giau.InputFieldDuration.prototype._filterField = function(field){
	var value = Code.getInputTextValue(field);
	value = Code.stringFilterNumbersOnly(value);
	value = Code.stringRemovePrefix(value,"0");
	value = value.length>0 ? value : "0";
	Code.setInputTextValue(field,value);
}
giau.InputFieldDuration.prototype._updateValueFromFields = function(){
	var millis = Code.getInputTextValue(this._fieldMilliseconds);
		millis = parseInt(millis);
	var seconds = Code.getInputTextValue(this._fieldSeconds);
		seconds = parseInt(seconds);
	var minutes = Code.getInputTextValue(this._fieldMinutes);
		minutes = parseInt(minutes);
	var hours = Code.getInputTextValue(this._fieldHours);
		hours = parseInt(hours);
	var days = Code.getInputTextValue(this._fieldDays);
		days = parseInt(days);
	var years = Code.getInputTextValue(this._fieldYears);
		years = parseInt(years);
	var value = 0;
	value += millis;
	value += seconds*1000;
	value += minutes*1000*60;
	value += hours*1000*60*60;
	value += days*1000*60*60*24;
	value += years*1000*60*60*24*365;
	var maximumValue = Math.pow(2,52) - 1; // 1 bit sign 11 bits exponent 52 bits precision
	if(value>=maximumValue){ // 2^52 millis == 142808 years
		console.log("precision error -- maximum duration = "+(maximumValue));
		value = maximumValue;
	}
	this.value(value);
}
giau.InputFieldDuration.prototype._updateFieldsFromValue = function(){
	var timeInfo = Code.getTimeDivisionsFromMilliseconds(this._dataValue);
	var years = timeInfo["years"];
	var days = timeInfo["days"];
	var hours = timeInfo["hours"];
	var minutes = timeInfo["minutes"];
	var seconds = timeInfo["seconds"];
	var millis = timeInfo["milliseconds"];
	Code.setInputTextValue(this._fieldYears, ""+years);
	Code.setInputTextValue(this._fieldDays, ""+days);
	Code.setInputTextValue(this._fieldHours, ""+hours);
	Code.setInputTextValue(this._fieldMinutes, ""+minutes);
	Code.setInputTextValue(this._fieldSeconds, ""+seconds);
	Code.setInputTextValue(this._fieldMilliseconds, ""+millis);
}
giau.InputFieldDuration.prototype.value = function(v){
	//oldValue = this._dataValue;
	if(v!==undefined){
		if(Code.isString(v)){
			this._dataValue = parseInt(v);
		} // else assume int
		this._dataValue = v;
		this.alertAll(giau.InputFieldDuration.EVENT_CHANGE);
		//if(oldValue != v){
		this._updateFieldsFromValue();
		//}
	}
	return this._dataValue;
}

giau.InputFieldDurationMini = function(element, value){
	Code.constructorClass(giau.InputFieldDurationMini, this, element, value);
	this._container = element;
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(this._container, Code.JS_EVENT_MOUSE_DOWN, this._handleFieldSelectFxn, this);
	this.value(value);
};
Code.inheritClass(giau.InputFieldDurationMini, Dispatchable);
giau.InputFieldDurationMini.EVENT_SELECT = "InputFieldDurationMini.EVENT_SELECT";

giau.InputFieldDurationMini.prototype._handleFieldSelectFxn = function(e){
	this.alertAll(giau.InputFieldDurationMini.EVENT_SELECT, this);
};
giau.InputFieldDurationMini.prototype._updateLayout = function(v){
	var milliseconds = this._value;
	var timeInfo = Code.getTimeDivisionsFromMilliseconds(milliseconds);
	var years = timeInfo["years"];
	var days = timeInfo["days"];
	var hours = timeInfo["hours"];
	var minutes = timeInfo["minutes"];
	var seconds = timeInfo["seconds"];
	var millis = timeInfo["milliseconds"];
	var displayText = "";
	if(milliseconds==0){
		displayText = "0s"; // no time
	}
	if(millis>0){
		displayText = millis+"ms "+displayText;
	}
	if(seconds>0){
		displayText = seconds+"s "+displayText;
	}
	if(minutes>0){
		displayText = minutes+"m "+displayText;
	}
	if(hours>0){
		displayText = hours+"h "+displayText;
	}
	if(days>0){
		displayText = days+"d "+displayText;
	}
	if(years>0){
		displayText = years+"y "+displayText;
	}
	Code.setContent(this._container,displayText);
};
giau.InputFieldDurationMini.prototype.value = function(v){
	if(v!==undefined){
		this._value = v;
		this._updateLayout();
		console.log("mini duration value ypdate: "+v);
	}
	return this._value;
};
//
giau.InputFieldDurationMini.prototype.kill = function(){
	Code.methodClass(InputFieldDurationMini, this, "kill");
	// ...
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- COLOR
giau.InputFieldColor = function(element, value){
	giau.InputFieldColor._.constructor.call(this);
	this._container = element;
	this._colorValue = 0x00000000;
	this.value(value);

	var parentWidth = $(this._container).width();
	var parentHeight = $(this._container).height();
	var leftWidth = Math.floor(parentWidth * 0.80);
	var rightWidth = parentWidth - leftWidth;
	var rightBreak = 4;
	var rightField = rightWidth - rightBreak;

	var rowHeight = 20;
	var fieldHeight = 20;
	var fieldTop = Math.round((rowHeight - fieldHeight)*0.5);

	this._jsDispatch = new JSDispatch();
	var finalColor = this.value();
	var squareSize = 20;
	this._colorRow = Code.newDiv();
	this._colorSquare = Code.newDiv();
	this._colorField = Code.newInputText();
	Code.addChild(this._container,this._colorRow);
		Code.addChild(this._colorRow,this._colorField);
		Code.addChild(this._colorRow,this._colorSquare);
		
		Code.setStyleHeight(this._colorRow, 20+"px");
		Code.setStyleTextAlign(this._colorRow,"left");
		Code.setStylePosition(this._colorRow, "relative");

		var colorFieldWidth = 120;
		Code.setStyleDisplay(this._colorField,"inline-block");
		Code.setStyleFontSize(this._colorField,12+"px");
		Code.setStyleWidth(this._colorField, colorFieldWidth+"px");
		Code.setStyleMargin(this._colorField, 0+"px");
		Code.setStylePadding(this._colorField, 0+"px");
		Code.setStyleBorder(this._colorField, 0+"px");
		Code.setStyleMarginRight(this._colorField, "auto");
		Code.setStyleMarginLeft(this._colorField, 0+"px");
		Code.setStylePosition(this._colorField, "absolute");
		Code.setStyleLeft(this._colorField, 0+"px");

		Code.setStyleDisplay(this._colorSquare,"inline-block");
		Code.setStyleWidth(this._colorSquare, squareSize+"px");
		Code.setStyleHeight(this._colorSquare, squareSize+"px");
		Code.setStyleMargin(this._colorSquare, 0+"px");
		Code.setStylePadding(this._colorSquare, 0+"px");
		Code.setStyleBorder(this._colorSquare, 0+"px");
		Code.setStyleVerticalAlign(this._colorSquare, "bottom");
		Code.setStyleMarginLeft(this._colorSquare, "auto");
		Code.setStyleMarginRight(this._colorSquare, 0+"px");
		Code.setStylePosition(this._colorSquare, "absolute");
		Code.setStyleRight(this._colorSquare, 0+"px");
//		Code.setStyleBackgroundColor(this._colorSquare, Code.getJSColorFromARGB(finalColor));

	this._jsDispatch.addJSEventListener(this._colorField, Code.JS_EVENT_INPUT_CHANGE, this._handleFinalColorFieldChange, this, {});
		Code.startTrackInputRange(this._colorField, this._jsDispatch);

	var rows = [];
	var sliders = [];
	var fields = [];
	var cursors = [];
	var colorFields = [Code.getRedARGB(finalColor),Code.getGrnARGB(finalColor),Code.getBluARGB(finalColor),Code.getAlpARGB(finalColor)];
	var colorRanges = [[0xFF000000,0xFFFF0000], [0xFF000000,0xFF00FF00], [0xFF000000,0xFF0000FF], [0xFF000000,0xFFFFFFFF]];
	var i, len;
	len = colorFields.length;
	for(i=0; i<len; ++i){
		var color = colorFields[i];
		var range = colorRanges[i];

		var elementRow = Code.newDiv();
			var elementSlider = Code.newDiv();
			var elementValue = Code.newDiv();

		Code.addChild(this._container,elementRow);
			Code.addChild(elementRow, elementSlider);
			Code.addChild(elementRow, elementValue);

		Code.setStyleDisplay(elementRow,"block");
		Code.setStyleWidth(elementRow,parentWidth+"px");
		Code.setStyleHeight(elementRow,rowHeight+"px");
		//Code.setStyleBackgroundColor(this._elementRowRed,"#00F");
			
		Code.setStyleDisplay(elementSlider,"inline-block");
		Code.setStyleWidth(elementSlider,leftWidth+"px");
		Code.setStyleHeight(elementSlider,rowHeight+"px");
		//Code.setStyleBackgroundColor(this._elementSliderRed,"#0F0");

		Code.setStyleDisplay(elementValue,"inline-block");
		Code.setStyleWidth(elementValue,rightWidth+"px");
		//Code.setStyleBackgroundColor(this._elementValueRed,"#F00");
		Code.setStyleHeight(elementValue,rowHeight+"px");
		Code.setStyleVerticalAlign(elementValue,"top");

		var elementField = Code.newInputText("??");
		Code.setStyleDisplay(elementField,"inline-block");
		Code.setStyleWidth(elementField,rightField+"px");
		Code.setStyleHeight(elementField,fieldHeight+"px");
		Code.setStyleFontSize(elementField,12+"px");
		Code.setStyleBorderWidth(elementField, 0+"px");
		Code.setStylePadding(elementField, 0+"px");
		Code.setStyleMargin(elementField,0+"px");
		//Code.setStyleVerticalAlign(this._elementFieldRed,"top");

		Code.setStylePosition(elementField,"relative");
		Code.setStyleLeft(elementField,rightBreak+"px");
		Code.setStyleTop(elementField, fieldTop+"px");
		Code.setStyleTextAlign(elementField,"center");
		//Code.setStyleVerticalAlign(this._elementFieldRed,"top");
		
		Code.addChild(elementValue, elementField);

		var hex = Code.getHexNumber(color, 2);

		Code.setInputTextValue(elementField, hex);
		var colorSlider = new giau.InputFieldColorSlider(elementSlider, color, range);
		colorSlider.addFunction(giau.InputFieldColorSlider.EVENT_COLOR_UPDATE, this._handleColorChange, this, {"index":i});
			Code.startTrackInputRange(elementField, this._jsDispatch);
		this._jsDispatch.addJSEventListener(elementField, Code.JS_EVENT_INPUT_CHANGE, this._handleInputFieldChange, this, {"index":i});

		cursors.push(0);
		rows.push(elementRow);
		fields.push(elementField);
		sliders.push(colorSlider);
	}
	this._elementRows = rows;
	this._elementFields = fields;
	this._colorSliders = sliders;
	this._cursors = cursors;

	this.updateFinalColorFromColors();
}
Code.inheritClass(giau.InputFieldColor, Dispatchable);

giau.InputFieldColor.EVENT_CHANGE = "giau.InputFieldColor.EVENT_CHANGE";

giau.InputFieldColor.prototype._handleFinalColorFieldChange = function(e){
	var col = giau.InputFieldColor.hexFieldUpdateOverwrite(this._colorField, 8);
	var alp = Code.getAlpARGB(col);
	var red = Code.getRedARGB(col);
	var grn = Code.getGrnARGB(col);
	var blu = Code.getBluARGB(col);
	this._colorSliders[3].color(alp);
	this._colorSliders[0].color(red);
	this._colorSliders[1].color(grn);
	this._colorSliders[2].color(blu);
}
giau.InputFieldColor.prototype._handleInputFieldChange = function(e,f){
	var index = f["index"];
	var elementField = this._elementFields[index];
	var cursorLocationPrev = this._cursors[index];
	var colorSlider = this._colorSliders[index];
	var newValue = giau.InputFieldColor.hexFieldUpdateOverwrite(elementField, 2);
	colorSlider.color(newValue);
	this.alertAll(giau.InputFieldColor.EVENT_CHANGE, this);
};
giau.InputFieldColor.hexFieldUpdateOverwrite = function(elementField,count){
	var hexBinDigits = count*4;
	var maxValue = 0;
	for(var i=0; i<hexBinDigits; ++i){
		maxValue = (maxValue << 1) | 0x01;
	}
	maxValue = maxValue >>> 0;

	var value = Code.inputTextUpdateWithLength(elementField, count, "0", false);
	// TO HEX
	var newValue = parseInt(value,16);
	newValue = Math.min(Math.max(newValue,0),maxValue);
	if(Code.isNaN(newValue)){
		newValue = 0;
	}
	var displayValue = Code.getHexNumber(newValue, count);
	Code.setInputTextValue(elementField,displayValue);

	return newValue;
}
giau.InputFieldColor.prototype._handleColorChange = function(e,f){
	var index = e["index"];
	var elementField = this._elementFields[index];
	var colorSlider = this._colorSliders[index];
	var hexValue = Code.getHexNumber(colorSlider.color(), 2);
	Code.setInputTextValue(elementField, hexValue);
	this.updateFinalColorFromColors();
	this.alertAll(giau.InputFieldColor.EVENT_CHANGE, this);
}
giau.InputFieldColor.prototype.updateFinalColorFromColors = function(){
	var alp = this._colorSliders[3].color();
	var red = this._colorSliders[0].color();
	var grn = this._colorSliders[1].color();
	var blu = this._colorSliders[2].color();
	var finalColor = Code.getColARGB(alp,red,grn,blu);
	this.value(finalColor);
	Code.setStyleBackgroundColor(this._colorSquare, Code.getJSColorFromARGB(finalColor));
	var colorHex = Code.getHexNumber(finalColor,8);
	Code.setInputTextValue(this._colorField, colorHex);
}
giau.InputFieldColor.prototype._updateLayout = function(){

	// R G B A sliders / fields / FINAL COLOR SQUARE / value
}
giau.InputFieldColor.prototype.value = function(value){ // 0xAARRGGBB
	if(value != undefined){
		if(Code.isString(value)){
			value = Code.getColARGBFromString(value);
		}
		this._colorValue = value;
	}
	return this._colorValue;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- COLOR SLIDER

giau.InputFieldColorSlider = function(element, color, ranges){
	giau.InputFieldColorSlider._.constructor.call(this);

	this._colorRanges = ranges;

	this._container = element
	this._colorValue = 0 //color!==undefined ? color : 0;
	this._background = Code.newDiv();
	this._indicator = Code.newDiv();
	Code.addChild(this._container,this._background);
	Code.addChild(this._container,this._indicator);

	Code.setStylePosition(this._container, "relative");


	var area = Code.newDiv();
	var indi = Code.newDiv();

	var indicatorInnerWidth = 3;
	var indicatorBorderWidth = 1;
	var indicatorHeight = 20; // TODO - get from parent
	var indicatorWidth = indicatorInnerWidth + 2*indicatorBorderWidth;

	var areaPaddingSides = 0;
	var areaPaddingEnds = 0;
	var colorBorder = 0xFF999999;
		colorBorder = Code.getJSColorFromARGB(colorBorder);
	var colorBG = 0xFF00FFFF;
		colorBG = Code.getJSColorFromARGB(colorBG);

	Code.addChild(this._indicator, indi);
	Code.addChild(this._indicator, area);

	var areaWidth = indicatorWidth + 2*areaPaddingSides;
	var areaHeight = indicatorHeight + 2*areaPaddingEnds;
	Code.setStyleWidth(area, areaWidth+"px");
	Code.setStyleHeight(area, areaHeight+"px");
	Code.setStyleBackgroundColor(area, colorBG);

	Code.setStylePosition(this._indicator, "absolute");
	Code.setStyleLeft(this._indicator, 0+"px");
	Code.setStyleTop(this._indicator, 0+"px");

		Code.setStyleHeight(indi, indicatorHeight+"px");
		Code.setStyleWidth(indi, indicatorInnerWidth+"px");
		Code.setStylePosition(indi, "absolute");
		Code.setStyleDisplay(indi, "block");

		Code.setStyleBorderColor(indi, colorBorder);
		Code.setStyleBorderWidth(indi, indicatorBorderWidth+"px");
		Code.setStyleBorder(indi, "solid");
		Code.setStyleLeft(indi, 0+"px");
		Code.setStyleTop(indi, 0+"px");
		Code.setStyleBackgroundColor(indi, "#FFF");

		/*
		Code.setStyleHeight(this._indicator, 44+"px");
		Code.setStyleWidth(this._indicator, 3+"px");
		Code.setStylePosition(this._indicator, "absolute");
		Code.setStyleDisplay(this._indicator, "block");
		Code.setStyleBorderColor(this._indicator, "#0F0");
		Code.setStyleBorderWidth(this._indicator, 2+"px");
		Code.setStyleBorder(this._indicator, "solid");
		Code.setStyleLeft(this._indicator, 0+"px");
		Code.setStyleTop(this._indicator, 0+"px");
		Code.setStyleBackgroundColor(this._indicator, "#FFF");
		*/

	Code.setStyleDisplay(this._background,"inline-block");
	//Code.setStyleDisplay(this._background,"inline-block");

	this._hitArea = Code.newDiv();
	Code.addChild(this._container,this._hitArea);
	// or this._background
	Code.setStylePosition(this._hitArea, "absolute");
	Code.setStyleBackgroundColor(this._hitArea, Code.getJSColorFromARGB(0x00FF0000));
	Code.setStyleLeft(this._hitArea, 0+"px");
	Code.setStyleTop(this._hitArea, 0+"px");
	Code.setStyleWidth(this._hitArea, "100%");
	Code.setStyleHeight(this._hitArea, "100%");

	this._padding = 3;

	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(this._hitArea, Code.JS_EVENT_MOUSE_DOWN, this._handleBackgroundMouseDownFxn, this, {});
	this._jsDispatch.addJSEventListener(this._hitArea, Code.JS_EVENT_MOUSE_UP, this._handleBackgroundMouseUpFxn, this, {});

	this._updateLayout();
	this.color(color);
}
Code.inheritClass(giau.InputFieldColorSlider, Dispatchable);

giau.InputFieldColorSlider.EVENT_COLOR_UPDATE = "EVENT_COLOR_UPDATE";
giau.InputFieldColorSlider.prototype.color = function(c){
	if(c!==undefined){
		if(c!==this._color){
			this._color = c;
			this._updateElementFromColor();
			this.alertAll(giau.InputFieldColorSlider.EVENT_COLOR_UPDATE, this);
		}
	}
	return this._color;
}
giau.InputFieldColorSlider.prototype._updateElementFromColor = function(){
	var color = this._color;
	var padding = this._padding;
	var areaWidth = $(this._background).width();
	var percent = this._color/255;
	var offsetX = percent*areaWidth;
	Code.setStyleLeft(this._indicator, offsetX+"px");
}
giau.InputFieldColorSlider.prototype._updateColorFromElement = function(){
	var padding = this._padding;
	var areaWidth = Code.getElementWidth(this._background); //$(this._background).width();
	var offsetX = Code.getElementLeftRelative(this._indicator); //$(this._indicator).position().left;
	var percent = offsetX/areaWidth; //Math.min(Math.max(offsetX-padding,0),areaWidth) / areaWidth;
	var color = Math.min(Math.floor(percent*256),255)
	this.color(color);
}
giau.InputFieldColorSlider.prototype._handleBackgroundMouseDownFxn = function(e,d){
	if(!Code.getMouseLeftClick(e)){
		return;
	}
	this._addDragCover();
	
	// start drag
	// put element over canvas, keep track of pointer
	this._updateIndicatorFromEvent(e);
	this._updateColorFromElement();
}
giau.InputFieldColorSlider.prototype._updateIndicatorFromEvent = function(e){
	//var pos = Code.getMousePositionLocal(e);
	var mousePos = Code.getMousePositionAbsolute(e);

	var areaHeight = $(this._background).height();
	var indiHeight = $(this._indicator).height();
	var indiWidth = Code.getElementWidth(this._indicator);
	var areaWidth = Code.getElementWidth(this._background);
	var areaPos = Code.getElementPositionAbsolute(this._background);
	//var indiPos = Code.getElementPositionAbsolute(this._indicator);
	var offsetInd = V2D.sub(mousePos,areaPos);
	offsetInd.x = Math.min(Math.max(offsetInd.x,0),areaWidth)
		var indiTop = Math.round((areaHeight-indiHeight)*0.5);
	//Code.setStyleLeft(this._indicator, pos.x+"px");
	Code.setStyleLeft(this._indicator, offsetInd.x+"px");
	Code.setStyleTop(this._indicator, indiTop+"px");
}
giau.InputFieldColorSlider.prototype._handleBackgroundMouseUpFxn = function(e,d){
	this._updateIndicatorFromEvent(e);
	this._updateColorFromElement();
	this._removeDragCover();
}
giau.InputFieldColorSlider.prototype._handleCoverMouseUpFxn = function(e,d){
	this._updateIndicatorFromEvent(e);
	this._updateColorFromElement();
	this._removeDragCover();
}
giau.InputFieldColorSlider.prototype._handleCoverMouseMoveFxn = function(e,d){
	this._updateIndicatorFromEvent(e);
	this._updateColorFromElement();
}
giau.InputFieldColorSlider.prototype._addDragCover = function(){
	this._removeDragCover();
	var screenWidth = Code.getElementWidth(Code.documentBody());//$(document).width();
	var screenHeight = Code.getElementHeight(Code.documentBody());//$(document).height();

	var cover = Code.newDiv();
	Code.setStyleWidth(cover,screenWidth+"px");
	Code.setStyleHeight(cover,screenHeight+"px");
	Code.setStylePosition(cover,"absolute");
	Code.setStyleLeft(cover,0+"px");
	Code.setStyleTop(cover,0+"px");
	var coverColor = 0x00000000;
	coverColor = Code.getJSColorFromARGB(coverColor);
	Code.setStyleBackgroundColor(cover,coverColor);
	Code.setStyleZIndex(cover,Code.INT_MAX_VALUE+"");
	Code.addChild(document.body,cover);
	this._cover = cover;

	this._jsDispatch.addJSEventListener(this._cover, Code.JS_EVENT_MOUSE_MOVE, this._handleCoverMouseMoveFxn, this);
	this._jsDispatch.addJSEventListener(this._cover, Code.JS_EVENT_MOUSE_UP, this._handleCoverMouseUpFxn, this);

	return this._cover;
}
giau.InputFieldColorSlider.prototype._removeDragCover = function(){
	// remove listeners ...
	if(this._cover){
		this._jsDispatch.removeJSEventListener(this._cover, Code.JS_EVENT_MOUSE_MOVE, this._handleCoverMouseMoveFxn, this);
		this._jsDispatch.removeJSEventListener(this._cover, Code.JS_EVENT_MOUSE_UP, this._handleCoverMouseUpFxn, this);
		Code.removeFromParent(this._cover);
		this._cover = null;
	}
}
giau.InputFieldColorSlider.prototype._updateLayout = function(){
	var wid = 100;
	var hei = 100;
	var stage = Stage.instance();
	var d = new DO();
	var colors = this._colorRanges;
	var locations = [0,1];
	//d.graphics().setFillGradientLinear(0,5, wid,5,  locations, colors);
	d.graphics().setLinearFill(0,0, wid,0,  locations, colors);
	d.graphics().beginPath();
	d.graphics().moveTo(0,0);
	d.graphics().lineTo(wid,0);
	d.graphics().lineTo(wid,hei);
	d.graphics().lineTo(0,hei);
	d.graphics().lineTo(0,0);
	d.graphics().endPath();
	d.graphics().fill();
	
	var img = stage.getDOAsImage(d, wid,hei, null);
	// create bg to fit:
	var bgImage = img.src;
	var base64URL = "url('"+bgImage+"')";
	Code.setStyleHeight(this._background,"100%");
	Code.setStyleWidth(this._background,"100%");
	Code.setStyleBackgroundImage(this._background,base64URL);	
	Code.setStyleBackgroundImageFill(this._background);
	Code.setStyleBackgroundImageRepeat(this._background);

	var backgroundWidth = Code.getElementWidth(this._background);
	var backgroundHeight =  Code.getElementHeight(this._background);
	var padding = 3;
	var areaWidth = backgroundWidth + padding*2;
	var areaHeight = backgroundHeight + padding*2;
	

	// Code.setStyleWidth(this._hitArea, areaWidth+"px");
	// Code.setStyleHeight(this._hitArea, areaHeight+"px");
	// Code.setStyleLeft(this._hitArea, -padding+"px");
	// Code.setStyleTop(this._hitArea, -padding+"px");
}

// --------------------------------------------------------------------------------------------------------------------------------------- INPUT TAGS
giau.InputFieldTags = function(element, value){
	giau.InputFieldTags._.constructor.call(this);
	this._jsDispatch = new JSDispatch();
	this._inputTimer = new Ticker(1000); // 1 second waiting period
		this._inputTimer.addFunction(Ticker.EVENT_TICK,this._handleInputTextTimerTickFxn, this);
	this._container = element;
	this._tagElements = [];
	var hint = "|";
		this._inputElement = Code.newInputText();
		Code.setStylePadding(this._inputElement,1+"px");
		Code.setStyleBorderWidth(this._inputElement,1+"px");
		Code.setStyleBorderColor(this._inputElement,"#CCC");
		Code.setStyleBackgroundColor(this._inputElement,"#FFF");
		Code.setTextPlaceholder(this._inputElement,hint);
		this._jsDispatch.addJSEventListener(this._inputElement, Code.JS_EVENT_INPUT_CHANGE, this._handleInputTextChangeFxn, this);
		this._jsDispatch.addJSEventListener(this._inputElement, Code.JS_EVENT_KEY_DOWN, this._handleInputTextKeyDownFxn, this);
	
	this.value(value);
	this._updateLayout();
}
Code.inheritClass(giau.InputFieldTags, Dispatchable);

giau.InputFieldTags.EVENT_CHANGE = "giau.InputFieldTags.EVENT_CHANGE";

giau.InputFieldTags.prototype._updateLayout = function(v){
	var tags = this.value();
	tags = Code.arrayFromCommaSeparatedString(tags);
	var i, len;
	var tag, div;
	// remove current tags
	var elements = this._tagElements;
	var element;
	len = elements.length;
	for(i=0; i<len; ++i){
		element = elements[i];
		Code.removeFromParent(element);
	}
	// add new tags
	Code.emptyArray(elements);
	len = tags.length;
	for(i=0; i<len; ++i){
		tag = tags[i];
			var value = tag;
			var obj = {"context":this, "index":i};
			var closeFxn = this._handleTagSelectRemove;
			var handleFxn = null;
		var div = giau.CRUD.generateBoxDiv(value, obj, handleFxn, closeFxn);
		Code.addChild(this._container,div);
		elements.push(div);
	}
	Code.removeFromParent(this._inputElement);
	Code.addChild(this._container, this._inputElement);
};
giau.InputFieldTags.prototype._handleInputTextKeyDownFxn = function(e){
	var key = Code.getKeyCodeFromKeyboardEvent(e);
	if(key==Keyboard.KEY_ENTER){
		this._inputTimer.stop();
		this._addCurrentInputTextValue();
		this._setTextInputFocused();
	}else if(key==Keyboard.KEY_ESC){
		this._inputTimer.stop();
		this._clearCurrentInputTextValue();
	}
}
giau.InputFieldTags.prototype._setTextInputFocused = function(){
	this._inputElement.focus();
}
giau.InputFieldTags.prototype._handleInputTextChangeFxn = function(e){
	this._inputTimer.stop();
	this._inputTimer.start();
};
giau.InputFieldTags.prototype._handleInputTextTimerTickFxn = function(e){
	this._inputTimer.stop();
	this._addCurrentInputTextValue();
};
giau.InputFieldTags.prototype._addCurrentInputTextValue = function(){
	var value = Code.getInputTextValue(this._inputElement);
	this._clearCurrentInputTextValue();
	this.addTag(value);
	this._setTextInputFocused();
};
giau.InputFieldTags.prototype._clearCurrentInputTextValue = function(){
	Code.setInputTextValue(this._inputElement,"");
}
giau.InputFieldTags.prototype._handleTagSelectRemove = function(e,d){
	var self = this["context"];
	var index = this["index"]; // Code.recursiveProperty(self,null, "index");
	self._removeIndex(index);
};
giau.InputFieldTags.prototype.addTag = function(tag){
	if(tag && tag.length>0){
		var tags = this.value();
		tags = Code.arrayFromCommaSeparatedString(tags);
		tags.push(tag);
		tags = Code.commaSeparatedStringFromArray(tags);
		this.value(tags);
		return true;
	}
	return false;
}
giau.InputFieldTags.prototype._removeIndex = function(index){
	if(index!==undefined && index!==null){
		var tagString = this.value();
		var tags = Code.arrayFromCommaSeparatedString(tagString);
		if(tags.length>index){
			Code.removeElementAt(tags,index);
			tags = Code.commaSeparatedStringFromArray(tags);
			this.value(tags);
		}
	}
};
giau.InputFieldTags.prototype.value = function(v){
	if(v!==undefined){
		this._value = v;
		this._updateLayout();
	}
	return this._value;
};

// --------------------------------------------------------------------------------------------------------------------------------------- INPUT SELECT OPTIONS
giau.InputFieldDiscrete = function(element, options, index){
	giau.InputFieldDiscrete._.constructor.call(this);
	this._container = element;
	this._tagElements = [];
	this._jsDispatch = new JSDispatch();
	this._index = 0;
	this._selectElement = Code.newSelect();
		Code.addChild(this._container,this._selectElement);
	this._jsDispatch.addJSEventListener(this._selectElement, Code.JS_EVENT_INPUT_CHANGE, this._handleSelectValueChangeFxn, this);
	this.options(options);
	this.index(index);
}
Code.inheritClass(giau.InputFieldDiscrete, Dispatchable);

giau.InputFieldDiscrete.EVENT_CHANGE = "giau.InputFieldDiscrete.EVENT_CHANGE";

giau.InputFieldDiscrete.prototype._handleSelectValueChangeFxn = function(e){
	var sel = Code.getSelected(this._selectElement);
	sel = parseInt(sel);
	this.index(sel);
}
giau.InputFieldDiscrete.prototype._updateLayout = function(){
	var array = this.options();
	var select = this._selectElement;
	Code.removeAllChildren(select);
	var i, len = array.length;
	for(i=0; i<len; ++i){
		var item = array[i];
		var display = item["display"];
		var option = Code.newOption(display,i+"",i==this._index);
		Code.addChild(select,option);
	}
}
giau.InputFieldDiscrete.prototype.options = function(options){
	if(options!==undefined){
		this._options = options;
	}
	return this._options;
}
giau.InputFieldDiscrete.prototype.index = function(index){
	if(index!==undefined){
		this._index = index;
		this._updateLayout();
		this.alertAll(giau.InputFieldDiscrete.EVENT_CHANGE, this);
	}
	return this._index;
}
giau.InputFieldDiscrete.prototype.value = function(value){ // assign a value ...
	if(Code.isString(value)){ // complicated lookup
		var array = this.options();
		var i, len = array.length;
		for(i=0; i<len; ++i){
			var item = array[i];
			var val = item["value"];
			if(val == value){
				this.index(i);
				break;
			}
		}
	}else{ // simple passing index
		this.index(value);
	}
	if(this._index < this._options.length){
		return this._options[this._index]["value"];
	}
	return null;
}

// --------------------------------------------------------------------------------------------------------------------------------------- INPUT DATE

giau.InputFieldDate = function(element, value){
	giau.InputFieldDate._.constructor.call(this);
	this._container = element;
		Code.setStyleBackgroundColor(this._container,"#FFF");
	if(!value){
		value = Code.getTimeStampFromMilliseconds();// default to now
	}
	this._dateValue = value; // ACTUAL RETURN VALUE
	var milliseconds = Code.dateFromString(this._dateValue);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds); // CURRENT DISPLAY CONTEXT

	this._jsDispatch = new JSDispatch();

	this._daysOfWeek = ["U","M","T","W","R","F","S"];
	this._monthsOfYear = [["JAN",0],["FEB",1],["MAR",2],["APR",3],["MAY",4],["JUN",5],["JUL",6],["AUG",7],["SEP",8],["OCT",9],["NOV",10],["DEC",11]];

	var i, j, child;
	this._elementLeft = Code.newDiv();
	this._elementRight = Code.newDiv();
	this._elementMonth = Code.newDiv();
		this._elementMonthLeft = Code.newDiv();
		this._elementMonthName = Code.newSelect(this._monthsOfYear);
		this._elementMonthRight = Code.newDiv();
		this._elementMonthTop = Code.newDiv();
		this._elementMonthBottom = Code.newDiv();
			this._elementMonthGrid = Code.newDiv();
	this._elementYear = Code.newInputText("????");

	this._elementHour = Code.newInputText("00");
	this._elementMinute = Code.newInputText("00");
	this._elementSecond = Code.newInputText("00");
	this._elementMillisecond = Code.newInputText("0000");

	var fields = [this._elementHour, this._elementMinute, this._elementSecond, this._elementMillisecond];
	for(i=0; i<fields.length; ++i){
		field = fields[i];
		Code.setStyleWidth(field,40+"px");
		Code.setStyleFontSize(field,11+"px");
		Code.setStyleHeight(field,20+"px");
		Code.setStyleBorderWidth(field,0+"px");
		this._jsDispatch.addJSEventListener(field, Code.JS_EVENT_INPUT_CHANGE, this._handleFieldChange, this, {"field":field});
		//this._jsDispatch.addJSEventListener(field, Code.JS_EVENT_CHANGE, this._handleFieldChange, this, {"field":field});
	}

	var value = Code.getInputTextValue(this._elementHour);
	value = Code.stringFilterNumbersOnly(value);

	// limit count


	Code.addChild(this._container,this._elementLeft);
	Code.addChild(this._container,this._elementRight);
		Code.addChild(this._elementLeft,this._elementMonth);
			Code.addChild(this._elementMonth, this._elementMonthTop);
				Code.addChild(this._elementMonthTop, this._elementMonthLeft);
				Code.addChild(this._elementMonthTop, this._elementMonthName);
				Code.addChild(this._elementMonthTop, this._elementYear);
				Code.addChild(this._elementMonthTop, this._elementMonthRight);
			Code.addChild(this._elementMonth, this._elementMonthBottom);
				Code.addChild(this._elementMonthBottom, this._elementMonthGrid);
		Code.addChild(this._elementRight,this._elementHour);
		Code.addChild(this._elementRight,this._elementMinute);
		Code.addChild(this._elementRight,this._elementSecond);
		Code.addChild(this._elementRight,this._elementMillisecond);
	Code.setStyleDisplay(this._elementLeft,"inline-block");
	Code.setStyleFloat(this._elementLeft,"left"); // dunno
	Code.setStyleWidth(this._elementLeft,"60%");
	Code.setStyleBackgroundColor(this._elementLeft,"#FFF");

	Code.setStyleDisplay(this._elementRight,"inline-block");
	Code.setStyleWidth(this._elementRight,"40%");
	//Code.setStyleBackgroundColor(this._elementRight,"#F00");

	Code.setStyleDisplay(this._elementMonthTop,"block");
	Code.setStyleTextAlign(this._elementMonthTop, "center");

	Code.setStyleDisplay(this._elementMonthLeft,"inline-block");
	Code.setContent(this._elementMonthLeft,"&larr;");
	Code.setStyleFloat(this._elementMonthLeft,"left");

	Code.setStyleDisplay(this._elementMonthRight,"inline-block");
	Code.setContent(this._elementMonthRight,"&rarr;");
	Code.setStyleFloat(this._elementMonthRight,"right");

	Code.setStyleDisplay(this._elementMonthName,"inline-block");
	//Code.setStyleBackgroundColor(this._elementMonthName,"#0FF");
	Code.setStyleFontSize(this._elementMonthName,11+"px");
	Code.setStyleColor(this._elementMonthName,"#000");
	Code.setStylePadding(this._elementMonthName,0+"px");
	Code.setStyleMargin(this._elementMonthName,0+"px");
	Code.setStyleBorder(this._elementMonthName,0+"px");
	Code.setStyleBorderWidth(this._elementMonthName,0+"px");

	Code.addStyle(this._elementMonthName,"text-indent: 0px");
	
	// select options
	for(i=0; i<Code.numChildren(this._elementMonthName); ++i){
		child = Code.getChild(this._elementMonthName,i);
		Code.setStyleColor(child,"#0F0");
		Code.setStylePadding(child,0+"px");
	}
	
	

	Code.setStyleDisplay(this._elementYear,"inline-block");
	Code.setStyleFontSize(this._elementYear,11+"px");
	Code.setStyleWidth(this._elementYear,32+"px");
	Code.setStylePadding(this._elementYear,0+"px");
	Code.setStyleMargin(this._elementYear,0+"px");
	Code.setStyleBorderWidth(this._elementYear,0+"px");
	

	Code.setStyleDisplay(this._elementMonthTop,"block");

	Code.setStyleDisplay(this._elementMonthBottom,"block");

	// listeners
	this._jsDispatch.addJSEventListener(this._elementMonthLeft, Code.JS_EVENT_MOUSE_DOWN, this._handleMonthLeftMouseDownFxn, this);
	this._jsDispatch.addJSEventListener(this._elementMonthRight, Code.JS_EVENT_MOUSE_DOWN, this._handleMonthRightMouseDownFxn, this);
	this._jsDispatch.addJSEventListener(this._elementMonthName, Code.JS_EVENT_CHANGE, this._handleMonthSelectFxn, this);
	this._jsDispatch.addJSEventListener(this._elementYear, Code.JS_EVENT_INPUT_CHANGE, this._handleYearSelectFxn, this);
	Code.startTrackInputRange(this._elementYear, this._jsDispatch);
	Code.startTrackInputRange(this._elementHour, this._jsDispatch);
	Code.startTrackInputRange(this._elementMinute, this._jsDispatch);
	Code.startTrackInputRange(this._elementSecond, this._jsDispatch);
	Code.startTrackInputRange(this._elementMillisecond, this._jsDispatch);

	this._updateLayout();
}
Code.inheritClass(giau.InputFieldDate, Dispatchable);

giau.InputFieldDate.EVENT_CHANGE = "giau.InputFieldDate.EVENT_CHANGE"

giau.InputFieldDate.prototype._handleFieldChange = function(e,f){
	var field = f["field"];
	//this._updateValueFromFields();
	var value = Code.getInputTextValue(field);
	var newValue = value;
	newValue = Code.stringFilterNumbersOnly(value);
	var numValue = Math.round(parseInt(newValue));
	var digitCount = 0;
	if(field==this._elementHour){
		numValue = Code.rangeForceMinMax(numValue,0,23);
		digitCount = 2;
	}else if(field==this._elementMinute){
		numValue = Code.rangeForceMinMax(numValue,0,59);
		digitCount = 2;
	}else if(field==this._elementSecond){
		numValue = Code.rangeForceMinMax(numValue,0,59);
		digitCount = 2;
	}else if(field==this._elementMillisecond){
		numValue = Code.rangeForceMinMax(numValue,0,9999);
		digitCount = 4;
	}
	newValue = Code.prependFixed(numValue+"","0",digitCount);
	if(value!==newValue){
		Code.setInputTextValue(field, newValue);
	}
	//var milliseconds = Code.dateFromString(this._displayDate);
	var milliseconds = Code.dateFromString(this._dateValue);
		var hour = parseInt(Code.getInputTextValue(this._elementHour));
		var minute = parseInt(Code.getInputTextValue(this._elementMinute));
		var second = parseInt(Code.getInputTextValue(this._elementSecond));
		var milli = parseInt(Code.getInputTextValue(this._elementMillisecond));
		milliseconds = Code.getSetHour(milliseconds, hour);
		milliseconds = Code.getSetMinute(milliseconds, minute);
		milliseconds = Code.getSetSecond(milliseconds, second);
		milliseconds = Code.getSetMillisecond(milliseconds, milli);
	//this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);
	this._dateValue = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();

	this._alertChanged();
}
giau.InputFieldDate.prototype._alertChanged = function(){
	this.alertAll(giau.InputFieldDate.EVENT_CHANGE, this);
}
giau.InputFieldDate.prototype._handleYearSelectFxn = function(e){
	var field = this._elementYear;
	var value = Code.inputTextUpdateWithLength(field, 4, "0", true);
	var year = parseInt(value);
	year = Code.rangeForceMinMax(year,1900,3000); // year maxes out somewhere
	Code.setInputTextValue(field,""+year);
	// TODO: filter digits & range
	var milliseconds = Code.dateFromString(this._displayDate);
	milliseconds = Code.getSetYear(milliseconds, year);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();

	this._alertChanged();
}
giau.InputFieldDate.prototype._handleMonthSelectFxn = function(e){
	var month = Code.getSelected(this._elementMonthName);
	month = parseInt(month);
	var milliseconds = Code.dateFromString(this._displayDate);
	milliseconds = Code.getSetMonth(milliseconds, month);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();

	this._alertChanged();
}
giau.InputFieldDate.prototype._handleMonthLeftMouseDownFxn = function(e){ // subtract month
	var milliseconds = Code.dateFromString(this._displayDate);
	milliseconds = Code.getPrevMonth(milliseconds);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();
}
giau.InputFieldDate.prototype._handleMonthRightMouseDownFxn = function(e){ // add month
	var milliseconds = Code.dateFromString(this._displayDate);
	milliseconds = Code.getNextMonth(milliseconds);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();
}
giau.InputFieldDate.prototype._handleDayMouseDownFxn = function(e, f){ // new date
	var year = f["year"];
	var month = f["month"];
	var day = f["day"];
	// hour, min, sec, milli already set
	var milliseconds = Code.dateFromString(this._dateValue);
		milliseconds = Code.getSetDay(milliseconds, day);
		milliseconds = Code.getSetMonth(milliseconds, month-1);
		milliseconds = Code.getSetYear(milliseconds, year);
	this._dateValue = Code.getTimeStampFromMilliseconds(milliseconds);
	this._updateLayout();

	this._alertChanged();
}

giau.InputFieldDate.prototype._updateLayout = function(){
	var milliseconds;
	var i, j;
	// SELECTED VALUES
	milliseconds = Code.dateFromString(this._dateValue);
	var selectedYear = Code.getYear(milliseconds);
	var selectedMonth = Code.getMonthOfYear(milliseconds);
	var selectedDayOfMonth = Code.getDayOfMonth(milliseconds);
	var selectedHour = Code.getHour(milliseconds);
	var selectedMinute = Code.getMinute(milliseconds);
	var selectedSecond = Code.getSecond(milliseconds);
	var selectedMillisecond = Code.getMillisecond(milliseconds);
		// var hour = parseInt(Code.getInputTextValue(this._elementHour));
		// var minute = parseInt(Code.getInputTextValue(this._elementMinute));
		// var second = parseInt(Code.getInputTextValue(this._elementSecond));
		// var milli = parseInt(Code.getInputTextValue(this._elementMillisecond));
		Code.setInputTextValue(this._elementHour, Code.prependFixed(selectedHour+"","0",2));
		Code.setInputTextValue(this._elementMinute, Code.prependFixed(selectedMinute+"","0",2));
		Code.setInputTextValue(this._elementSecond, Code.prependFixed(selectedSecond+"","0",2));
		Code.setInputTextValue(this._elementMillisecond, Code.prependFixed(selectedMillisecond+"","0",4));
		

	// CURRENT MONTH VALUES
	milliseconds = Code.dateFromString(this._displayDate);
	var displayYear = Code.getYear(milliseconds);
	var displayMonth = Code.getMonthOfYear(milliseconds);
	var daysInMonth = Code.getDaysInMonth(milliseconds);
	var firstDayOfMonth = Code.getFirstDayOfWeekInMonth(milliseconds);
	var monthDisplay = this._monthsOfYear[displayMonth];
	var monthDisplayValue = monthDisplay[1];
	Code.setInputTextValue(this._elementYear,displayYear+"");

	var daysInMonthPrev = Code.getDaysInMonth( Code.getPrevMonthFirstDay(milliseconds) );
	var daysInMonthNext = Code.getDaysInMonth( Code.getNextMonthFirstDay(milliseconds) );
	//Code.setContent(this._elementMonthName,monthDisplay);
	Code.setSelected(this._elementMonthName,monthDisplayValue+"");

	Code.removeAllChildren(this._elementMonthGrid);
	//Code.setStyleDisplay(this._elementMonthGrid,"table");
	Code.setStyleDisplay(this._elementMonthGrid,"block");
	Code.setStyleWidth(this._elementMonthGrid,"100%");
	Code.setStyleBorder(this._elementMonthGrid,0+"px");
	Code.setStylePadding(this._elementMonthGrid,0+"px");
	Code.setStyleMargin(this._elementMonthGrid,0+"px");
	// Code.addStyle(this._elementMonthGrid,"border-spacing",0+"px");
	// Code.addStyle(this._elementMonthGrid,"border-collapse","collapse");
	var weekStartIndex = 0;

	var day = 1;
	var nextMonthDay = 0;
	var prevMonthDay = 0;
	var startDays = false;
	var totalRows = 1+Math.ceil((weekStartIndex+daysInMonth+firstDayOfMonth)/7)
var rowHeight = 14;
	for(j=0; j<totalRows; ++j){
		var row = Code.newDiv();
		//Code.setStyleDisplay(row,"table-row");
Code.setStyleDisplay(row,"block");
		Code.setStyleVerticalAlign(row,"middle");
		Code.setStyleWidth(row,"100%");
Code.setStyleHeight(row,rowHeight+"px");
//Code.setStyleHeight(row,"10px");
		Code.addChild(this._elementMonthGrid,row);
		Code.setStyleBackgroundColor(row,"#CCC");
		for(i=0; i<7; ++i){
			var weekIndex = (i+weekStartIndex)%this._daysOfWeek.length;
			if(j!==0 && !startDays && weekIndex===firstDayOfMonth){ // flips on first time
				startDays = true;
			}
			var isDayInsideMonth = startDays && day <= daysInMonth;
			var isCurrentDay = false;
			var col = Code.newDiv();
				//Code.setStyleDisplay(col,"table-cell");
Code.setStyleDisplay(col,"inline-block");
				Code.setStyleVerticalAlign(col,"top");
				Code.setStyleTextAlign(col,"center");
Code.setStyleWidth(col,(100*(1/7))+"%");
Code.setStyleHeight(col,rowHeight+"px");
				Code.addChild(row,col);
			if(j==0){ // DOW
				Code.setContent(col,this._daysOfWeek[weekIndex]);
				Code.setStyleFontSize(col,9+"px");
				Code.setStyleColor(col,"#AAA");
				Code.setStyleBackgroundColor(col,"#DDD");
				Code.setStylePadding(col,0+"px");
			}else{
				Code.setStyleFontSize(col,11+"px");
				if(!isDayInsideMonth){ // BLANK
					Code.setStyleColor(col,"#CCC");
					Code.setStyleBackgroundColor(col,"#EEE");
					if(!startDays){ // previous month
						Code.setContent(col,(daysInMonthPrev-(firstDayOfMonth-i-1))+"");
					}else{ // next month
						Code.setContent(col,(day-daysInMonth+nextMonthDay)+"");
						++nextMonthDay;
					}
				}else{
					var millisecondsDate = 0;
					this._jsDispatch.addJSEventListener(col, Code.JS_EVENT_MOUSE_DOWN, this._handleDayMouseDownFxn, this, {"milliseconds:":millisecondsDate, "year":displayYear, "month":(displayMonth+1), "day":day});
					// 
					Code.setStyleColor(col,"#333");
					if(day==selectedDayOfMonth && selectedMonth==displayMonth && selectedYear==displayYear){
						Code.setStyleBackgroundColor(col,"#C00");
						Code.setStyleColor(col,"#FCC");
						Code.setContent(col,""+day);
					}else{
						if(weekIndex==0 || weekIndex==6){ // U | S
							Code.setStyleBackgroundColor(col,"#F3F3FC");
							//Code.setStyleBackgroundColor(col,"#000");
							//Code.setStyleColor(col,"#FFF");
						}else{
							Code.setStyleBackgroundColor(col,"#FFF");
						}
						
						Code.setContent(col,""+day);
					}
					++day;
				}
			}
			
		}
	}
}

giau.InputFieldDate.prototype.value = function(v){
	if(v!==undefined){
		this._dateValue = v;
		this._displayDate = this._dateValue; // display the selected date
		this._updateLayout();
	}
	return this._dateValue;
}


// ------------------------------------------------------------------------------------------------------------------------ COLOR MINI

giau.InputFieldColorMini = function(element, value){
	giau.InputFieldColorMini._.constructor.call(this);
	this._container = element;
	this._value = 0x00000000;
	this._jsDispatch = new JSDispatch();

	var size = 20;
	var fontSize = 12;
	var fontColor = 0xFF000000;
		fontColor = Code.getJSColorFromARGB(fontColor);
	var textBGColor = 0xFFFFFFFF;
		textBGColor = Code.getJSColorFromARGB(textBGColor);

	var rowElement = Code.newDiv();
	var textElement = Code.newDiv();
	var squareElement = Code.newDiv();
	var colorElement = Code.newDiv();
	var checkerElement = Code.newDiv();
	Code.addChild(this._container, rowElement);
	Code.addChild(rowElement, squareElement);
		Code.addChild(squareElement, checkerElement);
		Code.addChild(squareElement, colorElement);
	Code.addChild(rowElement, textElement);
	
	
	Code.setStyleDisplay(rowElement,"table-row");
	Code.setStyleDisplay(textElement,"table-cell");
	Code.setStyleVerticalAlign(textElement,"middle");
	Code.setStylePaddingLeft(textElement,5+"px");
	Code.setStylePaddingRight(textElement,5+"px");
	Code.setStyleFontMonospace(textElement);
	Code.setStyleFontSize(textElement,fontSize+"px");
	Code.setStyleColor(textElement,fontColor);
	Code.setStyleBackgroundColor(textElement,textBGColor);
	
	
	Code.setStyleDisplay(squareElement,"table-cell");
	Code.setStyleWidth(squareElement,size+"px");
	Code.setStyleHeight(squareElement,size+"px");
	Code.setStylePosition(squareElement,"relative");
	
	Code.setStyleDisplay(colorElement,"inline-block");
	Code.setStyleHeight(colorElement,"100%");
	Code.setStyleWidth(colorElement,"100%");
	Code.setStylePosition(colorElement,"absolute");

	var checkerImage = this.createCheckerboardImage();
	var base64URL = "url('"+checkerImage+"')";
	Code.setStyleHeight(checkerElement,"100%");
	Code.setStyleWidth(checkerElement,"100%");
	Code.setStylePosition(checkerElement,"absolute");
	Code.setStyleBackgroundImage(checkerElement,base64URL);

	this._colorElement = colorElement;
	this._textElement = textElement;

	this._jsDispatch.addJSEventListener(rowElement, Code.JS_EVENT_MOUSE_DOWN, this._handleMouseDownFxn, this);
	
	this.value(value);
	this._updateLayout();
}
Code.inheritClass(giau.InputFieldColorMini, Dispatchable);

giau.InputFieldColorMini.EVENT_CHANGE = "giau.InputFieldColorMini.EVENT_CHANGE";
giau.InputFieldColorMini.EVENT_SELECT = "giau.InputFieldColorMini.EVENT_SELECT";


giau.InputFieldColorMini.prototype._handleMouseDownFxn = function(e){
	this.alertAll(giau.InputFieldColorMini.EVENT_SELECT,this);
};

giau.InputFieldColorMini.prototype.value = function(v){
	if(v!==undefined){
		if(Code.isString(v)){
			v = Code.getColARGBFromString(v);
		}
		this._value = v;
		this._updateLayout();
		this.alertAll(giau.InputFieldColorMini.EVENT_CHANGE,this);
	}
	return this._value;
};

giau.InputFieldColorMini.prototype.createCheckerboardImage = function(){
	var size = 2;
	var colors = [0xFF000000,0xFFFFFFFF]; // var colors = [0xFF000000,0xFFFFFFFF,0xFFFF0000,0xFF00FF00,0xFF0000FF];
	var wid = size*colors.length;
	var hei = wid;

	var stage = Stage.instance();
	var d = new DO();
	
	var i, j;
	for(j=0; j<colors.length;++j){
		for(i=0; i<colors.length;++i){
			var offsetX = i*size;
			var offsetY = j*size;
			var color = colors[(i + j)%colors.length];
			d.graphics().setFill(color);
			d.graphics().beginPath();
			d.graphics().drawRect(offsetX,offsetY,size,size);
			d.graphics().endPath();
			d.graphics().fill();
		}
	}
	
	var img = stage.getDOAsImage(d, wid,hei, null);
	var bgImage = img.src;
	return bgImage;
};

giau.InputFieldColorMini.prototype._updateLayout = function(){
	var colorValue = this._value;
	var color = Code.getJSColorFromARGB(colorValue);
	var colorText = Code.getHexNumber(colorValue,8,true);
	Code.setStyleBackgroundColor(this._colorElement,color);
	Code.setContent(this._textElement,colorText);
};


// ------------------------------------------------------------------------------------------------------------------------ DATE MINI

giau.InputFieldDateMini = function(element, value){
	giau.InputFieldDateMini._.constructor.call(this);
	this._container = element;
	this._value = Code.getTimeStampFromMilliseconds();
	this._jsDispatch = new JSDispatch();

	var size = 20;
	var fontSize = 10;
	var fontColor = 0xFF000000;
		fontColor = Code.getJSColorFromARGB(fontColor);
	var textBGColor = 0xFFFFFFFF;
		textBGColor = Code.getJSColorFromARGB(textBGColor);

	var rowElement = Code.newDiv();
	var textElement = Code.newDiv();
	var squareElement = Code.newDiv();
	var colorElement = Code.newDiv();
	var checkerElement = Code.newDiv();
	Code.addChild(this._container, rowElement);
	Code.addChild(rowElement, squareElement);
	Code.addChild(rowElement, textElement);
	
	Code.setStyleDisplay(rowElement,"table-row");
	Code.setStyleDisplay(textElement,"table-cell");
	Code.setStyleVerticalAlign(textElement,"middle");
	Code.setStylePaddingLeft(textElement,5+"px");
	Code.setStylePaddingRight(textElement,5+"px");
	Code.setStyleFontMonospace(textElement);
	//Code.setStyleFontFamily(textElement,"monospace"); // sans-serif
	Code.setStyleFontSize(textElement,fontSize+"px");
	Code.setStyleColor(textElement,fontColor);
	Code.setStyleBackgroundColor(textElement,textBGColor);
	
	this._textElement = textElement;

	this._jsDispatch.addJSEventListener(rowElement, Code.JS_EVENT_MOUSE_DOWN, this._handleMouseDownFxn, this);
	
	this.value(value);
	this._updateLayout();
}
Code.inheritClass(giau.InputFieldDateMini, Dispatchable);

giau.InputFieldDateMini.EVENT_CHANGE = "giau.InputFieldDateMini.EVENT_CHANGE";
giau.InputFieldDateMini.EVENT_SELECT = "giau.InputFieldDateMini.EVENT_SELECT";

giau.InputFieldDateMini.prototype._handleMouseDownFxn = function(e){
	this.alertAll(giau.InputFieldDateMini.EVENT_SELECT,this);
};

giau.InputFieldDateMini.prototype.value = function(v){
	if(v!==undefined){
		this._value = v;
		this._updateLayout();
		this.alertAll(giau.InputFieldDateMini.EVENT_CHANGE,this);
	}
	return this._value;
};

giau.InputFieldDateMini.prototype._updateLayout = function(){
	var milli = this.value();
	var year = Code.getYear(milli);
	var month = Code.getMonthOfYear(milli);
	var day = Code.getDayOfMonth(milli);
	var hour = Code.getHour(milli);
	var min = Code.getMinute(milli);
	var sec = Code.getSecond(milli);
	var ms = Code.getMillisecond(milli);

	var mon = Code.monthsShort[month];
	var dow = Code.getDayOfWeek(milli);
		dow = Code.daysOfWeekShort[ (dow+Code.daysOfWeekShort.length-1)%Code.daysOfWeekShort.length ];

	day = Code.prependFixed(""+day,"0",2);
	hour = Code.prependFixed(""+hour,"0",2);
	min = Code.prependFixed(""+min,"0",2);
	sec = Code.prependFixed(""+sec,"0",2);
	ms = Code.prependFixed(""+ms,"0",4);

	var displayText = dow+" "+day+" "+mon+" "+year+" "+hour+":"+min+":"+sec+'.'+ms;

	Code.setContent(this._textElement,displayText);
};






giau.InputFieldCompositeModal = function(element, value){
	giau.InputFieldDateMini._.constructor.call(this);
	this._container = element;
	this._miniElement = Code.newDiv();
	this._maxiElement = Code.newDiv();
	this._overlay = new giau.InputOverlay();
	this._overlay.addFunction(giau.InputOverlay.EVENT_SHOW, this._handleOverlayShowFxn, this);
	this._overlay.addFunction(giau.InputOverlay.EVENT_EXIT, this._handleOverlayExitFxn, this);
	this._overlay.addFunction(giau.InputOverlay.EVENT_HIDE, this._handleOverlayHideFxn, this);
	this._overlay.addFunction(giau.InputOverlay.EVENT_LAYOUT, this._handleOverlayLayoutFxn, this);
};
Code.inheritClass(giau.InputFieldCompositeModal, Dispatchable);

giau.InputFieldCompositeModal.EVENT_CHANGE = "giau.InputFieldCompositeModal.EVENT_CHANGE";

giau.InputFieldCompositeModal.prototype._handleOverlayShowFxn = function(e){
	
};
giau.InputFieldCompositeModal.prototype._handleOverlayExitFxn = function(e){
	
};
giau.InputFieldCompositeModal.prototype._handleOverlayHideFxn = function(e){
	
};
giau.InputFieldCompositeModal.prototype._handleOverlayLayoutFxn = function(e){
	
};
giau.InputFieldCompositeModal.prototype._handleMiniSelectFxn = function(e){
	this.show();
};
giau.InputFieldCompositeModal.prototype.show = function(e){
	var value = this._mini.value();
	this._maxi.value(value);
	this._overlay.show(this._maxiElement);
	//this._layoutMaxi();
	this._overlay.centerContent();
};
giau.InputFieldCompositeModal.prototype._handleMaxiChangeFxn = function(e){
	var value = this._maxi.value();
	this._mini.value(value);
	this.alertChanged();
};
giau.InputFieldCompositeModal.prototype.gotoMin = function(v){
	Code.removeAllChildren(this._container);
	Code.addChild(this._container, this._miniElement);
};
giau.InputFieldCompositeModal.prototype.gotoMax = function(v){
	Code.removeAllChildren(this._container);
	Code.addChild(this._container, this._maxiElement);
};
giau.InputFieldCompositeModal.prototype._layoutMaxi = function(v){ // place next to the mini element: start at below, above, right, left, center-to-screen
	/*
	var maxi = this._maxiElement;
	var mini = this._miniElement;
		Code.setStyleBackgroundColor(maxi,"#FF0000");
	
	var parent = Code.getParent(maxi);
	
	var topMini = Code.getElementTopAbsolute(mini);
	var leftMini = Code.getElementLeftAbsolute(mini);
	var widthMini = Code.getElementWidth(mini);
	var heightMini = Code.getElementHeight(mini);

	var widthParent = Code.getElementWidth(parent);
	var heightParent = Code.getElementHeight(parent);

	var widthMaxi = Code.getElementWidth(maxi);
	var heightMaxi = Code.getElementHeight(maxi);
	
	// center
	offX = (widthParent - widthMaxi) * 0.5;
	offY = (heightParent - heightMaxi) * 0.5;
		offX = Math.floor(offX);
		offY = Math.floor(offY);
	Code.setStyleLeft(maxi,offX+"px");
	Code.setStyleTop(maxi,offY+"px");
	Code.setStylePosition(parent,"relative");
	Code.setStylePosition(maxi,"absolute");
	*/
};
giau.InputFieldCompositeModal.prototype.alertChanged = function(){
	console.log("alertChanged");
	this.alertAll(giau.InputFieldCompositeModal.EVENT_CHANGE,this);
}
giau.InputFieldCompositeModal.prototype.updateLayout = function(value){
	//this.value(this.value);
}
giau.InputFieldCompositeModal.prototype.value = function(value){
	if(this._maxi){
		this._maxi.value(value);
	}
	if(this._mini){
		this._mini.value(value);
		return this._mini.value();
	}
	return null;
};





giau.InputFieldDateModal = function(element, value){
	Code.constructorClass(giau.InputFieldDateModal, this, element, value);

	Code.setStyleWidth(this._maxiElement,250+"px");
	Code.setStyleHeight(this._maxiElement,150+"px");

	this._mini = new giau.InputFieldDateMini(this._miniElement, value);
		this._mini.addFunction(giau.InputFieldDateMini.EVENT_SELECT, this._handleMiniSelectFxn, this);
	var max = this._maxiElement;
	this._maxi = new giau.InputFieldDate(max, value);
		this._maxi.addFunction(giau.InputFieldDate.EVENT_CHANGE, this._handleMaxiChangeFxn, this);
	
	this.gotoMin();
};
Code.inheritClass(giau.InputFieldDateModal, giau.InputFieldCompositeModal);


giau.InputFieldColorModal = function(element, value){
	Code.constructorClass(giau.InputFieldColorModal, this, element, value);
	
	Code.setStyleWidth(this._maxiElement,250+"px");
	Code.setStyleHeight(this._maxiElement,150+"px");

	this._mini = new giau.InputFieldColorMini(this._miniElement, value);
		this._mini.addFunction(giau.InputFieldColorMini.EVENT_SELECT, this._handleMiniSelectFxn, this);
	var max = this._maxiElement;
	this._maxi = new giau.InputFieldColor(max, value);
		this._maxi.addFunction(giau.InputFieldColor.EVENT_CHANGE, this._handleMaxiChangeFxn, this);
	
	this.gotoMin();
};
Code.inheritClass(giau.InputFieldColorModal, giau.InputFieldCompositeModal);


giau.InputFieldTextModal = function(element, value, criteria, stylingFxn){
	Code.constructorClass(giau.InputFieldTextModal, this, element, value);
	//giau.InputFieldTextModal._.constructor.call(this, element, value);
	Code.setStyleWidth(this._maxiElement,400+"px");
	Code.setStyleHeight(this._maxiElement,200+"px");

	this._mini = new giau.InputFieldTextMini(this._miniElement, value, stylingFxn);
		this._mini.addFunction(giau.InputFieldTextMini.EVENT_SELECT, this._handleMiniSelectFxn, this);
	var max = this._maxiElement;
	this._maxi = new giau.InputFieldText(max, value, criteria);
		//this._maxi.addFunction(giau.InputFieldText.EVENT_CHANGE, this._handleMaxiChangeFxn, this);
	this.gotoMin();
};
Code.inheritClass(giau.InputFieldTextModal, giau.InputFieldCompositeModal);

giau.InputFieldTextModal.prototype._handleOverlayExitFxn = function(e){
	giau.InputFieldTextModal._._handleOverlayExitFxn.call(this,e);
	this._handleMaxiChangeFxn(null);
};

giau.InputFieldTextModal.prototype.show = function(e){
	console.log("InputFieldTextModal show");
	console.log(this);
	console.log(giau.InputFieldTextModal._);
	giau.InputFieldTextModal._.show.call(this,e);
	this._maxi.getFocus();
};



giau.InputFieldDurationModal = function(element, value){
	Code.constructorClass(giau.InputFieldDurationModal, this, element, value);
	
	Code.setStyleWidth(this._maxiElement,250+"px");
	Code.setStyleHeight(this._maxiElement,150+"px");

	this._mini = new giau.InputFieldDurationMini(this._miniElement, value);
		this._mini.addFunction(giau.InputFieldDurationMini.EVENT_SELECT, this._handleMiniSelectFxn, this);
	var max = this._maxiElement;
	this._maxi = new giau.InputFieldDuration(max, value);
		this._maxi.addFunction(giau.InputFieldDuration.EVENT_CHANGE, this._handleMaxiChangeFxn, this);
	
	this.gotoMin();
};
Code.inheritClass(giau.InputFieldDurationModal, giau.InputFieldCompositeModal);







/*
handle approve
handle cancel
*/

giau.InputOverlay = function(){
	giau.InputOverlay._.constructor.call(this);
	this._jsDispatch = new JSDispatch();
	this._elementCover = Code.newDiv();
	this._elementContent = Code.newDiv();
	this._parent = Code.documentBody();
	this._scrollLocation = new V2D();
	this._killOnExit = false;
}
Code.inheritClass(giau.InputOverlay, Dispatchable);
giau.InputOverlay.EVENT_SHOW = "SHOW";
giau.InputOverlay.EVENT_HIDE = "HIDE";
giau.InputOverlay.EVENT_EXIT = "EXIT_OUTSIDE";
giau.InputOverlay.EVENT_LAYOUT = "LAYOUT_CHANGE";

giau.InputOverlay.prototype._handleScrollFxn = function(e,f){
	//return;
	// does nothing
	// Code.stopEventPropagation(e);
	// Code.eventPreventDefault(e);
	var left = this._scrollLocation.x;
	var top = this._scrollLocation.y;
	// disable swiping:
	window.scrollTo(left,top); // reposition to before-scroll location
}
giau.InputOverlay.prototype._handleCoverMouseDownFxn = function(e,f){
	var target = Code.getTargetFromEvent(e);
	if(target!==this._elementCover && target!==this._elementContent){
		return;
	}
	this.alertAll(giau.InputOverlay.EVENT_EXIT, this);
	this.hide();
	if(this._killOnExit){
		this.kill();
	}
}
giau.InputOverlay.prototype.elementContainer = function(){
	return this._elementContent;
};
giau.InputOverlay.prototype.setContent = function(ele){
	Code.removeAllChildren(this._elementContent);
	Code.addChild(this._elementContent,ele);
};
giau.InputOverlay.prototype.show = function(ele){
	// record state
	if(ele){
		this.setContent(ele);
	}
	var location = Code.getPageScrollLocation();
	var left = location["left"];
	var top = location["top"];
	this._scrollLocation.set(left,top);
	// add elements
	var parent = this._parent;
	Code.addChild(parent,this._elementCover);
		Code.addChild(this._elementCover,this._elementContent);
	this._addListeners();
	this.alertAll(giau.InputOverlay.EVENT_SHOW, this);
	this.updateLayout();
}
giau.InputOverlay.prototype.hide = function(){
	Code.removeFromParent(this._elementCover);
	// let client do any removing ??
	// for(var i=0; i<Code.numChildren(this._elementContent); ++i){
	// 	var child = Code.getChild(this._elementContent, i);
	// }
	this._removeListeners();
	this.alertAll(giau.InputOverlay.EVENT_HIDE, this);
}
giau.InputOverlay.prototype.updateLayout = function(){
	this._updateLayout();
	this.alertAll(giau.InputOverlay.EVENT_LAYOUT, this);
}
giau.InputOverlay.prototype.centerContent = function(){
	this.updateLayout();
	// now do centering:
	//Code.setStyleMarginLeft(this._content,"");
	var child = Code.getChild(this._elementContent, 0);
	var parent = Code.getParent(child);
	var widthParent = Code.getElementWidth(parent);
	var heightParent = Code.getElementHeight(parent);
	var widthChild = Code.getElementWidth(child);
	var heightChild = Code.getElementHeight(child);

	offX = (widthParent - widthChild) * 0.5;
	offY = (heightParent - heightChild) * 0.5;
		offX = Math.floor(offX);
		offY = Math.floor(offY);
	Code.setStyleLeft(child,offX+"px");
	Code.setStyleTop(child,offY+"px");
	Code.setStylePosition(parent,"relative");
	Code.setStylePosition(child,"absolute");
}
giau.InputOverlay.prototype._updateLayout = function(){
	// set to 0 pre-test
	Code.removeFromParent(this._elementCover);
	// Code.setStyleLeft(this._elementCover,0+"px");
	// Code.setStyleTop(this._elementCover,0+"px");
	// Code.setStyleWidth(this._elementCover,0+"px");
	// Code.setStyleHeight(this._elementCover,0+"px");
	// get real size
	var parent = this._parent;
	var parentWidth = Code.getElementWidth(parent);
	var parentHeight = Code.getElementHeight(parent);
	// apply
		Code.addChild(parent,this._elementCover);
	Code.setStyleBackgroundColor(this._elementCover,Code.getJSColorFromARGB(0xCC000000));
	Code.setStylePosition(this._elementCover,"absolute");
	Code.setStyleLeft(this._elementCover,0+"px");
	Code.setStyleTop(this._elementCover,0+"px");
	Code.setStyleWidth(this._elementCover,parentWidth+"px");
	Code.setStyleHeight(this._elementCover,parentHeight+"px");
	Code.setStyleZIndex(this._elementCover,Code.INT_MAX_VALUE+"");
	//
	this._setContentToViewport();
}
giau.InputOverlay.prototype._setContentToViewport = function(){
		var insetSize = 10;
		var windowSize = Code.getWindowSize();
		var pageSize = Code.getPageSize();
		var scrollLocation = Code.getPageScrollLocation();
			var left = scrollLocation["left"];
			var top = scrollLocation["top"];
		
		var pageWidth = pageSize["width"];
		var pageHeight = pageSize["height"];

		var windowWidth = windowSize["width"];
		var windowHeight = windowSize["height"];

		var windowOffsetLeft = scrollLocation["left"];
		var windowOffsetTop = scrollLocation["top"];

		var offsetLeft = windowOffsetLeft + insetSize; // windowOffsetLeft + Math.floor((windowWidth-contentWidth)*0.5);
		var offsetTop = windowOffsetTop + insetSize; // windowOffsetTop + Math.floor((windowHeight-contentHeight)*0.5);
		var contentWidth = windowWidth - insetSize*2;
		var contentHeight = windowHeight - insetSize*2;
		var element = this._elementContent;
		Code.setStyleWidth(element,contentWidth+"px");
		Code.setStyleHeight(element,contentHeight+"px");
		Code.setStyleBackgroundColor(element,Code.getJSColorFromARGB(0x00000000));
		Code.setStyleDisplay(element,"inline-block");
		Code.setStylePosition(element,"relative");
		Code.setStyleTop(element,offsetTop+"px");
		Code.setStyleLeft(element,offsetLeft+"px");
		Code.setStyleTextAlign(element,"center");
		Code.setStyleVerticalAlign(element,"middle");
}
giau.InputOverlay.prototype._addListeners = function(){
	this._jsDispatch.addJSEventListener(Code.getWindow(), Code.JS_EVENT_SCROLL, this._handleScrollFxn, this);
	this._jsDispatch.addJSEventListener(this._elementCover, Code.JS_EVENT_MOUSE_DOWN, this._handleCoverMouseDownFxn, this);
	this._jsDispatch.addJSEventListener(Code.getWindow(), Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
}
giau.InputOverlay.prototype._removeListeners = function(){
	this._jsDispatch.removeJSEventListener(Code.getWindow(), Code.JS_EVENT_SCROLL, this._handleScrollFxn, this);
	this._jsDispatch.removeJSEventListener(this._elementCover, Code.JS_EVENT_MOUSE_DOWN, this._handleCoverMouseDownFxn, this);
	this._jsDispatch.removeJSEventListener(Code.getWindow(), Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
}
giau.InputOverlay.prototype._handleWindowResizedFxn = function(e){
	this.updateLayout();
}
giau.InputOverlay.prototype.kill = function(){
	Code.removeChild(this._elementContent);
	Code.removeChild(this._elementCover);
	this._jsDispatch.kill();
	this._elementContent = null;
	this._elementCover = null;
	this._jsDispatch = null;
	this._.kill.call(this);
}





