import io from 'socket.io-client';
require('./WebRTC.scss');

// Подключение к веб-сокетам:
// var socket = io.connect('https://localhost:4200'); // URL сервера веб-сокетов
var socket = io.connect('https://metromed-rtc.herokuapp.com');

// Тестовый запуск:
socket.on('server event', function (data) {
	console.log(data);
  socket.emit('client event', { 'test': 'works' });
});

/*************************************************************
	Обмен информацией между RTCPeerConnection через веб-сокеты
*************************************************************/
// Обработчики получения сообщения от сервера веб-сокетов:
socket.on('offer', function (data) {
  console.log("socket.on('offer'):", data);
  pc2_receivedOffer(data);
});

socket.on('answer', function (data) {
  console.log("socket.on('answer'):", data);
  pc1.setRemoteDescription( new RTCSessionDescription(data) );
});

socket.on('ice1', function (data) {
  console.log("socket.on('ice1'):", data);
  pc2.addIceCandidate(new RTCIceCandidate(data));
});

socket.on('ice2', function (data) {
  console.log("socket.on('ice2'):", data);
  pc1.addIceCandidate(new RTCIceCandidate(data));
});

socket.on('hangup', function (data) {
  console.log("socket.on('hangup'):", data);
  remoteVideo.src = ""; pc2.close(); pc2 = null;
});


// ВКЛЮЧЕНИЕ ЛОКАЛЬНОГО ПОТОКА

// Объявим глобальную переменную для медиапотока:
var localStream = null;

// Объявим глобальную переменную для RTCPeerConnection:
var pc1;

// Глобальная переменная для второго RTCPeerConnection:
var pc2;

// Параметры запрашиваемого медиапотока для getUserMedia:
var streamConstraints = {
  "audio": false,
  "video": true,
  // "video": {
  //   "mandatory": {
  //   	"maxWidth": "320",
  //   	"maxHeight": "240"
  //   },
  //   "optional": []
  // }
};


// Функцией getUserMedia можно также захватить экран и транслировать как MediaStream, указав следующие параметры:
var mediaStreamConstraints = {
    audio: false, 
    video: {
      mandatory: { chromeMediaSource: 'screen'  },
      optional: []
    }
};

/*
	Для успешного доступа к экрану должно выполняться несколько условий:
	- включить флаг снимка экрана в getUserMedia() в chrome://flags/,chrome://flags/;
	- исходный файл должен быть загружен по HTTPS (SSL origin);
	- аудиопоток не должен запрашиваться;
	- не должно выполняться несколько запросов в одной закладке браузера.
*/


/*
	Библиотеки для WebRTC

	Хотя WebRTC еще и не закончен, уже появилось несколько базирующихся на нем библиотек:
	JsSIP предназначена для создания браузерных софтфонов, 
	работающих с SIP-коммутаторами, такими как Asterisk и Camalio. 
	PeerJS упростит создание P2P-сетей для обмена данными, 
	а Holla сократит объем разработки, необходимый для P2P-связи из браузеров.
*/


// Callback-функция, которая будет вызвана в случае успешного выполнения getUserMedia:
function getUserMedia_success(stream) {
  console.log("getUserMedia_success():", stream);
  localVideo.src = URL.createObjectURL(stream); // Подключаем медиапоток к HTML-элементу <video>
  localStream = stream; // и сохраняем в глобальной переменной для дальнейшего использования.
}

// Callback-функция обработчик ошибки, который будет вызван в случае ошибки:
function getUserMedia_error(error) {
  console.log("getUserMedia_error():", error);
}

// Собственно вызов метода getUserMedia — запрос доступа к микрофону и камере:
function getUserMedia_click() {
  console.log("getUserMedia_click()");
  this.setState({
  	startButtonDisabled: true,
  	callButtonDisabled: false,
  })
  navigator.getUserMedia(streamConstraints, getUserMedia_success, getUserMedia_error);
}




/**********************************************************************************************
	RTCMediaConnection

	Объект, предназначенный для установления и передачи медиапотоков по сети между участниками.
	Кроме того, этот объект отвечает за формирование описания медиасессии (SDP),
	получение информации об ICE-кандидатах для прохождения через NAT 
	или сетевые экраны (локальные и с помощью STUN) и взаимодействие с TURN-сервером.
	У каждого участника должно быть по одному RTCMediaConnection на каждое соединение.
	Медиапотоки передаются по шифрованному протоколу SRTP.
*/


