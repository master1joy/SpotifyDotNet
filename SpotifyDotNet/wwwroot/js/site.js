var playButton = document.querySelectorAll(".random-play");
let myProgressBar = document.getElementById('myProgressBar');
var poster = document.querySelector('.poster-img');
var music = new Audio("music/1.mp3");
let masterPlay = document.getElementById("masterplay");
let songItems = document.querySelectorAll('.song');
let GIF = document.getElementById('playing');

let playAllButton = document.querySelector(".playAll");
GIF.style.opacity = '0';
var songIndex = 0;
var songURL = "";
const myMusic = [];

const songs = [
    { name: "Zaroorat", Album: "Ek Villain", filePath: "music/1.mp3", coverPath: "poster/1.jpeg" },
    { name: "Hamdard", Album: "Ek Villain", filePath: "music/2.mp3", coverPath: "poster/2.jpeg" },
    { name: "O-Meri-Jaan", Album: "Ek Villain", filePath: "music/3.mp3", coverPath: "poster/3.jpeg" },
    { name: "Tu-Hi-Yaar-Mera", Album: "Ek Villain", filePath: "music/4.mp3", coverPath: "poster/4.jpeg" },
    { name: "Dil", Album: "Ek Villain Returns", filePath: "music/5.mp3", coverPath: "poster/5.jpeg" },
    { name: "Galliyan Returns", Album: "Ek Villain Returns", filePath: "music/6.mp3", coverPath: "poster/6.jpeg" },
    { name: "Na tere bin", Album: "Ek Villain Returns", filePath: "music/7.mp3", coverPath: "poster/6.jpeg" },
    { name: "Shamaat", Album: "Ek Villain Returns", filePath: "music/8.mp3", coverPath: "poster/6.jpeg" }
]

//play common function
function playMusic(songIndex) {
    music.src = songs[songIndex].filePath;
    music.play();
    poster.setAttribute('src', songs[songIndex].coverPath);

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    GIF.style.opacity = '1';
}

function makeAllBtnPlay(input) {
    for (let index = 0; index < playButton.length; index++) {
        if (index !== input) {
            playButton[index].classList.remove("fa-pause");
            playButton[index].classList.add("fa-play");
        }

    }
}

//random play
songs.forEach((song, i) => {
    playButton[i].addEventListener("click", function () {
        // music.src=song.filePath;
        // music.play();
        console.log('playButton' + i)
        playButton[i].classList.remove("fa-play");
        playButton[i].classList.add("fa-pause");
        // masterPlay.classList.remove("fa-play-circle");
        // masterPlay.classList.add('fa-pause-circle');
        // GIF.style.opacity='1';
        // poster.setAttribute('src',song.coverPath);
        playMusic(i);
        makeAllBtnPlay(i);
    })
})


songItems.forEach((element, i) => {
    element.getElementsByClassName("song-icon")[0].setAttribute('src', songs[i].coverPath);
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].name;
    element.getElementsByClassName('album')[0].innerHTML = songs[i].Album;
})


//Handle play/pause
masterPlay.addEventListener("click", function () {

    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add('fa-pause-circle');
        GIF.style.opacity = '1';
    }
    else {
        music.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add('fa-play-circle');
        GIF.style.opacity = '0';
    }
})
// Handle progress
music.addEventListener("timeupdate", () => {
    if (music.currentTime === music.duration) {
        AutoPlay();
    }
    document.getElementsByName("audioCurrentTime")[0].innerHTML = music.currentTime;
    let rem = (parseInt(music.currentTime) % 60);
    let rem2 = (parseInt(music.duration) % 60);
    document.getElementsByName("audioCurrentTime")[0].innerHTML = Math.trunc(parseInt(music.currentTime) / 60) + `:${rem > 9 ? rem : '0' + rem}`;
    document.getElementsByName("audioDuration")[0].innerHTML = Math.round(parseInt(music.duration) / 60) + `:${rem2 > 9 ? rem2 : '0' + rem2}`;
    let progress = parseInt((music.currentTime / music.duration) * 100);
    myProgressBar.value = progress;

})
//Handle progress Bar change
myProgressBar.addEventListener("change", () => {
    music.currentTime = myProgressBar.value * music.duration / 100;
})
// function to get song sequence
function getCurrentSequence() {
    songURL = music.src;
    let position = parseInt(songURL.search(".mp3"));
    position = position - 1;
    return parseInt(songURL.charAt(position));
}
//play backward
document.querySelector('.fa-step-backward').addEventListener('click', () => {
    songIndex = getCurrentSequence();
    songIndex = songIndex - 2;
    playMusic(songIndex);
})
//play forward
document.querySelector('.fa-step-forward').addEventListener('click', () => {
    songIndex = getCurrentSequence();
    playMusic(songIndex);
})


function AutoPlay() {
    if (songIndex < 7) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    playMusic(songIndex);
}

var likeButtons = document.querySelectorAll(".fa-heart");
likeButtons.forEach(element => {
    element.addEventListener("click", () => {
        element.style.color = "#f10433";
        let likedSong = element.previousElementSibling.innerText;
        myMusic.push(likedSong);
        console.log(myMusic);

    })
})

playAllButton.addEventListener("click", () => {
    playMusic(0);
})
function randomSequence() {
    let term = Math.floor(Math.random() * songs.length);
    return term;
}

let shuffle = document.querySelector(".fa-shuffle");
shuffle.addEventListener("click", () => {
    songIndex = randomSequence();
    playMusic(songIndex);
})
let repeat = document.querySelector(".fa-repeat");
repeat.addEventListener("click", () => {
    if (music.currentTime < music.duration) {
        songIndex = getCurrentSequence();
        songIndex--;
        playMusic(songIndex);
    }
})