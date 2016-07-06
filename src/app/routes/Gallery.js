import dataGallery from '../data/gallery';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
// import { storage } from '../data/firebase';

class Gallery extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	urls: [],
		// };
	}

	// componentWillMount() {
	// 	var urls = [];
	// 	dataGallery.map((item, i) => {
	// 		storage.ref('images/gallery/' + item.image).getDownloadURL().then(URL => {
	// 			urls.push(URL);
	// 			this.setState({urls});
	// 		}).catch(error => {
	// 			let msg1 = "File doesn't exist",
	// 				msg2 = "User doesn't have permission to access the object",
	// 				msg3 = "User canceled the upload",
	// 				msg4 = "Unknown error occurred, inspect the server response";
	// 			switch (error.code) {
	// 				case 'storage/object_not_found': console.log(msg1); break;
	// 				case 'storage/unauthorized': console.log(msg2); break;
	// 				case 'storage/canceled': console.log(msg3); break;
	// 				case 'storage/unknown': console.log(msg4); break;
	// 			}
	// 		});
	// 	});
	// }

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
	}

	render() {
		return (
			<section>
				<Helmet title="Photo gallery"/>

				<h3>Photo Gallery</h3>

				<div id="nanoGallery">
					{dataGallery.map((photo, index) => (
						<a key={index}
							href 		 = { photo.image }
							data-ngthumb = { photo.thumb }
							data-ngdesc  = { photo.desc }
						>
							{photo.title}
						</a>
					))}
				</div>
			</section>
		);
	}
}

export default Gallery;