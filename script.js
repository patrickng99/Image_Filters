//Initializing global variables
var canvas = document.getElementById("canv");
var imgInput = document.getElementById("finput");
//var ctx = canvas.getContext("2d");
var original = null;
var grayImage = null;
var redImage = null;
var blurImage = null;
var rainbowImage = null;
var customImage = null;

function loadImage() {
  original = new SimpleImage(imgInput);
  original.drawTo(canvas);
  grayImage = new SimpleImage(imgInput);
  redImage = new SimpleImage(imgInput);
  rainbowImage = new SimpleImage(imgInput);
  customImage = new SimpleImage(imgInput);
}

function makeRed() {
  if (notLoaded(original) == false) {
    filterRed(redImage);
    redImage.drawTo(canvas);
  } else {
    alert("Couldn't apply the filter, image is not loaded.");
  }
}

function makeGray() {
  if (notLoaded(original) == false) {
    filterGray(grayImage);
    grayImage.drawTo(canvas);
  } else {
    alert("Couldn't apply the filter, image is not loaded.");
  }
}

function makeBlur() {
  //alert("Make blur button clicked");
  if (notLoaded(original) == false) {
    blurImage = new SimpleImage(original.getWidth(), original.getHeight());
    for (var pixel of blurImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var num = Math.random();
      if (num < 0.5) {
        blurImage.setPixel(x, y, original.getPixel(x, y));
      } 
      else {
        var px = nearbyPixel(x, y, original);
        blurImage.setPixel(x, y, px);
      }
    }
    blurImage.drawTo(canvas);
  } 
  else {
    alert("Couldn't apply the filter, image is not loaded.");
  }
}

function makeRainbow() {
  if (notLoaded(original) == false) {
    filterRainbow(rainbowImage);
    rainbowImage.drawTo(canvas);
  } else {
    alert("Couldn't apply the filter, image is not loaded.");
  }
}

function download() {
  var canv = document.getElementById("canv");
  var link = document.getElementById("link");
  link.setAttribute("download", "filtered.png");
  link.setAttribute("href", canv.toDataURL("image/png").replace("image/octet-stream"));
  link.click();
}

function makeCustom() {
  if (notLoaded(original) == false) {
    customImage = filterCustom(customImage);
    customImage.drawTo(canvas);
  } else {
    alert("Couldn't apply the filter, image is not loaded.");
  }
}

function reset() {
  if (notLoaded(original) == false) {
    original.drawTo(canvas);
    grayImage = new SimpleImage(imgInput);
    redImage = new SimpleImage(imgInput);
    rainbowImage = new SimpleImage(imgInput);
    blurImage = new SimpleImage(imgInput);
    customImage = new SimpleImage(imgInput);
  } else {
    alert("Image not loaded");
  }
}

//-------------------------------------------------------------
//Helper functions
//-------------------------------------------------------------

//Check to see if original image is loaded
function notLoaded(image) {
  return image == null || !image.complete();
}

//Helper function for the red filter
function filterRed(image) {
  for (var pixel of image.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

//Helper function for the gray filter
function filterGray(image) {
  for (var pixel of image.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

//Helper function for blur filter
function nearbyPixel(x, y, image) {
  //The 10 - 20 part insures the number is generated from
  //left and right, top and bottom.
  var ranX = Math.floor(Math.random() * 10 - 20);
  var ranY = Math.floor(Math.random() * 10 - 20);
  var newX = x + ranX;
  var newY = y + ranY;
  if (newX < 0) {
    newX = 0;
  }
  if (newY < 0) {
    newY = 0;
  }
  if (newX > image.getWidth()) {
    newX = image.getWidth();
  }
  if (newY > image.getHeight()) {
    newY = image.getHeight;
  }
  var pixel = image.getPixel(newX, newY);
  return pixel;
}

//Helper function for the rainbow filter
function filterRainbow(image) {
  for (var pixel of image.values()) {
    var y = pixel.getY();
    var size = image.getHeight();
    var r = pixel.getRed();
    var g = pixel.getGreen();
    var b = pixel.getBlue();
    var avg = (r + g + b) / 3;

    if (y < size / 7) {
      //Sets red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= size / 7 && y < (2 * size) / 7) {
      //Sets orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= (2 * size) / 7 && y < (3 * size) / 7) {
      //Sets yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= (3 * size) / 7 && y < (4 * size) / 7) {
      //Sets green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y >= (4 * size) / 7 && y < (5 * size) / 7) {
      //Sets blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y >= (5 * size) / 7 && y < (6 * size) / 7) {
      //Sets violet
      if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //Sets indigo
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
}

//Helper function for the custom filter
function filterCustom(image){
  var colorInput = document.getElementById("clr");
  //Extracting the color input value
  var value = colorInput.value;
  //Extracting individual rgb values from the input color
  var r = value.substr(1, 2);
  var g = value.substr(3, 2);
  var b = value.substr(5, 2);
  //Changing the rgb values from strings to integers 
  var red = parseInt(r, 16);
  var green = parseInt(g, 16);
  var blue = parseInt(b, 16);
  //alert(red);
  for (var pixel of image.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128){
      pixel.setRed(red/127.5*avg);
      pixel.setGreen(green/127.5*avg);
      pixel.setBlue(blue/127.5*avg);
    }
    else {
      pixel.setRed((2-red/127.5)*avg+2*red-255);
      pixel.setGreen((2-green/127.5)*avg+2*green-255);
      pixel.setBlue((2-blue/127.5)*avg+2*blue-255);
    }
  }
  return image;
}
