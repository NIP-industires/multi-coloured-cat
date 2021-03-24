var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;


//changes from lines 9 - 30 by Kayla
//inserting cat image
var char_img = new Image(); 
var div = document.getElementById('character'); 
 
char_img.onload = function() { 
 
  div.innerHTML += '<img src="'+char_img.src+'" />';  
 
}; 
char_img.src = "/Sprites/kitty.png";

// //inserting pipes. much confusion with making this one work
// var pipes_img = new pipe_Image(); 
// var div = document.getElementById('block'); 
 
// pipes_img.onload = function() { 
 
//   div.innerHTML += '<img src="'+pipes_img.src+'" />';  
 
// };  
// pipes_img.src = "/Sprites/Pipes.png";
// //



hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+2.5)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game over. Score: "+(counter-1));
        character.style.top = 100 + "px";
        counter=0;
        
    }
        let speedup=1;
        var totalspeed;
        if(counter%5==0){
            block.animation.time= block.animation.time-0.1;
            totalspeed++;
        }
        
        if(totalspeed>10){
             block.animation.time=0.7;
        }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-3)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);

}
