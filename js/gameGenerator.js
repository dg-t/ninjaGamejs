// Variables
const cells = 100;
const arrayCells = [];
let findCell;

// Create game board function
class CreateBoard {
    constructor(cells) {
        this.cells = cells;
    }
    create = () => {
        const board = document.getElementById("gameBoard");
        for (let i = 0; i < cells; i++) {
            const cellDiv = document.createElement("div");
            cellDiv.id = i;
            cellDiv.classList.add("cellGrid");
            board.appendChild(cellDiv);
        }
    }
}

// Blue print for cell object
class BoardCell {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    availableCell = () => {
        do {
            findCell = Math.floor(Math.random() * cells);
        }
        while (arrayCells[findCell] != null);
        return findCell;
    }
}

// Create walls
class Wall extends BoardCell {
    constructor(name, image) {
        super(name, image);
    }

    cellPosition = () => {
        for (let x = 0; x < 15; x++) {
            findCell = this.availableCell();
            arrayCells[findCell] = this.name;

            const myCell = document.getElementById(findCell);
            myCell.classList.add(this.name);
        }
    };
}


//Create Players
class Player extends BoardCell {
    constructor(name, image) {
        super(name, image);
        this.life = 100;
        this.damage = 10;
        this.defendRate = 5;
        this.weapon = null;
    }

    cellPosition = () => {
        findCell = this.availableCell();
        arrayCells[findCell] = this.name;

        const myCell = document.getElementById(findCell);
        myCell.classList.add(this.name);


        // function to keep players separate
        const collisionCell = [findCell - 1, findCell + 1, findCell - 10, findCell + 10];

        collisionCell.forEach(avoidCollision);

        function avoidCollision(collision) {
            if ((collision >= 0 && collision < cells) && arrayCells[collision] == null) {
                arrayCells[collision] = "full";
            }
        }
        this.position = findCell;
    }
}


// Create weapon
class Weapon extends BoardCell {
    constructor(name, image, damage) {
        super(name, image);
        this.name = name;
        this.image = image;
        this.damage = damage;
    }
    cellPosition = function() {
        findCell = this.availableCell();
        arrayCells[findCell] = this.name;

        const myCell = document.getElementById(findCell);
        myCell.classList.add(this.name);
    }
}


// Create objects: Board / Walls / Players / Weapons
const gameBoard = new CreateBoard(cells);
const wall = new Wall("wall", "blackWall.svg");
const player1 = new Player("kakashi", "ninja.svg");
const player2 = new Player("mightyGuy", "samurai.svg");
const weapon1 = new Weapon("shuriken", "shuriken.svg", 30);
const weapon2 = new Weapon("katana", "katana.svg", 35);
const weapon3 = new Weapon("kunai", "kunai.svg", 15);
const weapon4 = new Weapon("sai", "sai.svg", 20);

// Set objects ready for game
gameBoard.create()
wall.cellPosition();
player1.cellPosition();
player2.cellPosition();
weapon1.cellPosition();
weapon2.cellPosition();
weapon3.cellPosition();
weapon4.cellPosition();