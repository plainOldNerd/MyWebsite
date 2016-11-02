var checkClickMePosition = function(){
	var mainDisplays = document.getElementsByClassName('mainDisplayInSeries');

	if(mainDisplays.length == 0){
		return;
	}
	// now we have AT LEAST one series picture

	var clickMes = document.getElementsByClassName('clickMe');
	var descriptions = document.getElementsByClassName('description');

	/* note that both mobile and pc versions are essentially the same
	   file, but with different versions of scripts.js and styles.css 
	   in their folders. this following code will work unless another
	   css file is linked earlier or the css file is altered
	*/
	var clickMeStyle = document.styleSheets[1].cssRules[5].cssText;
	var clickMeWidth = parseInt(clickMeStyle.match(/[\d]+/)[0]);

	// we have enough width
	if(clickMes[0].getBoundingClientRect().right >
		mainDisplays[0].getBoundingClientRect().right){

		for(var i=0; i<mainDisplays.length; ++i){
			clickMes[i].style.top = '0px';
			clickMes[i].style.right = clickMeWidth.toString() + 'px';

			descriptions[i].style.top = '0px';
		}
	}
	// we don't have enough width
	if(clickMes[0].getBoundingClientRect().bottom >
		mainDisplays[0].getBoundingClientRect().bottom){

		for(var i=0; i<mainDisplays.length; ++i){
			var mainDisplayHeight 
				= mainDisplays[i].getBoundingClientRect().height;
			var mainDisplayWidth 
				= mainDisplays[i].getBoundingClientRect().width-clickMeWidth;

			clickMes[i].style.top = '-' + mainDisplayHeight +'px';
			clickMes[i].style.right = '-' + mainDisplayWidth +'px';

			descriptions[i].style.top = '-' + clickMeWidth.toString() + 'px';
		}
	}
}

window.addEventListener('load',checkClickMePosition,false);

window.addEventListener('resize',checkClickMePosition,false);
