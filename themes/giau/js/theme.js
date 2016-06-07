


function giau(){
	// Code.inheritClass(giau.ImageGallery, JSDispatchable);
	// Code.inheritClass(giau.InfoOverlay, JSDispatchable);
	this.initialize();
	
}


giau.prototype.initialize = function(){
	console.log("loaded");
	// GLOBAL EVENTS

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
		var listing = new giau.GalleryListing(element);
	});

	// CALENDARS
	var calendarListings = $(".giauCalendarList");
	calendarListings.each(function(index, element){
		var listing = new giau.CalendarView(element);
	});
	

	// // INFO FLOATERS
	// var imageGalleries = $(".giauElementFloater");
	// imageGalleries.each(function(index, element){
	// 	var gallery = new giau.ImageGallery(element);
	// });
}

giau.ElementFloater = function(element){ //
}

giau.Navigation = function(element){ //
}

giau.ButtonToggle = function(element){ //
}



giau.Calendar = function(element){ //
	var calendarItemList = [];
	calendarItemList.push({
		"start_time": Code.getTimeMilliseconds(),
		"duration": (8*60*60*1000),
		"title": "Super Fun Event",
		"description": "a super fun event that lasts 8 hours",
		"image_url": "",
		"type": "", // work, fun, movie, game, sport, ... => icon
		"uri": "http://www.google.com",
	});
}

giau.Bio = function(element){ //
	var personnelList = [];
	personnelList.push({
		"first_name": "Joseph Kim",
		"last_name": "",
		"display_name": "",
		"title": "Director of Christian Education, Interim Junior High Pastor", // position
		"description": "",
		"image_url": "",
		"uri": "http://www.google.com",
	});
}

giau.GalleryListing = function(element){
	this._container = element;

	// LAYOUT
	Code.setStylePosition(this._container, "relative");
	Code.setStyleDisplay(this._container, "inline-block");
	Code.setStyleWidth(this._container, "100%");

	var listings = [];
	var departmentImagePrefix = "./wp-content/themes/giau/img/departments/";
	listings.push({
		"title":"Nursery",
		"image_url":(departmentImagePrefix+"nursery.png"),
	});
	listings.push({
		"title":"Kindergarten",
		"image_url":(departmentImagePrefix+"kindergarten.png"),
	});
	listings.push({
		"title":"Elementary",
		"image_url":(departmentImagePrefix+"elementary.png"),
	});
	listings.push({
		"title":"Junior High",
		"image_url":(departmentImagePrefix+"junior_high.png"),
	});
	listings.push({
		"title":"High School",
		"image_url":(departmentImagePrefix+"high_school.png"),
	});
	listings.push({
		"title":"Korean School",
		"image_url":(departmentImagePrefix+"korean_school.png"),
	});

	this._galleryList = listings;

	var i, len = listings.length;
	for(i=0; i<len; ++i){
		var listing = listings[i];
		var container = Code.newDiv();
		var title = Code.newDiv();
		Code.setContent(title,listing["title"]);
		Code.addClass(title,"");
		var img = Code.newImage();
		img.src = listing["image_url"];
			Code.addChild(this._container,container);
			Code.addChild(container,img);
			Code.addChild(container,title);
		listing["image"] = img;
		listing["text"] = title;
		listing["element"] = container;
	}
	this.updateLayout();

	// LISTENERS
	this._jsDispatch = new JSDispatch();
	this._jsDispatch.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
}

giau.GalleryListing.prototype._handleWindowResizedFxn = function(){
	this.updateLayout();
}

