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
			maindisplay: '0.jpg'
		};
	},

	// get the next photo or video displayed
	handleThumbnailClick(index){
		var gi = this.state.gi;
		var specificInfo = gi[index.toString()];

		if(specificInfo.video){
			this.setState({maindisplay: index.toString() + '.mp4'});
		}
		else{
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

	getDescription(){
		var description = '';

		return description;
	},

	// this is designed to render photos and videos only
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
							className='maindisplay'
							style={MainDisplayStyle} 
						/> <br />
						{fileDescription}
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
