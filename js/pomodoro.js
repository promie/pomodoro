$(function(){

const buzzer = $('#buzzer')[0];    
let breakLength = parseInt($('#breakTime').html()),
    sessionLength = parseInt($('#sessionTime').html());

$('#myCanvas').on('click', function(){
    let sessionCounter = setInterval(timer, 1000);
    sessionLength *= 60;
    breakLength *= 60;

    function timer() {
        sessionLength -= 1;

        if(sessionLength === 0){
            buzzer.play();
            clearInterval(sessionCounter);
            let breakCounter = setInterval(breakTimer, 1000);
        }
            $('#mainTime').html(sessionLength);

            if(sessionLength % 60 >= 10) {
                $('#mainTime').html(Math.floor(sessionLength/60) + ':' + sessionLength % 60);
            }else{
                $('#mainTime').html(Math.floor(sessionLength/60) + ':' + '0' + sessionLength % 60);
            }

            function breakTimer(){
                $('#status').html('Break');
                breakLength -= 1;

                if(breakLength === 0) {
                    clearInterval(breakCounter);
                    clearnInterval(sessionCounter);
                    buzzer.play();
                }

                $('#mainTime').html(breakLength);
                if(breakLength % 60 >= 10) {
                    $('#mainTime').html(Math.floor(breakLength/60) + ':' + breakLength % 60);
                }else{
                    $('#mainTime').html(Math.floor(breakLength/60) + ':' + '0' + breakLength % 60);
                }
            }
    }

});

//Break Length Buttons
$('#breakMinus').on('click', function(){
    if(breakLength > 0) {
        breakLength -= 1;
        $('#breakTime').html(breakLength);
    }
});

$('#breakPlus').on('click', function(){
        breakLength += 1;
        $('#breakTime').html(breakLength);
});

//Session Length Buttons
$('#sessionMinus').on('click', function(){
    if(sessionLength > 0) {
        sessionLength -= 1;
        $('#sessionTime').html(sessionLength);
    }
});

$('#sessionPlus').on('click', function(){
    sessionLength += 1;
    $('#sessionTime').html(sessionLength);
});


$('#reset').on('click', function(){
    location.reload();
});

});