giau.GalleryListing.prototype.updateLayout = function(){
	console.log("updateLayout");
	var listings = this._galleryList;

	var maximumColumnCount = 3;
	var elementMinWidth = 292;
	var elementMaxWidth = 196;
	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();

	var elementCount = listings.length;
	var elementWidth = 200;//elementMinWidth;
	var elementHeight = 150;//elementMinWidth;
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

	console.log(widthContainer+"x"+heightContainer+" = colCount "+colCount)
	
	var lm1 = len-1;
	var spacingX = colCount<=1 ? 0.0 : (widthContainer - (elementWidth*colCount))/(colCount-1);
	var spacingY = 60;//spacingX;
	var currentX = 0;
	var currentY = 0;
	var row = 0;
	var rowHeight = elementHeight + spacingY;
	var colWidth = elementWidth + spacingX;
	j = 0;
	for(i=0; i<len; ++i){
		var listing = listings[i];
		var container = listing["element"];
		var img = listing["image"];
			Code.setStylePosition(img, "absolute");
			Code.setStyleLeft(img, currentX+"px");
			Code.setStyleTop(img, currentY+"px");
			Code.setStyleWidth(img, elementWidth+"px");
			Code.setStyleHeight(img, elementHeight+"px");
			//Code.setStyleBackground(img, "#F00");
		//
		var title = listing["text"];
		//title.style.font.size = 32+"px";
		//title.style.fontsize = 32+"px";
		Code.setStyleFontWeight(title, "lighter");
		if(colCount==1){
			Code.setStyleFontSize(title, 24+"px");
		}else{
			Code.setStyleFontSize(title, 16+"px");
		}
		Code.setStyleFontFamily(title, "Arial, sans-serif");
			Code.setStylePadding(title, "4px 0px 0px 0px");
			Code.setStyleColor(title, "#666");
			Code.setStyleDisplay(title, "inline-block");
			Code.setStyleTextAlign(title, "left");
			Code.setStylePosition(title, "absolute");
			Code.setStyleLeft(title, currentX+"px");
			Code.setStyleWidth(title, elementWidth+"px");
			Code.setStyleTop(title, (currentY+elementHeight)+"px");
		++j
		currentX += colWidth;
		if(j==colCount){

			j = 0;
			currentX = 0;
			if(i<lm1){
				currentY += rowHeight;
			}
		}
	}
	currentY += rowHeight;
	// container
	Code.setStyleHeight(this._container, currentY+"px");
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
	//giau.ImageGallery._.constructor.call(this);
	this._jsDispatch = new JSDispatch();
	this.optimalImageWidthToHeight = 1920.0/1080.0;

	// SET ROOT ELEMENT
	this._container = element;
	Code.setStyleOverflow(this._container,"hidden"); // overflow: hidden;
	
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
			Code.addChild(this._coverContainer, this._coverIconLeft);
			Code.addChild(this._coverContainer, this._coverIconRight);
			//this._coverBorderLeft
			if(Code.hasClass(this._container,"giauImageGalleryShowNavigation")){
				//giauImageGalleryShowNavigation
				this._coverIconLeft.src = GLOBAL_SERVER_IMAGE_PATH+"/gallery_button_left.png";
				this._coverIconRight.src = GLOBAL_SERVER_IMAGE_PATH+"gallery_button_right.png";
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
	if(Code.hasClass(this._container,"giauImageGalleryAutomated")){
		this._isAutomated = true;
		this._automatedTicker = new Ticker(6000);
		this._automatedTicker.addFunction(Ticker.EVENT_TICK, this._handleAutomatedTickerFxn, this);
		this._automatedTicker.start();
	}
	

	this._currentIndex = null;
	this._coverElement = null;
	this._underElement = null;
	var imagePrefix = GLOBAL_SERVER_IMAGE_PATH+"/gallery_featured";
	this._images = ["featured_01_opt.png","featured_02_opt.png","featured_03_opt.png","featured_04_opt.png","featured_05_opt.png","featured_06_opt.png"];
	this._loadedImages = [];
	var i;
	for(i=0; i<this._images.length; ++i){
		this._images[i] = imagePrefix + "/" + this._images[i];
		this._loadedImages[i] = null;
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
		var iconButtonWidth = 80;
		var iconButtonHeight = 80;
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
				// LEFT - BUTTON
				if(this._coverIconLeft.src){
					Code.setStylePosition(this._coverIconLeft, "absolute");
					Code.setStyleLeft(this._coverIconLeft, "5%");
					Code.setStyleTop(this._coverIconLeft, ((heightContainer-iconButtonHeight)*0.5)+"px");
					Code.setStyleHeight(this._coverIconLeft, iconButtonHeight+"px");
					Code.setStyleWidth(this._coverIconLeft, iconButtonWidth+"px");
					// RIGHT - BUTTON
					Code.setStylePosition(this._coverIconRight, "absolute");
					Code.setStyleRight(this._coverIconRight, "5%");
					Code.setStyleTop(this._coverIconRight, ((heightContainer-iconButtonHeight)*0.5)+"px");
					Code.setStyleHeight(this._coverIconRight, iconButtonHeight+"px");
					Code.setStyleWidth(this._coverIconRight, iconButtonWidth+"px");
				}
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

// var err = $(".featureInfoOverlayTitle")[0];
// Code.setContent(err,""+heightContainer+" / "+info.height+" | "+size.height+" = "+Math.round(diffY)+" = "+upY);




giau.CalendarView = function(element){
	var eventList = [];
	eventList.push({
		"start": Code.getTimeStamp(2016, 5, 1, 11, 0, 0, 0),
		"duration": 0,
		"title": "Children's Day",
		"description": "Joint Worship 11:00 AM",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 5, 7, 0, 0, 0, 0),
		"duration": 0,
		"title": "Love Festival",
		"description": "Love Festival for people with developmental disabilities",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 5, 8, 0, 0, 0, 0),
		"duration": 0,
		"title": "Mothers' Day",
		"description": "Mothers' Day Celebration",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 5, 15, 12, 30, 0, 0),
		"duration": 0,
		"title": "Teachers' Day",
		"description": "Annual Teachers' Day Luncheon 12:30 PM @ Patio",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 6, 10, 0, 0, 0, 0),
		"duration": 0,
		"title": "Prayer Meeting",
		"description": "Bi-Monthly Parents/Teachers' Prayer Meeting",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 6, 17, 0, 0, 0, 0),
		"duration": 2*24*60*60*1000,
		"title": "Vacation Bible School",
		"description": "Vacation Bible School: Cave Quest",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 6, 26, 0, 0, 0, 0),
		"duration": 0,
		"title": "CE Graduation",
		"description": "CE Graduation",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 7, 1, 0, 0, 0, 0),
		"duration": 7*24*60*60*1000,
		"title": "Short-Term Summer Mission",
		"description": "Navajo Reservation in Arizona",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 7, 31, 0, 0, 0, 0),
		"duration": 4*24*60*60*1000,
		"title": "Junior High Summer Retreat",
		"description": "@ Tahquitz Pines",
	});
	eventList.push({
		"start": Code.getTimeStamp(2016, 7, 31, 0, 0, 0, 0),
		"duration": 4*24*60*60*1000,
		"title": "High School Summer Retreat",
		"description": "@ Lake Arrowhead",
	});
	/*
	eventList.push({
		"start": Code.getTimeStamp(2016, 5, 7, 0, 0, 0, 0),
		"duration": 0,
		"title": "",
		"description": "",
	});
	*/
	/*
May 1: Children's Day Joint Worship 11:00 AM
May 7: Love Festival for people with developmental disabilities
May 8: Mothers' Day Celebration
May 15: Annual Teachers' Day Luncheon 12:30 PM @ Patio
June 10: Bi-Monthly Parents/Teachers' Prayer Meeting
June 17~19: Vacation Bible School: Cave Quest
June 26: CE Graduation
July 1~8: Short-Term Summer Mission: Navajo Reservation in Arizona
July 31~August 3: Junior High Summer Retreat @ Tahquitz Pines
July 31~August 3: High School Summer Retreat @ Lake Arrowhead
*/
	var i, len=eventList.length;
	for(i=0;i<len;++i){
		var event = eventList[i];
		var start = event.start;
		var duration = event.duration;
		var date = Code.getTimeFromTimeStamp(start);
		var stamp = Code.getTimeStamp(date);
		console.log( this.formatTimeHumanReadable(date, duration) );
	}
