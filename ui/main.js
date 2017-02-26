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

var click=document.getElementById("click");
var span=document.getElementById("span");
var count=0;
click.onclick=function()
{
    count=count+1;
    span.innerHTML=count.toString();
}
