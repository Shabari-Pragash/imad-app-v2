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
    //create request
    var request=new XMLHttpRequest();
    
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var count=request.responseText;
                span.innerHTML=count.toString();
            }
        }
    }
    
    //Make request
    request.open('GET','http://shabari-pragash.imad.hasura-app.io/counter',true);
    request.send(null);
    //count=count+1;
    //span.innerHTML=count.toString();
}

var submit=document.getElementById("submit");
var txt=document.getElementById("name").value;
submit.onclick=function()
{
    //Make request
    
    //Capture request
    var names=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list=list+'<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById("ul");
    ul.innerHTML=list;
}



















