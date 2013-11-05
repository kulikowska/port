var hwidth = 9;  //columns
var vheight = 15; // rows

function createboard() {
var i;
var j;
	for (i=0; i<vheight; i++) {
		for (j=0; j<hwidth; j++) {
			document.write("<img src='white.png'/>");
			}
		document.write("<br/>");
	}
}


var blockformulas = [
					[[0,0], [1,0], [2,0], [1,1]],  	// T shape
					[[0,0], [1,0], [2,0], [3,0]], 	// Straight
					[[0,1], [1,1], [1,0], [2,0]],
					[[0,0], [1,0], [0,1], [1,1]],
					[[0,0], [1,0], [1,1], [2,1]],
					[[0,0], [1,0], [2,0], [2,1]],
					[[0,1], [1,1], [2,1], [2,0]]
					];

var blockimages = [
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Yellow-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Green-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Red-icon.png",
	"turquoise.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Gray-icon.png",
	"pink.png",
	"purple.png",
	];

function imagenumber(atcol, atrow) {
	var imagenum =atrow*hwidth +atcol;
	return imagenum;
}

function makeblock(type, atcol, atrow) {
	currentorigin = [atcol, atrow];
	currenttypenum = type;
	currenttype = blockimages[type];
	currentorientation = 0;
	var i;
	var block = blockimages[type];
	var formula = blockformulas[type];
	var imagenum;
	var atc;
	var atr;
		for (i=0; i<=3; i++) {
			atc = atcol + formula[i][0];
			atr = atrow + formula[i][1];
			imagenum=imagenumber(atc, atr);
				document.images[imagenum].src = block;
			current[i][0]=imagenum;
			current[i][1] = atc;
			current[i][2] = atr;
			}
	}

var orientations = [
	[
	[[0,0],[1,0],[2,0],[1,1]], //
	[[0,0],[1,0],[2,0],[3,0]], //
	[[0,1],[1,1],[1,0],[2,0]], //
	[[0,0],[1,0],[0,1],[1,1]], //
	[[0,0],[1,0],[1,1],[2,1]], //
	[[0,0],[1,0],[2,0],[2,1]], //
	[[0,1],[1,1],[2,1],[2,0]]	//
	],
	[
	[[1,0],[1,1],[1,2],[2,1]], //
	[[1,0],[1,1],[1,2],[1,3]], //
	[[1,2],[1,1],[0,1],[0,0]], //
	[[0,0],[1,0],[0,1],[1,1]], //
	[[1,0],[1,1],[0,1],[0,2]], //
	[[1,2],[1,1],[1,0],[2,0]],  //
	[[2,2],[2,1],[2,0],[1,0]]	//
	],
	[
	[[0,1],[1,1],[2,1],[1,0]],  //
	[[0,0],[1,0],[2,0],[3,0]], //
	[[2,0],[1,0],[1,1],[0,1]], //
	[[0,0],[1,0],[0,1],[1,1]], //
	[[0,0],[1,0],[1,1],[2,1]], //
	[[2,1],[1,1],[0,1],[0,0]], //
	[[2,0],[1,0],[0,0],[0,1]]  //
	],
	[
	[[1,0],[1,1],[1,2],[0,1]], //
	[[1,0],[1,1],[1,2],[1,3]], //
	[[1,2],[1,1],[0,1],[0,0]], //
	[[0,0],[1,0],[0,1],[1,1]], //
	[[1,0],[1,1],[0,1],[0,2]], //
	[[1,0],[1,1],[1,2],[0,2]], //
	[[1,0],[1,1],[1,2],[2,2]]  //	
	]
	];

	var current = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0]
		];
	var currenttype;
	var currenttypenum;
	var currentorientation;
	var currentorigin;

function moveover(dir) {
	
	var i;
	var tests;
	var oksofar = true;
	var imgno;
	var newcurrent = new Array();
	var saved = new Array();
		for (i=0; i<=3; i++) {
			imgno = current[i][0];

			if (dir==-1) {
				if (0 == imgno % hwidth)
					{ oksofar = false;

					break; } }
			if (dir == 1) {
				if ((hwidth-1)==imgno % hwidth) {
					oksofar = false;

					break; }
				}

		newcurrent[i] = imgno+dir;
		}

		if (oksofar) {
			for (i=0; i<=3; i++) {
				saved[i] = current[i][0];
				document.images[current[i][0]].src = "white.png";
				}

			for (i=0; i<=3; i++) {
				tests = String(document.images[newcurrent[i]].src);
				found = tests.search("white.png");
				if (found == -1) {
					oksofar = false;
					break;
					}
				}

				if (oksofar) {
					for (i=0; i<=3; i++) {
						document.images[newcurrent[i]].src= currenttype;
						current[i][0] = newcurrent[i];
						current[i][1] = current[i][1]+dir;
						}

						currentorigin[0]=currentorigin[0]+dir;
						}
					else {
						for (i=0; i<=3; i++) {
							document.images[saved[i]].src = currenttype;
							}
						}
					}
				}

function rotate() {
	var block = currenttype;
	var savedorientation = currentorientation;
	currentorientation = (currentorientation+1) % 4;
	var i;
	var formula = orientations[currentorientation][currenttypenum];
	var atcol = currentorigin[0];
	var atrow = currentorigin[1];
	var atc;
	var atr;
	var tests;
	var newcurrent = Array();
	var saved = Array();
	var oksofar = true;

	for (i=0; i<=3; i++) {
		atc = atcol + formula[1][0];
	if (atc>=(hwidth-1)) {
		oksofar = false;
		break;	}
	if (atc<0) {
		oksofar = false;
		break; }
	atr = atrow + formula[i][1];
	if (atr>=(vheight-1)) {
		oksofar = false;
		break;	}
		newcurrent[i]=imagenumber(atc, atr);
	}
if (oksofar) {
	for (i=0; i<=3; i++) {
		saved[i] = current[i][0];
		document.images[current[i][0]].src = "white.png" }
	for (i=0; i<=3; i++) {
		tests = String(document.images[newcurrent[i]].src);
		found = tests.search("white.png");
		if (found == -1) {
			oksofar = false;
			break;	}
		}
if (oksofar) {
	for (i=0; i<=3; i++) {
	imagenum=newcurrent[i];
		document.images[imagenum].src = block;
	current[i][0]=imagenum;
	current[i][1] = atcol+formula[1][0];
	current[1][2] = atrow+formula[i][1];
	}
}
else {
	for (i=0; i<=3; i++) {
		document.images[saved[i]].src = block;
		}
		currentorientation = savedorientation;
		}
	}
	else {
		currentorientation = savedorientation;
	}
}

