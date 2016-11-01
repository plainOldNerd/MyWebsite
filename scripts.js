var checkClickMePosition = function(){
	var mainDisplays = document.getElementsByClassName('mainDisplayInSeries');

	if(mainDisplays.length == 0){
		return;
	}
	// now we have AT LEAST one series picture

	var clickMes = document.getElementsByClassName('clickMe');

	// we have enough width
	if(clickMes[0].getBoundingClientRect().right >
		mainDisplays[0].getBoundingClientRect().right){

		for(var i=0; i<mainDisplays.length; ++i){
			clickMes[i].style.top = '0px';
			// started with 58px and found this value by trial and error
			clickMes[i].style.right = '50px';
		}
	}
	// we don't have enough width
	if(clickMes[0].getBoundingClientRect().bottom >
		mainDisplays[0].getBoundingClientRect().bottom){

		for(var i=0; i<mainDisplays.length; ++i){
			//  agin, trial and error
			var mainDisplayHeight 
				= mainDisplays[i].getBoundingClientRect().height+4;
			var mainDisplayWidth 
				= mainDisplays[i].getBoundingClientRect().width-50;

			clickMes[i].style.top = '-' + mainDisplayHeight +'px';
			// started with 58px and found this value by trial and error
			clickMes[i].style.right = '-' + mainDisplayWidth +'px';
		}
	}
}

window.addEventListener('load',checkClickMePosition,false);

window.addEventListener('resize',checkClickMePosition,false);
