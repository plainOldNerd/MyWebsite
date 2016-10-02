function sizeListener(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	var ratio = width/height;
	var ori; //orientation

	/* if width>height then we should render a landscape.
	*/
	if(ratio>1){  ori = 'landscape';  }
	else{  ori = 'portrait';  }

	switch(ori){
		case 'landscape':
			document.documentElement.style.backgroundImage = 
				"url('../ChipsDrill.png')";
			document.getElementById('content').style.width = '90%';
			break;
		case 'portrait':
			document.documentElement.style.backgroundImage = 
				"url('../Chips.png')";
			document.getElementById('content').style.width = '96%';
		default:
	}
	document.documentElement.style.backgroundSize =
		width.toString() + 'px ' + height.toString() + 'px';

	/* now we need to set the "top" and "height" of the content pane 
	   (below the name pane) to allow it to be scrollable
	*/
	var headerHeight = document.getElementById('header')
		.getBoundingClientRect().height;

	document.getElementById('chunks').style.top = headerHeight.toString()
		+ 'px';

	var chunksHeight = height - headerHeight;
	document.getElementById('chunks').style.height = chunksHeight
		.toString() + 'px';
}

window.addEventListener(
	"load", function(event){
		var d = new Date();
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		document.title = 'I\'m in your head now - ' + d.getDate() + ' '
			+ months[d.getMonth()] + ' ' + d.getFullYear();

		sizeListener();
		window.removeEventListener("load", this, false); 
	}, false
);

window.addEventListener(
	"resize", sizeListener, false
);