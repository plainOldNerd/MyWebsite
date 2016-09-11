import React from 'react';

exports.strings = {'en': {heading: 'What I\'ve Learnt So Far', 
	description: '<ol> <li> It\'s possible to write a webpage in React without ' +
		'node.js, but impossible to modularise it. </li>' +
		'<li> Even with node.js installed, you can modularise your code and run ' +
		'it on your own computer, but you will need a module bundler such as ' +
		'Webpack to run it correctly in a client browser. </li>' +
		'<li> Webpack is not part of npm, but can be installed using npm. </li>' +
		'<li> Learning about Express may be useful in future. </li>' +
		'<li> Apple devices work differently to Android devices with regards to ' +
		'screen.height, window.outerHeight, etc. </li>' +
		'<li> Android dispatches an orientationchange ' + 
		'<a href="https://en.wikipedia.org/wiki/Event_(computing)" target="_blank"> ' +
		'event </a> several milliseconds before a resize ' +
		'<a href="https://en.wikipedia.org/wiki/Event_(computing)" target="_blank"> ' + 
		'event. </li>' +
		'<li> Different browsers will handle the same CSS code in different ways. ' +
		'A friend has recommended Bootstrap, which I\'ll look into in future. </li>' +
		'</ol>'}, 
	'jp': {heading: '今まで習ったこと', 
		description: '<ol> <li> node.jsを使わなくても、Reactでウェッブページは作れるけど、' +
		'モジュラリゼーションはできない。 </li>' +
		'<li> node.jsをインストールしてても、モジュラリゼーションができて、自分のパソコンでウェッブページが' +
		'表示できるけど、Webpackみたいなやつを使わなかったら、他の人はブラウザーで表示できないと思う。 </li>' +
		'<li> Webpackはnpmの部分じゃないけど、npmを使ってインストールできる。 </li>' +
		'<li> Expressのことを自習すればいいかも。 </li>' +
		'<li> screen.heightやwindow.outerHeightなどは、どう言うふうにマネージされるのか、Appleのデバイス' +
		'とAndroidのデバイスが大分違ってしまう。 </li>' +
		'<li> Androidのデバイスには、orientationchangeの' +
		'<a href="https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)" target="_blank">' +
		'イベント</a>のを出すのとresizeの' + 
		'<a href="https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)" target="_blank">' +
		'イベント</a>を出すのはミリ秒がいくつかある。</li>' +
		'<li> 同じCSSコードでも、違うブラウザーが違うふうに表示させる。或る友人がBootstrapのことを' + 
		'勧めしてくれて、未来には調べる。 </li>' +
		'</ol>'}
};
