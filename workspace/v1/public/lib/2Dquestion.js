
// var defaultSrc= "/Stuffs/crossed_lines.png";
// function onHover(source)
// {
//     $("#zoom").attr('src', source);
// }

// function offHover()
// {
//     $("#zoom").attr('src', defaultSrc);
// }
function imageClick(source){
    // defaultSrc = source;
    $("#zoom").attr('src', source);
}


var sec = 0;
function pad(val) {
  return val > 9 ? val : "0" + val;
}

function stop() {
  clearInterval(timer);
}