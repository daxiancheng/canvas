var paint = document.getElementById('canvas')
var context = paint.getContext('2d')
var painting = false
var lastpoint={
  x:undefined,y:undefined
}
atuoSetCanvasSize(canvas);
listenToMouse(canvas);
var eraserEnable= false;
eraser.onclick = function(){
  eraserEnable = true
  action.className='action x'
}
brush.onclick = function(){
  eraserEnable = false
  action.className='action'
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.fillStyle = 'red'
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.strokeStyle = 'red';
  context.moveTo(x1,y1);
  context.lineWidth = 5;
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}
function atuoSetCanvasSize(){
  setCanvasSize();
  window.onresize = function(canvas){
    setCanvasSize();
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
function listenToMouse(canvas){
  canvas.onmousedown = function(aaa){
    painting = true;
    var x = aaa.clientX;
    var y = aaa.clientY;
    if(eraserEnable){
      context.clearRect(x-5,y-5,10,10)
    }else{
      drawCircle(x,y,1); 
      lastpoint = {x:x,y:y}
    }
 }
 canvas.onmousemove = function(bbb){
  var x = bbb.clientX;
  var y = bbb.clientY;
   if(!painting){
     return
   }
   if(eraserEnable){
    context.clearRect(x-5,y-5,10,10)
   }else{
    drawCircle(x,y,1); 
    var newpoint = {x:x,y:y};
    drawLine(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y);
    lastpoint = newpoint;
   }
 }
 canvas.onmouseup = function(ccc){
   painting = false;
 }
}