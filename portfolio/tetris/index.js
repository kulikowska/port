var hwidth = 9;  //columns
var vheight = 15; // rows

function createboard() {
var i;
var j;
	for (i=0; i<vheight; i++) {
		for (j=0; j<hwidth; j++) {
			document.write("<img src='http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/32/folder-blank-icon.png'/>");
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
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Blue-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Gray-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Yellow-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Green-icon.png",
	"http://icons.iconarchive.com/icons/deleket/soft-scraps/32/Button-Blank-Blue-icon.png",

	];

function imagenumber(atcol, atrow) {
	var imagenum =atrow*hwidth +atcol;
	return imagenum;
}

function makeblock(type, atcol, atrow) {
	var i;
	var block = blockimages[type];
	var formula = blockformulas[type];
	var imagenum;
		for (i=0; i<=3; i++) {
			imagenum=imagenumber(atcol+formula[i][0], atrow+formula[i][1]);
				document.images[imagenum].src = block;
			}
	}