// Code.getTimeStamp
//Code.getTimeMilliseconds();
//Code.getTimeZone = function(){
}
giau.CalendarView.prototype.formatTimeHumanReadable = function(timestamp, duration){
	var date1 = new Date(timestamp);
		var month1 = Code.monthsLong[date1.getMonth()];
		var day1 = date1.getDate();
		var dow1 = Code.daysOfWeekLong[date1.getDay()];
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
		return ""+dow1+", "+month1+" "+day1+" @ "+hour1+":"+Code.prependFixed(""+min1,"0",2)+" "+ampm1;
	}else{
		var date2 = new Date(timestamp + duration);
		var month2 = Code.monthsLong[date2.getMonth()];
		var day2 = date2.getDate();
		var dow2 = Code.daysOfWeekLong[date2.getDay()];
		var hour2 = date2.getHours();
		var min2 = date2.getMinutes();
		return ""+month1+" "+day1+" - "+month2+" "+day2;
	}
	return null;
}







giau.prototype._resize = function(e){
	var width = $(window).width();
	var height = $(window).height();
	console.log(width,height)
}

giau.ImageGallery2 = function (element){
	console.log(this);

	var width = $(window).width();
	var height = $(window).height();

	// $(element).width(width)
	// $(element).height("400px")

	//var img = $(element).prepend('<img style="width:100px; height:100px" src="/wordpress/wp-content/themes/giau/img/feature_image_01.jpg" />');

	var img = $('<img>', {"src":(GLOBAL_SERVER_IMAGE_PATH+"/feature_image_01.jpg")});
	$(img).bind('load', function(){console.log("image loaded"); console.log(img[0].src);} );
	img.appendTo(element)

	//var img = $(element).prepend('<div style="background-image: url(\'/wordpress/wp-content/themes/giau/img/feature_image_01.jpg\'); " ></div>');
	//var img = $(element).prepend('<div></div>');
	
	// background-repeat: no-repeat;

	// console.log("image:");
	// console.log(img);
	

	img.width(200)
	img.height(400)

	// $(img).css("width","200px");
	// $(img).css("height","200px");

	// $(img).css("width","200px");
	// $(img).css("height","200px");

	console.log($(img).width()+"x"+$(img).height())
	

	// $(img).css("background-image","url(\'/wordpress/wp-content/themes/giau/img/feature_image_01.jpg\')");
	// $(img).css("background-repeat","no-repeat");
	// $(img).css("background-position","cover");

	//<img class="featureImageBackground"src="<?php echo relativePathIMG()."feature_image_01.jpg" ?>" />

}















