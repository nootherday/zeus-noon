var updateNumberInterval = null;
var audio = new Audio('/static/mp3/tick.mp3');

function updateNumber(data, silent) {
    var tsdiff = new Date().getTime() / 1000 - data.base_timestamp;
    var number = Math.round(data.base_number + tsdiff / data.period_in_seconds);
    $('#texts .number').html(Humanize.intcomma(number));
    $('#texts .char').html(Humanize.toHangeul(number));

    !silent && audio.play();
}

function updateTheme() {
    var themes = [
        {
            face: '#99e6ff',
            text: '#000000',
            tick: '#ffffff'
        },
        {
            face: '#3333ff',
            text: '#ffffff',
            tick: '#000000'
        },
        {
            face: '#66ffb3',
            text: '#ffffff',
            tick: '#000000'
        },
        {
            face: '#7979d2',
            text: '#ffffff',
            tick: '#000000'
        },
        {
            face: 'yellow',
            text: '#000000',
            tick: '#ffffff'
        },
        {
            face: '#99e699',
            text: '#ffffff',
            tick: '#000000'
        },
        {
            face: '#ffccff',
            text: '#000000',
            tick: '#ffffff'
        }
    ];

    var theme = _.sample(themes);

    // theme = themes[0];

    $("#face").attr("fill", theme.face);
    $("#texts text").attr("fill", theme.text);
    $("#hand").attr("stroke", theme.tick); 
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
        updateNumber(data, true); 
        updateNumberInterval = setInterval(function(){
            updateNumber(data);
        }, data.period_in_seconds * 1000);

        // console.log('rotation ' + data.period_in_seconds + 's infinite linear');

        $('#hand').remove();
        $('<line id="hand" x1="500" y1="550" x2="500" y2="200"></line>').insertBefore('#texts');
        $('#hand').css('animation', 'rotation ' + data.period_in_seconds + 's infinite linear');
        
        $('#texts .name').html(data.name);
        $('#texts .detail').html(data.detail);

        updateTheme();

        $('#clock').html($('#clock').html());

        setTimeout(updateClock, data.refresh_duration_in_seconds * 1000);
    });
}

$(function() {
    $.ajaxSetup({ cache: false });
    updateClock();
});