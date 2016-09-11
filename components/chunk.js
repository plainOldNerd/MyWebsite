import React from 'react';

import {Test} from './teststatepassing';

/* this should take as props a file name to open for strings, a value to specify
   whether initially the content of the chunk should be displayed or not, and an 
   optional photo gallery folder.
*/
var Chunk = React.createClass({
	getInitialState(){
		return {
			s: require('./strings_' + this.props.stringsfile).strings,
			expanded: this.props.initiallyExpanded,
			lang: 'en'
		};
	},

	shouldComponentUpdate(nextProps, nextState){
		this.setState(nextState);
		if(this.refs.justtesting){
			this.refs.justtesting.setState({lang: nextState.lang});
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
			if(this.props.photoGallery){
				return(
					<div> 
						<span onClick={this.handleClick}>
							<h1> {strings.heading + '   '} 
								<img src='../collapse.png' height='32'
									width='32' /> 
							</h1>
						</span>
						<Test ref='justtesting'/>
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
