import React from 'react';
import {ThumbnailStyle} from './styles';

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
			thumbnails: []
		};
	},

	prepareThumbnails(){
		var giLength = Object.keys(this.state.gi).length;

		for(var i=0; i<giLength; ++i){
			this.state.thumbnails.push(
				<img src={"../photogalleries/" + this.props.files + "/" + 
					i.toString() + ".jpg"} alt={i.toString() + ".jpg"} 
					height="100px" width="100px" key={this.props.files + "-" + i}
					style={ThumbnailStyle} />
			);
		}
	},

	render(){
		this.prepareThumbnails();

		return(
			<div>
				{this.state.thumbnails}
			</div>
		);
	}
});

export {PhotoGallery};
