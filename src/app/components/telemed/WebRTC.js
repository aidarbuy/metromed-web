/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

// require('https://webrtc.github.io/adapter/adapter-latest.js');

import io from 'socket.io-client';
var socket0 = io('https://metromed-io.herokuapp.com/');
var socket2 = io('https://metromed-io2.herokuapp.com/');
var socket = (typeof socket0 === "Socket") ? socket2 : socket0;
var localVideo, remoteVideo, startTime, localStream, pc, pc1, pc2;
var servers = { iceServers: [{ urls: [
	'stun:stun.l.google.com:19305',
	'stun:stun1.l.google.com:19305',
	'stun:stun2.l.google.com:19305',
	'stun:stun3.l.google.com:19305',
	'stun:stun4.l.google.com:19305',
	'stun:stun.services.mozilla.com',
]}]};

function getName(pc) {
	return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
	return (pc === pc1) ? pc2 : pc1;
}

function gotStream(stream) {
	trace('Received local stream');
	localVideo.srcObject = stream;
	localStream = stream;
	this.setState({callButtonDisabled: false});
}

function start() {
	trace('Requesting local stream');
	this.setState({startButtonDisabled: true});
	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: { width: 1280 }
	})
	.then(gotStream.bind(this))
	.catch(function(e) {
		alert('getUserMedia() error: ' + e.name);
	});
}

function call() {
	this.setState({
		callButtonDisabled: true,
		hangupButtonDisabled: false,
	});
	trace('Starting call');
	startTime = window.performance.now();
	var videoTracks = localStream.getVideoTracks();
	var audioTracks = localStream.getAudioTracks();
	if (videoTracks.length > 0) {
		trace('Using video device: ' + videoTracks[0].label);
	}
	if (audioTracks.length > 0) {
		trace('Using audio device: ' + audioTracks[0].label);
	}
	pc1 = new RTCPeerConnection(servers);
	trace('Created local peer connection object pc1');
	pc1.onicecandidate = function(e) {
		onIceCandidate(pc1, e);
	};
	pc1.oniceconnectionstatechange = function(e) {
		onIceStateChange(pc1, e);
	};

	pc1.addStream(localStream);
	trace('Added local stream to pc1');

	trace('pc1 createOffer start');
	pc1.createOffer({
		offerToReceiveAudio: 1,
		offerToReceiveVideo: 1
	}).then(
		onCreateOfferSuccess,
		onCreateSessionDescriptionError
	);
}

function onCreateSessionDescriptionError(error) {
	trace('Failed to create session description: ' + error.toString());
}

function onCreateOfferSuccess(desc) {
	trace('Offer from pc1\n' + desc.sdp);
	trace('pc1 setLocalDescription start');
	pc1.setLocalDescription(desc).then(
		function() {
			onSetLocalSuccess(pc1);
			socket.emit('offer', desc);
		},
		onSetSessionDescriptionError
	);
}

function onSetLocalSuccess(pc) {
	trace(getName(pc) + ' setLocalDescription complete');
}

function onSetRemoteSuccess(pc) {
	trace(getName(pc) + ' setRemoteDescription complete');
}

function onSetSessionDescriptionError(error) {
	trace('Failed to set session description: ' + error.toString());
}

function gotRemoteStream(e) {
	remoteVideo.srcObject = e.stream;
	trace('pc2 received remote stream');
	this.setState({
		callButtonDisabled: true,
		hangupButtonDisabled: false,
	});
}

function onCreateAnswerSuccess(desc) {
	trace('Answer from pc2:\n' + desc.sdp);
	trace('pc2 setLocalDescription start');
	pc2.setLocalDescription(desc).then(
		function() {
			onSetLocalSuccess(pc2);
			socket.emit('answer', desc);
		},
		onSetSessionDescriptionError
	);
}

