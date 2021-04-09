let img;//IMAGE VARIABLE
let aspectRatio = 0.9;// ASPECTRATIO OF CAPTURES IMAGE

//CHARACTORS TO SHOW BY DESEANDING ORDER OF TOTAL LENGTH
let chars = ['M','C','L','/','>',';',':','.',''];

//MORE VARIABLES
let res,slider;

function setup() {
  //CREATING CANVAS ELEMENT
  createCanvas(window.innerWidth, window.innerHeight);
  
  //CAPTURING IMAGE FROM CAMERA
  img = createCapture(VIDEO);
  img.hide();//DON'T WANNA SHOW IMG ON SCREEN
  
  //SLIDER FOR MANUPULATING RESULUTION
  slider = createSlider(2, 20, 10, 2)
  res = slider.value();
  
  //PIXELS DENSITY SHOULD BE 1PIXEL/PIXELS
  pixelDensity(1);
  
  //SETTING TEXTSIZE TO RESULUTION
  textSize(res)
}




function draw() {
  background(0);
  
  //FITTING THE VEDIO IN CANVAS
  //BY REPLACING AND RESIZING
  if(width/height > 1){
    //DISPLAYING CAPTURED IMAGE
    image(img, width*(1-aspectRatio)/2, 0, width*aspectRatio, height);
  }else{
    image(img, 0, height*(1-aspectRatio)/2, width, height*aspectRatio);
  }
  
  //UPDATING RESULUTION ON CHANGE
  res = map(slider.value(), 0, 20, 20, 0)
  textSize(res)
  
  //LOADING PIXELS
  loadPixels()
  background(20)
  
  
  /*ETERATING OVER WHOLE CANVAS
  SPETPPING ACCORDING RESULUTION*/
  for (var i = 0; i < width; i += res) {
    for (var j = 0; j < height; j += res) {
      
      //GETTING THE INDEX IN IMAGE ARRAY
      let index = (i + j * width) * 4
      let sum =0; // VARIABLE TO STORE SUM OF RGBA VALUES
      for (var n = 0; n < 4; n++) {
        sum += pixels[index + n]
      }
      
      //CALCULATING AND MAPPING AVERAGE
      let avg = floor(map(sum / 4, 255, 50, 0, chars.length));
      
      //DISPLATING TEXT ON (i, j) WITH CHARACTOR SUTABLE
      text(chars[avg], i, j)
      fill(255) //FILLING TEXT BY SOME COLOR 
    }
  }
}