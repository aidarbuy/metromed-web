// src/app/routes/Gallery.jsx
import React from 'react';
import Helmet from 'react-helmet';

export default React.createClass({
	componentDidMount() {
		$("#nanoGallery").nanoGallery({
			// default, clean, light or custom
			theme: 'light',
			// Gallery color scheme (breadcrumb and thumbnails).
			// none, dark, darkRed, darkGreen, darkBlue, darkOrange, light, lightBackground
			// Custom color schemes are supported.
			// 'none'
			colorScheme: 'none',
			// colorScheme: 'myColorScheme',
			colorSchemeViewer: 'dark',
			// colorSchemeViewer: 'darkBlue',
			locationHash: false,
			thumbnailWidth: 'auto', thumbnailHeight: 200,
			// thumbnailWidth: 260, thumbnailHeight: 'auto',
			itemsBaseURL:'images/gallery',

			/* 
				Thumbnail mouse hover effect. The effect will also be triggered by 'tap' on touch-screen.
				Possible parameters: 'name', 'duration', 'durationBack', 'easing', 'easingBack', 'delay', 'delayBack'. (Only 'name' is mandatory.) 
				Combinations: define multiple effect names in the parameter to combine them.
				Example: thumbnailHoverEffect='borderDarker,labelAppear75'
				Please note that some effects can not be combined (for example: 'imageSlideUp' and 'imageFlipHorizontal'). And some combinations can results in weirds effects...
				Possible values:
					'none'
					'borderLighter', 'borderDarker', 
					'scale120', 'scaleLabelOverImage', 'overScale', 'overScaleOutside', 
					'slideUp', 'slideDown', 'slideRight', 'slideLeft', 
					'rotateCornerBL', 'rotateCornerBR', 
					'imageScale150', 'imageScaleIn80', 'imageScale150Outside', 
					'imageSplit4', 'imageSplitVert', 
					'imageSlideUp', 'imageSlideDown', 'imageSlideRight', 'imageSlideLeft', 
					'imageRotateCornerBL', 'imageRotateCornerBR', 'imageFlipHorizontal', 'imageFlipVertical', 
					'labelAppear', 'labelAppear75', 'labelOpacity50', 
					'descriptionAppear', 'descriptionSlideUp', 
					'labelSlideUpTop', 'labelSlideUp', 'labelSlideDown', 
					'labelSplit4', 'labelSplitVert', 'labelAppearSplit4', 'labelAppearSplitVert'
			*/
			thumbnailHoverEffect: [{name:'imageScale150', duration:400, easing:'swing' }, {name:'borderLighter'}, {name:'labelAppear75'}],

			thumbnailGutterWidth : 0,
			thumbnailGutterHeight : 0,
			thumbnailLabel: { display:true, position:'overImageOnMiddle', align:'center' }

			// itemsSelectable: true,
			// showCheckboxes: false,
			// thumbnailOpenImage: true
		});
	},

	render() {
		return (
			<div>
				<Helmet title="MetromedUC photo gallery"/>

				<h3>Photo Gallery</h3>

				<div id="nanoGallery">
					<a href="lounge.jpg" 
						data-ngthumb="lounge-thumb.jpg" 
						data-ngdesc="Our comfortable lobby"
					>
						Lounge
					</a>
					<a href="three-medics.jpg" 
						data-ngthumb="/three-medics-thumb.jpg" 
						data-ngdesc="Matt, Doreen and Karl"
					>
						Team members
					</a>
					<a href="doreen.jpg" 
						data-ngthumb="doreen-thumb.jpg" 
						data-ngdesc="Doreen"
					>
						Doreen
					</a>
					<a href="team.jpg" 
						data-ngthumb="team-thumb.jpg" 
						data-ngdesc="Our team"
					>
						Team
					</a>
					<a href="x-ray.jpg" 
						data-ngthumb="x-ray-thumb.jpg" 
						data-ngdesc="Our x-ray room"
					>
						X-ray room
					</a>
					<a href="x-ray-diag.jpg" 
						data-ngthumb="x-ray-diag-thumb.jpg" 
						data-ngdesc="X-ray diagnosis"
					>
						X-ray
					</a>
					<a href="matt.jpg" 
						data-ngthumb="matt-thumb.jpg" 
						data-ngdesc="Matt Mastiano"
					>
						Matt
					</a>
					<a href="x-ray-setup.jpg" 
						data-ngthumb="x-ray-setup-thumb.jpg" 
						data-ngdesc="X-Ray setup"
					>
						Setup
					</a>
					<a href="nursha.jpg" 
						data-ngthumb="nursha-thumb.jpg" 
						data-ngdesc="Nursha Zh"
					>
						Nursha
					</a>
					<a href="saltanat.jpg" 
						data-ngthumb="saltanat-thumb.jpg" 
						data-ngdesc="Saltanat Zh"
					>
						Saltanat
					</a>
				</div>
			</div>
		);
	}
});