import io from 'socket.io-client';
import Button from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import Icon from 'material-ui/svg-icons/navigation/arrow-forward';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
require('./WebRTC.scss');
const POSTER1 = require('../../images/telemed/LocalVideo.jpg');
const POSTER2 = require('../../images/telemed/Connecting.jpg');
const BROWSER_MESSAGE = "Your browser does not support the video tag.";
var localStream;
var socket = io.connect('https://metromed-io.herokuapp.com');
var configuration = { iceServers: [{ urls: [
  'stun:stun.l.google.com:19305',
  'stun:stun1.l.google.com:19305',
  'stun:stun2.l.google.com:19305',
  'stun:stun3.l.google.com:19305',
  'stun:stun4.l.google.com:19305',
  'stun:stun.services.mozilla.com',
]}]};
var peerConnection = new RTCPeerConnection(configuration);
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    console.debug("Sending the candidate to the remote peer");
    socket.emit("ice");
  } else {
    console.debug("All ICE candidates have been sent");
  }
};

socket.on('test', (data) => {
  console.info(data.message);
  socket.emit('test', { 'message': "Test message from client" });
});
socket.on('offer', (data) => {
  peerConnection.setRemoteDescription(data.sdp);
  peerConnection.createAnswer().then((answer) => {
    peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
  })
  .catch((error) => { console.log("createAnswer:", error) });
});
socket.on('answer', (data) => {
  console.log("Received answer from remote peer:", data);
  peerConnection.setRemoteDescription(new RTCSessionDescription(data));
});
socket.on('ice1', (data) => {
  console.log("socket.on('ice1'):", data);
  pc2.addIceCandidate(new RTCIceCandidate(data));
});
socket.on('ice2', (data) => {
  console.log("socket.on('ice2'):", data);
  pc1.addIceCandidate(new RTCIceCandidate(data));
});
socket.on('hangup', (data) => {
  console.log("socket.on('hangup'):", data);
  remoteVideo.src = ""; pc2.close(); pc2 = null;
});

export default class WebRTC extends React.Component {
  contextTypes: {
    store: React.PropTypes.object,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      localVideoClass: 'local-video-full',
      startDisabled: false,
      stopDisabled: true,
      message: "Welcome to MetromedUrgentCare Telemed!",
    };
  }
  start() {
    peerConnection.onaddstream = (event) => {
      this.refs.receivedVideo.srcObject = event.stream;
      this.setState({
        stopDisabled: false,
        message: "Received remote stream",
      });
    };
    peerConnection.createOffer().then((offer) => {
      return peerConnection.setLocalDescription(offer);
    })
    .then(() => {
      console.debug("Sending Offer SDP to a remote peer");
      socket.emit("offer", peerConnection.localDescription);
    })
    .catch((reason) => {
      // An error occurred, so handle the failure to connect
      console.error("createOffer:", reason);
    });
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then((stream) => {
      this.setState({
        message: "Using" + stream.getTracks()[0].label, // camera name
        startDisabled: true,
        stopDisabled: false,
      });
      this.refs.localVideo.srcObject = stream;
      localStream = stream;
    }).catch((error) => {console.error("getUserMedia:", error)});
  }
  receivedOfferSDP(data) {
    console.debug("Received OfferSDP, setting remote description...");
    peerConnection.setRemoteDescription(data.sdp.sdp);
  }
  stop() {
    this.setState({
      startDisabled: false,
      stopDisabled: true,
      message: "Thank you for using our telemedicine service!"
    });
    this.refs.localVideo.srcObject = '';
    var MediaStreamTrack = localStream.getTracks()[0] // if only one media track
    MediaStreamTrack.stop();
  }
  changeLocalVideoClass() {
    this.setState({
      localVideoClass: 'local-video-small',
    });
  }
  render() {
    const { startDisabled, stopDisabled, localVideoClass } = this.state;
    const { store } = this.context;
    return (
      <section>
        <div>
  				<Card>
            <CardActions style={{textAlign:'center'}}>
              <RaisedButton label="Start" primary={true} onTouchTap={this.start.bind(this)} disabled={startDisabled} />
              <RaisedButton label="Stop" secondary={true} onTouchTap={this.stop.bind(this)} disabled={stopDisabled} />
            </CardActions>
            <CardMedia>
              <video id="remoteVideo" className="remote-video" autoPlay poster={POSTER2}>{BROWSER_MESSAGE}</video>
              <div className="local-video-contnainer">
                <video ref="localVideo" autoPlay className={localVideoClass} poster={POSTER1}>{BROWSER_MESSAGE}</video>
              </div>
            </CardMedia>
  					<CardActions style={{textAlign:'center'}}>
              <span>{this.state.message}</span>
  					</CardActions>
  				</Card>
        </div>
			</section>
		);
	}
};