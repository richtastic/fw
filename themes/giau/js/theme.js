


function giau(){
	// Code.inheritClass(giau.ImageGallery, JSDispatchable);
	// Code.inheritClass(giau.InfoOverlay, JSDispatchable);
	this.initialize();
	
}


giau.prototype.initialize = function(){
	
	// GLOBAL EVENTS
	var bus = giau.MessageBus();

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
	
}

giau.ElementFloater = function(element){ //
}

giau.Navigation = function(element){ //
}

giau.ButtonToggle = function(element){ //
}


giau.MessageBus = function () {
	if(!giau.MessageBus._bus){
		giau.MessageBus._bus = new MessageBus();
	}
	return giau.MessageBus._bus;
}
giau.MessageBus._bus = null;
giau.MessageBus.EVENT_NAVIGATION_SELECT = "navigate_select_";
giau.MessageBus.EVENT_OTHER = "other_";



giau.ContactView = function(element){ //
	this._container = element;

	var use2Colums = false;
	// LISTENERS
	this._jsDispatch = new JSDispatch();
	//this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	// .addJSEventListener = function(object, type, fxn, ctx){

	// this._jsDispatch.addJSEventListener(element, Code.JS_EVENT_CLICK, this._handleSubmitClickedFxn, this);
	// this._jsDispatch.addJSEventListener(element, Code.JS_EVENT_TOUCH_TAP, this._handleSubmitTappedFxn, this);

	var contactTitle = "CONTACT US";
	//var contactInfo = "For more information, you can contact:<br/><br/>Joseph Kim (Director of Christian Education<br/>Phone: (213) 200-6092<br/>Email: thefathershouse.lacpc@gmail.com";
	
	var otherTitle = "GET SOCIAL";
	//var otherInfo = "We have a ton of social meda links you can follow";

	var messageTitle = "SEND A MESSAGE";
	//var messageInfo = "Got more questions? Write us a note, and we'll get back to you.";
	var nameFieldDefault = "Name*";
	var emailFieldDefault = "Email*";
	var phoneFieldDefault = "Phone Number (optional)";
	var bodyFieldDefault = "Message*";

	var botCheckText = "Check here if you are a human.";
	var sendMessageButtonText = "Submit";
var inputTextColor = "#000";
		// var divInfo = Code.newDiv(messageInfo);
		// 	Code.setStyleFontFamily(divInfo,"'siteThemeLight'");
		// 	Code.setStyleDisplay(divInfo,"inline-block");
		// 	Code.setStyleFontSize(divInfo,"14px");
		// 	Code.setStyleColor(divInfo,"#333");
		//var divName = Code.newDiv(nameFieldDefault);
			var divName = Code.newInputText();
			Code.setTextPlaceholder(divName,nameFieldDefault);
			Code.setStyleWidth(divName,"100%");
			Code.setStyleDisplay(divName,"block");
			Code.setStyleTextAlign(divName,"left");
			Code.setStyleBorder(divName,"solid");
			Code.setStyleBorderWidth(divName,"1px");
			Code.setStyleBorderColor(divName,"#FFF");
			Code.setStyleColor(divName,inputTextColor);
				Code.setStyleHeight(divName,"24px");
				
		var divEmail = Code.newInputText();
			Code.setTextPlaceholder(divEmail,emailFieldDefault);
			Code.setStyleWidth(divEmail,"100%");
			Code.setStyleDisplay(divEmail,"block");
			Code.setStyleTextAlign(divEmail,"left");
			Code.setStyleBorder(divEmail,"solid");
			Code.setStyleBorderWidth(divEmail,"1px");
			Code.setStyleBorderColor(divEmail,"#FFF");
			Code.setStyleColor(divEmail,inputTextColor);
				Code.setStyleHeight(divEmail,"24px");
			// Code.setStyleFontFamily(divEmail,"'siteThemeLight'");
			// Code.setStyleDisplay(divEmail,"inline-block");
			// Code.setStyleFontSize(divEmail,"14px");
			// Code.setStyleColor(divEmail,"#333");
		var divPhone = Code.newInputText();
			Code.setTextPlaceholder(divPhone,phoneFieldDefault);
			Code.setStyleWidth(divPhone,"100%");
			Code.setStyleDisplay(divPhone,"block");
			Code.setStyleTextAlign(divPhone,"left");
			Code.setStyleBorder(divPhone,"solid");
			Code.setStyleBorderWidth(divPhone,"1px");
			Code.setStyleBorderColor(divPhone,"#FFF");
			Code.setStyleColor(divPhone,inputTextColor);
				Code.setStyleHeight(divPhone,"24px");

		var divDivs = [];
		for(var i=0; i<6; ++i){
			var divDiv1 = Code.newDiv();
				Code.setStyleWidth(divDiv1,"100%");
				Code.setStyleHeight(divDiv1,"10px");
			divDivs.push(divDiv1);
		}
		// var divDiv2 = Code.newDiv();
		// 	Code.setStyleWidth(divDiv2,"100%");
		// 	Code.setStyleHeight(divDiv2,"10px");

		//var divComment = Code.newDiv();
			var divComment = Code.newInputTextArea();
			Code.setTextPlaceholder(divComment,bodyFieldDefault);
			Code.setStyleWidth(divComment,"100%");
			Code.setStyleDisplay(divComment,"block");
			Code.setStyleTextAlign(divComment,"left");
			Code.setStyleBorder(divComment,"solid");
			Code.setStyleBorderWidth(divComment,"1px");
			Code.setStyleBorderColor(divComment,"#FFF");
			Code.setStyleColor(divComment,inputTextColor);
				Code.setStyleHeight(divComment,"80px");

		//var divBot = Code.newDiv();
			var divBot = Code.newDiv();
				Code.setStyleDisplay(divBot,"block");
				Code.setStyleTextAlign(divBot,"left");
				Code.setStyleVerticalAlign(divBot,"middle");

				// var divBotCheck = Code.newInputCheckbox("isUserHuman","yes");
				// 	Code.setStyleDisplay(divBotCheck,"inline-block");
				
				// var divBotText = Code.newDiv(botCheckText);
				// 	Code.setStyleFontFamily(divBotText,"'siteThemeLight'");
				// 	Code.setStyleDisplay(divBotText,"inline-block");
				// 	Code.setStyleFontSize(divBotText,"14px");
				// 	Code.setStyleColor(divBotText,"#333");
				// 	Code.setStylePadding(divBotText,"0px 0px 0px 10px");

				// Code.addChild(divBot, divBotCheck);
				// Code.addChild(divBot, divBotText);
var submitColor = "#4966D0";
var submitColorDark = "#4055CC";

		//var divSend = Code.newDiv();
			var divSend = Code.newInputSubmit(sendMessageButtonText);
			Code.setStyleDisplay(divSend,"block");
			Code.setStyleTextAlign(divSend,"center");
			Code.setStyleBorder(divSend,"solid");
			Code.setStyleBorderWidth(divSend,"1px");
			Code.setStyleBorderColor(divSend,submitColorDark);
			Code.setStylePaddingLeft(divSend,"24px");
			Code.setStylePaddingRight(divSend,"24px");
			Code.setStylePaddingTop(divSend,"8px");
			Code.setStylePaddingBottom(divSend,"8px");
			Code.setStyleBackground(divSend,submitColor);
			Code.setStyleMargin(divSend,"0 auto");
				Code.setStyleFontFamily(divSend,"'siteThemeLight'");
				//Code.setStyleDisplay(divInfo,"inline-block");
					//Code.setStyleWidth(divSend,"50%");
				Code.setStyleFontSize(divSend,"12px");
				Code.setStyleColor(divSend,"#FFF");
				//Code.setStyleHeight(divSend,"24px");
			//Code.setContent(divSend, sendMessageButtonText);
			this._jsDispatch.addJSEventListener(divSend, Code.JS_EVENT_CLICK, this._handleSubmitClickedFxn, this);
			this._jsDispatch.addJSEventListener(divSend, Code.JS_EVENT_TOUCH_TAP, this._handleSubmitTappedFxn, this);

this._formElementName = divName;
this._formElementEmail = divEmail;
this._formElementPhone = divPhone;
this._formElementComment = divComment;

	var containerElement = this._container;
	var rows = [];
		// rows.push({ "leftContent": contactTitle,
		// 			"rightContent": contactInfo});
		// rows.push({ "leftContent": otherTitle,
		// 			"rightContent": otherInfo});
		rows.push({ "leftContent": messageTitle,
					"rightElements":[divDivs[0], divName, divDivs[1], divEmail, divDivs[2], divPhone, divDivs[3], divComment, divDivs[4], divBot, divDivs[5], divSend],
					"rightContent": null});
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
giau.ContactView.prototype._submitFormData = function(){
	console.log("submit form data");

	// do a check first

	var url = GLOBAL_SERVER_QUERY_PATH+"";

	var ajax = new Ajax();
	ajax.url(url);
	ajax.method(Ajax.METHOD_TYPE_POST);
	ajax.params({
		"operation":"submit_contact_form",
		"name":"?",
		"email":"?",
		"comment":"?"
	});
	ajax.callback(function(){
		console.log("callback");
	});

	alert("form sent successfully");
	Code.setInputTextValue(this._formElementName,"");
	Code.setInputTextValue(this._formElementEmail,"");
	Code.setInputTextValue(this._formElementPhone,"");
	Code.setTextAreaValue(this._formElementComment,"");
}

giau.BioView = function(element){ //
	this._container = element;

	var propertyDefaultImage = "data-default-image"
	var propertyDefultDescription = "data-default-description";

	this._default_bio_description = Code.getPropertyOrDefault(this._container,propertyDefultDescription, "");
	this._default_bio_image = Code.getPropertyOrDefault(this._container,propertyDefaultImage, "");
	console.log(this._default_bio_image);

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

	var col = 0;
	var i, len = personnelList.length;
	for(i=0; i<len; ++i){
		var person = personnelList[i];
	var outerElement = Code.newDiv();
			//Code.setStyleDisplay(outerElement,"inline-block");
			Code.setStyleDisplay(outerElement,"table-cell");
			Code.setStylePosition(outerElement,"relative");
		var containerElement = Code.newDiv();
			Code.setStyleBackground(containerElement,"#FFF");
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
console.log("0")
	var maximumColumnCount = 3;
	var elementMinWidth = 300;
	var elementMaxWidth = 350; // to next row size
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();

	var outerPadding = 10;
	var innerPadding = 10;
	var columns = Math.floor(widthContainer/elementMaxWidth);
	if(widthContainer<elementMinWidth){
		columns = 1;
	}
	columns = Math.max(1,columns);
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
			//Code.setStyleHeight(row,"");
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

			if(i<len-columns){
				var div = outerElement;
				Code.setStyleBorderColor(div,"#EEE");
				Code.setStyleBorder(div,"solid");
				Code.setStyleBorderWidthTop(div,"0px");
				Code.setStyleBorderWidthLeft(div,"0px");
				Code.setStyleBorderWidthRight(div,"0px");
				Code.setStyleBorderWidthBottom(div,"1px");
			}else{
				var div = outerElement;
				Code.setStyleBorder(div,"none");
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
console.log("done")
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
console.log("layout")
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
			Code.setStylePadding(title, "4px 0px 0px 0px");
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

	var storageDictionaryKey = Code.getPropertyOrDefault(this._container, "data-storage", "language");
	var storageDictionaryValue = Code.getCookie(storageDictionaryKey);
	this._storageDictionaryKey = storageDictionaryKey;
//console.log(storageDictionaryKey+" = '"+storageDictionaryValue+"'")


	this._languageList = [];
	var i, len, entry, div, element, name, language, child;
	len = Code.numChildren(this._container);
	for(i=0; i<len; ++i){
		child = Code.getChild(this._container, i);
		language = Code.getProperty(child, "data-language");
		var display = Code.getProperty(child, "data-display");
		var url = Code.getProperty(child, "data-url");
		if(display && language && url){
			entry = {"name":display, "language":language, "url":url, "element":null};
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
		div = Code.newDiv();
			Code.setContent(div, name);
			Code.setStyleDisplay(div,"inline-block");
			Code.setStyleFontSize(div,styleTextSize+"px");
			Code.setStyleColor(div, Code.getJSColorFromARGB(styleTextColor) );
			Code.setStylePadding(div,"10px 2px 10px 2px");
		if(storageDictionaryValue==language){
			Code.setStyleFontFamily(div,"'siteThemeRegular'");
			foundLanguageIndex = i;
		}else{
			Code.setStyleFontFamily(div,"'siteThemeLight'");
		}
		entry["element"] = div;
		Code.addChild(this._container, div);
		// listening
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_CLICK, this._handleContentClickedFxn, this);
		this._jsDispatch.addJSEventListener(div, Code.JS_EVENT_TOUCH_TAP, this._handleContentTappedxn, this);
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
				//document.location.href = url;
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
	console.log(element)
	var propertyAnimatesDown = "data-animates-down";
	var propertyAnimatesUp = "data-animates-up";
	var propertyStartHidden = "data-start-hidden";

	// MESSAGE BUS
	this._busEventAnimateDown = null;
	this._busEventAnimateUp = null;
	var bus = giau.MessageBus();
	console.log(bus)
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
	var foundSelectedIndex = 0;
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
	console.log("down event ");
	Code.setStyleDisplay(this._container,"inline-block");
}
giau.NavigationList.prototype._handleNavigationBusEventUp = function(e){
	console.log("up event ");
	Code.setStyleDisplay(this._container,"none");
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

	var propertyOverlayColor = "data-ovarlay-color";
	var overlayColor = Code.getPropertyOrDefault(this._container, propertyOverlayColor, "0x00000000");
	overlayColor = Number(overlayColor);
	overlayColor = Code.getJSColorFromARGB(overlayColor);



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
		var overlayBorderColor = 0x99000000;
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
				//giauImageGalleryShowNavigation
				// this._coverIconLeft.src = GLOBAL_SERVER_IMAGE_PATH+"/gallery_button_left.png";
				// this._coverIconRight.src = GLOBAL_SERVER_IMAGE_PATH+"gallery_button_right.png";
				// this._coverIconLeft.src = GLOBAL_SERVER_IMAGE_PATH+"left_arrow_box.png";
				// this._coverIconRight.src = GLOBAL_SERVER_IMAGE_PATH+"right_arrow_box.png";
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
	
	// LISTENERS
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	this._jsDispatch.addJSEventListener(this._leftButton, Code.JS_EVENT_CLICK, this._handleLeftButtonClickedFxn, this);
	this._jsDispatch.addJSEventListener(this._rightButton, Code.JS_EVENT_CLICK, this._handleRightButtonClickedFxn, this);

	// INITIALIZE WITH FIRST IMAGE
	this.nextImage();
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
	console.log("anim")
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
		var iconButtonWidth = 30;
		var iconButtonHeight = 30;
		var barIconWidth = 50;
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
					Code.setStyleLeft(this._coverIconLeft, "10px");
					Code.setStyleTop(this._coverIconLeft, ((heightContainer-iconButtonHeight)*0.5)+"px");
					//Code.setStyleHeight(this._coverIconLeft, iconButtonHeight+"px");
					Code.setStyleWidth(this._coverIconLeft, iconButtonWidth+"px");
					// RIGHT - BUTTON
					Code.setStylePosition(this._coverIconRight, "absolute");
					Code.setStyleRight(this._coverIconRight, "10px");
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

	// relative:
	div = this._elementRelative;
	Code.setStyleWidth(div,"50%");
	Code.setStyleDisplay(div,"inline-block");
	Code.setStyleMargin(div,"0");
	Code.setStylePadding(div,"0");
	Code.setStyleBorderWidth(div,"0");
	Code.setContent(div,"");
	Code.setStyleBackground(div,"#0FF");

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
	var relativeURL = Code.getValueOrDefault(file, "url_relative", "?");
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
	var img = this.iconFromFileType(mimetype, relativeURL);
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
			Code.setContent(div,file["url_relative"]);
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
	var source = "./wp-content/themes/giau/img/file_browser/icon_fb_blank.png";
	if(filetype){
		if(filetype == "directory"){ // directory
			source = "./wp-content/themes/giau/img/file_browser/icon_fb_folder.png";
		}else if( filetype.match("image\/.*") ){  // any image
			source = url;
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

0

// giau.ObjectDesigner Constructor  Composer Layout
giau.ObjectComposer = function(element){
	this._container = element;

	var propertyDataModel = "data-model";
	var propertyDataObject = "data-object";
	this._dataModel = {};
	this._dataInstance = {};

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

	this._jsDispatch = new JSDispatch();
	this._dataNonce = {"reference":"reference"};
	
	console.log("model:",this._dataModel);
	console.log("insta:",this._dataInstance);

	this.initialize();

	var div = Code.newInputButton("SUBMIT");
		Code.setStyleBackgroundColor(div,"#FCC");
	this._submitButton = div;
	Code.addChild(this._container,this._submitButton);

	this._jsDispatch.addJSEventListener(this._submitButton, Code.JS_EVENT_CLICK, this._handleSubmitClickFxn, this);

	console.log("insta FIN:",this._dataInstance);
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
giau.ObjectComposer.prototype.prepareObjectForSubmission = function(){
	// go thru object and set values from fields
	console.log(this._dataInstance);
	var jsObject = {};
	this.fillOutObjectFromElements(this._dataInstance,jsObject);
	console.log(jsObject);
}
giau.ObjectComposer.prototype.fillOutObjectFromElements = function(inObject, jsObject){
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
		if(val && val["nonce"] == this._dataNonce){ // primitive
			input = val["input"];
			value = Code.getInputTextValue(input);
			jsObject[key] = value;
		}else{ // is non-primitive
			if(Code.isArray(val)){ // array
				value = [];
			}else{ // object
				value = {};
			}
			jsObject[key] = value;
			this.fillOutObjectFromElements(val, value);
		}
	}
}
/*
giau.ObjectComposer.prototype._handleNewArrayObject = function(e,d){
	var target = Code.getTargetFromEvent(e);
	var modelObject = d["model"];
	var instanceObject = d["instance"];
	var element = d["element"];
	var field = d["field"];
	console.log("handle new array object");
	console.log(modelObject);
	console.log(instanceObject);
	console.log(element);
	this.fillOutModelFromElement(element, modelObject["fields"], instanceObject, field);
	
}
giau.ObjectComposer.prototype._handleDeleteArrayObject = function(e,d){
	var target = Code.getTargetFromEvent(e);
	var modelObject = d["model"];
	var instanceObject = d["instance"];
	var element = d["element"];
	var field = d["field"];
	var index = d["index"];
	console.log("handle delete array object");
	console.log(modelObject);
	console.log(instanceObject);
	console.log(element);
	console.log(field);
	console.log(index);
	if(index!==undefined){ // array
		var array = instanceObject[field];
		console.log(array);
		Code.removeElementAt(array,index);
		Code.removeFromParent(element);
	}else{
		// objects don't get deleted ?
	}
	//this.fillOutModelFromElement(element, modelObject, instanceObject, field);
	
}
*/
giau.ObjectComposer.prototype._handleNewArrayItem = function(e,d){
	var target = Code.getTargetFromEvent(e);
	var model = d["model"];
	var array = d["array"];
	var element = d["element"];
	var field = d["field"];
	console.log("handle new array object");
	console.log(model);
	console.log(array);
	console.log(element);
	console.log(field);
	// console.log("handle new array object");
	// console.log(modelObject);
	// console.log(instanceObject);
	// console.log(element);
	//this.fillOutModelFromElementArray(element, model, array, field);
	/*
	push on a new item to array:
		- string
		- object
		- array
	perform i(th) iteration of array
	*/
	this.fillOutModelFromElementArray(element, model["fields"], array, field);
	
}
giau.ObjectComposer.prototype.defaultInputRowObject = function(element){
	div = Code.newDiv();
	Code.setStylePaddingTop(div,"0px");
	Code.setStylePaddingBottom(div,"0px");
	Code.setStylePaddingRight(div,"0px");
	Code.setStylePaddingLeft(div,"10px");
	if(element){
		Code.addChild(element,div);
	}
	//Code.setContent(div,"?");
	return div;
}
/*
what if array is root element ?
	=> an only accept an OBJECT at the root element
*/

giau.ObjectComposer.prototype.fillOutModelFromElementArray = function(element,modelFieldInfo,array, field){
	var regexArrayPrefix = new RegExp('^array-','i');
	var modelFieldType = modelFieldInfo["type"];
	var modelSubType = modelFieldType.replace(regexArrayPrefix,"");
	console.log("\t=> array of "+modelSubType);
	if(modelSubType=="array"){
		console.log("\t=>array [array]");
		var objectModel = modelFieldInfo["fields"];
		for(var i=0; i<array.length; ++i){
			this.fillOutModelFromElementArray(element,objectModel,array[i], field);
		}
	}else if(modelSubType=="object"){
		console.log("\t=>object [array]");
		var objectModel = modelFieldInfo["fields"]["fields"];
		for(var i=0; i<array.length; ++i){
			this.fillOutModelFromElement(element,objectModel,array[i], false);
		}
	}else{
		console.log("\t=>primitive [array]");
		console.log(modelFieldInfo,array);
		//                         (element, modelObject,instanceObject, modelFieldName,modelFieldType, isArray)
		this._fillOutWithPrimitiveType(element,modelFieldInfo,    array, null,modelSubType, true);
	}
	var button = Code.newInputButton("NEW ARRAY OBJECT");
			Code.setStyleBackgroundColor(button,"#FCC");
			Code.setStyleDisplay(button,"inline-block");
		Code.addChild(element, button);
	var data = {"model":modelFieldInfo, "array":array, "element":element, "field":"?"}; // modelFieldInfo
	this._jsDispatch.addJSEventListener(button, Code.JS_EVENT_CLICK, this._handleNewArrayItem, this, data);
}

giau.ObjectComposer.prototype.fillOutModelFromElement = function(element,modelObject,instanceObject, newField){
	console.log("++++++++++++++++++++++++++++++++++++++");
	console.log(modelObject);
	console.log(instanceObject);
	//var isInstanceArray = Code.isArray(instanceObject);
	// if(isInstanceArray){
	// 	console.log("fillOutModelFromElement : is array");
	// }else{
	// 	console.log("fillOutModelFromElement : is object");
	// }
	var regexArrayPrefix = new RegExp('^array-','i');
	var modelKeys = Code.keys(modelObject);
	var i, modelFieldName, modelFieldType, modelFieldInfo;
	for(i=0; i<modelKeys.length; ++i){
		modelFieldName = modelKeys[i];
		modelFieldInfo = modelObject[modelFieldName];
		modelFieldType = modelFieldInfo["type"];
		console.log(i,modelFieldName+" = "+modelFieldType,modelFieldInfo);
		if(modelFieldType){
			var isArray = modelFieldType.match(regexArrayPrefix);
			if(isArray){
				console.log(" ---> is array: ",instanceObject,instanceObject[modelFieldName]);
				var subElement = this.newSubElement(element,"array", instanceObject, modelFieldName);
				this.fillOutModelFromElementArray(subElement, modelFieldInfo, instanceObject[modelFieldName], modelFieldName);
			}else{
				if(modelFieldType=="object"){
					console.log("\t=>object");
					var object = instanceObject[modelFieldName];
					var subElement = this.newSubElement(element,"object", instanceObject, modelFieldName);
					this.fillOutModelFromElement(subElement,modelFieldInfo["fields"],object, false);
				}else{
					this._fillOutWithPrimitiveType(element, modelObject,instanceObject, modelFieldName,modelFieldType, false);
				}
			}
		}else{
			console.log("NO TYPE -- SKIP");
		}
	}
}
giau.ObjectComposer.prototype.newSubElement = function(element,type, container, field){
	var div = this.defaultInputRowObject(element);
	var color = Code.getColARGB( 0xFF, Code.randomInt(0,0xFF), Code.randomInt(0,0xFF), Code.randomInt(0,0xFF) );
	color = Code.getJSColorFromARGB(color);
	Code.setStyleBackgroundColor(div,color);
	if(type=="array"){
		Code.setContent(div, "array: "+field);
	}else if(type=="object"){
		Code.setContent(div, "object: "+field);
	}else if(type=="primitive"){
		var value = container[field]
		if(Code.isArray(container)){
			//Code.setContent(div, field+" "+": "+);
		}else{
			//Code.setContent(div, field+" "+": "+container[field]);
		}
		this._inputTextField(div,field, value);
	}
	return div;
}
giau.ObjectComposer.prototype._inputTextField = function(element, key,value){
	var div = element;
	var content = Code.newDiv();
	var label = Code.newDiv();
			Code.setContent(label,""+key+": ");
			Code.setStyleBackgroundColor(label,"#FCC");
			Code.setStyleDisplay(label,"inline-block");
	var input = Code.newInputText();
			Code.setStyleBackgroundColor(input,"#CCF");
			Code.setStyleDisplay(input,"inline-block");
	Code.addChild(content,label);
	Code.addChild(content,input);
	Code.addChild(div,content);
	if(value){
		Code.setInputTextValue(input,value);
	}
	return null;
}
giau.ObjectComposer.prototype._fillOutWithPrimitiveType = function(element, modelObject,instanceObject, modelFieldName,modelFieldType, isArray){
	var regexStringPrefix = new RegExp('^string-','i');
	var isString = modelFieldType=="string" || modelFieldType.match(regexStringPrefix);
	var found = false;
	if(isString){
		var stringSubType = modelFieldType.replace(regexStringPrefix,"");
		console.log("\t=>primitive = string");
		found = true;
	}else if(modelFieldType=="boolean"){
		console.log("\t=>primitive = boolean");
		found = true;
	}else if(modelFieldType=="number"){
		console.log("\t=>primitive = number");
		found = true;
	}
	if(found){
		var primitive = null;
		if(isArray){
			console.log("isArray:",instanceObject);
			var i, len = instanceObject.length;
			for(i=0;i<len;++i){
				primitive = instanceObject[i];
				console.log("\t\t => "+i+" = "+primitive);
				var subElement = this.newSubElement(element,"primitive", instanceObject,i);
			}
		}else{
			primitive = instanceObject[modelFieldName];
			console.log("\t\t => "+primitive);
			var subElement = this.newSubElement(element,"primitive", instanceObject,modelFieldName);
		}
	}
}
/*
	
	// if( Code.hasKey(modelObject,"fields") ){
	// 	modelObject = modelObject["fields"];
	// }
	console.log("++++++++++++++++++++++++++> "+newField);
	console.log(modelObject);
	console.log(instanceObject);
	var keys = null; 
	if(!isInstanceArray){
		if(newField){
			keys = [newField];
		}else{
			keys = Code.keys(modelObject);
		}
	}
	var i, j, key, field, type, val, obj;
	var div, content;
	var len = isInstanceArray ? instanceObject.length : keys.length;
console.log("start");
	for(i=0; i<len; ++i){
// k could be an index 
		key = keys[i];
		field = modelObject[key];
		console.log(field);
		type = null;
		if(Code.hasKey(field,"type")){
			type = field["type"];
		}
		name = key;
		if(Code.hasKey(field,"name")){
			name = field["name"];
		}
console.log(name,key);
		content = null;
			div = this.defaultInputRowObject(element);
		if(type){
			var isArray = type.match(regexArrayPrefix);
			if(isArray){
				var subType = type.replace(regexArrayPrefix,"");
				console.log("SUB TYPE: "+subType);
				if(newField){
					console.log("IS NEW");
					val = instanceObject[key];
					obj = {};
					val.push(obj);
					this.fillOutModelFromElement(element, field["fields"],obj, null);
				}else{
					// VISUALS CONTAINER
					content = Code.newDiv();
					var label = Code.newDiv();
							Code.setContent(label,""+key+": ");
							Code.setStyleBackgroundColor(label,"#FCC");
							Code.setStyleDisplay(label,"inline-block");
					var button = Code.newInputButton("NEW ARRAY OBJECT");
							Code.setStyleBackgroundColor(button,"#FCC");
							Code.setStyleDisplay(button,"inline-block");
					Code.addChild(content,label);
					Code.addChild(content,button);
					Code.addChild(div,content);
					// DATA
					val = instanceObject[key];
					console.log("in",key,val);
					subContainer = this.defaultInputRowObject(div);
//subContainer = content;
					if(val){ // FILL IN
						for(j=0; j<val.length; ++j){
							obj = val[j];
subContainer = this.defaultInputRowObject(content);
var del = Code.newInputButton("DELETE");
Code.addChild(subContainer,del);
var data = {"model":modelObject, "instance":instanceObject, "element":subContainer, "field":key, "index":j};
this._jsDispatch.addJSEventListener(del, Code.JS_EVENT_CLICK, this._handleDeleteArrayObject, this, data);
							this.fillOutModelFromElement(subContainer, field["fields"],obj, null);
						}
					}else{ // SET DEFAULT - EMPTY
						val = [];
						instanceObject[key] = val;
					}
					var data = {"model":modelObject, "instance":instanceObject, "element":content, "field":key};
					this._jsDispatch.addJSEventListener(button, Code.JS_EVENT_CLICK, this._handleNewArrayObject, this, data);
				}
			}else if(type=="object"){
				console.log("OBJECT");
				val = instanceObject[key];
					if(!val){ // not exist, set to default
						val = {};
						instanceObject[key] = val;
					}
					var label = Code.newDiv();
						Code.setContent(label,""+key+": ");
						Code.setStyleBackgroundColor(label,"#FCC");
						Code.setStyleDisplay(label,"inline-block");
						Code.addChild(div,label);

// subContainer = this.defaultInputRowObject(div);
// var del = Code.newInputButton("DELETE");
// Code.addChild(subContainer,del);
// console.log("OBJECT HERE ..........");
// var data = {"model":modelObject, "instance":instanceObject, "element":subContainer, "field":key, "index":j};
// this._jsDispatch.addJSEventListener(del, Code.JS_EVENT_CLICK, this._handleDeleteArrayObject, this, data);

				this.fillOutModelFromElement(div, field,val, null);
			}else if(type=="string" || type=="string-url" || type=="string-image" || type=="string-date" || type=="boolean" || type=="number"){ // primitive
				content = Code.newDiv();
					var label = Code.newDiv();
						Code.setContent(label,""+key+": ");
						Code.setStyleBackgroundColor(label,"#FCC");
						Code.setStyleDisplay(label,"inline-block");
					var input = Code.newInputText();
						Code.setStyleBackgroundColor(input,"#CCF");
						Code.setStyleDisplay(input,"inline-block");
				Code.addChild(content,label);
				Code.addChild(content,input);
				Code.addChild(div,content);
				// SETTING
				val = instanceObject[key];
				if(val){
					Code.setInputTextValue(input,val);
				}else{
					instanceObject[key] = ""; // init to empty
				}
				instanceObject[key] = {"type":"string", "input":input, "nonce":this._dataNonce};
			}else{
				console.log("unknown type: "+type);
			}

		}
		if(content){
			//Code.setContent(div,content);
			//Code.addChild(div,content);
		}
	}
	*/

/*
	// => NAVIGATION
	$widget_id_navigation_list = giau_insert_widget("navigation_list",
		[
			"alias" => "navigation_list",
			"name" => "Giau Navigation",
			"cssClass" => "giauNavigationItemList",
			"jsClass" => "giau.NavigationList",
			"fields" => [
				"components" => [
					"type" => "array-object",
					"description" => "navigation item",
					"fields" => [
						"display_text" => [
							"type" => "string",
							"description" => "displayed text"
						],
						"uri" => [
							"type" => "string",
							"description" => "location destination"
						]
					]
				],
				"class" => [
					"type" => "string"
				],
				"style" => [
					"type" => "string"
				],
			]
		]
	);
*/















giau.prototype._resize = function(e){
	var width = $(window).width();
	var height = $(window).height();
}














