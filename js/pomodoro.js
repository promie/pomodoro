$(document).ready(function(){
    
    let pause = true;

    $('#reset').hide();

    const buzzer = $('#buzzer')[0],
        tickTok = $('#tickTok')[0];    
    let breakLength = parseInt($('#breakTime').html()),
        sessionLength = parseInt($('#sessionTime').html());
        
    $('#myCanvas').on('click', function(){
        
        

            $('#reset').hide();
            $('#errorMessage').hide();
            let sessionCounter = setInterval(timer, 1000);
            sessionLength *= 60;
            breakLength *= 60;
                
            function timer() {
                $('#status').html('SESSION');
                sessionLength -= 1;
                tickTok.play();
        
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
                        $('#status').html('BREAK');
                        breakLength -= 1;
                        tickTok.play();
    
                        if(breakLength === 0) {
                            buzzer.play();
                            $('#reset').show();
    
                            for(let i=1; i<99999;i++){
                                window.clearInterval(i);
                            }
                            pause = true;
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
        if(breakLength > 1 && pause === true) {
            breakLength -= 1;
            $('#errorMessage').hide();
            $('#breakTime').html(breakLength);
            $('#status').html('BREAK');
            $('#mainTime').html(breakLength + ':00');
        }else{
            $('#errorMessage').show();
            $('#errorMessage').html('BREAK LENGTH CANNOT BE LESS THAN 1 MINUTE');
        }
    });
    
    $('#breakPlus').on('click', function(){
        if(pause === true){
            $('#errorMessage').hide();
            breakLength += 1;
            $('#breakTime').html(breakLength);
            $('#status').html('BREAK');
            $('#mainTime').html(breakLength + ':00');
        }
    });
    
    $('#sessionMinus').on('click', function(){
        if(sessionLength > 1 && pause === true) {
            sessionLength -= 1;
            $('#errorMessage').hide();
            $('#sessionTime').html(sessionLength);
            $('#status').html('SESSION');
            $('#mainTime').html(sessionLength + ':00');
        }else{
            $('#errorMessage').show();
            $('#errorMessage').html('SESSION LENGTH CANNOT BE LESS THAN 1 MINUTE');
        }
    });
    
    $('#sessionPlus').on('click', function(){
        if(counter === true) {
            sessionLength += 1;
            $('#errorMessage').hide();
            $('#sessionTime').html(sessionLength);
            $('#status').html('SESSION');
            $('#mainTime').html(sessionLength + ':00');    
        }
    });

    $('#reset').on('click', function(){
        location.reload();
    })
        
});

