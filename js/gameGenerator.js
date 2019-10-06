// Variables
// for game board 
var board = document.getElementById("gameBoard");
var cells = 100;
// for objects in game board
var arrayCells = [];
var findCell;

// Create game board function
function createBoard(cells) {
    for (i = 0; i < cells; i++) {
        var cellDiv = document.createElement("div");
        cellDiv.id = i;
        cellDiv.classList.add("cellGrid");
        board.appendChild(cellDiv);
    }
}

// Function for find available cell to position objects
function availableCell() {
    do {
        findCell = Math.floor(Math.random() * cells);
    }
    while (arrayCells[findCell] != null);
    return findCell;
}

// Create walls
function Wall(name, image) {
    this.name = name;
    this.image = image;
}
/* */
Wall.prototype.cellPosition = function() {
    for (x = 0; x < 15; x++) {
        findCell = availableCell();
        arrayCells[findCell] = this.name;

        var myCell = document.getElementById(findCell);
        myCell.classList.add(this.name);
    }
};

//Create Players
function Player(name, image) {
    this.name = name;
    this.image = image;
    this.life = 100;
    this.damage = 10;
    this.defendRate = 5;
    this.weapon = null;
}

Player.prototype.cellPosition = function() {
    findCell = availableCell();
    arrayCells[findCell] = this.name;

    var myCell = document.getElementById(findCell);
    myCell.classList.add(this.name);

    // set player as image
    myCell.innerHTML = '<img src="img/' + this.image + '></img>';

    // function to keep players separate
    var collisionCell = [findCell - 1, findCell + 1, findCell - 10, findCell + 10];

    collisionCell.forEach(avoidCollision);

    function avoidCollision(collision) {
        if ((collision >= 0 && collision < cells) && arrayCells[collision] == null) {
            arrayCells[collision] = "full";
        }
    }
    this.position = findCell;
}

// Create weapon
function Weapon(name, image, damage) {
    this.name = name;
    this.image = image;
    this.damage = damage;
}

Weapon.prototype.cellPosition = function() {
    findCell = availableCell();
    arrayCells[findCell] = this.name;

    var myCell = document.getElementById(findCell);
    myCell.classList.add(this.name);
}

// Create objects
// walls
var wall = new Wall("wall", "blackWall.png");
// players
var player1 = new Player("kakashi", "ninja.png");
var player2 = new Player("mightyGuy", "samurai.png")
    // weapons
var weapon1 = new Weapon("shuriken", "Shuriken.png", 30);
var weapon2 = new Weapon("katana", "katana.png", 35);
var weapon3 = new Weapon("kunai", "kunai.png", 15);
var weapon4 = new Weapon("sai", "sai.png", 20);

// Call functions
// create game
createBoard(cells);
// Set objects position
// walls
wall.cellPosition();
// players
player1.cellPosition();
player2.cellPosition();
// weapons
weapon1.cellPosition();
weapon2.cellPosition();
weapon3.cellPosition();
weapon4.cellPosition();