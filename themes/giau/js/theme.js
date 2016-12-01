


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
	// var listener = function(e){
	// 	console.log(e);
	// 	THIS._mousePosition = new V2D(e.clientX,e.clientY);
	// }
	// var _jsDispatch = new JSDispatch();
	// _jsDispatch.addJSEventListener(document.body, Code.JS_EVENT_MOUSE_MOVE, listener);
THIS = this;
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
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();

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
			// Code.addClass(div,"calendarEventListItemDate");
//			Code.setStyleColor(div,noEventsTextColor);
			// Code.setStyleVerticalAlign(div,"top");
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
	// <div data-icon-key="icon_default" data-icon-value="./wp-content/themes/giau/img/file_browser/icon_fb_blank.png">
	// 	<div data-icon-key="icon_folder" data-icon-value="./wp-content/themes/giau/img/file_browser/icon_fb_folder.png">
	// 	<div data-icon-key="icon_image_background" data-icon-value="./wp-content/themes/giau/img/file_browser/icon_fb_image_background.png">

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
	

	//this._dragTarget = div;


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
	//this._updateLayout();
	//this.createDirectory("test");
	//this.removeFile("giau_settings_icon.png");
	//this.removeFile("test");
	//this.removeFile("/");
	//this.removeFile("");
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
	
	console.log("model:",this._dataModel);
	console.log("insta:",this._dataInstance);

	this.initialize();
	/*
	var div = Code.newInputButton("SAVE/UPDATE ?");
		Code.setStyleBackgroundColor(div,"#FCC");
	this._submitButton = div;
	Code.addChild(this._container,this._submitButton);
	this._jsDispatch.addJSEventListener(this._submitButton, Code.JS_EVENT_CLICK, this._handleSubmitClickFxn, this);
	*/
}
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
		console.log("primitive?");
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

giau.ObjectComposer.prototype._handlePrimitiveUpdate = function(e,d){
	var element = d["element"];
	var container = d["container"];
	var field = d["field"];
	var model = d["model"];
	var inputElement = d["input"];
	var value = Code.getInputTextValue(inputElement);
	container[field] = value; // update data object
	console.log(this._dataInstance);
}

