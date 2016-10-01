import React from 'react';

import {PhotoGallery} from './photogallery';

/* this should take as props "files" which specifies which file to get strings 
   from, but also is used to check for the existence of a photo gallery folder. 
   A value to specify whether initially the content of the Chunk should be 
   displayed or not is also given.
*/
var Chunk = React.createClass({
	getInitialState(){
		//  determine if a photo gallery is associated with this Chunk
		var pge;
		try{
			require('../photogalleries/' + this.props.files + '/files');
			pge = true;
		}
		catch(err){
			pge = false;
		}

		return {
			photoGalleryExists: pge,
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
			if(this.state.photoGalleryExists){
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
						<PhotoGallery files={this.props.files} 
							initialLang={this.state.lang} ref='pg'/>
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
