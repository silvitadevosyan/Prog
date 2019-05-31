class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mult() {
        this.multiply++;
        var empty = random(this.chooseCell(0));
        if (empty && this.multiply >= 3) {




            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 1;
            var newgr = new Grass(newX, newY, 1);
            grassArr.push(newgr)

        }
    }
}





class Xotaker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 2;
        this.multiply = 0;
        this.energy = 40;
        this.directions = [];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0));
        if (empty) {
            var x = empty[0]
            var y = empty[1]
            matrix[y][x] = 2
            var newXt = new Xotaker(x, y)
            xotakerArr.push(newXt)
            this.energy = 5
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {

        var gr = random(this.chooseCell(1))
        if (gr) {
            this.energy += 1;
            var newX = gr[0]
            var newY = gr[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                }
            }

            this.y = newY
            this.x = newX
            if (this.energy >= 30) {
                this.mult()
            }
        }
        else {
            this.move()
        }
    }
    die() {

        matrix[this.y][this.x] = 0
        for (var i in xotakerArr) {
            if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                xotakerArr.splice(i, 1);
            }
        }

    }


}


class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 3;
        this.multiply = 1;
        this.energy = 2;
        this.directions = [];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy >= 60) {
            var x = empty[0]
            var y = empty[1]
            matrix[y][x] = 3
            var newGs = new Gishatich(x, y)
            gishatichArr.push(newGs)
            this.energy = 2
        }
    }
    move() {
        var move1 = this.chooseCell(0);
        var move2 = this.chooseCell(1);
        let empty = random(move1.concat(move2)); 
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                }
            }

        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        var gr = random(this.chooseCell(2))
        if (gr) {
            this.energy++;
            var newX = gr[0]
            var newY = gr[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1);
                }
            }

            this.y = newY
            this.x = newX
            if (this.energy >= 15) {
            this.mult()
            }
        }
        else {
            this.move()
        }
    }
    die() {

        matrix[this.y][this.x] = 0
        for (var i in gishatichArr) {
            if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                gishatichArr.splice(i, 1);
            }
        }
    }
}

class GrassGen {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var empty = random(this.chooseCell(0));
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4

            let a = Math.floor(Math.random() * 100);
            if (a < 70) {
                matrix[this.y][this.x] = 1;
                let gr = new Grass(this.x, this.y);
                grassArr.push(gr);
            }
            else if (a >= 70 && a < 80) {
                matrix[this.y][this.x] = 2;
                let gr = new Xotaker(this.x, this.y);
                xotakerArr.push(gr);
            }
            else if(a >= 80 && a < 90) {
                matrix[this.y][this.x] = 5;
                let gr = new Dinosaur(this.x, this.y);
                dinoArr.push(gr);
            }
            else {
                matrix[this.y][this.x] = 3;
                let gr = new Gishatich(this.x, this.y);
                gishatichArr.push(gr);
            }


            this.x = newX;
            this.y = newY;
        }
    }
}


class Dinosaur {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 5;
        this.multiply = 0;
        this.energy = 2;
        this.directions = [];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy >= 5) {
            var x = empty[0]
            var y = empty[1]
            matrix[y][x] = 3
            var dino = new Dinosaur(x, y)
            dinoArr.push(dino)
            this.energy = 2
        }
    }
    move() {
        var move1 = this.chooseCell(0);
        var move2 = this.chooseCell(1);
        let empty = random(move1.concat(move2)); 
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                }
            }

        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        var move1 = this.chooseCell(2);
        var move2 = this.chooseCell(3);
        let gr = random(move1.concat(move2)); 
        if (gr) {
            this.energy++;
            var newX = gr[0]
            var newY = gr[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1);
                }
            }
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1);
                }
            }

            this.y = newY
            this.x = newX
            if (this.energy >= 5) {
            this.mult()
            }
        }
        else {
            this.move()
        }
    }
    die() {

        matrix[this.y][this.x] = 0
        for (var i in dinoArr) {
            if (dinoArr[i].x == this.x && dinoArr[i].y == this.y) {
                dinoArr.splice(i, 1);
            }
        }
    }
}