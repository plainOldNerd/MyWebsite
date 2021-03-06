import React from 'react';
import {ThumbnailStyle, MainDisplayDivStyle, MainDisplayStyle, ClickMeStyle,
	DescriptionStyle} from './styles';

/* takes props files, index, and handleClick. index is an integer 
   and specifies which thumbnail this is. handleClick is a callback so that 
   PhotoGallery can handle the click knowing which Thumbnail was clicked
*/
var Thumbnail = React.createClass({
	handleClick(){
		this.props.handleClick(this.props.index);
	},

	render(){
		return (
			<img src={'../photogalleries/' + this.props.files + '/' + 
				this.props.index.toString() + '.jpg'} 
				alt={this.props.index.toString() + '.jpg'} 
				onClick={this.handleClick}
				className='thumbnail'
				style={ThumbnailStyle} />
		);
	}
});

/* this takes as props initialLang, which of course determines the initial
   language (I will look into Redux in future), but also files, which is a
   file that gives all info about the photos included and text to display for
   each one
*/
var PhotoGallery = React.createClass({
	getInitialState(){
		return {
			lang: this.props.initialLang,
			// 's' short for 'strings'
			s: require('./strings_' + this.props.files).strings,
			// 'gi' short for 'galleryinfo'
			gi: require('../photogalleries/' + this.props.files + '/files').info,
			thumbnails: [],
			// this is the filename shown in the main display
			mainDisplay: this.props.initialMainDisplay
		};
	},

	// get the next photo or video displayed
	handleThumbnailClick(index){
		var gi = this.state.gi;
		var specificInfo = gi[index.toString()];

		if(specificInfo.video){
			this.props.rememberIndex(index.toString() + '.mp4');
			this.setState({mainDisplay: index.toString() + '.mp4'});
		}
		else{
			this.props.rememberIndex(index.toString() + '.jpg');
			this.setState({mainDisplay: index.toString() + '.jpg'});
		}
	},

	// prepare thumbnails
	componentWillMount(){
		var giLength = Object.keys(this.state.gi).length;

		for(var i=0; i<giLength; ++i){
			this.state.thumbnails.push(
				<Thumbnail files={this.props.files} index={i} 
					handleClick={this.handleThumbnailClick}
					key={this.props.files + '-' + i} />
			);
		}
	},

	imageLoaded(){
		if(this.refs.clickMe && this.refs.description){
			/* note that both mobile and pc versions are essentially the same
			   file, but with different versions of scripts.js and styles.css 
			   in their folders. this following code will work unless another
			   css file is linked earlier or the css file is altered
			*/
			var clickMeStyle = document.styleSheets[1].cssRules[5].cssText;
			var clickMeWidth = parseInt(clickMeStyle.match(/[\d]+/)[0]);

			// we have enough width
			if(this.refs.clickMe.getBoundingClientRect().right >
				this.refs.mainDisplay.getBoundingClientRect().right){

					this.refs.clickMe.style.top = '0px';
					this.refs.clickMe.style.right = clickMeWidth.toString() + 
						'px';

					this.refs.description.style.top = '0px';
			}
			// we don't have enough width
			if(this.refs.clickMe.getBoundingClientRect().bottom >
				this.refs.mainDisplay.getBoundingClientRect().bottom){

					var mainDisplayHeight 
						= this.refs.mainDisplay.getBoundingClientRect().height+4;
					var mainDisplayWidth 
						= this.refs.mainDisplay.getBoundingClientRect().width
							-clickMeWidth;

					this.refs.clickMe.style.top = '-' + mainDisplayHeight +'px';
					this.refs.clickMe.style.right = '-' + mainDisplayWidth +'px';

					this.refs.description.style.top = '-' + 
						clickMeWidth.toString() + 'px';
			}
		}
	},

	handleMainPhotoClick(){
		var gi = this.state.gi;
		var indexes = this.state.mainDisplay.match(/\d+/g);
		var series = gi[indexes[0]].series;

		if(series){
			// we are looking at something like 0.jpg, and NOT 0_0.jpg
			if(indexes.length == 1){
				this.props.rememberIndex(indexes[0] + '_0.jpg');
				this.setState({mainDisplay: indexes[0] + '_0.jpg'});
			}
			/* now we are looking at something alike 0_0.jpg. go to the next 
			   photo in the series or return to 0.jpg if you're at the last one
			*/
			else{
				// we are viewing the last in the series
				if(parseInt(indexes[1]) == Object.keys(series).length-1){
					this.props.rememberIndex(indexes[0] + '.jpg');
					this.setState({mainDisplay: indexes[0] + '.jpg'});
				}
				// there are more in the series
				else{
					var seriesIndex = parseInt(indexes[1])+1;
					this.props.rememberIndex(indexes[0] + '_' + seriesIndex + 
						'.jpg');
					this.setState({mainDisplay: indexes[0] + '_' + seriesIndex 
						+ '.jpg'});
				}
			}
		}
	},

	getDescription(){
		var gi = this.state.gi;
		var mainDisplay = this.state.mainDisplay;
		var description = '';

		/* test for series photos first, since these will match the single photo
		   regex if tested later
		*/
		var indexes = mainDisplay.match(/\d+_\d+\.jpg/);
		if(indexes){
			indexes = mainDisplay.match(/\d+/g);
			return gi[indexes[0]].series[indexes[0] + '_' + indexes[1]]
				.description[this.state.lang];
		}

		// test for a single (not series) photo or video
		indexes = mainDisplay.match(/\d+\.jpg|\d+\.mp4/g);
		if(indexes.length == 1){
			indexes = mainDisplay.match(/\d+/);
			return gi[indexes[0]].description[this.state.lang];
		}

		return description;
	},

	// this is designed to render photos, photo series and videos only
	render(){
		var fileDescription = this.getDescription();

		if(this.state.mainDisplay.match(/\.jpg/)){
			var indexes = this.state.mainDisplay.match(/\d+/g);

			if(this.state.gi[indexes[0]].series){
				return(
					<div>
						<div>
							{this.state.thumbnails}
						</div>
						<div className='maindisplayDiv' 
							style={MainDisplayDivStyle}>

							<img src={'../photogalleries/' + this.props.files + '/' +
									this.state.mainDisplay}
								alt='something went wrong!' 
								ref='mainDisplay'
								onLoad={this.imageLoaded}
								onClick={this.handleMainPhotoClick}
								className='mainDisplayInSeries'
								style={MainDisplayStyle} 
							/> 
							<img src='../photogalleries/clickme.gif' 
								alt='something went wrong!'
								ref='clickMe'
								onLoad={this.imageLoaded}
								onClick={this.handleMainPhotoClick}
								className='clickMe'
								style={ClickMeStyle}
							/>
							<br />
							<span ref='description'
								className='description' 
								style={DescriptionStyle}
								dangerouslySetInnerHTML={{__html: fileDescription}}>
							</span>
						</div>
					</div>
				);
			}
			// an individual picture, not a series
			else{
				return(
					<div>
						<div>
							{this.state.thumbnails}
						</div>
						<div className='maindisplayDiv'>
							<img src={'../photogalleries/' + this.props.files + '/' +
									this.state.mainDisplay}
								alt='something went wrong!' 
								className='mainDisplay'
								style={MainDisplayStyle} 
							/> <br />
							<span dangerouslySetInnerHTML=
								{{__html: fileDescription}}>
							</span>
						</div>
					</div>
				);
			}
		}

		if(this.state.mainDisplay.match(/\.mp4/)){
			return(
				<div>
					<div>
						{this.state.thumbnails}
					</div>
					<div className='maindisplayDiv'>
						<video controls
							className='mainDisplay' style={MainDisplayStyle}>
							
							<source src={'../photogalleries/' + this.props.files + '/' + 
								this.state.mainDisplay} type='video/mp4' />
							Sorry, but the video cannot be played.
						</video> <br />
						<span dangerouslySetInnerHTML=
							{{__html: fileDescription}}>
						</span>
					</div>
				</div>
			);
		}
		return (<div></div>);
	}
});

export {PhotoGallery};
