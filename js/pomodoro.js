$(document).ready(function(){

    init(); 

});

let pause = true,
    pauseElement = document.getElementById('pause'),
    playElement = document.getElementById('play'),
    errorMessage = document.getElementById('errorMessage'),
    breakLength,
    sessionLength,
    sessionCounter,
    breakCounter;

const buzzer = document.getElementById('buzzer'),
    tickTok = document.getElementById('tickTok'),
    errorSound = document.getElementById('errorSound');

//Initializing function
const init = () =>{
    breakLength = 5 * 60;
    sessionLength = 10 * 60;
    pauseElement.style.display = 'none';
    errorMessage.style.display = 'none';
    document.getElementById('breakTime').innerHTML = timeString(breakLength);
    document.getElementById('sessionTime').innerHTML = timeString(sessionLength);
    document.getElementById('status').innerHTML = 'SESSION';
    document.getElementById('mainTime').innerHTML = timeString(sessionLength);
}

//Break Length Functions
const breakMinus = () =>{
    if(breakLength > 60 && pause){
        playTickTok();
        errorMessage.style.display = 'none';
        breakLength -= 60;
        document.getElementById('breakTime').innerHTML = timeString(breakLength);
        document.getElementById('status').innerHTML = 'BREAK';
        document.getElementById('mainTime').innerHTML = timeString(breakLength);
    }else{
        errorMessage.style.display = 'block';
        playError();
        document.getElementById('errorMessage').innerHTML = 'BREAK LENGTH CANNOT BE LESS THAN 1 MINUTE';
    }
}

const breakPlus = () =>{
    if(pause){
        playTickTok();
        errorMessage.style.display = 'none';
        breakLength += 60;
        document.getElementById('breakTime').innerHTML = timeString(breakLength);
        document.getElementById('status').innerHTML = 'BREAK';
        document.getElementById('mainTime').innerHTML = timeString(breakLength);
    }
}

//Session Length Functions
const sessionMinus = () =>{
    if(sessionLength > 60 && pause) {
        playTickTok();
        errorMessage.style.display = 'none';
        sessionLength -= 60;
        document.getElementById('sessionTime').innerHTML = timeString(sessionLength);
        document.getElementById('status').innerHTML = 'SESSION';
        document.getElementById('mainTime').innerHTML = timeString(sessionLength);
    }else{
        errorMessage.style.display = 'block';
        playError();
        document.getElementById('errorMessage').innerHTML = 'SESSION LENGTH CANNOT BE LESS THAN 1 MINUTE';
    }
}

const sessionPlus = () =>{
    if(pause) {
        playTickTok();
        sessionLength += 60;
        errorMessage.style.display = 'none';
        document.getElementById('sessionTime').innerHTML = timeString(sessionLength);
        document.getElementById('status').innerHTML = 'SESSION';
        document.getElementById('mainTime').innerHTML = timeString(sessionLength);
    }
}

// Function to play sounds
const playBuzzer = () =>{
    buzzer.play();
}

const playTickTok = () =>{
    tickTok.play();
}

const playError = () =>{
    errorSound.play();
}

//Refresh Function
const reset = () =>{

    pause = true;

    if(pause) {
        init();
        playElement.style.display = 'block';
    }
}

//Play-Pause Button Function
const playButton = () =>{
    pause = false;
    errorMessage.style.display = 'none';
    playElement.style.display = 'none';
    pauseElement.style.display = 'block';
    sessionCounter = setInterval(timer, 1000);

}

const pauseButton = () =>{
    pause = true;
    errorMessage.style.display = 'none';
    pauseElement.style.display = 'none';
    playElement.style.display = 'block';

    clearInterval(sessionCounter);
    clearInterval(breakCounter);

    pause = false;

}

const timer = () =>{
    document.getElementById('status').innerHTML = 'SESSION';
    sessionLength -= 1;
    

    if(sessionLength === 0) {
        playBuzzer();
        clearInterval(sessionCounter);
        breakCounter = setInterval(breakTimer, 1000);
    }

    document.getElementById('mainTime').innerHTML = sessionLength;

    if(sessionLength % 60 >= 10) {
        document.getElementById('mainTime').innerHTML = `${Math.floor(sessionLength / 60)}:${sessionLength % 60}`;
    }else{
        document.getElementById('mainTime').innerHTML = `${Math.floor(sessionLength / 60)}:0${sessionLength % 60}`;
    }
}

const breakTimer = () =>{
    document.getElementById('status').innerHTML = 'BREAK';
    breakLength -= 1;
    
    if(breakLength === 0){
        playBuzzer();
        clearInterval(breakCounter);
        pause = true;
    }

    document.getElementById('mainTime').innerHTML = breakLength;

    if(breakLength % 60 >= 10) {
        document.getElementById('mainTime').innerHTML = `${Math.floor(breakLength / 60)}:${breakLength % 60}`;
    }else{
        document.getElementById('mainTime').innerHTML = `${Math.floor(breakLength / 60)}:0${breakLength % 60}`;
    }
}

const timeString = (time) =>{
    let minutes = Math.floor(time/60),
        seconds = time % 60;

    if(seconds < 10) {
    
    seconds = `0${seconds}`;
    return `${minutes}:${seconds}`; 
    }

}