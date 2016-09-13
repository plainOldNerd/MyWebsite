import React from 'react';

import {PhotoGallery} from './photogallery';

/* this is set in getInitialState method
   for the photo gallery to be rendered, it is IMPERATIVE that the photos are
   contained within a folder of the same name as this.props.files and that 
   folder contains a file thisExists.js
*/
var photoGalleryExists;

/* this should take as props "files" which specifies which file to get strings 
   from, but also is used to check for the existence of a photo gallery folder. 
   A value to specify whether initially the content of the chunk should be 
   displayed or not is also given.
*/
var Chunk = React.createClass({
	getInitialState(){
		try{
			require('../photogalleries/' + this.props.files + '/thisExists');
			photoGalleryExists = true;
		}
		catch(err){
			photoGalleryExists = false;
		}

		return {
			s: require('./strings_' + this.props.files).strings,
			expanded: this.props.initiallyExpanded,
			lang: 'en'
		};
	},

	shouldComponentUpdate(nextProps, nextState){
		this.setState(nextState);
		if(this.refs.pg){
			this.refs.pg.setState({lang: nextState.lang});
		}
		return true;
	},

	getStrings(){
		for(var i=0; i<Object.keys(this.state.s).length; ++i)
		{
			if( Object.keys(this.state.s)[i] == this.state.lang )
			{
				return {
					heading: this.state.s[Object.keys(this.state.s)[i]].heading,
					description: this.state.s[Object.keys(this.state.s)[i]].description
				};
			}
		}
	},

	handleClick(){
		this.setState({expanded: !this.state.expanded});
	},

	render(){
		var strings = this.getStrings();

		if(this.state.expanded){
			if(photoGalleryExists){
				return(
					<div> 
						<span onClick={this.handleClick}>
							<h1> {strings.heading + '   '} 
								<img src='../collapse.png' height='32'
									width='32' /> 
							</h1>
						</span>
						<PhotoGallery ref='pg'/>
						<p dangerouslySetInnerHTML={{__html: strings.description}}>
						</p>
					</div>
				);
			}
			else{
				return(
					<div> 
						<span onClick={this.handleClick}>
							<h1> {strings.heading + '   '} 
								<img src='../collapse.png' height='32'
									width='32' /> 
							</h1>
						</span>
						<p dangerouslySetInnerHTML={{__html: strings.description}}>
						</p>
					</div>
				);
			}
		}
		else{
			return(
				<div>
					<span onClick={this.handleClick}>
						<h1> {strings.heading + '   '} 
							<img src='../expand.png' height='32'
								width='32' /> 
						</h1>
					</span>
				</div>
			);
		}
	}
});

export {Chunk};
