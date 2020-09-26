// variables
const cell = $("div#gameBoard > div");
let arrayX = [];
let arrayY = [];
let activePlayer, passivePlayer;
let combat = false;
let cellContact;
let classList;


// Movements options
Player.prototype.movementOption = function(playerPosition) {
    // delete class after player move
    $("div#gameBoard > div").removeClass("movementOption");

    //arrays X and Y for movement
    arrayX = [];
    arrayY = [];

    //variables for find the position
    let up = playerPosition - 10;
    let down = playerPosition + 10;
    let left = playerPosition - 1;
    let right = playerPosition + 1;
    let blocked = false;
    const xMin = playerPosition - (playerPosition % 10);
    const xMax = xMin + 9;

    // Check for class in specific div
    function checkClass() {
        $.each(classList, function(index, cssClass) {
            if (
                cssClass === "wall" ||
                cssClass == passivePlayer.name
            ) {
                blocked = true;
            }
        });
    }

    // Define movement option up - down - left - right
    // move up to 3 cells
    while (up >= 0 && up >= playerPosition - 30) {
        blocked = false;
        classList = $("div#" + up)
            .attr("class")
            .split(" ");

        checkClass();

        if (blocked === true) {
            break;
        } else {
            $("div#" + up).addClass("movementOption");
            arrayY.push(up);
        }
        up -= 10;
    }

    //move down 3 cells
    while (down <= 99 && down <= playerPosition + 30) {
        blocked = false;
        classList = $("div#" + down)
            .attr("class")
            .split(" ");

        checkClass();

        if (blocked === true) {
            break;
        } else {
            $("div#" + down).addClass("movementOption");
            arrayY.push(down);
        }
        down += 10;
    }

    // move left 3 cells
    while (left >= xMin && left >= playerPosition - 3) {
        blocked = false;
        classList = $("div#" + left)
            .attr("class")
            .split(" ");

        checkClass();

        if (blocked === true) {
            break;
        } else {
            $("div#" + left).addClass("movementOption");
            arrayX.push(left);
        }
        left -= 1;
    }

    // move right 3 cells
    while (right <= xMax && right <= playerPosition + 3) {
        blocked = false;
        classList = $("div#" + right)
            .attr("class")
            .split(" ");

        checkClass();

        if (blocked === true) {
            break;
        } else {
            $("div#" + right).addClass("movementOption");
            arrayX.push(right);
        }
        right += 1;
    }

    return [arrayX, arrayY];
};

// 
Player.prototype.moveCell = function(newPosition) {
    // variables for old and new positions
    const oldCell = document.getElementById(this.position);
    oldCell.classList.remove(this.name);
    const newCell = document.getElementById(newPosition);
    newCell.classList.add(this.name);

    // find weapons
    const findFrom = this.position;
    const findTo = newPosition;
    gameBoard.findWeapon(findFrom, findTo);
    //findWeapon(findFrom, findTo);

    this.position = newPosition;
    cellContact = [
        newPosition + 1,
        newPosition - 1,
        newPosition + 10,
        newPosition - 10
    ];

    switch (this.name) {
        case "kakashi":
            newCell.classList.add("kakashi");
            break;
        case "mightyGuy":
            newCell.classList.add("mightyGuy");
            break;
    }
    oldCell.innerHTML = "";

    // check if players are next
    $.each(cellContact, function(index, contact) {
        if ($("#" + contact).hasClass("kakashi") || $("#" + contact).hasClass("mightyGuy")) {
            combat = true;
        }
    });

    if (combat === false) {
        passivePlayer.activePlayer();
    } else {
        arrayX = [];
        arrayY = [];
        cell.removeClass("movementOption");
        startFight.adjustFight();
    }
};

// Decide active player
Player.prototype.activePlayer = function() {
    if (this.name === "kakashi") {
        activePlayer = player1;
        passivePlayer = player2;
    } else {
        activePlayer = player2;
        passivePlayer = player1;
    }
    if (combat === false) {
        activePlayer.movementOption(this.position);
    }
};

// Player start game
player1.activePlayer();

// Find weapon function
CreateBoard.prototype.findWeapon = function(findFrom, findTo) {
    // Variables
    const searchCells = findTo - findFrom;
    const arraySearch = [];
    let currentWeapon;
    let newWeapon;

    // check div between findFrom and findTo cells
    if (searchCells > 0) {
        // For right side
        if (searchCells <= 3) {
            for (let i = findFrom; i <= findTo; i++) {
                if (jQuery.inArray(i, arrayX) >= 0) {
                    arraySearch.push(i);
                }
            }
        } else {
            // for down
            for (let i = findFrom; i <= findTo; i += 10) {
                if (jQuery.inArray(i, arrayY) >= 0) {
                    arraySearch.push(i);
                }
            }
        }
    } else {
        // for left
        if (searchCells >= -3) {
            for (let i = findFrom; i >= findTo; i--) {
                if (jQuery.inArray(i, arrayX) >= 0) {
                    arraySearch.push(i);
                }
            }
        } else {
            // for up
            for (let i = findFrom; i >= findTo; i -= 10) {
                if (jQuery.inArray(i, arrayY) >= 0) {
                    arraySearch.push(i);
                }
            }
        }
    }
    // check if cells within findFrom and findTo have weapons
    for (let j = 0; j < arraySearch.length; j++) {
        let passedCells = $("div#" + arraySearch[j]);


        // check classes from passing cell, assign newWeapon value and change player damage
        currentWeapon = activePlayer.weapon;
        if (passedCells.hasClass("shuriken")) {
            newWeapon = "shuriken";
            activePlayer.damage = 30;
        } else if (passedCells.hasClass("katana")) {
            newWeapon = "katana";
            activePlayer.damage = 35;
        } else if (passedCells.hasClass("sai")) {
            newWeapon = "sai";
            activePlayer.damage = 20;
        } else if (passedCells.hasClass("kunai")) {
            newWeapon = "kunai";
            activePlayer.damage = 15;
        } else {
            newWeapon = "";
        }

        // If player has a weapon and passes on a cell with another weapon, leave current weapon and take new weapomn
        if (newWeapon != "") {
            passedCells.removeClass(newWeapon);
            passedCells.addClass(currentWeapon);
            activePlayer.weapon = newWeapon;
            $("#" + activePlayer.name + "damage").text(activePlayer.damage);
        }
    }
}

// On click move cell
CreateBoard.prototype.movePlayer = function() {
    cell.on("click", function() {
        let newPosition = parseInt(this.id);
        if (
            jQuery.inArray(newPosition, arrayX) >= 0 ||
            jQuery.inArray(newPosition, arrayY) >= 0
        ) {
            cell.removeClass(activePlayer.name);
            activePlayer.moveCell(newPosition);
        }
    })
}

gameBoard.movePlayer();