/*
	TURN-серверы

	ICE-кандидаты бывают трех типов: host, srflx и relay. 
	Host содержат информацию, полученную локально, 
	srflx — то, как узел выглядит для внешнего сервера (STUN), 
	и relay — информация для проксирования трафика через TURN-сервер. 
	Если наш узел находится за NAT’ом, то host-кандидаты будут содержать локальные адреса 
	и будут бесполезны, 
	кандидаты srflx помогут только при определенных видах NAT 
	и relay будут последней надеждой пропустить трафик через промежуточный сервер.

	Пример ICE-кандидата типа host, с адресом 192.168.1.37 и портом udp/34022:
	a=candidate:337499441 2 udp 2113937151 192.168.1.37 34022 typ host generation 0
*/

// Общий формат для задания STUN/TURN-серверов:
var servers = { "iceServers": [
  // { "url": "stun:stun.stunprotocol.org:3478" },
  // { "url": "turn:user@host:port", "credential": "password" }
  {url: "stun:stun.l.google.com:19305"},
  {url: "stun:23.21.150.121"},
  {url: "stun:stun.1.google.com:19302"},
]};

/*
	Публичных STUN-серверов в интернете много.
	Большой список, например, есть здесь: http://www.voip-info.org/wiki/view/STUN.
	К сожалению, решают они слишком малую часть проблем.

	Публичных же TURN-серверов, в отличие от STUN, практически нет. 
	Связано это с тем, что TURN-сервер пропускает через себя медиапотоки, 
	которые могут значительно загружать и сетевой канал, и сам сервер. 
	Поэтому самый простой способ подключиться к TURN-серверам — установить его самому 
	(понятно, что потребуется публичный IP).
	Из всех серверов, на мой взгляд, наилучший http://code.google.com/p/rfc5766-turn-server.
	Под него есть даже готовый образ для Amazon EC2.

	С TURN пока не все так хорошо, как хотелось бы, но идет активная разработка,
	и хочется надеяться, через какое-то время WebRTC если не сравняется со Skype 
	по качеству прохождения через трансляцию адресов (NAT) и сетевые экраны, 
	то по крайней мере заметно приблизится.
*/

/*
	Для RTCMediaConnection необходим дополнительный механизм обмена управляющей информацией 
	для установления соединения — хотя он и формирует эти данные, но не передает их,
	и передачу другим участниками необходимо реализовывать отдельно:
	/images/techs/PeerExchange.png

	Выбор способа передачи возлагается на разработчика — хоть вручную. 
	Как только обмен необходимыми данными пройдет, 
	RTCMediaConnection установит медиапотоки автоматически (если получится, конечно).
*/

/*
	Модель offer-answer

	Для установления и изменения медиапотоков используется 
	модель offer/answer (предложение/ответ; описана в tools.ietf.org/html/rfc3264)
	и протокол SDP (Session Description Protocol).
	Они же используются и протоколом SIP.

	В этой модели выделяется два агента: 
	Offerer — тот, кто генерирует SDP для создания или модификации сессии (Offer SDP),
	и Answerer — тот, кто получает SDP от другого агента и отвечает ему собственным Answer SDP.
	При этом в спецификации требуется наличие протокола более высокого уровня 
	(например, SIP или собственного поверх веб-сокетов, как в нашем случае), 
	отвечающего за передачу SDP между агентами.

	Какие данные необходимо передать между двумя RTCMediaConnection, 
	чтобы они смогли успешно установить медиапотоки:

	- Первый участник, инициирующий соединение, формирует Offer, в котором передает 
	  структуру данных SDP (этот же протокол для той же цели используется в SIP), 
	  описывающую возможные характеристики медиапотока, который он собирается начать передавать.
	  Этот блок данных необходимо передать второму участнику.
	  Второй участник формирует Answer, со своим SDP и пересылает его первому.

	- И первый и второй участники выполняют процедуру определения возможных ICE-кандидатов,
	  с помощью которых к ним сможет передать медиапоток второй участник. 
	  По мере определения кандидатов информация о них должна передаваться другому участнику.
	  /images/techs/PeerSequence.png
*/

/*
	Формирование Offer

	Для формирования Offer нам понадобятся две функции.
	Первая будет вызываться в случае его успешного формирования.
	Второй параметр метода createOffer() — callback-функция, вызываемая в случае ошибки 
	при его выполнении (при условии, что локальный поток уже доступен).

	Дополнительно понадобятся два обработчика событий: 
	onicecandidate при определении нового ICE-кандидата и 
	onaddstream при подключении медиапотока от дальней стороны.
*/

