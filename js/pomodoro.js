$(function(){

let breakLength = parseInt($('#breakTime').html()),
    sessionLength = parseInt($('#sessionTime').html());

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













});