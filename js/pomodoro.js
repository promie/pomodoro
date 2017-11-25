
// Decrease/Increase Break functionality

const breakLength = document.getElementById('breakSlice');
let breakValue = parseInt(breakLength.textContent);

const decreaseBreak = () =>{
    if(breakValue > 1){
        breakLength.innerHTML = breakValue -= 1;
    }
}

const increaseBreak = () =>{
    breakLength.innerHTML = breakValue += 1;
}

// Decrease/Increase Session Length functionality

const sessionLength = document.getElementById('sessionSlice');
const mainSessionLength = document.getElementById('mainSessionSlice');
let sessionValue = parseInt(sessionLength.textContent);
let mainSessionValue = parseInt(mainSessionLength.textContent);

const decreaseSession = () =>{
    if(sessionValue > 1){
        sessionLength.innerHTML = sessionValue -= 1;
        mainSessionLength.innerHTML = mainSessionValue -= 1;
    }
}

const increaseSession = () =>{
    sessionLength.innerHTML = sessionValue += 1;
    mainSessionLength.innerHTML = mainSessionValue += 1;
} 