// Параметры для подготовки Offer SDP:
var offerConstraints = {};

// Первый параметр метода createOffer() — callback-функция, вызываемая при успешном формировании Offer:
function pc1_createOffer_success(desc) {
  console.log("pc1_createOffer_success(): \ndesc.sdp:\n"+desc.sdp+"desc:", desc);
  pc1.setLocalDescription(desc); // Зададим RTCPeerConnection сформированный Offer SDP.
  // Когда дальняя сторона пришлет свой Answer SDP, его нужно будет задать методом setRemoteDescription
  // Пока вторая сторона не реализована, ничего не делаем
  // pc2_receivedOffer(desc);
  // Заменим прямой вызов функций другого участника 
  // отправкой ему сообщения через веб-сокеты:
	socket.emit('offer', desc);
}

// Второй параметр — callback-функция, которая будет вызвана в случае ошибки:
function pc1_createOffer_error(error){
  console.log("pc1_createOffer_success_error(): error:", error);
}

// И объявим callback-функцию, которой будут передаваться ICE-кандидаты по мере их определения:
function pc1_onicecandidate(event){
  if (event.candidate) {
    console.log("pc1_onicecandidate():\n"+ event.candidate.candidate.replace("\r\n", ""), event.candidate);
    // pc2.addIceCandidate(new RTCIceCandidate(event.candidate)); // передаем другому ICE-кандидата
    socket.emit('ice1', event.candidate);
  }
}

// А также callback-функцию для добавления медиапотока от дальней стороны:
function pc1_onaddstream(event) {
  console.log("pc_onaddstream()");
  remoteVideo.src = URL.createObjectURL(event.stream);
}

// При нажатии на кнопку «createOffer» создадим RTCPeerConnection, 
// зададим методы onicecandidate и onaddstream 
// и запросим формирование Offer SDP, вызвав метод createOffer():
function createOffer_click() {
  console.log("createOffer_click()");
  this.setState({ callButtonDisabled: true });
  pc1 = new webkitRTCPeerConnection(servers); // Создаем RTCPeerConnection.
  pc1.onicecandidate = pc1_onicecandidate;    // Callback-функция для обработки ICE-кандидатов.
  pc1.onaddstream = pc1_onaddstream;          // Callback-функция, вызываемая при появлении медиапотока от дальней стороны.
  pc1.addStream(localStream); // Передадим локальный медиапоток (предполагаем, что он уже получен)
  pc1.createOffer(            // И собственно запрашиваем формирование Offer
    pc1_createOffer_success,
    pc1_createOffer_error,
    offerConstraints
  );
}

/**********************************************************************************
	Напомним, SDP — описание параметров медиасессии, доступные кодеки, медиапотоки,
	а ICE-кандидаты — возможные варианты подключения к данному участнику.
 **********************************************************************************/



/*
	ФОРМИРОВАНИЕ ANSWER SDP И ОБМЕН ICE-КАНДИДАТАМИ
	
	И Offer SDP, и каждого из ICE-кандидатов необходимо передать другой стороне
	и там после их получения у RTCPeerConnection вызвать методы:
		- setRemoteDescription для Offer SDP и
		- addIceCandidate для каждого ICE-кандидата, полученного от дальней стороны.
	
	Аналогично в обратную сторону для Answer SDP и удаленных ICE-кандидатов.
	Сам Answer SDP формируется аналогично Offer; 
	разница в том, что вызывается не метод createOffer, а метод createAnswer
	и перед этим RTCPeerConnection методом setRemoteDescription передается Offer SDP,
	полученный от вызывающей стороны.
*/

// Обработка Offer и Answer SDP. Формирование Answer SDP очень похоже на Offer:
function pc2_createAnswer_success(desc) { // в callback-функции, вызываемой при успешном формировании Answer,
  pc2.setLocalDescription(desc); // аналогично Offer, отдадим локальное описание
  console.log("pc2_createAnswer_success()", desc.sdp);
  // pc1.setRemoteDescription(desc); // и передадим полученный Answer SDP первому участнику.
  socket.emit('answer', desc);
}

