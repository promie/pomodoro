$(document).ready(function(){

    $('#reset').hide();
    $('#pause').hide();

    const buzzer = $('#buzzer')[0];    
    let breakLength = parseInt($('#breakTime').html()),
        sessionLength = parseInt($('#sessionTime').html());
        
    $('#play').on('click', function(){
        let sessionCounter = setInterval(timer, 1000);
        sessionLength *= 60;
        breakLength *= 60;
        $(this).hide();
        $('#pause').show();
    
        function timer() {
            $('#status').html('Session');
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
                        buzzer.play();
                        $('#reset').show();
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
    
    $('#breakMinus').on('click', function(){
        if(breakLength > 1) {
            breakLength -= 1;
            $('#breakTime').html(breakLength);
            $('#status').html('Break');
            $('#mainTime').html(breakLength + ':00');
        }
    });
    
    $('#breakPlus').on('click', function(){
            breakLength += 1;
            $('#breakTime').html(breakLength);
            $('#status').html('Break');
            $('#mainTime').html(breakLength + ':00');
    });
    
    $('#sessionMinus').on('click', function(){
        if(sessionLength > 1) {
            sessionLength -= 1;
            $('#sessionTime').html(sessionLength);
            $('#status').html('Session');
            $('#mainTime').html(sessionLength + ':00');
        }
    });
    
    $('#sessionPlus').on('click', function(){
        sessionLength += 1;
        $('#sessionTime').html(sessionLength);
        $('#status').html('Session');
        $('#mainTime').html(sessionLength + ':00');
    });

    $('#reset').on('click', function(){
        location.reload();
    })
        
});

