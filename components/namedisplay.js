import React from 'react';

import {NameDisplay_Strings as name_strings} from './strings_namedisplay';
import {NameDisplayStyle, NameStyle} from './styles';

var NameDisplay = React.createClass({
	getInitialState(){
		return {lang: 'en'};
	},

	getStrings(){
		for(var i=0; i<Object.keys(name_strings).length; ++i)
		{
			if( Object.keys(name_strings)[i] == this.state.lang )
			{
				return {
					name: name_strings[Object.keys(name_strings)[i]].name,
					furigana: name_strings[Object.keys(name_strings)[i]].furigana
				};
			}
		}
	},

	render(){
		var name = this.getStrings().name;
		var furigana = this.getStrings().furigana;

		return(
			<span style={NameDisplayStyle}>
				<span>{furigana}</span><br />
				<span style={NameStyle}>
					{name}
				</span>
			</span>
		);
	}
});

export {NameDisplay};
