var CLOCK_UPDATE_INTERVAL_IN_SECONDS = 10 * 1000;

var updateNumberInterval = null;

function humanizeNumber(v) {
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateNumber(data) {
    var tsdiff = new Date().getTime() / 1000 - data.base_timestamp;
    var number = Math.round(data.base_number + tsdiff / data.period_in_seconds);
    $('#texts .number').html(humanizeNumber(number));
}

// function updateData(data) {
    // var now = new Date();
    // var sec = now.getSeconds();
    // var min = now.getMinutes();
    // var hour = (now.getHours() % 12) + min/60;
    // var secangle = sec*6;
    // var minangle = min*6;
    // var hourangle = hour*30;
    // // Get SVG elements for the hands of the clock
    // // var sechand = document.getElementById('secondhand');
    // var minhand = document.getElementById("minutehand");
    // // var hourhand = document.getElementById("hourhand");
    // // Set an SVG attribute on them to move them around the clock face
    // // sechand.setAttribute("transform", "rotate(" + secangle + ",50,50)");
    // minhand.setAttribute("transform", "rotate(" + minangle + ",250,250)");
    // // hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");
    // setTimeout(updateTime, 1000);
// }

var lastData;

function updateClock() {
    $.getJSON("/api/stat/random", function(data){
        updateNumberInterval && clearInterval(updateNumberInterval);
        updateNumber(data); 
        updateNumberInterval = setInterval(function(){
            updateNumber(data);
        }, data.period_in_seconds * 1000);

        console.log('rotation ' + data.period_in_seconds + 's infinite linear');

        $('#hand').css('animation', 'none');

        $('#hand').css('animation', 'rotation ' + data.period_in_seconds + 's infinite linear');
        $('#texts .name').html(data.name);
        $('#texts .detail').html(data.detail);
    });
}

$(function() {
    $.ajaxSetup({ cache: false });
    setInterval(updateClock, CLOCK_UPDATE_INTERVAL_IN_SECONDS);
    updateClock();
});