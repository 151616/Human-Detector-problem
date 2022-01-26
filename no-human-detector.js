Status = "";
object = [];
alarm = "";
function setup(){
    canvas = createCanvas(500,400); 
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
alarm = "alarm.mp3";
}
function draw(){
push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0,0,500,400);
  pop();
  if(Status != ""){
    object_detector.detect(video, gotresults);
    for(i = 0; i < object.length; i++){
        document.getElementById("status").innerHTML = "Status: Human Detected";
        fill("#FF0000");
        stroke("#FF0000");
        percent = floor(object[i].confidence *100);
        text(object[i].label + "  " + percent + "%", object[i].x, object[i].y + 15); 
        noFill();
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}
}
function back(){
    window.location = "index.html";
}
function modelloaded(){
  console.log("Model Loaded!");
  Status = "True"
}
function gotresults(error, results){
  if(error){
      console.error(error);
  }else{
      console.log(results);
      object = results;
  }
}