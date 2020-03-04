# Readme.md
## Install
You can put the canvas_script.js file to actions, then use it as `DBM.canvas()`. You also can modified the javascript file for use in other services or softwares than DBM

## NPM Module Required!!!
- [x] discord.js@11.5.1
- [x] opentype.js
- [x] canvas
- [x] fs

## Canvas Script Usage
DBM Example (inside Run Script Action)
```javascript
async function run () {

  const canvas = DBM.CanvasJS();
  
  //Create Image
  const path = "resources/background.png"
  let image = await canvas.createImage(path);

  //Crop Image
  let option = {}
  option.width = "50%"; 
  option.height = "50%";
  option.align = 4;
  image = canvas.cropImage(image,option);

  //Save Image
  canvas.saveImage(image,"resources\\image_saved.png");

  //Flip Image
  //NOTE : canvas.flipImage(image,[0-2])
  image = canvas.flipImage(image,0);

  //Edit Border (Circle)
  let option = {}
  option.type = "circle";
  image = canvas.editBorder(image,option)

  //Edit Border (Round)
  let option = {}
  option.type = "round";
  option.radius = 50;
  image = canvas.editBorder(image,option)

  //Edit Border (Circle with radius)
  //NOTE : Custom radius with option.radius (NOT RECOMMENDED BECAUSE IT WILL RESIZE THE IMAGE)
  let option = {}
  option.type = "circle";
  option.radius = 50;
  image = canvas.editBorder(image,option)

  //Draw Image
  let option = {};
  option.x = 0;
  option.y = 0;
  image = canvas.drawImage(image,image1,option);

  //Draw Text
  //NOTE : option.align([0-9])
  let option = {};
  option.color = "#FF0000"
  option.font = "fonts\\madison.ttf";
  option.size = 50;
  option.text ="Test"
  option.align = 4;
  option.x = 50;
  option.y = 50;
  image = canvas.drawText(image,option);

  //Rotate Image (Rotate 135° Degree)
  image = canvas.rotateImage(image, 135);
  
  //Resize Image (ignore aspect ratio)
  //If width and height exist, the aspect ratio option will be disable)
  let option = {}
  option.aspectRatio = true; 
  option.width = "50%"; 
  option.height = "70%";
  image = canvas.resizeImage(image,option)

  //Generate Progress (Normal)
  let option = {};
  option.color = "#FF00FF";
  option.type = 0;
  option.lineCap = "round";
  option.width = 50;
  option.height = 50;
  option.percent = 50;
  option.lineWidth = 5;
  image = canvas.generateProgress(option)

  //Generate Progress (Circle)
  let option = {};
  option.color = "#FF00FF";
  option.type = 1;
  option.lineCap = "round";
  option.percent = 50;
  option.lineWidth = 5;
  option.size = 500;
  option.radius = 200;
  image = canvas.generateProgress(option)

  //Attach Image 100%
  let attachment = canvas.canvasAttachment(image,"image2.png")
  
  //Send Message
  msg.channel.send("", attachment); 
}
run()
```
