var defaultPortrait = true;

function sizeListener(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	var ori = window.orientation;

	if( defaultPortrait )
	{
		// portrait
		if( ori == 0 || ori == 180 )
		{  ori = 'portrait';  }
		// landscape
		else
		{  ori = 'landscape';}
	}
	//  this is untested, because nobody has a Nexus 10
	else
	{
		// landscape
		if( ori == 0 || ori == 180 )
		{  ori = 'landscape';}
		// portrait
		else
		{  ori = 'portrait';}
	}

	if( ori == 'portrait' ){
		document.documentElement.style.backgroundImage = 
			"url('../Chips.png')";
		document.documentElement.style.backgroundSize =
			width.toString() + 'px ' + height.toString() + 'px';
	}
	else{
		document.documentElement.style.backgroundImage = 
			"url('../ChipsDrill.png')";
		document.documentElement.style.backgroundSize =
			width.toString() + 'px ' + height.toString() + 'px';
	}

	/* now we need to set the "top" and "height" of the content pane 
	   (below the name pane) to allow it to be scrollable
	*/
	var headerHeight = document.getElementById('header')
		.getBoundingClientRect().height;

	document.getElementById('chunks').style.top = headerHeight
		.toString() + 'px';

	var chunksHeight = height - headerHeight;
	document.getElementById('chunks').style.height = chunksHeight
		.toString() + 'px';
}

function zoomAndScroll(){
	document.documentElement.style.backgroundPosition =
		window.scrollX.toString() + 'px ' + window.scrollY.toString()
		+ 'px';
}

(function(sizeListener, zoomAndScroll){
	var lastWidth = -1;

	function checkZoomed(){
		var widthNow = window.innerWidth;

		if( lastWidth == widthNow ){
			return;
		}

		lastWidth = widthNow;

		sizeListener();
		zoomAndScroll();
	}

	setInterval(checkZoomed, 100);

})(sizeListener, zoomAndScroll);

window.addEventListener(
	"scroll", function(){
		setTimeout(zoomAndScroll, 100);
	}, false
);

window.addEventListener(
	"load", function load(event){
		var d = new Date();
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		document.title = 'I\'m in your head now - ' + d.getDate() + ' '
			+ months[d.getMonth()] + ' ' + d.getFullYear();
			
		var h = screen.height;
		var w = screen.width;
		var o = window.orientation;

		//  the Nexus 10's default orientation is landscape
		if(w>h && (o==0 || o==180))
		{  defaultPortrait = false;  }

		sizeListener();

		window.removeEventListener("load", this, false); 
	},
	false
);

window.addEventListener(
	"orientationchange", sizeListener, false
);

window.addEventListener(
	"resize", sizeListener, false
);