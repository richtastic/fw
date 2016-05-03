


function giau(){
	this.initialize();
}


giau.prototype.initialize = function(){
	console.log("loaded");

	// GLOBAL EVENTS
	$(window).resize( this._resize );

	// IMAGE GALLERIES
	var imageGalleries = $(".giauImageGallery");
	imageGalleries.each(function(index, element){
		var gallery = new giau.ImageGallery(element);
	});
	//giauImageGallery
	console.log(FF);
}
//document.body.onload = onLoadComplete;



giau.ImageGallery = function(element){
	this._container = element;
	this._currentIndex = 0;
	this._coverElement = null;
	this._underElement = null;
	this._primaryImageElement = null;
	this._secondarImageElement = null;
	this._images = ["/wordpress/wp-content/themes/giau/img/feature_image_02.jpg","/wordpress/wp-content/themes/giau/img/feature_image_01.jpg"];
	this._loadedImages = [];
	var i;
	for(i=0; i<this._images.length; ++i){
		this._loadedImages[i] = {"width":0, "height":0, "source":null, };
	}
	//console.log(element);
	//var width = Code.getStyleWidth(document.body);//Code.getProperty(document.body,"width")
	var width = $(document.body).width();
	//console.log(width);
	//Code.getProperty = function(ele,pro){

	Code.setStyleWidth(element,width+"px");
	Code.setStyleHeight(element,"400px");
	Code.setStyleBackground(element,"#F0F");

	this.nextImage();
}


giau.ImageGallery.prototype.nextImage = function(){
	var i = 0;
	var imageSource = this._images[i];
	imageLoader = new ImageLoader("",[imageSource], this,this._handleImageLoaded,null);
	imageLoader.load();
}
giau.ImageGallery.prototype._handleImageLoaded = function(info){
	var image = info.images[0];
	var source = info.files[0];
	console.log(image.width,image.height);
	var img = Code.newImage();
	console.log(img)
	console.log(this._container)
	Code.addChild(this._container,img);
	Code.setSrc(img,source);


	var widthContainer = $(this._container).width();
	var heightContainer = $(this._container).height();
	console.log(widthContainer);

	var size = Code.sizeToFitRectInRect(image.width,image.height, widthContainer,heightContainer);
	var diffX = widthContainer - size.width;
	var diffY = heightContainer - size.height;
	Code.setStyleWidth(img,size.width+"px");
	Code.setStyleHeight(img,size.height+"px");
	Code.setStyleLeft(img,Math.round(diffX*0.5)+"px");
	Code.setStyleTop(img,Math.round(diffY*0.5)+"px");
	Code.setStylePosition(img, "relative");

	// Code.setStyleWidth(element,width+"px");
	// Code.setStyleHeight(element,"400px");
	// Code.setStyleBackground(element,"#F0F");

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















