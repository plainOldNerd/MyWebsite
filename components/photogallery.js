import React from 'react';
import {ThumbnailStyle, MainDisplayDivStyle} from './styles';

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
			<img src={"../photogalleries/" + this.props.files + "/" + 
				this.props.index.toString() + ".jpg"} 
				alt={this.props.index.toString() + ".jpg"} 
				height="100px" width="100px" 
				onClick={this.handleClick}
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
			// "s" short for "strings"
			s: require('./strings_' + this.props.files).strings,
			// "gi" short for "galleryinfo"
			gi: require('../photogalleries/' + this.props.files + '/files').info,
			thumbnails: [],
			maindisplay: '0'
		};
	},

	handleThumbnailClick(index){
		console.log('thumbnail ' + index + ' was clicked!');
	},

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

	render(){
		return(
			<div>
				<div>
					{this.state.thumbnails}
				</div>
				<div style={MainDisplayDivStyle}>
					<img src={"../photogalleries/" + this.props.files + "/" +
							this.state.maindisplay.toString() + ".jpg"}
						alt="some shit fucked up!" style={ThumbnailStyle} />
				</div>
			</div>
		);
	}
});

export {PhotoGallery};
