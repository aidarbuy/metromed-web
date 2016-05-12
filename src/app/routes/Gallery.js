import React from 'react';
import Helmet from 'react-helmet';
import dataGallery from '../data/gallery';

export default React.createClass({
	componentDidMount() {
		$("#nanoGallery").nanoGallery({
			theme: 'light',
			colorScheme: 'none',
			colorSchemeViewer: 'dark',
			locationHash: false,
			thumbnailWidth: 'auto', thumbnailHeight: 200,
			thumbnailHoverEffect: [
				{ name:'imageScale150', duration:400, easing:'swing' },
				{ name:'borderLighter' },
				{ name:'labelAppear75' }
			],
			thumbnailGutterWidth : 0,
			thumbnailGutterHeight : 0,
			thumbnailLabel: { 
				display: true, 
				position: 'overImageOnMiddle',
				align:'center'
			}
		});
	},
	render() {
		const gallery = dataGallery.map((item, i) => (
			<a key={i} href={require('../images/gallery/' + item.image)}
				data-ngthumb={require('../images/gallery/' + item.thumb)}
				data-ngdesc={item.desc}
			>
				{item.title}
			</a>
		));
		return (
			<div>
				<Helmet title="Our photo gallery"/>
				<h3>Photo Gallery</h3>
				<div id="nanoGallery">{gallery}</div>
			</div>
		);
	}
});