giau.ObjectComposer.prototype.fillOutModelFromElementArray = function(element,modelFieldInfo,array,field, superModel){
	var modelFieldType = modelFieldInfo["type"];
	var modelSubType = giau.ObjectComposer.fieldTypeArraySubtype(modelFieldType);
	console.log("\t=> array of "+modelSubType);
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
		label = this.defaultInputRowLabelObject(div,""+name);
		label = div;
		holder = element;
	}else if(type=="object"){
		label = this.defaultInputRowLabelObject(div,""+name);
		label = div;
		holder = element;
	}else if(type=="primitive"){
		var value = container[field];
		var input = this._inputTextField(div,field, value);
		label = input["container"];
		var textElement = input["input"];
			var data = {"element": element, "input":textElement, "container": container, "field": field};
			this._jsDispatch.addJSEventListener(textElement, Code.JS_EVENT_INPUT_CHANGE, this._handlePrimitiveUpdate, this, data);
		holder = element;
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
	}
	if(found && instanceObject){
		var primitive = null;
		if(isArray){
			var i, len = instanceObject.length;
			for(i=0;i<len;++i){
				primitive = instanceObject[i];
				var subElement = this.newSubElement(element,null,"primitive", instanceObject,i, modelObject, instanceObject, superModel);
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
	var isBoolean = s=="number" || giau.ObjectComposer.fieldTypeStringSubtype(s)=="numbner";
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





giau.ObjectComposer.prototype._inputTextField = function(element, key,value){
	var radius = 4;
	var div = element;
	var content = Code.newDiv();
	var label = this.defaultInputRowLabelPrimitive(div, ""+key);
	var input = Code.newInputText();
		Code.setStyleBorder(input,"solid");
		Code.setStyleBorderWidth(input,1+"px");
		Code.setStyleBorderColor(input,"#CCC");
		Code.setStyleBorderRadius(input,0+"px "+radius+"px "+radius+"px "+0+"px");
		Code.setStyleBackgroundColor(input,"#FFF");
		Code.setStyleDisplay(input,"inline-block");
		Code.setStyleColor(input,"#000");
		Code.setStylePadding(input,"2px");
		Code.setStyleFontSize(input,11+"px");
		Code.setTextPlaceholder(input,"(empty)");
	Code.addChild(content,label);
	Code.addChild(content,input);
	Code.addChild(div,content);
	if(value){
		Code.setInputTextValue(input,value);
	}
	return {"container":content, "input":input};
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
giau.ObjectComposer.prototype.defaultInputRowLabel = function(element, title){
	var bgColor = giau.Theme.Color.MediumRed;//0xFFFFFFFF;
		// console.log(bgColor);
		// bgColor = Code.getJSColorFromARGB(bgColor);
	div = Code.newDiv();
	Code.setStylePaddingTop(div,"4px");
	Code.setStylePaddingBottom(div,"4px");
	Code.setStylePaddingRight(div,"4px");
	Code.setStylePaddingLeft(div,"4px");
	Code.setStyleBackgroundColor(div,bgColor);
		Code.setStyleBorder(div,"solid");
		Code.setStyleBorderWidth(div,1+"px");
		Code.setStyleBorderColor(div,giau.Theme.Color.LightRed);
	Code.setStyleDisplay(div,"inline-block");
	Code.setStyleColor(div,"#FFF");
	Code.setStyleFontSize(div,12+"px");
	if(element){
		Code.addChild(element,div);
	}
	if(title){
		Code.setContent(div, title)
	}
	return div;
}
giau.ObjectComposer.prototype.defaultInputRowLabelObject = function(element, title){
	var radius = 2;
	var div = this.defaultInputRowLabel(element, title);
		Code.setStyleBorderRadius(div,radius+"px");
	return div;
}
giau.ObjectComposer.prototype.defaultInputRowLabelPrimitive = function(element, title){
	var radius = 4;
	var div = this.defaultInputRowLabel(element, title);
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
	this._displayData = {};
	if(Code.hasProperty(this._container,propertyDataDisplayTitle)){
		this._displayData["title"] = Code.getProperty(this._container, propertyDataDisplayTitle);
		Code.removeProperty(this._container, propertyDataDisplayTitle);
	}
	if(Code.hasProperty(this._container,propertyDataDisplaySubtitle)){
		this._displayData["subtitle"] = Code.getProperty(this._container, propertyDataDisplaySubtitle);
		Code.removeProperty(this._container, propertyDataDisplaySubtitle);
	}
	if(Code.hasProperty(this._container,propertyDataDisplayImage)){
		this._displayData["image"] = Code.getProperty(this._container, propertyDataDisplayImage);
		Code.removeProperty(this._container, propertyDataDisplayImage);
	}
	if(Code.hasProperty(this._container,propertyDataDisplayValue)){
		this._displayData["value"] = Code.getProperty(this._container, propertyDataDisplayValue);
		Code.removeProperty(this._container, propertyDataDisplayValue);
	}

	
	for(i=0; i<Code.numChildren(this._container); ++i){ 
		var child = Code.getChild(this._container,i);
		if(Code.hasProperty(child,propertyDataParamKey)){
			var key = Code.getProperty(child, propertyDataParamKey);
			var value = Code.getProperty(child, propertyDataParamValue);
			Code.removeChild(this._container, child);
			params[key] = value;
		}
	}
	this._name = name;

	this._dataSource = new giau.DataSource(url,20, params);
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

giau.LibraryScroller._generateDiv = function(info, data, displayData){
	var bus = giau.MessageBus();
	this._messageBus = bus;
	console.log("displayData");
	console.log(data);
	console.log(displayData);

	//console.log(data);
	var dataSectionModified = data["section_modified"];
		dataSectionModified = Code.getHumanReadableDateString(dataSectionModified);
	var dataValue = data[ displayData["value"] ];
	var dataTitle = data[ displayData["title"] ];
	var dataIndex = info["index"];

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
		Code.setContent(elementID,"#"+dataIndex+" ("+dataValue+")");
		Code.setStyleFontSize(elementID,"10px");
		Code.setStyleColor(elementID,"#DBB");
	var elementName = Code.newDiv();
		Code.setContent(elementName,dataTitle);
		Code.setStyleFontSize(elementName,"12px");
		Code.setStyleColor(elementName,"#FFF");
	var elementModified = Code.newDiv();
		Code.setContent(elementModified,dataSectionModified);
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
	console.log(this);
	var displayData = this._displayData;
	// source vars
	// var widthContainer = $(this._container).width();
	// var heightContainer = $(this._container).height();
	var widthContainer = $(this._elementScroller).width();
	var heightContainer = $(this._elementScroller).height();
	// var widthContainer = $(this._elementContents).width();
	// var heightContainer = $(this._elementContents).height();
	widthContainer -= this._scrollBarSize;
	//var divSizeY = 60;
	var divSpacingY = 0;

	// derived vars
	var data = this._dataRows;
	var i;
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
		var div = this._createElementFxn(info, row, displayData);
		Code.addChild(this._elementScroller,div);
		offsetY += elementHeight;
		if(i<data.length-1){
			offsetY += divSpacingY;
		}
		var datum = {}
			datum["element"] = div;
			datum["display"] = row[displayData["title"]];
			datum["value"] = row[displayData["value"]];
				datum["value"] = // TODO: GET THIS FROM METADATA
				{"17":{
						"id": "17",
						"widget_name": "SOMETHING 17",
					}
				};
			datum["source"] = row;
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_MOUSE_DOWN, this._handleElementMouseDownFxn, this, datum);
		// 

	}
	//Code.setStyleWidth(this._elementContents,120+"px");
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
	console.log("_updateWithData");
	var offset = data["offset"];
	var count = data["count"];
	var rows = data["data"];
	var metadata = data["metadata"];
	console.log("my meta:");
	console.log(metadata);
	//var FA = new FragArray();
	//this._dataRows = FA;
	this._dataRows = rows;
	this._updateLayout();
}
giau.LibraryScroller.prototype._scrollTo = function(){
	//
}
giau.LibraryScroller.prototype._scrollTo = function(){
	//
}




giau.DataSource = function(url, itemsPerPage, params){
	giau.DataSource._.constructor.call(this);
	this._arrayWindow = [];
	this._url = (url!==undefined && url!==null) ? url : "./";
	this._urlParams = params;
	this._itemsPerPage = 10;
	this._currentPageIndex = 0;
}
Code.inheritClass(giau.DataSource, Dispatchable);

giau.DataSource.EVENT_PAGE_DATA = "EVENT_PAGE_DATA";
giau.DataSource.prototype.getPage = function(pageToGet){
	this._currentPage = 0;
	this._pageCount = 10;
	var start = this._currentPage * this._pageCount;
	var end = start + this._pageCount;
	var count = end-start;

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

	// this._elementLibrary = Code.newDiv();
	// Code.addChild(this._container,this._elementLibrary);
	// this._library = new giau.LibraryScroller(this._elementLibrary);

	// display hierarchy
	// this._elementSortingContainer = Code.newDiv();
	// this._elementToolsContainer = Code.newDiv();
	// this._elementTableContainer = Code.newDiv();

	this._elementContainer = Code.newDiv();
	this._elementTools = Code.newDiv();
	this._elementOrdering = Code.newDiv();
	this._elementTable = Code.newDiv();
	Code.addChild(this._container,this._elementContainer);
	
		Code.addChild(this._elementContainer,this._elementOrdering);
		Code.addChild(this._elementContainer,this._elementTools);
		Code.addChild(this._elementContainer,this._elementTable);
		//Code.addChild(this._elementContainer,this._elementTable);


	// CONTAINER
	Code.setStyleWidth(this._elementContainer,"100%");
	Code.setStyleHeight(this._elementContainer,"100%");
	// Code.setStyleMinHeight(this._elementTable,500+"px");
	// Code.setStyleMaxHeight(this._elementTable,800+"px");
	// Code.setStylePosition(this._elementTable,"relative");
	Code.setStyleDisplay(this._elementContainer,"inline-block");
	Code.setStyleBackgroundColor(this._elementContainer,"#00F");

	// TOOLS
	Code.setStyleWidth(this._elementTools,"100%");
	//Code.setStyleMinHeight(this._elementTools,50+"px");
	Code.setStyleDisplay(this._elementTools,"inline-block");
	Code.setStyleBackgroundColor(this._elementTools,"#F0F");
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
	//Code.setStyleHeight(this._elementTable,500+"px");
	// Code.setStyleMinHeight(this._elementTable,500+"px");
	// Code.setStyleMaxHeight(this._elementTable,800+"px");
	Code.setStyleMinHeight(this._elementTable,100+"px");
	Code.setStylePosition(this._elementTable,"relative");
	Code.setStyleDisplay(this._elementTable,"inline-block");
	Code.setStyleBackgroundColor(this._elementTable,giau.Theme.Color.backgroundLight);
	// Code.setStyleLeft(this._elementTable,interriorPadding+"px");
	// Code.setStyleTop(this._elementTable,interriorPadding+"px");


	// simulate got data:
/*
	section
	languagization
	bio
	calendar
	page
	widget
*/
	var dataTableName = "section";
	
	this._dataSource = new giau.DataSource("./",20, {"table":dataTableName} );
	this._dataSource.addFunction(giau.DataSource.EVENT_PAGE_DATA, this._updateWithData, this);
	this._dataSource.getPage(0);


	this._dataCRUD = new giau.DataCRUD("./", {"operation":"crud_data", "table":dataTableName} );

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
	console.log("READ");
	console.log(data);
	// get primary key index value
	var passBack = {};
		passBack["index"] = data["index"];
		passBack["value"] = data["value"];
	// request get with primary key
	var jsonData = {};
	jsonData[ data["index"] ] = data["value"];
	var jsonString = Code.StringFromJSON(jsonData);
	this._dataCRUD.read(jsonString, passBack);
}
giau.CRUD.prototype._handleUpdateFxn = function(e,data){
	// console.log("UPDATE");
	// console.log(data);
		var dataInfo = this._dataView["data"];
		var dataFields = dataInfo["fields"];
	var criteriaIndex = data["index"];
	var criteriaValue = data["value"];
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
	if(rowData){
		console.log(rowData)
		var row = rowData["row"];
		var updateData = {};
		for(var i=0; i<row.length; ++i){
			var mapping = row[i];
			var index = mapping.field();
			var field = dataFields[index];
			//console.log(field)
			var attr = field["attributes"];
			var pres = field["presentation"];
console.log("field: "+index);
			//console.log(prop)
			if(attr["editable"]==="true" || attr["primary_key"]==="true"){
				if(pres && pres["json_model_column"]){ // json configuration
					console.log(mapping.value())
					var json = mapping.value().instance();
					console.log(json);
					var str = Code.StringFromJSON(json);
					updateData[index] = str;
					console.log(str);
				}else{
					updateData[index] = mapping.value();
				}
			}
		}
console.log("+++++++++");
console.log(updateData);
console.log("---------");
//return;
		//{"text":"PAGE_DEPARTMENT_ELEMENTARY_SECTION_7","class":"departmentDescriptionItemInfo","style":""}"
		//updateData["section_configuration"] = "richie ";
		console.log(updateData);
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
	var passBack = {};
		passBack["index"] = keyIndex;
		passBack["value"] = keyValue;
	var jsonData = {};
	jsonData[ data["index"] ] = data["value"];
	var jsonString = Code.StringFromJSON(jsonData);
	var name = keyIndex+" : "+keyValue;
	var alertDelete = confirm("are you sure you want to delete\n"+name+" ?");
	if(alertDelete){
		this._dataCRUD.remove(jsonString, passBack);
	}
}

giau.CRUD.prototype._handleCreateCompleteFxn = function(e,d){
	console.log("CREATE COMPLETE");
	console.log(e);
	console.log(d);
	var source = e["source"];
	var data = e["data"];
	// get back new row
	var row = data;
	//
	var view = this._dataView;
	var fields = view["data"]["fields"];
	var editFields = view["data"]["edit_fields"];
	var rows = view["rows"];
	var viewRow = [];
// console.log(fields);
// console.log(editFields);
// console.log(rows);
// console.log(viewRow);
	var j;
	for(j=0; j<editFields.length; ++j){
		var field = editFields[j];
		var column = field["column"];
		var alias = field["alias"];
		var mapping = this._mappingFromData(field,row,alias);
		viewRow.push(mapping);
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
	var sourceData = e["data"];
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
	if(rowData && sourceData){
		var row = rowData["row"];
		// UPDATE VALUES / CONTAINERS
		for(var i=0; i<row.length; ++i){
			// REPLACE WITH NEW:
			var mapping = row[i];
			var field = mapping.field();
			var sourceValue = sourceData[field];
			if(mapping!==null){
				var action = {"action":"update","data":{"value":sourceValue}};
				mapping.updateDataFromAction(action);
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
	var rowData = this._dataRowFromKeyValue(criteriaIndex, criteriaValue);
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
				var value = mapping.value();
				if(value===criteriaValue){
					return {"index":i, "row":row};
				}
			}
		}
	}
	return null;
}

giau.CRUD.prototype._updateWithData = function(data){
	console.log("CRUD._updateWithData");
	console.log(data);
	var offset = data["offset"];
	var count = data["count"];
	var rows = data["data"];
	var definition = data["definition"];
	var columns = definition["columns"];
	var presentation = definition["presentation"];
	var columnPresentations = presentation["columns"];
	var metadata = data["metadata"];

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
	view["data"]["metadata"] = metadata;
	view["data"]["fields"] = lookupFields;
	view["data"]["edit_fields"] = editFields;
	this._searchFields = searchFields;
	this._rowElements = [];

	for(i=0; i<rows.length; ++i){
		var row = rows[i];
		var viewRow = [];
		view["rows"].push(viewRow);
		for(j=0; j<editFields.length; ++j){
			var field = editFields[j];
			var column = field["column"];
			var alias = field["alias"];
			var mapping = this._mappingFromData(field,row,alias);
			viewRow.push(mapping);
		}
	}
	this._updateLayout();
}
giau.CRUD.prototype._updateLayout = function(){
	console.log("CRUD updateLayout");
	console.log(this)
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
	console.log(fields);
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

/*
		id int NOT NULL AUTO_INCREMENT,
		created VARCHAR(32) NOT NULL,
		modified VARCHAR(32) NOT NULL,
		hash_index VARCHAR(255) NOT NULL,
		language VARCHAR(16) NOT NULL,
		phrase_value TEXT NOT NULL,
		UNIQUE KEY id (id)
*/

giau.CRUD._elementSelectDate = function(){
	var elementContainer = Code.newDiv();
	return elementContainer;
}
giau.CRUD._elementSelectColor = function(){
	var elementContainer = Code.newDiv();
	return elementContainer;
}

giau.CRUD._elementSelectDate = function(mapping){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];
	console.log("BEFORE: "+value);
	value = Code.getHumanReadableDateString(value);
	console.log("AFTER: "+value);

	var elementContainer = Code.newInputTextArea();
	Code.setStyleFontFamily(elementContainer,"monospace");
	Code.setStyleFontSize(elementContainer,11+"px");
	Code.setStyleColor(elementContainer,"#000");
	Code.setStyleWidth(elementContainer,"100%");
	Code.setStyleBackgroundColor(elementContainer,"#FFF");
	Code.setStyleBorderColor(elementContainer,"#CCC");
	Code.setStyleBorderWidth(elementContainer,1+"px");
	Code.setTextAreaValue(elementContainer,""+value);
	return elementContainer;
}

giau.CRUD._elementSelectString = function(mapping){
	var object = mapping.object();
	var field = mapping.field();
	var value = object[field];

	console.log("_elementSelectString")
	console.log(mapping)
	console.log(object)
	console.log(field)
	console.log(value)
	var elementContainer = Code.newInputTextArea();
	Code.setStyleFontFamily(elementContainer,"monospace");
	Code.setStyleFontSize(elementContainer,11+"px");
	Code.setStyleColor(elementContainer,"#000");
	Code.setStyleWidth(elementContainer,"100%");
	Code.setStyleBackgroundColor(elementContainer,"#FFF");
	Code.setStyleBorderColor(elementContainer,"#CCC");
	Code.setStyleBorderWidth(elementContainer,1+"px");
	Code.setTextAreaValue(elementContainer,""+value);
	return elementContainer;
}

giau.CRUD._elementSelectDiscrete = function(mapping, dd, metadata){
	var elementContainer = Code.newDiv();
		Code.setStyleBackgroundColor(elementContainer,"#EEE");
		Code.setStyleBorderColor(elementContainer,"#CCC");
		Code.setStyleBorder(elementContainer,"solid");
		Code.setStyleBorderWidth(elementContainer,1+"px");
		Code.setStyleMinHeight(elementContainer,24+"px");
		Code.setStylePadding(elementContainer,2+"px");
		Code.setStyleBorderRadius(elementContainer,4+"px");
	Code.setProperty(elementContainer,"data-value","true");

	var bus = giau.MessageBus();
	var obj = {"bus":bus, "element":elementContainer, "mapping":mapping};//, "drag_and_drop":dd, "metadata":metadata};
	bus.addFunction(giau.MessageBus.EVENT_OBJECT_DRAG_SELECT, giau.CRUD._handleDragSelectFxn, this, obj);
	return elementContainer;
}

giau.CRUD._handleDragSelectFxn = function(e, f){ // e is passed by self, f is passed by alert
	var mapping = e["mapping"]
	var myCriteria = mapping._OTHER["drag_and_drop"];
		var mySource = myCriteria["source"];
			var myName = mySource["name"];
	var metadata = e["metadata"];
	var criteria = f["criteria"];
	if(criteria){
		var name = criteria["name"];
		console.log(name,myName);
		if(name===myName){
			console.log("made it in ....");
			var bus = e["bus"];
			var element = e["element"];
			var mapping = e["mapping"];
			var ctx = {"element":element, "mapping":mapping};//, "drag_and_drop":myCriteria, "metadata":metadata};
				var lef = $(element).offset().left;
				var top = $(element).offset().top;
				var wid = $(element).outerWidth();
				var hei = $(element).outerHeight();
			var rect = new Rect(lef,top, wid,hei);
			var obj = {"rect": rect, "fxn": giau.CRUD._handleDragLifecycleFxn, "ctx": ctx};
			bus.alertAll(giau.MessageBus.EVENT_OBJECT_DRAG_AVAILABLE, obj);
		}
	}
}

/*
(sections)

initially set VALUE from source
initially set DISPLAY ??????
	- look up on server -- mapping
	- lookup table server

how to delete from list?
	- data-index



*/
giau.CRUD._handleDragLifecycleFxn = function(event, data){
	if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_START){
		//console.log("START");
	}else if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_STOP){
		//console.log("STOP");
	}else if(event==DragNDrop.EVENT_DRAG_INTERSECT_AREA_DROP){
		// console.log("DROP");
		var mapping = this["mapping"];

		// update element data rep:
		var element = this["element"];
		if(element){
			var valueArrayString = Code.getProperty(element,"data-value");
			valueArray = Code.arrayFromCommaSeparatedString(valueArrayString);
			valueArrayString = valueArray.join(",");
			Code.setProperty(element,"data-value",valueArrayString);
			//Code.setContent(element,"new value: "+valueArrayString);
		}
		data = {"action":"append", "data":data, "context":this}; // custom addition
		mapping.updateDataFromAction(data);
		mapping.updateElementFromData();
	}
}
giau.CRUD._boxActionHandle = function(event){
	console.log("handle", this)
}
giau.CRUD._boxActionClose = function(event){
	console.log("close", event, this)
	var mapping = this["context"];
	var index = this["index"];
	var object = mapping.object();
	var data = {"action":"remove", "data":{"index":index}};
	mapping.updateDataFromAction(data);
	mapping.updateElementFromData();
}

giau.CRUD._fieldEditDate = function(definition, container, fieldName, elementContainer, mapping){
	var elementText = giau.CRUD._elementSelectDate(mapping);
		Code.addChild(elementContainer,elementText);
}

giau.CRUD._fieldEditString = function(definition, container, fieldName, elementContainer, mapping){
	var presentation = definition["presentation"];
	var metadata = definition["metadata"];
	var value = container[fieldName];
	if(presentation && presentation["drag_and_drop"]){ // DRAG AND DROP
		// update mapping
		mapping.updateElementFxn(giau.CRUD._fieldEditCommaSeparatedStringUpdateElementFxn);
		mapping.updateDataFxn(giau.CRUD._fieldEditCommaSeparatedStringUpdateDataFxn);
			var dd = presentation["drag_and_drop"];
			mapping._OTHER = {"metadata":metadata, "drag_and_drop":dd};
		var elementDrop = giau.CRUD._elementSelectDiscrete(mapping);
		Code.addChild(elementContainer,elementDrop);
	}else{ // TEXTFIELD
		mapping.updateElementFxn(giau.CRUD._fieldEditStringPrimitiveUpdateElementFxn);
		mapping.updateDataFxn(giau.CRUD._fieldEditStringPrimitiveUpdateDataFxn);
		var elementText = giau.CRUD._elementSelectString(mapping,value);
		Code.addChild(elementContainer,elementText);
		console.log(mapping.element());
		var data = {"mapping":mapping};
		console.log(mapping);
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
	console.log("UPDATE ELEMENT");
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

giau.CRUD._fieldEditCommaSeparatedStringUpdateElementFxn = function(mapping){
	console.log("_fieldEditCommaSeparatedStringUpdateElementFxn: "+mapping.value());
	var data = mapping.object();
	var field = mapping.field();
	var element = mapping.element();
	var value = mapping.value();
	var ele = Code.getElementsWithFunction(element, function(e){
			return Code.hasProperty(e,"data-value");
		}, true);
	ele = ele.length > 0 ? ele[0] : null;
	if(ele!==null && value!==null){
		var array = Code.arrayFromCommaSeparatedString(value);
		var elements = giau.CRUD.generateBoxDivsFromArray(array, mapping, giau.CRUD._boxActionHandle, giau.CRUD._boxActionClose);
		Code.removeAllChildren(ele);
		for(var i=0; i<elements.length; ++i){
			Code.addChild(ele,elements[i]);
		}
	}
}

giau.CRUD._fieldEditCommaSeparatedStringUpdateDataFxn = function(mapping, action){
	console.log("_fieldEditCommaSeparatedStringUpdateDataFxn: "+mapping.value());
	console.log(action);
	var data = mapping.object();
	var field = mapping.field();
		
	var operation = action["action"];
	var context = action["context"];
	var action = action["data"];
	var dd = mapping._OTHER["drag_and_drop"];;
	var maxCount = dd//(context!==undefined) ? context["drag_and_drop"] : null;
	var metadata = mapping._OTHER["metadata"];
// console.log("_fieldEditCommaSeparatedStringUpdateDataFxn- metadata");
// console.log(metadata);
	if(maxCount){
		maxCount = maxCount["source"];
		console.log(maxCount);
		maxCount = maxCount["max_count"];
		console.log(maxCount);
		if(maxCount!==null){
			maxCount = parseInt(maxCount);
		}
	}
		console.log(maxCount);
	var originalValue = data[field];
	var array = Code.arrayFromCommaSeparatedString(originalValue);

	console.log(array);
	if(operation=="append"){
		var actionValue = action["value"];
console.log("GOT A VALUE");
console.log(actionValue);
console.log(metadata);
if(dd && dd["metadata"] && dd["metadata"]["source"]){
	var src = dd["metadata"]["source"];
	var table = metadata[src];
	var keys = Code.keys(actionValue);
	var key = keys[0];
	console.log("??????????????????????");
	console.log(key);
	console.log(table);
	table[key] = actionValue[key];
	actionValue = key;	
}
			array.push(actionValue);
// UP{DAED}
	}else if(operation=="remove"){
		var index = action["index"];
			Code.removeElementAt(array,index);
// UP{DAED}
		// var removedValue = Code.stringFromCommaSeparatedArray(array);
		// mapping.value(removedValue);
	}else if(operation=="update"){
		var updatedValue = action["value"];
		array = Code.arrayFromCommaSeparatedString(updatedValue);
	// UP{DAED}
	}
	console.log("BEFORE");
	//
	if(maxCount!==null && maxCount>0){
		while(array.length>maxCount){
			array.shift();
		}
	}
	console.log("OUT");
	var updatedValue = Code.stringFromCommaSeparatedArray(array);
	mapping.value(updatedValue);
}

giau.CRUD._fieldEditJSON = function(definition, container, fieldName, elementContainer, mapping){
	console.log("fieldEditJSON");
	// update mapping
	mapping.updateElementFxn(giau.CRUD._fieldEditJSONUpdateElementFxn);
	mapping.updateDataFxn(giau.CRUD._fieldEditJSONUpdateDataFxn);
	var elementJSON = Code.newDiv();
		Code.addChild(elementContainer,elementJSON);
	var presentation = definition["presentation"];
	var jsonModelColumn = presentation["json_model_column"];
	var modelString = container[jsonModelColumn]; // ALSO: mapping.object()["json_model_column"];
	console.log("modelString: "+modelString);
	var model = Code.parseJSON(modelString);
	var object = Code.parseJSON(mapping.value());
	// set source to objects instead of strings
		container[jsonModelColumn] = model;
	// 	mapping.value(object);
	// 	console.log("?????????????????????????????????????????????????????");
	// console.log(object);
	// console.log(model);
	console.log("--------------------------------------------------------------------------------------------------------------- COMPOSER START");
	var composer = new giau.ObjectComposer(elementJSON, model, object);
	mapping.value(composer);
	console.log("--------------------------------------------------------------------------------------------------------------- COMPOSER END");
	//console.log(composer);
	return elementJSON;
}
giau.CRUD._fieldEditJSONUpdateDataFxn = function(mapping, action){
	console.log("_fieldEditJSONUpdateDataFxn");
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
	console.log("_fieldEditJSONUpdateDataFxn");
	var data = mapping.object();
	var field = mapping.field();
	var element = mapping.element();
}

giau.CRUD.prototype._mappingFromData = function(fieldDescription, sourceObject, itemIndex){
	//
	var alias = fieldDescription["alias"];
	var column = fieldDescription["column"];
	var attributes = fieldDescription["attributes"];
	var presentation = fieldDescription["presentation"];
	var definition = fieldDescription["definition"];
	// SUB
	var name = attributes["display_name"];
	var fieldType = definition["type"];
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
	Code.setStylePadding(elementField,5+"px");
	// VALUES
	Code.setContent(elementTitle,""+name+":");
	
	var mapping = new MapDataDisplay();
	mapping.element(elementField);
	mapping.object(sourceObject);
	mapping.field(itemIndex);
	//console.log(mapping)
	var operationFxn = {};
		operationFxn["string"] = [giau.CRUD._fieldEditString,giau.CRUD._fieldEditString];
		operationFxn["string-number"] = [giau.CRUD._fieldEditString,giau.CRUD._fieldEditString];
		operationFxn["string-date"] = [giau.CRUD._fieldEditDate,giau.CRUD._fieldEditDate];
		operationFxn["string-color"] = [giau.CRUD._fieldEditString,giau.CRUD._fieldEditString];
		operationFxn["string-array"] = [giau.CRUD._fieldEditString,giau.CRUD._fieldEditString];
		operationFxn["string-json"] = [giau.CRUD._fieldEditJSON,giau.CRUD._fieldEditJSON];
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


giau.CRUD.generateBoxDivsFromArray = function(array, ctx, handleFxn, closeFxn){
	if(!array){
		return [];
	}
	console.log(ctx);
var mapping = ctx;
var dd = mapping._OTHER["drag_and_drop"];
var metadata = mapping._OTHER["metadata"];
console.log("generateBoxDivsFromArray");
console.log(metadata);
	var i, value, len = array.length;
	var elements = [];
	for(i=0; i<len; ++i){
		value = array[i];
		var obj = {"index":i, "context":ctx};
		console.log(dd)
		if(dd && dd["metadata"]){
			var source = dd["metadata"]["source"];
			
			console.log(metadata)
			console.log(source)
			console.log(value)
			if(metadata && source){
				value = metadata[source][value];
				if(value){
					value = value["widget_name"];
				}
			}
		}
		elements.push( giau.CRUD.generateBoxDiv(value, obj, handleFxn, closeFxn) );
	}
	return elements;
}
giau.CRUD._jsDispatch = new JSDispatch();
giau.CRUD.generateBoxDiv = function(value, ctx, handleFxn, closeFxn){
	var textColor = "#FFF";
	var backgroundColor = giau.Theme.Color.MediumRed;
	var borderColor = giau.Theme.Color.DarkRed;
	var container = Code.newDiv();
		Code.setStylePadding(container,4+"px");
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
	// var closeButton = Code.newDiv();
	// 	Code.setContent(closeButton,"[x]");
	// 	Code.setStyleDisplay(closeButton,"inline");
	// 	Code.setStyleColor(closeButton,textColor);
	Code.addChild(container,content);
	var closeButton = giau.CRUD._generateSubButton("&times;", container);
	//Code.addChild(container,closeButton);
	if(closeFxn){
		this._jsDispatch.addJSEventListener(closeButton, Code.JS_EVENT_CLICK, closeFxn, ctx);
	}
	if(handleFxn){
		this._jsDispatch.addJSEventListener(content, Code.JS_EVENT_CLICK, handleFxn, ctx);
	}

	return container;
}

giau.CRUD._generateSubButton = function(display,element){
	var div;
		div = Code.newDiv();
		Code.setStyleDisplay(div,"inline-block");
		Code.setStyleFontSize(div, 12+"px");
		Code.setStyleColor(div,giau.Theme.Color.TextOnDark);
		Code.setStylePadding(div,4+"px");
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

giau.InputFieldDuration = function(element, value){
	this._container = element;
	this._dateValue = value;
}
giau.InputFieldDuration.prototype.value = function(){ // milliseconds
	return this._dateValue;
}

giau.InputFieldColor = function(element, value){
	this._container = element;
	this._dataValue = Code.getColARGBFromString(value);

	//this._jsDispatch = new JSDispatch();

	this._elementRowRed = Code.newDiv();
		this._elementSliderRed = Code.newDiv();
		this._elementValueRed = Code.newDiv();
		this._colorSliderRed = giau.InputFieldColorSlider(this._elementSliderRed);

	Code.addChild(this._container,this._elementRowRed);
		Code.addChild(this._elementRowRed, this._elementSliderRed);
		Code.addChild(this._elementRowRed, this._elementValueRed);


	Code.setStyleDisplay(this._elementRowRed,"block");
	Code.setStyleWidth(this._elementRowRed,"100%");
	Code.setStyleHeight(this._elementRowRed,32+"px");
		
	Code.setStyleDisplay(this._elementSliderRed,"inline-block");
	Code.setStyleWidth(this._elementSliderRed,"80%");
	Code.setStyleBackgroundColor(this._elementSliderRed,"#0F0");

	Code.setStyleDisplay(this._elementSliderRed,"inline-block");
	Code.setStyleWidth(this._elementValueRed,"20%");
	Code.setStyleBackgroundColor(this._elementValueRed,"#F00");




}
giau.InputFieldColor.prototype._updateLayout = function(){


	// R G B A sliders / fields / FINAL COLOR SQUARE / value
}
giau.InputFieldColor.prototype.value = function(){ // 0xAARRGGBB
	return this._dateValue;
}

giau.InputFieldColorSlider = function(element){
	this._container = element
	this._background = Code.newDiv();
	this._indicator = Code.newDiv();
	Code.addChild(this._container,this._background);
	Code.addChild(this._container,this._indicator);

	this._jsDispatch = new JSDispatch();

	this._jsDispatch.addJSEventListener(this._background, Code.JS_EVENT_MOUSE_DOWN, this._handleBackgroundMouseDownFxn, this, {});

	this._updateLayout();
}
giau.InputFieldColorSlider.prototype._handleBackgroundMouseDownFxn = function(e,d){
	console.log("mouse down");
	console.log(e,d);
	// start drag
	// put element over canvas, keep track of pointer
}
giau.InputFieldColorSlider.prototype._updateLayout = function(){
	var wid = 100;
	var hei = 100;
	var canvas = new Canvas(null,0,0);
	var stage = new Stage(canvas);
	var d = new DO();
	var colors = [0xFF000000,0xFFFF0000];
	var locations = [0,1];
	d.graphics().setFillGradientLinear(0,0, wid,0,  locations, colors);
	d.graphics().beginPath();
	d.graphics().moveTo(0,0);
	d.graphics().lineTo(wid,0);
	d.graphics().lineTo(wid,hei);
	d.graphics().lineTo(0,hei);
	d.graphics().lineTo(0,0);
	d.graphics().endPath();
	d.graphics().fill();
	
	var img = stage.getDOAsImage(d, wid,hei, null);
	console.log(img);
	
	// create bg to fit:
	var bgImage = img.src;
	console.log(bgImage);
	var base64RL = "url('"+bgImage+"'";
	Code.setStyleBackgroundImage(this._background,base64RL);
}

giau.InputFieldDate = function(element, value){
	this._container = element;
	this._dateValue = value;
	this._daysOfWeek = ["U","M","T","W","R","F","S"];
	this._monthsOfYear = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

	console.log(value);
	var i, j;

	var arrayHour = []; for(i=0; i<24; ++i){ arrayHour.push([""+i, ""+i]); }
	var arrayMinute = []; for(i=0; i<59; ++i){ arrayMinute.push([""+i, ""+i]); }
	var arraySecond = []; for(i=0; i<59; ++i){ arraySecond.push([""+i, ""+i]); }
	var arrayMillisecond = []; for(i=0; i<9999; ++i){ arrayMillisecond.push([""+i, ""+i]); }

	this._elementLeft = Code.newDiv();
	this._elementRight = Code.newDiv();
	this._elementMonth = Code.newDiv();
		this._elementMonthLeft = Code.newDiv();
		this._elementMonthName = Code.newDiv();
		this._elementMonthRight = Code.newDiv();
		this._elementMonthTop = Code.newDiv();
		this._elementMonthBottom = Code.newDiv();
			this._elementMonthGrid = Code.newDiv();
	this._elementHour = Code.newSelect(arrayHour);
	this._elementMinute = Code.newSelect(arrayMinute);
	this._elementSecond = Code.newSelect(arraySecond);
	this._elementMillisecond = Code.newSelect(arrayMillisecond);


	Code.addChild(this._container,this._elementLeft);
	Code.addChild(this._container,this._elementRight);
		Code.addChild(this._elementLeft,this._elementMonth);
			Code.addChild(this._elementMonth, this._elementMonthTop);
				Code.addChild(this._elementMonthTop, this._elementMonthLeft);
				Code.addChild(this._elementMonthTop, this._elementMonthName);
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
	Code.setStyleBackgroundColor(this._elementRight,"#F00");

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
	

	Code.setStyleDisplay(this._elementMonthTop,"block");

	Code.setStyleDisplay(this._elementMonthBottom,"block");

	//this._displayDate = this._dateValue;

	var milliseconds = Code.dateFromString(this._dateValue);
	//milliseconds = Code.getPrevMonthFirstDay(milliseconds);
	this._displayDate = Code.getTimeStampFromMilliseconds(milliseconds);

	this._updateLayout();
}

giau.InputFieldDate.prototype._updateLayout = function(){
	var milliseconds = Code.dateFromString(this._dateValue);


	var selectedMonth = Code.getMonthOfYear(milliseconds); // inherintly start here
	var selectedDayOfMonth = Code.getDayOfMonth(milliseconds);
	console.log("selectedDayOfMonth: "+selectedDayOfMonth)
	

	// CURRENT SELECTED MONTH
	milliseconds = Code.dateFromString(this._displayDate);

	var monthOfYear = Code.getMonthOfYear(milliseconds);
	var daysInMonth = Code.getDaysInMonth(milliseconds);
	var firstDayOfMonth = Code.getFirstDayOfWeekInMonth(milliseconds);
	var monthDisplay = this._monthsOfYear[monthOfYear];

	var daysInMonthPrev = Code.getDaysInMonth( Code.getPrevMonthFirstDay(milliseconds) );
	var daysInMonthNext = Code.getDaysInMonth( Code.getNextMonthFirstDay(milliseconds) );
	Code.setContent(this._elementMonthName,monthDisplay);

	console.log("first day of week in month: "+firstDayOfMonth);

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
	console.log(firstDayOfMonth)
	console.log(daysInMonth)
	console.log("totalRows: "+totalRows);
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
					Code.setStyleColor(col,"#333");
					if(day==selectedDayOfMonth && selectedMonth==monthOfYear){
						Code.setStyleBackgroundColor(col,"#C00");
						Code.setStyleColor(col,"#FCC");
						Code.setContent(col,""+day);
					}else{
						Code.setStyleBackgroundColor(col,"#FFF");
						Code.setContent(col,""+day);
					}
					++day;
				}
			}
			
		}
	}

	// calendar
	/*
	Code.getDaysInMonth = function(milliseconds){
	var d = new Date(milliseconds);
	d = new Date(d.getFullYear(), d.getMonth()+1, 0, 0,0,0,0);
	return d.getDate();
};
	*/
}
giau.InputFieldDate.prototype.value = function(){
	return this._dateValue;
}


// giau.prototype._resize = function(e){
// 	var width = $(window).width();
// 	var height = $(window).height();
// }