// Callback-функция, вызываемая в случае ошибки при формировании Answer, полностью аналогична Offer:
function pc2_createAnswer_error(error) {
  console.log('pc2_createAnswer_error():', error);
}

// Параметры для формирования Answer SDP:
var answerConstraints = { 
  'mandatory': { 'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true } 
};

// При получении SDP от дальней стороны создадим RTCPeerConnection и сформируем Answer SDP:
function pc2_receivedOffer(desc) {
  console.log("pc2_receiveOffer()", desc);
  pc2 = new webkitRTCPeerConnection(servers); // Создаем объект RTCPeerConnection для второго участника
  pc2.onicecandidate = pc2_onicecandidate; // Задаем обработчик события при появлении ICE-кандидата
  pc2.onaddstream = pc2_onaddstream; // При появлении потока подключим его к HTML <video>
  pc2.addStream(localStream); // Передадим локальный медиапоток (в нашем примере у второго участника он тот же, что и у первого)
  // Теперь, когда второй RTCPeerConnection готов, передадим ему полученный Offer SDP (первому мы передавали локальный поток)
  pc2.setRemoteDescription(new RTCSessionDescription(desc));
  // Запросим у второго соединения формирование данных для сообщения Answer
  pc2.createAnswer( 
    pc2_createAnswer_success,
    pc2_createAnswer_error,
    answerConstraints
  );
}

// Обработчик события готовности ICE-кандидатов второго участника, зеркально подобен первому:
function pc2_onicecandidate(event) {
  if (event.candidate) {
    console.log("pc2_onicecandidate():", event.candidate.candidate);
    // pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
    socket.emit('ice2', event.candidate);
  }
}

// Сallback-функция для добавления медиапотока от первого участника:
function pc2_onaddstream(event) {
  console.log("pc2_onaddstream()");
  remoteVideo.src = URL.createObjectURL(event.stream);
  localVideo.className = "local-video-small";
}

// Функция для завершения соединения:
function hangUp_click() {
	this.setState({ stopButtonDisabled: true });
  // Отключаем локальное видео от HTML-элементов <video>,
  localVideo.src = ""; pc1.close(); pc1 = null;
  // останавливаем локальный(ые) медиапоток(и),
  localStream.getVideoTracks()[0].stop();
  // localStream.getVideoTracks()[1].stop();
  // устанавливаем указатель = null
  localStream = null;
  socket.emit('hangup', {});
}


// Импортируем React и компоненты Material-UI:
import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardMedia from 'material-ui/Card/CardMedia';
import RaisedButton from 'material-ui/RaisedButton';

// Константы заглушек для видеоэкранов
const POSTER1 = "/images/layerslider/image-1.jpg";
const POSTER2 = "/images/layerslider/image-2.jpg";
const BROWSER_MESSAGE = "Your browser does not support the video tag.";

// Определяем компонент для экспорта:
class WebRTC extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			localVideoClass: 'local-video-full',
			startButtonDisabled: false,
			callButtonDisabled: true,
			stopButtonDisabled: true,
		};
	}
	componentDidMount() {
		// getUserMedia_click();
	}
	changeLocalVideoClass() {
		this.setState({
			localVideoClass: 'local-video-small',
		});
	}
	render() {
		const {
			startButtonDisabled, callButtonDisabled, stopButtonDisabled,
			localVideoClass,
		} = this.state;
		return (
			<section>
				<Card>
					<CardActions style={{textAlign:'center'}}>
						<RaisedButton label="Turn On" id="btn_getUserMedia" primary={true}
							onTouchTap={getUserMedia_click.bind(this)}
							disabled={startButtonDisabled}
						/>
						<RaisedButton label="Call" id="btn_createOffer"secondary={true} 
							onTouchTap={createOffer_click.bind(this)}
							disabled={callButtonDisabled}
						/>
						<RaisedButton label="Hang Up" id="btn_hangUp" secondary={true}
							onTouchTap={hangUp_click.bind(this)}
							disabled={stopButtonDisabled}
						/>
					</CardActions>
					<CardMedia>
						<video id="remoteVideo" className="remote-video" autoPlay poster={POSTER2}>{BROWSER_MESSAGE}</video>
						<div className="local-video-contnaine">
							<video id="localVideo" className={localVideoClass} autoPlay poster={POSTER1}>{BROWSER_MESSAGE}</video>
						</div>
					</CardMedia>
				</Card>
			</section>
		);
	}
}

// Экспонируем компонент:
export default WebRTC;