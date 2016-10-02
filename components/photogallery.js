import React from 'react';
import {ThumbnailStyle, MainDisplayStyle} from './styles';

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
			maindisplay: this.props.initialMainDisplay
		};
	},

	// get the next photo or video displayed
	handleThumbnailClick(index){
		var gi = this.state.gi;
		var specificInfo = gi[index.toString()];

		if(specificInfo.video){
			this.props.rememberIndex(index.toString() + '.mp4');
			this.setState({maindisplay: index.toString() + '.mp4'});
		}
		else{
			this.props.rememberIndex(index.toString() + '.jpg');
			this.setState({maindisplay: index.toString() + '.jpg'});
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

	handleMainPhotoClick(){
		var gi = this.state.gi;
		var indexes = this.state.maindisplay.match(/\d+/g);
		var series = gi[indexes[0]].series;

		if(series){
			// we are looking at something like 0.jpg, and NOT 0_0.jpg
			if(indexes.length == 1){
				this.props.rememberIndex(indexes[0] + '_0.jpg');
				this.setState({maindisplay: indexes[0] + '_0.jpg'});
			}
			/* now we are looking at something alike 0_0.jpg. go to the next 
			   photo in the series or return to 0.jpg if you're at the last one
			*/
			else{
				// we are viewing the last in the series
				if(parseInt(indexes[1]) == Object.keys(series).length-1){
					this.props.rememberIndex(indexes[0] + '.jpg');
					this.setState({maindisplay: indexes[0] + '.jpg'});
				}
				// there are more in the series
				else{
					var seriesindex = parseInt(indexes[1])+1;
					this.props.rememberIndex(indexes[0] + '_' + seriesindex + 
						'.jpg');
					this.setState({maindisplay: indexes[0] + '_' + seriesindex 
						+ '.jpg'});
				}
			}
		}
	},

	getDescription(){
		var gi = this.state.gi;
		var maindisplay = this.state.maindisplay;
		var description = '';

		/* test for series photos first, since these will match the single photo
		   regex if tested later
		*/
		var indexes = maindisplay.match(/\d+_\d+\.jpg/);
		if(indexes){
			indexes = maindisplay.match(/\d+/g);
			return gi[indexes[0]].series[indexes[0] + '_' + indexes[1]]
				.description[this.state.lang];
		}

		// test for a single (not series) photo or video
		indexes = maindisplay.match(/\d+\.jpg|\d+\.mp4/g);
		if(indexes.length == 1){
			indexes = maindisplay.match(/\d+/);
			return gi[indexes[0]].description[this.state.lang];
		}

		return description;
	},

	// this is designed to render photos, photo series and videos only
	render(){
		var fileDescription = this.getDescription();

		if(this.state.maindisplay.match(/\.jpg/)){
			return(
				<div>
					<div>
						{this.state.thumbnails}
					</div>
					<div className='maindisplayDiv'>
						<img src={'../photogalleries/' + this.props.files + '/' +
								this.state.maindisplay}
							alt='some shit fucked up!' 
							onClick={this.handleMainPhotoClick}
							className='maindisplay'
							style={MainDisplayStyle} 
						/> <br />
						<span dangerouslySetInnerHTML={{__html: fileDescription}}>
						</span>
					</div>
				</div>
			);
		}

		if(this.state.maindisplay.match(/\.mp4/)){
			return(
				<div>
					<div>
						{this.state.thumbnails}
					</div>
					<div className='maindisplayDiv'>
						video goes here <br />
						{fileDescription}
					</div>
				</div>
			);
		}
		return (<div></div>);
	}
});

export {PhotoGallery};
