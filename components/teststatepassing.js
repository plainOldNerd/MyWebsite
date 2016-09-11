import React from 'react';

var strings = {'en': {testmessage: 'it seems that passing state works'},
		'jp': {testmessage: 'ステートを伝えるのができたらしいね'}
};

var Test = React.createClass({
	getInitialState(){
		return({lang: 'en'});
	},

	getStrings(){
		for(var i=0; i<Object.keys(strings).length; ++i)
			if( Object.keys(strings)[i] == this.state.lang )
			{
				return {
					testmessage: strings[Object.keys(strings)[i]].testmessage
				};
			}
	},

	render(){
		var s = this.getStrings();

		return(
			<p> {s.testmessage} </p>
		);
	}
});

export {Test};
