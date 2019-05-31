var matrix = [];


var side = 15;

var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var genArr = [];
var dinoArr = [];


function setup() {
     
    let rows = 30; 
    let columns = 30; 

    for (let y = 0; y < rows; y++) {
        matrix[y] = []; 
        for (let x = 0; x < columns; x++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 5) {
                matrix[y][x] = 0; 
            }
            if (a >= 5 && a < 30) {
                matrix[y][x] = 1; 
            }
            else if (a >= 30 && a < 70) {
                matrix[y][x] = 2; 
            }
            else if (a >= 99 && a < 100) {
                matrix[y][x] = 3; 
            }
            else if (a >= 70 && a < 90) {
                matrix[y][x] = 4; 
            }
            else if (a >= 90 && a < 99) {
                matrix[y][x] = 5; 
            }
        }
    }


    frameRate(30);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('black');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var gr = new Xotaker(x, y);
                xotakerArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                var gr = new Gishatich(x, y);
                gishatichArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                var gen = new GrassGen(x, y);
                genArr.push(gen)
            }
            else if (matrix[y][x] == 5) {
                var ms = new Dinosaur(x, y);
                dinoArr.push(ms)
            }
        }
    }


}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#00ffff");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("#ff00bf");
            }
            else if (matrix[y][x] == 3) {
                fill("#8000ff");
            }
            else if (matrix[y][x] == 4) {
                fill("#ff00ff");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }
    for (var i in grassArr) {
        grassArr[i].mult();
    }
    for (var i in xotakerArr) {
        xotakerArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in genArr) {
        genArr[i].move();
    }
    for (var i in dinoArr) {
        dinoArr[i].eat();
    }
}