function onIceCandidate(pc, event) {
	if (event.candidate) {
		socket.emit('ice', {
			pc: getName(pc),
			candidate: event.candidate
		});
		trace(getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
	}
}

socket.on('ice', (data) => {
	pc = pc1 ? pc1 : pc2;
	pc.addIceCandidate(
		new RTCIceCandidate(data.candidate)
	).then(
		function() {
			onAddIceCandidateSuccess(data.pc);
		},
		function(err) {
			onAddIceCandidateError(data.pc, err);
		}
	);
});

function onAddIceCandidateSuccess(pc) {
	trace(getName(pc) + ' addIceCandidate success');
}

function onAddIceCandidateError(pc, error) {
	trace(getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
}

function onIceStateChange(pc, event) {
	if (pc) {
		trace(getName(pc) + ' ICE state: ' + pc.iceConnectionState);
		console.log('ICE state change event: ', event);
	}
}

function hangup() {
	trace('Ending call');
	pc = pc1 ? pc1 : pc2;
	pc.close();
	pc = null;
	this.setState({
		hangupButtonDisabled: true,
		callButtonDisabled: false,
	});
}

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
const buttons = [{
	ref: 'startButton',
	label: "Start",
	primary: true,
	stateName: 'startButtonDisabled',
	functionName: start,
},{
	ref: 'callButton',
	label: "Call",
	primary: true,
	stateName: 'callButtonDisabled',
	functionName: call,
},{
	ref: 'hangupButton',
	label: "Hang Up",
	secondary: true,
	stateName: 'hangupButtonDisabled',
	functionName: hangup,
},{
	ref: 'stopButton',
	label: "Stop",
	secondary: true,
	stateName: 'stopButtonDisabled',
	functionName: stop,
}];
import CardMedia from 'material-ui/Card/CardMedia';
const LOCAL_POSTER = require('../../images/telemed/local-video.jpg');
const REMOTE_POSTER = require('../../images/telemed/connecting.jpg');
const BROWSER_MESSAGE = "Your browser does not support video tags";
export default class WebRTC extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			callButtonDisabled: true,
			hangupButtonDisabled: true,
			stopButtonDisabled: true,
		};
	}
	componentDidMount() {
		localVideo = this.refs.localVideo;
		remoteVideo = this.refs.remoteVideo;
		socket.on('offer', (desc) => {
			pc2 = new RTCPeerConnection(servers);
			trace('Created remote peer connection object pc2');
			pc2.addStream(localStream);
			trace('pc2 setRemoteDescription start');
			pc2.setRemoteDescription(desc).then(
				function() {
					onSetRemoteSuccess(pc2);
				},
				onSetSessionDescriptionError
			);
			pc2.onicecandidate = function(e) {
				onIceCandidate(pc2, e);
			};
			pc2.oniceconnectionstatechange = function(e) {
				onIceStateChange(pc2, e);
			};
			trace('pc2 createAnswer start');
			// Since the 'remote' side has no media stream we need
			// to pass in the right constraints in order for it to
			// accept the incoming offer of audio and video.
			pc2.createAnswer().then(
				onCreateAnswerSuccess,
				onCreateSessionDescriptionError
			);
			pc2.onaddstream = gotRemoteStream.bind(this);
		});
		socket.on('answer', (desc) => {
			trace('pc1 setRemoteDescription start');
			pc1.setRemoteDescription(desc).then(
				function() {
					onSetRemoteSuccess(pc1);
				},
				onSetSessionDescriptionError
			);
			pc1.onaddstream = gotRemoteStream.bind(this);
		});
	}
	render() {
		const buttonsSliced = buttons.slice(0, 3);
		const buttonsMapped = buttonsSliced.map((button, i) => (
			<RaisedButton key={i} ref={button.ref} label={button.label}
				primary={button.primary} secondary={button.secondary}
				disabled={this.state[button.stateName]}
				onTouchTap={button.functionName.bind(this)}
			/>
		));
		return (
			<Card>
				<CardActions style={{textAlign:'center'}}>
					{buttonsMapped}
				</CardActions>
				<CardMedia>
					<div>
						<video muted autoPlay ref="localVideo" poster={LOCAL_POSTER} style={styles.video}>{BROWSER_MESSAGE}</video>
						<video autoPlay ref="remoteVideo" poster={REMOTE_POSTER} style={styles.video}>{BROWSER_MESSAGE}</video>
					</div>
				</CardMedia>
			</Card>
		);
	}
};

import { cyan700 } from 'material-ui/styles/colors';
const styles = {
	video : {
		width: '50%',
		border: '1px solid ' + cyan700,
		boxSizing: 'border-box',
	},
};