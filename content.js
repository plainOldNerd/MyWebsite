import React from 'react';
import ReactDOM from 'react-dom';

import {Selector} from './components/langselector';
import {NameDisplay} from './components/namedisplay';
import {Chunk} from './components/chunk';

var NameDisplayStyle = {
	display: 'inline'
};

var Content = React.createClass({
	getInitialState(){
		return {cbRefs: []};
	},

	/*  https://facebook.github.io/react/docs/more-about-refs.html
		states that string refs will likely be deprecated in future. This is
		hugely inconvenient, and means that every callback ref must be manually
		added to an array to have a forEach loop work
	*/
	componentDidMount(){
		this.state.cbRefs.push(this.name);
		this.state.cbRefs.push(this.aboutthissite);
		this.state.cbRefs.push(this.usefullinks);
		this.state.cbRefs.push(this.whativelearnt);
		this.state.cbRefs.push(this.acknowledgements);
	},

	handleLangSelect(chosen){
		this.state.cbRefs.forEach(
			(component) => {component.setState({lang: chosen})}
		);
	},

	render(){
		return(
			<div>
				<div>
					<Selector langChosen={this.handleLangSelect} /><br />
					<NameDisplay ref={(ref) => {this.name = ref}} /><br />
				</div>

				<Chunk stringsfile='usefullinks' initiallyExpanded={true} 
					ref={(ref) => {this.usefullinks = ref}} />
				<Chunk stringsfile='aboutthissite' initiallyExpanded={true}
					ref={(ref) => {this.aboutthissite = ref}} />
				<Chunk stringsfile='whativelearnt' initiallyExpanded={false}
					ref={(ref) => {this.whativelearnt = ref}} />
				<Chunk stringsfile='acknowledgements' initiallyExpanded={false}
					ref={(ref) => {this.acknowledgements = ref}} />
			</div>
		);
	}
});

ReactDOM.render(<Content />, document.getElementById('content'));
