console.log('Loaded the page!');

//var element=document.getElementById('madi');
//element.innerHTML="new value";

var img=document.getElementById("img");

move=0;
function moveRight()
{
    move=move+5;
    img.style.marginLeft=move+'px';
}

img.onclick=function()
{
    var interval=setInterval(moveRight,50);
}