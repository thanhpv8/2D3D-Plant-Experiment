var html = document.getElementsByTagName('html')[0];
$(window).bind("load", function() {
   var elem = document.getElementById("myBar");
   var width = 10;
   var id=setInterval(function(){
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width  + '%';
      if(width==100){
          $('.preloader').fadeOut(1000);
      }
    }
   }, 10);
});
// var defaultSrc= '/Stuffs/crossed_lines.png';
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

