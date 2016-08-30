import React from 'react';

import {LangSelectorStyle} from './styles';

/* this should perhaps be a constant global. that could assist in guaranteeing 
   consistency between all components as to available languages. 
*/
var languages = [{option: 'English', value: 'en'}, {option: '日本語', value: 'jp'}];

var Selector = React.createClass({

	langSelected(event){
		this.props.langChosen(event.target.value);
	},

	render(){
		/* we could maybe detect the language of the OS and have that be the 
   		   'selected' option, but that's fancier than I care to do at the moment
		*/
		var options = languages.map(
			function(optval, index){
				return(
					<option value={optval.value} key={'langOption' + index}> 
						{optval.option} 
					</option>
				);
			}
		);

		return(
			<div style={LangSelectorStyle}>
				<select onChange={this.langSelected}>
					{options}
				</select>
			</div>
		);
	}
});

export {Selector};
