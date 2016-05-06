


function giau(){
	Code.inheritClass(giau.ImageGallery, JSDispatchable);
	Code.inheritClass(giau.InfoOverlay, JSDispatchable);
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
}

giau.Bio = function(element){ //
}

giau.InfoOverlay = function(element){ // Overlay Float Alert
	console.log("BLA");
	giau.InfoOverlay._.constructor.call(this);

	// SET ROOT ELEMENTimage
	this._container = Code.getParent(element);
	this._element = element;
	Code.setStyleZIndex(element,"100");
	Code.setStylePosition(element,"absolute");
	Code.setStyleDisplay(element,"inline-block");

	// LISTENERS
	this.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	//this.addJSEventListener(this._container, Code.JS_EVENT_CLICK, this._handleContainerClickedFxn, this);

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
	giau.ImageGallery._.constructor.call(this);

	// SET ROOT ELEMENT
	this._container = element;
	
	// CREATE HIERARCHY
	this._functionalityContainer = Code.newDiv();
	this._interactionContainer = Code.newDiv();
	this._leftButton = Code.newDiv();
	this._rightButton = Code.newDiv();
	this._primaryImageContainer = Code.newDiv();
		Code.setStyleLeft(this._primaryImageContainer,0+"px");
		Code.setStyleTop(this._primaryImageContainer,0+"px");
		Code.setStylePosition(this._primaryImageContainer, "relative");
	this._secondaryImageContainer = Code.newDiv();
	this._primaryImageElement = Code.newImage();
	this._secondaryImageElement = Code.newImage();
	Code.addChild(this._container,this._functionalityContainer);
		Code.addChild(this._functionalityContainer,this._secondaryImageContainer);
			Code.addChild(this._secondaryImageContainer,this._secondaryImageElement);
		Code.addChild(this._functionalityContainer,this._primaryImageContainer);
			Code.addChild(this._primaryImageContainer,this._primaryImageElement);
		Code.addChild(this._functionalityContainer,this._interactionContainer);
			Code.addChild(this._interactionContainer,this._leftButton);
			Code.addChild(this._interactionContainer,this._rightButton);
			
	
	this._animating = false;
	this._ticker = null;
	
	this._currentIndex = null;
	this._coverElement = null;
	this._underElement = null;
	this._images = ["/wordpress/wp-content/themes/giau/img/feature_image_02.jpg","/wordpress/wp-content/themes/giau/img/feature_image_01.jpg"];
	this._loadedImages = [];
	var i;
	for(i=0; i<this._images.length; ++i){
		this._loadedImages[i] = null;
	}
	
	// LISTENERS
	this.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleWindowResizedFxn, this);
	this.addJSEventListener(this._leftButton, Code.JS_EVENT_CLICK, this._handleLeftButtonClickedFxn, this);
	this.addJSEventListener(this._rightButton, Code.JS_EVENT_CLICK, this._handleRightButtonClickedFxn, this);

	// INITIALIZE WITH FIRST IMAGE
	this.nextImage();
}

giau.ImageGallery.prototype._handleLeftButtonClickedFxn = function(e){
	if(!this._animating){
		this.prevImage();
	}
}
giau.ImageGallery.prototype._handleRightButtonClickedFxn = function(e){
	if(!this._animating){
		this.nextImage();
	}
}
giau.ImageGallery.prototype._handleWindowResizedFxn = function(){
	if(this._animating){
		// STOP IT OR UPDATE IT
	}
	this._updateImage(this._currentIndex);
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
	return this._loadOrShowImageAtIndex(index);
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
	return this._loadOrShowImageAtIndex(index);
}
giau.ImageGallery.prototype._loadOrShowImageAtIndex = function(index){
	if(index<0 || index>=this._images.length){
		return;
	}
	if(this._loadedImages[index]==null){
		// TODO: wait for old requests
		var imageSource = this._images[index];
		var self = this;
		imageLoader = new ImageLoader("",[imageSource], null,function(info){
			self._handleImageLoaded(info, index);
			self._currentIndex = index;
		},null);
		imageLoader.load();
	}else{
		this._currentIndex = index;
		this._updateImage(this._currentIndex);
		this._animateNext();
	}
}
giau.ImageGallery.prototype._animateNext = function(){
	this._animating = true;
	this._time = 0;
	this._ticker = new Ticker(20);
	this._ticker.addFunction(Ticker.EVENT_TICK, this._handleTickerFxn, this);
	this._ticker.start();
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
	//console.log(percent)

	Code.setStyleLeft(this._primaryImageContainer,distance+"px");
	if(this._time>=countMax){
		Code.setStyleLeft(this._primaryImageContainer,0+"px");
		this._animating = false;
		this._ticker.stop();
		this._ticker.kill();
		this._ticker = null;
		console.log("DONE");
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
	this._updateImage(index);
}
giau.ImageGallery.prototype._updateImage = function(index){
	var info = this._loadedImages[index];
	if(info){
		var widthContainer = $(this._container).width();
		var heightContainer = $(this._container).height();
			Code.setStyleWidth(this._primaryImageContainer,Math.floor(widthContainer)+"px");
			Code.setStyleHeight(this._primaryImageContainer,Math.floor(heightContainer)+"px");
		var img = this._primaryImageElement;
		var size = Code.sizeToFitRectInRect(info.width,info.height, widthContainer,heightContainer);
		var diffX = widthContainer - size.width;
		var diffY = heightContainer - size.height;
		Code.setSrc(img,info.url);
		// Code.setStylePadding(img, "0px");
		// Code.setStyleMargin(img, "0px");
		// Code.setStyleDisplay(img,"inline-block");
		Code.setStylePosition(img, "absolute");
		Code.setStyleWidth(img,Math.round(size.width)+"px");
		Code.setStyleHeight(img,Math.round(size.height)+"px");
		Code.setStyleLeft(img,Math.round(diffX*0.5)+"px");
		Code.setStyleTop(img,Math.round(diffY*0.5)+"px");
	}
}

// var err = $(".featureInfoOverlayTitle")[0];
// Code.setContent(err,""+heightContainer+" / "+info.height+" | "+size.height+" = "+Math.round(diffY)+" = "+upY);













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

	var img = $('<img>', {"src":"/wordpress/wp-content/themes/giau/img/feature_image_01.jpg"});
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















