function updateTime() { // Update the SVG clock
    console.log('update');
    var now = new Date();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hour = (now.getHours() % 12) + min/60;
    var secangle = sec*6;
    var minangle = min*6;
    var hourangle = hour*30;
    // Get SVG elements for the hands of the clock
    // var sechand = document.getElementById('secondhand');
    var minhand = document.getElementById("minutehand");
    // var hourhand = document.getElementById("hourhand");
    // Set an SVG attribute on them to move them around the clock face
    // sechand.setAttribute("transform", "rotate(" + secangle + ",50,50)");
    minhand.setAttribute("transform", "rotate(" + minangle + ",250,250)");
    // hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");
    setTimeout(updateTime, 1000);
}

$(function() {
    // updateTime();

});