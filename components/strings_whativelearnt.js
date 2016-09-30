import React from 'react';

exports.strings = {'en': {heading: 'What I\'ve Learnt So Far', 
	description: '<ol> <li> It\'s possible to write a webpage in React without ' +
		'node.js, but impossible to modularise it. </li>' +
		'<li> Even with node.js installed, you can modularise your code and run ' +
		'it on your own computer, but you may need a module bundler such as ' +
		'Webpack to run it correctly in a client browser. </li>' +
		'<li> In order to use npm\'s fs module, you must be using it server-side. </li>' +
		'<li> Apple devices work differently to Android devices with regards to ' +
		'screen.height, window.outerHeight, etc. </li>' +
		'<li> Firefox is great on desktop, but sucks on mobile! </li>' +
		'</ol>'}, 
	'jp': {heading: '今まで習ったこと', 
		description: '<ol> <li> node.jsを使わなくても、Reactでウェッブページは作れるけど、' +
		'モジュラリゼーションはできない。 </li>' +
		'<li> node.jsをインストールしてても、モジュラリゼーションができて、自分のパソコンでウェッブページが' +
		'表示できるけど、Webpackみたいなやつを使わなかったら、他の人はブラウザーで表示できないと思う。 </li>' +
		'<li> npmのfsモジュールを使う為に、サーバーで使う必要がある。</li>' +
		'<li> screen.heightやwindow.outerHeightなどは、どう言うふうにマネージされるのか、Appleのデバイス' +
		'とAndroidのデバイスが大分違ってしまう。 </li>' +
		'<li> Firefoxはデスクトップでめっちゃいいブラウザーやけど、携帯で全然ダメ！</li>' +
		'</ol>'}
};
