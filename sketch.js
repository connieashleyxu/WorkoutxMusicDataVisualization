// https://webdev.iyaclasses.com/~caxu/acad280/workoutxmusic

//////////////////////////////////////////
// TODO: hover
//////////////////////////////////////////

var table; //php load
var workout = []; //workout array

var rectangleArr = []; //old rects to delete
var tempRect = []; //new rects to display

//for responsive design
var titleHeight;

//for rectangle click
var click = [];
var position = [];
var size = [];
var rectDegrees = [];
var rectCount = 0;
var verticesHist = [];

//for calculating circle data display
var maxData = 1100;
var maxValue;
var angleSeparation;
var offset; /* wait I just realized I don't think I listened to offset (like the rapper) EVER this year */
var rectWidth; //width of each rectangle

//for filters
//////////////////////////////////////////
//calories filter
var caloriesSlider;
var cal;

//spotify embed
let embedDiv;

//genre filter
/* please don't count off points for the naming of the consts:( I just needed something quick and easy to remember */
let c1x;
var isPop = true;
let c2x;
var isIndie = true;
let c3x;
var isAlt = true;
let c4x;
var isCountry = true;
let c5x;
var isElectro = true;
let c6x;
var isRock = true;
let c7x;
var isClassical = true;
let c8x;
var isRB = true;
let c9x;
var isRap = true;
let cy;
var cr = 10;
//////////////////////////////////////////

//spotify embed
var loc = "https://open.spotify.com/embed/track/";
var iframe;

//php preload
function preload(){
  table = loadTable("workoutxmusic.php", "ssv", "header");
  fontMain = loadFont("assets/coolvetica.otf");
  //fontBody = loadFont("assets/HelveticaNeue.otf");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");

  frameRate(60);

  offset = height / 5; //adaptable size of inside circle
  angleSeparation = 360 / table.getRowCount(); //even spacing of rect data

  //load php rows
  for (var r = 0; r < table.getRowCount(); r++) {
     //genre, track, artist, calories, date, embed, angle separation that iterates
     var row = table.getRow(r);
     workout.push(new Workout(row.get(0), row.get(1), row.get(2), row.get(3), row.get(4), row.get(5), angleSeparation * r));
   }

  angleMode(DEGREES); /* #livelaughpain */

  //create calories slider filter
  caloriesSlider = createSlider(0, 1100, 200);
}

