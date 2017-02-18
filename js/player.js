window.addEventListener('load', function() {

	// Video Container
	video = document.getElementById('video');
	pauseScreen = document.getElementById('screen');
	// Progress Bar Container
	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	// Buttons Container
	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');
	fullscreenButton = document.getElementById('fullscreen-button');
	screenButton = document.getElementById('screen-button');

	video.load();
	video.addEventListener('canplay', function() {

		playButton.addEventListener('click', playOrPause, false);
		pbarContainer.addEventListener('click', skip, false);
		updatePlayer();
		soundButton.addEventListener('click', muteOrUnmute, false);
		sbarContainer.addEventListener('click', changeVolume, false);
		fullscreenButton.addEventListener('click', toggleFullscreen, false);
		pauseScreen.addEventListener('click', playOrPause, false);

	}, false);

}, false);

function playOrPause() {
	if (video.paused) {
		video.play();
		playButton.src = 'images/pause.png';
		screenButton.src = 'images/play.png';
		screenButton.style.opacity = 1;
		var fade = setInterval(function(){
			if (screenButton.style.opacity == 0) {
		      clearInterval(fade);
		    } else {
		      screenButton.style.opacity -= 0.1;
		    }
		}, 100);
		update = setInterval(updatePlayer, 30);
	} else {
		video.pause();
		playButton.src = 'images/play.png';
		window.clearInterval(update);
		screenButton.src = 'images/pause.png';
		screenButton.style.opacity = 1;
		var fade = setInterval(function(){
			if (screenButton.style.opacity == 0) {
		      clearInterval(fade);
		    } else {
		      screenButton.style.opacity -= 0.1;
		    }
		}, 100);
	}
}

function updatePlayer() {
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage + '%';
	timeField.innerHTML = getFormattedTime();
	if (video.ended) {
		window.clearInterval(update);
		playButton.src = 'images/replay.png';
		pauseScreen.style.display = 'block';
		screenButton.src = 'images/replay.png';
	}else if(video.paused){
		playButton.src = 'images/play.png';
		screenButton.src = 'images/play.png';
	}
}

function skip(ev) {
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX/width)*video.duration;
	updatePlayer();
}

function getFormattedTime() {
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	if (minutes > 0) seconds -= minutes*60;
	if (seconds.toString().length === 1) seconds = '0' + seconds;

	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);
	if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
	if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

	return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
	if (!video.muted) {
		video.muted = true;
		soundButton.src = 'images/mute.png';
		sbar.style.display = 'none';
	} else {
		video.muted = false;
		soundButton.src = 'images/sound.png';
		sbar.style.display = 'block';
	}
}

function changeVolume(ev) {
	var mouseX = ev.pageX - sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width)*100 + '%';
	video.muted = false;
	soundButton.src = 'images/sound.png';
	sbar.style.display = 'block';
}

function toggleFullscreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	}
}