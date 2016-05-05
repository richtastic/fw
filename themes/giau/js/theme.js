


function giau(){
	Code.inheritClass(giau.ImageGallery, JSDispatchable);
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
	
	// INFO FLOATERS
	var imageGalleries = $(".giau?");
	imageGalleries.each(function(index, element){
		var gallery = new giau.ImageGallery(element);
	});
}

giau.ImageFloater = function(element){ //
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
	giau.ImageGallery._.constructor.call(this);

	// SET ROOT ELEMENT
	this._container = element;
}

giau.ImageGallery = function(element){
	giau.ImageGallery._.constructor.call(this);

	// SET ROOT ELEMENT
	this._container = element;
	
	// CREATE HIERARCHY
	this._primaryImageContainer = Code.newDiv();
		Code.setStyleLeft(this._primaryImageContainer,0+"px");
		Code.setStyleTop(this._primaryImageContainer,0+"px");
		Code.setStylePosition(this._primaryImageContainer, "relative");
	this._primaryImageElement = Code.newImage();
	this._secondaryImageElement = Code.newImage();
	Code.addChild(this._container,this._secondaryImageElement);
	Code.addChild(this._container,this._primaryImageContainer);
	Code.addChild(this._primaryImageContainer,this._primaryImageElement);
	
	this._animating = false;
	this._ticker = null;
	
	this._currentIndex = null;
	this._coverElement = null;
	this._underElement = null;
	this._images = ["/wordpress/wp-content/themes/giau/img/feature_image_02.jpg","/wordpress/wp-content/themes/giau/img/feature_image_01.jpg"];
	this._loadedImages = [];
	var i;
	// for(i=0; i<this._images.length; ++i){
	// 	this._loadedImages[i] = {"width":0, "height":0, "url":null};
	// }
	
	// LISTENERS
	this.addJSEventListener(window, Code.JS_EVENT_RESIZE, this._handleContainerResizedFxn);
	this.addJSEventListener(this._container, Code.JS_EVENT_CLICK, this._handleContainerClickedFxn);

	// INITIALIZE WITH FIRST IMAGE
	this.nextImage();
}

giau.ImageGallery.prototype._handleContainerClickedFxn = function(e){
	if(!this._animating){
		this.nextImage();
	}
}
giau.ImageGallery.prototype._handleContainerResizedFxn = function(){
	if(this._animating){
		// STOP IT OR UPDATE IT
	}
	this._updateImage(this._currentIndex);
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
	if(index>=this._loadedImages.length){
		console.log("A");
		var imageSource = this._images[index];
		var self = this;
		imageLoader = new ImageLoader("",[imageSource], null,function(info){
			self._handleImageLoaded(info, index);
			self._currentIndex = index;
		},null);
		imageLoader.load();
	}else{
		console.log("B");
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
	console.log(percent)

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
			Code.setStyleWidth(this._primaryImageContainer,widthContainer+"px");
			Code.setStyleHeight(this._primaryImageContainer,heightContainer+"px");
		var img = this._primaryImageElement;
		var size = Code.sizeToFitRectInRect(info.width,info.height, widthContainer,heightContainer);
		var diffX = widthContainer - size.width;
		var diffY = heightContainer - size.height;
		Code.setSrc(img,info.url);
		Code.setStyleWidth(img,size.width+"px");
		Code.setStyleHeight(img,size.height+"px");
		Code.setStyleLeft(img,Math.round(diffX*0.5)+"px");
		Code.setStyleTop(img,Math.round(diffY*0.5)+"px");
		Code.setStylePosition(img, "relative");
}
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















