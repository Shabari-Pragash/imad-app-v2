console.log('Loaded the page!');

var element=document.getElementById('madi');
element.innerHTML="new value";

var img=dociment.getElementById("img");

move=0;
function moveRight()
{
    move=move+10;
    img.style.marginleft=move+'px';
}

img.onclick=function()
{
    var interval=setInterval(moveRight,50);
}