const $ = document;
let container = $.querySelector(".container");
let playPause = $.querySelector(".play-pause");
let IElemPause = $.querySelector(".play-pause i");
let btnBackward = $.querySelector(".skip-backward");
let btnForward = $.querySelector(".skip-forward");
let videoTimeline = $.querySelector(".video-timeline");
let timelineSpanElem = $.querySelector(".video-timeline span");
let progressBar = $.querySelector(".progress-bar");
let progressArea = $.querySelector(".progress-area");
let videoTimelineSpanElem = $.querySelector(".progress-area span");
let volumeIElem = $.querySelector(".volume i");
let inputVolume = $.querySelector('input[type = "range"]');
let speedElem = $.querySelector(".playback-speed span");
let speedOptions = $.querySelector(".speed-options");
let speedOptionsLiElem = $.querySelectorAll(".speed-options li");
let picElem = $.querySelector(".pic-in-pic span");
let fullScreen = $.querySelector(".fullscreen i");
let currenTimePElem = $.querySelector(".current-time");
let videoDurationPElem = $.querySelector(".video-duration");
let video = $.querySelector("video");

playPause.addEventListener("click", () => {
  video.paused ? playVid() : pauseVid(); // solution 1
  // video.paused ? video.play() : video.pause() //solusion 2
});

video.addEventListener('loadeddata' , () => {
   videoDurationPElem.innerHTML = `${timelineFormat(video.duration)}`
   
})


video.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = percent + "%";
  currenTimePElem.innerHTML = `${timelineFormat(video.currentTime)}`
  
});

btnBackward.addEventListener("click", () => {
  video.currentTime -= 5;
});

btnForward.addEventListener("click", () => {
  video.currentTime += 5;
});

volumeIElem.addEventListener("click", () => {
  if(volumeIElem.classList.contains("fa-volume-high")){
    volumeIElem.classList.replace("fa-volume-high", "fa-volume-xmark")
    video.volume = 0
    inputVolume.value = 0

  }else{
    volumeIElem.classList.replace("fa-volume-xmark", "fa-volume-high");
    video.volume = 0.5
    inputVolume.value = 0.5
  }

  
  
});

inputVolume.addEventListener("input", (e) => {
  video.volume = e.target.value;
  if (e.target.value == 0) {
    return volumeIElem.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeIElem.classList.replace("fa-volume-xmark", "fa-volume-high");
  inputVolume.value = video.volume;
});

speedElem.addEventListener("click", () => {
  speedOptions.classList.add("show");
});

speedOptionsLiElem.forEach((option) => {
  option.addEventListener("click", () => {
    video.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

picElem.addEventListener("click", () => video.requestPictureInPicture());

fullScreen.addEventListener("click", () => {
  // container.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullScreen.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  } else {
    container.requestFullscreen();
    fullScreen.classList.replace("fa-expand", "fa-compress");
  }
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  video.currentTime = (e.offsetX / timelineWidth) * video.duration;
  timelineSpanElem.innerHTML = `${timelineFormat(video.currentTime)}`;
  videoTimelineSpanElem.innerHTML = `${timelineFormat(video.currentTime)}`;
  videoTimelineSpanElem.style.left = `${e.offsetX}px`;
})

// solution 1

function playVid() {
  video.play();
  IElemPause.classList.replace("fa-play", "fa-pause");
}

function pauseVid() {
  video.pause();
  IElemPause.classList.replace("fa-pause", "fa-play");
}


//function zir hameja vse time karbord dare

function timelineFormat (time){
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

// solution 2
// video.addEventListener("play" , ()=>IElemPause.classList.replace('fa-play' , 'fa-pause'))
// video.addEventListener("pause" , ()=>IElemPause.classList.replace('fa-pause' , 'fa-play'))

function draggableProgressBar(e) {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  video.currentTime = (e.offsetX / timelineWidth) * video.duration;
  currenTimePElem.innerText = timelineFormat(video.currentTime);
  videoTimelineSpanElem.innerHTML = `${timelineFormat(video.currentTime)}`;
  videoTimelineSpanElem.style.left = `${e.offsetX}px`;
}


videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));

