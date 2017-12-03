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
    breakLength = 5;
    sessionLength = 10;
    pauseElement.style.display = 'none';
    errorMessage.style.display = 'none';
    document.getElementById('breakTime').innerHTML = 5;
    document.getElementById('sessionTime').innerHTML = 10;
    document.getElementById('status').innerHTML = 'SESSION';
    document.getElementById('mainTime').innerHTML = `${sessionLength}:00`;
}

//Break Length Functions
const breakMinus = () =>{
    if(breakLength > 1 && pause){
        playTickTok();
        errorMessage.style.display = 'none';
        breakLength -= 1;
        document.getElementById('breakTime').innerHTML = breakLength;
        document.getElementById('status').innerHTML = 'BREAK';
        document.getElementById('mainTime').innerHTML = `${breakLength}:00`;
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
        breakLength += 1;
        document.getElementById('breakTime').innerHTML = breakLength;
        document.getElementById('status').innerHTML = 'BREAK';
        document.getElementById('mainTime').innerHTML = `${breakLength}:00`;
    }
}

//Session Length Functions
const sessionMinus = () =>{
    if(sessionLength > 1 && pause) {
        playTickTok();
        errorMessage.style.display = 'none';
        sessionLength -= 1;
        document.getElementById('sessionTime').innerHTML = sessionLength;
        document.getElementById('status').innerHTML = 'SESSION';
        document.getElementById('mainTime').innerHTML = `${sessionLength}:00`;
    }else{
        errorMessage.style.display = 'block';
        playError();
        document.getElementById('errorMessage').innerHTML = 'SESSION LENGTH CANNOT BE LESS THAN 1 MINUTE';
    }
}

const sessionPlus = () =>{
    if(pause) {
        playTickTok();
        sessionLength += 1;
        errorMessage.style.display = 'none';
        document.getElementById('sessionTime').innerHTML = sessionLength;
        document.getElementById('status').innerHTML = 'SESSION';
        document.getElementById('mainTime').innerHTML = `${sessionLength}:00`;
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
    sessionLength *= 60;
    breakLength *= 60;
    sessionCounter = setInterval(timer, 1000);

}

const pauseButton = () =>{
    pause = true;
    errorMessage.style.display = 'none';
    pauseElement.style.display = 'none';
    playElement.style.display = 'block';

    clearInterval(sessionCounter);
    clearInterval(breakCounter);

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