function draw() {
  //background color
  background(16, 16, 16); //black

  fill("#FFFFFF"); //white
  noStroke();

  //iterate through each workout to display
  for (var i = 0; i < workout.length; i++) {
      workout[i].display();
  }

  //remove prev rects
  if (rectangleArr.length == 0) {
    rectangleArr = tempRect;
    tempRect = [];
  } else {
    for (var i = 0; i < rectangleArr.length; i++) {
        rectangleArr[i].remove();
        rectCount--;
    }
    rectangleArr = tempRect;
    tempRect = [];
  }

  //for genre filter circle sizing + location
  c1x = width - 60;
  c2x = c1x - 43;
  c3x = c2x - 43;
  c4x = c3x - 43;
  c5x = c4x - 43;
  c6x = c5x - 43;
  c7x = c6x - 43;
  c8x = c7x - 43;
  c9x = c8x - 43;
  cy = height - (height - 90);

  //for calories filter slider sizing + location + vals
  caloriesSlider.position(width - 400, height - (height - 200));
  caloriesSlider.style('width', '300px');
  cal = caloriesSlider.value();

  //for setting up main screen text
  textFont(fontMain);
  fill("#FFFFFF"); //white

  textAlign(LEFT); //title
  textSize(20);
  titleHeight = height - 50;
  text('WORKOUTxMUSIC', width - (width - 50), titleHeight); //title

  textAlign(RIGHT); //filter
  textSize(20);
  text('CALORIES', width - 50, height - (height - 180)); //header calories

  cal = caloriesSlider.value();
  textSize(15);
  text(cal + "+", width - 50, height - (height - 210)); //calories slider count

  textSize(20);
  text('GENRE', width - 50, height - (height - 50)); //header genre

  //for initial display of circle filter with text
  ////////////////////////////////////////////////////////
  noStroke();

  //POP
  //if selected, no fill
  if(isPop) {
    fill("#587C7C"); //ashy turquoise
		noStroke();
	} else {
    noFill();
		stroke("#587C7C"); //ashy turquoise
  }
  ellipse(c1x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("POP", c1x + 9, windowHeight - (windowHeight - 120));


  //INDIE
  //if selected, no fill
  if(isIndie) {
    fill("#003F5E"); //deep blue
    noStroke();
  } else {
    noFill();
    stroke("#003F5E"); //deep blue
  }
  ellipse(c2x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("INDIE", c2x + 11, windowHeight - (windowHeight - 120));

  //ALTERNATE
  //if selected, no fill
  if(isAlt) {
    fill("#007C84"); //turquoise
    noStroke();
  } else {
    noFill();
    stroke("#007C84"); //turquoise
  }
  ellipse(c3x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("ALT", c3x + 5, windowHeight - (windowHeight - 120));

  //COUNTRY
  //if selected, no fill
  if(isCountry) {
    fill("#E8D666"); //yellow
    noStroke();
  } else {
    noFill();
    stroke("#E8D666"); //yellow
  }
  ellipse(c4x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("COUNTRY", c4x + 23, windowHeight - (windowHeight - 120));

  //ELECTRONIC
  //if selected, no fill
  if(isElectro) {
    fill("#9EA615"); //yellow green
    noStroke();
  } else {
    noFill();
    stroke("#9EA615"); //yellow green
  }
  ellipse(c5x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("ELECTRO", c5x + 21, windowHeight - (windowHeight - 120));

  //ROCK
  //if selected, no fill
  if(isRock) {
    fill("#BBE0CE"); //light blue
    noStroke();
  } else {
    noFill();
    stroke("#BBE0CE"); //light blue
  }
  ellipse(c6x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("ROCK", c6x + 13, windowHeight - (windowHeight - 120));

  //CLASSICAL
  //if selected, no fill
  if(isClassical) {
    fill("#FEDCC1"); //light pink
    noStroke();
  } else {
    noFill();
    stroke("#FEDCC1"); //light pink
  }
  ellipse(c7x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("CLASSICAL", c7x + 25, windowHeight - (windowHeight - 120));

  //R&B
  //if selected, no fill
  if(isRB) {
    fill("#F7A08C"); //salmon
    noStroke();
  } else {
    noFill();
    stroke("#F7A08C"); //salmon
  }
  ellipse(c8x + 1, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("R&B", c8x + 8, windowHeight - (windowHeight - 120));

  //RAP
  //if selected, no fill
  if(isRap) {
    fill("#F1573F"); //red
    noStroke();
  } else {
    noFill();
    stroke("#F1573F"); //red
  }
  ellipse(c9x, cy, cr * 2, cr * 2);
  //label
  textSize(10);
  text("RAP", c9x + 9, windowHeight - (windowHeight - 120));
  ////////////////////////////////////////////////////////
}

//update vars for each rect
function addRectInfo(offset, rectWidth, animatedHeight, angle) {
  rectDegrees.push(angle);
  position.push([0, offset]);
  size.push([rectWidth, animatedHeight]);
}

//find point after rotate
function rotatePoint(point, rotationCenterPoint, rectDegrees) {
  	//radians for formula
  	var radians = rectDegrees * Math.PI / 180;

  	//translate rotation plane
  	//rotate around (0,0)
  	point[0] -= rotationCenterPoint[0];
  	point[1] -= rotationCenterPoint[1];

  	//rotate
  	var newPoint = [];
  	newPoint[0] = point[0] * Math.cos(radians) - point[1] * Math.sin(radians);
  	newPoint[1] = point[0] * Math.sin(radians) + point[1] * Math.cos(radians);

  	//revert rotation translation
  	newPoint[0] += rotationCenterPoint[0];
  	newPoint[1] += rotationCenterPoint[1];

  	return newPoint;
}

//vertices of rect post rotate
function findRectVertices(position, size, rectDegrees) {
  	var left = position[0];
  	var right = position[0] + size[0];
  	var top = position[1];
  	var bottom = position[1] + size[1];

  	var center = [right - left, bottom - top];
  	var LT = [left, top];
  	var RT = [right, top];
  	var RB = [right, bottom];
  	var LB = [left, bottom];

    //TODO: rotate around LB
  	return {
  		LT: rotatePoint(LT, center, rectDegrees),
  		RT: rotatePoint(RT, center, rectDegrees),
  		RB: rotatePoint(RB, center, rectDegrees),
  		LB: rotatePoint(LB, center, rectDegrees)
  	};
}

//distance formula
function distance(p1, p2) {
	   return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

//Heron's formula for triangle area
function triangleArea(d1, d2, d3) {
  /* love math!! geometry class is useful */
	var s = (d1 + d2 + d3) / 2;

	return Math.sqrt(s * (s - d1) * (s - d2) * (s - d3));
}

//was clicked in rect
function clickHit(click, position, size, rectDegrees) {
  //area of the rectangle
  var rectArea = Math.round(size[0] * size[1]);

	//find the vertices
	var vertices = findRectVertices(position, size, rectDegrees);
  console.log(vertices);
  console.log(vertices.LT);

  ////DEBUG
  if(verticesHist.length < workout.length) {
    verticesHist.push([[vertices.LB[0], vertices.LB[1]], [vertices.RB[0], vertices.RB[1]], [vertices.LT[0], vertices.LT[1]], [vertices.RT[0], vertices.RT[1]]]);
  }
  ////DEBUG

  console.log(vertices);

	//array of the areas of the four triangles
	var triArea = [
		//click, left top, right op
		triangleArea(
			distance(click, vertices.LT),
			distance(vertices.LT, vertices.RT),
			distance(vertices.RT, click)
		),
		//click, right top, right bottom
		triangleArea(
			distance(click, vertices.RT),
			distance(vertices.RT, vertices.RB),
			distance(vertices.RB, click)
		),
		//click right bottom, left bottom
		triangleArea(
			distance(click, vertices.RB),
			distance(vertices.RB, vertices.LB),
			distance(vertices.LB, click)
		),
		//click left bottom, left top
		triangleArea(
			distance(click, vertices.LB),
			distance(vertices.LB, vertices.LT),
			distance(vertices.LT, click)
		)
	];

	//sum func to reduce array
	triArea = Math.round(triArea.reduce(function(a,b) { return a + b; }, 0));
  console.log("triArea: " + triArea);
  console.log("rectArea: " + rectArea);

	//check if in rect or not based on area of triangles
	if (triArea <= rectArea) {
  //if ((triArea - rectArea <= 10) && (rectArea > 0)) {
		return true;
	} else {
	  return false;
  }
}

//hover over function for genre circle filters
function overCircle(x, y, radius) {
	if (dist(x, y, mouseX, mouseY) < radius) {
	  return true;
	} else {
	  return false;
	}
}

//when clicked, deselect genre filter circle
function mouseClicked() {
  //if clicked in bounds of rect, display workout info
  click[0] = mouseX;
  click[1] = mouseY;

  console.log("click: " + click);

  for (var i = 0; i < workout.length; i++) {
    if (clickHit(click, position[i], size[i], rectDegrees[i])) {
      workout[i].workoutInfo();

      console.log("yes clicked");
    }
    else {
      console.log("NOT CLICKED");
    }
  }

  //switch bool when clicked
  ////////////////////////////////////////////////////////
  //POP
  if (isPop == true && overCircle(c1x, cy, cr)) {
    isPop = false;
	} else if (isPop == false && overCircle(c1x, cy, cr)) {
    isPop = true;
	}

  //INDIE
	if (isIndie == true && overCircle(c2x, cy, cr)) {
    isIndie = false;
	} else if (isIndie == false && overCircle(c2x, cy, cr)) {
    isIndie = true;
	}

  //ALTERNATE
	if (isAlt == true && overCircle(c3x, cy, cr)) {
    isAlt = false;
	} else if (isAlt == false && overCircle(c3x, cy, cr)) {
    isAlt = true;
	}

  //COUNTRY
	if (isCountry == true && overCircle(c4x, cy, cr)) {
    isCountry = false;
	} else if (isCountry == false && overCircle(c4x, cy, cr)) {
    isCountry = true;
	}

  //ELECTRONIC
	if (isElectro == true && overCircle(c5x, cy, cr)) {
    isElectro = false;
	} else if (isElectro == false && overCircle(c5x, cy, cr)) {
    isElectro = true;
	}

  //ROCK
	if (isRock == true && overCircle(c6x, cy, cr)) {
    isRock = false;
	} else if (isRock == false && overCircle(c6x, cy, cr)) {
    isRock = true;
	}

  //CLASSICAL
	if (isClassical == true && overCircle(c7x, cy, cr)) {
    isClassical = false;
	} else if (isClassical == false && overCircle(c7x, cy, cr)) {
    isClassical = true;
	}

  //R&B
	if (isRB == true && overCircle(c8x, cy, cr)) {
    isRB = false;
	} else if (isRB == false && overCircle(c8x, cy, cr)) {
    isRB = true;
	}

  //RAP
	if (isRap == true && overCircle(c9x, cy, cr)) {
    isRap = false;
	} else if (isRap == false && overCircle(c9x, cy, cr)) {
    isRap = true;
	}
  ////////////////////////////////////////////////////////
}

//resize window
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

//php load catches
function dataLoaded(){
  console.log(table);
}

//if error for table data
function dataLoadError(){
  console.log("data load error");
}

//Workout class
class Workout{
  constructor(genre, track, artist, calories, date, embed, angle){
    this.genre = genre;
    this.track = track;
    this.artist = artist;
    this.calories = calories;
    this.date = date;
    this.embed = embed;
    this.angle = angle;

    this.padding = 10;
    this.animatedHeight;

    //var origin = width/2;
  }

  //displayed at center of circle if rect is hovered over
  workoutInfo() {
    // fill("#FFFFFF"); //white
    // textAlign(CENTER, CENTER);
    // textSize(22);
    //
    // //display text at center
    // text(this.track, width / 2, height / 2 - 20);
    // text("by " + this.artist + " (" + this.genre + ")", width / 2, height / 2);
    // textSize(12);
    // text(this.calories + " calories burned on " + this.date, width / 2, height / 2 + 20);

    //iframe spotify embed
    //TODO: remove the prev embed
    embedDiv = createDiv('<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/' + this.embed + '" width="250" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>');
    embedDiv.position(width - (width - 40), titleHeight - 100);

    console.log("enter " + this.track);
  }

  //called for each element in workout array
  display() {
    //animation of rect data
    if (frameCount <= 1100) {
      maxValue = constrain(frameCount * 5, 0, 1100);
    } else {
      maxValue = 1100;
    }

    //for rect rectangle width
      rectWidth = angleSeparation * 4;

    //keep inside bounds of screen
    var dataMultiplier = (height / 2 - offset - this.padding) / maxData;

    //responsive screen size for resize
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    if (width < 375) {
      offset = height / 9; //update inner circle size to screen
      dataMultiplier = (height / 5 - offset - this.padding) / maxData; //update height of rect
      cr = 7; //update genre button radius
      rectWidth = angleSeparation * 1.1; //width of rects
    }
    if (width < 478) {
      offset = height / 9; //update inner circle size to screen
      dataMultiplier = (height / 5 - offset - this.padding) / maxData; //update height of rect
      cr = 7; //update genre button radius
      rectWidth = angleSeparation * 2; //width of rects
    }
    else if (width < 871) {
      offset = height / 8; //update inner circle size to screen
      dataMultiplier = (height / 4 - offset - this.padding) / maxData; //update height of rect
      cr = 8; //update genre button radius
      rectWidth = angleSeparation * 2; //width of rects
    } else if (width < 1170) {
      offset = height / 7; //update inner circle size to screen
      dataMultiplier = (height / 3 - offset - this.padding) / maxData; //update height of rect
      cr = 9; //update genre button radius
      rectWidth = angleSeparation * 3; //width of rects
    }
    else {
      offset = height / 5; //update inner circle size to screen
      dataMultiplier = (height / 2 - offset - this.padding) / maxData; //update height of rect
      cr = 10; //update genre button radius
      rectWidth = angleSeparation * 4; //width of rects
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

      push();
      var currentData = this.calories; //calories for a rect
      var finalHeight = currentData * dataMultiplier;
      //console.log("finalHeight: " + finalHeight);
      this.animatedHeight = map(maxValue, 0, 1100, 0, finalHeight); //size of rect
      //console.log("animatedHeight: " + this.animatedHeight);
      //console.log("finalHeight/animatedHeight: " + finalHeight/this.animatedHeight);

      //change color based on genre of song
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      if (this.genre.toUpperCase() == "POP" && isPop == true) {
        fill("#587C7C"); //ashy turquoise
      }
      else if (this.genre.toUpperCase() == "INDIE" && isIndie == true) {
        fill("#003F5E"); //deep blue
      }
      else if (this.genre.toUpperCase() == "ALTERNATE" && isAlt == true) {
        fill("#007C84"); //turquoise
      }
      else if (this.genre.toUpperCase() == "COUNTRY" && isCountry == true) {
        fill("#E8D666"); //yellow
      }
      else if (this.genre.toUpperCase() == "ELECTRONIC" && isElectro == true) {
        fill("#9EA615"); //yellow green
      }
      else if (this.genre.toUpperCase() == "ROCK" && isRock == true) {
        fill("#BBE0CE"); //light blue
      }
      else if (this.genre.toUpperCase() == "CLASSICAL" && isClassical == true) {
        fill("#FEDCC1"); //light pink
      }
      else if (this.genre.toUpperCase() == "R&B" && isRB == true) {
        fill("#F7A08C"); //salmon
      }
      else if (this.genre.toUpperCase() == "RAP" && isRap == true) {
        fill("#F1573F"); //red
      }
      else if (this.genre.toUpperCase() == "ALTERNATE INDIE" && (isAlt == true || isIndie == true)) {
        fill("#003F5E"); //deep blue
        stroke("#007C84"); //turquoise
      }
      else if (this.genre.toUpperCase() == "ALTERNATE POP" && (isAlt == true || isPop == true)) {
        fill("#007C84"); //turquoise
        stroke("#587C7C"); //ashy turquoise
      }
      else if (this.genre.toUpperCase() == "ALTERNATE R&B" && (isAlt == true || isRB == true)) {
        fill("#007C84"); //turquoise
        stroke("#F7A08C"); //salmon
      }
      else if (this.genre.toUpperCase() == "INDIE POP" && (isIndie == true || isPop == true)) {
        fill("#003F5E"); //deep blue
        stroke("#587C7C"); //ashy turquoise
      }
      else if (this.genre.toUpperCase() == "INDIE ROCK" && (isIndie == true || isRock == true)) {
        fill("#003F5E"); //deep blue
        stroke("#BBE0CE"); //light blue
      }
      else if (this.genre.toUpperCase() == "POP RAP" && (isPop == true || isRap == true)) {
        fill("#F1573F"); //red
        stroke("#587C7C"); //ashy turquoise
      }
      else if (this.genre.toUpperCase() == "R&B RAP" && (isRap == true || isRB == true)) {
        fill("#F7A08C"); //salmon
        stroke("#F1573F"); //red
      }
      else if (this.genre.toUpperCase() == "ROCK POP" && (isPop == true || isRock == true)) {
        fill("#BBE0CE"); //light blue
        stroke("#587C7C"); //ashy turquoise
      }
      else {
        fill(100, 100, 100, 50); //translucent
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////

      //display only above calories filter slider value
      if (this.calories >= cal) {
          //formation of rect data
          translate(width / 2, height / 2);
          rotate(this.angle);

          //append(tempRect, rect(0, offset, rectWidth, this.animatedHeight));
          rect(0, offset, rectWidth, this.animatedHeight);
      }
      else {
        fill(100, 100, 100, 50); //translucent
        stroke(100, 100, 100, 50); //translucent

        //formation of rect data
        translate(width / 2, height / 2);
        rotate(this.angle);

        //append(tempRect, rect(0, offset, rectWidth, this.animatedHeight));
        rect(0, offset, rectWidth, this.animatedHeight);
      }

      //display month date inside circle
      if(this.date >= "2022-01-01" && this.date <= "2022-01-31") { //JAN
        noStroke();
        fill(255, 255, 255, 50);
        textSize(6);
        text('JAN', offset - 10, 0);
      } else if(this.date >= "2022-02-01" && this.date <= "2022-02-28") { //FEB
        noStroke();
        fill(255, 255, 255, 50);
        textSize(6);
        text('FEB', offset - 10, 0);
      }
      else if(this.date >= "2022-03-01" && this.date <= "2022-03-31") { //MAR
        noStroke();
        fill(255, 255, 255, 50);
        textSize(6);
        text('MAR', offset - 10, 0);
      }
      else if(this.date >= "2022-04-01" && this.date <= "2022-04-30") { //APR
        noStroke();
        fill(255, 255, 255, 50);
        textSize(6);
        text('APR', offset - 10, 0);
      }

      //add vars for each rect
      if(position.length < workout.length) {
        addRectInfo(offset, rectWidth, finalHeight / 5.365853658536586, this.angle);
      }
      ////// DEBUG:
      // else{
      //   for (var i = 0; i < verticesHist.length; i++) {
      //     stroke('green');
      //     strokeWeight(2);
      //     point(verticesHist[i][1][0], verticesHist[i][1][1]);
      //   }
      // }

      ///// // DEBUG:

        // click[rectCount] = [mouseX, mouseY];
        // position[rectCount] = [0, offset];
        // size[rectCount] = [rectWidth, this.animatedHeight];
        // rectDegrees[rectCount] = this.angle;
        // rectCount++;

        // stroke('orange');
        // strokeWeight(2);
        // point(0, offset + this.animatedHeight);

      pop();
  }
}
